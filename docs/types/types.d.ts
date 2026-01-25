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
    getTargetRef(): Ref<EntityStore>;
    getPlayerRef(): Ref<EntityStore>;
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
    getUuid(): {
        toString(): string;
    };
    referToServer(arg0: string, arg1: number, arg2: unknown[]): void;
    referToServer(arg0: string, arg1: number): void;
}
export interface PlayerSetupDisconnectEvent {
    toString(): string;
    getDisconnectReason(): DisconnectReason;
    getUsername(): string;
    getAuth(): PlayerAuthentication;
    getUuid(): {
        toString(): string;
    };
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
    getPlayerUuid(): {
        toString(): string;
    };
}
export interface GroupPermissionChangeEvent {
    getGroupName(): string;
}
export interface PlayerGroupEvent {
    getGroupName(): string;
    getPlayerUuid(): {
        toString(): string;
    };
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
    getUuid(): {
        toString(): string;
    };
    getPageManager(): PageManager;
    getHudManager(): HudManager;
}
export interface PlayerCameraAddSystem {
    getQuery(): unknown;
    onEntityAdd(holder: unknown, reason: unknown, store: unknown): void;
    onEntityRemoved(holder: unknown, reason: unknown, store: unknown): void;
}
export interface PlayerChunkTrackerSystems {
    getQuery(): unknown;
    onEntityAdd(holder: unknown, reason: unknown, store: unknown): void;
    onEntityRemoved(holder: unknown, reason: unknown, store: unknown): void;
    isParallel(): boolean;
}
export interface PlayerCollisionResultAddSystem {
    new (playerComponentType: unknown, collisionResultComponentType: unknown): PlayerCollisionResultAddSystem;
    onEntityAdd(holder: unknown, reason: unknown, store: unknown): void;
    onEntityRemoved(holder: unknown, reason: unknown, store: unknown): void;
    getQuery(): unknown;
}
export interface PlayerCondition {
    eval0(componentAccessor: unknown, ref: unknown, currentTime: unknown): boolean;
    toString(): string;
}
export interface PlayerConfigData {
    getBlockIdVersion(): number;
    setBlockIdVersion(blockIdVersion: number): void;
    getWorld(): string;
    setWorld(world: string): void;
    getPreset(): string;
    setPreset(preset: string): void;
    getKnownRecipes(): unknown;
    setKnownRecipes(knownRecipes: unknown): void;
    getPerWorldData(): unknown;
    getPerWorldData(worldName: string): unknown;
    setPerWorldData(perWorldData: unknown): void;
    getDiscoveredZones(): unknown;
    setDiscoveredZones(discoveredZones: unknown): void;
    getDiscoveredInstances(): unknown;
    setDiscoveredInstances(discoveredInstances: unknown): void;
    getReputationData(): unknown;
    setReputationData(reputationData: unknown): void;
    getActiveObjectiveUUIDs(): unknown;
    setActiveObjectiveUUIDs(activeObjectiveUUIDs: unknown): void;
    markChanged(): void;
    consumeHasChanged(): boolean;
    cleanup(universe: Universe): void;
}
export interface PlayerConnectionFlushSystem {
    new (componentType: unknown): PlayerConnectionFlushSystem;
    getDependencies(): unknown;
    getQuery(): unknown;
    isParallel(archetypeChunkSize: number, taskCount: number): boolean;
    tick(dt: number, systemIndex: number, store: unknown): void;
    tick(dt: number, index: number, archetypeChunk: unknown, store: unknown, commandBuffer: unknown): void;
}
export interface PlayerDeathPositionData {
    new (markerId: string, transform: unknown, day: number): PlayerDeathPositionData;
    getMarkerId(): string;
    getTransform(): unknown;
    getDay(): number;
}
export interface PlayerHudManagerSystems {
    getQuery(): unknown;
}
export interface PlayerItemEntityPickupSystem {
    new (itemComponentType: unknown, playerComponentType: unknown, playerSpatialComponent: unknown): PlayerItemEntityPickupSystem;
    getDependencies(): unknown;
    getQuery(): unknown;
    isParallel(): boolean;
}
export interface PlayerMovementManagerSystems {
    getQuery(): unknown;
    onEntityAdd(holder: unknown, reason: unknown, store: unknown): void;
    onEntityRemoved(holder: unknown, reason: unknown, store: unknown): void;
}
export interface PlayerPingSystem {
    getQuery(): unknown;
    getDependencies(): unknown;
    getGroup(): unknown;
    isParallel(archetypeChunkSize: number, taskCount: number): boolean;
    tick(dt: number, index: number, archetypeChunk: unknown, store: unknown, commandBuffer: unknown): void;
}
export interface PlayerProcessMovementSystem {
    new (playerComponentType: unknown, velocityComponentType: unknown, collisionResultComponentType: unknown): PlayerProcessMovementSystem;
    getQuery(): unknown;
    isParallel(archetypeChunkSize: number, taskCount: number): boolean;
    tick(dt: number, index: number, archetypeChunk: unknown, store: unknown, commandBuffer: unknown): void;
}
export interface PlayerRegenerateStatsSystem {
    getQuery(): unknown;
    getComponentType(): unknown;
}
export interface PlayerRespawnPointData {
    new (blockPosition: Vector3i, respawnPosition: Vector3d, name: string): PlayerRespawnPointData;
    getBlockPosition(): Vector3i;
    getRespawnPosition(): Vector3d;
    getName(): string;
    setName(name: string): void;
}
export interface PlayerSavingSystems {
}
export interface PlayerSendInventorySystem {
    new (componentType: unknown): PlayerSendInventorySystem;
    getQuery(): unknown;
    isParallel(archetypeChunkSize: number, taskCount: number): boolean;
    tick(dt: number, index: number, archetypeChunk: unknown, store: unknown, commandBuffer: unknown): void;
}
export interface PlayerSkinComponent {
    new (playerSkin: unknown): PlayerSkinComponent;
    consumeNetworkOutdated(): boolean;
    getPlayerSkin(): unknown;
    setNetworkOutdated(): void;
    clone(): unknown;
}
export interface PlayerSkinGradient {
    getTexture(): string;
    toString(): string;
}
export interface PlayerSkinGradientSet {
    getId(): string;
    getGradients(): JavaMap<string, unknown>;
}
export interface PlayerSkinPart {
    getId(): string;
    getName(): string;
    getModel(): string;
    getTextures(): JavaMap<string, unknown>;
    getVariants(): JavaMap<string, unknown>;
    isDefaultAsset(): boolean;
    getTags(): string[];
    getHairType(): unknown;
    doesRequireGenericHaircut(): boolean;
    getHeadAccessoryType(): unknown;
    getGreyscaleTexture(): string;
    getGradientSet(): string;
    toString(): string;
}
export interface PlayerSkinPartTexture {
    getTexture(): string;
    getBaseColor(): string[] | null;
    toString(): string;
}
export interface PlayerSkinTintColor {
    getId(): string;
    getBaseColor(): string[];
    toString(): string;
}
export interface PlayerSpatialSystem {
    new (spatialResource: unknown): PlayerSpatialSystem;
    getQuery(): unknown;
    tick(dt: number, systemIndex: number, store: unknown): void;
    getPosition(archetypeChunk: unknown, index: number): Vector3d;
}
export interface PlayerSystems {
}
export interface PlayerWorldData {
    getLastPosition(): Transform | null;
    setLastPosition(lastPosition: Transform): void;
    getLastMovementStates(): unknown | null;
    setLastMovementStates(lastMovementStates: unknown, save: boolean): void;
    getWorldMapMarkers(): unknown[] | null;
    setWorldMapMarkers(worldMapMarkers: unknown[]): void;
    isFirstSpawn(): boolean;
    setFirstSpawn(firstSpawn: boolean): void;
    getRespawnPoints(): unknown[] | null;
    setRespawnPoints(respawnPoints: unknown[]): void;
    getDeathPositions(): JavaList<unknown>;
    addLastDeath(markerId: string, transform: Transform, deathDay: number): void;
    removeLastDeath(markerId: string): void;
}
export interface PositionDataComponent {
    new (): PositionDataComponent;
    new (insideBlockTypeId: number, standingOnBlockTypeId: number): PositionDataComponent;
    getComponentType(): unknown;
    getInsideBlockTypeId(): number;
    setInsideBlockTypeId(insideBlockTypeId: number): void;
    getStandingOnBlockTypeId(): number;
    setStandingOnBlockTypeId(standingOnBlockTypeId: number): void;
    clone(): unknown;
}
export interface PredictedProjectile {
    new (uuid: unknown): PredictedProjectile;
    getComponentType(): unknown;
    getUuid(): unknown;
    clone(): unknown;
}
export interface PredictedProjectileSystems {
}
export interface PrefabBufferColumn {
    new (readerIndex: number, entityHolders: unknown[], blockComponents: unknown): PrefabBufferColumn;
    getReaderIndex(): number;
    getEntityHolders(): unknown[] | null;
    getBlockComponents(): unknown;
}
export interface PrefabBufferUtil {
    getCached(path: unknown): unknown;
    loadBuffer(path: unknown): unknown;
    writeToFileAsync(prefab: unknown, path: unknown): unknown;
    readFromFile(path: unknown): unknown;
    readFromFileAsync(path: unknown): unknown;
    loadFromLPF(path: unknown, realPath: unknown): unknown;
    loadFromJson(pack: unknown | null, path: unknown, cachedLpfPath: unknown, jsonPath: unknown): unknown;
}
export interface World {
    getName(): string;
    getPlayers(): Player[];
    getPlayerCount(): number;
    getPlayerRefs(): PlayerRef[];
    getTps(): number;
    sendMessage(arg0: Message): void;
    getBlockType(arg0: Vector3i): BlockType;
    getBlockType(arg0: number, arg1: number, arg2: number): BlockType;
    setBlock(arg0: number, arg1: number, arg2: number, arg3: string, arg4: number): void;
    setBlock(arg0: number, arg1: number, arg2: number, arg3: string): void;
    breakBlock(arg0: number, arg1: number, arg2: number, arg3: number): boolean;
    getEntityStore(): EntityStoreWrapper;
    execute(task: () => void): void;
}
export interface Universe {
    get(): Universe;
    getDefaultWorld(): World;
    getPlayer(arg0: string, arg1: NameMatching): PlayerRef;
    getPlayer(arg0: {
        toString(): string;
    }): PlayerRef;
    getWorld(arg0: string): World;
    getWorld(arg0: {
        toString(): string;
    }): World;
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
    getUuid(): {
        toString(): string;
    };
    moveTo(arg0: Ref, arg1: number, arg2: number, arg3: number, arg4: ComponentAccessor): void;
}
export interface ItemStack {
    new (itemId: string, quantity: number): ItemStack;
    new (itemId: string): ItemStack;
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
    getBlockIdOrUnknown(blockTypeKey: string, message: string, ...params: unknown[]): number;
    getAssetMap(): unknown;
}
export interface ChunkUtil {
    xFromIndex(index: number): number;
    yFromIndex(index: number): number;
    zFromIndex(index: number): number;
    minBlock(index: number): number;
    toSectionIndex(blockCoord: number): number;
    chunkCoordinate(block: number): number;
    indexBlock(x: number, y: number, z: number): number;
    isSameChunkSection(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): boolean;
}
export interface BlockState {
    getBlockPosition(): Vector3i;
    getPosition(): Vector3i;
    getBlockType(): BlockType;
    getBlockX(): number;
    getBlockY(): number;
    getBlockZ(): number;
}
export interface Holder<T = unknown> {
    getComponent<C>(arg0: ComponentType<T, C>): C | null;
    addComponent<C>(componentType: ComponentType<T, C>, component: C): void;
    ensureComponent<C>(componentType: ComponentType<T, C>): void;
}
export interface Ref<T = unknown> {
    isValid(): boolean;
    getStore(): Store<T>;
    getIndex(): number;
}
export interface Vector3i {
    new (): Vector3i;
    new (x: number, y: number, z: number): Vector3i;
    new (other: Vector3i): Vector3i;
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
    new (): Vector3f;
    new (x: number, y: number): Vector3f;
    new (x: number, y: number, z: number): Vector3f;
    new (other: Vector3f): Vector3f;
    new (other: Vector3i): Vector3f;
    x: number;
    y: number;
    z: number;
    clone(): Vector3f;
    add(arg0: number, arg1: number, arg2: number): Vector3f;
    add(arg0: Vector3f): Vector3f;
    subtract(arg0: Vector3f): Vector3f;
    subtract(arg0: number, arg1: number, arg2: number): Vector3f;
    getX(): number;
    getY(): number;
    getZ(): number;
    setX(x: number): void;
    setY(y: number): void;
    setZ(z: number): void;
    getPitch(): number;
    getYaw(): number;
    getRoll(): number;
    setPitch(pitch: number): void;
    setYaw(yaw: number): void;
    setRoll(roll: number): void;
}
export interface Vector3d {
    new (): Vector3d;
    new (x: number, y: number): Vector3d;
    new (x: number, y: number, z: number): Vector3d;
    new (other: Vector3d): Vector3d;
    new (other: Vector3i): Vector3d;
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
    new (): Transform;
    new (position: Vector3i): Transform;
    new (position: Vector3d): Transform;
    new (x: number, y: number, z: number): Transform;
    new (position: Vector3d, rotation: Vector3f): Transform;
    new (x: number, y: number, z: number, pitch: number, yaw: number, roll: number): Transform;
    getRotation(): Vector3f;
    setRotation(arg0: Vector3f): void;
    getDirection(): Vector3d;
    setPosition(arg0: Vector3d): void;
    getPosition(): Vector3d;
}
export interface Vector2i {
    new (): Vector2i;
    new (x: number, y: number): Vector2i;
    new (other: Vector2i): Vector2i;
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
    new (): Vector2d;
    new (x: number, y: number): Vector2d;
    new (other: Vector2d): Vector2d;
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
    new (): Vector2f;
    new (x: number, y: number): Vector2f;
    new (other: Vector2f): Vector2f;
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
export interface ItemStackTransaction {
}
export interface ItemStackSlotTransaction {
}
export interface ComponentType<S = unknown, C = unknown> {
}
export interface ComponentAccessor<S = unknown> {
    getComponent<C>(ref: Ref<S>, componentType: ComponentType<S, C>): C | null;
}
export interface DisconnectReason {
}
export interface Formatter {
}
export interface HostAddress {
}
export interface ClientReferral {
}
export interface PacketHandler {
}
export interface PlayerAuthentication {
}
export interface MouseButtonEvent {
}
export interface MouseMotionEvent {
}
export interface Transaction {
}
export interface RotationTuple {
}
export interface InteractionContext {
}
export interface ZoneDiscoveryInfo {
}
export interface NameMatching {
}
export interface MaterialQuantity {
}
export interface WorldConfigProvider {
}
export interface DefaultAssetMap {
    getAssetMap(): JavaMap<string, unknown>;
    getAssetCount(): number;
}
export interface AssetStore {
    getAssetMap(): DefaultAssetMap;
}
export type EventType = "BootEvent" | "ShutdownEvent" | "PrepareUniverseEvent" | "PlayerConnectEvent" | "PlayerDisconnectEvent" | "PlayerChatEvent" | "PlayerReadyEvent" | "PlayerInteractEvent" | "PlayerCraftEvent" | "PlayerMouseButtonEvent" | "PlayerMouseMotionEvent" | "PlayerSetupConnectEvent" | "PlayerSetupDisconnectEvent" | "AddPlayerToWorldEvent" | "DrainPlayerFromWorldEvent" | "PlayerRefEvent" | "PlayerEvent" | "EntityEvent" | "EntityRemoveEvent" | "LivingEntityInventoryChangeEvent" | "LivingEntityUseBlockEvent" | "BreakBlockEvent" | "PlaceBlockEvent" | "DamageBlockEvent" | "UseBlockEvent" | "DropItemEvent" | "InteractivelyPickupItemEvent" | "ChangeGameModeEvent" | "CraftRecipeEvent" | "DiscoverZoneEvent" | "SwitchActiveSlotEvent" | "PlayerPermissionChangeEvent" | "GroupPermissionChangeEvent" | "PlayerGroupEvent" | "NPCSpawnEvent" | "NPCDespawnEvent" | "NPCRoleChangeEvent" | "NPCDamageEvent" | "NPCDeathEvent";
export type HexColor = `#${string}`;
export declare const Colors: {
    readonly RED: HexColor;
    readonly GREEN: HexColor;
    readonly BLUE: HexColor;
    readonly YELLOW: HexColor;
    readonly CYAN: HexColor;
    readonly MAGENTA: HexColor;
    readonly WHITE: HexColor;
    readonly BLACK: HexColor;
    readonly ORANGE: HexColor;
    readonly PINK: HexColor;
    readonly PURPLE: HexColor;
    readonly GOLD: HexColor;
    readonly GRAY: HexColor;
    readonly LIGHT_GRAY: HexColor;
    readonly DARK_GRAY: HexColor;
};
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
export interface CommandSender {
    getDisplayName(): string;
    getUuid(): unknown;
    sendMessage(message: Message): void;
}
export interface CommandContext {
    sendMessage(message: string): void;
    sendFormattedMessage(message: Message): void;
    getSenderName(): string;
    getInput(): string;
    isPlayer(): boolean;
    getSender(): CommandSender;
    getPlayer(): Player | null;
    getPlayerRef(): Ref<EntityStore> | null;
}
export interface ScriptCommandRegistry {
    register(name: string, description: string, callback: (ctx: CommandContext) => void): void;
    register(name: string, description: string, permission: string, callback: (ctx: CommandContext) => void): void;
    registerWorld(name: string, description: string, callback: (ctx: CommandContext) => void): void;
    registerWorld(name: string, description: string, permission: string, callback: (ctx: CommandContext) => void): void;
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
export interface JavaList<T> {
    get(index: number): T;
    size(): number;
    isEmpty(): boolean;
    iterator(): JavaIterator<T>;
    add(element: T): boolean;
    remove(index: number): T;
    clear(): void;
    toArray(): T[];
}
export interface JavaMap<K, V> {
    keySet(): JavaSet<K>;
    get(key: K): V;
    size(): number;
}
export interface ItemClass {
    getAssetStore(): AssetStore;
}
export interface Color {
    new (): Color;
    new (red: number, green: number, blue: number): Color;
    new (other: Color): Color;
    red: number;
    green: number;
    blue: number;
    clone(): Color;
}
export interface ColorLight {
    new (): ColorLight;
    new (radius: number, red: number, green: number, blue: number): ColorLight;
    new (other: ColorLight): ColorLight;
    radius: number;
    red: number;
    green: number;
    blue: number;
}
export interface Box {
    new (): Box;
    new (min: Vector3d, max: Vector3d): Box;
    new (minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): Box;
    new (other: Box): Box;
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
export interface Cylinder {
    new (): Cylinder;
    new (radiusX: number, radiusZ: number, height: number): Cylinder;
    getRadiusX(): number;
    getRadiusZ(): number;
    getHeight(): number;
    containsPosition(x: number, y: number, z: number): boolean;
    getBox(x: number, y: number, z: number): Box;
    expand(amount: number): void;
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
export interface ParticleSystemAsset {
    getId(): string;
    getLifeSpan(): number;
    getCullDistance(): number;
    getBoundingRadius(): number;
    isImportant(): boolean;
}
export interface ParticleSystemClass {
    getAssetStore(): AssetStore;
    getAssetMap(): DefaultAssetMap;
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
    new (): PlaySoundEvent2D;
    new (soundEventIndex: number, category: SoundCategory, volumeModifier: number, pitchModifier: number): PlaySoundEvent2D;
    soundEventIndex: number;
    category: SoundCategory;
    volumeModifier: number;
    pitchModifier: number;
    getId(): number;
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
    getUuid(): {
        toString(): string;
    };
    getUsername(): string;
    getLanguage(): string;
    setLanguage(language: string): void;
    getTransform(): Transform;
    getWorldUuid(): {
        toString(): string;
    } | null;
    getHeadRotation(): Vector3f;
    updatePosition(world: World, transform: Transform, headRotation: Vector3f): void;
    getPacketHandler(): PacketHandler;
    referToServer(host: string, port: number): void;
    referToServer(host: string, port: number, data: unknown[]): void;
    sendMessage(message: Message): void;
    getReference(): Ref<EntityStore> | null;
}
export interface DynamicLight {
    new (): DynamicLight;
    new (colorLight: ColorLight): DynamicLight;
    getColorLight(): ColorLight;
    setColorLight(colorLight: ColorLight): void;
    consumeNetworkOutdated(): boolean;
    clone(): DynamicLight;
}
export interface PersistentDynamicLight {
    new (colorLight: ColorLight): PersistentDynamicLight;
    getColorLight(): ColorLight;
    setColorLight(colorLight: ColorLight): void;
    clone(): PersistentDynamicLight;
}
export interface Position {
    new (): Position;
    new (x: number, y: number, z: number): Position;
    new (other: Position): Position;
    x: number;
    y: number;
    z: number;
    clone(): Position;
}
export interface Direction {
    new (): Direction;
    new (yaw: number, pitch: number, roll: number): Direction;
    new (other: Direction): Direction;
    yaw: number;
    pitch: number;
    roll: number;
    clone(): Direction;
}
export interface PlaySoundEvent3D {
    new (): PlaySoundEvent3D;
    new (soundEventIndex: number, category: SoundCategory, position: Position, volumeModifier: number, pitchModifier: number): PlaySoundEvent3D;
    new (other: PlaySoundEvent3D): PlaySoundEvent3D;
    soundEventIndex: number;
    category: SoundCategory;
    position: Position;
    volumeModifier: number;
    pitchModifier: number;
    getId(): number;
    clone(): PlaySoundEvent3D;
}
export interface PlaySoundEventEntity {
    new (): PlaySoundEventEntity;
    new (soundEventIndex: number, networkId: number, volumeModifier: number, pitchModifier: number): PlaySoundEventEntity;
    new (other: PlaySoundEventEntity): PlaySoundEventEntity;
    soundEventIndex: number;
    networkId: number;
    volumeModifier: number;
    pitchModifier: number;
    getId(): number;
    clone(): PlaySoundEventEntity;
}
export interface SpawnParticleSystem {
    new (): SpawnParticleSystem;
    new (particleSystemId: string, position: Position, rotation: Direction, scale: number, color: Color): SpawnParticleSystem;
    new (other: SpawnParticleSystem): SpawnParticleSystem;
    particleSystemId: string;
    position: Position;
    rotation: Direction;
    scale: number;
    color: Color;
    getId(): number;
    clone(): SpawnParticleSystem;
}
export interface SetBlockCmd {
    new (): SetBlockCmd;
    new (index: number, blockId: number, filler: number, rotation: number): SetBlockCmd;
    new (other: SetBlockCmd): SetBlockCmd;
    index: number;
    blockId: number;
    filler: number;
    rotation: number;
    serialize(buf: unknown): void;
    computeSize(): number;
    clone(): SetBlockCmd;
}
export interface ServerSetBlocks {
    new (): ServerSetBlocks;
    new (x: number, y: number, z: number, cmds: SetBlockCmd[]): ServerSetBlocks;
    new (other: ServerSetBlocks): ServerSetBlocks;
    x: number;
    y: number;
    z: number;
    cmds: SetBlockCmd[];
    getId(): number;
    serialize(buf: unknown): void;
    computeSize(): number;
    clone(): ServerSetBlocks;
}
export interface ModelTransform {
    new (): ModelTransform;
    new (position: Position | null, bodyOrientation: Direction | null, lookOrientation: Direction | null): ModelTransform;
    new (other: ModelTransform): ModelTransform;
    position: Position | null;
    bodyOrientation: Direction | null;
    lookOrientation: Direction | null;
    clone(): ModelTransform;
}
export interface AudioComponent {
    new (): AudioComponent;
    getComponentType(): ComponentType;
    getSoundEventIds(): number[];
    addSound(soundEventIndex: number): void;
    consumeNetworkOutdated(): boolean;
    clone(): AudioComponent;
}
export interface DisplayNameComponent {
    new (): DisplayNameComponent;
    new (displayName: Message): DisplayNameComponent;
    getComponentType(): ComponentType;
    getDisplayName(): Message | null;
    clone(): DisplayNameComponent;
}
export interface TransformComponent {
    new (): TransformComponent;
    new (position: Vector3d, rotation: Vector3f): TransformComponent;
    getComponentType(): ComponentType<EntityStore, TransformComponent>;
    getPosition(): Vector3d;
    setPosition(position: Vector3d): void;
    teleportPosition(position: Vector3d): void;
    getRotation(): Vector3f;
    setRotation(rotation: Vector3f): void;
    getTransform(): Transform;
    teleportRotation(rotation: Vector3f): void;
    getSentTransform(): ModelTransform;
    getChunk(): unknown | null;
}
export interface ActiveEntityEffect {
    new (): ActiveEntityEffect;
    new (entityEffectId: string, entityEffectIndex: number, duration: number, debuff: boolean, statusEffectIcon: string | null, invulnerable: boolean): ActiveEntityEffect;
    new (entityEffectId: string, entityEffectIndex: number, infinite: boolean, invulnerable: boolean): ActiveEntityEffect;
    getEntityEffectIndex(): number;
    getInitialDuration(): number;
    getRemainingDuration(): number;
    isInfinite(): boolean;
    isDebuff(): boolean;
    isInvulnerable(): boolean;
    toString(): string;
}
export interface CameraManager {
    new (): CameraManager;
    getComponentType(): ComponentType;
    resetCamera(ref: PlayerRef): void;
    getLastScreenPoint(): Vector2d;
    setLastScreenPoint(lastScreenPoint: Vector2d): void;
    setLastBlockPosition(targetBlock: Vector3i): void;
    getLastTargetBlock(): Vector3i | null;
    clone(): CameraManager;
    toString(): string;
}
export interface AbilityEffects {
    new (disabled: JavaSet<InteractionType>): AbilityEffects;
    toPacket(): unknown;
    toString(): string;
}
export interface ActiveAnimationComponent {
    new (): ActiveAnimationComponent;
    new (activeAnimations: string[]): ActiveAnimationComponent;
    getComponentType(): ComponentType;
    getActiveAnimations(): string[];
    setPlayingAnimation(slot: unknown, animation: string | null): void;
    consumeNetworkOutdated(): boolean;
    clone(): unknown;
}
export interface AliveCondition {
    new (inverse: boolean): AliveCondition;
    eval0(componentAccessor: ComponentAccessor, ref: Ref, currentTime: unknown): boolean;
    toString(): string;
}
export interface AllLegacyEntityTypesQuery {
    test(archetype: unknown): boolean;
    requiresComponentType(componentType: ComponentType): boolean;
    validateRegistry(registry: unknown): void;
    validate(): void;
}
export interface AllLegacyLivingEntityTypesQuery {
    test(archetype: unknown): boolean;
    requiresComponentType(componentType: ComponentType): boolean;
    validateRegistry(registry: unknown): void;
    validate(): void;
}
export interface AnimationUtils {
    playAnimation(ref: Ref, animationSlot: unknown, animationId: string | null, sendToSelf: boolean, componentAccessor: ComponentAccessor): void;
    playAnimation(ref: Ref, animationSlot: unknown, itemAnimationsId: string | null, animationId: string | null, sendToSelf: boolean, componentAccessor: ComponentAccessor): void;
    playAnimation(ref: Ref, animationSlot: unknown, itemAnimationsId: string, animationId: string, componentAccessor: ComponentAccessor): void;
    playAnimation(ref: Ref, animationSlot: unknown, itemAnimations: unknown | null, animationId: string, componentAccessor: ComponentAccessor): void;
    playAnimation(ref: Ref, animationSlot: unknown, animationId: string | null, componentAccessor: ComponentAccessor): void;
    stopAnimation(ref: Ref, animationSlot: unknown, componentAccessor: ComponentAccessor): void;
    stopAnimation(ref: Ref, animationSlot: unknown, sendToSelf: boolean, componentAccessor: ComponentAccessor): void;
}
export interface AOECircleSelector {
    newSelector(): unknown;
    toPacket(): unknown;
    getOffset(): Vector2f;
    selectTargetPosition(commandBuffer: unknown, attackerRef: Ref): Vector3d;
}
export interface AOECylinderSelector {
    newSelector(): unknown;
    toPacket(): unknown;
}
export interface ApplicationEffects {
    toPacket(): unknown;
    getHorizontalSpeedMultiplier(): number;
    getKnockbackMultiplier(): number;
    toString(): string;
}
export interface ApplyEffectInteraction {
    toString(): string;
}
export interface ApplyForceInteraction {
    getWaitForDataFrom(): unknown;
    needsRemoteSync(): boolean;
    toString(): string;
}
export interface ApplyRandomSkinPersistedComponent {
    getComponentType(): ComponentType;
    clone(): unknown;
}
export interface AudioSystems {
}
export interface BasicCollisionData {
    collisionPoint: Vector3d;
    collisionStart: number;
    setStart(point: Vector3d, start: number): void;
}
export interface BlockCollisionData {
    x: number;
    y: number;
    z: number;
    blockId: number;
    rotation: number;
    blockType: unknown | null;
    blockMaterial: unknown | null;
    detailBoxIndex: number;
    willDamage: boolean;
    fluidId: number;
    fluid: unknown | null;
    touching: boolean;
    overlapping: boolean;
    setBlockData(collisionConfig: unknown): void;
    setDetailBoxIndex(detailBoxIndex: number): void;
    setTouchingOverlapping(touching: boolean, overlapping: boolean): void;
    clear(): void;
    toString(): string;
}
export interface BlockCollisionProvider {
    setRequestedCollisionMaterials(requestedCollisionMaterials: number): void;
    setReportOverlaps(reportOverlaps: boolean): void;
    next(): boolean;
    accept(x: number, y: number, z: number): boolean;
}
export interface BlockContactData {
    clear(): void;
    assign(other: BlockContactData): void;
    setDamageAndSubmerged(damage: number, isSubmerged: boolean): void;
    getCollisionNormal(): Vector3d;
    getCollisionPoint(): Vector3d;
    getCollisionStart(): number;
    getCollisionEnd(): number;
    isOverlapping(): boolean;
    isOnGround(): boolean;
    getDamage(): number;
    isSubmergeFluid(): boolean;
}
export interface BlockData {
    assign(other: BlockData): void;
    clear(): void;
    isFiller(): boolean;
    originX(x: number): number;
    originY(y: number): number;
    originZ(z: number): number;
    getFillHeight(): number;
    isTrigger(): boolean;
    getBlockDamage(): number;
    getSubmergeDamage(): number;
    getCollisionMaterials(): number;
    getBlockBoundingBoxes(): unknown | null;
    getBlockType(): unknown | null;
    getFluidId(): number;
    getFluid(): unknown | null;
}
export interface BlockEntity {
    new (blockTypeKey: string): BlockEntity;
    getComponentType(): ComponentType;
    assembleDefaultBlockEntity(time: unknown, blockTypeKey: string, position: Vector3d): unknown;
    initPhysics(boundingBox: unknown): unknown;
    updateHitbox(ref: unknown, commandBuffer: unknown): unknown;
    createBoundingBoxComponent(): unknown | null;
    setBlockTypeKey(blockTypeKey: string, ref: unknown, commandBuffer: unknown): void;
    getSimplePhysicsProvider(): unknown;
    getBlockTypeKey(): string;
    addForce(x: number, y: number, z: number): void;
    consumeBlockIdNetworkOutdated(): boolean;
    clone(): unknown;
}
export interface BlockEntitySystems {
}
export interface BlockHarvestUtils {
    getSpecPowerDamageBlock(item: unknown | null, blockType: unknown | null, tool: unknown | null): unknown | null;
    calculateDurabilityUse(item: unknown, blockType: unknown | null): number;
    shouldPickupByInteraction(blockType: unknown | null): boolean;
    getDrops(blockType: unknown, quantity: number, itemId: string | null, dropListId: string | null): unknown[];
}
export interface BlockHealthChunk {
    getLastRepairGameTime(): unknown;
    setLastRepairGameTime(lastRepairGameTime: unknown): void;
    getBlockHealthMap(): unknown;
    getBlockFragilityMap(): unknown;
    damageBlock(currentUptime: unknown, world: unknown, block: Vector3i, health: number): unknown;
    repairBlock(world: unknown, block: Vector3i, progress: number): unknown;
    removeBlock(world: unknown, block: Vector3i): void;
    makeBlockFragile(blockLocation: Vector3i, fragileDuration: number): void;
    isBlockFragile(block: Vector3i): boolean;
    getBlockHealth(block: Vector3i): number;
    createBlockDamagePackets(list: unknown[]): void;
    clone(): BlockHealthChunk;
}
export interface BlockMigrationExtraInfo {
    new (version: number, blockMigration: unknown): BlockMigrationExtraInfo;
    getBlockMigration(): unknown;
}
export interface BlockSetModule {
    getInstance(): BlockSetModule;
    getBlockSets(): unknown;
    blockInSet(set: number, blockId: number): boolean;
    blockInSet(set: number, blockType: unknown): boolean;
    blockInSet(set: number, blockTypeKey: string | null): boolean;
}
export interface BoundingBox {
    new (): BoundingBox;
    new (boundingBox: unknown): BoundingBox;
    getComponentType(): unknown;
    getBoundingBox(): unknown;
    setBoundingBox(boundingBox: unknown): void;
    getDetailBoxes(): unknown;
    setDetailBoxes(detailBoxes: unknown): void;
    clone(): unknown;
}
export interface BoxCollisionData {
    collisionEnd: number;
    collisionNormal: unknown;
    setEnd(collisionEnd: number, collisionNormal: unknown): void;
}
export interface BuilderToolInteraction {
    generatePacket(): unknown;
    needsRemoteSync(): boolean;
    getWaitForDataFrom(): unknown;
    toString(): string;
}
export interface CalculationResult {
    NOT_LOADED: CalculationResult;
    DONE: CalculationResult;
    INVALIDATED: CalculationResult;
    WAITING_FOR_NEIGHBOUR: CalculationResult;
}
export interface CameraInteraction {
    generatePacket(): unknown;
    toString(): string;
    getWaitForDataFrom(): unknown;
    needsRemoteSync(): boolean;
}
export interface ChainingInteraction {
    getWaitForDataFrom(): unknown;
    compile(builder: unknown): void;
    walk(collector: unknown, context: unknown): boolean;
    generatePacket(): unknown;
    needsRemoteSync(): boolean;
    toString(): string;
}
export interface ChargingCondition {
    toString(): string;
}
export interface ChargingInteraction {
    getWaitForDataFrom(): unknown;
    compile(builder: unknown): void;
    walk(collector: unknown, context: unknown): boolean;
    generatePacket(): unknown;
    needsRemoteSync(): boolean;
    toString(): string;
}
export interface CheckUniqueItemUsageInteraction {
    getWaitForDataFrom(): unknown;
    toString(): string;
}
export interface ChunkLightingManager {
    new (world: unknown): ChunkLightingManager;
    getLogger(): unknown;
    getWorld(): unknown;
    setLightCalculation(lightCalculation: unknown): void;
    getLightCalculation(): unknown;
    start(): void;
    run(): void;
}
export interface ChunkTracker {
    new (): ChunkTracker;
    getComponentType(): unknown;
    unloadAll(playerRefComponent: unknown): void;
    clone(): unknown;
}
export interface ClearEntityEffectInteraction {
    generatePacket(): unknown;
    toString(): string;
}
export interface ClientDelegatingProvider {
    new (): ClientDelegatingProvider;
    getDisconnectReason(uuid: unknown): unknown;
}
export interface ClientSourcedSelector {
    new (parent: unknown, context: unknown): ClientSourcedSelector;
    tick(commandBuffer: unknown, ref: unknown, time: number, runTime: number): void;
    selectTargetEntities(commandBuffer: unknown, ref: unknown, consumer: unknown, filter: unknown): void;
    selectTargetBlocks(commandBuffer: unknown, ref: unknown, consumer: unknown): void;
}
export interface CollisionConfig {
    new (): CollisionConfig;
    blockId: number;
    blockType: unknown | null;
    blockMaterial: unknown | null;
    rotation: number;
    blockX: number;
    blockY: number;
    blockZ: number;
    fluid: unknown | null;
    fluidId: number;
    fluidLevel: number;
    blockMaterialMask: number;
    blockCanCollide: boolean;
    blockCanTrigger: boolean;
    blockCanTriggerPartial: boolean;
    checkTriggerBlocks: boolean;
    checkDamageBlocks: boolean;
    dumpInvalidBlocks: boolean;
    extraData1: unknown | null;
    extraData2: unknown | null;
    getDetailCount(): number;
    getBoundingBox(): unknown;
    getBoundingBox(i: number): unknown;
    getBoundingBoxOffsetX(): number;
    getBoundingBoxOffsetY(): number;
    getBoundingBoxOffsetZ(): number;
    setCollisionByMaterial(collidingMaterials: number): void;
    getCollisionByMaterial(): number;
    isCollidingWithDamageBlocks(): boolean;
    setCollideWithDamageBlocks(damageColliding: boolean): boolean;
    getBlockCollisionPredicate(): unknown;
    setDefaultCollisionBehaviour(): void;
    setDefaultBlockCollisionPredicate(): void;
    isCheckTriggerBlocks(): boolean;
    setCheckTriggerBlocks(checkTriggerBlocks: boolean): void;
    isCheckDamageBlocks(): boolean;
    setCheckDamageBlocks(checkDamageBlocks: boolean): void;
    setWorld(world: unknown): void;
    canCollide(x: number, y: number, z: number): boolean;
    clear(): void;
}
export interface CollisionModuleConfig {
    new (): CollisionModuleConfig;
    getExtentMax(): number;
    setExtentMax(extentMax: number): void;
    isDumpInvalidBlocks(): boolean;
    setDumpInvalidBlocks(dumpInvalidBlocks: boolean): void;
    getMinimumThickness(): number;
    setMinimumThickness(minimumThickness: number): void;
    hasMinimumThickness(): boolean;
}
export interface CollisionResultComponent {
    new (): CollisionResultComponent;
    new (other: CollisionResultComponent): CollisionResultComponent;
    getComponentType(): unknown;
    getCollisionResult(): unknown;
    getCollisionStartPosition(): unknown;
    getCollisionPositionOffset(): unknown;
    getCollisionStartPositionCopy(): unknown;
    getCollisionPositionOffsetCopy(): unknown;
    isPendingCollisionCheck(): boolean;
    markPendingCollisionCheck(): void;
    consumePendingCollisionCheck(): void;
    resetLocationChange(): void;
    clone(): unknown;
}
export interface CombatTextUIComponent {
    generatePacket(): unknown;
    toString(): string;
}
export interface CombatTextUIComponentOpacityAnimationEvent {
    generatePacket(): unknown;
    toString(): string;
}
export interface CombatTextUIComponentPositionAnimationEvent {
    generatePacket(): unknown;
    toString(): string;
}
export interface CombatTextUIComponentScaleAnimationEvent {
    generatePacket(): unknown;
    toString(): string;
}
export interface ContainerBlockWindow {
    new (x: number, y: number, z: number, rotationIndex: number, blockType: unknown, itemContainer: unknown): ContainerBlockWindow;
    getData(): unknown;
    onOpen0(): boolean;
    onClose0(): void;
    getItemContainer(): unknown;
    handleAction(ref: unknown, store: unknown, action: unknown): void;
}
export interface ContainerWindow {
    new (itemContainer: unknown): ContainerWindow;
    getData(): unknown;
    onOpen0(): boolean;
    onClose0(): void;
    getItemContainer(): unknown;
}
export interface CooldownHandler {
    new (): CooldownHandler;
    isOnCooldown(root: unknown, id: string, maxTime: number, chargeTimes: number[], interruptRecharge: boolean): boolean;
    resetCooldown(id: string, maxTime: number, chargeTimes: number[], interruptRecharge: boolean): void;
    getCooldown(id: string, maxTime: number, chargeTimes: number[], force: boolean, interruptRecharge: boolean): unknown | null;
    getCooldown(id: string): unknown | null;
    tick(dt: number): void;
}
export interface CraftingRecipePacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
    generateRemovePacket(assetMap: unknown, removed: unknown, query: unknown): unknown;
}
export interface DamageCalculator {
    getType(): unknown;
    getDamageClass(): unknown;
    getSequentialModifierStep(): number;
    getSequentialModifierMinimum(): number;
    equals(o: unknown): boolean;
    hashCode(): number;
    toString(): string;
}
export interface DamageCalculatorSystems {
}
export interface DamageCause {
    new (): DamageCause;
    new (id: string): DamageCause;
    new (id: string, inherits: string, durabilityLoss: boolean, staminaLoss: boolean, bypassResistances: boolean): DamageCause;
    getAssetStore(): unknown;
    getAssetMap(): unknown;
    getId(): string;
    isDurabilityLoss(): boolean;
    isStaminaLoss(): boolean;
    doesBypassResistances(): boolean;
    getInherits(): string;
    getAnimationId(): string;
    getDeathAnimationId(): string;
    toPacket(): unknown;
}
export interface DamageDataComponent {
    getComponentType(): unknown;
    getLastCombatAction(): unknown;
    setLastCombatAction(lastCombatAction: unknown): void;
    getLastDamageTime(): unknown;
    setLastDamageTime(lastDamageTime: unknown): void;
    getLastChargeTime(): unknown | null;
    setLastChargeTime(lastChargeTime: unknown): void;
    getCurrentWielding(): unknown | null;
    setCurrentWielding(currentWielding: unknown | null): void;
    clone(): unknown;
}
export interface DamageDataSetupSystem {
    new (damageDataComponentType: unknown): DamageDataSetupSystem;
    onEntityAdd(holder: unknown, reason: unknown, store: unknown): void;
    onEntityRemoved(holder: unknown, reason: unknown, store: unknown): void;
    getQuery(): unknown;
}
export interface DamageEffects {
    new (): DamageEffects;
    new (modelParticles: unknown[], worldParticles: unknown[], localSoundEventId: string, worldSoundEventId: string, viewDistance: number, knockback: unknown): DamageEffects;
    getModelParticles(): unknown[];
    getWorldParticles(): unknown[];
    getWorldSoundEventId(): string | null;
    getWorldSoundEventIndex(): number;
    getLocalSoundEventId(): string | null;
    getLocalSoundEventIndex(): number;
    getViewDistance(): number;
    getKnockback(): unknown;
    getCameraEffectId(): string;
    addToDamage(damageEvent: unknown): void;
    spawnAtEntity(commandBuffer: unknown, ref: unknown): void;
    toString(): string;
    toPacket(): unknown;
}
export interface DamageEntityInteraction {
    tick0(firstRun: boolean, time: number, type: unknown, context: unknown, cooldownHandler: unknown): void;
    simulateTick0(firstRun: boolean, time: number, type: unknown, context: unknown, cooldownHandler: unknown): void;
    compile(builder: unknown): void;
    walk(collector: unknown, context: unknown): boolean;
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
    needsRemoteSync(): boolean;
    getWaitForDataFrom(): unknown;
}
export interface DamageModule {
    get(): DamageModule;
    getDeathComponentType(): unknown;
    getDeferredCorpseRemovalComponentType(): unknown;
    getGatherDamageGroup(): unknown;
    getFilterDamageGroup(): unknown;
    getInspectDamageGroup(): unknown;
}
export interface DamageSystems {
    executeDamage(ref: unknown, componentAccessor: unknown, damage: unknown): void;
    executeDamage(index: number, chunk: unknown, commandBuffer: unknown, damage: unknown): void;
    executeDamage(ref: unknown, commandBuffer: unknown, damage: unknown): void;
}
export interface DeathComponent {
    getComponentType(): unknown;
    tryAddComponent(commandBuffer: unknown, ref: unknown, damage: unknown): void;
    tryAddComponent(store: unknown, ref: unknown, damage: unknown): void;
    getDeathCause(): unknown | null;
    getDeathMessage(): unknown | null;
    setDeathMessage(deathMessage: unknown | null): void;
    isShowDeathMenu(): boolean;
    setShowDeathMenu(showDeathMenu: boolean): void;
    getItemsLostOnDeath(): unknown[];
    setItemsLostOnDeath(itemsLostOnDeath: unknown[]): void;
    getItemsAmountLossPercentage(): number;
    setItemsAmountLossPercentage(itemsAmountLossPercentage: number): void;
    getItemsDurabilityLossPercentage(): number;
    setItemsDurabilityLossPercentage(itemsDurabilityLossPercentage: number): void;
    displayDataOnDeathScreen(): boolean;
    setDisplayDataOnDeathScreen(displayDataOnDeathScreen: boolean): void;
    getDeathInfo(): unknown | null;
    getItemsLossMode(): unknown;
    setItemsLossMode(itemsLossMode: unknown): void;
    getDeathItemLoss(): DeathItemLoss;
    getInteractionChain(): unknown | null;
    setInteractionChain(interactionChain: unknown | null): void;
    clone(): unknown;
}
export interface DeferredCorpseRemoval {
    new (timeUntilCorpseRemoval: number): DeferredCorpseRemoval;
    getComponentType(): unknown;
    tick(dt: number): boolean;
    clone(): unknown;
}
export interface DespawnComponent {
    new (): DespawnComponent;
    new (timeToDespawnAt: unknown): DespawnComponent;
    getComponentType(): unknown;
    despawnInSeconds(time: unknown, seconds: number): DespawnComponent;
    despawnInSeconds(time: unknown, seconds: number): DespawnComponent;
    despawnInMilliseconds(time: unknown, milliseconds: number): DespawnComponent;
    trySetDespawn(commandBuffer: unknown, timeResource: unknown, ref: unknown, despawnComponent: DespawnComponent | null, newLifetime: number | null): void;
    setDespawn(timeToDespawnAt: unknown): void;
    setDespawnTo(from: unknown, additionalSeconds: number): void;
    getDespawn(): unknown | null;
    clone(): unknown;
}
export interface DespawnSystem {
    new (despawnComponentType: unknown): DespawnSystem;
    isParallel(archetypeChunkSize: number, taskCount: number): boolean;
    getQuery(): unknown;
}
export interface DestroyConditionInteraction {
    getWaitForDataFrom(): unknown;
}
export interface DesyncDamageCommand {
    new (): DesyncDamageCommand;
}
export interface DoorInteraction {
    DoorInfo: {
        new (blockType: unknown, filler: number, blockPosition: unknown, doorState: unknown): unknown;
        getBlockType(): unknown;
        getBlockPosition(): unknown;
        getDoorState(): unknown;
    };
    getDoorAtPosition(chunkAccessor: unknown, x: number, y: number, z: number, rotationToCheck: unknown): unknown | null;
}
export interface DynamicLightSystems {
    EntityTrackerRemove: {
        new (visibleComponentType: unknown): unknown;
        getQuery(): unknown;
        componentType(): unknown;
        onEntityAdd(ref: unknown, component: unknown, store: unknown, commandBuffer: unknown): void;
        onEntityRemoved(ref: unknown, component: unknown, store: unknown, commandBuffer: unknown): void;
    };
    Setup: unknown;
}
export interface EffectConditionInteraction {
    toString(): string;
}
export interface EffectControllerComponent {
    new (): EffectControllerComponent;
    new (effectControllerComponent: EffectControllerComponent): EffectControllerComponent;
    getComponentType(): unknown;
    isInvulnerable(): boolean;
    setInvulnerable(invulnerable: boolean): void;
    addEffect(ownerRef: unknown, entityEffect: unknown, componentAccessor: unknown): boolean;
    addEffect(ownerRef: unknown, entityEffectIndex: number, entityEffect: unknown, componentAccessor: unknown): boolean;
    addEffect(ownerRef: unknown, entityEffect: unknown, duration: number, overlapBehavior: unknown, componentAccessor: unknown): boolean;
    addEffect(ownerRef: unknown, entityEffectIndex: number, entityEffect: unknown, duration: number, overlapBehavior: unknown, componentAccessor: unknown): boolean;
    addInfiniteEffect(ownerRef: unknown, entityEffectIndex: number, entityEffect: unknown, componentAccessor: unknown): boolean;
    setModelChange(ownerRef: unknown, entityEffect: unknown, entityEffectIndex: number, componentAccessor: unknown): void;
    tryResetModelChange(ownerRef: unknown, activeEffectIndex: number, componentAccessor: unknown): void;
    addActiveEntityEffects(activeEntityEffects: unknown[]): void;
    removeEffect(ownerRef: unknown, entityEffectIndex: number, componentAccessor: unknown): void;
    removeEffect(ownerRef: unknown, entityEffectIndex: number, removalBehavior: unknown, componentAccessor: unknown): void;
    clearEffects(ownerRef: unknown, componentAccessor: unknown): void;
    invalidateCache(): void;
    getActiveEffects(): unknown;
    clone(): EffectControllerComponent;
}
export interface Emote {
    getId(): string;
    getName(): string;
    getAnimation(): string;
    toString(): string;
}
export interface EntityCleanCommand {
    new (): EntityCleanCommand;
}
export interface EntityCloneCommand {
    new (): EntityCloneCommand;
    cloneEntity(sender: unknown, entityReference: unknown, store: unknown): void;
}
export interface EntityCollisionProvider {
    new (): EntityCollisionProvider;
    defaultEntityFilter(ref: unknown, componentAccessor: unknown): boolean;
    getCount(): number;
    getContact(index: number): unknown;
    clear(): void;
}
export interface EntityCommand {
    new (): EntityCommand;
}
export interface EntityContactData {
    getCollisionPoint(): unknown;
    getCollisionStart(): number;
    getCollisionEnd(): number;
    getEntityReference(): unknown | null;
    getCollisionDetailName(): string;
    assign(position: unknown, start: number, end: number, entity: unknown, collisionDetailName: string): void;
    clear(): void;
}
export interface EntityCountCommand {
    new (): EntityCountCommand;
}
export interface EntityDumpCommand {
    new (): EntityDumpCommand;
}
export interface EntityEffect {
    new (id: string): EntityEffect;
    getAssetStore(): unknown;
    getAssetMap(): unknown;
    getName(): string | null;
    getStatModifiers(): unknown | null;
    getId(): string;
    getApplicationEffects(): unknown | null;
    getDamageCalculator(): unknown | null;
    getDamageCalculatorCooldown(): number;
    getDamageEffects(): unknown | null;
    getStatModifierEffects(): unknown | null;
    getModelOverride(): unknown | null;
    getModelChange(): string | null;
    getEntityStats(): unknown | null;
    getDuration(): number;
    getOverlapBehavior(): unknown;
    isInfinite(): boolean;
    isDebuff(): boolean;
    getStatusEffectIcon(): string | null;
    getLocale(): string | null;
    getRemovalBehavior(): unknown;
    getValueType(): unknown;
    isInvulnerable(): boolean;
    getDamageResistanceValues(): unknown | null;
    toPacket(): unknown;
    toString(): string;
}
export interface EntityEffectCommand {
    new (): EntityEffectCommand;
}
export interface EntityEffectPacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
}
export interface EntityGroup {
    new (): EntityGroup;
    getComponentType(): unknown;
    getLeaderRef(): unknown | null;
    setLeaderRef(leaderRef: unknown): void;
    add(reference: unknown): void;
    remove(reference: unknown): void;
    getFirst(): unknown | null;
    getMemberList(): unknown[];
    size(): number;
    isDissolved(): boolean;
    setDissolved(dissolved: boolean): void;
    clear(): void;
    isMember(reference: unknown): boolean;
    forEachMemberExcludingLeader(consumer: unknown, sender: unknown, arg: unknown): void;
    forEachMemberExcludingSelf(consumer: unknown, sender: unknown, arg: unknown): void;
    forEachMember(consumer: unknown, sender: unknown, arg: unknown): void;
    testMembers(predicate: unknown, skipLeader: boolean): unknown | null;
    clone(): unknown;
    toString(): string;
}
export interface EntityHideFromAdventurePlayersCommand {
    new (): EntityHideFromAdventurePlayersCommand;
}
export interface EntityIntangibleCommand {
    new (): EntityIntangibleCommand;
}
export interface EntityInteractableSystems {
}
export interface EntityInvulnerableCommand {
    new (): EntityInvulnerableCommand;
}
export interface EntityLodCommand {
    new (): EntityLodCommand;
}
export interface EntityMakeInteractableCommand {
    new (): EntityMakeInteractableCommand;
}
export interface EntityModule {
    get(): EntityModule;
    getMigrationSystemType(): unknown;
    getVelocityModifyingSystemType(): unknown;
    getPlayerComponentType(): unknown;
    getFrozenComponentType(): unknown;
    getChunkTrackerComponentType(): unknown;
    getPlayerSkinComponentType(): unknown;
    getDisplayNameComponentType(): unknown;
    getApplyRandomSkinPersistedComponent(): unknown;
    getEntityGroupComponentType(): unknown;
    getPlayerSpatialResourceType(): unknown;
    getItemSpatialResourceType(): unknown;
    getNetworkSendableSpatialResourceType(): unknown;
    getCollisionResultComponentType(): unknown;
    getEntityViewerComponentType(): unknown;
    getVisibleComponentType(): unknown;
    getDamageDataComponentType(): unknown;
    getKnockbackComponentType(): unknown;
    getDespawnComponentType(): unknown;
    getSnapshotWorldInfoResourceType(): unknown;
    getSnapshotBufferComponentType(): unknown;
    getInteractableComponentType(): unknown;
    getIntangibleComponentType(): unknown;
    getPreventPickupComponentType(): unknown;
    getInvulnerableComponentType(): unknown;
    getRespondToHitComponentType(): unknown;
    getInteractableQueueResourceType(): unknown;
    getIntangibleQueueResourceType(): unknown;
    getInvulnerableQueueResourceType(): unknown;
    getRespondToHitQueueResourceType(): unknown;
    getHiddenFromAdventurePlayerComponentType(): unknown;
    getFromPrefabComponentType(): unknown;
    getFromWorldGenComponentType(): unknown;
    getWorldGenIdComponentType(): unknown;
    getMovementManagerComponentType(): unknown;
    getNameplateComponentType(): unknown;
    getPreClearMarkersGroup(): unknown;
    getPersistentRefCountComponentType(): unknown;
    getTransformComponentType(): unknown;
    getHeadRotationComponentType(): unknown;
    getNetworkIdComponentType(): unknown;
    getEffectControllerComponentType(): unknown;
    getMovementStatesComponentType(): unknown;
    getBlockEntityComponentType(): unknown;
    getEntityScaleComponentType(): unknown;
}
export interface EntityNameplateCommand {
    new (): EntityNameplateCommand;
}
export interface EntityRefCollisionProvider {
    new (): EntityRefCollisionProvider;
    getCount(): number;
    getContact(i: number): unknown;
    clear(): void;
    computeNearest(commandBuffer: unknown, entityBoundingBox: unknown, pos: unknown, dir: unknown, ignoreSelf: unknown | null, ignore: unknown | null): number;
    defaultEntityFilter(entity: unknown, commandBuffer: unknown): boolean;
}
export interface DeathItemLoss {
    new (lossMode: unknown, itemsLost: unknown[], amountLossPercentage: number, durabilityLossPercentage: number): DeathItemLoss;
    noLossMode(): DeathItemLoss;
    getLossMode(): unknown;
    getItemsLost(): unknown[];
    getAmountLossPercentage(): number;
    getDurabilityLossPercentage(): number;
}
export interface DeathSystems {
}
export interface DebugPlugin {
    get(): DebugPlugin | null;
}
export interface DebugUtils {
    add(world: unknown, shape: unknown, matrix: unknown, color: unknown, time: number, fade: boolean): void;
    addFrustum(world: unknown, matrix: unknown, frustumProjection: unknown, color: unknown, time: number, fade: boolean): void;
    clear(world: unknown): void;
    addArrow(world: unknown, baseMatrix: unknown, color: unknown, length: number, time: number, fade: boolean): void;
    addSphere(world: unknown, pos: unknown, color: unknown, scale: number, time: number): void;
    addCone(world: unknown, pos: unknown, color: unknown, scale: number, time: number): void;
    addCube(world: unknown, pos: unknown, color: unknown, scale: number, time: number): void;
    addCylinder(world: unknown, pos: unknown, color: unknown, scale: number, time: number): void;
    addArrow(world: unknown, position: unknown, direction: unknown, color: unknown, time: number, fade: boolean): void;
    addForce(world: unknown, position: unknown, force: unknown, velocityConfig: unknown | null): void;
}
export interface EntityRegistration {
    new (entityClass: unknown, isEnabled: unknown, unregister: unknown): EntityRegistration;
    new (registration: EntityRegistration, isEnabled: unknown, unregister: unknown): EntityRegistration;
    getEntityClass(): unknown;
    toString(): string;
}
export interface EntityRegistry {
    new (registrations: unknown[], precondition: unknown, preconditionMessage: string): EntityRegistry;
    registerEntity(key: string, clazz: unknown, constructor: unknown, codec: unknown): EntityRegistration | null;
}
export interface EntityRemoveCommand {
    new (): EntityRemoveCommand;
    removeEntity(playerRef: Ref | null, entityReference: Ref, componentAccessor: unknown): void;
}
export interface EntityRemoveEvent {
    new (entity: Entity): EntityRemoveEvent;
    toString(): string;
}
export interface EntityResendCommand {
    new (): EntityResendCommand;
}
export interface EntityScaleComponent {
    new (scale: number): EntityScaleComponent;
    getComponentType(): unknown;
    getScale(): number;
    setScale(scale: number): void;
    consumeNetworkOutdated(): boolean;
    clone(): unknown;
}
export interface EntitySnapshot {
    new (): EntitySnapshot;
    new (position: Vector3d, bodyRotation: Vector3f): EntitySnapshot;
    init(position: Vector3d, bodyRotation: Vector3f): void;
    getPosition(): Vector3d;
    getBodyRotation(): Vector3f;
    toString(): string;
}
export interface EntitySnapshotHistoryCommand {
    new (): EntitySnapshotHistoryCommand;
}
export interface EntitySnapshotLengthCommand {
    new (): EntitySnapshotLengthCommand;
}
export interface EntitySnapshotSubCommand {
    new (): EntitySnapshotSubCommand;
}
export interface EntitySpatialSystem {
    new (spatialResource: unknown): EntitySpatialSystem;
    getQuery(): unknown;
    tick(dt: number, systemIndex: number, store: unknown): void;
    getPosition(archetypeChunk: unknown, index: number): Vector3d;
}
export interface EntityStatMap {
    new (): EntityStatMap;
    getComponentType(): unknown;
    size(): number;
    get(index: number): unknown | null;
    update(): void;
    getModifier(index: number, key: string): unknown | null;
    putModifier(index: number, key: string, modifier: unknown): unknown | null;
    putModifier(predictable: unknown, index: number, key: string, modifier: unknown): unknown | null;
    removeModifier(index: number, key: string): unknown | null;
    removeModifier(predictable: unknown, index: number, key: string): unknown | null;
    setStatValue(index: number, newValue: number): number;
    setStatValue(predictable: unknown, index: number, newValue: number): number;
    addStatValue(index: number, amount: number): number;
    addStatValue(predictable: unknown, index: number, amount: number): number;
    subtractStatValue(index: number, amount: number): number;
    subtractStatValue(predictable: unknown, index: number, amount: number): number;
    minimizeStatValue(index: number): number;
    minimizeStatValue(predictable: unknown, index: number): number;
    maximizeStatValue(index: number): number;
    maximizeStatValue(predictable: unknown, index: number): number;
    resetStatValue(index: number): number;
    resetStatValue(predictable: unknown, index: number): number;
    getSelfUpdates(): unknown;
    getSelfStatValues(): unknown;
    consumeSelfUpdates(): unknown;
    clearUpdates(): void;
    consumeOtherUpdates(): unknown;
    createInitUpdate(all: boolean): unknown;
    consumeSelfNetworkOutdated(): boolean;
    consumeNetworkOutdated(): boolean;
    processStatChanges(predictable: unknown, entityStats: unknown, valueType: unknown, changeStatBehaviour: unknown): void;
    toString(): string;
    clone(): EntityStatMap;
}
export interface EntityStatsAddCommand {
    new (): EntityStatsAddCommand;
}
export interface EntityStatsDumpCommand {
    new (): EntityStatsDumpCommand;
}
export interface EntityStatsGetCommand {
    new (): EntityStatsGetCommand;
}
export interface EntityStatsResetCommand {
    new (): EntityStatsResetCommand;
}
export interface EntityStatsSetCommand {
    new (): EntityStatsSetCommand;
}
export interface EntityStatsSetToMaxCommand {
    new (): EntityStatsSetToMaxCommand;
}
export interface EntityStatsSubCommand {
    new (): EntityStatsSubCommand;
}
export interface EntityStatType {
    new (): EntityStatType;
    new (id: string, initialValue: number, min: number, max: number, shared: boolean, regenerating: unknown[] | null, minValueEffects: unknown, maxValueEffects: unknown, entityStatResetBehavior: unknown): EntityStatType;
    getAssetStore(): unknown;
    getAssetMap(): unknown;
    getUnknownFor(unknownId: string): EntityStatType;
    getId(): string;
    isUnknown(): boolean;
    getInitialValue(): number;
    getMin(): number;
    getMax(): number;
    getIgnoreInvulnerability(): boolean;
    isShared(): boolean;
    getMinValueEffects(): unknown;
    getMaxValueEffects(): unknown;
    getRegenerating(): unknown[] | null;
    getResetBehavior(): unknown;
    toPacket(): unknown;
    toString(): string;
}
export interface EntityStatTypePacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
    generateUpdatePacket(assetMap: unknown, loadedAssets: unknown): unknown;
    generateRemovePacket(assetMap: unknown, removed: unknown): unknown;
}
export interface EntityStatUIComponent {
    toString(): string;
}
export interface EntityStatValue {
    new (): EntityStatValue;
    new (index: number, asset: unknown): EntityStatValue;
    getId(): string;
    getIndex(): number;
    get(): number;
    asPercentage(): number;
    getMin(): number;
    getMax(): number;
    getRegeneratingValues(): unknown[] | null;
    getModifier(key: string): unknown | null;
    getIgnoreInvulnerability(): boolean;
    getModifiers(): unknown | null;
    synchronizeAsset(index: number, asset: unknown): boolean;
    toString(): string;
}
export interface EntitySystems {
    ClearFromPrefabMarker: unknown;
    ClearFromWorldGenMarker: unknown;
    ClearMarker: unknown;
    DynamicLightTracker: unknown;
    NewSpawnEntityTrackerUpdate: unknown;
    NewSpawnTick: unknown;
    OnLoadFromExternal: unknown;
    UnloadEntityFromChunk: unknown;
}
export interface EntityTrackerCommand {
    new (): EntityTrackerCommand;
}
export interface EntityTrackerSystems {
    despawnAll(viewerRef: unknown, store: unknown): boolean;
    clear(viewerRef: unknown, store: unknown): boolean;
    AddToVisible: unknown;
    ClearEntityViewers: unknown;
    ClearPreviouslyVisible: unknown;
    CollectVisible: unknown;
    EnsureVisibleComponent: unknown;
    EntityUpdate: unknown;
    EntityViewer: unknown;
    Visible: unknown;
}
export interface EntityUIComponentPacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
    generateUpdatePacket(assetMap: unknown, loadedAssets: unknown, query: unknown): unknown;
    generateRemovePacket(assetMap: unknown, removed: unknown, query: unknown): unknown;
}
export interface EntityUIModule {
    new (init: unknown): EntityUIModule;
    get(): EntityUIModule;
    getUIComponentListType(): unknown;
}
export interface EntityUtils {
    toHolder(index: number, archetypeChunk: unknown): unknown;
    getEntity(ref: unknown, componentAccessor: unknown): unknown | null;
    hasEntity(archetype: unknown): boolean;
    hasLivingEntity(archetype: unknown): boolean;
    getPhysicsValues(ref: unknown, componentAccessor: unknown): unknown;
}
export interface EnvironmentCondition {
    getEnvironments(): number[];
    toString(): string;
}
export interface EquipItemInteraction {
    getWaitForDataFrom(): unknown;
    toString(): string;
}
export interface ExplosionConfig {
    new (): ExplosionConfig;
}
export interface ExplosionUtils {
    performExplosion(damageSource: unknown, position: unknown, config: ExplosionConfig, ignoreRef: unknown, commandBuffer: unknown, chunkStore: unknown): void;
}
export interface FirstClickInteraction {
    getWaitForDataFrom(): unknown;
    compile(builder: unknown): void;
    walk(collector: unknown, context: unknown): boolean;
    needsRemoteSync(): boolean;
    toString(): string;
}
export interface FloodLightCalculation {
    new (chunkLightingManager: unknown): FloodLightCalculation;
    init(chunk: unknown): void;
    calculateLight(chunkPosition: unknown): unknown;
    invalidateLightInChunkSections(worldChunk: unknown, sectionIndexFrom: number, sectionIndexTo: number): boolean;
    testNeighboursForLocalLight(accessor: unknown, worldChunk: unknown, chunkX: number, chunkY: number, chunkZ: number): boolean;
    propagateSides(toSection: unknown, globalLight: unknown, bitSetQueue: unknown): void;
    propagateEdges(toSection: unknown, globalLight: unknown, bitSetQueue: unknown): void;
    propagateCorners(toSection: unknown, globalLight: unknown, bitSetQueue: unknown): void;
}
export interface ForceProviderEntity {
    new (boundingBox: unknown): ForceProviderEntity;
    setDensity(density: number): void;
    setForceProviderStandardState(state: unknown): void;
    getForceProviderStandardState(): unknown;
    getMass(volume: number): number;
    getVolume(): number;
    getProjectedArea(bodyState: unknown, speed: number): number;
    getDensity(): number;
    getFrictionCoefficient(): number;
}
export interface FromPrefab {
    getComponentType(): unknown;
    clone(): unknown;
}
export interface FromWorldGen {
    new (worldGenId: number): FromWorldGen;
    getComponentType(): unknown;
    getWorldGenId(): number;
    clone(): unknown;
}
export interface Frozen {
    getComponentType(): unknown;
    get(): Frozen;
    clone(): unknown;
}
export interface FullBrightLightCalculation {
    new (chunkLightingManager: unknown, delegate: unknown): FullBrightLightCalculation;
    init(worldChunk: unknown): void;
    calculateLight(chunkPosition: unknown): unknown;
    invalidateLightAtBlock(worldChunk: unknown, blockX: number, blockY: number, blockZ: number, blockType: unknown, oldHeight: number, newHeight: number): boolean;
    invalidateLightInChunkSections(worldChunk: unknown, sectionIndexFrom: number, sectionIndexTo: number): boolean;
    setFullBright(worldChunk: unknown, chunkY: number): void;
}
export interface GenericVelocityInstructionSystem {
    getDependencies(): unknown;
    getQuery(): unknown;
    tick(dt: number, index: number, archetypeChunk: unknown, store: unknown, commandBuffer: unknown): void;
}
export interface GlidingCondition {
    new (): GlidingCondition;
    new (inverse: boolean): GlidingCondition;
    eval0(componentAccessor: unknown, ref: unknown, currentTime: unknown): boolean;
    toString(): string;
}
export interface HeadRotation {
    new (): HeadRotation;
    new (rotation: Vector3f): HeadRotation;
    getComponentType(): unknown;
    getRotation(): Vector3f;
    setRotation(rotation: Vector3f): void;
    getDirection(): unknown;
    getAxisDirection(): Vector3i;
    getHorizontalAxisDirection(): Vector3i;
    getAxis(): unknown;
    teleportRotation(rotation: Vector3f): void;
    clone(): HeadRotation;
}
export interface HiddenFromAdventurePlayers {
    getComponentType(): unknown;
    clone(): HiddenFromAdventurePlayers;
}
export interface HiddenPlayersManager {
    hidePlayer(uuid: unknown): void;
    showPlayer(uuid: unknown): void;
    isPlayerHidden(uuid: unknown): boolean;
}
export interface HideEntitySystems {
    getGroup(): unknown;
    getDependencies(): unknown;
    getQuery(): unknown;
    isParallel(archetypeChunkSize: number, taskCount: number): boolean;
}
export interface HitboxCollision {
    new (hitboxCollisionConfig: HitboxCollisionConfig): HitboxCollision;
    getComponentType(): unknown;
    getHitboxCollisionConfigIndex(): number;
    setHitboxCollisionConfigIndex(hitboxCollisionConfigIndex: number): void;
    consumeNetworkOutdated(): boolean;
    clone(): HitboxCollision;
}
export interface HitboxCollisionConfig {
    new (id: string): HitboxCollisionConfig;
    new (): HitboxCollisionConfig;
    getAssetStore(): unknown;
    getAssetMap(): unknown;
    getId(): string;
    getCollisionType(): unknown;
    getSoftOffsetRatio(): number;
    toPacket(): unknown;
    toString(): string;
}
export interface HitboxCollisionConfigPacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
    generateUpdatePacket(assetMap: unknown, loadedAssets: unknown, query: unknown): unknown;
    generateRemovePacket(assetMap: unknown, removed: unknown, query: unknown): unknown;
}
export interface HitboxCollisionSystems {
    getQuery(): unknown;
    componentType(): unknown;
    getGroup(): unknown;
    isParallel(archetypeChunkSize: number, taskCount: number): boolean;
    Setup(componentType: unknown, playerComponentType: unknown): unknown;
    onEntityAdd(holder: unknown, reason: unknown, store: unknown): void;
    onEntityRemoved(holder: unknown, reason: unknown, store: unknown): void;
}
export interface HitboxCommand {
    new (): HitboxCommand;
    HitboxExtentsCommand(): unknown;
    HitboxGetCommand(): unknown;
}
export interface HorizontalSelector {
    newSelector(): unknown;
    toPacket(): unknown;
    tick(commandBuffer: unknown, attacker: unknown, time: number, runTime: number): void;
    selectTargetBlocks(commandBuffer: unknown, attacker: unknown, consumer: unknown): void;
}
export interface HotbarManager {
    saveHotbar(playerRef: unknown, hotbarIndex: number, componentAccessor: unknown): void;
    loadHotbar(playerRef: unknown, hotbarIndex: number, componentAccessor: unknown): void;
    getCurrentHotbarIndex(): number;
    getIsCurrentlyLoadingHotbar(): boolean;
}
export interface HudManager {
    new (): HudManager;
    new (other: HudManager): HudManager;
    getCustomHud(): unknown | null;
    getVisibleHudComponents(): unknown;
    setVisibleHudComponents(ref: unknown, ...hudComponents: unknown[]): void;
    showHudComponents(ref: unknown, ...hudComponents: unknown[]): void;
    hideHudComponents(ref: unknown, ...hudComponents: unknown[]): void;
    setCustomHud(ref: unknown, hud: unknown | null): void;
    resetHud(ref: unknown): void;
    resetUserInterface(ref: unknown): void;
    sendVisibleHudComponents(packetHandler: unknown): void;
    toString(): string;
}
export interface HytaleBanProvider {
    new (): HytaleBanProvider;
    getDisconnectReason(uuid: unknown): unknown;
    hasBan(uuid: unknown): boolean;
    modify(func: unknown): boolean;
}
export interface IncreaseBackpackCapacityInteraction {
    getWaitForDataFrom(): unknown;
    toString(): string;
}
export interface InputUpdate {
    apply(commandBuffer: unknown, archetypeChunk: unknown, index: number): void;
}
export interface Intangible {
    getComponentType(): unknown;
    clone(): Intangible;
}
export interface IntangibleSystems {
    EntityTrackerAddAndRemove(visibleComponentType: unknown): unknown;
    getQuery(): unknown;
    componentType(): unknown;
    EntityTrackerUpdate(componentType: unknown): unknown;
    getGroup(): unknown;
    isParallel(archetypeChunkSize: number, taskCount: number): boolean;
    tick(dt: number, index: number, archetypeChunk: unknown, store: unknown, commandBuffer: unknown): void;
    getResourceType(): unknown;
    clone(): unknown;
}
export interface Interactable {
    getComponentType(): unknown;
    clone(): Interactable;
}
export interface InteractionChain {
    new (type: unknown, context: unknown, chainData: unknown, rootInteraction: unknown, onCompletion: unknown | null, requiresClient: boolean): InteractionChain;
    new (forkedChainId: unknown | null, baseForkedChainId: unknown | null, type: unknown, context: unknown, chainData: unknown, rootInteraction: unknown, onCompletion: unknown | null, requiresClient: boolean): InteractionChain;
    getType(): unknown;
    getChainId(): number;
    getForkedChainId(): unknown | null;
    getBaseForkedChainId(): unknown | null;
    getInitialRootInteraction(): unknown;
    isPredicted(): boolean;
    getContext(): unknown;
    getChainData(): unknown;
    getServerState(): unknown;
    requiresClient(): boolean;
    getRootInteraction(): unknown;
    getSimulatedRootInteraction(): unknown;
    getOperationCounter(): number;
    setOperationCounter(operationCounter: number): void;
    getSimulatedOperationCounter(): number;
    setSimulatedOperationCounter(simulatedOperationCounter: number): void;
    wasPreTicked(): boolean;
    setPreTicked(preTicked: boolean): void;
    getOperationIndex(): number;
    nextOperationIndex(): void;
    getClientOperationIndex(): number;
    findForkedChain(chainId: unknown, data: unknown | null): InteractionChain | null;
    getForkedChain(chainId: unknown): InteractionChain | null;
    putForkedChain(chainId: unknown, chain: InteractionChain): void;
    getTempForkedChain(chainId: unknown): unknown | null;
    hasSentInitial(): boolean;
    setSentInitial(sentInitial: boolean): void;
    getTimeShift(): number;
    setTimeShift(timeShift: number): void;
    consumeFirstRun(): boolean;
    isFirstRun(): boolean;
    setFirstRun(firstRun: boolean): void;
    getCallDepth(): number;
    getSimulatedCallDepth(): number;
    pushRoot(nextInteraction: unknown, simulate: boolean): void;
    popRoot(): void;
    getTimeInSeconds(): number;
    setOnCompletion(onCompletion: unknown): void;
    getClientState(): unknown;
    setClientState(state: unknown): void;
    getOrCreateInteractionEntry(index: number): unknown;
    getInteraction(index: number): unknown | null;
    removeInteractionEntry(interactionManager: unknown, index: number): void;
    putInteractionSyncData(index: number, data: unknown): void;
    clearInteractionSyncData(operationIndex: number): void;
    removeInteractionSyncData(index: number): unknown | null;
    updateSyncPosition(index: number): void;
    isSyncDataOutOfOrder(index: number): boolean;
    syncFork(ref: unknown, manager: unknown, packet: unknown): void;
    copyTempFrom(temp: unknown): void;
    setChainId(chainId: number): void;
    getBaseType(): unknown;
    setBaseType(baseType: unknown): void;
    getForkedChains(): unknown;
    getTempForkedChainData(): unknown;
    getTimestamp(): number;
    setTimestamp(timestamp: number): void;
    getWaitingForServerFinished(): number;
    setWaitingForServerFinished(waitingForServerFinished: number): void;
    getWaitingForClientFinished(): number;
    setWaitingForClientFinished(waitingForClientFinished: number): void;
    setServerState(serverState: unknown): void;
    getFinalState(): unknown;
    setFinalState(finalState: unknown): void;
    flagDesync(): void;
    isDesynced(): boolean;
    getNewForks(): unknown[];
    toString(): string;
}
export interface InteractionConfiguration {
    new (): InteractionConfiguration;
    new (displayOutlines: boolean): InteractionConfiguration;
    getPriorityFor(interactionType: unknown, slot: unknown): number;
    toPacket(): unknown;
}
export interface InteractionEffects {
    toPacket(): unknown;
    getParticles(): unknown[] | null;
    getWorldSoundEventId(): string | null;
    getWorldSoundEventIndex(): number;
    getLocalSoundEventId(): string | null;
    getLocalSoundEventIndex(): number;
    getTrails(): unknown[] | null;
    isWaitForAnimationToFinish(): boolean;
    getItemPlayerAnimationsId(): string | null;
    getItemAnimationId(): string | null;
    isClearAnimationOnFinish(): boolean;
    getStartDelay(): number;
    getMovementEffects(): unknown | null;
    toString(): string;
}
export interface InteractionEntry {
    new (index: number, counter: number, rootInteraction: number): InteractionEntry;
    getIndex(): number;
    nextForkId(): number;
    getNextForkId(): number;
    getState(): unknown;
    setUseSimulationState(useSimulationState: boolean): void;
    getTimeInSeconds(tickTime: number): number;
    setTimestamp(timestamp: number, shift: number): void;
    getTimestamp(): number;
    isUseSimulationState(): boolean;
    getClientState(): unknown | null;
    getMetaStore(): unknown;
    getServerDataHashCode(): number;
    getServerState(): unknown;
    getSimulationState(): unknown;
    setClientState(clientState: unknown | null): boolean;
    getWaitingForSyncData(): number;
    setWaitingForSyncData(waitingForSyncData: number): void;
    getWaitingForServerFinished(): number;
    setWaitingForServerFinished(waitingForServerFinished: number): void;
    getWaitingForClientFinished(): number;
    setWaitingForClientFinished(waitingForClientFinished: number): void;
    consumeDesyncFlag(): boolean;
    flagDesync(): void;
    consumeSendInitial(): boolean;
    toString(): string;
}
export interface InteractionManager {
    new (entity: unknown, playerRef: unknown | null, simulationHandler: unknown): InteractionManager;
    getChains(): unknown;
    getInteractionSimulationHandler(): unknown;
    setHasRemoteClient(hasRemoteClient: boolean): void;
    copyFrom(interactionManager: InteractionManager): void;
    tick(ref: unknown, commandBuffer: unknown, dt: number): void;
    sync(ref: unknown, chainSyncStorage: unknown, packet: unknown): void;
    canRun(type: unknown, rootInteraction: unknown): boolean;
    applyRules(context: unknown, data: unknown, type: unknown, rootInteraction: unknown): boolean;
    cancelChains(chain: InteractionChain): void;
    queueExecuteChain(chain: InteractionChain): void;
    executeChain(ref: unknown, commandBuffer: unknown, chain: InteractionChain): void;
    sendCancelPacket(chainId: number, forkedChainId: unknown | null): void;
    clear(): void;
    clearAllGlobalTimeShift(dt: number): void;
    setGlobalTimeShift(type: unknown, shift: number): void;
    getGlobalTimeShift(type: unknown): number;
    forEachInteraction(func: unknown, val: unknown): unknown;
    walkChain(ref: unknown, collector: unknown, type: unknown, rootInteraction: unknown | null, componentAccessor: unknown): void;
    getSyncPackets(): unknown[];
    clone(): unknown;
}
export interface InteractionSimulationHandler {
    new (): InteractionSimulationHandler;
    setState(type: unknown, state: boolean): void;
    isCharging(firstRun: boolean, time: number, type: unknown, context: unknown, ref: unknown, cooldownHandler: unknown): boolean;
    shouldCancelCharging(firstRun: boolean, time: number, type: unknown, context: unknown, ref: unknown, cooldownHandler: unknown): boolean;
    getChargeValue(firstRun: boolean, time: number, type: unknown, context: unknown, ref: unknown, cooldownHandler: unknown): number;
}
export interface InteractionSystems {
    getQuery(): unknown;
    EntityTrackerRemove(visibleComponentType: unknown): unknown;
    componentType(): unknown;
    onEntityAdd(holder: unknown, reason: unknown, store: unknown): void;
    onEntityRemoved(holder: unknown, reason: unknown, store: unknown): void;
    getGroup(): unknown | null;
    isParallel(archetypeChunkSize: number, taskCount: number): boolean;
}
export interface InteractionTarget {
    getEntity(ctx: unknown, ref: unknown): unknown | null;
    toProtocol(): unknown;
}
export interface InteractionTypeUtils {
    getDefaultCooldown(type: unknown): number;
    isCollisionType(type: unknown): boolean;
}
export interface InvalidatablePersistentRef {
    new (): InvalidatablePersistentRef;
    setEntity(ref: unknown, componentAccessor: unknown): void;
    clear(): void;
    setRefCount(refCount: number): void;
    getRefCount(): number;
}
export interface Invulnerable {
    getComponentType(): unknown;
    clone(): unknown;
}
export interface InvulnerableSystems {
    EntityTrackerAddAndRemove: unknown;
    EntityTrackerUpdate: unknown;
    QueueResource: unknown;
}
export interface ItemComponent {
    new (): ItemComponent;
    new (itemStack: unknown): ItemComponent;
    new (itemStack: unknown, mergeDelay: number, pickupDelay: number, pickupThrottle: number, removedByPlayerPickup: boolean): ItemComponent;
    getComponentType(): unknown;
    getItemStack(): unknown;
    setItemStack(itemStack: unknown): void;
    setPickupDelay(pickupDelay: number): void;
    getPickupRadius(componentAccessor: unknown): number;
    computeLifetimeSeconds(componentAccessor: unknown): number;
    computeDynamicLight(): unknown;
    pollPickupDelay(dt: number): boolean;
    pollPickupThrottle(dt: number): boolean;
    pollMergeDelay(dt: number): boolean;
}
export interface ItemContainerStateSpatialSystem {
    new (resourceType: unknown): ItemContainerStateSpatialSystem;
    tick(dt: number, systemIndex: number, store: unknown): void;
    getPosition(archetypeChunk: unknown, index: number): unknown;
    getQuery(): unknown;
}
export interface ItemMergeSystem {
    new (itemComponentComponentType: unknown, interactableComponentType: unknown, itemSpatialComponent: unknown): ItemMergeSystem;
    getQuery(): unknown;
    isParallel(archetypeChunkSize: number, taskCount: number): boolean;
}
export interface ItemPacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
    generateUpdatePacket(assetMap: unknown, loadedAssets: unknown, query: unknown): unknown;
    generateRemovePacket(assetMap: unknown, removed: unknown, query: unknown): unknown;
}
export interface ItemPhysicsComponent {
    new (): ItemPhysicsComponent;
    new (scaledVelocity: unknown, collisionResult: unknown): ItemPhysicsComponent;
    scaledVelocity: unknown;
    collisionResult: unknown;
    getComponentType(): unknown;
    clone(): unknown;
}
export interface ItemPhysicsSystem {
    new (itemPhysicsComponentType: unknown, velocityComponentType: unknown, boundingBoxComponentType: unknown): ItemPhysicsSystem;
    getQuery(): unknown;
    isParallel(archetypeChunkSize: number, taskCount: number): boolean;
}
export interface ItemPrePhysicsSystem {
    new (itemComponentType: unknown, boundingBoxComponentType: unknown, velocityComponentType: unknown, transformComponentType: unknown, physicsValuesComponentType: unknown): ItemPrePhysicsSystem;
    getQuery(): unknown;
    isParallel(archetypeChunkSize: number, taskCount: number): boolean;
    moveOutOfBlock(chunk: unknown, position: unknown, velocityComponent: unknown, boundingBox: unknown): void;
    applyGravity(dt: number, boundingBox: unknown, values: unknown, position: unknown, velocity: unknown): void;
}
export interface ItemRepairElement {
    new (itemStack: unknown, interaction: unknown): ItemRepairElement;
    addButton(commandBuilder: unknown, eventBuilder: unknown, selector: string, playerRef: unknown): void;
}
export interface ItemRepairPage {
    new (playerRef: unknown, itemContainer: unknown, repairPenalty: number, heldItemContext: unknown): ItemRepairPage;
    build(ref: unknown, commandBuilder: unknown, eventBuilder: unknown, store: unknown): void;
    getElements(): unknown[];
    getPageLayout(): string;
}
export interface ItemReticleConfigPacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
    generateRemovePacket(assetMap: unknown, removed: unknown): unknown;
}
export interface ItemSpatialSystem {
    new (spatialResource: unknown): ItemSpatialSystem;
    getQuery(): unknown;
    tick(dt: number, systemIndex: number, store: unknown): void;
    getPosition(archetypeChunk: unknown, index: number): unknown;
}
export interface ItemStackContainerWindow {
    new (itemStackItemContainer: unknown): ItemStackContainerWindow;
    getData(): unknown;
    onOpen0(): boolean;
    onClose0(): void;
    getItemContainer(): unknown;
}
export interface ItemSystems {
}
export interface ItemUtils {
}
export interface JumpOperation {
    getWaitForDataFrom(): unknown;
    toString(): string;
}
export interface KillFeedEvent {
}
export interface KnockbackComponent {
    getComponentType(): unknown;
    getVelocity(): unknown;
    setVelocity(velocity: unknown): void;
    getVelocityType(): unknown;
    setVelocityType(velocityType: unknown): void;
    getVelocityConfig(): unknown | null;
    setVelocityConfig(velocityConfig: unknown | null): void;
    addModifier(modifier: number): void;
    applyModifiers(): void;
    getDuration(): number;
    setDuration(duration: number): void;
    getTimer(): number;
    incrementTimer(time: number): void;
    setTimer(time: number): void;
    clone(): unknown;
}
export interface KnockbackPredictionSystems {
}
export interface KnockbackSimulation {
    new (): KnockbackSimulation;
    getTickBuffer(): number;
    setTickBuffer(tickBuffer: number): void;
    getRequestedVelocity(): Vector3d;
    addRequestedVelocity(velocity: Vector3d): void;
    setRequestedVelocity(velocity: Vector3d): void;
    getRequestedVelocityChangeType(): unknown | null;
    setRequestedVelocityChangeType(requestedVelocityChangeType: unknown): void;
    getClientLastPosition(): Vector3d;
    getClientPosition(): Vector3d;
    getRelativeMovement(): Vector3d;
    getSimPosition(): Vector3d;
    getSimVelocity(): Vector3d;
    getRemainingTime(): number;
    setRemainingTime(remainingTime: number): void;
    reset(): void;
    consumeWasJumping(): boolean;
    setWasJumping(wasJumping: boolean): void;
    hadWishMovement(): boolean;
    setHadWishMovement(hadWishMovement: boolean): void;
    isClientFinished(): boolean;
    setClientFinished(clientFinished: boolean): void;
    getJumpCombo(): number;
    setJumpCombo(jumpCombo: number): void;
    wasOnGround(): boolean;
    setWasOnGround(wasOnGround: boolean): void;
    getClientMovementStates(): unknown;
    setClientMovementStates(clientMovementStates: unknown): void;
    getMovementOffset(): Vector3d;
    getCollisionResult(): unknown;
    getCheckPosition(): Vector3d;
    getTempPosition(): Vector3d;
    clone(): unknown;
}
export interface KnockbackSystems {
}
export interface Label {
    getIndex(): number;
    toString(): string;
}
export interface LaunchPadInteraction {
}
export interface LaunchProjectileInteraction {
    getProjectileId(): string;
    getBallisticData(): unknown | null;
}
export interface LegacyEntityTrackerSystems {
}
export interface LegacyProjectileSystems {
}
export interface LivingEntityEffectClearChangesSystem {
}
export interface LivingEntityEffectSystem {
    canApplyEffect(ownerRef: unknown, entityEffect: unknown, componentAccessor: unknown): boolean;
}
export interface LivingEntityInventoryChangeEvent {
    getItemContainer(): unknown;
    getTransaction(): unknown;
    toString(): string;
}
export interface LivingEntityUseBlockEvent {
    new (ref: unknown, blockType: string): LivingEntityUseBlockEvent;
    getBlockType(): string;
    getRef(): unknown;
    toString(): string;
}
export interface LogicCondition {
    new (inverse: boolean, operator: unknown, conditions: unknown[]): LogicCondition;
    eval0(componentAccessor: unknown, ref: unknown, currentTime: unknown): boolean;
    toString(): string;
}
export interface MaterialExtraResourcesSection {
    new (): MaterialExtraResourcesSection;
    setExtraMaterials(extraMaterials: unknown[]): void;
    isValid(): boolean;
    setValid(valid: boolean): void;
    toPacket(): unknown;
    getItemContainer(): unknown;
    setItemContainer(itemContainer: unknown): void;
}
export interface MessagesUpdated {
    new (changedMessages: unknown, removedMessages: unknown): MessagesUpdated;
    getChangedMessages(): unknown;
    getRemovedMessages(): unknown;
    toString(): string;
}
export interface ModelComponent {
    new (model: unknown): ModelComponent;
    getModel(): unknown;
    consumeNetworkOutdated(): boolean;
    clone(): unknown;
}
export interface ModelOverride {
    toPacket(): unknown;
    toString(): string;
}
export interface ModelSystems {
}
export interface ModifyInventoryInteraction {
    getWaitForDataFrom(): unknown;
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
    toString(): string;
}
export interface MovementAudioComponent {
    new (): MovementAudioComponent;
    getShouldHearPredicate(ref: unknown): unknown;
    getLastInsideBlockTypeId(): number;
    setLastInsideBlockTypeId(lastInsideBlockTypeId: number): void;
    canMoveInRepeat(): boolean;
    tickMoveInRepeat(dt: number): boolean;
    setNextMoveInRepeat(nextMoveInRepeat: number): void;
    clone(): unknown;
}
export interface MovementConditionInteraction {
    getWaitForDataFrom(): unknown;
    needsRemoteSync(): boolean;
    compile(builder: unknown): void;
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
}
export interface MovementConfig {
    new (movementConfig: MovementConfig): MovementConfig;
    new (id: string): MovementConfig;
    getAssetStore(): unknown;
    getAssetMap(): unknown;
    getId(): string;
    getExtraData(): unknown;
    getVelocityResistance(): number;
    getJumpForce(): number;
    getSwimJumpForce(): number;
    getJumpBufferDuration(): number;
    getJumpBufferMaxYVelocity(): number;
    getAcceleration(): number;
    getAirDragMin(): number;
    getAirDragMax(): number;
    getAirDragMinSpeed(): number;
    getAirDragMaxSpeed(): number;
    getAirFrictionMin(): number;
    getAirFrictionMax(): number;
    getAirFrictionMinSpeed(): number;
    getAirFrictionMaxSpeed(): number;
    getAirSpeedMultiplier(): number;
    getAirControlMinSpeed(): number;
    getAirControlMaxSpeed(): number;
    getAirControlMinMultiplier(): number;
    getAirControlMaxMultiplier(): number;
    getComboAirSpeedMultiplier(): number;
    getBaseSpeed(): number;
    getClimbSpeed(): number;
    getClimbSpeedLateral(): number;
    getClimbUpSprintSpeed(): number;
    getClimbDownSprintSpeed(): number;
    getHorizontalFlySpeed(): number;
    getVerticalFlySpeed(): number;
    getMaxSpeedMultiplier(): number;
    getMinSpeedMultiplier(): number;
    getWishDirectionGravityX(): number;
    getWishDirectionGravityY(): number;
    getWishDirectionWeightX(): number;
    getWishDirectionWeightY(): number;
    getCollisionExpulsionForce(): number;
    getForwardWalkSpeedMultiplier(): number;
    getBackwardWalkSpeedMultiplier(): number;
    getStrafeWalkSpeedMultiplier(): number;
    getForwardRunSpeedMultiplier(): number;
    getBackwardRunSpeedMultiplier(): number;
    getStrafeRunSpeedMultiplier(): number;
    getForwardCrouchSpeedMultiplier(): number;
    getBackwardCrouchSpeedMultiplier(): number;
    getStrafeCrouchSpeedMultiplier(): number;
    getForwardSprintSpeedMultiplier(): number;
    getVariableJumpFallForce(): number;
    getFallEffectDuration(): number;
    getFallJumpForce(): number;
    getFallMomentumLoss(): number;
    getAutoJumpObstacleSpeedLoss(): number;
    getAutoJumpObstacleSprintSpeedLoss(): number;
    getAutoJumpObstacleEffectDuration(): number;
    getAutoJumpObstacleSprintEffectDuration(): number;
    getAutoJumpObstacleMaxAngle(): number;
    isAutoJumpDisableJumping(): boolean;
    getMinFallSpeedToEngageRoll(): number;
    getMaxFallSpeedToEngageRoll(): number;
    getFallDamagePartialMitigationPercent(): number;
    getMaxFallSpeedRollFullMitigation(): number;
    getRollStartSpeedModifier(): number;
    getRollExitSpeedModifier(): number;
    getRollTimeToComplete(): number;
    toPacket(): unknown;
    toString(): string;
}
export interface MovementManager {
    new (): MovementManager;
    new (other: MovementManager): MovementManager;
    getComponentType(): unknown;
    resetDefaultsAndUpdate(ref: unknown, componentAccessor: unknown): void;
    refreshDefaultSettings(ref: unknown, componentAccessor: unknown): void;
    applyDefaultSettings(): void;
    update(playerPacketHandler: unknown): void;
    getSettings(): unknown;
    setDefaultSettings(settings: unknown, physicsValues: unknown, gameMode: unknown): void;
    getDefaultSettings(): unknown;
    toString(): string;
    clone(): unknown;
}
export interface MovementStatesComponent {
    new (): MovementStatesComponent;
    new (other: MovementStatesComponent): MovementStatesComponent;
    getComponentType(): unknown;
    getMovementStates(): unknown;
    setMovementStates(movementStates: unknown): void;
    getSentMovementStates(): unknown;
    setSentMovementStates(sentMovementStates: unknown): void;
    clone(): unknown;
}
export interface MovementStatesSystems {
    AddSystem: unknown;
    onEntityAdd(holder: unknown, reason: unknown, store: unknown): void;
    onEntityRemoved(holder: unknown, reason: unknown, store: unknown): void;
    getQuery(): unknown;
    getGroup(): unknown;
    isParallel(): boolean;
    copyMovementStatesFrom(from: unknown, to: unknown): void;
}
export interface Nameplate {
    new (): Nameplate;
    new (text: string): Nameplate;
    getComponentType(): unknown;
    getText(): string;
    setText(text: string): void;
    consumeNetworkOutdated(): boolean;
    clone(): unknown;
}
export interface NameplateSystems {
    getQuery(): unknown;
    componentType(): unknown;
    getGroup(): unknown;
    isParallel(): boolean;
}
export interface NetworkId {
    new (id: number): NetworkId;
    getComponentType(): unknown;
    getId(): number;
    clone(): unknown;
}
export interface NetworkSendableSpatialSystem {
    new (spatialResource: unknown): NetworkSendableSpatialSystem;
    getQuery(): unknown;
    tick(dt: number, systemIndex: number, store: unknown): void;
    getPosition(archetypeChunk: unknown, index: number): unknown;
}
export interface NewSpawnComponent {
    new (newSpawnWindow: number): NewSpawnComponent;
    getComponentType(): unknown;
    newSpawnWindowPassed(dt: number): boolean;
    clone(): unknown;
}
export interface NoDamageTakenCondition {
    eval0(componentAccessor: unknown, ref: unknown, currentTime: unknown): boolean;
    toString(): string;
}
export interface OperationsBuilder {
    new (): OperationsBuilder;
    createLabel(): unknown;
    createUnresolvedLabel(): unknown;
    resolveLabel(label: unknown): void;
    jump(target: unknown): void;
    addOperation(operation: unknown): void;
    build(): unknown[];
    toString(): string;
}
export interface OutOfCombatCondition {
    eval0(componentAccessor: unknown, ref: unknown, currentTime: unknown): boolean;
    toString(): string;
}
export interface OverlapBehavior {
    EXTEND: OverlapBehavior;
    OVERWRITE: OverlapBehavior;
    IGNORE: OverlapBehavior;
    valueOf(name: string): OverlapBehavior;
    values(): OverlapBehavior[];
}
export interface PageManager {
    init(playerRef: unknown, windowManager: unknown): void;
    clearCustomPageAcknowledgements(): void;
    getCustomPage(): unknown | null;
    setPage(ref: unknown, store: unknown, page: unknown): void;
    openCustomPage(ref: unknown, store: unknown, page: unknown): void;
    updateCustomPage(page: unknown): void;
    handleEvent(ref: unknown, store: unknown, event: unknown): void;
}
export interface ParallelInteraction {
    getWaitForDataFrom(): unknown;
    walk(collector: unknown, context: unknown): boolean;
    needsRemoteSync(): boolean;
    toString(): string;
}
export interface Particle {
    new (texture: string, frameSize: unknown, uvOption: unknown, scaleRatioConstraint: unknown, softParticle: unknown, softParticlesFadeFactor: number, useSpriteBlending: boolean, initialAnimationFrame: unknown, collisionAnimationFrame: unknown, animation: unknown): Particle;
    getTexture(): string;
    getFrameSize(): unknown;
    getUvOption(): unknown;
    getScaleRatioConstraint(): unknown;
    getSoftParticle(): unknown;
    getSoftParticlesFadeFactor(): number;
    isUseSpriteBlending(): boolean;
    getInitialAnimationFrame(): unknown;
    getCollisionAnimationFrame(): unknown;
    getAnimation(): unknown;
    toPacket(): unknown;
    toString(): string;
}
export interface ParticleAnimationFrame {
    new (frameIndex: unknown, scale: unknown, rotation: unknown, color: unknown, opacity: number): ParticleAnimationFrame;
    getFrameIndex(): unknown;
    getScale(): unknown;
    getRotation(): unknown;
    getColor(): unknown;
    getOpacity(): number;
    toPacket(): unknown;
    toString(): string;
}
export interface ParticleAttractor {
    new (position: unknown, radialAxis: unknown, trailPositionMultiplier: number, radius: number, radialAcceleration: number, radialTangentAcceleration: number, linearAcceleration: unknown, radialImpulse: number, radialTangentImpulse: number, linearImpulse: unknown, dampingMultiplier: unknown): ParticleAttractor;
    getPosition(): unknown;
    getRadialAxis(): unknown;
    getTrailPositionMultiplier(): number;
    getRadius(): number;
    getRadialAcceleration(): number;
    getRadialTangentAcceleration(): number;
    getLinearAcceleration(): unknown;
    getRadialImpulse(): number;
    getRadialTangentImpulse(): number;
    getLinearImpulse(): unknown;
    getDampingMultiplier(): unknown;
    toPacket(): unknown;
    toString(): string;
}
export interface ParticleCollision {
    new (blockType: unknown, action: unknown, particleRotationInfluence: unknown): ParticleCollision;
    getParticleMapCollision(): unknown;
    getType(): unknown;
    getParticleRotationInfluence(): unknown;
    toPacket(): unknown;
    toString(): string;
}
export interface ParticleCommand {
    new (): ParticleCommand;
}
export interface ParticleSpawnCommand {
    new (): ParticleSpawnCommand;
}
export interface ParticleSpawner {
    new (id: string, particle: unknown, renderMode: unknown, shape: unknown, emitOffset: unknown, useEmitDirection: boolean, cameraOffset: number, particleRotationInfluence: unknown, particleRotateWithSpawner: boolean, isLowRes: boolean, trailSpawnerPositionMultiplier: number, trailSpawnerRotationMultiplier: number, particleCollision: unknown, lightInfluence: number, linearFiltering: boolean, totalParticles: unknown, lifeSpan: number, maxConcurrentParticles: number, particleLifeSpan: unknown, spawnRate: unknown, spawnBurst: boolean, waveDelay: unknown, initialVelocity: unknown, velocityStretchMultiplier: number, uvMotion: unknown, attractors: unknown[], intersectionHighlight: unknown): ParticleSpawner;
    getAssetStore(): unknown;
    getAssetMap(): unknown;
    toPacket(): unknown;
    getId(): string;
    getParticle(): unknown;
    getRenderMode(): unknown;
    getShape(): unknown;
    getEmitOffset(): unknown;
    getUseEmitDirection(): boolean;
    getCameraOffset(): number;
    toString(): string;
}
export interface ParticleSpawnerGroup {
    new (spawnerId: string, positionOffset: unknown, rotationOffset: unknown, fixedRotation: boolean, spawnRate: unknown, lifeSpan: unknown, startDelay: number, waveDelay: unknown, totalSpawners: number, maxConcurrent: number, initialVelocity: unknown, emitOffset: unknown, attractors: unknown[]): ParticleSpawnerGroup;
    toPacket(): unknown;
    getSpawnerId(): string;
    getPositionOffset(): unknown;
    getRotationOffset(): unknown;
    isFixedRotation(): boolean;
    getSpawnRate(): unknown;
    getLifeSpan(): unknown;
    getStartDelay(): number;
    getWaveDelay(): unknown;
    getTotalSpawners(): number;
    toString(): string;
}
export interface ParticleSpawnerPacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
    generateUpdatePacket(loadedAssets: unknown): unknown;
    generateRemovePacket(removed: unknown): unknown;
}
export interface ParticleSpawnPage {
    new (playerRef: unknown): ParticleSpawnPage;
    handleDataEvent(ref: unknown, store: unknown, data: unknown): void;
    onDismiss(ref: unknown, store: unknown): void;
}
export interface ParticleSystemPacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
    generateUpdatePacket(loadedAssets: unknown): unknown;
    generateRemovePacket(removed: unknown): unknown;
}
export interface PendingTeleport {
    getComponentType(): unknown;
    isEmpty(): boolean;
    getPosition(): unknown;
}
export interface PersistentModel {
    new (): PersistentModel;
    getComponentType(): unknown;
    getModelReference(): unknown;
    setModelReference(modelReference: unknown): void;
}
export interface PersistentRef {
    getUuid(): unknown;
    setUuid(uuid: unknown): void;
    setEntity(ref: unknown, uuid: unknown): void;
    isValid(): boolean;
    getEntity(componentAccessor: unknown): unknown;
}
export interface PersistentRefCount {
    getComponentType(): unknown;
    get(): number;
    increment(): void;
    clone(): unknown;
}
export interface PhysicsMath {
    getAcceleration(speed: number, terminalSpeed: number): number;
    getTerminalVelocity(mass: number, density: number, areaMillimetersSquared: number, dragCoefficient: number): number;
    getRelativeDensity(position: unknown, boundingBox: unknown): number;
    computeDragCoefficient(terminalSpeed: number, area: number, mass: number, gravity: number): number;
    computeTerminalSpeed(dragCoefficient: number, area: number, mass: number, gravity: number): number;
    computeProjectedArea(x: number, y: number, z: number, box: unknown): number;
    computeProjectedArea(direction: unknown, box: unknown): number;
    volumeOfIntersection(a: unknown, posA: unknown, b: unknown, posB: unknown): number;
    volumeOfIntersection(a: unknown, posA: unknown, b: unknown, posBX: number, posBY: number, posBZ: number): number;
    lengthOfIntersection(aMin: number, aMax: number, bMin: number, bMax: number): number;
    headingFromDirection(x: number, z: number): number;
    normalizeAngle(rad: number): number;
    normalizeTurnAngle(rad: number): number;
    pitchFromDirection(x: number, y: number, z: number): number;
    vectorFromAngles(heading: number, pitch: number, outDirection: unknown): unknown;
    pitchX(pitch: number): number;
    pitchY(pitch: number): number;
    headingX(heading: number): number;
    headingZ(heading: number): number;
}
export interface PickBlockInteraction {
    getWaitForDataFrom(): unknown;
    needsRemoteSync(): boolean;
    toString(): string;
}
export interface PickupItemComponent {
    new (): PickupItemComponent;
    new (targetRef: unknown, startPosition: unknown): PickupItemComponent;
    new (targetRef: unknown, startPosition: unknown, lifeTime: number): PickupItemComponent;
    new (pickupItemComponent: PickupItemComponent): PickupItemComponent;
    getComponentType(): unknown;
    hasFinished(): boolean;
    setFinished(finished: boolean): void;
    decreaseLifetime(amount: number): void;
    getLifeTime(): number;
    getOriginalLifeTime(): number;
    setInitialLifeTime(lifeTimeS: number): void;
    getStartPosition(): unknown;
    getTargetRef(): unknown;
    clone(): PickupItemComponent;
}
export interface PickupItemSystem {
    new (pickupItemComponentType: unknown, transformComponentType: unknown): PickupItemSystem;
    getQuery(): unknown;
}
export interface PlaceBlockInteraction {
    getWaitForDataFrom(): unknown;
    needsRemoteSync(): boolean;
    toString(): string;
}
export interface PlacedByInteractionComponent {
    new (): PlacedByInteractionComponent;
    new (whoPlacedUuid: unknown): PlacedByInteractionComponent;
    getComponentType(): unknown;
    getWhoPlacedUuid(): unknown;
    clone(): unknown;
}
export interface PlaceFluidInteraction {
    getFluidKey(): string | null;
    getWaitForDataFrom(): unknown;
    needsRemoteSync(): boolean;
    toString(): string;
}
export interface PlacementCountConditionInteraction {
    getWaitForDataFrom(): unknown;
}
export interface Player {
    getComponentType(): unknown;
    copyFrom(oldPlayerComponent: Player): void;
    init(uuid: unknown, playerRef: unknown): void;
    setNetworkId(id: number): void;
    setInventory(inventory: unknown): unknown;
    remove(): boolean;
    moveTo(ref: unknown, locX: number, locY: number, locZ: number, componentAccessor: unknown): void;
    getPlayerConfigData(): unknown;
    markNeedsSave(): void;
    unloadFromWorld(): void;
}
export interface PrefabCopyableComponent {
    getComponentType(): unknown;
    get(): PrefabCopyableComponent;
    clone(): unknown;
}
export interface PrefabLoadException {
    new (type: unknown): PrefabLoadException;
    new (type: unknown, message: string): PrefabLoadException;
    new (type: unknown, message: string, cause: unknown): PrefabLoadException;
    new (type: unknown, cause: unknown): PrefabLoadException;
    getType(): unknown;
}
export interface PrefabPasteEvent {
    new (prefabId: number, pasteStart: boolean): PrefabPasteEvent;
    getPrefabId(): number;
    isPasteStart(): boolean;
}
export interface PrefabPlaceEntityEvent {
    new (prefabId: number, holder: unknown): PrefabPlaceEntityEvent;
    getPrefabId(): number;
    getHolder(): unknown;
}
export interface PrefabSaveException {
    new (type: unknown): PrefabSaveException;
    new (type: unknown, message: string): PrefabSaveException;
    new (type: unknown, message: string, cause: unknown): PrefabSaveException;
    new (type: unknown, cause: unknown): PrefabSaveException;
    getType(): unknown;
}
export interface PrefabSpawnerState {
    getPrefabPath(): string;
    setPrefabPath(prefabPath: string): void;
    isFitHeightmap(): boolean;
    setFitHeightmap(fitHeightmap: boolean): void;
    isInheritSeed(): boolean;
    setInheritSeed(inheritSeed: boolean): void;
    isInheritHeightCondition(): boolean;
    setInheritHeightCondition(inheritHeightCondition: boolean): void;
    getPrefabWeights(): unknown;
    setPrefabWeights(prefabWeights: unknown): void;
}
export interface PrefabStore {
    getServerPrefab(key: string): unknown;
    getPrefab(path: unknown): unknown;
    getServerPrefabsPath(): unknown;
    getServerPrefabDir(key: string): unknown;
    getPrefabDir(dir: unknown): unknown;
    saveServerPrefab(key: string, prefab: unknown): void;
    saveWorldGenPrefab(key: string, prefab: unknown, overwrite: boolean): void;
    savePrefab(path: unknown, prefab: unknown, overwrite: boolean): void;
    getWorldGenPrefabsPath(): unknown;
    getAssetRootPath(): unknown;
}
export interface PreventItemMerging {
    getComponentType(): unknown;
    clone(): unknown;
}
export interface PreventPickup {
    getComponentType(): unknown;
    clone(): unknown;
}
export interface Projectile {
    getComponentType(): unknown;
    clone(): unknown;
}
export interface ProjectileComponent {
    new (projectileAssetName: string): ProjectileComponent;
    new (other: ProjectileComponent): ProjectileComponent;
    getComponentType(): unknown;
    initialize(): boolean;
    initializePhysics(boundingBox: unknown): void;
    onProjectileBounce(position: unknown, componentAccessor: unknown): void;
    consumeDeadTimer(dt: number): boolean;
    onProjectileDeath(ref: unknown, position: unknown, commandBuffer: unknown): void;
    shoot(holder: unknown, creatorUuid: unknown, x: number, y: number, z: number, yaw: number, pitch: number): void;
    isOnGround(): boolean;
    getProjectile(): unknown | null;
    getAppearance(): string;
    getProjectileAssetName(): string;
    getSimplePhysicsProvider(): unknown;
    applyBrokenPenalty(penalty: number): void;
    clone(): unknown;
}
export interface ProjectileConfig {
    getAssetStore(): unknown;
    getAssetMap(): unknown;
    getId(): string | null;
    getPhysicsConfig(): unknown;
    getModel(): unknown;
    getLaunchForce(): number;
    getMuzzleVelocity(): number;
    getGravity(): number;
    getVerticalCenterShot(): number;
    getDepthShot(): number;
    isPitchAdjustShot(): boolean;
    getInteractions(): unknown;
    getLaunchWorldSoundEventIndex(): number;
    getProjectileSoundEventIndex(): number;
    getSpawnOffset(): unknown;
    getSpawnRotationOffset(): unknown;
    getCalculatedOffset(pitch: number, yaw: number): unknown;
    toPacket(): unknown;
}
export interface ProjectileConfigPacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
    generateUpdatePacket(loadedAssets: unknown): unknown;
    generateRemovePacket(removed: unknown): unknown | null;
}
export interface ProjectileInteraction {
    getConfig(): unknown | null;
    getBallisticData(): unknown | null;
    getWaitForDataFrom(): unknown;
    needsRemoteSync(): boolean;
}
export interface PropComponent {
    getComponentType(): unknown;
    get(): PropComponent;
    clone(): unknown;
}
export interface RaycastSelector {
    newSelector(): unknown;
    getOffset(): unknown;
    selectTargetPosition(commandBuffer: unknown, attacker: unknown): unknown;
    toPacket(): unknown;
}
export interface RecipePacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
    generateUpdatePacket(assetMap: unknown, loadedAssets: unknown, query: unknown): unknown;
    generateRemovePacket(assetMap: unknown, removed: unknown, query: unknown): unknown;
}
export interface RefillContainerInteraction {
    toString(): string;
    getAllowedFluids(): string[];
    getTransformFluid(): string;
    getDurability(): number;
}
export interface RegeneratingModifier {
    new (conditions: unknown[], amount: number): RegeneratingModifier;
    getModifier(store: unknown, ref: unknown, currentTime: unknown): number;
    toString(): string;
}
export interface RegeneratingValue {
    new (regenerating: unknown): RegeneratingValue;
    shouldRegenerate(store: unknown, ref: unknown, currentTime: unknown, dt: number, regenerating: unknown): boolean;
    regenerate(store: unknown, ref: unknown, currentTime: unknown, dt: number, value: unknown, currentAmount: number): number;
    getRegenerating(): unknown;
    toString(): string;
}
export interface RegenHealthCondition {
    new (): RegenHealthCondition;
    new (inverse: boolean): RegenHealthCondition;
    eval0(componentAccessor: unknown, ref: unknown, currentTime: unknown): boolean;
    toString(): string;
}
export interface RemovalBehavior {
    COMPLETE: RemovalBehavior;
    INFINITE: RemovalBehavior;
    DURATION: RemovalBehavior;
}
export interface RemoveEntityInteraction {
    new (): RemoveEntityInteraction;
    firstRun(type: unknown, context: unknown, cooldownHandler: unknown): void;
    simulateFirstRun(type: unknown, context: unknown, cooldownHandler: unknown): void;
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
    toString(): string;
}
export interface RepairItemInteraction {
    new (itemContext: unknown, repairPenalty: number, heldItemContext: unknown): RepairItemInteraction;
    run(store: unknown, ref: unknown, playerRef: unknown): void;
}
export interface RepeatInteraction {
    new (): RepeatInteraction;
    getWaitForDataFrom(): unknown;
    tick0(firstRun: boolean, time: number, type: unknown, context: unknown, cooldownHandler: unknown): void;
    simulateTick0(firstRun: boolean, time: number, type: unknown, context: unknown, cooldownHandler: unknown): void;
    walk(collector: unknown, context: unknown): boolean;
    needsRemoteSync(): boolean;
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
    toString(): string;
}
export interface ReplaceInteraction {
    new (): ReplaceInteraction;
    getWaitForDataFrom(): unknown;
    tick0(firstRun: boolean, time: number, type: unknown, context: unknown, cooldownHandler: unknown): void;
    simulateTick0(firstRun: boolean, time: number, type: unknown, context: unknown, cooldownHandler: unknown): void;
    needsRemoteSync(): boolean;
    walk(collector: unknown, context: unknown): boolean;
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
    toString(): string;
}
export interface Repulsion {
    new (repulsionConfig: RepulsionConfig): Repulsion;
    getComponentType(): unknown;
    getRepulsionConfigIndex(): number;
    setRepulsionConfigIndex(repulsionConfigIndex: number): void;
    consumeNetworkOutdated(): boolean;
    clone(): unknown;
}
export interface RepulsionConfig {
    new (): RepulsionConfig;
    new (id: string): RepulsionConfig;
    new (repulsion: RepulsionConfig): RepulsionConfig;
    new (radius: number, maxForce: number): RepulsionConfig;
    new (radius: number, minForce: number, maxForce: number): RepulsionConfig;
    getAssetStore(): unknown;
    getAssetMap(): unknown;
    getId(): string;
    toPacket(): unknown;
    toString(): string;
}
export interface RepulsionConfigPacketGenerator {
    new (): RepulsionConfigPacketGenerator;
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
    generateUpdatePacket(assetMap: unknown, loadedAssets: unknown, query: unknown): unknown;
    generateRemovePacket(assetMap: unknown, removed: unknown, query: unknown): unknown;
}
export interface RepulsionSystems {
    new (): RepulsionSystems;
}
export interface RespawnPage {
    new (playerRef: unknown, deathReason: unknown, displayDataOnDeathScreen: boolean, deathItemLoss: unknown): RespawnPage;
    handleDataEvent(ref: unknown, store: unknown, data: unknown): void;
    onDismiss(ref: unknown, store: unknown): void;
}
export interface RespawnSystems {
    new (): RespawnSystems;
}
export interface RespondToHit {
    getComponentType(): unknown;
    clone(): unknown;
}
export interface RespondToHitSystems {
    new (): RespondToHitSystems;
}
export interface RotateObjectComponent {
    new (): RotateObjectComponent;
    new (rotationSpeed: number): RotateObjectComponent;
    getComponentType(): unknown;
    clone(): unknown;
    setRotationSpeed(rotationSpeed: number): void;
    getRotationSpeed(): number;
}
export interface RotateObjectSystem {
    new (transformComponentType: unknown, rotateObjectComponentType: unknown): RotateObjectSystem;
    getQuery(): unknown;
}
export interface SelectInteraction {
    new (): SelectInteraction;
    getWaitForDataFrom(): unknown;
    needsRemoteSync(): boolean;
    mapForkChain(context: unknown, data: unknown): unknown;
    toString(): string;
}
export interface SelectionManager {
    setSelectionProvider(provider: unknown): void;
    getSelectionProvider(): unknown;
}
export interface SerialInteraction {
    new (): SerialInteraction;
    walk(collector: unknown, context: unknown): boolean;
    compile(builder: unknown): void;
    needsRemoteSync(): boolean;
    getWaitForDataFrom(): unknown;
}
export interface ServerPlayerListModule {
    new (init: unknown): ServerPlayerListModule;
    get(): ServerPlayerListModule;
}
export interface SingleplayerRequestAccessEvent {
    new (access: unknown): SingleplayerRequestAccessEvent;
    getAccess(): unknown;
    toString(): string;
}
export interface SnapshotBuffer {
    getComponentType(): unknown;
    getSnapshotClamped(tickIndex: number): unknown;
    getSnapshot(tickIndex: number): unknown | null;
    storeSnapshot(tickIndex: number, position: unknown, bodyRotation: unknown): void;
    resize(newLength: number): void;
    isInitialized(): boolean;
    getCurrentTickIndex(): number;
    getOldestTickIndex(): number;
    clone(): unknown;
}
export interface SnapshotSystems {
    new (): SnapshotSystems;
}
export interface SprintingCondition {
    new (): SprintingCondition;
    new (inverse: boolean): SprintingCondition;
    eval0(componentAccessor: unknown, ref: unknown, currentTime: unknown): boolean;
    toString(): string;
}
export interface SprintStaminaRegenDelay {
    new (): SprintStaminaRegenDelay;
    new (other: SprintStaminaRegenDelay): SprintStaminaRegenDelay;
    getResourceType(): unknown;
    getIndex(): number;
    getValue(): number;
    validate(): boolean;
    hasDelay(): boolean;
    markEmpty(): void;
    update(statIndex: number, statValue: number): void;
    clone(): unknown;
    toString(): string;
    invalidateResources(): void;
}
export interface StabSelector {
    new (): StabSelector;
    newSelector(): unknown;
    toPacket(): unknown;
    tick(commandBuffer: unknown, attacker: unknown, time: number, runTime: number): void;
    selectTargetBlocks(commandBuffer: unknown, attacker: unknown, consumer: unknown): void;
}
export interface StaminaGameplayConfig {
    getSprintRegenDelay(): unknown;
    toString(): string;
    getIndex(): number;
    getValue(): number;
}
export interface StaminaModule {
    new (init: unknown): StaminaModule;
    getSprintRegenDelayResourceType(): unknown;
    get(): StaminaModule;
}
export interface StaminaSystems {
    new (): StaminaSystems;
}
export interface StandardPhysicsConfig {
    new (): StandardPhysicsConfig;
    getGravity(): number;
    apply(holder: unknown, creatorRef: unknown, velocity: Vector3d, componentAccessor: unknown, predicted: boolean): void;
    toPacket(): unknown;
    getBounciness(): number;
    getBounceCount(): number;
    getBounceLimit(): number;
    isSticksVertically(): boolean;
    isAllowRolling(): boolean;
    getRollingFrictionFactor(): number;
    getSwimmingDampingFactor(): number;
    getHitWaterImpulseLoss(): number;
}
export interface StandardPhysicsTickSystem {
    new (): StandardPhysicsTickSystem;
    getDependencies(): unknown;
    getQuery(): unknown;
    tick(dt: number, index: number, archetypeChunk: unknown, store: unknown, commandBuffer: unknown): void;
}
export interface StatCondition {
    new (): StatCondition;
    new (inverse: boolean, stat: number, amount: number): StatCondition;
    eval0(ref: unknown, currentTime: unknown, statValue: unknown): boolean;
    toString(): string;
}
export interface StaticModifier {
    new (): StaticModifier;
    new (target: unknown, calculationType: unknown, amount: number): StaticModifier;
    getCalculationType(): unknown;
    getAmount(): number;
    apply(statValue: number): number;
    toPacket(): unknown;
    equals(o: unknown): boolean;
    hashCode(): number;
    toString(): string;
}
export interface StatModifiersManager {
    new (): StatModifiersManager;
    setRecalculate(value: boolean): void;
    queueEntityStatsToClear(entityStatsToClear: number[]): void;
    recalculateEntityStatModifiers(ref: unknown, statMap: unknown, componentAccessor: unknown): void;
}
export interface StatModifyingSystem {
}
export interface StringTag {
    getTag(): string;
    equals(o: unknown): boolean;
    hashCode(): number;
    toString(): string;
}
export interface SuffocatingCondition {
    new (): SuffocatingCondition;
    new (inverse: boolean): SuffocatingCondition;
    eval0(componentAccessor: unknown, ref: unknown, currentTime: unknown): boolean;
    toString(): string;
}
export interface TangiableEntitySpatialSystem {
    new (resourceType: unknown): TangiableEntitySpatialSystem;
    getQuery(): unknown;
    tick(dt: number, systemIndex: number, store: unknown): void;
    getPosition(archetypeChunk: unknown, index: number): Vector3d;
}
export interface TargetEntityEffect {
    new (duration: number, chance: number, entityTypeDurationModifiers: unknown, overlapBehavior: unknown): TargetEntityEffect;
    getDuration(): number;
    getChance(): number;
    getEntityTypeDurationModifiers(): unknown;
    getOverlapBehavior(): unknown;
    toString(): string;
}
export interface Teleport {
    new (world: unknown | null, transform: Transform): Teleport;
    new (world: unknown | null, position: Vector3d, rotation: Vector3f): Teleport;
    new (transform: Transform): Teleport;
    new (position: Vector3d, rotation: Vector3f): Teleport;
    getComponentType(): unknown;
    withHeadRotation(headRotation: Vector3f): Teleport;
    withResetRoll(): Teleport;
    withoutVelocityReset(): Teleport;
    getWorld(): unknown | null;
    getPosition(): Vector3d;
    getRotation(): Vector3f;
    getHeadRotation(): Vector3f | null;
    isResetVelocity(): boolean;
    clone(): Teleport;
}
export interface TeleportSystems {
}
export interface TimeModule {
    new (init: unknown): TimeModule;
    get(): TimeModule;
    getWorldTimeResourceType(): unknown;
    getTimeResourceType(): unknown;
}
export interface TrackedPlacement {
    new (): TrackedPlacement;
    new (blockName: string): TrackedPlacement;
    getComponentType(): unknown;
    clone(): unknown | null;
    getQuery(): unknown;
}
export interface TransformSystems {
}
export interface UIComponentList {
    new (): UIComponentList;
    new (other: UIComponentList): UIComponentList;
    getComponentType(): unknown;
    update(): void;
    getComponentIds(): number[];
    clone(): unknown;
}
export interface UIComponentSystems {
}
export interface UnarmedInteractions {
    getAssetMap(): unknown;
    getId(): string;
    getInteractions(): unknown;
    toString(): string;
}
export interface UnarmedInteractionsPacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
    generateUpdatePacket(loadedAssets: unknown): unknown;
    generateRemovePacket(removed: unknown): unknown;
}
export interface UniqueItemUsagesComponent {
    getComponentType(): unknown;
    clone(): unknown;
    hasUsedUniqueItem(itemId: string): boolean;
    recordUniqueItemUsage(itemId: string): void;
}
export interface UpdateEntitySeedSystem {
    new (): UpdateEntitySeedSystem;
    delayedTick(dt: number, systemIndex: number, store: unknown): void;
}
export interface UpdateLocationSystems {
}
export interface UseEntityInteraction {
    getWaitForDataFrom(): unknown;
    needsRemoteSync(): boolean;
    toString(): string;
}
export interface UUIDComponent {
    new (uuid: unknown): UUIDComponent;
    getComponentType(): unknown;
    getUuid(): unknown;
    clone(): unknown;
    generateVersion3UUID(): UUIDComponent;
    randomUUID(): UUIDComponent;
}
export interface VelocityConfig {
    getGroundResistance(): number;
    getAirResistance(): number;
    getGroundResistanceMax(): number;
    getAirResistanceMax(): number;
    getThreshold(): number;
    getStyle(): unknown;
    toPacket(): unknown;
}
export interface VelocitySystems {
}
export interface WieldingCondition {
    new (): WieldingCondition;
    new (inverse: boolean): WieldingCondition;
    eval0(componentAccessor: unknown, ref: unknown, currentTime: unknown): boolean;
    toString(): string;
}
export interface WieldingInteraction {
    getKnockbackModifiers(): unknown;
    getDamageModifiers(): unknown;
    getAngledWielding(): unknown;
    getBlockedEffects(): unknown;
    getStaminaCost(): unknown;
    getBlockedInteractions(): string;
    handle(ref: unknown, firstRun: boolean, time: number, type: unknown, context: unknown): void;
    toString(): string;
    getAngleRad(): number;
    getAngleDistanceRad(): number;
}
export interface WindowManager {
    init(playerRef: unknown): void;
    clientOpenWindow(window: unknown): unknown | null;
    openWindow(window: unknown): unknown | null;
    openWindows(...windows: unknown[]): unknown[] | null;
    setWindow(id: number, window: unknown): void;
    getWindow(id: number): unknown | null;
    getWindows(): unknown[];
    updateWindow(window: unknown): void;
    closeWindow(id: number): unknown;
    closeAllWindows(): void;
}
export interface WorldGenId {
    new (worldGenId: number): WorldGenId;
    getWorldGenId(): number;
    clone(): WorldGenId;
}
export interface WorldParticle {
    new (systemId: string, color: unknown, scale: number, positionOffset: unknown, rotationOffset: unknown): WorldParticle;
    getSystemId(): string;
    getColor(): unknown;
    getScale(): number;
    getPositionOffset(): unknown;
    getRotationOffset(): unknown;
    toPacket(): unknown;
    toString(): string;
}
export interface WorldTimeResource {
    tick(dt: number, store: unknown): void;
    getMoonPhase(): number;
    setMoonPhase(moonPhase: number, componentAccessor: unknown): void;
    updateMoonPhase(world: unknown, componentAccessor: unknown): void;
    isMoonPhaseWithinRange(world: unknown, minMoonPhase: number, maxMoonPhase: number): boolean;
    getGameTime(): unknown;
    getGameDateTime(): unknown;
    getSunlightFactor(): number;
    setGameTime(gameTime: unknown, world: unknown, store: unknown): void;
    setDayTime(dayTime: number, world: unknown, store: unknown): void;
    broadcastTimePacket(store: unknown): void;
    sendTimePackets(playerRef: unknown): void;
    isDayTimeWithinRange(minTime: number, maxTime: number): boolean;
    updateTimePacket(currentTimePacket: unknown): void;
    isScaledDayTimeWithinRange(minTime: number, maxTime: number): boolean;
    isYearWithinRange(minTime: number, maxTime: number): boolean;
    getCurrentHour(): number;
    getDayProgress(): number;
    getSunDirection(): unknown;
    clone(): WorldTimeResource;
    toString(): string;
}
export interface WorldTimeSystems {
}
export interface WorldUtil {
    isFluidOnlyBlock(blockType: unknown, fluidId: number): boolean;
    isSolidOnlyBlock(blockType: unknown, fluidId: number): boolean;
    isEmptyOnlyBlock(blockType: unknown, fluidId: number): boolean;
    getFluidIdAtPosition(chunkStore: unknown, chunkColumnComponent: unknown, x: number, y: number, z: number): number;
    getPackedMaterialAndFluidAtPosition(chunkRef: unknown, chunkStore: unknown, x: number, y: number, z: number): number;
    findFluidBlock(chunkStore: unknown, chunkColumnComponent: unknown, blockChunkComponent: unknown, x: number, y: number, z: number, allowBubble: boolean): number;
    getWaterLevel(chunkStore: unknown, chunkColumnComponent: unknown, blockChunkComponent: unknown, x: number, z: number, startY: number): number;
    findFarthestEmptySpaceBelow(chunkStore: unknown, chunkColumnComponent: unknown, blockChunkComponent: unknown, x: number, y: number, z: number, yFail: number): number;
    findFarthestEmptySpaceAbove(chunkStore: unknown, chunkColumnComponent: unknown, blockChunkComponent: unknown, x: number, y: number, z: number, yFail: number): number;
}
export interface AccessControlModule {
    registerBanParser(type: string, banParser: unknown): void;
    registerAccessProvider(provider: unknown): void;
    parseBan(type: string, object: unknown): unknown;
}
export interface BlockCounter {
    new (): BlockCounter;
    new (blockPlacementCounts: unknown): BlockCounter;
    trackBlock(blockName: string): void;
    untrackBlock(blockName: string): void;
    getBlockPlacementCount(blockName: string): number;
    clone(): BlockCounter;
}
export interface BlockFilter {
    new (blockFilterType: unknown, blocks: string[], inverted: boolean): BlockFilter;
    resolve(): void;
    getBlockFilterType(): unknown;
    getBlocks(): string[];
    isInverted(): boolean;
    isExcluded(accessor: unknown, x: number, y: number, z: number, min: unknown, max: unknown, blockId: number): boolean;
    toString(): string;
    informativeToString(): string;
}
export interface BlockHealth {
    new (): BlockHealth;
    new (health: number, lastDamageGameTime: unknown): BlockHealth;
    getHealth(): number;
    setHealth(health: number): void;
    getLastDamageGameTime(): unknown;
    setLastDamageGameTime(lastDamageGameTime: unknown): void;
    isDestroyed(): boolean;
    isFullHealth(): boolean;
    deserialize(buf: unknown, version: number): void;
    serialize(buf: unknown): void;
    clone(): BlockHealth;
    toString(): string;
}
export interface BlockHealthModule {
    getBlockHealthChunkComponentType(): unknown;
}
export interface BlockMask {
    new (filters: unknown[]): BlockMask;
    withOptions(filterType: unknown, inverted: boolean): BlockMask;
    getFilters(): unknown[];
    setInverted(inverted: boolean): void;
    isInverted(): boolean;
    isExcluded(accessor: unknown, x: number, y: number, z: number, min: unknown, max: unknown, blockId: number, fluidId?: number): boolean;
    toString(): string;
    informativeToString(): string;
    parse(masks: string | string[]): BlockMask;
    combine(...masks: (BlockMask | null)[]): BlockMask;
}
export interface BlockModule {
    new (): BlockModule;
    get(): BlockModule;
    ensureBlockEntity(chunk: unknown, x: number, y: number, z: number): unknown;
    getMigrationSystemType(): unknown;
    getBlockStateInfoComponentType(): unknown;
    getLaunchPadComponentType(): unknown;
    getRespawnBlockComponentType(): unknown;
    getBlockMapMarkerComponentType(): unknown;
    getBlockMapMarkersResourceType(): unknown;
    getBlockStateInfoNeedRebuildResourceType(): unknown;
    getBlockEntity(world: unknown, x: number, y: number, z: number): unknown | null;
}
export interface BlockPattern {
    new (weightedMap: unknown): BlockPattern;
    getResolvedKeys(): number[];
    resolve(): void;
    isEmpty(): boolean;
    nextBlock(random: unknown): number;
    nextBlockTypeKey(random: unknown): unknown | null;
    firstBlock(): number;
    toString(): string;
    parse(str: string): BlockPattern;
    parseBlock(blockText: string): number;
    tryParseBlockTypeKey(blockText: string): unknown | null;
}
export interface BlockSetLookupTable {
    new (blockTypeMap: unknown): BlockSetLookupTable;
    addAll(result: unknown): void;
    getBlockNameIdMap(): unknown;
    getGroupNameIdMap(): unknown;
    getHitboxNameIdMap(): unknown;
    getCategoryIdMap(): unknown;
    isEmpty(): boolean;
}
export interface BlockTracker {
    new (): BlockTracker;
    getPosition(index: number): unknown;
    getCount(): number;
    reset(): void;
    track(x: number, y: number, z: number): boolean;
    trackNew(x: number, y: number, z: number): void;
    isTracked(x: number, y: number, z: number): boolean;
    untrack(x: number, y: number, z: number): void;
    getIndex(x: number, y: number, z: number): number;
}
export interface BoxBlockIntersectionEvaluator {
    new (): BoxBlockIntersectionEvaluator;
    setCollisionData(data: unknown, collisionConfig: unknown, hitboxIndex: number): void;
    getWorldUp(): unknown;
    setWorldUp(worldUp: unknown): void;
    setBox(box: unknown): BoxBlockIntersectionEvaluator;
    expandBox(radius: number): BoxBlockIntersectionEvaluator;
    setPosition(pos: unknown): BoxBlockIntersectionEvaluator;
    offsetPosition(offset: unknown): BoxBlockIntersectionEvaluator;
    setStartEnd(start: number, end: number): BoxBlockIntersectionEvaluator;
    intersectBox(otherBox: unknown, x: number, y: number, z: number): number;
    intersectBoxComputeTouch(otherBox: unknown, x: number, y: number, z: number): number;
}
export interface ChangeActiveSlotInteraction {
    new (): ChangeActiveSlotInteraction;
    getWaitForDataFrom(): unknown;
    walk(collector: unknown, context: unknown): boolean;
    needsRemoteSync(): boolean;
    toString(): string;
}
export interface CollisionDataArray<T> {
    new (supplier: () => T, dispose: (value: T) => void, freeList: T[]): CollisionDataArray<T>;
    getCount(): number;
    alloc(): T;
    reset(): void;
    getFirst(): T | null;
    forgetFirst(): T | null;
    isEmpty(): boolean;
    sort(comparator: (a: T, b: T) => number): void;
    remove(l: number): void;
    size(): number;
    get(i: number): T;
}
export interface CollisionMath {
    new (): CollisionMath;
    intersectRayAABB(pos: unknown, ray: unknown, x: number, y: number, z: number, box: unknown, minMax: unknown): boolean;
    intersectRayAABB(pos: unknown, ray: unknown, x: number, y: number, z: number, box: unknown): number;
    intersect1D(p: number, s: number, min: number, max: number, minMax: unknown): boolean;
    isDisjoint(code: number): boolean;
    isOverlapping(code: number): boolean;
    isTouching(code: number): boolean;
    intersectAABBs(p: unknown, bbP: unknown, q: unknown, bbQ: unknown): number;
    intersectAABBs(px: number, py: number, pz: number, bbP: unknown, qx: number, qy: number, qz: number, bbQ: unknown): number;
}
export interface CollisionModule {
    new (): CollisionModule;
    get(): CollisionModule;
    getConfig(): unknown;
    getTangiableEntitySpatialComponent(): unknown;
    validatePosition(world: unknown, collider: unknown, pos: unknown, result: unknown): number;
    isBelowMovementThreshold(v: unknown): boolean;
}
export interface CollisionResult {
    new (): CollisionResult;
    new (enableSlides: boolean, enableCharacters: boolean): CollisionResult;
    getConfig(): unknown;
    getCollisionEntities(): unknown[];
    setCollisionEntities(collisionEntities: unknown[]): void;
    getBoxBlockIntersection(): unknown;
    getMovingBoxBoxCollision(): unknown;
    allocCharacterCollision(): unknown;
    addCollision(blockCollisionEvaluator: unknown, index: number): void;
    newCollision(): unknown;
    addSlide(blockCollisionEvaluator: unknown, index: number): void;
    newSlide(): unknown;
    addTrigger(blockCollisionEvaluator: unknown, index: number): void;
    newTrigger(): unknown;
    reset(): void;
    process(): void;
    getBlockCollisionCount(): number;
    getBlockCollision(i: number): unknown;
    getFirstBlockCollision(): unknown | null;
    forgetFirstBlockCollision(): unknown | null;
    getCharacterCollisionCount(): number;
    getFirstCharacterCollision(): unknown | null;
    forgetFirstCharacterCollision(): unknown | null;
    pruneTriggerBlocks(distance: number): void;
    getTriggerBlocks(): unknown;
    defaultTriggerBlocksProcessing(manager: unknown, entity: unknown, ref: unknown, executeTriggers: boolean, componentAccessor: unknown): number;
    next(): boolean;
    accept(x: number, y: number, z: number): boolean;
    iterateBlocks(collider: unknown, pos: unknown, direction: unknown, length: number, stopOnCollisionFound: boolean): void;
    acquireCollisionModule(): void;
    disableSlides(): void;
    enableSlides(): void;
    disableCharacterCollisions(): void;
    enableCharacterCollsions(): void;
    isCheckingForCharacterCollisions(): boolean;
    enableTriggerBlocks(): void;
    disableTriggerBlocks(): void;
    isCheckingTriggerBlocks(): boolean;
    enableDamageBlocks(): void;
    disableDamageBlocks(): void;
    isCheckingDamageBlocks(): boolean;
    setDamageBlocking(blocking: boolean): boolean;
    isDamageBlocking(): boolean;
    setCollisionByMaterial(collidingMaterials: number): void;
    setCollisionByMaterial(collidingMaterials: number, walkableMaterials: number): void;
    getCollisionByMaterial(): number;
    setDefaultCollisionBehaviour(): void;
    setDefaultBlockCollisionPredicate(): void;
    setDefaultNonWalkablePredicate(): void;
    setNonWalkablePredicate(classifier: unknown): void;
    setWalkableByMaterial(walkableMaterial: number): void;
    setDefaultWalkableBehaviour(): void;
    setDefaultPlayerSettings(): void;
    isComputeOverlaps(): boolean;
    setComputeOverlaps(computeOverlaps: boolean): void;
    getLogger(): unknown;
    shouldLog(): boolean;
    setLogger(logger: unknown): void;
}
export interface CollisionTracker {
    new (): CollisionTracker;
    getBlockData(index: number): unknown;
    getContactData(index: number): unknown;
    reset(): void;
    track(x: number, y: number, z: number, contactData: unknown, blockData: unknown): boolean;
    trackNew(x: number, y: number, z: number, contactData: unknown, blockData: unknown): unknown;
    untrack(index: number): void;
    getContactData(x: number, y: number, z: number): unknown | null;
}
export interface CosmeticRegistry {
    new (pack: unknown): CosmeticRegistry;
    getEmotes(): JavaMap<string, unknown>;
    getEyeColors(): JavaMap<string, unknown>;
    getGradientSets(): JavaMap<string, unknown>;
    getBodyCharacteristics(): JavaMap<string, unknown>;
    getUnderwear(): JavaMap<string, unknown>;
    getEyebrows(): JavaMap<string, unknown>;
    getEars(): JavaMap<string, unknown>;
    getEyes(): JavaMap<string, unknown>;
    getFaces(): JavaMap<string, unknown>;
    getMouths(): JavaMap<string, unknown>;
    getFacialHairs(): JavaMap<string, unknown>;
    getPants(): JavaMap<string, unknown>;
    getOverpants(): JavaMap<string, unknown>;
    getUndertops(): JavaMap<string, unknown>;
    getOvertops(): JavaMap<string, unknown>;
    getHaircuts(): JavaMap<string, unknown>;
    getShoes(): JavaMap<string, unknown>;
    getHeadAccessories(): JavaMap<string, unknown>;
    getFaceAccessories(): JavaMap<string, unknown>;
    getEarAccessories(): JavaMap<string, unknown>;
    getGloves(): JavaMap<string, unknown>;
    getSkinFeatures(): JavaMap<string, unknown>;
    getCapes(): JavaMap<string, unknown>;
    getByType(type: unknown): JavaMap<string, unknown>;
}
export interface CosmeticsModule {
    new (init: unknown): CosmeticsModule;
    get(): CosmeticsModule;
    getRegistry(): CosmeticRegistry;
    createRandomModel(random: unknown): unknown | null;
    createModel(skin: unknown): unknown | null;
    createModel(skin: unknown, scale: number): unknown | null;
    validateSkin(skin: unknown): void;
    generateRandomSkin(random: unknown): unknown;
}
export interface ForceProviderStandardState {
    new (): ForceProviderStandardState;
    displacedMass: number;
    dragCoefficient: number;
    gravity: number;
    nextTickVelocity: Vector3d;
    externalVelocity: Vector3d;
    externalAcceleration: Vector3d;
    externalForce: Vector3d;
    externalImpulse: Vector3d;
    convertToForces(dt: number, mass: number): void;
    updateVelocity(velocity: Vector3d): void;
    clear(): void;
}
export interface FragileBlock {
    new (): FragileBlock;
    new (durationSeconds: number): FragileBlock;
    getDurationSeconds(): number;
    setDurationSeconds(durationSeconds: number): void;
    deserialize(buf: unknown, version: number): void;
    serialize(buf: unknown): void;
    clone(): FragileBlock;
    toString(): string;
}
export interface HytaleWhitelistProvider {
    new (): HytaleWhitelistProvider;
    getDisconnectReason(uuid: unknown): unknown;
    setEnabled(isEnabled: boolean): void;
    modify(consumer: unknown): boolean;
    getList(): JavaSet<unknown>;
    isEnabled(): boolean;
}
export interface I18nModule {
    new (parent: unknown): I18nModule;
    get(): I18nModule;
    getUpdatePacketsForChanges(languageKey: string, changed: JavaMap<string, JavaMap<string, string>>, removed: JavaMap<string, JavaMap<string, string>>): unknown[];
    getMessages(language: string): JavaMap<string, string>;
    getMessages(languageMap: JavaMap<string, JavaMap<string, string>>, language: string | null): JavaMap<string, string>;
    sendTranslations(packetHandler: unknown, language: string): void;
    getMessage(language: string, key: string): string | null;
}
export interface InfiniteBan {
    new (target: unknown, by: unknown, timestamp: unknown, reason: string | null): InfiniteBan;
    fromJsonObject(object: unknown): InfiniteBan;
    isInEffect(): boolean;
    getType(): string;
    getDisconnectReason(uuid: unknown): unknown;
}
export interface InteractionModule {
    new (init: unknown): InteractionModule;
    get(): InteractionModule;
    doMouseInteraction(ref: unknown, componentAccessor: unknown, packet: unknown, playerComponent: unknown, playerRefComponent: unknown): void;
    getChainingDataComponent(): unknown;
    getInteractionsComponentType(): unknown;
    getInteractionManagerComponent(): unknown;
    getPlacedByComponentType(): unknown;
    getBlockCounterResourceType(): unknown;
    getTrackedPlacementComponentType(): unknown;
}
export interface PrefabRotation {
    values(): PrefabRotation[];
    fromRotation(rotation: unknown): PrefabRotation;
    valueOfExtended(s: string): PrefabRotation;
    add(other: PrefabRotation): PrefabRotation;
    rotate(v: Vector3d): void;
    rotate(v: Vector3i): void;
    rotate(v: unknown): void;
    getX(x: number, z: number): number;
    getZ(x: number, z: number): number;
    getYaw(): number;
    getRotation(rotation: number): number;
    getFiller(filler: number): number;
}
export interface PrefabWeights {
    new (): PrefabWeights;
    size(): number;
    get<T>(elements: T[], nameFunc: unknown, random: unknown): T | null;
    get<T>(elements: T[], nameFunc: unknown, value: number): T | null;
    getWeight(prefab: string): number;
    setWeight(prefab: string, weight: number): void;
    removeWeight(prefab: string): void;
    getDefaultWeight(): number;
    setDefaultWeight(defaultWeight: number): void;
    getMappingString(): string;
    toString(): string;
    parse(mappingString: string): PrefabWeights;
    entrySet(): unknown;
}
export interface ProjectileModule {
    new (init: unknown): ProjectileModule;
    get(): ProjectileModule;
    spawnProjectile(creatorRef: unknown, commandBuffer: unknown, config: unknown, position: Vector3d, direction: Vector3d): unknown;
    spawnProjectile(predictionId: string | null, creatorRef: unknown, commandBuffer: unknown, config: unknown, position: Vector3d, direction: Vector3d): unknown;
    getProjectileComponentType(): unknown;
    getStandardPhysicsProviderComponentType(): unknown;
    getPredictedProjectileComponentType(): unknown;
}
export interface RootInteraction {
    new (): RootInteraction;
    new (id: string, ...interactionIds: string[]): RootInteraction;
    new (id: string, cooldown: unknown | null, ...interactionIds: string[]): RootInteraction;
    getAssetStore(): unknown;
    getAssetMap(): unknown;
    getId(): string;
    needsRemoteSync(): boolean;
    resetCooldownOnStart(): boolean;
    getOperation(index: number): unknown | null;
    getOperationMax(): number;
    getInteractionIds(): string[];
    getSettings(): unknown;
    getClickQueuingTimeout(): number;
    getRules(): unknown;
    getCooldown(): unknown | null;
    getData(): unknown;
    build(modifiedInteractions: unknown): void;
    build(): void;
    toPacket(): unknown;
    getRootInteractionOrUnknown(id: string): RootInteraction | null;
    getRootInteractionIdOrUnknown(id: string | null): number;
    toString(): string;
}
export interface SimpleInteraction {
    new (): SimpleInteraction;
    new (id: string): SimpleInteraction;
    getWaitForDataFrom(): unknown;
    compile(builder: unknown): void;
    walk(collector: unknown, context: unknown): boolean;
    needsRemoteSync(): boolean;
    toString(): string;
}
export interface SimplePhysicsProvider {
    new (): SimplePhysicsProvider;
    new (bounceConsumer: unknown, impactConsumer: unknown): SimplePhysicsProvider;
    setImpacted(impacted: boolean): void;
    isImpacted(): boolean;
    setResting(resting: boolean): void;
    isResting(): boolean;
    onCollisionDamage(contactData: unknown, contactIndex: number): void;
    onCollisionSliceFinished(time: number, accessor: unknown): void;
    onCollisionFinished(time: number, accessor: unknown): void;
    isOnGround(): boolean;
    isSwimming(): boolean;
    computeReflectedVector(velocity: Vector3d, normal: Vector3d): Vector3d;
}
export interface SingleCollector<T> {
    new (func: unknown): SingleCollector<T>;
    getResult(): T | null;
    start(): void;
    into(context: unknown, interaction: unknown): void;
    collect(tag: unknown, context: unknown, interaction: unknown): boolean;
    outof(): void;
    finished(): void;
}
export interface SingleplayerModule {
    new (init: unknown): SingleplayerModule;
    get(): SingleplayerModule;
    getAccess(): unknown;
    getRequestedAccess(): unknown;
    requestServerAccess(access: unknown): void;
    setPublicAddresses(publicAddresses: unknown[]): void;
    updateAccess(access: unknown): void;
    checkClientPid(): void;
    getUuid(): string;
    getUsername(): string;
    isOwner(player: unknown): boolean;
    isOwner(playerAuth: unknown, playerUuid: string): boolean;
}
export interface StandardPhysicsProvider {
    new (creatorUuid: string | null, physicsConfig: unknown): StandardPhysicsProvider;
    getComponentType(): unknown;
    onCollisionDamage(contactData: unknown, contactIndex: number): void;
    onCollisionSliceFinished(time: number, accessor: unknown): void;
    onCollisionFinished(time: number, accessor: unknown): void;
    finishTick(accessor: unknown): void;
    rotateBody(bodyYaw: number, bodyPitch: number): void;
    isOnGround(): boolean;
    isSwimming(): boolean;
    getDragCoefficient(fluidMaterial: unknown): number;
    getState(): unknown;
}
export interface TimeCommand {
    new (): TimeCommand;
    execute(context: unknown, world: unknown, store: unknown): void;
}
export interface JavaClass<T> {
    new (...args: unknown[]): T;
    class: unknown;
}
export interface JavaByteClass {
    valueOf(value: number): number;
}
export interface JavaInterop {
    type(className: "java.lang.Byte"): JavaByteClass;
    type<T = unknown>(className: string): JavaClass<T>;
}
export interface Interactions {
    new (): Interactions;
    new (interactions: JavaMap<unknown, string>): Interactions;
    getComponentType(): unknown;
    getInteractionId(type: unknown): string | null;
    setInteractionId(type: unknown, interactionId: string): void;
    getInteractions(): JavaMap<unknown, string>;
    getInteractionHint(): string | null;
    setInteractionHint(interactionHint: string | null): void;
    clone(): unknown;
    consumeNetworkOutdated(): boolean;
}
export interface ItemModule {
    new (init: unknown): ItemModule;
    get(): ItemModule;
    getFlatItemCategoryList(): JavaList<string>;
    getRandomItemDrops(dropListId: string | null): JavaList<unknown>;
    exists(key: string): boolean;
}
export interface LegacyModule {
    new (init: unknown): LegacyModule;
    get(): LegacyModule;
    getWorldChunkComponentType(): unknown;
    getBlockChunkComponentType(): unknown;
    getEntityChunkComponentType(): unknown;
    getBlockComponentChunkComponentType(): unknown;
    getEnvironmentChunkComponentType(): unknown;
    getChunkColumnComponentType(): unknown;
    getChunkSectionComponentType(): unknown;
    getBlockSectionComponentType(): unknown;
    getFluidSectionComponentType(): unknown;
    getBlockPositionProviderComponentType(): unknown;
}
export interface ListCollector<T> {
    new (func: unknown): ListCollector<T>;
    getList(): JavaList<T>;
    start(): void;
    into(context: unknown, interaction: unknown): void;
    collect(tag: unknown, context: unknown, interaction: unknown): boolean;
    outof(): void;
    finished(): void;
}
export interface MigrationModule {
    new (init: unknown): MigrationModule;
    get(): MigrationModule;
    getChunkColumnMigrationSystem(): unknown;
    getChunkSectionMigrationSystem(): unknown;
    register(id: string, migration: unknown): void;
    runMigrations(): void;
}
export interface MovingBoxBoxCollisionEvaluator {
    new (): MovingBoxBoxCollisionEvaluator;
    getCollisionStart(): number;
    setCollisionData(data: unknown, collisionConfig: unknown, hitboxIndex: number): void;
    isCheckForOnGround(): boolean;
    setCheckForOnGround(checkForOnGround: boolean): void;
    isComputeOverlaps(): boolean;
    setComputeOverlaps(computeOverlaps: boolean): void;
    setCollider(collider: unknown): MovingBoxBoxCollisionEvaluator;
    setMove(pos: Vector3d, v: Vector3d): MovingBoxBoxCollisionEvaluator;
    isBoundingBoxColliding(blockBoundingBox: unknown, x: number, y: number, z: number): boolean;
    isTouching(): boolean;
}
export interface PhysicsValues {
    new (): PhysicsValues;
    new (other: PhysicsValues): PhysicsValues;
    new (mass: number, dragCoefficient: number, invertedGravity: boolean): PhysicsValues;
    getComponentType(): unknown;
    replaceValues(other: PhysicsValues): void;
    resetToDefault(): void;
    scale(scale: number): void;
    getMass(): number;
    getDragCoefficient(): number;
    isInvertedGravity(): boolean;
    getDefault(): PhysicsValues;
    toString(): string;
    clone(): unknown;
}
export interface PhysicsValuesAddSystem {
    new (physicsValuesComponentType: unknown): PhysicsValuesAddSystem;
    getDependencies(): unknown;
    onEntityAdd(holder: unknown, reason: unknown, store: unknown): void;
    onEntityRemoved(holder: unknown, reason: unknown, store: unknown): void;
    getQuery(): unknown;
}
export interface PlayerSkinPartId {
    new (assetId: string, textureId: string, variantId: string): PlayerSkinPartId;
    fromString(stringId: string): PlayerSkinPartId;
    getAssetId(): string;
    getTextureId(): string;
    getVariantId(): string;
    toString(): string;
}
export interface PlayerSkin {
    new (doc: unknown): PlayerSkin;
    new (bodyCharacteristic: PlayerSkinPartId, underwear: PlayerSkinPartId, face: string, ears: string, mouth: string, eyes: PlayerSkinPartId | null, facialHair: PlayerSkinPartId | null, haircut: PlayerSkinPartId | null, eyebrows: PlayerSkinPartId | null, pants: PlayerSkinPartId | null, overpants: PlayerSkinPartId | null, undertop: PlayerSkinPartId | null, overtop: PlayerSkinPartId | null, shoes: PlayerSkinPartId | null, headAccessory: PlayerSkinPartId | null, faceAccessory: PlayerSkinPartId | null, earAccessory: PlayerSkinPartId | null, skinFeature: PlayerSkinPartId | null, gloves: PlayerSkinPartId | null, cape: PlayerSkinPartId | null): PlayerSkin;
    new (bodyCharacteristic: string, underwear: string, face: string, ears: string, mouth: string, eyes: string | null, facialHair: string | null, haircut: string | null, eyebrows: string | null, pants: string | null, overpants: string | null, undertop: string | null, overtop: string | null, shoes: string | null, headAccessory: string | null, faceAccessory: string | null, earAccessory: string | null, skinFeature: string | null, gloves: string | null, cape: string | null): PlayerSkin;
    getBodyCharacteristic(): PlayerSkinPartId;
    getUnderwear(): PlayerSkinPartId;
    getFace(): string;
    getEyes(): PlayerSkinPartId | null;
    getEars(): string;
    getMouth(): string;
    getFacialHair(): PlayerSkinPartId | null;
    getHaircut(): PlayerSkinPartId | null;
    getEyebrows(): PlayerSkinPartId | null;
    getPants(): PlayerSkinPartId | null;
    getOverpants(): PlayerSkinPartId | null;
    getUndertop(): PlayerSkinPartId | null;
    getOvertop(): PlayerSkinPartId | null;
    getShoes(): PlayerSkinPartId | null;
    getHeadAccessory(): PlayerSkinPartId | null;
    getFaceAccessory(): PlayerSkinPartId | null;
    getEarAccessory(): PlayerSkinPartId | null;
    getSkinFeature(): PlayerSkinPartId | null;
    getGloves(): PlayerSkinPartId | null;
    getCape(): PlayerSkinPartId | null;
}
export interface PrefabLoader {
    new (rootFolder: unknown): PrefabLoader;
    getRootFolder(): unknown;
    resolvePrefabs(prefabName: string, pathConsumer: unknown): void;
    resolvePrefabFolder(rootFolder: unknown, prefabName: string, pathConsumer: unknown): void;
    visitFile(file: unknown, attrs: unknown): unknown;
    resolveRelativeJsonPath(prefabName: string, prefabPath: unknown, rootPrefabDir: unknown): string;
}
export interface TimedBan {
    new (target: unknown, by: unknown, timestamp: unknown, expiresOn: unknown, reason: string | null): TimedBan;
    isInEffect(): boolean;
    getType(): string;
    getExpiresOn(): unknown;
    getDisconnectReason(uuid: unknown): unknown;
    toJsonObject(): unknown;
}
export interface TimeResource {
    new (): TimeResource;
    new (now: unknown): TimeResource;
    getTimeDilationModifier(): number;
    setTimeDilationModifier(timeDilationModifier: number): void;
    getNow(): unknown;
    setNow(now: unknown): void;
    add(duration: unknown): void;
    clone(): unknown;
    toString(): string;
}
export interface TranslationMap {
    new (): TranslationMap;
    new (initial: unknown): TranslationMap;
    get(key: string): string | null;
    put(key: string, value: string): void;
    removeKeys(keys: unknown): void;
    size(): number;
    putAbsentKeys(other: TranslationMap): void;
    sortByKeyBeforeFirstDot(): void;
    asMap(): unknown;
}
export interface TreeCollectorNode<T> {
    getParent(): TreeCollectorNode<T> | null;
    getChildren(): TreeCollectorNode<T>[];
    getData(): T | null;
}
export interface TreeCollector<T> {
    new (func: unknown): TreeCollector<T>;
    getRoot(): TreeCollectorNode<T> | null;
    start(): void;
    into(context: unknown, interaction: unknown): void;
    collect(tag: unknown, context: unknown, interaction: unknown): boolean;
    outof(): void;
    finished(): void;
}
export interface VelocityInstruction {
    getVelocity(): Vector3d;
    getConfig(): unknown | null;
    getType(): unknown;
}
export interface Velocity {
    new (): Velocity;
    new (other: Velocity): Velocity;
    new (initialVelocity: Vector3d): Velocity;
    setZero(): void;
    addForce(force: Vector3d): void;
    set(newVelocity: Vector3d): void;
    setClient(newVelocity: Vector3d): void;
    setX(x: number): void;
    setY(y: number): void;
    setZ(z: number): void;
    getX(): number;
    getY(): number;
    getZ(): number;
    getSpeed(): number;
    addInstruction(velocity: Vector3d, config: unknown | null, type: unknown): void;
    getInstructions(): VelocityInstruction[];
    getVelocity(): Vector3d;
    getClientVelocity(): Vector3d;
    assignVelocityTo(vector: Vector3d): Vector3d;
    clone(): unknown;
}
export interface AddItemInteraction {
}
export interface BanCommand {
    new (banProvider: unknown): BanCommand;
}
export interface BinaryPrefabBufferCodec {
    deserialize(path: unknown, buffer: unknown): unknown;
    serialize(prefabBuffer: unknown): unknown;
}
export interface BlockIdMatcher {
    toPacket(): unknown;
    toString(): string;
}
export interface BlockMatcher {
    toPacket(): unknown;
    toString(): string;
}
export interface BlockConditionInteraction {
    toString(): string;
}
export interface BlockDataProvider {
    initialize(world: unknown): void;
    cleanup(): void;
    read(x: number, y: number, z: number): void;
}
export interface BlockInteractionUtils {
    isNaturalAction(ref: unknown, componentAccessor: unknown): boolean;
}
export interface BlockMaskConstants {
    getBlockMask(blockBytes: number, fluidBytes: number, chance: boolean, offsetBytes: number, holder: unknown, supportValue: number, rotation: number, filler: number): number;
    getSkipBytes(mask: number): number;
    hasChance(mask: number): boolean;
    hasFiller(mask: number): boolean;
    hasRotation(mask: number): boolean;
    getBlockBytes(mask: number): number;
    getOffsetBytes(mask: number): number;
    getFluidBytes(mask: number): number;
    getSupportValue(mask: number): number;
    hasComponents(mask: number): boolean;
}
export interface BlockPlaceUtils {
    placeBlock(ref: unknown, itemStack: unknown, blockTypeKey: string | null, itemContainer: unknown, placementNormal: unknown, blockPosition: unknown, blockRotation: unknown, inventory: unknown, activeSlot: number, removeItemInHand: boolean, chunkReference: unknown, chunkStore: unknown, entityStore: unknown): void;
    canPlaceBlock(blockType: unknown, placedBlockTypeKey: string): boolean;
}
export interface BlockSetCommand {
    new (blockSetModule: unknown): BlockSetCommand;
    executeSync(context: unknown): void;
}
export interface BodyType {
    Masculine: unknown;
    Feminine: unknown;
}
export interface BreakBlockInteraction {
    tick0(firstRun: boolean, time: number, type: unknown, context: unknown, cooldownHandler: unknown): void;
    interactWithBlock(world: unknown, commandBuffer: unknown, type: unknown, context: unknown, itemStack: unknown, targetBlock: unknown, cooldownHandler: unknown): void;
    simulateInteractWithBlock(type: unknown, context: unknown, itemInHand: unknown, world: unknown, targetBlock: unknown): void;
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
    toString(): string;
}
export interface BsonPrefabBufferDeserializer {
    deserialize(path: unknown, document: unknown): unknown;
}
export interface CancelChainInteraction {
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
    firstRun(type: unknown, context: unknown, cooldownHandler: unknown): void;
    simulateFirstRun(type: unknown, context: unknown, cooldownHandler: unknown): void;
}
export interface ChainFlagInteraction {
    firstRun(type: unknown, context: unknown, cooldownHandler: unknown): void;
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
}
export interface ChangeBlockInteraction {
    interactWithBlock(world: unknown, commandBuffer: unknown, type: unknown, context: unknown, itemInHand: unknown, targetBlock: unknown, cooldownHandler: unknown): void;
    simulateInteractWithBlock(type: unknown, context: unknown, itemInHand: unknown, world: unknown, targetBlock: unknown): void;
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
    toString(): string;
}
export interface ChangeStateInteraction {
    interactWithBlock(world: unknown, commandBuffer: unknown, type: unknown, context: unknown, itemInHand: unknown, targetBlock: unknown, cooldownHandler: unknown): void;
    simulateInteractWithBlock(type: unknown, context: unknown, itemInHand: unknown, world: unknown, targetBlock: unknown): void;
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
    toString(): string;
}
export interface ChangeStatInteraction {
    firstRun(type: unknown, context: unknown, cooldownHandler: unknown): void;
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
    toString(): string;
}
export interface ChangeStatWithModifierInteraction {
    firstRun(type: unknown, context: unknown, cooldownHandler: unknown): void;
    toString(): string;
}
export interface CharacterCollisionData {
    entityReference: unknown;
    isPlayer: boolean;
    assign(collisionPoint: unknown, collisionVectorScale: number, entityReference: unknown, isPlayer: boolean): void;
}
export interface CollisionMaterial {
    MATERIAL_EMPTY: number;
    MATERIAL_FLUID: number;
    MATERIAL_SOLID: number;
    MATERIAL_SUBMERGED: number;
    MATERIAL_SET_ANY: number;
    MATERIAL_DAMAGE: number;
    MATERIAL_SET_NONE: number;
}
export interface ConditionInteraction {
    tick0(firstRun: boolean, time: number, type: unknown, context: unknown, cooldownHandler: unknown): void;
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
    toString(): string;
}
export interface CooldownConditionInteraction {
    firstRun(type: unknown, context: unknown, cooldownHandler: unknown): void;
    checkCooldown(cooldownHandler: unknown, cooldownId: string): boolean;
    generatePacket(): unknown;
    configurePacket(packet: unknown): void;
    toString(): string;
}
export interface CosmeticAssetValidator {
    new (type: unknown): CosmeticAssetValidator;
    accept(asset: string | null, results: unknown): void;
    updateSchema(context: unknown, target: unknown): void;
}
export interface CosmeticType {
    EMOTES: unknown;
    SKIN_TONES: unknown;
    EYE_COLORS: unknown;
    GRADIENT_SETS: unknown;
    BODY_CHARACTERISTICS: unknown;
    UNDERWEAR: unknown;
    EYEBROWS: unknown;
    EARS: unknown;
    EYES: unknown;
    FACE: unknown;
    MOUTHS: unknown;
    FACIAL_HAIR: unknown;
    PANTS: unknown;
    OVERPANTS: unknown;
    UNDERTOPS: unknown;
    OVERTOPS: unknown;
    HAIRCUTS: unknown;
    SHOES: unknown;
    HEAD_ACCESSORY: unknown;
    FACE_ACCESSORY: unknown;
    EAR_ACCESSORY: unknown;
    GLOVES: unknown;
    CAPES: unknown;
    SKIN_FEATURES: unknown;
}
export interface CycleBlockGroupInteraction {
    interactWithBlock(world: unknown, commandBuffer: unknown, type: unknown, context: unknown, heldItemStack: unknown, targetBlock: unknown, cooldownHandler: unknown): void;
    simulateInteractWithBlock(type: unknown, context: unknown, itemInHand: unknown, world: unknown, targetBlock: unknown): void;
    toString(): string;
}
export interface DamageClass {
    UNKNOWN: unknown;
    LIGHT: unknown;
    CHARGED: unknown;
    SIGNATURE: unknown;
    CODEC: unknown;
}
export interface DebugCommand {
    new (): DebugCommand;
}
export interface DebugShapeArrowCommand {
    new (): DebugShapeArrowCommand;
    execute(context: unknown, store: unknown, ref: unknown, playerRef: unknown, world: unknown): void;
}
export interface DebugShapeClearCommand {
    new (): DebugShapeClearCommand;
    execute(context: unknown, store: unknown, ref: unknown, playerRef: unknown, world: unknown): void;
}
export interface DebugShapeConeCommand {
    new (): DebugShapeConeCommand;
    execute(context: unknown, store: unknown, ref: unknown, playerRef: unknown, world: unknown): void;
}
export interface DebugShapeCubeCommand {
    new (): DebugShapeCubeCommand;
    execute(context: unknown, store: unknown, ref: unknown, playerRef: unknown, world: unknown): void;
}
export interface DebugShapeCylinderCommand {
    new (): DebugShapeCylinderCommand;
    execute(context: unknown, store: unknown, ref: unknown, playerRef: unknown, world: unknown): void;
}
export interface DebugShapeShowForceCommand {
    new (): DebugShapeShowForceCommand;
    executeSync(context: unknown): void;
}
export interface DebugShapeSphereCommand {
    new (): DebugShapeSphereCommand;
    execute(context: unknown, store: unknown, ref: unknown, playerRef: unknown, world: unknown): void;
}
export interface DebugShapeSubCommand {
    new (): DebugShapeSubCommand;
}
export interface DestroyBlockInteraction {
    new (): DestroyBlockInteraction;
}
export interface DirectionalKnockback {
    new (): DirectionalKnockback;
    calculateVector(source: Vector3d, yaw: number, target: Vector3d): Vector3d;
    toString(): string;
}
export interface EmoteCommand {
    new (): EmoteCommand;
}
export interface EnableTmpTagsCommand {
    new (): EnableTmpTagsCommand;
}
export interface ExplodeInteraction {
    new (): ExplodeInteraction;
}
export interface FluidIterator {
    accept(x: number, y: number, z: number, fluidId: number, level: number): void;
}
export interface FlyCameraModule {
    new (init: unknown): FlyCameraModule;
}
export interface ForceAccumulator {
    new (): ForceAccumulator;
    speed: number;
    force: Vector3d;
    resistanceForceLimit: Vector3d;
    initialize(state: unknown, mass: number, timeStep: number): void;
}
export interface ForceKnockback {
    new (): ForceKnockback;
    calculateVector(source: Vector3d, yaw: number, target: Vector3d): Vector3d;
    toString(): string;
}
export interface GenerateDefaultLanguageEvent {
    new (translationFiles: unknown): GenerateDefaultLanguageEvent;
    putTranslationFile(filename: string, translations: unknown): void;
}
export interface GenerateI18nCommand {
    new (): GenerateI18nCommand;
}
export interface IncrementCooldownInteraction {
    toString(): string;
}
export interface InteractionCameraSettings {
    toPacket(): unknown;
    toString(): string;
}
export interface InteractionClearCommand {
    new (): InteractionClearCommand;
}
export interface InteractionCommand {
    new (): InteractionCommand;
}
export interface InteractionPacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
}
export interface InteractionPriorityCodec {
    decode(bsonValue: unknown, extraInfo: unknown): unknown;
    encode(priority: unknown, extraInfo: unknown): unknown;
    decodeJson(reader: unknown, extraInfo: unknown): unknown;
    toSchema(context: unknown): unknown;
}
export interface InteractionRules {
    toPacket(): unknown;
    toString(): string;
}
export interface InteractionRunCommand {
    new (): InteractionRunCommand;
}
export interface InteractionRunSpecificCommand {
    new (): InteractionRunSpecificCommand;
}
export interface InteractionSetSnapshotSourceCommand {
    new (): InteractionSetSnapshotSourceCommand;
}
export interface InteractionSnapshotSourceCommand {
    new (): InteractionSnapshotSourceCommand;
}
export interface InternationalizationCommands {
    new (): InternationalizationCommands;
}
export interface InterruptInteraction {
}
export interface ItemQualityPacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
}
export interface ItemRepairPageSupplier {
}
export interface LangFileParser {
    parse(reader: unknown): unknown;
}
export interface MultiBlockMask {
    new (masks: unknown[]): MultiBlockMask;
    isExcluded(accessor: unknown, x: number, y: number, z: number, min: unknown, max: unknown, blockId: number): boolean;
    toString(): string;
    informativeToString(): string;
}
export interface OpenContainerInteraction {
}
export interface OpenItemStackContainerInteraction {
}
export interface PhysicsBodyState {
    position: Vector3d;
    velocity: Vector3d;
}
export interface PhysicsBodyStateUpdater {
    update(before: PhysicsBodyState, after: PhysicsBodyState, mass: number, dt: number, onGround: boolean, forceProvider: unknown[]): void;
}
export interface PhysicsBodyStateUpdaterMidpoint {
}
export interface PhysicsBodyStateUpdaterRK4 {
}
export interface PhysicsBodyStateUpdaterSymplecticEuler {
}
export interface PhysicsConstants {
}
export interface PhysicsFlags {
}
export interface PlayCommand {
    new (singleplayerModule: unknown): PlayCommand;
}
export interface PlayerMatcher {
    test0(attacker: unknown, target: unknown, commandBuffer: unknown): boolean;
    toPacket(): unknown;
}
export interface PlayerSkinPartType {
}
export interface PlayFriendCommand {
    new (singleplayerModule: unknown): PlayFriendCommand;
}
export interface PlayLanCommand {
    new (singleplayerModule: unknown): PlayLanCommand;
}
export interface PlayOnlineCommand {
    new (singleplayerModule: unknown): PlayOnlineCommand;
}
export interface PointKnockback {
    calculateVector(source: Vector3d, yaw: number, target: Vector3d): Vector3d;
}
export interface PrefabBufferBlockEntry {
    new (y: number): PrefabBufferBlockEntry;
    new (y: number, blockId: number, blockTypeKey: string): PrefabBufferBlockEntry;
    new (y: number, blockId: number, blockTypeKey: string, chance: number): PrefabBufferBlockEntry;
    new (y: number, blockId: number, blockTypeKey: string, chance: number, state: unknown, fluidId: number, fluidLevel: number, supportValue: number, rotation: number, filler: number): PrefabBufferBlockEntry;
    y: number;
    blockTypeKey: string;
    blockId: number;
    chance: number;
    state: unknown | null;
    fluidId: number;
    fluidLevel: number;
    supportValue: number;
    filler: number;
    rotation: number;
}
export interface PrefabBufferCall {
    new (): PrefabBufferCall;
    new (random: unknown, rotation: unknown): PrefabBufferCall;
    random: unknown;
    rotation: unknown;
}
export interface PrefabSpawnerCommand {
    new (): PrefabSpawnerCommand;
}
export interface PrefabSpawnerGetCommand {
    new (): PrefabSpawnerGetCommand;
}
export interface PrefabSpawnerModule {
    new (init: unknown): PrefabSpawnerModule;
}
export interface PrefabSpawnerSetCommand {
    new (): PrefabSpawnerSetCommand;
}
export interface PrefabSpawnerWeightCommand {
    new (): PrefabSpawnerWeightCommand;
}
export interface ResetCooldownInteraction {
    toString(): string;
}
export interface RestingSupport {
    hasChanged(world: unknown): boolean;
    rest(world: unknown, boundingBox: unknown, position: Vector3d): void;
    clear(): void;
}
export interface RootInteractionPacketGenerator {
    generateInitPacket(assetMap: unknown, assets: unknown): unknown;
}
export interface RunRootInteraction {
}
export interface SelectionPrefabSerializer {
    deserialize(doc: unknown): unknown;
    serialize(prefab: unknown): unknown;
    readWorldVersion(document: unknown): number;
    legacyEntityDecode(document: unknown, version: number): unknown | null;
    legacyStateDecode(document: unknown): unknown;
}
export interface SendMessageInteraction {
    new (id: string, message: string): SendMessageInteraction;
    new (): SendMessageInteraction;
    toString(): string;
}
export interface SpawnItemCommand {
    new (): SpawnItemCommand;
}
export interface SpawnPrefabInteraction {
}
export interface SplitVelocity {
    new (init: unknown): SplitVelocity;
}
export interface StatsConditionInteraction {
    toString(): string;
}
export interface StatsConditionWithModifierInteraction {
    toString(): string;
}
export interface TimePacketSystem {
    new (worldTimeResourceType: unknown): TimePacketSystem;
    delayedTick(dt: number, systemIndex: number, store: unknown): void;
}
export interface TimeSystem {
    new (timeResourceType: unknown): TimeSystem;
    tick(dt: number, systemIndex: number, store: unknown): void;
}
export interface ToggleGliderInteraction {
    toString(): string;
}
export interface TriggerCooldownInteraction {
    toString(): string;
}
export interface UnbanCommand {
    new (banProvider: unknown): UnbanCommand;
}
export interface UpdateBinaryPrefabException {
    new (message: string): UpdateBinaryPrefabException;
}
export interface UseBlockInteraction {
    toString(): string;
}
export interface VulnerableMatcher {
    test0(attacker: unknown, target: unknown, commandBuffer: unknown): boolean;
    toPacket(): unknown;
}
export interface WhitelistAddCommand {
    new (whitelistProvider: unknown): WhitelistAddCommand;
}
export interface WhitelistClearCommand {
    new (whitelistProvider: unknown): WhitelistClearCommand;
}
export interface WhitelistCommand {
    new (whitelistProvider: unknown): WhitelistCommand;
}
export interface WhitelistDisableCommand {
    new (whitelistProvider: unknown): WhitelistDisableCommand;
}
export interface WhitelistEnableCommand {
    new (whitelistProvider: unknown): WhitelistEnableCommand;
}
export interface WhitelistListCommand {
    new (whitelistProvider: unknown): WhitelistListCommand;
}
export interface WhitelistRemoveCommand {
    new (whitelistProvider: unknown): WhitelistRemoveCommand;
}
export interface WhitelistStatusCommand {
    new (whitelistProvider: unknown): WhitelistStatusCommand;
}
export interface JavetCallMetrics {
    record(label: string, durationNanos: number): void;
    reset(): void;
    getReport(): string;
    getTotalCalls(): number;
    getTotalTimeMs(): number;
    getAvgTimeMs(): number;
    nanoTime(): number;
}
export interface EntityStore {
    getWorld(): World;
    getStore(): Store<EntityStore>;
    getRefFromUUID(uuid: {
        toString(): string;
    }): Ref<EntityStore> | null;
    getRefFromNetworkId(networkId: number): Ref<EntityStore> | null;
}
export interface Store<T> {
    getExternalData(): T;
    getEntityCount(): number;
    getComponent<C>(ref: Ref<T>, componentType: ComponentType<T, C>): C | null;
    ensureAndGetComponent<C>(ref: Ref<T>, componentType: ComponentType<T, C>): C;
    addComponent<C>(ref: Ref<T>, componentType: ComponentType<T, C>): C;
    addComponent<C>(ref: Ref<T>, componentType: ComponentType<T, C>, component: C): void;
    putComponent<C>(ref: Ref<T>, componentType: ComponentType<T, C>, component: C): void;
    removeComponent<C>(ref: Ref<T>, componentType: ComponentType<T, C>): void;
    getArchetype(ref: Ref<T>): unknown;
    addEntity(holder: Holder<T>, addReason: AddReason): Ref<T> | null;
    removeEntity(ref: Ref<T>, removeReason: RemoveReason): void;
    forEachChunk<C>(componentType: ComponentType<T, C>, callback: (archetypeChunk: ArchetypeChunk<T>, commandBuffer: CommandBuffer<T>) => void): void;
    forEachEntityParallel<C>(componentType: ComponentType<T, C>, callback: (index: number, archetypeChunk: ArchetypeChunk<T>, commandBuffer: CommandBuffer<T>) => void): void;
    getResource<R>(resourceType: ResourceType<T, R>): R;
}
export interface EntityStoreWrapper {
    getStore(): Store<EntityStore>;
}
export interface ArchetypeChunk<T> {
    size(): number;
    getComponent<C>(index: number, componentType: ComponentType<T, C>): C | null;
    getReferenceTo(index: number): Ref<T>;
}
export interface CommandBuffer<T> {
    getComponent<C>(ref: Ref<T>, componentType: ComponentType<T, C>): C | null;
    putComponent<C>(ref: Ref<T>, componentType: ComponentType<T, C>, component: C): void;
    removeComponent<C>(ref: Ref<T>, componentType: ComponentType<T, C>): void;
    addComponent<C>(ref: Ref<T>, componentType: ComponentType<T, C>, component: C): void;
}
export interface AddReason {
    name(): string;
}
export interface AddReasonEnum {
    SPAWN: AddReason;
    LOAD: AddReason;
    EXTERNAL: AddReason;
    WORLDGEN: AddReason;
}
export interface RemoveReason {
    name(): string;
}
export interface RemoveReasonEnum {
    DESPAWN: RemoveReason;
    UNLOAD: RemoveReason;
    EXTERNAL: RemoveReason;
}
export interface Area {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface Anchor {
    width: number | null;
    height: number | null;
    top: number | null;
    bottom: number | null;
    left: number | null;
    right: number | null;
    full: number | null;
    horizontal: number | null;
    vertical: number | null;
}
export interface LocalizableString {
    key: string;
    params: JavaMap<string, string> | null;
}
export interface PatchStyle {
    texturePath: string;
    border: number | null;
    horizontalBorder: number | null;
    verticalBorder: number | null;
}
export interface ItemGridSlot {
    slotIndex: number;
    itemStack: ItemStack | null;
}
export interface DropdownEntryInfo {
    label: string;
    value: string;
}
export interface CustomUIEventBindingType {
    getValue(): number;
    name(): string;
}
export interface CustomUIEventBindingTypeEnum {
    Activating: CustomUIEventBindingType;
    RightClicking: CustomUIEventBindingType;
    DoubleClicking: CustomUIEventBindingType;
    MouseEntered: CustomUIEventBindingType;
    MouseExited: CustomUIEventBindingType;
    ValueChanged: CustomUIEventBindingType;
    ElementReordered: CustomUIEventBindingType;
    Validating: CustomUIEventBindingType;
    Dismissing: CustomUIEventBindingType;
    FocusGained: CustomUIEventBindingType;
    FocusLost: CustomUIEventBindingType;
    KeyDown: CustomUIEventBindingType;
    MouseButtonReleased: CustomUIEventBindingType;
    SlotClicking: CustomUIEventBindingType;
    SlotDoubleClicking: CustomUIEventBindingType;
    SlotMouseEntered: CustomUIEventBindingType;
    SlotMouseExited: CustomUIEventBindingType;
    DragCancelled: CustomUIEventBindingType;
    Dropped: CustomUIEventBindingType;
    SlotMouseDragCompleted: CustomUIEventBindingType;
    SlotMouseDragExited: CustomUIEventBindingType;
    SlotClickReleaseWhileDragging: CustomUIEventBindingType;
    SlotClickPressWhileDragging: CustomUIEventBindingType;
    SelectedTabChanged: CustomUIEventBindingType;
    VALUES: CustomUIEventBindingType[];
    fromValue(value: number): CustomUIEventBindingType;
}
export interface CustomPageLifetime {
    getValue(): number;
    name(): string;
}
export interface CustomPageLifetimeEnum {
    CantClose: CustomPageLifetime;
    CanDismiss: CustomPageLifetime;
    CanDismissOrCloseThroughInteraction: CustomPageLifetime;
    VALUES: CustomPageLifetime[];
    fromValue(value: number): CustomPageLifetime;
}
export interface CustomUICommandType {
    getValue(): number;
    name(): string;
}
export interface CustomUICommandTypeEnum {
    Clear: CustomUICommandType;
    Remove: CustomUICommandType;
    Append: CustomUICommandType;
    AppendInline: CustomUICommandType;
    InsertBefore: CustomUICommandType;
    InsertBeforeInline: CustomUICommandType;
    Set: CustomUICommandType;
    VALUES: CustomUICommandType[];
    fromValue(value: number): CustomUICommandType;
}
export interface HudComponent {
    getValue(): number;
    name(): string;
}
export interface HudComponentEnum {
    Hotbar: HudComponent;
    StatusIcons: HudComponent;
    Reticle: HudComponent;
    Chat: HudComponent;
    Requests: HudComponent;
    Notifications: HudComponent;
    KillFeed: HudComponent;
    InputBindings: HudComponent;
    PlayerList: HudComponent;
    EventTitle: HudComponent;
    Compass: HudComponent;
    ObjectivePanel: HudComponent;
    PortalPanel: HudComponent;
    BuilderToolsLegend: HudComponent;
    Speedometer: HudComponent;
    UtilitySlotSelector: HudComponent;
    BlockVariantSelector: HudComponent;
    BuilderToolsMaterialSlotSelector: HudComponent;
    Stamina: HudComponent;
    AmmoIndicator: HudComponent;
    Health: HudComponent;
    Mana: HudComponent;
    Oxygen: HudComponent;
    Sleep: HudComponent;
    VALUES: HudComponent[];
    fromValue(value: number): HudComponent;
}
export interface Page {
    getValue(): number;
    name(): string;
}
export interface PageEnum {
    None: Page;
    Inventory: Page;
    Crafting: Page;
    Map: Page;
    Container: Page;
    Respawn: Page;
    Shop: Page;
    VALUES: Page[];
    fromValue(value: number): Page;
}
export interface Value<T> {
    getValue(): T | null;
    getDocumentPath(): string | null;
    getValueName(): string | null;
}
export interface ValueStatic {
    ref<T>(document: string, value: string): Value<T>;
    of<T>(value: T): Value<T>;
}
export interface EventData {
    events(): JavaMap<string, string>;
    append(key: string, value: string): EventData;
    append<T extends string>(key: string, enumValue: {
        name(): T;
    }): EventData;
    put(key: string, value: string): EventData;
}
export interface EventDataStatic {
    new (): EventData;
    of(key: string, value: string): EventData;
}
export interface UICommandBuilder {
    clear(selector: string): UICommandBuilder;
    remove(selector: string): UICommandBuilder;
    append(documentPath: string): UICommandBuilder;
    append(selector: string, documentPath: string): UICommandBuilder;
    appendInline(selector: string, document: string): UICommandBuilder;
    insertBefore(selector: string, documentPath: string): UICommandBuilder;
    insertBeforeInline(selector: string, document: string): UICommandBuilder;
    set<T>(selector: string, ref: Value<T>): UICommandBuilder;
    set(selector: string, value: string): UICommandBuilder;
    set(selector: string, value: Message): UICommandBuilder;
    set(selector: string, value: boolean): UICommandBuilder;
    set(selector: string, value: number): UICommandBuilder;
    setNull(selector: string): UICommandBuilder;
    setObject(selector: string, data: Area | ItemGridSlot | ItemStack | LocalizableString | PatchStyle | DropdownEntryInfo | Anchor): UICommandBuilder;
    set<T>(selector: string, data: T[]): UICommandBuilder;
    set<T>(selector: string, data: JavaList<T>): UICommandBuilder;
    getCommands(): CustomUICommand[];
}
export interface UICommandBuilderStatic {
    new (): UICommandBuilder;
    EMPTY_COMMAND_ARRAY: CustomUICommand[];
}
export interface UIEventBuilder {
    addEventBinding(type: CustomUIEventBindingType, selector: string): UIEventBuilder;
    addEventBinding(type: CustomUIEventBindingType, selector: string, locksInterface: boolean): UIEventBuilder;
    addEventBinding(type: CustomUIEventBindingType, selector: string, data: EventData): UIEventBuilder;
    addEventBinding(type: CustomUIEventBindingType, selector: string, data: EventData | null, locksInterface: boolean): UIEventBuilder;
    getEvents(): CustomUIEventBinding[];
}
export interface UIEventBuilderStatic {
    new (): UIEventBuilder;
    EMPTY_EVENT_BINDING_ARRAY: CustomUIEventBinding[];
}
export interface CustomUICommand {
    type: CustomUICommandType;
    selector: string | null;
    value: string | null;
    documentPath: string | null;
}
export interface CustomUIEventBinding {
    type: CustomUIEventBindingType;
    selector: string | null;
    data: string | null;
    locksInterface: boolean;
}
export interface CustomPage {
    name: string;
    open: boolean;
    clear: boolean;
    lifetime: CustomPageLifetime;
    commands: CustomUICommand[];
    events: CustomUIEventBinding[];
}
export interface CustomHud {
    clear: boolean;
    commands: CustomUICommand[] | null;
}
export interface CustomUIPage {
    getLifetime(): CustomPageLifetime;
    setLifetime(lifetime: CustomPageLifetime): void;
    build(ref: Ref<EntityStore>, commandBuilder: UICommandBuilder, eventBuilder: UIEventBuilder, store: Store<EntityStore>): void;
    handleDataEvent(ref: Ref<EntityStore>, store: Store<EntityStore>, rawData: string): void;
    onDismiss(ref: Ref<EntityStore>, store: Store<EntityStore>): void;
}
export interface CustomUIHud {
    build(commandBuilder: UICommandBuilder): void;
    show(): void;
    update(clear: boolean, commandBuilder: UICommandBuilder): void;
    getPlayerRef(): PlayerRef;
}
export interface PageManager {
    getCustomPage(): CustomUIPage | null;
    setPage(ref: Ref<EntityStore>, store: Store<EntityStore>, page: Page): void;
    setPage(ref: Ref<EntityStore>, store: Store<EntityStore>, page: Page, canCloseThroughInteraction: boolean): void;
    openCustomPage(ref: Ref<EntityStore>, store: Store<EntityStore>, page: CustomUIPage): void;
    updateCustomPage(page: CustomPage): void;
}
export interface HudManager {
    getCustomHud(): CustomUIHud | null;
    getVisibleHudComponents(): JavaSet<HudComponent>;
    setVisibleHudComponents(ref: PlayerRef, ...hudComponents: HudComponent[]): void;
    showHudComponents(ref: PlayerRef, ...hudComponents: HudComponent[]): void;
    hideHudComponents(ref: PlayerRef, ...hudComponents: HudComponent[]): void;
    setCustomHud(ref: PlayerRef, hud: CustomUIHud | null): void;
    resetHud(ref: PlayerRef): void;
    resetUserInterface(ref: PlayerRef): void;
}
export type ScriptCustomUIPageBuildCallback = (ref: Ref<EntityStore>, commandBuilder: UICommandBuilder, eventBuilder: UIEventBuilder, store: Store<EntityStore>) => void;
export type ScriptCustomUIPageEventCallback = (ref: Ref<EntityStore>, store: Store<EntityStore>, rawData: string) => void;
export type ScriptCustomUIPageDismissCallback = (ref: Ref<EntityStore>, store: Store<EntityStore>) => void;
export interface ScriptCustomUIPage extends CustomUIPage {
    triggerRebuild(): void;
    triggerSendUpdate(): void;
    triggerSendUpdate(commandBuilder: UICommandBuilder): void;
    triggerSendUpdate(commandBuilder: UICommandBuilder, clear: boolean): void;
    triggerClose(): void;
    getPlayerRef(): PlayerRef;
    getPageLifetime(): CustomPageLifetime;
    setPageLifetime(lifetime: CustomPageLifetime): void;
}
export interface ScriptCustomUIPageStatic {
    new (playerRef: PlayerRef, lifetime: CustomPageLifetime, buildCallback: ScriptCustomUIPageBuildCallback): ScriptCustomUIPage;
    new (playerRef: PlayerRef, lifetime: CustomPageLifetime, buildCallback: ScriptCustomUIPageBuildCallback, eventCallback: ScriptCustomUIPageEventCallback | null): ScriptCustomUIPage;
    new (playerRef: PlayerRef, lifetime: CustomPageLifetime, buildCallback: ScriptCustomUIPageBuildCallback, eventCallback: ScriptCustomUIPageEventCallback | null, dismissCallback: ScriptCustomUIPageDismissCallback | null): ScriptCustomUIPage;
}
export type ScriptCustomUIHudBuildCallback = (commandBuilder: UICommandBuilder) => void;
export interface ScriptCustomUIHud extends CustomUIHud {
    triggerShow(): void;
    triggerUpdate(commandBuilder: UICommandBuilder): void;
    triggerUpdate(commandBuilder: UICommandBuilder, clear: boolean): void;
    getPlayerRef(): PlayerRef;
}
export interface ScriptCustomUIHudStatic {
    new (playerRef: PlayerRef, buildCallback: ScriptCustomUIHudBuildCallback): ScriptCustomUIHud;
}
export type JavaByteArray = unknown;
export type JavaCompletableFuture<T> = unknown;
export interface CommonAsset {
    getName(): string;
    getHash(): string;
    getBlob(): JavaCompletableFuture<JavaByteArray>;
}
export interface ByteArrayCommonAsset extends CommonAsset {
}
export interface ByteArrayCommonAssetStatic {
    new (name: string, bytes: JavaByteArray): ByteArrayCommonAsset;
    new (name: string, content: string): ByteArrayCommonAsset;
}
export interface CommonAssetModule {
    addCommonAsset<T extends CommonAsset>(pack: string, asset: T): void;
    addCommonAsset<T extends CommonAsset>(pack: string, asset: T, log: boolean): void;
}
export interface CommonAssetModuleStatic {
    get(): CommonAssetModule;
}
export interface NPCEntity extends LivingEntity {
    getRole(): Role | null;
    getRoleIndex(): number;
    getRoleName(): string | null;
    setRoleName(roleName: string): void;
    setRoleIndex(roleIndex: number): void;
    getLeashPoint(): Vector3d;
    setLeashPoint(leashPoint: Vector3d): void;
    getLeashHeading(): number;
    getLeashPitch(): number;
    saveLeashInformation(position: Vector3d, rotation: Vector3f): void;
    getAlarmStore(): AlarmStore;
    getDamageData(): DamageData;
    clearDamageData(): void;
    setToDespawn(): void;
    setDespawnTime(time: number): void;
    getDespawnTime(): number;
    setDespawning(despawning: boolean): void;
    setPlayingDespawnAnim(playingDespawnAnim: boolean): void;
    setDespawnRemainingSeconds(seconds: number): void;
    setDespawnCheckRemainingSeconds(seconds: number): void;
    setDespawnAnimationRemainingSeconds(seconds: number): void;
    setInitialModelScale(scale: number): void;
    getOldPosition(): Vector3d;
    playAnimation(ref: Ref<EntityStore>, animationSlot: AnimationSlot, animationId: string | null, componentAccessor: ComponentAccessor<EntityStore>): void;
    onFlockSetState(ref: Ref<EntityStore>, state: string, subState: string | null, componentAccessor: ComponentAccessor<EntityStore>): void;
    onFlockSetTarget(targetSlot: string, target: Ref<EntityStore>): void;
    getSpawnInstant(): unknown;
    setSpawnInstant(instant: unknown): void;
    getEnvironmentIndex(): number;
    getSpawnConfigurationIndex(): number;
    isSpawnTracked(): boolean;
    setSpawnTracked(tracked: boolean): void;
}
export interface NPCEntityStatic {
    getComponentType(): ComponentType<EntityStore, NPCEntity> | null;
    CODEC: unknown;
}
export interface LivingEntity extends Entity {
    getInventory(): Inventory;
    setInventory(inventory: Inventory): Inventory;
    getStatMap(): EntityStatMap | null;
}
export interface Role {
    getRoleIndex(): number;
    getRoleName(): string;
    getCombatSupport(): CombatSupport;
    getStateSupport(): StateSupport;
    getMarkedEntitySupport(): MarkedEntitySupport;
    getWorldSupport(): WorldSupport;
    getEntitySupport(): EntitySupport;
    getPositionCache(): PositionCache;
    getDebugSupport(): DebugSupport;
    isActivated(): boolean;
    isRoleChangeRequested(): boolean;
    canBreathe(breathingMaterial: unknown, fluidId: number): boolean;
    requiresLeashPosition(): boolean;
    setMarkedTarget(targetSlot: string, target: Ref<EntityStore>): void;
    getAppearance(): string;
    getInitialMaxHealth(): number;
    getCollisionRadius(): number;
    isInvulnerable(): boolean;
    getDeathAnimationTime(): number;
    getDespawnAnimationTime(): number;
    getDropListId(): string;
    getDeathInteraction(): string | null;
    getInventorySlots(): number;
    getHotbarSlots(): number;
    getOffHandSlots(): number;
    getFlockSpawnTypes(): string[] | null;
    getFlockAllowedRoles(): string[];
    canLeadFlock(): boolean;
    isCorpseStaysInFlock(): boolean;
    getInertia(): number;
    getKnockbackScale(): number;
    isBreathesInAir(): boolean;
    isBreathesInWater(): boolean;
    isPickupDropOnDeath(): boolean;
    getBalanceAsset(): string | null;
    getSpawnLockTime(): number;
    getNameTranslationKey(): string;
}
export interface CombatSupport {
    getCanCauseDamage(attackerRef: Ref<EntityStore>, componentAccessor: ComponentAccessor<EntityStore>): boolean;
}
export interface StateSupport {
    setState(ref: Ref<EntityStore>, state: string, subState: string | null, componentAccessor: ComponentAccessor<EntityStore>): void;
    getState(): string | null;
    getSubState(): string | null;
    addInteraction(ref: Ref<EntityStore>, interactionRef: Ref<EntityStore>, componentAccessor: ComponentAccessor<EntityStore>): void;
    willInteractWith(ref: Ref<EntityStore>): boolean;
}
export interface MarkedEntitySupport {
    getMarkedTarget(targetSlot: string): Ref<EntityStore> | null;
    setMarkedTarget(targetSlot: string, target: Ref<EntityStore>): void;
    clearMarkedTarget(targetSlot: string): void;
    hasMarkedTarget(targetSlot: string): boolean;
}
export interface WorldSupport {
    getWorld(): World;
}
export interface EntitySupport {
    getDisplayName(): string | null;
    setDisplayName(ref: Ref<EntityStore>, displayName: string, componentAccessor: ComponentAccessor<EntityStore>): void;
}
export interface PositionCache {
    getPosition(): Vector3d;
    getRotation(): Vector3f;
}
export interface DebugSupport {
    isDebugEnabled(): boolean;
    setDebugEnabled(enabled: boolean): void;
}
export interface AlarmStore {
    getAlarm(alarmId: string): number;
    setAlarm(alarmId: string, time: number): void;
    removeAlarm(alarmId: string): void;
    hasAlarm(alarmId: string): boolean;
}
export interface DamageData {
    reset(): void;
    getLastDamageSource(): Ref<EntityStore> | null;
    getLastDamageAmount(): number;
    getLastDamageTime(): number;
    getTotalDamageReceived(): number;
}
export interface AnimationSlot {
    ordinal(): number;
    name(): string;
}
export interface AnimationSlotEnum {
    Action: AnimationSlot;
    Base: AnimationSlot;
    Emote: AnimationSlot;
    values(): AnimationSlot[];
    valueOf(name: string): AnimationSlot;
}
export interface NPCPlugin {
    get(): NPCPlugin;
    getIndex(builderName: string): number;
    getName(builderIndex: number): string | null;
    hasRoleName(roleName: string): boolean;
    validateSpawnableRole(roleName: string): void;
    getRoleTemplateNames(spawnableOnly: boolean): string[];
    tryGetCachedValidRole(roleIndex: number): Builder<Role> | null;
    getRoleBuilderInfo(roleIndex: number): BuilderInfo | null;
    spawnNPC(store: Store<EntityStore>, npcType: string, groupType: string | null, position: Vector3d, rotation: Vector3f): JavaPair<Ref<EntityStore>, INonPlayerCharacter> | null;
    spawnEntity(store: Store<EntityStore>, roleIndex: number, position: Vector3d, rotation: Vector3f | null, spawnModel: Model | null, postSpawn: TriConsumer<NPCEntity, Ref<EntityStore>, Store<EntityStore>> | null): JavaPair<Ref<EntityStore>, NPCEntity> | null;
    getBlackboardResourceType(): ResourceType<EntityStore, Blackboard>;
    getNpcSpatialResource(): SpatialResource<EntityStore>;
    getAttitudeMap(): AttitudeMap;
    getItemAttitudeMap(): ItemAttitudeMap;
    getBuilderManager(): BuilderManager;
    getBeaconSupportComponentType(): ComponentType<EntityStore, BeaconSupport>;
    getNpcBlockEventSupportComponentType(): ComponentType<EntityStore, NPCBlockEventSupport>;
    getNpcEntityEventSupportComponentType(): ComponentType<EntityStore, NPCEntityEventSupport>;
    getTimersComponentType(): ComponentType<EntityStore, Timers>;
    getStateEvaluatorComponentType(): ComponentType<EntityStore, StateEvaluator>;
    getValueStoreComponentType(): ComponentType<EntityStore, ValueStore>;
}
export interface NPCPluginStatic {
    get(): NPCPlugin;
    reloadNPCsWithRole(roleIndex: number): void;
    buildRole(roleBuilder: Builder<Role>, builderInfo: BuilderInfo, builderSupport: BuilderSupport, roleIndex: number): Role;
}
export interface INonPlayerCharacter {
    getRole(): Role | null;
    getRoleIndex(): number;
}
export interface Builder<T> {
    build2(builderSupport: BuilderSupport): T;
    getBuilderParameters(): unknown;
    category(): unknown;
    isSpawnable(): boolean;
}
export interface BuilderInfo {
    getKeyName(): string;
    getBuilder(): Builder<unknown>;
    isValid(): boolean;
    isValidated(): boolean;
    setNeedsReload(): void;
}
export interface BuilderSupport {
    setScope(scope: unknown): void;
    setGlobalScope(scope: unknown): void;
}
export interface BuilderManager {
    getIndex(builderName: string): number;
    lookupName(builderIndex: number): string | null;
    tryGetCachedValidRole(roleIndex: number): Builder<Role> | null;
    tryGetBuilderInfo(builderIndex: number): BuilderInfo | null;
    getCachedBuilderInfo(roleIndex: number, category: unknown): BuilderInfo;
    validateBuilder(builderInfo: BuilderInfo): boolean;
    forceValidation(builderIndex: number): void;
}
export interface Blackboard {
    getValue(key: string): unknown;
    setValue(key: string, value: unknown): void;
    hasValue(key: string): boolean;
    removeValue(key: string): void;
}
export interface AttitudeMap {
    getAttitude(groupIndex: number, targetGroupIndex: number): number;
    getAttitudeGroupCount(): number;
}
export interface ItemAttitudeMap {
    getAttitude(groupIndex: number, itemIndex: number): number;
    getAttitudeGroupCount(): number;
}
export interface BeaconSupport {
}
export interface NPCBlockEventSupport {
}
export interface NPCEntityEventSupport {
}
export interface Timers {
}
export interface StateEvaluator {
}
export interface ValueStore {
    getValue(key: string): unknown;
    setValue(key: string, value: unknown): void;
    hasValue(key: string): boolean;
    removeValue(key: string): void;
}
export interface Model {
    getId(): string;
    getModelAssetId(): string;
    getScale(): number;
    getRandomAttachmentIds(): string[] | null;
    toReference(): unknown;
}
export interface ModelStatic {
    createScaledModel(modelAsset: ModelAsset, scale: number, randomAttachmentIds: string[] | null): Model;
}
export interface ModelAsset {
    getId(): string;
}
export interface JavaPair<F, S> {
    first(): F;
    second(): S;
}
export interface JavaPairStatic {
    of<F, S>(first: F, second: S): JavaPair<F, S>;
}
export type TriConsumer<A, B, C> = (a: A, b: B, c: C) => void;
export interface ResourceType<S, R> {
}
export interface SpatialResource<S> {
}
export interface SpawningPlugin {
    get(): SpawningPlugin;
}
export interface SpawningPluginStatic {
    get(): SpawningPlugin;
}
export interface FlockPlugin {
    get(): FlockPlugin;
    trySpawnFlock(npcRef: Ref<EntityStore>, npcComponent: NPCEntity, store: Store<EntityStore>, roleIndex: number, position: Vector3d, rotation: Vector3f, flockDefinition: FlockAsset | null, postSpawn: TriConsumer<NPCEntity, Ref<EntityStore>, Store<EntityStore>> | null): void;
}
export interface FlockPluginStatic {
    get(): FlockPlugin;
    trySpawnFlock(npcRef: Ref<EntityStore>, npcComponent: NPCEntity, store: Store<EntityStore>, roleIndex: number, position: Vector3d, rotation: Vector3f, flockDefinition: FlockAsset | null, postSpawn: TriConsumer<NPCEntity, Ref<EntityStore>, Store<EntityStore>> | null): void;
}
export interface FlockAsset {
    getId(): string;
}
export interface FlockAssetStatic {
    getAssetMap(): IndexedLookupTableAssetMap<string, FlockAsset>;
}
export interface IndexedLookupTableAssetMap<K, V> {
    getIndex(key: K): number;
    getAsset(key: K): V | null;
    getAssetOrDefault(index: number, defaultValue: V | null): V | null;
}
export interface UseNPCInteraction {
    DEFAULT_ID: string;
    DEFAULT_ROOT: unknown;
}
export interface SpawnNPCInteraction {
}
export interface ContextualUseNPCInteraction {
}
export interface NPCSpawnEvent {
    toString(): string;
    getNpcRef(): Ref<EntityStore>;
    getNpcEntity(): NPCEntity;
    getStore(): Store<EntityStore>;
    getRoleIndex(): number;
    getRoleName(): string;
    getPosition(): Vector3d;
    getRotation(): Vector3f;
    isCancelled(): boolean;
    setCancelled(cancelled: boolean): void;
}
export interface NPCDespawnEvent {
    toString(): string;
    getNpcRef(): Ref<EntityStore>;
    getNpcEntity(): NPCEntity;
    getStore(): Store<EntityStore>;
    getRoleIndex(): number;
    getRoleName(): string;
}
export interface NPCRoleChangeEvent {
    toString(): string;
    getNpcRef(): Ref<EntityStore>;
    getNpcEntity(): NPCEntity;
    getOldRoleIndex(): number;
    getNewRoleIndex(): number;
    getOldRoleName(): string;
    getNewRoleName(): string;
}
export interface NPCDamageEvent {
    toString(): string;
    getNpcRef(): Ref<EntityStore>;
    getNpcEntity(): NPCEntity;
    getDamageSource(): Ref<EntityStore> | null;
    getDamageAmount(): number;
    isCancelled(): boolean;
    setCancelled(cancelled: boolean): void;
    setDamageAmount(amount: number): void;
}
export interface NPCDeathEvent {
    toString(): string;
    getNpcRef(): Ref<EntityStore>;
    getNpcEntity(): NPCEntity;
    getKillerRef(): Ref<EntityStore> | null;
}
declare global {
    const Java: JavaInterop;
    const logger: ScriptLogger;
    const plugin: unknown;
    const commands: ScriptCommandRegistry;
    const scheduler: ScriptScheduler;
    const metrics: JavetCallMetrics;
    const Universe: UniverseStatic;
    const HytaleServer: HytaleServerStatic;
    const Message: MessageStatic;
    const ItemStack: ItemStack;
    const Item: ItemClass;
    const Vector3i: Vector3i;
    const Vector3f: Vector3f;
    const Vector3d: Vector3d;
    const Vector2i: Vector2i;
    const Vector2d: Vector2d;
    const Vector2f: Vector2f;
    const Transform: Transform;
    const Color: Color;
    const ColorLight: ColorLight;
    const Box: Box;
    const Cylinder: Cylinder;
    const SoundEvent: SoundEventClass;
    const SoundCategory: SoundCategoryEnum;
    const PlaySoundEvent2D: PlaySoundEvent2D;
    const UICommandBuilder: UICommandBuilderStatic;
    const UIEventBuilder: UIEventBuilderStatic;
    const EventData: EventDataStatic;
    const Value: ValueStatic;
    const CustomUIEventBindingType: CustomUIEventBindingTypeEnum;
    const CustomPageLifetime: CustomPageLifetimeEnum;
    const CustomUICommandType: CustomUICommandTypeEnum;
    const HudComponent: HudComponentEnum;
    const Page: PageEnum;
    const ScriptCustomUIPage: ScriptCustomUIPageStatic;
    const ScriptCustomUIHud: ScriptCustomUIHudStatic;
    const ByteArrayCommonAsset: ByteArrayCommonAssetStatic;
    const CommonAssetModule: CommonAssetModuleStatic;
    const DynamicLight: DynamicLight;
    const PersistentDynamicLight: PersistentDynamicLight;
    const Position: Position;
    const Direction: Direction;
    const PlaySoundEvent3D: PlaySoundEvent3D;
    const PlaySoundEventEntity: PlaySoundEventEntity;
    const SpawnParticleSystem: SpawnParticleSystem;
    const ParticleSystem: ParticleSystemClass;
    const SetBlockCmd: SetBlockCmd;
    const ServerSetBlocks: ServerSetBlocks;
    const BlockType: BlockType;
    const ChunkUtil: ChunkUtil;
    const ModelTransform: ModelTransform;
    const AudioComponent: AudioComponent;
    const DisplayNameComponent: DisplayNameComponent;
    const TransformComponent: TransformComponent;
    const ActiveEntityEffect: ActiveEntityEffect;
    const CameraManager: CameraManager;
    const AbilityEffects: AbilityEffects;
    const ActiveAnimationComponent: ActiveAnimationComponent;
    const AliveCondition: AliveCondition;
    const AllLegacyEntityTypesQuery: AllLegacyEntityTypesQuery;
    const AllLegacyLivingEntityTypesQuery: AllLegacyLivingEntityTypesQuery;
    const AnimationUtils: AnimationUtils;
    const AOECircleSelector: AOECircleSelector;
    const AOECylinderSelector: AOECylinderSelector;
    const ApplicationEffects: ApplicationEffects;
    const ApplyEffectInteraction: ApplyEffectInteraction;
    const ApplyForceInteraction: ApplyForceInteraction;
    const ApplyRandomSkinPersistedComponent: ApplyRandomSkinPersistedComponent;
    const AudioSystems: AudioSystems;
    const BasicCollisionData: BasicCollisionData;
    const BlockCollisionData: BlockCollisionData;
    const BlockCollisionProvider: BlockCollisionProvider;
    const BlockContactData: BlockContactData;
    const BlockData: BlockData;
    const BlockEntity: BlockEntity;
    const BlockEntitySystems: BlockEntitySystems;
    const BlockHarvestUtils: BlockHarvestUtils;
    const BlockHealthChunk: BlockHealthChunk;
    const BlockMigrationExtraInfo: BlockMigrationExtraInfo;
    const BlockSetModule: BlockSetModule;
    const BoundingBox: BoundingBox;
    const BoxCollisionData: BoxCollisionData;
    const BuilderToolInteraction: BuilderToolInteraction;
    const CalculationResult: CalculationResult;
    const CameraInteraction: CameraInteraction;
    const ChainingInteraction: ChainingInteraction;
    const ChargingCondition: ChargingCondition;
    const ChargingInteraction: ChargingInteraction;
    const CheckUniqueItemUsageInteraction: CheckUniqueItemUsageInteraction;
    const ChunkLightingManager: ChunkLightingManager;
    const ChunkTracker: ChunkTracker;
    const ClearEntityEffectInteraction: ClearEntityEffectInteraction;
    const ClientDelegatingProvider: ClientDelegatingProvider;
    const ClientSourcedSelector: ClientSourcedSelector;
    const CollisionConfig: CollisionConfig;
    const CollisionModuleConfig: CollisionModuleConfig;
    const CollisionResultComponent: CollisionResultComponent;
    const CombatTextUIComponent: CombatTextUIComponent;
    const CombatTextUIComponentOpacityAnimationEvent: CombatTextUIComponentOpacityAnimationEvent;
    const CombatTextUIComponentPositionAnimationEvent: CombatTextUIComponentPositionAnimationEvent;
    const CombatTextUIComponentScaleAnimationEvent: CombatTextUIComponentScaleAnimationEvent;
    const ContainerBlockWindow: ContainerBlockWindow;
    const ContainerWindow: ContainerWindow;
    const CooldownHandler: CooldownHandler;
    const CraftingRecipePacketGenerator: CraftingRecipePacketGenerator;
    const DamageCalculator: DamageCalculator;
    const DamageCalculatorSystems: DamageCalculatorSystems;
    const DamageCause: DamageCause;
    const DamageDataComponent: DamageDataComponent;
    const DamageDataSetupSystem: DamageDataSetupSystem;
    const DamageEffects: DamageEffects;
    const DamageEntityInteraction: DamageEntityInteraction;
    const DamageModule: DamageModule;
    const DamageSystems: DamageSystems;
    const DeathComponent: DeathComponent;
    const DeathItemLoss: DeathItemLoss;
    const DeathSystems: DeathSystems;
    const DebugPlugin: DebugPlugin;
    const DebugUtils: DebugUtils;
    const DeferredCorpseRemoval: DeferredCorpseRemoval;
    const DespawnComponent: DespawnComponent;
    const DespawnSystem: DespawnSystem;
    const DestroyConditionInteraction: DestroyConditionInteraction;
    const DesyncDamageCommand: DesyncDamageCommand;
    const DoorInteraction: DoorInteraction;
    const DynamicLightSystems: DynamicLightSystems;
    const EffectConditionInteraction: EffectConditionInteraction;
    const EffectControllerComponent: EffectControllerComponent;
    const Emote: Emote;
    const EntityCleanCommand: EntityCleanCommand;
    const EntityCloneCommand: EntityCloneCommand;
    const EntityCollisionProvider: EntityCollisionProvider;
    const EntityCommand: EntityCommand;
    const EntityContactData: EntityContactData;
    const EntityCountCommand: EntityCountCommand;
    const EntityDumpCommand: EntityDumpCommand;
    const EntityEffect: EntityEffect;
    const EntityEffectCommand: EntityEffectCommand;
    const EntityEffectPacketGenerator: EntityEffectPacketGenerator;
    const EntityGroup: EntityGroup;
    const EntityHideFromAdventurePlayersCommand: EntityHideFromAdventurePlayersCommand;
    const EntityIntangibleCommand: EntityIntangibleCommand;
    const EntityInteractableSystems: EntityInteractableSystems;
    const EntityInvulnerableCommand: EntityInvulnerableCommand;
    const EntityLodCommand: EntityLodCommand;
    const EntityMakeInteractableCommand: EntityMakeInteractableCommand;
    const EntityModule: EntityModule;
    const EntityNameplateCommand: EntityNameplateCommand;
    const EntityRefCollisionProvider: EntityRefCollisionProvider;
    const EntityRegistration: EntityRegistration;
    const EntityRegistry: EntityRegistry;
    const EntityRemoveCommand: EntityRemoveCommand;
    const EntityRemoveEvent: EntityRemoveEvent;
    const EntityResendCommand: EntityResendCommand;
    const EntityScaleComponent: EntityScaleComponent;
    const EntitySnapshot: EntitySnapshot;
    const EntitySnapshotHistoryCommand: EntitySnapshotHistoryCommand;
    const EntitySnapshotLengthCommand: EntitySnapshotLengthCommand;
    const EntitySnapshotSubCommand: EntitySnapshotSubCommand;
    const EntitySpatialSystem: EntitySpatialSystem;
    const EntityStatMap: EntityStatMap;
    const EntityStatsAddCommand: EntityStatsAddCommand;
    const EntityStatsDumpCommand: EntityStatsDumpCommand;
    const EntityStatsGetCommand: EntityStatsGetCommand;
    const EntityStatsResetCommand: EntityStatsResetCommand;
    const EntityStatsSetCommand: EntityStatsSetCommand;
    const EntityStatsSetToMaxCommand: EntityStatsSetToMaxCommand;
    const EntityStatsSubCommand: EntityStatsSubCommand;
    const EntityStatType: EntityStatType;
    const EntityStatTypePacketGenerator: EntityStatTypePacketGenerator;
    const EntityStatUIComponent: EntityStatUIComponent;
    const EntityStatValue: EntityStatValue;
    const EntitySystems: EntitySystems;
    const EntityTrackerCommand: EntityTrackerCommand;
    const EntityTrackerSystems: EntityTrackerSystems;
    const EntityUIComponentPacketGenerator: EntityUIComponentPacketGenerator;
    const EntityUIModule: EntityUIModule;
    const EntityUtils: EntityUtils;
    const EnvironmentCondition: EnvironmentCondition;
    const EquipItemInteraction: EquipItemInteraction;
    const ExplosionConfig: ExplosionConfig;
    const ExplosionUtils: ExplosionUtils;
    const FirstClickInteraction: FirstClickInteraction;
    const FloodLightCalculation: FloodLightCalculation;
    const ForceProviderEntity: ForceProviderEntity;
    const FromPrefab: FromPrefab;
    const FromWorldGen: FromWorldGen;
    const Frozen: Frozen;
    const FullBrightLightCalculation: FullBrightLightCalculation;
    const GenericVelocityInstructionSystem: GenericVelocityInstructionSystem;
    const GlidingCondition: GlidingCondition;
    const HeadRotation: HeadRotation;
    const HiddenFromAdventurePlayers: HiddenFromAdventurePlayers;
    const HiddenPlayersManager: HiddenPlayersManager;
    const HideEntitySystems: HideEntitySystems;
    const HitboxCollision: HitboxCollision;
    const HitboxCollisionConfig: HitboxCollisionConfig;
    const HitboxCollisionConfigPacketGenerator: HitboxCollisionConfigPacketGenerator;
    const HitboxCollisionSystems: HitboxCollisionSystems;
    const HitboxCommand: HitboxCommand;
    const HorizontalSelector: HorizontalSelector;
    const HotbarManager: HotbarManager;
    const HudManager: HudManager;
    const HytaleBanProvider: HytaleBanProvider;
    const IncreaseBackpackCapacityInteraction: IncreaseBackpackCapacityInteraction;
    const InputUpdate: InputUpdate;
    const Intangible: Intangible;
    const IntangibleSystems: IntangibleSystems;
    const Interactable: Interactable;
    const InteractionChain: InteractionChain;
    const InteractionConfiguration: InteractionConfiguration;
    const InteractionEffects: InteractionEffects;
    const InteractionEntry: InteractionEntry;
    const InteractionManager: InteractionManager;
    const InteractionSimulationHandler: InteractionSimulationHandler;
    const InteractionSystems: InteractionSystems;
    const InteractionTarget: InteractionTarget;
    const InteractionTypeUtils: InteractionTypeUtils;
    const InvalidatablePersistentRef: InvalidatablePersistentRef;
    const Invulnerable: Invulnerable;
    const InvulnerableSystems: InvulnerableSystems;
    const ItemComponent: ItemComponent;
    const ItemContainerStateSpatialSystem: ItemContainerStateSpatialSystem;
    const ItemMergeSystem: ItemMergeSystem;
    const ItemPacketGenerator: ItemPacketGenerator;
    const ItemPhysicsComponent: ItemPhysicsComponent;
    const ItemPhysicsSystem: ItemPhysicsSystem;
    const ItemPrePhysicsSystem: ItemPrePhysicsSystem;
    const ItemRepairElement: ItemRepairElement;
    const ItemRepairPage: ItemRepairPage;
    const ItemReticleConfigPacketGenerator: ItemReticleConfigPacketGenerator;
    const ItemSpatialSystem: ItemSpatialSystem;
    const ItemStackContainerWindow: ItemStackContainerWindow;
    const ItemSystems: ItemSystems;
    const ItemUtils: ItemUtils;
    const JumpOperation: JumpOperation;
    const KillFeedEvent: KillFeedEvent;
    const KnockbackComponent: KnockbackComponent;
    const KnockbackPredictionSystems: KnockbackPredictionSystems;
    const KnockbackSimulation: KnockbackSimulation;
    const KnockbackSystems: KnockbackSystems;
    const Label: Label;
    const LaunchPadInteraction: LaunchPadInteraction;
    const LaunchProjectileInteraction: LaunchProjectileInteraction;
    const LegacyEntityTrackerSystems: LegacyEntityTrackerSystems;
    const LegacyProjectileSystems: LegacyProjectileSystems;
    const LivingEntityEffectClearChangesSystem: LivingEntityEffectClearChangesSystem;
    const LivingEntityEffectSystem: LivingEntityEffectSystem;
    const LivingEntityInventoryChangeEvent: LivingEntityInventoryChangeEvent;
    const LivingEntityUseBlockEvent: LivingEntityUseBlockEvent;
    const LogicCondition: LogicCondition;
    const MaterialExtraResourcesSection: MaterialExtraResourcesSection;
    const MessagesUpdated: MessagesUpdated;
    const ModelComponent: ModelComponent;
    const ModelOverride: ModelOverride;
    const ModelSystems: ModelSystems;
    const ModifyInventoryInteraction: ModifyInventoryInteraction;
    const MovementAudioComponent: MovementAudioComponent;
    const MovementConditionInteraction: MovementConditionInteraction;
    const MovementConfig: MovementConfig;
    const MovementManager: MovementManager;
    const MovementStatesComponent: MovementStatesComponent;
    const MovementStatesSystems: MovementStatesSystems;
    const Nameplate: Nameplate;
    const NameplateSystems: NameplateSystems;
    const NetworkId: NetworkId;
    const NetworkSendableSpatialSystem: NetworkSendableSpatialSystem;
    const NewSpawnComponent: NewSpawnComponent;
    const NoDamageTakenCondition: NoDamageTakenCondition;
    const OperationsBuilder: OperationsBuilder;
    const OutOfCombatCondition: OutOfCombatCondition;
    const OverlapBehavior: OverlapBehavior;
    const PageManager: PageManager;
    const ParallelInteraction: ParallelInteraction;
    const Particle: Particle;
    const ParticleAnimationFrame: ParticleAnimationFrame;
    const ParticleAttractor: ParticleAttractor;
    const ParticleCollision: ParticleCollision;
    const ParticleCommand: ParticleCommand;
    const ParticleSpawnCommand: ParticleSpawnCommand;
    const ParticleSpawner: ParticleSpawner;
    const ParticleSpawnerGroup: ParticleSpawnerGroup;
    const ParticleSpawnerPacketGenerator: ParticleSpawnerPacketGenerator;
    const ParticleSpawnPage: ParticleSpawnPage;
    const ParticleSystemPacketGenerator: ParticleSystemPacketGenerator;
    const PendingTeleport: PendingTeleport;
    const PersistentModel: PersistentModel;
    const PersistentRef: PersistentRef;
    const PersistentRefCount: PersistentRefCount;
    const PhysicsMath: PhysicsMath;
    const PickBlockInteraction: PickBlockInteraction;
    const PickupItemComponent: PickupItemComponent;
    const PickupItemSystem: PickupItemSystem;
    const PlaceBlockInteraction: PlaceBlockInteraction;
    const PlacedByInteractionComponent: PlacedByInteractionComponent;
    const PlaceFluidInteraction: PlaceFluidInteraction;
    const PlacementCountConditionInteraction: PlacementCountConditionInteraction;
    const Player: Player;
    const PlayerCameraAddSystem: PlayerCameraAddSystem;
    const PlayerChunkTrackerSystems: PlayerChunkTrackerSystems;
    const PlayerCollisionResultAddSystem: PlayerCollisionResultAddSystem;
    const PlayerCondition: PlayerCondition;
    const PlayerConfigData: PlayerConfigData;
    const PlayerConnectionFlushSystem: PlayerConnectionFlushSystem;
    const PlayerDeathPositionData: PlayerDeathPositionData;
    const PlayerHudManagerSystems: PlayerHudManagerSystems;
    const PlayerItemEntityPickupSystem: PlayerItemEntityPickupSystem;
    const PlayerMovementManagerSystems: PlayerMovementManagerSystems;
    const PlayerPingSystem: PlayerPingSystem;
    const PlayerProcessMovementSystem: PlayerProcessMovementSystem;
    const PlayerRegenerateStatsSystem: PlayerRegenerateStatsSystem;
    const PlayerRespawnPointData: PlayerRespawnPointData;
    const PlayerSavingSystems: PlayerSavingSystems;
    const PlayerSendInventorySystem: PlayerSendInventorySystem;
    const PlayerSkinComponent: PlayerSkinComponent;
    const PlayerSkinGradient: PlayerSkinGradient;
    const PlayerSkinGradientSet: PlayerSkinGradientSet;
    const PlayerSkinPart: PlayerSkinPart;
    const PlayerSkinPartTexture: PlayerSkinPartTexture;
    const PlayerSkinTintColor: PlayerSkinTintColor;
    const PlayerSpatialSystem: PlayerSpatialSystem;
    const PlayerSystems: PlayerSystems;
    const PlayerWorldData: PlayerWorldData;
    const PositionDataComponent: PositionDataComponent;
    const PredictedProjectile: PredictedProjectile;
    const PredictedProjectileSystems: PredictedProjectileSystems;
    const PrefabBufferColumn: PrefabBufferColumn;
    const PrefabBufferUtil: PrefabBufferUtil;
    const PrefabCopyableComponent: PrefabCopyableComponent;
    const PrefabLoadException: PrefabLoadException;
    const PrefabPasteEvent: PrefabPasteEvent;
    const PrefabPlaceEntityEvent: PrefabPlaceEntityEvent;
    const PrefabSaveException: PrefabSaveException;
    const PrefabSpawnerState: PrefabSpawnerState;
    const PrefabStore: PrefabStore;
    const PreventItemMerging: PreventItemMerging;
    const PreventPickup: PreventPickup;
    const Projectile: Projectile;
    const ProjectileComponent: ProjectileComponent;
    const ProjectileConfig: ProjectileConfig;
    const ProjectileConfigPacketGenerator: ProjectileConfigPacketGenerator;
    const ProjectileInteraction: ProjectileInteraction;
    const PropComponent: PropComponent;
    const RaycastSelector: RaycastSelector;
    const RecipePacketGenerator: RecipePacketGenerator;
    const RefillContainerInteraction: RefillContainerInteraction;
    const RegeneratingModifier: RegeneratingModifier;
    const RegeneratingValue: RegeneratingValue;
    const RegenHealthCondition: RegenHealthCondition;
    const RemovalBehavior: RemovalBehavior;
    const RemoveEntityInteraction: RemoveEntityInteraction;
    const RepairItemInteraction: RepairItemInteraction;
    const RepeatInteraction: RepeatInteraction;
    const ReplaceInteraction: ReplaceInteraction;
    const Repulsion: Repulsion;
    const RepulsionConfig: RepulsionConfig;
    const RepulsionConfigPacketGenerator: RepulsionConfigPacketGenerator;
    const RepulsionSystems: RepulsionSystems;
    const RespawnPage: RespawnPage;
    const RespawnSystems: RespawnSystems;
    const RespondToHit: RespondToHit;
    const RespondToHitSystems: RespondToHitSystems;
    const RotateObjectComponent: RotateObjectComponent;
    const RotateObjectSystem: RotateObjectSystem;
    const SelectInteraction: SelectInteraction;
    const SelectionManager: SelectionManager;
    const SerialInteraction: SerialInteraction;
    const ServerPlayerListModule: ServerPlayerListModule;
    const SingleplayerRequestAccessEvent: SingleplayerRequestAccessEvent;
    const SnapshotBuffer: SnapshotBuffer;
    const SnapshotSystems: SnapshotSystems;
    const SprintingCondition: SprintingCondition;
    const SprintStaminaRegenDelay: SprintStaminaRegenDelay;
    const StabSelector: StabSelector;
    const StaminaGameplayConfig: StaminaGameplayConfig;
    const StaminaModule: StaminaModule;
    const StaminaSystems: StaminaSystems;
    const StandardPhysicsConfig: StandardPhysicsConfig;
    const StandardPhysicsTickSystem: StandardPhysicsTickSystem;
    const StatCondition: StatCondition;
    const StaticModifier: StaticModifier;
    const StatModifiersManager: StatModifiersManager;
    const StatModifyingSystem: StatModifyingSystem;
    const StringTag: StringTag;
    const SuffocatingCondition: SuffocatingCondition;
    const TangiableEntitySpatialSystem: TangiableEntitySpatialSystem;
    const TargetEntityEffect: TargetEntityEffect;
    const Teleport: Teleport;
    const TeleportSystems: TeleportSystems;
    const TimeModule: TimeModule;
    const TrackedPlacement: TrackedPlacement;
    const TransformSystems: TransformSystems;
    const UIComponentList: UIComponentList;
    const UIComponentSystems: UIComponentSystems;
    const UnarmedInteractions: UnarmedInteractions;
    const UnarmedInteractionsPacketGenerator: UnarmedInteractionsPacketGenerator;
    const UniqueItemUsagesComponent: UniqueItemUsagesComponent;
    const UpdateEntitySeedSystem: UpdateEntitySeedSystem;
    const UpdateLocationSystems: UpdateLocationSystems;
    const UseEntityInteraction: UseEntityInteraction;
    const UUIDComponent: UUIDComponent;
    const VelocityConfig: VelocityConfig;
    const VelocitySystems: VelocitySystems;
    const WieldingCondition: WieldingCondition;
    const WieldingInteraction: WieldingInteraction;
    const WindowManager: WindowManager;
    const WorldGenId: WorldGenId;
    const WorldParticle: WorldParticle;
    const WorldTimeResource: WorldTimeResource;
    const WorldTimeSystems: WorldTimeSystems;
    const WorldUtil: WorldUtil;
    const AccessControlModule: AccessControlModule;
    const BlockCounter: BlockCounter;
    const BlockFilter: BlockFilter;
    const BlockHealth: BlockHealth;
    const BlockHealthModule: BlockHealthModule;
    const BlockMask: BlockMask;
    const BlockModule: BlockModule;
    const BlockPattern: BlockPattern;
    const BlockSetLookupTable: BlockSetLookupTable;
    const BlockTracker: BlockTracker;
    const BoxBlockIntersectionEvaluator: BoxBlockIntersectionEvaluator;
    const ChangeActiveSlotInteraction: ChangeActiveSlotInteraction;
    const CollisionDataArray: CollisionDataArray<unknown>;
    const CollisionMath: CollisionMath;
    const CollisionModule: CollisionModule;
    const CollisionResult: CollisionResult;
    const CollisionTracker: CollisionTracker;
    const CosmeticRegistry: CosmeticRegistry;
    const CosmeticsModule: CosmeticsModule;
    const ForceProviderStandardState: ForceProviderStandardState;
    const FragileBlock: FragileBlock;
    const HytaleWhitelistProvider: HytaleWhitelistProvider;
    const I18nModule: I18nModule;
    const InfiniteBan: InfiniteBan;
    const InteractionModule: InteractionModule;
    const Interactions: Interactions;
    const ItemModule: ItemModule;
    const LegacyModule: LegacyModule;
    const ListCollector: ListCollector<unknown>;
    const MigrationModule: MigrationModule;
    const MovingBoxBoxCollisionEvaluator: MovingBoxBoxCollisionEvaluator;
    const PhysicsValues: PhysicsValues;
    const PhysicsValuesAddSystem: PhysicsValuesAddSystem;
    const PlayerSkin: PlayerSkin;
    const PlayerSkinPartId: PlayerSkinPartId;
    const PrefabLoader: PrefabLoader;
    const PrefabRotation: PrefabRotation;
    const PrefabWeights: PrefabWeights;
    const ProjectileModule: ProjectileModule;
    const RootInteraction: RootInteraction;
    const SimpleInteraction: SimpleInteraction;
    const SimplePhysicsProvider: SimplePhysicsProvider;
    const SingleCollector: SingleCollector<unknown>;
    const SingleplayerModule: SingleplayerModule;
    const StandardPhysicsProvider: StandardPhysicsProvider;
    const TimeCommand: TimeCommand;
    const TimedBan: TimedBan;
    const TimeResource: TimeResource;
    const TranslationMap: TranslationMap;
    const TreeCollector: TreeCollector<unknown>;
    const Velocity: Velocity;
    const AddItemInteraction: AddItemInteraction;
    const BanCommand: BanCommand;
    const BinaryPrefabBufferCodec: BinaryPrefabBufferCodec;
    const BlockConditionInteraction: BlockConditionInteraction;
    const BlockDataProvider: BlockDataProvider;
    const BlockInteractionUtils: BlockInteractionUtils;
    const BlockMaskConstants: BlockMaskConstants;
    const BlockPlaceUtils: BlockPlaceUtils;
    const BlockSetCommand: BlockSetCommand;
    const BodyType: BodyType;
    const BreakBlockInteraction: BreakBlockInteraction;
    const BsonPrefabBufferDeserializer: BsonPrefabBufferDeserializer;
    const CancelChainInteraction: CancelChainInteraction;
    const ChainFlagInteraction: ChainFlagInteraction;
    const ChangeBlockInteraction: ChangeBlockInteraction;
    const ChangeStateInteraction: ChangeStateInteraction;
    const ChangeStatInteraction: ChangeStatInteraction;
    const ChangeStatWithModifierInteraction: ChangeStatWithModifierInteraction;
    const CharacterCollisionData: CharacterCollisionData;
    const CollisionMaterial: CollisionMaterial;
    const ConditionInteraction: ConditionInteraction;
    const CooldownConditionInteraction: CooldownConditionInteraction;
    const CosmeticAssetValidator: CosmeticAssetValidator;
    const CosmeticType: CosmeticType;
    const CycleBlockGroupInteraction: CycleBlockGroupInteraction;
    const DamageClass: DamageClass;
    const DebugCommand: DebugCommand;
    const DebugShapeArrowCommand: DebugShapeArrowCommand;
    const DebugShapeClearCommand: DebugShapeClearCommand;
    const DebugShapeConeCommand: DebugShapeConeCommand;
    const DebugShapeCubeCommand: DebugShapeCubeCommand;
    const DebugShapeCylinderCommand: DebugShapeCylinderCommand;
    const DebugShapeShowForceCommand: DebugShapeShowForceCommand;
    const DebugShapeSphereCommand: DebugShapeSphereCommand;
    const DebugShapeSubCommand: DebugShapeSubCommand;
    const DestroyBlockInteraction: DestroyBlockInteraction;
    const DirectionalKnockback: DirectionalKnockback;
    const EmoteCommand: EmoteCommand;
    const EnableTmpTagsCommand: EnableTmpTagsCommand;
    const ExplodeInteraction: ExplodeInteraction;
    const FluidIterator: FluidIterator;
    const FlyCameraModule: FlyCameraModule;
    const ForceAccumulator: ForceAccumulator;
    const ForceKnockback: ForceKnockback;
    const GenerateDefaultLanguageEvent: GenerateDefaultLanguageEvent;
    const GenerateI18nCommand: GenerateI18nCommand;
    const IncrementCooldownInteraction: IncrementCooldownInteraction;
    const InteractionCameraSettings: InteractionCameraSettings;
    const InteractionClearCommand: InteractionClearCommand;
    const InteractionCommand: InteractionCommand;
    const InteractionPacketGenerator: InteractionPacketGenerator;
    const InteractionPriorityCodec: InteractionPriorityCodec;
    const InteractionRules: InteractionRules;
    const InteractionRunCommand: InteractionRunCommand;
    const InteractionRunSpecificCommand: InteractionRunSpecificCommand;
    const InteractionSetSnapshotSourceCommand: InteractionSetSnapshotSourceCommand;
    const InteractionSnapshotSourceCommand: InteractionSnapshotSourceCommand;
    const InternationalizationCommands: InternationalizationCommands;
    const InterruptInteraction: InterruptInteraction;
    const ItemQualityPacketGenerator: ItemQualityPacketGenerator;
    const ItemRepairPageSupplier: ItemRepairPageSupplier;
    const LangFileParser: LangFileParser;
    const MultiBlockMask: MultiBlockMask;
    const OpenContainerInteraction: OpenContainerInteraction;
    const OpenItemStackContainerInteraction: OpenItemStackContainerInteraction;
    const PhysicsBodyState: PhysicsBodyState;
    const PhysicsBodyStateUpdater: PhysicsBodyStateUpdater;
    const PhysicsBodyStateUpdaterMidpoint: PhysicsBodyStateUpdaterMidpoint;
    const PhysicsBodyStateUpdaterRK4: PhysicsBodyStateUpdaterRK4;
    const PhysicsBodyStateUpdaterSymplecticEuler: PhysicsBodyStateUpdaterSymplecticEuler;
    const PhysicsConstants: PhysicsConstants;
    const PhysicsFlags: PhysicsFlags;
    const PlayCommand: PlayCommand;
    const PlayerMatcher: PlayerMatcher;
    const PlayerSkinPartType: PlayerSkinPartType;
    const PlayFriendCommand: PlayFriendCommand;
    const PlayLanCommand: PlayLanCommand;
    const PlayOnlineCommand: PlayOnlineCommand;
    const PointKnockback: PointKnockback;
    const PrefabBufferBlockEntry: PrefabBufferBlockEntry;
    const PrefabBufferCall: PrefabBufferCall;
    const PrefabSpawnerCommand: PrefabSpawnerCommand;
    const PrefabSpawnerGetCommand: PrefabSpawnerGetCommand;
    const PrefabSpawnerModule: PrefabSpawnerModule;
    const PrefabSpawnerSetCommand: PrefabSpawnerSetCommand;
    const PrefabSpawnerWeightCommand: PrefabSpawnerWeightCommand;
    const ResetCooldownInteraction: ResetCooldownInteraction;
    const RestingSupport: RestingSupport;
    const RootInteractionPacketGenerator: RootInteractionPacketGenerator;
    const RunRootInteraction: RunRootInteraction;
    const SelectionPrefabSerializer: SelectionPrefabSerializer;
    const SendMessageInteraction: SendMessageInteraction;
    const SpawnItemCommand: SpawnItemCommand;
    const SpawnPrefabInteraction: SpawnPrefabInteraction;
    const SplitVelocity: SplitVelocity;
    const StatsConditionInteraction: StatsConditionInteraction;
    const StatsConditionWithModifierInteraction: StatsConditionWithModifierInteraction;
    const TimePacketSystem: TimePacketSystem;
    const TimeSystem: TimeSystem;
    const ToggleGliderInteraction: ToggleGliderInteraction;
    const TriggerCooldownInteraction: TriggerCooldownInteraction;
    const UnbanCommand: UnbanCommand;
    const UpdateBinaryPrefabException: UpdateBinaryPrefabException;
    const UseBlockInteraction: UseBlockInteraction;
    const VulnerableMatcher: VulnerableMatcher;
    const WhitelistAddCommand: WhitelistAddCommand;
    const WhitelistClearCommand: WhitelistClearCommand;
    const WhitelistCommand: WhitelistCommand;
    const WhitelistDisableCommand: WhitelistDisableCommand;
    const WhitelistEnableCommand: WhitelistEnableCommand;
    const WhitelistListCommand: WhitelistListCommand;
    const WhitelistRemoveCommand: WhitelistRemoveCommand;
    const WhitelistStatusCommand: WhitelistStatusCommand;
    const NPCPlugin: NPCPluginStatic;
    const NPCEntity: NPCEntityStatic;
    const FlockPlugin: FlockPluginStatic;
    const FlockAsset: FlockAssetStatic;
    const SpawningPlugin: SpawningPluginStatic;
    const AnimationSlot: AnimationSlotEnum;
    const Model: ModelStatic;
    const Pair: JavaPairStatic;
    const AddReason: AddReasonEnum;
    const RemoveReason: RemoveReasonEnum;
}
//# sourceMappingURL=types.d.ts.map