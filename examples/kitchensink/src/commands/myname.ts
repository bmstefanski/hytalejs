export function registerMyNameCommand(): void {
  commands.register("myname", "Show your display name", (ctx) => {
    const senderName = ctx.getSenderName();
    const universe = Universe.get();
    const defaultWorld = universe.getDefaultWorld();
    const players = defaultWorld.getPlayers();

    let foundPlayer = null;
    for (let i = 0; i < players.length; i++) {
      if (players[i].getDisplayName() === senderName) {
        foundPlayer = players[i];
        break;
      }
    }

    if (!foundPlayer) {
      ctx.sendMessage("Could not find player");
      return;
    }

    const displayName = foundPlayer.getDisplayName();
    ctx.sendMessage("Your display name is: " + displayName);
  });
}
