package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.HytaleServer;
import org.graalvm.polyglot.HostAccess;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;
import java.util.logging.Level;

public class ScriptScheduler {
  private static final Logger LOGGER = Logger.getLogger("HytaleJS|Scheduler");
  private ScriptRuntimePool runtimePool;
  private final ConcurrentHashMap<String, ScriptTask> scheduledTasks = new ConcurrentHashMap<>();

  public void setRuntimePool(ScriptRuntimePool runtimePool) {
    this.runtimePool = runtimePool;
  }

  private String getCallbackKey(Object callback) {
    return "cb_" + System.identityHashCode(callback);
  }

  @HostAccess.Export
  public ScriptTask runLater(Object callback, long delayMs) {
    ScriptValue callbackValue = ScriptValueFactory.from(callback);
    if (callbackValue == null || !callbackValue.isExecutable()) {
      LOGGER.log(Level.SEVERE, "runLater callback is not executable (type: {0})", ScriptValueFactory.describe(callback));
      if (callbackValue != null) {
        callbackValue.close();
      }
      return new ScriptTask(null);
    }
    if (runtimePool == null) {
      LOGGER.log(Level.SEVERE, "runLater callback scheduled without an initialized runtime pool");
      callbackValue.close();
      return new ScriptTask(null);
    }

    String key = getCallbackKey(callback) + "_later_" + delayMs + "_" + System.currentTimeMillis();
    try (ScriptValue callbacks = callbackValue.getRuntime().getGlobal("__schedulerCallbacks__")) {
      if (callbacks != null) {
        callbacks.setMember(key, callbackValue);
      }
    } finally {
      callbackValue.close();
    }

    ScheduledFuture<?> future = HytaleServer.SCHEDULED_EXECUTOR.schedule(
      () -> {
        try {
          if (runtimePool == null) {
            return;
          }
          runtimePool.executeInRuntime("scheduler:runLater", runtime -> {
            try (ScriptValue callbacks = runtime.getGlobal("__schedulerCallbacks__")) {
              if (callbacks == null) {
                return;
              }
              try (ScriptValue cb = callbacks.getMember(key)) {
                if (cb != null && cb.isExecutable()) {
                  cb.executeVoid();
                  callbacks.removeMember(key);
                }
              }
            }
          });
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
  public ScriptTask runRepeating(Object callback, long delayMs, long periodMs) {
    ScriptValue callbackValue = ScriptValueFactory.from(callback);
    if (callbackValue == null || !callbackValue.isExecutable()) {
      LOGGER.log(Level.SEVERE, "runRepeating callback is not executable (type: {0})", ScriptValueFactory.describe(callback));
      if (callbackValue != null) {
        callbackValue.close();
      }
      return new ScriptTask(null);
    }
    if (runtimePool == null) {
      LOGGER.log(Level.SEVERE, "runRepeating callback scheduled without an initialized runtime pool");
      callbackValue.close();
      return new ScriptTask(null);
    }

    String key = getCallbackKey(callback) + "_repeat_" + delayMs + "_" + periodMs;

    ScriptTask existing = scheduledTasks.get(key);
    if (existing != null) {
      callbackValue.close();
      return existing;
    }

    try (ScriptValue callbacks = callbackValue.getRuntime().getGlobal("__schedulerCallbacks__")) {
      if (callbacks != null) {
        callbacks.setMember(key, callbackValue);
      }
    } finally {
      callbackValue.close();
    }

    ScheduledFuture<?> future = HytaleServer.SCHEDULED_EXECUTOR.scheduleAtFixedRate(
      () -> {
        try {
          if (runtimePool == null) {
            return;
          }
          runtimePool.executeInRuntime("scheduler:runRepeating", runtime -> {
            try (ScriptValue callbacks = runtime.getGlobal("__schedulerCallbacks__")) {
              if (callbacks == null) {
                return;
              }
              try (ScriptValue cb = callbacks.getMember(key)) {
                if (cb != null && cb.isExecutable()) {
                  cb.executeVoid();
                }
              }
            }
          });
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
  public ScriptTask runRepeatingWithDelay(Object callback, long delayMs, long periodMs) {
    ScriptValue callbackValue = ScriptValueFactory.from(callback);
    if (callbackValue == null || !callbackValue.isExecutable()) {
      LOGGER.log(Level.SEVERE, "runRepeatingWithDelay callback is not executable (type: {0})", ScriptValueFactory.describe(callback));
      if (callbackValue != null) {
        callbackValue.close();
      }
      return new ScriptTask(null);
    }
    if (runtimePool == null) {
      LOGGER.log(Level.SEVERE, "runRepeatingWithDelay callback scheduled without an initialized runtime pool");
      callbackValue.close();
      return new ScriptTask(null);
    }

    String key = getCallbackKey(callback) + "_repeatdelay_" + delayMs + "_" + periodMs;

    ScriptTask existing = scheduledTasks.get(key);
    if (existing != null) {
      callbackValue.close();
      return existing;
    }

    try (ScriptValue callbacks = callbackValue.getRuntime().getGlobal("__schedulerCallbacks__")) {
      if (callbacks != null) {
        callbacks.setMember(key, callbackValue);
      }
    } finally {
      callbackValue.close();
    }

    ScheduledFuture<?> future = HytaleServer.SCHEDULED_EXECUTOR.scheduleWithFixedDelay(
      () -> {
        try {
          if (runtimePool == null) {
            return;
          }
          runtimePool.executeInRuntime("scheduler:runRepeatingWithDelay", runtime -> {
            try (ScriptValue callbacks = runtime.getGlobal("__schedulerCallbacks__")) {
              if (callbacks == null) {
                return;
              }
              try (ScriptValue cb = callbacks.getMember(key)) {
                if (cb != null && cb.isExecutable()) {
                  cb.executeVoid();
                }
              }
            }
          });
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
      if (future != null) {
        future.cancel(false);
      }
    }

    @HostAccess.Export
    public boolean isCancelled() {
      return future != null && future.isCancelled();
    }

    @HostAccess.Export
    public boolean isDone() {
      return future != null && future.isDone();
    }
  }
}
