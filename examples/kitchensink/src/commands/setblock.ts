export function registerSetBlockCommand(): void {
  commands.register("setblock", "Place a block at coordinates", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");

    if (parts.length < 5) {
      ctx.sendMessage("Usage: /setblock <x> <y> <z> <block_id> [rotation]");
      return;
    }

    const x = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    const z = parseInt(parts[3], 10);
    const blockId = parts[4];
    const rotation = parts.length >= 6 ? parseInt(parts[5], 10) : 0;

    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      ctx.sendMessage("Invalid coordinates");
      return;
    }

    if (isNaN(rotation) || rotation < 0) {
      ctx.sendMessage("Invalid rotation");
      return;
    }

    const world = Universe.get().getDefaultWorld();
    if (!world) {
      ctx.sendMessage("No default world configured");
      return;
    }
    world.setBlock(x, y, z, blockId, rotation);

    ctx.sendMessage("Set block " + blockId + " at " + x + ", " + y + ", " + z);
  });
}
