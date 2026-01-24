import { type PlayerConnectEvent, EventListener, Colors } from "@hytalejs.com/core";
import { showScoreboardHud } from "../hud/scoreboard";

export class PlayerConnectHandler {
  @EventListener("PlayerConnectEvent")
  onPlayerJoin(event: PlayerConnectEvent): void {
    const player = event.getPlayer();
    const playerRef = event.getPlayerRef();

    player.sendMessage(
      Message.raw("Welcome to the server, " + playerRef.getUsername() + "!")
        .color(Colors.GREEN)
        .bold(true),
    );
    player.sendMessage(Message.raw("Players online: " + Universe.get().getPlayerCount()).color(Colors.GOLD));

    showScoreboardHud(player);
  }
}
