export function registerItemsCommand(): void {
  commands.register("items", "List all available item IDs", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");
    const filter = parts.length >= 2 ? parts[1].toLowerCase() : "";

    const store = Item.getAssetStore().getAssetMap();
    const map = store.getAssetMap();
    const keys = Object.keys(map);

    let count = 0;
    const maxResults = 20;

    for (let i = 0; i < keys.length && count < maxResults; i++) {
      const key = keys[i];
      if (!filter || key.toLowerCase().includes(filter)) {
        ctx.sendMessage(key);
        count++;
      }
    }

    const total = store.getAssetCount();
    ctx.sendMessage("Showing " + count + " of " + total + " items" + (filter ? " (filter: " + filter + ")" : ""));
  });
}
