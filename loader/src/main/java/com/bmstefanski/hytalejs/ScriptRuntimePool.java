package com.bmstefanski.hytalejs;

import java.util.List;

public interface ScriptRuntimePool extends AutoCloseable {
  <T> T executeInRuntime(String operation, ScriptRuntimeTask<T> task);

  void executeInRuntime(String operation, ScriptRuntimeRunnable task);

  List<ScriptRuntime> getAllRuntimes();

  @Override
  void close();

  @FunctionalInterface
  interface ScriptRuntimeTask<T> {
    T execute(ScriptRuntime runtime);
  }

  @FunctionalInterface
  interface ScriptRuntimeRunnable {
    void execute(ScriptRuntime runtime);
  }
}
