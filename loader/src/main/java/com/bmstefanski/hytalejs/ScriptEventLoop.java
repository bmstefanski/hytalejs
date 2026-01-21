package com.bmstefanski.hytalejs;

import com.caoccao.javet.exceptions.JavetException;
import com.caoccao.javet.interop.V8Host;
import com.caoccao.javet.interop.V8Runtime;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ScriptEventLoop implements AutoCloseable {
  private static final Logger LOGGER = Logger.getLogger("HytaleJS|EventLoop");

  private final V8Host host;
  private final ScriptRuntime runtime;
  private final ReentrantLock runtimeLock;

  public ScriptEventLoop(Consumer<ScriptRuntime> runtimeInitializer) {
    host = V8Host.getV8Instance();
    runtimeLock = new ReentrantLock();

    V8Runtime v8Runtime;
    try {
      v8Runtime = host.createV8Runtime();
    } catch (JavetException e) {
      throw new RuntimeException("Failed to create Javet runtime", e);
    }

    runtime = new JavetScriptRuntime(v8Runtime);
    runtimeInitializer.accept(runtime);
  }

  public <T> T executeInRuntime(String operation, Function<ScriptRuntime, T> task) {
    runtimeLock.lock();
    try {
      return task.apply(runtime);
    } catch (Exception e) {
      LOGGER.log(Level.SEVERE, "Error executing task: " + operation, e);
      throw e;
    } finally {
      runtimeLock.unlock();
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
    runtimeLock.lock();
    try {
      if (runtime instanceof JavetScriptRuntime javetRuntime) {
        try {
          javetRuntime.getRuntime().close();
        } catch (JavetException e) {
          throw new RuntimeException("Failed to close Javet runtime", e);
        }
      }
    } finally {
      runtimeLock.unlock();
    }
  }
}
