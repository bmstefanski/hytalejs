export interface ScriptPlayer {
  sendMessage(message: string): void;
  getName(): string;
  getGameMode(): string;
  hasPermission(permission: string): boolean;
  runCommand(command: string): void;
  getX(): number;
  getY(): number;
  getZ(): number;
}

export interface PlayerConnectEvent {
  getPlayer(): ScriptPlayer;
  getPlayerName(): string;
  getPlayerUUID(): string;
  getWorldName(): string;
}

export interface ScriptLogger {
  info(message: string): void;
  warning(message: string): void;
  severe(message: string): void;
  fine(message: string): void;
}

export interface EventHandler {
  eventType: string;
  callback: (event: unknown) => void;
}

export const handlers: EventHandler[] = [];

export function EventListener(eventType: string) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    handlers.push({
      eventType: eventType,
      callback: originalMethod
    });

    return descriptor;
  };
}

declare global {
  const logger: ScriptLogger;
  const plugin: unknown;
}
