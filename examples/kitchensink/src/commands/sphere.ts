export function registerSphereCommand(): void {
  commands.registerWorld("sphere", "Create a sphere of blocks around your position", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");

    if (parts.length < 3) {
      ctx.sendMessage("Usage: /sphere <radius> <block_id>");
      return;
    }

    const radius = parseInt(parts[1], 10);
    const blockId = parts[2];

    if (isNaN(radius) || radius < 1 || radius > 50) {
      ctx.sendMessage("Invalid radius (1-50)");
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
    const centerX = Math.floor(pos.getX());
    const centerY = Math.floor(pos.getY());
    const centerZ = Math.floor(pos.getZ());

    const world = universe.getDefaultWorld();
    let count = 0;

    for (let x = -radius; x <= radius; x++) {
      for (let y = -radius; y <= radius; y++) {
        for (let z = -radius; z <= radius; z++) {
          const dist = Math.sqrt(x * x + y * y + z * z);
          if (dist <= radius && dist >= radius - 1) {
            world.setBlock(centerX + x, centerY + y, centerZ + z, blockId);
            count++;
          }
        }
      }
    }

    ctx.sendMessage("Created sphere with " + count + " blocks");
  });
}
