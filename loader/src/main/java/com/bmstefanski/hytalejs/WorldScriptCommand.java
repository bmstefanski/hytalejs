package com.bmstefanski.hytalejs;

import com.hypixel.hytale.component.Ref;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.server.core.command.system.CommandContext;
import com.hypixel.hytale.server.core.command.system.basecommands.AbstractPlayerCommand;
import com.hypixel.hytale.server.core.universe.PlayerRef;
import com.hypixel.hytale.server.core.universe.world.World;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;

import javax.annotation.Nonnull;

public class WorldScriptCommand extends AbstractPlayerCommand {
  private final String commandName;
  private final ScriptEventLoop eventLoop;

  public WorldScriptCommand(String name, String description, ScriptEventLoop eventLoop) {
    super(name, description);
    this.commandName = name;
    this.eventLoop = eventLoop;
    setAllowsExtraArguments(true);
  }

  public WorldScriptCommand(String name, String description, String permission, ScriptEventLoop eventLoop) {
    super(name, description);
    this.commandName = name;
    this.eventLoop = eventLoop;
    setAllowsExtraArguments(true);
    if (permission != null && !permission.isEmpty()) {
      requirePermission(permission);
    }
  }

  @Override
  protected void execute(
    @Nonnull CommandContext context,
    @Nonnull Store<EntityStore> store,
    @Nonnull Ref<EntityStore> ref,
    @Nonnull PlayerRef playerRef,
    @Nonnull World world
  ) {
    eventLoop.executeInRuntime("command-world:/" + commandName, runtime -> {
      try (ScriptValue callbacks = runtime.getGlobal("__commandCallbacks__")) {
        if (callbacks == null) {
          return;
        }
        try (ScriptValue callback = callbacks.getMember(commandName)) {
          if (callback != null && callback.isExecutable()) {
            ScriptCommand.ScriptCommandContext wrapper = new ScriptCommand.ScriptCommandContext(context);
            callback.executeVoid(wrapper);
          }
        }
      }
    });
  }
}
