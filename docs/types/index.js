export * from "./types";
export * from "./ui-builder";
export const handlers = [];
export function EventListener(eventType) {
    return function (target, propertyKey, descriptor) {
        handlers.push({
            eventType: eventType,
            callback: descriptor.value,
        });
        return descriptor;
    };
}
