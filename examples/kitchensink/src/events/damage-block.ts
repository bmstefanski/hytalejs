import { type DamageBlockEvent, EventListener } from "@hytalejs.com/core";

export class DamageBlockHandler {
  @EventListener("DamageBlockEvent")
  onBlockDamage(event: DamageBlockEvent): void {
    const targetBlock = event.getTargetBlock();
    const blockType = event.getBlockType();
    const damage = event.getDamage();
    logger.info("[TEST] DamageBlockEvent fired - Block: " + blockType + " damage: " + damage + " at " + targetBlock.getX() + ", " + targetBlock.getY() + ", " + targetBlock.getZ());
  }
}
