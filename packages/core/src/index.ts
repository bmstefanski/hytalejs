export * from "./types";
import type { EventHandler, EventType } from "./types";

export const handlers: EventHandler[] = [];

export function EventListener(eventType: EventType) {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    handlers.push({
      eventType: eventType,
      callback: descriptor.value
    });
    return descriptor;
  };
}
