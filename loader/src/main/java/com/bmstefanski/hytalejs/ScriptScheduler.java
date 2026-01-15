package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.HytaleServer;
import org.graalvm.polyglot.Value;
import org.graalvm.polyglot.HostAccess;

import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

public class ScriptScheduler {

  @HostAccess.Export
  public ScriptTask runLater(Value callback, long delayMs) {
    ScheduledFuture<?> future = HytaleServer.SCHEDULED_EXECUTOR.schedule(
      () -> callback.executeVoid(),
      delayMs,
      TimeUnit.MILLISECONDS
    );
    return new ScriptTask(future);
  }

  @HostAccess.Export
  public ScriptTask runRepeating(Value callback, long delayMs, long periodMs) {
    ScheduledFuture<?> future = HytaleServer.SCHEDULED_EXECUTOR.scheduleAtFixedRate(
      () -> callback.executeVoid(),
      delayMs,
      periodMs,
      TimeUnit.MILLISECONDS
    );
    return new ScriptTask(future);
  }

  @HostAccess.Export
  public ScriptTask runRepeatingWithDelay(Value callback, long delayMs, long periodMs) {
    ScheduledFuture<?> future = HytaleServer.SCHEDULED_EXECUTOR.scheduleWithFixedDelay(
      () -> callback.executeVoid(),
      delayMs,
      periodMs,
      TimeUnit.MILLISECONDS
    );
    return new ScriptTask(future);
  }

  public static class ScriptTask {
    private final ScheduledFuture<?> future;

    public ScriptTask(ScheduledFuture<?> future) {
      this.future = future;
    }

    @HostAccess.Export
    public void cancel() {
      future.cancel(false);
    }

    @HostAccess.Export
    public boolean isCancelled() {
      return future.isCancelled();
    }

    @HostAccess.Export
    public boolean isDone() {
      return future.isDone();
    }
  }
}
