package com.bmstefanski.hytalejs;

import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Engine;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.function.Consumer;

public class GraalRuntimePool implements ScriptRuntimePool {
  private final Engine engine;
  private final List<ScriptRuntime> allRuntimes;
  private final BlockingQueue<ScriptRuntime> available;
  private final ConcurrentHashMap<Thread, PendingRequest> pendingRequests = new ConcurrentHashMap<>();

  public GraalRuntimePool(int size, Consumer<ScriptRuntime> runtimeInitializer) {
    engine = Engine.newBuilder()
      .option("engine.WarnInterpreterOnly", "false")
      .build();
    allRuntimes = new ArrayList<>(size);
    available = new LinkedBlockingQueue<>(size);

    for (int i = 0; i < size; i++) {
      Context ctx = Context.newBuilder("js")
        .engine(engine)
        .allowAllAccess(true)
        .allowHostClassLookup(className -> true)
        .build();
      ScriptRuntime runtime = new GraalScriptRuntime(ctx);
      runtimeInitializer.accept(runtime);
      allRuntimes.add(runtime);
      available.offer(runtime);
    }
  }

  private ScriptRuntime acquire(String operation) {
    Thread currentThread = Thread.currentThread();
    pendingRequests.put(currentThread, new PendingRequest(operation, System.currentTimeMillis()));
    try {
      ScriptRuntime runtime = available.take();
      pendingRequests.remove(currentThread);
      runtime.enter();
      return runtime;
    } catch (InterruptedException e) {
      pendingRequests.remove(currentThread);
      Thread.currentThread().interrupt();
      throw new RuntimeException("Interrupted while acquiring runtime", e);
    }
  }

  private void release(ScriptRuntime runtime) {
    runtime.leave();
    available.offer(runtime);
  }

  @Override
  public <T> T executeInRuntime(String operation, ScriptRuntimeTask<T> task) {
    ScriptRuntime runtime = acquire(operation);
    try {
      return task.execute(runtime);
    } finally {
      release(runtime);
    }
  }

  @Override
  public void executeInRuntime(String operation, ScriptRuntimeRunnable task) {
    ScriptRuntime runtime = acquire(operation);
    try {
      task.execute(runtime);
    } finally {
      release(runtime);
    }
  }

  @Override
  public List<ScriptRuntime> getAllRuntimes() {
    return allRuntimes;
  }

  @Override
  public int getTotalSize() {
    return allRuntimes.size();
  }

  @Override
  public int getAvailableCount() {
    return available.size();
  }

  @Override
  public int getBusyCount() {
    return allRuntimes.size() - available.size();
  }

  @Override
  public List<QueuedOperation> getQueuedOperations() {
    long now = System.currentTimeMillis();
    return pendingRequests.values().stream()
      .map(req -> new QueuedOperation(req.operation, now - req.startTime))
      .toList();
  }

  @Override
  public void close() {
    for (ScriptRuntime runtime : allRuntimes) {
      if (runtime instanceof GraalScriptRuntime graalRuntime) {
        graalRuntime.getContext().close();
      }
    }
    engine.close();
  }
}
