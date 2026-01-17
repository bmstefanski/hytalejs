import { type PlayerDisconnectEvent, EventListener } from "@hytalejs.com/core";

export class PlayerDisconnectHandler {
  @EventListener("PlayerDisconnectEvent")
  onPlayerLeave(event: PlayerDisconnectEvent): void {
    const playerRef = event.getPlayerRef();
    logger.info("Player " + playerRef.getUsername() + " left the server");
    Universe.get().sendMessage(Message.raw(playerRef.getUsername() + " has left the server!"));
  }
}
