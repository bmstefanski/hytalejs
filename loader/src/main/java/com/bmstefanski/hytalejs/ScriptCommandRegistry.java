package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import org.graalvm.polyglot.Value;

import java.util.logging.Level;

public class ScriptCommandRegistry {
  private final JavaPlugin plugin;

  public ScriptCommandRegistry(JavaPlugin plugin) {
    this.plugin = plugin;
  }

  public void register(String name, String description, Value callback) {
    registerWithPermission(name, description, null, callback);
  }

  public void register(String name, String description, String permission, Value callback) {
    registerWithPermission(name, description, permission, callback);
  }

  private void registerWithPermission(String name, String description, String permission, Value callback) {
    if (!callback.canExecute()) {
      plugin.getLogger().at(Level.WARNING).log("Command callback for '%s' is not executable", name);
      return;
    }

    ScriptCommand command = permission != null && !permission.isEmpty()
      ? new ScriptCommand(name, description, permission, callback)
      : new ScriptCommand(name, description, callback);
    plugin.getCommandRegistry().registerCommand(command);
    plugin.getLogger().at(Level.INFO).log("Registered command: /%s%s", name,
      permission != null && !permission.isEmpty() ? " (requires: " + permission + ")" : "");
  }
}
