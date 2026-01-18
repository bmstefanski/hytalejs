package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.HytaleServer;
import org.graalvm.polyglot.Value;
import org.graalvm.polyglot.HostAccess;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;
import java.util.logging.Level;

public class ScriptScheduler {
  private static final Logger LOGGER = Logger.getLogger("HytaleJS|Scheduler");
  private ContextPool contextPool;
  private final ConcurrentHashMap<String, ScriptTask> scheduledTasks = new ConcurrentHashMap<>();

  public void setContextPool(ContextPool contextPool) {
    this.contextPool = contextPool;
  }

  private String getCallbackKey(Value callback) {
    return "cb_" + System.identityHashCode(callback);
  }

  @HostAccess.Export
  public ScriptTask runLater(Value callback, long delayMs) {
    String key = getCallbackKey(callback) + "_later_" + delayMs + "_" + System.currentTimeMillis();
    callback.getContext().getBindings("js").getMember("__schedulerCallbacks__").putMember(key, callback);

    ScheduledFuture<?> future = HytaleServer.SCHEDULED_EXECUTOR.schedule(
      () -> {
        try {
          if (contextPool != null) {
            contextPool.executeInContext("scheduler:runLater", (ContextPool.ContextRunnable) ctx -> {
              Value callbacks = ctx.getBindings("js").getMember("__schedulerCallbacks__");
              Value cb = callbacks.getMember(key);
              if (cb != null && cb.canExecute()) {
                cb.executeVoid();
                callbacks.removeMember(key);
              }
            });
          } else {
            callback.executeVoid();
          }
        } catch (Exception e) {
          LOGGER.log(Level.SEVERE, "Error in runLater task", e);
        }
      },
      delayMs,
      TimeUnit.MILLISECONDS
    );
    return new ScriptTask(future);
  }

  @HostAccess.Export
  public ScriptTask runRepeating(Value callback, long delayMs, long periodMs) {
    String key = getCallbackKey(callback) + "_repeat_" + delayMs + "_" + periodMs;

    ScriptTask existing = scheduledTasks.get(key);
    if (existing != null) {
      return existing;
    }

    callback.getContext().getBindings("js").getMember("__schedulerCallbacks__").putMember(key, callback);

    ScheduledFuture<?> future = HytaleServer.SCHEDULED_EXECUTOR.scheduleAtFixedRate(
      () -> {
        try {
          if (contextPool != null) {
            contextPool.executeInContext("scheduler:runRepeating", (ContextPool.ContextRunnable) ctx -> {
              Value callbacks = ctx.getBindings("js").getMember("__schedulerCallbacks__");
              Value cb = callbacks.getMember(key);
              if (cb != null && cb.canExecute()) {
                cb.executeVoid();
              }
            });
          } else {
            callback.executeVoid();
          }
        } catch (Exception e) {
          LOGGER.log(Level.SEVERE, "Error in runRepeating task", e);
        }
      },
      delayMs,
      periodMs,
      TimeUnit.MILLISECONDS
    );
    ScriptTask task = new ScriptTask(future);
    scheduledTasks.put(key, task);
    return task;
  }

  @HostAccess.Export
  public ScriptTask runRepeatingWithDelay(Value callback, long delayMs, long periodMs) {
    String key = getCallbackKey(callback) + "_repeatdelay_" + delayMs + "_" + periodMs;

    ScriptTask existing = scheduledTasks.get(key);
    if (existing != null) {
      return existing;
    }

    callback.getContext().getBindings("js").getMember("__schedulerCallbacks__").putMember(key, callback);

    ScheduledFuture<?> future = HytaleServer.SCHEDULED_EXECUTOR.scheduleWithFixedDelay(
      () -> {
        try {
          if (contextPool != null) {
            contextPool.executeInContext("scheduler:runRepeatingWithDelay", (ContextPool.ContextRunnable) ctx -> {
              Value callbacks = ctx.getBindings("js").getMember("__schedulerCallbacks__");
              Value cb = callbacks.getMember(key);
              if (cb != null && cb.canExecute()) {
                cb.executeVoid();
              }
            });
          } else {
            callback.executeVoid();
          }
        } catch (Exception e) {
          LOGGER.log(Level.SEVERE, "Error in runRepeatingWithDelay task", e);
        }
      },
      delayMs,
      periodMs,
      TimeUnit.MILLISECONDS
    );
    ScriptTask task = new ScriptTask(future);
    scheduledTasks.put(key, task);
    return task;
  }

  public void cancelAllTasks() {
    for (ScriptTask task : scheduledTasks.values()) {
      task.cancel();
    }
    scheduledTasks.clear();
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
