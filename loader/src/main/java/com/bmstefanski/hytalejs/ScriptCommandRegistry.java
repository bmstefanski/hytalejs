package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.plugin.JavaPlugin;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.logging.Level;

public class ScriptCommandRegistry {
  private final JavaPlugin plugin;
  private final Set<String> registeredCommandNames = new HashSet<>();
  private ScriptEventLoop eventLoop;

  public ScriptCommandRegistry(JavaPlugin plugin) {
    this.plugin = plugin;
  }

  public void setEventLoop(ScriptEventLoop eventLoop) {
    this.eventLoop = Objects.requireNonNull(eventLoop, "eventLoop");
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
    if (eventLoop == null) {
      throw new IllegalStateException("ScriptEventLoop not initialized; call setEventLoop() before registering commands");
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

    ScriptCommand command = permission != null && !permission.isEmpty()
      ? new ScriptCommand(name, description, permission, eventLoop)
      : new ScriptCommand(name, description, eventLoop);
    plugin.getCommandRegistry().registerCommand(command);
  }

  private void registerWorldWithPermission(String name, String description, String permission, Object callback) {
    if (eventLoop == null) {
      throw new IllegalStateException("ScriptEventLoop not initialized; call setEventLoop() before registering commands");
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

    WorldScriptCommand command = permission != null && !permission.isEmpty()
      ? new WorldScriptCommand(name, description, permission, eventLoop)
      : new WorldScriptCommand(name, description, eventLoop);
    plugin.getCommandRegistry().registerCommand(command);
  }
}
