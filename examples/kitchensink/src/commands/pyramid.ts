export function registerPyramidCommand(): void {
  commands.register("pyramid", "Create a pyramid at your position", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");

    if (parts.length < 3) {
      ctx.sendMessage("Usage: /pyramid <size> <block_id>");
      return;
    }

    const size = parseInt(parts[1], 10);
    const blockId = parts[2];

    if (isNaN(size) || size < 1 || size > 50) {
      ctx.sendMessage("Invalid size (1-50)");
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

    const transform = foundPlayerRef.getTransform();
    const pos = transform.getPosition();
    const baseX = Math.floor(pos.getX());
    const baseY = Math.floor(pos.getY());
    const baseZ = Math.floor(pos.getZ());

    const world = universe.getDefaultWorld();
    let count = 0;

    for (let layer = 0; layer < size; layer++) {
      const layerSize = size - layer - 1;
      for (let x = -layerSize; x <= layerSize; x++) {
        for (let z = -layerSize; z <= layerSize; z++) {
          world.setBlock(baseX + x, baseY + layer, baseZ + z, blockId);
          count++;
        }
      }
    }

    ctx.sendMessage("Created pyramid with " + count + " blocks");
  });
}
