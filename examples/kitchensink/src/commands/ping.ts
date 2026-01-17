export function registerPingCommand(): void {
  commands.register("ping", "Check server latency and connection status", "server.ping", (ctx) => {
    ctx.sendMessage("Pong!");
  });
}
