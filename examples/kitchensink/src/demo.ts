import { type PlayerConnectEvent, type PlayerDisconnectEvent, type PlayerChatEvent, EventListener, Colors } from "@hytalejs.com/core";

class HelloWorldPlugin {
  @EventListener("PlayerConnectEvent")
  onPlayerJoin(event: PlayerConnectEvent): void {
    const player = event.getPlayer();
    const playerRef = event.getPlayerRef();
    const worldName = event.getWorld().getName();

    logger.info("Player " + playerRef.getUsername() + " joined world: " + worldName);

    player.sendMessage(
      Message.raw("Welcome to the server, " + playerRef.getUsername() + "!")
        .color(Colors.GREEN)
        .bold(true),
    );
    player.sendMessage(Message.raw("Players online: " + Universe.get().getPlayerCount()).color(Colors.GOLD));

    Universe.get().sendMessage(Message.raw(playerRef.getUsername() + " has joined the server!"));
  }

  @EventListener("PlayerDisconnectEvent")
  onPlayerLeave(event: PlayerDisconnectEvent): void {
    const playerRef = event.getPlayerRef();
    logger.info("Player " + playerRef.getUsername() + " left the server");
    Universe.get().sendMessage(Message.raw(playerRef.getUsername() + " has left the server!"));
  }

  @EventListener("PlayerChatEvent")
  onPlayerChat(event: PlayerChatEvent): void {
    const sender = event.getSender();
    const content = event.getContent();
    logger.info("[CHAT] " + sender.getUsername() + ": " + content);

    const playerName = Message.raw(sender.getUsername()).color(Colors.GOLD).bold(true);
    const separator = Message.raw(": ").color(Colors.GRAY);
    const messageText = Message.raw(content).color(Colors.WHITE);

    const formattedMessage = Message.empty().insert(playerName).insert(separator).insert(messageText);

    event.setCancelled(true);

    const targets = event.getTargets();
    for (let i = 0; i < targets.length; i++) {
      targets[i].sendMessage(formattedMessage);
    }
  }
}

commands.register("hello", "Sends a personalized greeting to the player", (ctx) => {
  ctx.sendMessage("Hello, " + ctx.getSenderName() + "!");
});

commands.register("ping", "Check server latency and connection status", "server.ping", (ctx) => {
  ctx.sendMessage("Pong!");
});

commands.register("players", "Display a list of all currently online players", (ctx) => {
  const universe = Universe.get();
  const count = universe.getPlayerCount();
  ctx.sendMessage("Online players: " + count);

  const players = universe.getPlayers();
  for (let i = 0; i < players.length; i++) {
    ctx.sendMessage("- " + players[i].getUsername());
  }
});

commands.register("serverinfo", "Display server name, player count, and default world", (ctx) => {
  ctx.sendMessage("Server: " + HytaleServer.get().getServerName());
  ctx.sendMessage("Players: " + Universe.get().getPlayerCount());
  ctx.sendMessage("Default world: " + Universe.get().getDefaultWorld().getName());
});

commands.register("hand", "Show info about the item in your hand", (ctx) => {
  const senderName = ctx.getSenderName();
  const world = Universe.get().getDefaultWorld();
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
  const world = Universe.get().getDefaultWorld();
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

const autoMessages = [
  "Remember to stay hydrated!",
  "Tip: Press F3 to see debug info",
  "Join our Discord for updates!",
  "Have you explored the caves yet?",
  "Don't forget to save your progress!",
  "New items are added every week!",
  "Try out the /items command to see available items",
  "Found a bug? Report it on our Discord!",
];

scheduler.runRepeating(
  () => {
    if (Universe.get().getPlayerCount() > 0) {
      const randomIndex = Math.floor(Math.random() * autoMessages.length);
      const message = Message.raw("[Auto] " + autoMessages[randomIndex])
        .color(Colors.CYAN)
        .italic(true);
      Universe.get().sendMessage(message);
    }
  },
  15000,
  15000,
);

commands.register("soundlist", "List all available sound IDs", (ctx) => {
  const input = ctx.getInput();
  const parts = input.split(" ");
  const filter = parts.length >= 2 ? parts[1].toLowerCase() : "";

  const assetMap = SoundEvent.getAssetMap();
  const map = assetMap.getAssetMap();
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

  const total = assetMap.getAssetCount();
  ctx.sendMessage("Showing " + count + " of " + total + " sounds" + (filter ? " (filter: " + filter + ")" : ""));
});

commands.register("playsound", "Play a sound to yourself", (ctx) => {
  const input = ctx.getInput();
  const parts = input.split(" ");

  if (parts.length < 2) {
    ctx.sendMessage("Usage: /playsound <sound_id> [volume] [pitch]");
    return;
  }

  const soundId = parts[1];
  const volume = parts.length >= 3 ? parseFloat(parts[2]) : 1.0;
  const pitch = parts.length >= 4 ? parseFloat(parts[3]) : 1.0;

  if (isNaN(volume) || volume < 0 || volume > 2) {
    ctx.sendMessage("Invalid volume (0-2)");
    return;
  }

  if (isNaN(pitch) || pitch < 0.5 || pitch > 2) {
    ctx.sendMessage("Invalid pitch (0.5-2)");
    return;
  }

  const assetMap = SoundEvent.getAssetMap();
  const soundIndex = assetMap.getIndex(soundId);

  if (soundIndex < 0) {
    ctx.sendMessage("Sound not found: " + soundId);
    return;
  }

  const senderName = ctx.getSenderName();
  const universe = Universe.get();
  const players = universe.getPlayers();

  let foundPlayerRef = null;
  for (let i = 0; i < players.length; i++) {
    if (players[i].getUsername() === senderName) {
      foundPlayerRef = players[i];
      break;
    }
  }

  if (!foundPlayerRef) {
    ctx.sendMessage("Could not find player");
    return;
  }

  const packet = new PlaySoundEvent2D(soundIndex, SoundCategory.SFX, volume, pitch);
  foundPlayerRef.getPacketHandler().write(packet);

  ctx.sendMessage("Playing sound: " + soundId);
});

commands.register("dynamiclight", "Create and manipulate dynamic lights", (ctx) => {
  const input = ctx.getInput();
  const parts = input.split(" ");

  if (parts.length < 5) {
    ctx.sendMessage("Usage: /dynamiclight <r> <g> <b> <a>");
    ctx.sendMessage("Example: /dynamiclight 127 100 50 100");
    ctx.sendMessage("Note: Values are Java bytes (-128 to 127)");
    return;
  }

  const r = parseInt(parts[1], 10);
  const g = parseInt(parts[2], 10);
  const b = parseInt(parts[3], 10);
  const a = parseInt(parts[4], 10);

  if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
    ctx.sendMessage("Invalid color values. Use integers -128 to 127");
    return;
  }

  if (r < -128 || r > 127 || g < -128 || g > 127 || b < -128 || b > 127 || a < -128 || a > 127) {
    ctx.sendMessage("Color values must be between -128 and 127 (Java byte range)");
    return;
  }

  const ColorLightClass = Java.type("com.hypixel.hytale.protocol.ColorLight") as typeof ColorLight;
  const actualLight = new ColorLightClass(r as never, g as never, b as never, a as never);

  const DynamicLightClass = Java.type("com.hypixel.hytale.server.core.modules.entity.component.DynamicLight") as typeof DynamicLight;
  const dynamicLight = new DynamicLightClass(actualLight);

  ctx.sendMessage("Created DynamicLight with color:");
  ctx.sendMessage("R: " + dynamicLight.getColorLight().getRed());
  ctx.sendMessage("G: " + dynamicLight.getColorLight().getGreen());
  ctx.sendMessage("B: " + dynamicLight.getColorLight().getBlue());
  ctx.sendMessage("A: " + dynamicLight.getColorLight().getAlpha());

  const halfR = Math.floor(r / 2);
  const halfG = Math.floor(g / 2);
  const halfB = Math.floor(b / 2);
  const newColor = new ColorLightClass(halfR as never, halfG as never, halfB as never, a as never);
  dynamicLight.setColorLight(newColor);

  ctx.sendMessage("Updated to half brightness:");
  ctx.sendMessage("R: " + dynamicLight.getColorLight().getRed());
  ctx.sendMessage("G: " + dynamicLight.getColorLight().getGreen());
  ctx.sendMessage("B: " + dynamicLight.getColorLight().getBlue());

  const PersistentDynamicLightClass = Java.type(
    "com.hypixel.hytale.server.core.modules.entity.component.PersistentDynamicLight",
  ) as typeof PersistentDynamicLight;
  const persistentLight = new PersistentDynamicLightClass(actualLight);
  ctx.sendMessage("Created PersistentDynamicLight (persists across saves)");
  ctx.sendMessage("Persistent R: " + persistentLight.getColorLight().getRed());
});
