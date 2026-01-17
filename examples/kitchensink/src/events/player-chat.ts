import { type PlayerChatEvent, EventListener, Colors } from "@hytalejs.com/core";

export class PlayerChatHandler {
  @EventListener("PlayerChatEvent")
  onPlayerChat(event: PlayerChatEvent): void {
    const sender = event.getSender();
    const content = event.getContent();
    logger.info("[CHAT] " + sender.getUsername() + ": " + content);

    const playerName = Message.raw(sender.getUsername()).color(Colors.GOLD).bold(true);
    const separator = Message.raw(": ").color(Colors.GRAY);
    const messageText = Message.raw(content).color(Colors.WHITE);

    const formattedMessage = Message.empty().insert(playerName).insert(separator).insert(messageText);

    event.setCancelled(true);

    const targets = event.getTargets();
    for (let i = 0; i < targets.length; i++) {
      targets[i].sendMessage(formattedMessage);
    }
  }
}
