package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.command.system.CommandContext;
import com.hypixel.hytale.server.core.command.system.basecommands.CommandBase;
import org.graalvm.polyglot.Value;

import javax.annotation.Nonnull;

public class ScriptCommand extends CommandBase {
  private final Value callback;
  private final ScriptCommandContext contextWrapper;

  public ScriptCommand(String name, String description, Value callback) {
    super(name, description);
    this.callback = callback;
    this.contextWrapper = new ScriptCommandContext();
    setAllowsExtraArguments(true);
  }

  public ScriptCommand(String name, String description, String permission, Value callback) {
    super(name, description);
    this.callback = callback;
    this.contextWrapper = new ScriptCommandContext();
    setAllowsExtraArguments(true);
    if (permission != null && !permission.isEmpty()) {
      requirePermission(permission);
    }
  }

  @Override
  protected void executeSync(@Nonnull CommandContext context) {
    contextWrapper.setContext(context);
    callback.execute(contextWrapper);
  }

  public static class ScriptCommandContext {
    private CommandContext context;

    void setContext(CommandContext context) {
      this.context = context;
    }

    public void sendMessage(String message) {
      context.sendMessage(com.hypixel.hytale.server.core.Message.raw(message));
    }

    public String getSenderName() {
      return context.sender().getDisplayName();
    }

    public String getInput() {
      return context.getInputString();
    }
  }
}
