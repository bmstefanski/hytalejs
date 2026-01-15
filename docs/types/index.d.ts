export * from "./types";
import type { EventHandler, EventType } from "./types";
export declare const handlers: EventHandler[];
export declare function EventListener(eventType: EventType): (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
//# sourceMappingURL=index.d.ts.map