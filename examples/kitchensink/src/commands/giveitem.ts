export function registerGiveItemCommand(): void {
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
}
