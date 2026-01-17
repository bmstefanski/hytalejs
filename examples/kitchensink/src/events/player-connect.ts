import { type PlayerConnectEvent, EventListener, Colors } from "@hytalejs.com/core";

export class PlayerConnectHandler {
  @EventListener("PlayerConnectEvent")
  onPlayerJoin(event: PlayerConnectEvent): void {
    const player = event.getPlayer();
    const playerRef = event.getPlayerRef();
    const worldName = event.getWorld().getName();

    logger.info("Player " + playerRef.getUsername() + " joined world: " + worldName);

    player.sendMessage(
      Message.raw("Welcome to the server, " + playerRef.getUsername() + "!")
        .color(Colors.GREEN)
        .bold(true),
    );
    player.sendMessage(Message.raw("Players online: " + Universe.get().getPlayerCount()).color(Colors.GOLD));

    Universe.get().sendMessage(Message.raw(playerRef.getUsername() + " has joined the server!"));
  }
}
