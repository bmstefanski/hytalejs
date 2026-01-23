package com.bmstefanski.hytalejs;

import com.hypixel.hytale.component.Ref;
import com.hypixel.hytale.server.core.command.system.CommandContext;
import com.hypixel.hytale.server.core.command.system.CommandSender;
import com.hypixel.hytale.server.core.command.system.basecommands.CommandBase;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.util.function.Supplier;

public class ScriptCommand extends CommandBase {
  private final String commandName;
  private final Supplier<ScriptEventLoop> eventLoopSupplier;

  public ScriptCommand(String name, String description, Supplier<ScriptEventLoop> eventLoopSupplier) {
    super(name, description);
    this.commandName = name;
    this.eventLoopSupplier = eventLoopSupplier;
    setAllowsExtraArguments(true);
  }

  public ScriptCommand(String name, String description, String permission, Supplier<ScriptEventLoop> eventLoopSupplier) {
    super(name, description);
    this.commandName = name;
    this.eventLoopSupplier = eventLoopSupplier;
    setAllowsExtraArguments(true);
    if (permission != null && !permission.isEmpty()) {
      requirePermission(permission);
    }
  }

  @Override
  protected void executeSync(@Nonnull CommandContext context) {
    eventLoopSupplier.get().executeInRuntime("command:/" + commandName, runtime -> {
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

    public boolean isPlayer() {
      return context.isPlayer();
    }

    @Nonnull
    public CommandSender getSender() {
      return context.sender();
    }

    @Nullable
    public Player getPlayer() {
      if (context.isPlayer()) {
        return context.senderAs(Player.class);
      }
      return null;
    }

    @Nullable
    public Ref<EntityStore> getPlayerRef() {
      if (context.isPlayer()) {
        return context.senderAsPlayerRef();
      }
      return null;
    }
  }
}
