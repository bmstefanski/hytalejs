
export interface BootEvent {
  toString(): string;
}

export interface ShutdownEvent {
  toString(): string;
}

export interface PrepareUniverseEvent {
  toString(): string;
  getWorldConfigProvider(): WorldConfigProvider;
  setWorldConfigProvider(arg0: WorldConfigProvider): void;
}

export interface PlayerConnectEvent {
  toString(): string;
  getHolder(): Holder;
  getPlayerRef(): PlayerRef;
  getPlayer(): Player;
  getWorld(): World;
  setWorld(arg0: World): void;
}

export interface PlayerDisconnectEvent {
  toString(): string;
  getDisconnectReason(): DisconnectReason;
  getPlayerRef(): PlayerRef;
}

export interface PlayerChatEvent {
  toString(): string;
  getContent(): string;
  isCancelled(): boolean;
  setFormatter(arg0: Formatter): void;
  getFormatter(): Formatter;
  setSender(arg0: PlayerRef): void;
  getSender(): PlayerRef;
  getTargets(): PlayerRef[];
  setTargets(arg0: PlayerRef[]): void;
  setContent(arg0: string): void;
  setCancelled(arg0: boolean): void;
}

export interface PlayerReadyEvent {
  toString(): string;
  getReadyId(): number;
  getPlayerRef(): Ref;
  getPlayer(): Player;
}

export interface PlayerInteractEvent {
  toString(): string;
  isCancelled(): boolean;
  getClientUseTime(): number;
  getTargetEntity(): Entity;
  setCancelled(arg0: boolean): void;
  getActionType(): InteractionType;
  getItemInHand(): ItemStack;
  getTargetBlock(): Vector3i;
  getTargetRef(): Ref;
  getPlayerRef(): Ref;
  getPlayer(): Player;
}

export interface PlayerCraftEvent {
  toString(): string;
  getCraftedRecipe(): CraftingRecipe;
  getQuantity(): number;
  getPlayerRef(): Ref;
  getPlayer(): Player;
}

export interface PlayerMouseButtonEvent {
  toString(): string;
  isCancelled(): boolean;
  getClientUseTime(): number;
  getTargetEntity(): Entity;
  getPlayerRefComponent(): PlayerRef;
  setCancelled(arg0: boolean): void;
  getItemInHand(): Item;
  getTargetBlock(): Vector3i;
  getScreenPoint(): Vector2f;
  getMouseButton(): MouseButtonEvent;
  getPlayerRef(): Ref;
  getPlayer(): Player;
}

export interface PlayerMouseMotionEvent {
  toString(): string;
  isCancelled(): boolean;
  getClientUseTime(): number;
  getTargetEntity(): Entity;
  setCancelled(arg0: boolean): void;
  getMouseMotion(): MouseMotionEvent;
  getItemInHand(): Item;
  getTargetBlock(): Vector3i;
  getScreenPoint(): Vector2f;
  getPlayerRef(): Ref;
  getPlayer(): Player;
}

export interface PlayerSetupConnectEvent {
  toString(): string;
  isCancelled(): boolean;
  getReferralData(): unknown[];
  isReferralConnection(): boolean;
  getReferralSource(): HostAddress;
  getClientReferral(): ClientReferral;
  getPacketHandler(): PacketHandler;
  getUsername(): string;
  setCancelled(arg0: boolean): void;
  getAuth(): PlayerAuthentication;
  getReason(): string;
  setReason(arg0: string): void;
  getUuid(): { toString(): string };
  referToServer(arg0: string, arg1: number, arg2: unknown[]): void;
  referToServer(arg0: string, arg1: number): void;
}

export interface PlayerSetupDisconnectEvent {
  toString(): string;
  getDisconnectReason(): DisconnectReason;
  getUsername(): string;
  getAuth(): PlayerAuthentication;
  getUuid(): { toString(): string };
}

export interface AddPlayerToWorldEvent {
  toString(): string;
  shouldBroadcastJoinMessage(): boolean;
  setBroadcastJoinMessage(arg0: boolean): void;
  getHolder(): Holder;
  getWorld(): World;
}

export interface DrainPlayerFromWorldEvent {
  toString(): string;
  getHolder(): Holder;
  getWorld(): World;
  setWorld(arg0: World): void;
  setTransform(arg0: Transform): void;
  getTransform(): Transform;
}

export interface PlayerRefEvent {
  toString(): string;
  getPlayerRef(): PlayerRef;
}

export interface PlayerEvent {
  toString(): string;
  getPlayerRef(): Ref;
  getPlayer(): Player;
}

export interface EntityEvent {
  toString(): string;
  getEntity(): unknown;
}

export interface EntityRemoveEvent {
  toString(): string;
  getEntity(): unknown;
}

export interface LivingEntityInventoryChangeEvent {
  toString(): string;
  getItemContainer(): ItemContainer;
  getTransaction(): Transaction;
  getEntity(): unknown;
}

export interface LivingEntityUseBlockEvent {
  toString(): string;
  getRef(): Ref;
  getBlockType(): string;
}

export interface BreakBlockEvent {
  getItemInHand(): ItemStack;
  getTargetBlock(): Vector3i;
  getBlockType(): BlockType;
  setTargetBlock(arg0: Vector3i): void;
  isCancelled(): boolean;
  setCancelled(arg0: boolean): void;
}

export interface PlaceBlockEvent {
  getRotation(): RotationTuple;
  setRotation(arg0: RotationTuple): void;
  getItemInHand(): ItemStack;
  getTargetBlock(): Vector3i;
  setTargetBlock(arg0: Vector3i): void;
  isCancelled(): boolean;
  setCancelled(arg0: boolean): void;
}

export interface DamageBlockEvent {
  getCurrentDamage(): number;
  getDamage(): number;
  setDamage(arg0: number): void;
  getItemInHand(): ItemStack;
  getTargetBlock(): Vector3i;
  getBlockType(): BlockType;
  setTargetBlock(arg0: Vector3i): void;
  isCancelled(): boolean;
  setCancelled(arg0: boolean): void;
}

export interface UseBlockEvent {
  getContext(): InteractionContext;
  getInteractionType(): InteractionType;
  getTargetBlock(): Vector3i;
  getBlockType(): BlockType;
}

export interface DropItemEvent {
  isCancelled(): boolean;
  setCancelled(arg0: boolean): void;
}

export interface InteractivelyPickupItemEvent {
  getItemStack(): ItemStack;
  setItemStack(arg0: ItemStack): void;
  isCancelled(): boolean;
  setCancelled(arg0: boolean): void;
}

export interface ChangeGameModeEvent {
  getGameMode(): GameMode;
  setGameMode(arg0: GameMode): void;
  isCancelled(): boolean;
  setCancelled(arg0: boolean): void;
}

export interface CraftRecipeEvent {
  getCraftedRecipe(): CraftingRecipe;
  getQuantity(): number;
  isCancelled(): boolean;
  setCancelled(arg0: boolean): void;
}

export interface DiscoverZoneEvent {
  getDiscoveryInfo(): ZoneDiscoveryInfo;
}

export interface SwitchActiveSlotEvent {
  getPreviousSlot(): number;
  isServerRequest(): boolean;
  isClientRequest(): boolean;
  getInventorySectionId(): number;
  getNewSlot(): unknown;
  setNewSlot(arg0: unknown): void;
  isCancelled(): boolean;
  setCancelled(arg0: boolean): void;
}

export interface PlayerPermissionChangeEvent {
  getPlayerUuid(): { toString(): string };
}

export interface GroupPermissionChangeEvent {
  getGroupName(): string;
}

export interface PlayerGroupEvent {
  getGroupName(): string;
  getPlayerUuid(): { toString(): string };
}

export interface Player {
  remove(): boolean;
  getDisplayName(): string;
  getGameMode(): GameMode;
  setGameMode(arg0: Ref, arg1: GameMode, arg2: ComponentAccessor): void;
  getPlayerRef(): PlayerRef;
  hasPermission(arg0: string): boolean;
  hasPermission(arg0: string, arg1: boolean): boolean;
  sendMessage(arg0: Message): void;
  setInventory(arg0: Inventory): Inventory;
  moveTo(arg0: Ref, arg1: number, arg2: number, arg3: number, arg4: ComponentAccessor): void;
  getInventory(): Inventory;
  getWorld(): World;
  getUuid(): { toString(): string };
}

export interface World {
  getName(): string;
  getPlayers(): Player[];
  getPlayerCount(): number;
  getPlayerRefs(): PlayerRef[];
  sendMessage(arg0: Message): void;
  getBlockType(arg0: Vector3i): BlockType;
  getBlockType(arg0: number, arg1: number, arg2: number): BlockType;
  setBlock(arg0: number, arg1: number, arg2: number, arg3: string, arg4: number): void;
  setBlock(arg0: number, arg1: number, arg2: number, arg3: string): void;
  breakBlock(arg0: number, arg1: number, arg2: number, arg3: number): boolean;
}

export interface Universe {
  get(): Universe;
  getDefaultWorld(): World;
  getPlayer(arg0: string, arg1: NameMatching): PlayerRef;
  getPlayer(arg0: { toString(): string }): PlayerRef;
  getWorld(arg0: string): World;
  getWorld(arg0: { toString(): string }): World;
  sendMessage(arg0: Message): void;
  getWorlds(): Map<string, World>;
  getPlayers(): PlayerRef[];
  getPlayerCount(): number;
}

export interface Message {
  toString(): string;
  insert(arg0: string): Message;
  insert(arg0: Message): Message;
  param(arg0: string, arg1: boolean): Message;
  param(arg0: string, arg1: string): Message;
  param(arg0: string, arg1: number): Message;
  param(arg0: string, arg1: Message): Message;
  color(arg0: string): Message;
  raw(arg0: string): Message;
  link(arg0: string): Message;
  getRawText(): string;
  bold(arg0: boolean): Message;
  italic(arg0: boolean): Message;
}

export interface Entity {
  remove(): boolean;
  getWorld(): World;
  getUuid(): { toString(): string };
  moveTo(arg0: Ref, arg1: number, arg2: number, arg3: number, arg4: ComponentAccessor): void;
}

export interface ItemStack {
  isEmpty(): boolean;
  isValid(): boolean;
  getItem(): Item;
  getMaxDurability(): number;
  withDurability(arg0: number): ItemStack;
  getDurability(): number;
  getQuantity(): number;
  withQuantity(arg0: number): ItemStack;
  getItemId(): string;
  isBroken(): boolean;
}

export interface Inventory {
  clear(): void;
  getActiveToolItem(): ItemStack;
  getActiveHotbarItem(): ItemStack;
  getItemInHand(): ItemStack;
  getUtility(): ItemContainer;
  getStorage(): ItemContainer;
  getHotbar(): ItemContainer;
  getTools(): ItemContainer;
  getBackpack(): ItemContainer;
  getArmor(): ItemContainer;
}

export interface Item {
  getId(): string;
  getMaxDurability(): number;
  getMaxStack(): number;
  getAssetStore(): AssetStore;
  getAssetMap(): DefaultAssetMap;
}

export interface CraftingRecipe {
  getInput(): MaterialQuantity[];
  getId(): string;
  getPrimaryOutput(): MaterialQuantity;
  getOutputs(): MaterialQuantity[];
  getTimeSeconds(): number;
}

export interface BlockType {
  getId(): string;
  getItem(): Item;
}

export interface BlockState {
  getBlockPosition(): Vector3i;
  getPosition(): Vector3i;
  getBlockType(): BlockType;
  getBlockX(): number;
  getBlockY(): number;
  getBlockZ(): number;
}

export interface Holder {
  getComponent(arg0: ComponentType): unknown;
}

export interface Ref {
  isValid(): boolean;
}

export interface Vector3i {
  clone(): Vector3i;
  add(arg0: Vector3i): Vector3i;
  add(arg0: number, arg1: number, arg2: number): Vector3i;
  subtract(arg0: number, arg1: number, arg2: number): Vector3i;
  subtract(arg0: Vector3i): Vector3i;
  getY(): number;
  getX(): number;
  getZ(): number;
}

export interface Vector3f {
  clone(): Vector3f;
  add(arg0: number, arg1: number, arg2: number): Vector3f;
  add(arg0: Vector3f): Vector3f;
  subtract(arg0: Vector3f): Vector3f;
  subtract(arg0: number, arg1: number, arg2: number): Vector3f;
  getY(): number;
  getX(): number;
  getZ(): number;
}

export interface Vector3d {
  clone(): Vector3d;
  add(arg0: Vector3d): Vector3d;
  add(arg0: number, arg1: number, arg2: number): Vector3d;
  subtract(arg0: number, arg1: number, arg2: number): Vector3d;
  subtract(arg0: Vector3d): Vector3d;
  getY(): number;
  getX(): number;
  getZ(): number;
}

export interface Transform {
  getRotation(): Vector3f;
  setRotation(arg0: Vector3f): void;
  getDirection(): Vector3d;
  setPosition(arg0: Vector3d): void;
  getPosition(): Vector3d;
}

export interface Vector2i {
  clone(): Vector2i;
  getX(): number;
  getY(): number;
  setX(x: number): void;
  setY(y: number): void;
  add(other: Vector2i): Vector2i;
  add(x: number, y: number): Vector2i;
  subtract(other: Vector2i): Vector2i;
  subtract(x: number, y: number): Vector2i;
  scale(factor: number): Vector2i;
  scale(other: Vector2i): Vector2i;
  negate(): Vector2i;
  normalize(): Vector2i;
  length(): number;
  squaredLength(): number;
  distanceTo(other: Vector2i): number;
  distanceTo(x: number, y: number): number;
  dot(other: Vector2i): number;
}

export interface Vector2d {
  clone(): Vector2d;
  getX(): number;
  getY(): number;
  setX(x: number): void;
  setY(y: number): void;
  add(other: Vector2d): Vector2d;
  add(x: number, y: number): Vector2d;
  subtract(other: Vector2d): Vector2d;
  subtract(x: number, y: number): Vector2d;
  scale(factor: number): Vector2d;
  scale(other: Vector2d): Vector2d;
  negate(): Vector2d;
  normalize(): Vector2d;
  length(): number;
  squaredLength(): number;
  distanceTo(other: Vector2d): number;
  distanceTo(x: number, y: number): number;
  dot(other: Vector2d): number;
  floor(): Vector2d;
  ceil(): Vector2d;
  isFinite(): boolean;
}

export interface Vector2f {
  clone(): Vector2f;
}

export interface GameMode {
  getValue(): number;
  name(): string;
}

export interface InteractionType {
  getValue(): number;
  name(): string;
}

export interface ItemContainer {
  addItemStack(arg0: ItemStack): ItemStackTransaction;
  getSlot(arg0: number): ItemStack;
  getSize(): number;
  setItemStackForSlot(arg0: number, arg1: ItemStack): ItemStackSlotTransaction;
}

export interface ItemStackTransaction {}
export interface ItemStackSlotTransaction {}
export interface ComponentType {}
export interface ComponentAccessor {}
export interface DisconnectReason {}
export interface Formatter {}
export interface HostAddress {}
export interface ClientReferral {}
export interface PacketHandler {}
export interface PlayerAuthentication {}
export interface MouseButtonEvent {}
export interface MouseMotionEvent {}
export interface Transaction {}
export interface RotationTuple {}
export interface InteractionContext {}
export interface ZoneDiscoveryInfo {}
export interface NameMatching {}
export interface MaterialQuantity {}
export interface WorldConfigProvider {}
export interface DefaultAssetMap {
  getAssetMap(): JavaMap<string, unknown>;
  getAssetCount(): number;
}
export interface AssetStore {
  getAssetMap(): DefaultAssetMap;
}

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

export interface MessageStatic {
  raw(text: string): Message;
  empty(): Message;
  translation(key: string): Message;
  parse(text: string): Message;
  join(...messages: Message[]): Message;
}

export interface UniverseStatic {
  get(): Universe;
}

export interface HytaleServerStatic {
  get(): HytaleServerInstance;
}

export interface HytaleServerInstance {
  getServerName(): string;
  isBooting(): boolean;
  isBooted(): boolean;
  isShuttingDown(): boolean;
  shutdownServer(): void;
}

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

export interface ScriptTask {
  cancel(): void;
  isCancelled(): boolean;
  isDone(): boolean;
}

export interface ScriptScheduler {
  runLater(callback: () => void, delayMs: number): ScriptTask;
  runRepeating(callback: () => void, delayMs: number, periodMs: number): ScriptTask;
  runRepeatingWithDelay(callback: () => void, delayMs: number, periodMs: number): ScriptTask;
}

export interface EventHandler {
  eventType: EventType;
  callback: (event: unknown) => void;
}

export interface JavaIterator<T> {
  hasNext(): boolean;
  next(): T;
}

export interface JavaSet<T> {
  iterator(): JavaIterator<T>;
  size(): number;
}

export interface JavaMap<K, V> {
  keySet(): JavaSet<K>;
  get(key: K): V;
  size(): number;
}

export interface ItemStackConstructor {
  new(itemId: string, quantity: number): ItemStack;
  new(itemId: string): ItemStack;
}

export interface ItemClass {
  getAssetStore(): AssetStore;
}

export interface Vector3iConstructor {
  new(): Vector3i;
  new(x: number, y: number, z: number): Vector3i;
  new(other: Vector3i): Vector3i;
}

export interface Vector3fConstructor {
  new(): Vector3f;
  new(x: number, y: number): Vector3f;
  new(x: number, y: number, z: number): Vector3f;
  new(other: Vector3f): Vector3f;
  new(other: Vector3i): Vector3f;
}

export interface Vector3dConstructor {
  new(): Vector3d;
  new(x: number, y: number): Vector3d;
  new(x: number, y: number, z: number): Vector3d;
  new(other: Vector3d): Vector3d;
  new(other: Vector3i): Vector3d;
}

export interface TransformConstructor {
  new(): Transform;
  new(position: Vector3i): Transform;
  new(position: Vector3d): Transform;
  new(x: number, y: number, z: number): Transform;
  new(position: Vector3d, rotation: Vector3f): Transform;
  new(x: number, y: number, z: number, pitch: number, yaw: number, roll: number): Transform;
}

export interface Color {
  getRed(): number;
  getGreen(): number;
  getBlue(): number;
}

export interface ColorConstructor {
  new(): Color;
  new(r: number, g: number, b: number): Color;
  new(other: Color): Color;
}

export interface ColorLight {
  getRed(): number;
  getGreen(): number;
  getBlue(): number;
  getAlpha(): number;
}

export interface ColorLightConstructor {
  new(): ColorLight;
  new(r: number, g: number, b: number, a: number): ColorLight;
  new(other: ColorLight): ColorLight;
}

export interface Vector2iConstructor {
  new(): Vector2i;
  new(x: number, y: number): Vector2i;
  new(other: Vector2i): Vector2i;
}

export interface Vector2dConstructor {
  new(): Vector2d;
  new(x: number, y: number): Vector2d;
  new(other: Vector2d): Vector2d;
}

export interface Vector2fConstructor {
  new(): Vector2f;
  new(x: number, y: number): Vector2f;
  new(other: Vector2f): Vector2f;
}

export interface Box {
  clone(): Box;
  getMin(): Vector3d;
  getMax(): Vector3d;
  width(): number;
  height(): number;
  depth(): number;
  getVolume(): number;
  hasVolume(): boolean;
  middleX(): number;
  middleY(): number;
  middleZ(): number;
  containsPosition(x: number, y: number, z: number): boolean;
  containsBlock(x: number, y: number, z: number): boolean;
  isIntersecting(other: Box): boolean;
  union(other: Box): Box;
  expand(amount: number): void;
  offset(x: number, y: number, z: number): Box;
  offset(vec: Vector3d): Box;
  scale(factor: number): Box;
  normalize(): Box;
}

export interface BoxConstructor {
  new(): Box;
  new(min: Vector3d, max: Vector3d): Box;
  new(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): Box;
  new(other: Box): Box;
}

export interface Cylinder {
  getRadiusX(): number;
  getRadiusZ(): number;
  getHeight(): number;
  containsPosition(x: number, y: number, z: number): boolean;
  getBox(x: number, y: number, z: number): Box;
  expand(amount: number): void;
}

export interface CylinderConstructor {
  new(): Cylinder;
  new(radiusX: number, radiusZ: number, height: number): Cylinder;
}

export interface SoundEvent {
  getId(): string;
  getVolume(): number;
  getPitch(): number;
  getMusicDuckingVolume(): number;
  getAmbientDuckingVolume(): number;
  getStartAttenuationDistance(): number;
  getMaxDistance(): number;
  getMaxInstance(): number;
  getPreventSoundInterruption(): boolean;
  getAudioCategoryId(): string;
  getAudioCategoryIndex(): number;
  getHighestNumberOfChannels(): number;
}

export interface IndexedAssetMap<K, T> {
  getIndex(key: K): number;
  getIndexOrDefault(key: K, defaultValue: number): number;
  getNextIndex(): number;
  getAsset(index: number): T;
  getAssetOrDefault(index: number, defaultValue: T): T;
  getAssetMap(): JavaMap<K, T>;
  getAssetCount(): number;
}

export interface SoundEventClass {
  getAssetStore(): AssetStore;
  getAssetMap(): IndexedAssetMap<string, SoundEvent>;
}

export interface SoundCategory {
  name(): string;
  ordinal(): number;
  getValue(): number;
}

export interface SoundCategoryEnum {
  Music: SoundCategory;
  Ambient: SoundCategory;
  SFX: SoundCategory;
  UI: SoundCategory;
  VALUES: SoundCategory[];
  valueOf(name: string): SoundCategory;
  values(): SoundCategory[];
  fromValue(value: number): SoundCategory;
}

export interface PlaySoundEvent2D {
  soundEventIndex: number;
  category: SoundCategory;
  volumeModifier: number;
  pitchModifier: number;
  getId(): number;
}

export interface PlaySoundEvent2DConstructor {
  new(): PlaySoundEvent2D;
  new(soundEventIndex: number, category: SoundCategory, volumeModifier: number, pitchModifier: number): PlaySoundEvent2D;
}

export interface PacketHandler {
  write(packet: unknown): void;
  write(packets: unknown[]): void;
  writeNoCache(packet: unknown): void;
  disconnect(reason: string): void;
  isLocalConnection(): boolean;
  isLANConnection(): boolean;
}

export interface PlayerRef {
  isValid(): boolean;
  getUuid(): { toString(): string };
  getUsername(): string;
  getLanguage(): string;
  setLanguage(language: string): void;
  getTransform(): Transform;
  getWorldUuid(): { toString(): string };
  getHeadRotation(): Vector3f;
  getPacketHandler(): PacketHandler;
  referToServer(host: string, port: number): void;
  referToServer(host: string, port: number, data: unknown[]): void;
  sendMessage(message: Message): void;
}

export interface DynamicLight {
  getColorLight(): ColorLight;
  setColorLight(colorLight: ColorLight): void;
  consumeNetworkOutdated(): boolean;
  clone(): DynamicLight;
}

export interface DynamicLightConstructor {
  new(): DynamicLight;
  new(colorLight: ColorLight): DynamicLight;
  getComponentType(): ComponentType;
}

export interface PersistentDynamicLight {
  getColorLight(): ColorLight;
  setColorLight(colorLight: ColorLight): void;
  clone(): PersistentDynamicLight;
}

export interface PersistentDynamicLightConstructor {
  new(colorLight: ColorLight): PersistentDynamicLight;
  getComponentType(): ComponentType;
}

declare global {
  const logger: ScriptLogger;
  const plugin: unknown;
  const commands: ScriptCommandRegistry;
  const scheduler: ScriptScheduler;
  const Universe: UniverseStatic;
  const HytaleServer: HytaleServerStatic;
  const Message: MessageStatic;
  const ItemStack: ItemStackConstructor;
  const Item: ItemClass;
  const Vector3i: Vector3iConstructor;
  const Vector3f: Vector3fConstructor;
  const Vector3d: Vector3dConstructor;
  const Vector2i: Vector2iConstructor;
  const Vector2d: Vector2dConstructor;
  const Vector2f: Vector2fConstructor;
  const Transform: TransformConstructor;
  const Color: ColorConstructor;
  const ColorLight: ColorLightConstructor;
  const Box: BoxConstructor;
  const Cylinder: CylinderConstructor;
  const SoundEvent: SoundEventClass;
  const SoundCategory: SoundCategoryEnum;
  const PlaySoundEvent2D: PlaySoundEvent2DConstructor;
  const DynamicLight: DynamicLightConstructor;
  const PersistentDynamicLight: PersistentDynamicLightConstructor;
}
