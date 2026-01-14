package com.bstefanski.hytalejs;

import com.hypixel.hytale.server.core.HytaleServer;
import com.hypixel.hytale.server.core.Message;
import com.hypixel.hytale.server.core.NameMatching;
import com.hypixel.hytale.server.core.universe.PlayerRef;
import com.hypixel.hytale.server.core.universe.Universe;
import com.hypixel.hytale.server.core.universe.world.World;

import java.util.List;
import java.util.Map;

public class ScriptServer {

    public List<PlayerRef> getPlayers() {
        return Universe.get().getPlayers();
    }

    public PlayerRef getPlayer(String name) {
        return Universe.get().getPlayer(name, NameMatching.EXACT_IGNORE_CASE);
    }

    public PlayerRef getPlayerByUUID(String uuid) {
        return Universe.get().getPlayer(java.util.UUID.fromString(uuid));
    }

    public int getPlayerCount() {
        return Universe.get().getPlayerCount();
    }

    public Map<String, World> getWorlds() {
        return Universe.get().getWorlds();
    }

    public World getWorld(String name) {
        return Universe.get().getWorld(name);
    }

    public World getDefaultWorld() {
        return Universe.get().getDefaultWorld();
    }

    public void broadcast(String message) {
        Universe.get().sendMessage(Message.raw(message));
    }

    public void broadcastMessage(Message message) {
        Universe.get().sendMessage(message);
    }

    public String getName() {
        return HytaleServer.get().getServerName();
    }

    public boolean isBooting() {
        return HytaleServer.get().isBooting();
    }

    public boolean isBooted() {
        return HytaleServer.get().isBooted();
    }

    public void shutdown() {
        HytaleServer.get().shutdownServer();
    }
}
