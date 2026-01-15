export * from "./types";
export const handlers = [];
export function EventListener(eventType) {
    return function (target, propertyKey, descriptor) {
        handlers.push({
            eventType: eventType,
            callback: descriptor.value
        });
        return descriptor;
    };
}
