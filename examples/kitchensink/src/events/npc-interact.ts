import { type PlayerInteractEvent, EventListener, Colors } from "@hytalejs.com/core";

export class NPCInteractHandler {
  @EventListener("PlayerInteractEvent")
  onPlayerInteractWithNPC(event: PlayerInteractEvent): void {
    const targetEntity = event.getTargetEntity();
    if (!targetEntity) {
      return;
    }

    const npcComponentType = NPCEntity.getComponentType();
    if (!npcComponentType) {
      return;
    }

    const targetRef = event.getTargetRef();
    if (!targetRef || !targetRef.isValid()) {
      return;
    }

    const player = event.getPlayer();
    const world = player.getWorld();
    const store = world.getEntityStore().getStore();

    const npcEntity = store.getComponent(targetRef, npcComponentType);
    if (!npcEntity) {
      return;
    }

    const role = npcEntity.getRole();
    const roleName = npcEntity.getRoleName() || "Unknown";

    if (role) {
      const entitySupport = role.getEntitySupport();
      const displayName = entitySupport.getDisplayName() || roleName;

      player.sendMessage(
        Message.raw("You interacted with: " + displayName)
          .color(Colors.CYAN)
          .bold(true),
      );

      const stateSupport = role.getStateSupport();
      const currentState = stateSupport.getState();
      if (currentState) {
        player.sendMessage(Message.raw("  Current state: " + currentState).color(Colors.GRAY));
      }

      const positionCache = role.getPositionCache();
      const npcPos = positionCache.getPosition();
      player.sendMessage(Message.raw("  Position: " + Math.floor(npcPos.getX()) + ", " + Math.floor(npcPos.getY()) + ", " + Math.floor(npcPos.getZ())).color(Colors.GRAY));
    } else {
      player.sendMessage(Message.raw("You interacted with NPC: " + roleName).color(Colors.CYAN));
    }
  }
}
