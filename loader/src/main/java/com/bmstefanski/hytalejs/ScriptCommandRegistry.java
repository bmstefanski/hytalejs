package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import org.graalvm.polyglot.Value;

import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;

public class ScriptCommandRegistry {
  private final JavaPlugin plugin;
  private final Set<String> registeredCommandNames = new HashSet<>();
  private ContextPool contextPool;

  public ScriptCommandRegistry(JavaPlugin plugin) {
    this.plugin = plugin;
  }

  public void setContextPool(ContextPool contextPool) {
    this.contextPool = contextPool;
  }

  public void register(String name, String description, Value callback) {
    registerWithPermission(name, description, null, callback);
  }

  public void register(String name, String description, String permission, Value callback) {
    registerWithPermission(name, description, permission, callback);
  }

  public void registerWorld(String name, String description, Value callback) {
    registerWorldWithPermission(name, description, null, callback);
  }

  public void registerWorld(String name, String description, String permission, Value callback) {
    registerWorldWithPermission(name, description, permission, callback);
  }

  private void registerWithPermission(String name, String description, String permission, Value callback) {
    if (!callback.canExecute()) {
      plugin.getLogger().at(Level.WARNING).log("Command callback for '%s' is not executable", name);
      return;
    }

    callback.getContext().getBindings("js").getMember("__commandCallbacks__").putMember(name, callback);

    if (registeredCommandNames.contains(name)) {
      return;
    }
    registeredCommandNames.add(name);

    PooledScriptCommand command = permission != null && !permission.isEmpty()
      ? new PooledScriptCommand(name, description, permission, () -> this.contextPool)
      : new PooledScriptCommand(name, description, () -> this.contextPool);
    plugin.getCommandRegistry().registerCommand(command);
    plugin.getLogger().at(Level.INFO).log("Registered command: /%s%s", name,
      permission != null && !permission.isEmpty() ? " (requires: " + permission + ")" : "");
  }

  private void registerWorldWithPermission(String name, String description, String permission, Value callback) {
    if (!callback.canExecute()) {
      plugin.getLogger().at(Level.WARNING).log("Command callback for '%s' is not executable", name);
      return;
    }

    callback.getContext().getBindings("js").getMember("__commandCallbacks__").putMember(name, callback);

    if (registeredCommandNames.contains(name)) {
      return;
    }
    registeredCommandNames.add(name);

    PooledWorldScriptCommand command = permission != null && !permission.isEmpty()
      ? new PooledWorldScriptCommand(name, description, permission, () -> this.contextPool)
      : new PooledWorldScriptCommand(name, description, () -> this.contextPool);
    plugin.getCommandRegistry().registerCommand(command);
    plugin.getLogger().at(Level.INFO).log("Registered world-thread command: /%s%s", name,
      permission != null && !permission.isEmpty() ? " (requires: " + permission + ")" : "");
  }
}
