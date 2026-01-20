import { type BreakBlockEvent, EventListener } from "@hytalejs.com/core";

export class BreakBlockHandler {
  @EventListener("BreakBlockEvent")
  onBlockBreak(event: BreakBlockEvent): void {
    const targetBlock = event.getTargetBlock();
    const blockType = event.getBlockType();
    logger.info("[TEST] BreakBlockEvent fired - Block: " + blockType + " at " + targetBlock.getX() + ", " + targetBlock.getY() + ", " + targetBlock.getZ());
  }
}
