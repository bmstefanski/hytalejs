import { type PlaceBlockEvent, EventListener } from "@hytalejs.com/core";

export class PlaceBlockHandler {
  @EventListener("PlaceBlockEvent")
  onBlockPlace(event: PlaceBlockEvent): void {
    const targetBlock = event.getTargetBlock();
    const itemInHand = event.getItemInHand();
    logger.info("[TEST] PlaceBlockEvent fired - Item: " + itemInHand + " at " + targetBlock.getX() + ", " + targetBlock.getY() + ", " + targetBlock.getZ());
  }
}
