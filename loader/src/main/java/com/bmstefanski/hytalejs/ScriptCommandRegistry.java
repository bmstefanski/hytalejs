package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.plugin.JavaPlugin;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.logging.Level;

public class ScriptCommandRegistry {
  private final JavaPlugin plugin;
  private final Set<String> registeredCommandNames = new HashSet<>();
  private ScriptRuntimePool runtimePool;

  public ScriptCommandRegistry(JavaPlugin plugin) {
    this.plugin = plugin;
  }

  public void setRuntimePool(ScriptRuntimePool runtimePool) {
    this.runtimePool = Objects.requireNonNull(runtimePool, "runtimePool");
  }

  public void register(String name, String description, Object callback) {
    registerWithPermission(name, description, null, callback);
  }

  public void register(String name, String description, String permission, Object callback) {
    registerWithPermission(name, description, permission, callback);
  }

  public void registerWorld(String name, String description, Object callback) {
    registerWorldWithPermission(name, description, null, callback);
  }

  public void registerWorld(String name, String description, String permission, Object callback) {
    registerWorldWithPermission(name, description, permission, callback);
  }

  private void registerWithPermission(String name, String description, String permission, Object callback) {
    if (runtimePool == null) {
      throw new IllegalStateException("ScriptRuntimePool not initialized; call setRuntimePool() before registering commands");
    }

    ScriptValue callbackValue = ScriptValueFactory.from(callback);
    if (callbackValue == null || !callbackValue.isExecutable()) {
      plugin.getLogger().at(Level.SEVERE).log(
        "Command callback for '%s' is not executable (type: %s)",
        name,
        ScriptValueFactory.describe(callback)
      );
      if (callbackValue != null) {
        callbackValue.close();
      }
      return;
    }

    try (ScriptValue callbacks = callbackValue.getRuntime().getGlobal("__commandCallbacks__")) {
      if (callbacks == null) {
        plugin.getLogger().at(Level.SEVERE).log("Command callback map '__commandCallbacks__' is not initialized");
        return;
      }
      callbacks.setMember(name, callbackValue);
    } finally {
      callbackValue.close();
    }

    if (registeredCommandNames.contains(name)) {
      return;
    }
    registeredCommandNames.add(name);

    PooledScriptCommand command = permission != null && !permission.isEmpty()
      ? new PooledScriptCommand(name, description, permission, runtimePool)
      : new PooledScriptCommand(name, description, runtimePool);
    plugin.getCommandRegistry().registerCommand(command);
  }

  private void registerWorldWithPermission(String name, String description, String permission, Object callback) {
    if (runtimePool == null) {
      throw new IllegalStateException("ScriptRuntimePool not initialized; call setRuntimePool() before registering commands");
    }

    ScriptValue callbackValue = ScriptValueFactory.from(callback);
    if (callbackValue == null || !callbackValue.isExecutable()) {
      plugin.getLogger().at(Level.SEVERE).log(
        "Command callback for '%s' is not executable (type: %s)",
        name,
        ScriptValueFactory.describe(callback)
      );
      if (callbackValue != null) {
        callbackValue.close();
      }
      return;
    }

    try (ScriptValue callbacks = callbackValue.getRuntime().getGlobal("__commandCallbacks__")) {
      if (callbacks == null) {
        plugin.getLogger().at(Level.SEVERE).log("Command callback map '__commandCallbacks__' is not initialized");
        return;
      }
      callbacks.setMember(name, callbackValue);
    } finally {
      callbackValue.close();
    }

    if (registeredCommandNames.contains(name)) {
      return;
    }
    registeredCommandNames.add(name);

    PooledWorldScriptCommand command = permission != null && !permission.isEmpty()
      ? new PooledWorldScriptCommand(name, description, permission, runtimePool)
      : new PooledWorldScriptCommand(name, description, runtimePool);
    plugin.getCommandRegistry().registerCommand(command);
  }
}
