import {
  PlayerConnectEvent,
  PlayerDisconnectEvent,
  PlayerChatEvent,
  EventListener,
  handlers,
  Colors
} from './types';

class HelloWorldPlugin {
  @EventListener("PlayerConnectEvent")
  onPlayerJoin(event: PlayerConnectEvent): void {
    const player = event.getPlayer();
    const playerRef = event.getPlayerRef();
    const worldName = event.getWorld().getName();

    logger.info("Player " + playerRef.getUsername() + " joined world: " + worldName);

    player.sendMessage(Message.create("Welcome to the server, " + playerRef.getUsername() + "!").color(Colors.GREEN).bold(true));
    player.sendMessage(Message.create("Players online: " + server.getPlayerCount()).color(Colors.GOLD));

    server.broadcast(playerRef.getUsername() + " has joined the server!");
  }

  @EventListener("PlayerDisconnectEvent")
  onPlayerLeave(event: PlayerDisconnectEvent): void {
    const playerRef = event.getPlayerRef();
    logger.info("Player " + playerRef.getUsername() + " left the server");
    server.broadcast(playerRef.getUsername() + " has left the server!");
  }

  @EventListener("PlayerChatEvent")
  onPlayerChat(event: PlayerChatEvent): void {
    const sender = event.getSender();
    const content = event.getContent();
    logger.info("[CHAT] " + sender.getUsername() + ": " + content);

    const playerName = Message.create(sender.getUsername()).color(Colors.GOLD).bold(true);
    const separator = Message.create(": ").color(Colors.GRAY);
    const messageText = Message.create(content).color(Colors.WHITE);

    const formattedMessage = Message.create("")
      .insert(playerName)
      .insert(separator)
      .insert(messageText);

    event.setCancelled(true);

    const targets = event.getTargets();
    for (let i = 0; i < targets.length; i++) {
      targets[i].sendMessage(formattedMessage);
    }
  }
}

new HelloWorldPlugin();

commands.register("hello", "Sends a personalized greeting to the player", (ctx) => {
  ctx.sendMessage("Hello, " + ctx.getSenderName() + "!");
});

commands.register("ping", "Check server latency and connection status", "server.ping", (ctx) => {
  ctx.sendMessage("Pong!");
});

commands.register("players", "Display a list of all currently online players", (ctx) => {
  const count = server.getPlayerCount();
  ctx.sendMessage("Online players: " + count);

  const players = server.getPlayers();
  for (let i = 0; i < players.length; i++) {
    ctx.sendMessage("- " + players[i].getUsername());
  }
});

commands.register("serverinfo", "Display server name, player count, and default world", (ctx) => {
  ctx.sendMessage("Server: " + server.getName());
  ctx.sendMessage("Players: " + server.getPlayerCount());
  ctx.sendMessage("Default world: " + server.getDefaultWorld().getName());
});
