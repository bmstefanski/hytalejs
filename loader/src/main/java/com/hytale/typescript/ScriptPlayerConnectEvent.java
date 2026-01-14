package com.hytale.typescript;

import com.hypixel.hytale.server.core.event.events.player.PlayerConnectEvent;
import com.hypixel.hytale.server.core.universe.PlayerRef;
import com.hypixel.hytale.server.core.universe.world.World;

public class ScriptPlayerConnectEvent {
    private final PlayerConnectEvent event;

    public ScriptPlayerConnectEvent(PlayerConnectEvent event) {
        this.event = event;
    }

    public String getPlayerName() {
        PlayerRef playerRef = event.getPlayerRef();
        return playerRef != null ? playerRef.getUsername() : "Unknown";
    }

    public String getPlayerUUID() {
        PlayerRef playerRef = event.getPlayerRef();
        return playerRef != null ? playerRef.getUuid().toString() : "Unknown";
    }

    public String getWorldName() {
        World world = event.getWorld();
        return world != null ? world.getName() : "Unknown";
    }

    public PlayerConnectEvent getOriginalEvent() {
        return event;
    }
}
