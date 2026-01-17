export function registerSpinCommand(): void {
  commands.register("spin", "Spin around 180 degrees", (ctx) => {
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

    const currentTransform = foundPlayerRef.getTransform();
    const currentRotation = currentTransform.getRotation();

    const newRotation = new Vector3f(
      currentRotation.getX(),
      currentRotation.getY() + 180,
      currentRotation.getZ()
    );

    currentTransform.setRotation(newRotation);

    ctx.sendMessage("Spun 180 degrees!");
  });
}
