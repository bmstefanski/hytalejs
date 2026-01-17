import { Colors } from "@hytalejs.com/core";

const autoMessages = [
  "Remember to stay hydrated!",
  "Tip: Press F3 to see debug info",
  "Join our Discord for updates!",
  "Have you explored the caves yet?",
  "Don't forget to save your progress!",
  "New items are added every week!",
  "Try out the /items command to see available items",
  "Found a bug? Report it on our Discord!",
];

export function startAutoMessages(): void {
  scheduler.runRepeating(
    () => {
      if (Universe.get().getPlayerCount() > 0) {
        const randomIndex = Math.floor(Math.random() * autoMessages.length);
        const message = Message.raw("[Auto] " + autoMessages[randomIndex])
          .color(Colors.CYAN)
          .italic(true);
        Universe.get().sendMessage(message);
      }
    },
    15000,
    15000,
  );
}
