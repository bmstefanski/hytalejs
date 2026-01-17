export function registerTpCommand(): void {
  commands.register("tp", "Teleport to coordinates", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");

    if (parts.length < 4) {
      ctx.sendMessage("Usage: /tp <x> <y> <z>");
      return;
    }

    const x = parseFloat(parts[1]);
    const y = parseFloat(parts[2]);
    const z = parseFloat(parts[3]);

    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      ctx.sendMessage("Invalid coordinates");
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

    const newPosition = new Vector3d(x, y, z);
    const currentTransform = foundPlayerRef.getTransform();
    currentTransform.setPosition(newPosition);

    ctx.sendMessage(`Teleported to ${x.toFixed(1)}, ${y.toFixed(1)}, ${z.toFixed(1)}`);
  });
}
