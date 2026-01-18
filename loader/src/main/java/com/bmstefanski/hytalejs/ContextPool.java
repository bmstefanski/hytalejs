package com.bmstefanski.hytalejs;

import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Engine;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.function.Consumer;

public class ContextPool {
  private final Engine engine;
  private final List<Context> allContexts;
  private final BlockingQueue<Context> available;
  private final ConcurrentHashMap<Thread, PendingRequest> pendingRequests = new ConcurrentHashMap<>();

  public ContextPool(int size, Consumer<Context> contextInitializer) {
    engine = Engine.newBuilder()
      .option("engine.WarnInterpreterOnly", "false")
      .build();
    allContexts = new ArrayList<>(size);
    available = new LinkedBlockingQueue<>(size);

    for (int i = 0; i < size; i++) {
      Context ctx = Context.newBuilder("js")
        .engine(engine)
        .allowAllAccess(true)
        .allowHostClassLookup(className -> true)
        .build();
      contextInitializer.accept(ctx);
      allContexts.add(ctx);
      available.offer(ctx);
    }
  }

  public Context acquire(String operation) {
    Thread currentThread = Thread.currentThread();
    pendingRequests.put(currentThread, new PendingRequest(operation, System.currentTimeMillis()));
    try {
      Context ctx = available.take();
      pendingRequests.remove(currentThread);
      ctx.enter();
      return ctx;
    } catch (InterruptedException e) {
      pendingRequests.remove(currentThread);
      Thread.currentThread().interrupt();
      throw new RuntimeException("Interrupted while acquiring context", e);
    }
  }

  public void release(Context ctx) {
    ctx.leave();
    available.offer(ctx);
  }

  public <T> T executeInContext(String operation, ContextTask<T> task) {
    Context ctx = acquire(operation);
    try {
      return task.execute(ctx);
    } finally {
      release(ctx);
    }
  }

  public void executeInContext(String operation, ContextRunnable task) {
    Context ctx = acquire(operation);
    try {
      task.execute(ctx);
    } finally {
      release(ctx);
    }
  }

  public List<Context> getAllContexts() {
    return allContexts;
  }

  public int getTotalSize() {
    return allContexts.size();
  }

  public int getAvailableCount() {
    return available.size();
  }

  public int getBusyCount() {
    return allContexts.size() - available.size();
  }

  public List<QueuedOperation> getQueuedOperations() {
    long now = System.currentTimeMillis();
    return pendingRequests.values().stream()
      .map(req -> new QueuedOperation(req.operation, now - req.startTime))
      .toList();
  }

  public static class PendingRequest {
    final String operation;
    final long startTime;

    PendingRequest(String operation, long startTime) {
      this.operation = operation;
      this.startTime = startTime;
    }
  }

  public static class QueuedOperation {
    private final String operation;
    private final long waitTimeMs;

    QueuedOperation(String operation, long waitTimeMs) {
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

  public void close() {
    for (Context ctx : allContexts) {
      ctx.close();
    }
    engine.close();
  }

  @FunctionalInterface
  public interface ContextTask<T> {
    T execute(Context context);
  }

  @FunctionalInterface
  public interface ContextRunnable {
    void execute(Context context);
  }
}
