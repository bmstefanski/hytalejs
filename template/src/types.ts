export interface PlayerConnectEvent {
  getPlayerName(): string;
  getPlayerUUID(): string;
  getWorldName(): string;
}

export interface HytaleLogger {
  at(level: LogLevel): LogBuilder;
}

export interface LogBuilder {
  log(message: string, ...args: unknown[]): void;
  withCause(error: Error): LogBuilder;
}

export enum LogLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  SEVERE = 'SEVERE',
  FINE = 'FINE',
  FINER = 'FINER',
  FINEST = 'FINEST'
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

declare const logger: HytaleLogger;
declare const plugin: unknown;

export { logger, plugin };
