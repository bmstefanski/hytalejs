export function registerItemsCommand(): void {
  commands.register("items", "List all available item IDs", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");
    const filter = parts.length >= 2 ? parts[1].toLowerCase() : "";

    const store = Item.getAssetStore().getAssetMap();
    const map = store.getAssetMap();
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

    const total = store.getAssetCount();
    ctx.sendMessage("Showing " + count + " of " + total + " items" + (filter ? " (filter: " + filter + ")" : ""));
  });
}
