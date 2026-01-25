export function registerBreakBlockCommand(): void {
  commands.register("breakblock", "Break a block at coordinates", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");

    if (parts.length < 4) {
      ctx.sendMessage("Usage: /breakblock <x> <y> <z> [harvest_level]");
      return;
    }

    const x = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    const z = parseInt(parts[3], 10);
    const harvestLevel = parts.length >= 5 ? parseInt(parts[4], 10) : 1;

    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      ctx.sendMessage("Invalid coordinates");
      return;
    }

    if (isNaN(harvestLevel) || harvestLevel < 0) {
      ctx.sendMessage("Invalid harvest level");
      return;
    }

    const world = Universe.get().getDefaultWorld();
    if (!world) {
      ctx.sendMessage("No default world configured");
      return;
    }
    const success = world.breakBlock(x, y, z, harvestLevel);

    if (success) {
      ctx.sendMessage("Broke block at " + x + ", " + y + ", " + z);
    } else {
      ctx.sendMessage("Could not break block at " + x + ", " + y + ", " + z);
    }
  });
}
