export function registerLongTaskCommand(): void {
  commands.register("longtask", "Simulates a 10 second blocking task", (ctx) => {
    ctx.sendMessage("Starting 10 second task...");

    const startTime = Date.now();
    const targetDuration = 10000;

    while (Date.now() - startTime < targetDuration) {}

    const elapsed = Date.now() - startTime;
    ctx.sendMessage("Task completed after " + elapsed + "ms");
  });
}
