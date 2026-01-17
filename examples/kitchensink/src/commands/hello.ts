export function registerHelloCommand(): void {
  commands.register("hello", "Sends a personalized greeting to the player", (ctx) => {
    ctx.sendMessage("Hello, " + ctx.getSenderName() + "!");
  });
}
