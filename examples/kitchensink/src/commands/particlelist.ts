export function registerParticleListCommand(): void {
  commands.register("particlelist", "List all available particle system IDs", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");
    const filter = parts.length >= 2 ? parts[1].toLowerCase() : "";

    const assetMap = ParticleSystem.getAssetMap();
    const map = assetMap.getAssetMap();
    const keys = map.keySet();
    const iterator = keys.iterator();

    let count = 0;
    const maxResults = 20;

    while (iterator.hasNext() && count < maxResults) {
      const key = iterator.next() as string;
      if (!filter || key.toLowerCase().includes(filter)) {
        ctx.sendMessage(key);
        count++;
      }
    }

    const total = assetMap.getAssetCount();
    ctx.sendMessage("Showing " + count + " of " + total + " particles" + (filter ? " (filter: " + filter + ")" : ""));
  });
}
