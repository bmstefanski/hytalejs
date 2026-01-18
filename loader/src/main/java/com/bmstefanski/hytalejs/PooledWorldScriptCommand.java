package com.bmstefanski.hytalejs;

import com.hypixel.hytale.component.Ref;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.server.core.command.system.CommandContext;
import com.hypixel.hytale.server.core.command.system.basecommands.AbstractPlayerCommand;
import com.hypixel.hytale.server.core.universe.PlayerRef;
import com.hypixel.hytale.server.core.universe.world.World;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import org.graalvm.polyglot.Value;

import javax.annotation.Nonnull;

public class PooledWorldScriptCommand extends AbstractPlayerCommand {
  private final String commandName;
  private final ContextPool contextPool;

  public PooledWorldScriptCommand(String name, String description, ContextPool contextPool) {
    super(name, description);
    this.commandName = name;
    this.contextPool = contextPool;
    setAllowsExtraArguments(true);
  }

  public PooledWorldScriptCommand(String name, String description, String permission, ContextPool contextPool) {
    super(name, description);
    this.commandName = name;
    this.contextPool = contextPool;
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
    contextPool.executeInContext("command-world:/" + commandName, ctx -> {
      Value callbacks = ctx.getBindings("js").getMember("__commandCallbacks__");
      Value callback = callbacks.getMember(commandName);
      if (callback != null && callback.canExecute()) {
        PooledScriptCommand.ScriptCommandContext wrapper = new PooledScriptCommand.ScriptCommandContext(context);
        callback.execute(wrapper);
      }
    });
  }
}
