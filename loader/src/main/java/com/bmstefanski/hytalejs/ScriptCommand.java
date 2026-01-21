package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.command.system.CommandContext;
import com.hypixel.hytale.server.core.command.system.basecommands.CommandBase;

import javax.annotation.Nonnull;

public class ScriptCommand extends CommandBase {
  private final String commandName;
  private final ScriptEventLoop eventLoop;

  public ScriptCommand(String name, String description, ScriptEventLoop eventLoop) {
    super(name, description);
    this.commandName = name;
    this.eventLoop = eventLoop;
    setAllowsExtraArguments(true);
  }

  public ScriptCommand(String name, String description, String permission, ScriptEventLoop eventLoop) {
    super(name, description);
    this.commandName = name;
    this.eventLoop = eventLoop;
    setAllowsExtraArguments(true);
    if (permission != null && !permission.isEmpty()) {
      requirePermission(permission);
    }
  }

  @Override
  protected void executeSync(@Nonnull CommandContext context) {
    eventLoop.executeInRuntime("command:/" + commandName, runtime -> {
      try (ScriptValue callbacks = runtime.getGlobal("__commandCallbacks__")) {
        if (callbacks == null) {
          return;
        }
        try (ScriptValue callback = callbacks.getMember(commandName)) {
          if (callback != null && callback.isExecutable()) {
            ScriptCommandContext wrapper = new ScriptCommandContext(context);
            callback.executeVoid(wrapper);
          }
        }
      }
    });
  }

  public static class ScriptCommandContext {
    private final CommandContext context;

    ScriptCommandContext(CommandContext context) {
      this.context = context;
    }

    public void sendMessage(String message) {
      context.sendMessage(com.hypixel.hytale.server.core.Message.raw(message));
    }

    public void sendFormattedMessage(Object message) {
      context.sendMessage((com.hypixel.hytale.server.core.Message) message);
    }

    public String getSenderName() {
      return context.sender().getDisplayName();
    }

    public String getInput() {
      return context.getInputString();
    }
  }
}
