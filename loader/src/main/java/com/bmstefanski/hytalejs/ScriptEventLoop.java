package com.bmstefanski.hytalejs;

import com.caoccao.javet.exceptions.JavetException;
import com.caoccao.javet.interop.V8Host;
import com.caoccao.javet.interop.V8Runtime;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ScriptEventLoop implements AutoCloseable {
  private static final Logger LOGGER = Logger.getLogger("HytaleJS|EventLoop");

  private final V8Host host;
  private final ScriptRuntime runtime;
  private final BlockingQueue<ScriptTask<?>> taskQueue;
  private final Thread loopThread;
  private final AtomicBoolean running;

  public ScriptEventLoop(Consumer<ScriptRuntime> runtimeInitializer) {
    host = V8Host.getV8Instance();
    taskQueue = new LinkedBlockingQueue<>();
    running = new AtomicBoolean(true);

    V8Runtime v8Runtime;
    try {
      v8Runtime = host.createV8Runtime();
    } catch (JavetException e) {
      throw new RuntimeException("Failed to create Javet runtime", e);
    }

    runtime = new JavetScriptRuntime(v8Runtime);
    runtimeInitializer.accept(runtime);

    loopThread = new Thread(this::runLoop, "HytaleJS-EventLoop");
    loopThread.setDaemon(true);
    loopThread.start();
  }

  private void runLoop() {
    while (running.get()) {
      try {
        ScriptTask<?> task = taskQueue.take();
        if (!running.get()) {
          task.completeExceptionally(new RuntimeException("Event loop is shutting down"));
          break;
        }
        executeTask(task);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        break;
      }
    }

    while (!taskQueue.isEmpty()) {
      ScriptTask<?> task = taskQueue.poll();
      if (task != null) {
        task.completeExceptionally(new RuntimeException("Event loop is shutting down"));
      }
    }
  }

  @SuppressWarnings("unchecked")
  private <T> void executeTask(ScriptTask<T> task) {
    runtime.enter();
    try {
      T result = (T) task.getTask().apply(runtime);
      task.complete(result);
    } catch (Exception e) {
      LOGGER.log(Level.SEVERE, "Error executing task: " + task.getOperation(), e);
      task.completeExceptionally(e);
    } finally {
      runtime.leave();
    }
  }

  public <T> T executeInRuntime(String operation, Function<ScriptRuntime, T> task) {
    if (Thread.currentThread() == loopThread) {
      runtime.enter();
      try {
        return task.apply(runtime);
      } finally {
        runtime.leave();
      }
    }

    ScriptTask<T> scriptTask = new ScriptTask<>(operation, task);
    taskQueue.offer(scriptTask);

    try {
      return scriptTask.getFuture().get();
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
      throw new RuntimeException("Interrupted while waiting for task: " + operation, e);
    } catch (ExecutionException e) {
      Throwable cause = e.getCause();
      if (cause instanceof RuntimeException) {
        throw (RuntimeException) cause;
      }
      throw new RuntimeException("Error executing task: " + operation, cause);
    }
  }

  public void executeInRuntime(String operation, Consumer<ScriptRuntime> task) {
    executeInRuntime(operation, runtime -> {
      task.accept(runtime);
      return null;
    });
  }

  public List<ScriptRuntime> getAllRuntimes() {
    return Collections.singletonList(runtime);
  }

  @Override
  public void close() {
    running.set(false);
    taskQueue.offer(new ScriptTask<>("shutdown", r -> null));

    try {
      loopThread.join(5000);
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }

    if (runtime instanceof JavetScriptRuntime javetRuntime) {
      try {
        javetRuntime.getRuntime().close();
      } catch (JavetException e) {
        throw new RuntimeException("Failed to close Javet runtime", e);
      }
    }
  }

  private static class ScriptTask<T> {
    private final String operation;
    private final Function<ScriptRuntime, T> task;
    private final CompletableFuture<T> future;

    ScriptTask(String operation, Function<ScriptRuntime, T> task) {
      this.operation = operation;
      this.task = task;
      this.future = new CompletableFuture<>();
    }

    String getOperation() {
      return operation;
    }

    Function<ScriptRuntime, T> getTask() {
      return task;
    }

    CompletableFuture<T> getFuture() {
      return future;
    }

    void complete(T result) {
      future.complete(result);
    }

    void completeExceptionally(Throwable ex) {
      future.completeExceptionally(ex);
    }
  }
}
