export function registerServerInfoCommand(): void {
  commands.register("serverinfo", "Display server name, player count, and default world", (ctx) => {
    ctx.sendMessage("Server: " + HytaleServer.get().getServerName());
    ctx.sendMessage("Players: " + Universe.get().getPlayerCount());
    ctx.sendMessage("Default world: " + Universe.get().getDefaultWorld().getName());
  });
}
