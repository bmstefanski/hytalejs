package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.command.system.CommandContext;
import com.hypixel.hytale.server.core.command.system.basecommands.CommandBase;
import org.graalvm.polyglot.Value;
import org.graalvm.polyglot.HostAccess;

import javax.annotation.Nonnull;

public class PooledScriptCommand extends CommandBase {
  private final String commandName;
  private final ContextPool contextPool;

  public PooledScriptCommand(String name, String description, ContextPool contextPool) {
    super(name, description);
    this.commandName = name;
    this.contextPool = contextPool;
    setAllowsExtraArguments(true);
  }

  public PooledScriptCommand(String name, String description, String permission, ContextPool contextPool) {
    super(name, description);
    this.commandName = name;
    this.contextPool = contextPool;
    setAllowsExtraArguments(true);
    if (permission != null && !permission.isEmpty()) {
      requirePermission(permission);
    }
  }

  @Override
  protected void executeSync(@Nonnull CommandContext context) {
    contextPool.executeInContext(ctx -> {
      Value callbacks = ctx.getBindings("js").getMember("__commandCallbacks__");
      Value callback = callbacks.getMember(commandName);
      if (callback != null && callback.canExecute()) {
        ScriptCommandContext wrapper = new ScriptCommandContext(context);
        callback.execute(wrapper);
      }
    });
  }

  public static class ScriptCommandContext {
    private final CommandContext context;

    ScriptCommandContext(CommandContext context) {
      this.context = context;
    }

    @HostAccess.Export
    public void sendMessage(String message) {
      context.sendMessage(com.hypixel.hytale.server.core.Message.raw(message));
    }

    @HostAccess.Export
    public void sendFormattedMessage(Object message) {
      context.sendMessage((com.hypixel.hytale.server.core.Message) message);
    }

    @HostAccess.Export
    public String getSenderName() {
      return context.sender().getDisplayName();
    }

    @HostAccess.Export
    public String getInput() {
      return context.getInputString();
    }
  }
}
