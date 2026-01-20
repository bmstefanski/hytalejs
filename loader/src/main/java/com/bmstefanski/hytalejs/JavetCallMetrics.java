package com.bmstefanski.hytalejs;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class JavetCallMetrics {
  private static final Map<String, MethodStats> methodStats = new ConcurrentHashMap<>();
  private static final AtomicLong totalCalls = new AtomicLong(0);
  private static final AtomicLong totalTimeNanos = new AtomicLong(0);

  public void record(String label, long durationNanos) {
    totalCalls.incrementAndGet();
    totalTimeNanos.addAndGet(durationNanos);
    methodStats.computeIfAbsent(label, k -> new MethodStats()).record(durationNanos);
  }

  public void reset() {
    methodStats.clear();
    totalCalls.set(0);
    totalTimeNanos.set(0);
  }

  public String getReport() {
    StringBuilder sb = new StringBuilder();
    sb.append("=== Javet Bridge Call Metrics ===\n");
    sb.append(String.format("Total calls: %d\n", totalCalls.get()));
    sb.append(String.format("Total time: %.2fms\n", totalTimeNanos.get() / 1_000_000.0));

    if (totalCalls.get() > 0) {
      sb.append(String.format("Avg time per call: %.4fms\n", (totalTimeNanos.get() / 1_000_000.0) / totalCalls.get()));
    }

    sb.append("\n--- Top Methods by Total Time ---\n");
    methodStats.entrySet().stream()
      .sorted((a, b) -> Long.compare(b.getValue().totalNanos.get(), a.getValue().totalNanos.get()))
      .limit(10)
      .forEach(entry -> {
        MethodStats stats = entry.getValue();
        sb.append(String.format("%s: %d calls, %.2fms total, %.4fms avg\n",
          entry.getKey(),
          stats.count.get(),
          stats.totalNanos.get() / 1_000_000.0,
          (stats.totalNanos.get() / 1_000_000.0) / stats.count.get()));
      });

    return sb.toString();
  }

  public long getTotalCalls() {
    return totalCalls.get();
  }

  public double getTotalTimeMs() {
    return totalTimeNanos.get() / 1_000_000.0;
  }

  public double getAvgTimeMs() {
    long calls = totalCalls.get();
    return calls > 0 ? (totalTimeNanos.get() / 1_000_000.0) / calls : 0;
  }

  public long nanoTime() {
    return System.nanoTime();
  }

  private static class MethodStats {
    final AtomicLong count = new AtomicLong(0);
    final AtomicLong totalNanos = new AtomicLong(0);

    void record(long nanos) {
      count.incrementAndGet();
      totalNanos.addAndGet(nanos);
    }
  }
}
