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

commands.register("hand", "Show info about the item in your hand", (ctx) => {
  const senderName = ctx.getSenderName();
  const world = server.getDefaultWorld();
  const players = world.getPlayers();

  let foundPlayer = null;
  for (let i = 0; i < players.length; i++) {
    if (players[i].getDisplayName() === senderName) {
      foundPlayer = players[i];
      break;
    }
  }

  if (!foundPlayer) {
    ctx.sendMessage("Could not find player entity");
    return;
  }

  const inventory = foundPlayer.getInventory();
  const heldItem = inventory.getActiveHotbarItem();

  if (!heldItem || heldItem.isEmpty()) {
    ctx.sendMessage("You are not holding anything");
    return;
  }

  const item = heldItem.getItem();
  ctx.sendMessage("Item: " + item.getId());
  ctx.sendMessage("Quantity: " + heldItem.getQuantity());
  ctx.sendMessage("Durability: " + heldItem.getDurability() + "/" + heldItem.getMaxDurability());
});

commands.register("giveitem", "Give an item to yourself", (ctx) => {
  const input = ctx.getInput();
  const parts = input.split(" ");

  if (parts.length < 2) {
    ctx.sendMessage("Usage: /give <item_id> [quantity]");
    return;
  }

  const itemId = parts[1];
  const quantity = parts.length >= 3 ? parseInt(parts[2], 10) : 1;

  if (isNaN(quantity) || quantity < 1) {
    ctx.sendMessage("Invalid quantity");
    return;
  }

  const senderName = ctx.getSenderName();
  const world = server.getDefaultWorld();
  const players = world.getPlayers();

  let foundPlayer = null;
  for (let i = 0; i < players.length; i++) {
    if (players[i].getDisplayName() === senderName) {
      foundPlayer = players[i];
      break;
    }
  }

  if (!foundPlayer) {
    ctx.sendMessage("Could not find player entity");
    return;
  }

  const stack = new ItemStack(itemId, quantity);
  const inventory = foundPlayer.getInventory();
  inventory.getHotbar().addItemStack(stack);

  ctx.sendMessage("Gave " + quantity + "x " + itemId);
});

commands.register("items", "List all available item IDs", (ctx) => {
  const input = ctx.getInput();
  const parts = input.split(" ");
  const filter = parts.length >= 2 ? parts[1].toLowerCase() : "";

  const store = Item.getAssetStore().getAssetMap();
  const map = store.getAssetMap();
  const keys = map.keySet();
  const iterator = keys.iterator();

  let count = 0;
  const maxResults = 20;

  while (iterator.hasNext() && count < maxResults) {
    const key = iterator.next() as string;
    if (!filter || key.toLowerCase().includes(filter)) {
      ctx.sendMessage(key);
      count++;
    }
  }

  const total = store.getAssetCount();
  ctx.sendMessage("Showing " + count + " of " + total + " items" + (filter ? " (filter: " + filter + ")" : ""));
});
