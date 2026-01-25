export function registerGetBlockCommand(): void {
  commands.register("getblock", "Get the block type at coordinates", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");

    if (parts.length < 4) {
      ctx.sendMessage("Usage: /getblock <x> <y> <z>");
      return;
    }

    const x = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    const z = parseInt(parts[3], 10);

    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      ctx.sendMessage("Invalid coordinates");
      return;
    }

    const world = Universe.get().getDefaultWorld();
    if (!world) {
      ctx.sendMessage("No default world configured");
      return;
    }
    const blockType = world.getBlockType(x, y, z);

    if (blockType) {
      ctx.sendMessage("Block at " + x + ", " + y + ", " + z + ": " + blockType.getId());
    } else {
      ctx.sendMessage("No block found at " + x + ", " + y + ", " + z);
    }
  });
}
