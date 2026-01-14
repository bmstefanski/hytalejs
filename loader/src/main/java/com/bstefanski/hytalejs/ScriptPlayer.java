package com.bstefanski.hytalejs;

import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.Message;
import com.hypixel.hytale.server.core.HytaleServer;

public class ScriptPlayer {
    private final Player player;

    public ScriptPlayer(Player player) {
        this.player = player;
    }

    public void sendMessage(String message) {
        player.sendMessage(Message.raw(message));
    }

    public String getName() {
        return player.getDisplayName();
    }

    public String getGameMode() {
        return player.getGameMode().name();
    }

    public boolean hasPermission(String permission) {
        return player.hasPermission(permission);
    }

    public void runCommand(String command) {
        HytaleServer.get().getCommandManager().handleCommand(player, command);
    }

    public double getX() {
        return player.getTransformComponent().getPosition().getX();
    }

    public double getY() {
        return player.getTransformComponent().getPosition().getY();
    }

    public double getZ() {
        return player.getTransformComponent().getPosition().getZ();
    }

    public Player getOriginal() {
        return player;
    }
}
