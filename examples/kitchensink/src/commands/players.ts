export function registerPlayersCommand(): void {
  commands.register("players", "Display a list of all currently online players", (ctx) => {
    const universe = Universe.get();
    const count = universe.getPlayerCount();
    ctx.sendMessage("Online players: " + count);

    const players = universe.getPlayers();
    for (let i = 0; i < players.length; i++) {
      ctx.sendMessage("- " + players[i].getUsername());
    }
  });
}
