export function registerWallCommand(): void {
  commands.registerWorld("wall", "Create a wall in the direction you are facing", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");

    if (parts.length < 4) {
      ctx.sendMessage("Usage: /wall <length> <height> <block_id>");
      return;
    }

    const length = parseInt(parts[1], 10);
    const height = parseInt(parts[2], 10);
    const blockId = parts[3];

    if (isNaN(length) || length < 1 || length > 100) {
      ctx.sendMessage("Invalid length (1-100)");
      return;
    }

    if (isNaN(height) || height < 1 || height > 50) {
      ctx.sendMessage("Invalid height (1-50)");
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
    const rot = transform.getRotation();

    const baseX = Math.floor(pos.getX());
    const baseY = Math.floor(pos.getY());
    const baseZ = Math.floor(pos.getZ());

    const yaw = rot.getYaw();
    const radians = (yaw * Math.PI) / 180;

    const dirX = Math.round(-Math.sin(radians));
    const dirZ = Math.round(Math.cos(radians));

    const world = universe.getDefaultWorld();
    let count = 0;

    for (let i = 0; i < length; i++) {
      for (let y = 0; y < height; y++) {
        const blockX = baseX + dirX * i;
        const blockZ = baseZ + dirZ * i;
        world.setBlock(blockX, baseY + y, blockZ, blockId);
        count++;
      }
    }

    ctx.sendMessage("Created wall with " + count + " blocks");
  });
}
