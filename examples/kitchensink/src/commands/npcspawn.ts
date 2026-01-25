export function registerNpcSpawnCommand(): void {
  commands.registerWorld("npcspawn", "Spawn an NPC by role name", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");

    if (parts.length < 2) {
      ctx.sendMessage("Usage: /npcspawn <role_name> [scale]");
      ctx.sendMessage("Example: /npcspawn trork_warrior");
      return;
    }

    const roleName = parts[1];
    const scale = parts.length >= 3 ? parseFloat(parts[2]) : 1.0;

    if (isNaN(scale) || scale <= 0) {
      ctx.sendMessage("Invalid scale value");
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
    const playerPos = transform.getPosition();
    const playerRot = transform.getRotation();

    const spawnPos = new Vector3d(playerPos.getX() + 2, playerPos.getY(), playerPos.getZ());
    const spawnRot = new Vector3f(0, playerRot.getYaw(), 0);

    const npcPlugin = NPCPlugin.get();

    if (!npcPlugin.hasRoleName(roleName)) {
      ctx.sendMessage("Unknown NPC role: " + roleName);
      ctx.sendMessage("Use /npcroles to see available roles");
      return;
    }

    const worldUuid = foundPlayerRef.getWorldUuid();
    if (!worldUuid) {
      ctx.sendMessage("Player is not in a world");
      return;
    }

    const world = universe.getWorld(worldUuid);
    if (!world) {
      ctx.sendMessage("Could not find player's world");
      return;
    }

    const store = world.getEntityStore().getStore();

    const result = npcPlugin.spawnNPC(store, roleName, null, spawnPos, spawnRot);

    if (result) {
      ctx.sendMessage("Spawned NPC: " + roleName);
    } else {
      ctx.sendMessage("Failed to spawn NPC: " + roleName);
    }
  });
}

export function registerNpcRolesCommand(): void {
  commands.register("npcroles", "List available NPC roles", (ctx) => {
    const npcPlugin = NPCPlugin.get();
    const roles = npcPlugin.getRoleTemplateNames(true);

    ctx.sendMessage("Available NPC roles (" + roles.length + "):");

    const maxDisplay = 20;
    for (let i = 0; i < Math.min(roles.length, maxDisplay); i++) {
      ctx.sendMessage("  - " + roles[i]);
    }

    if (roles.length > maxDisplay) {
      ctx.sendMessage("  ... and " + (roles.length - maxDisplay) + " more");
    }
  });
}

export function registerNpcDespawnCommand(): void {
  commands.registerWorld("npcdespawn", "Despawn nearby NPCs", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");

    const radius = parts.length >= 2 ? parseFloat(parts[1]) : 10.0;

    if (isNaN(radius) || radius <= 0) {
      ctx.sendMessage("Invalid radius");
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
    const playerPos = transform.getPosition();

    const worldUuid = foundPlayerRef.getWorldUuid();
    if (!worldUuid) {
      ctx.sendMessage("Player is not in a world");
      return;
    }

    const world = universe.getWorld(worldUuid);
    if (!world) {
      ctx.sendMessage("Could not find player's world");
      return;
    }

    const store = world.getEntityStore().getStore();

    const npcComponentType = NPCEntity.getComponentType();
    if (!npcComponentType) {
      ctx.sendMessage("NPC system not available");
      return;
    }

    let despawnCount = 0;
    const radiusSq = radius * radius;

    store.forEachChunk(npcComponentType, (archetypeChunk, commandBuffer) => {
      for (let index = 0; index < archetypeChunk.size(); index++) {
        const npcEntity = archetypeChunk.getComponent(index, npcComponentType);
        if (npcEntity) {
          const npcRef = archetypeChunk.getReferenceTo(index);
          const transformComponent = commandBuffer.getComponent(npcRef, TransformComponent.getComponentType());
          if (transformComponent) {
            const npcPos = transformComponent.getPosition();
            const dx = npcPos.getX() - playerPos.getX();
            const dy = npcPos.getY() - playerPos.getY();
            const dz = npcPos.getZ() - playerPos.getZ();
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq <= radiusSq) {
              npcEntity.setToDespawn();
              npcEntity.setDespawnTime(0);
              despawnCount++;
            }
          }
        }
      }
    });

    ctx.sendMessage("Marked " + despawnCount + " NPCs for despawn within " + radius + " blocks");
  });
}
