package com.bmstefanski.hytalejs;

import java.util.List;

public interface ScriptRuntimePool extends AutoCloseable {
  <T> T executeInRuntime(String operation, ScriptRuntimeTask<T> task);

  void executeInRuntime(String operation, ScriptRuntimeRunnable task);

  List<ScriptRuntime> getAllRuntimes();

  int getTotalSize();

  int getAvailableCount();

  int getBusyCount();

  List<QueuedOperation> getQueuedOperations();

  @Override
  void close();

  class QueuedOperation {
    private final String operation;
    private final long waitTimeMs;

    public QueuedOperation(String operation, long waitTimeMs) {
      this.operation = operation;
      this.waitTimeMs = waitTimeMs;
    }

    public String getOperation() {
      return operation;
    }

    public long getWaitTimeMs() {
      return waitTimeMs;
    }
  }

  class PendingRequest {
    final String operation;
    final long startTime;

    public PendingRequest(String operation, long startTime) {
      this.operation = operation;
      this.startTime = startTime;
    }
  }

  @FunctionalInterface
  interface ScriptRuntimeTask<T> {
    T execute(ScriptRuntime runtime);
  }

  @FunctionalInterface
  interface ScriptRuntimeRunnable {
    void execute(ScriptRuntime runtime);
  }
}
