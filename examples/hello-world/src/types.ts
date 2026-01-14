export type EventType =
  | "BootEvent"
  | "ShutdownEvent"
  | "PrepareUniverseEvent"
  | "PlayerConnectEvent"
  | "PlayerDisconnectEvent"
  | "PlayerChatEvent"
  | "PlayerReadyEvent"
  | "PlayerInteractEvent"
  | "PlayerCraftEvent"
  | "PlayerMouseButtonEvent"
  | "PlayerMouseMotionEvent"
  | "PlayerSetupConnectEvent"
  | "PlayerSetupDisconnectEvent"
  | "AddPlayerToWorldEvent"
  | "DrainPlayerFromWorldEvent"
  | "PlayerRefEvent"
  | "PlayerEvent"
  | "EntityEvent"
  | "EntityRemoveEvent"
  | "LivingEntityInventoryChangeEvent"
  | "LivingEntityUseBlockEvent"
  | "BreakBlockEvent"
  | "PlaceBlockEvent"
  | "DamageBlockEvent"
  | "UseBlockEvent"
  | "DropItemEvent"
  | "InteractivelyPickupItemEvent"
  | "ChangeGameModeEvent"
  | "CraftRecipeEvent"
  | "DiscoverZoneEvent"
  | "SwitchActiveSlotEvent"
  | "PlayerPermissionChangeEvent"
  | "GroupPermissionChangeEvent"
  | "PlayerGroupEvent";

export type HexColor = `#${string}`;

export const Colors = {
  RED: "#FF0000" as HexColor,
  GREEN: "#00FF00" as HexColor,
  BLUE: "#0000FF" as HexColor,
  YELLOW: "#FFFF00" as HexColor,
  CYAN: "#00FFFF" as HexColor,
  MAGENTA: "#FF00FF" as HexColor,
  WHITE: "#FFFFFF" as HexColor,
  BLACK: "#000000" as HexColor,
  ORANGE: "#FFA500" as HexColor,
  PINK: "#FFC0CB" as HexColor,
  PURPLE: "#800080" as HexColor,
  GOLD: "#FFD700" as HexColor,
  GRAY: "#808080" as HexColor,
  LIGHT_GRAY: "#D3D3D3" as HexColor,
  DARK_GRAY: "#404040" as HexColor,
} as const;

export interface MessageInstance {
  color(color: HexColor): MessageInstance;
  bold(bold: boolean): MessageInstance;
  italic(italic: boolean): MessageInstance;
  monospace(mono: boolean): MessageInstance;
  link(url: string): MessageInstance;
  insert(message: MessageInstance): MessageInstance;
  param(key: string, value: string | number | boolean): MessageInstance;
  getRawText(): string;
}

export interface MessageFactory {
  create(text: string): MessageInstance;
}

export interface Player {
  getDisplayName(): string;
  sendMessage(message: MessageInstance): void;
  hasPermission(permission: string): boolean;
  getGameMode(): { name(): string };
}

export interface PlayerRef {
  getUsername(): string;
  getUuid(): { toString(): string };
  sendMessage(message: MessageInstance): void;
  getLanguage(): string;
  isValid(): boolean;
}

export interface World {
  getName(): string;
  getUuid(): { toString(): string };
}

export interface Entity {
  getId(): number;
  getWorld(): World;
}

export interface BlockPos {
  getX(): number;
  getY(): number;
  getZ(): number;
}

export interface PlayerConnectEvent {
  getPlayer(): Player;
  getPlayerRef(): PlayerRef;
  getWorld(): World;
  setWorld(world: World): void;
}

export interface PlayerDisconnectEvent {
  getPlayerRef(): PlayerRef;
}

export interface PlayerChatEvent {
  getSender(): PlayerRef;
  getContent(): string;
  setContent(content: string): void;
  getTargets(): PlayerRef[];
  isCancelled(): boolean;
  setCancelled(cancelled: boolean): void;
}

export interface PlayerReadyEvent {
  getPlayer(): Player;
  getPlayerRef(): PlayerRef;
}

export interface PlayerInteractEvent {
  getPlayer(): Player;
}

export interface PlayerCraftEvent {
  getPlayer(): Player;
}

export interface PlayerMouseButtonEvent {
  getPlayer(): Player;
  getButton(): number;
  isPressed(): boolean;
}

export interface PlayerMouseMotionEvent {
  getPlayer(): Player;
}

export interface PlayerSetupConnectEvent {
  getPlayerRef(): PlayerRef;
}

export interface PlayerSetupDisconnectEvent {
  getPlayerRef(): PlayerRef;
}

export interface AddPlayerToWorldEvent {
  getPlayer(): Player;
  getWorld(): World;
}

export interface DrainPlayerFromWorldEvent {
  getPlayer(): Player;
  getWorld(): World;
}

export interface PlayerRefEvent {
  getPlayerRef(): PlayerRef;
}

export interface PlayerEvent {
  getPlayer(): Player;
}

export interface EntityEvent {
  getEntity(): Entity;
}

export interface EntityRemoveEvent {
  getEntity(): Entity;
}

export interface LivingEntityInventoryChangeEvent {
  getEntity(): Entity;
}

export interface LivingEntityUseBlockEvent {
  getEntity(): Entity;
}

export interface BreakBlockEvent {
  getPlayer(): Player;
  getWorld(): World;
  isCancelled(): boolean;
  setCancelled(cancelled: boolean): void;
}

export interface PlaceBlockEvent {
  getPlayer(): Player;
  getWorld(): World;
  isCancelled(): boolean;
  setCancelled(cancelled: boolean): void;
}

export interface DamageBlockEvent {
  getPlayer(): Player;
  getWorld(): World;
}

export interface UseBlockEvent {
  getPlayer(): Player;
  getWorld(): World;
}

export interface DropItemEvent {
  getPlayer(): Player;
}

export interface InteractivelyPickupItemEvent {
  getPlayer(): Player;
}

export interface ChangeGameModeEvent {
  getPlayer(): Player;
  getNewGameMode(): string;
  getPreviousGameMode(): string;
}

export interface CraftRecipeEvent {
  getPlayer(): Player;
}

export interface DiscoverZoneEvent {
  getPlayer(): Player;
}

export interface SwitchActiveSlotEvent {
  getPlayer(): Player;
  getNewSlot(): number;
  getPreviousSlot(): number;
}

export interface PlayerPermissionChangeEvent {
  getPlayerRef(): PlayerRef;
}

export interface GroupPermissionChangeEvent {
  getGroupName(): string;
}

export interface PlayerGroupEvent {
  getPlayerRef(): PlayerRef;
  getGroupName(): string;
}

export interface BootEvent {}

export interface ShutdownEvent {}

export interface PrepareUniverseEvent {}

export interface ScriptLogger {
  info(message: string): void;
  warning(message: string): void;
  severe(message: string): void;
  fine(message: string): void;
}

export interface CommandContext {
  sendMessage(message: string): void;
  getSenderName(): string;
  getInput(): string;
}

export interface ScriptCommandRegistry {
  register(name: string, description: string, callback: (ctx: CommandContext) => void): void;
  register(name: string, description: string, permission: string, callback: (ctx: CommandContext) => void): void;
}

export interface ScriptServer {
  getPlayers(): PlayerRef[];
  getPlayer(name: string): PlayerRef | null;
  getPlayerByUUID(uuid: string): PlayerRef | null;
  getPlayerCount(): number;
  getWorlds(): Map<string, World>;
  getWorld(name: string): World | null;
  getDefaultWorld(): World;
  broadcast(message: string): void;
  broadcastMessage(message: MessageInstance): void;
  getName(): string;
  isBooting(): boolean;
  isBooted(): boolean;
  shutdown(): void;
}

export interface EventHandler {
  eventType: EventType;
  callback: (event: unknown) => void;
}

export const handlers: EventHandler[] = [];

export function EventListener(eventType: EventType) {
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
  const commands: ScriptCommandRegistry;
  const server: ScriptServer;
  const Message: MessageFactory;
}
