export function registerSquareCommand(): void {
  commands.register("square", "Create a cube using batched block updates", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");

    if (parts.length < 3) {
      ctx.sendMessage("Usage: /square <size> <block_id>");
      return;
    }

    const size = parseInt(parts[1], 10);
    const blockId = parts[2];

    if (isNaN(size) || size < 1 || size > 31) {
      ctx.sendMessage("Invalid size (1-31, must fit in one section)");
      return;
    }

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

    const transform = foundPlayerRef.getTransform();
    const pos = transform.getPosition();
    const baseX = Math.floor(pos.getX());
    const baseY = Math.floor(pos.getY()) - 1;
    const baseZ = Math.floor(pos.getZ());

    const numericBlockId = BlockType.getBlockIdOrUnknown(blockId, "Unknown block: %s", blockId);

    const sectionX = ChunkUtil.chunkCoordinate(baseX);
    const sectionY = ChunkUtil.chunkCoordinate(baseY);
    const sectionZ = ChunkUtil.chunkCoordinate(baseZ);

    const cmds = [];

    for (let dx = 0; dx < size; dx++) {
      for (let dy = 0; dy < size; dy++) {
        for (let dz = 0; dz < size; dz++) {
          const worldX = baseX + dx;
          const worldY = baseY + dy;
          const worldZ = baseZ + dz;

          if (!ChunkUtil.isSameChunkSection(baseX, baseY, baseZ, worldX, worldY, worldZ)) {
            continue;
          }

          const index = ChunkUtil.indexBlock(worldX, worldY, worldZ);
          cmds.push(new SetBlockCmd(index, numericBlockId, 0, 0));
        }
      }
    }

    if (cmds.length === 0) {
      ctx.sendMessage("No blocks to place in current section");
      return;
    }

    const packet = new ServerSetBlocks(sectionX, sectionY, sectionZ, cmds);

    const allPlayers = universe.getPlayers();
    for (let i = 0; i < allPlayers.length; i++) {
      allPlayers[i].getPacketHandler().write(packet);
    }

    ctx.sendMessage("Created " + size + "x" + size + "x" + size + " cube with " + cmds.length + " blocks (batched)");
  });
}
