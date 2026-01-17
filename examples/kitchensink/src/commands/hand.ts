export function registerHandCommand(): void {
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
}
