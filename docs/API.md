# HytaleJS API Documentation

This document provides detailed information about the HytaleJS API, based on the decompiled Hytale server Java classes.

## Table of Contents

- [Protocol Types](#protocol-types)
  - [Position](#position)
  - [Direction](#direction)
  - [Color](#color)
- [Packets](#packets)
  - [PlaySoundEvent3D](#playso undevent3d)
  - [PlaySoundEventEntity](#playsoundevententity)
  - [SpawnParticleSystem](#spawnparticlesystem)
- [Assets](#assets)
  - [ParticleSystem](#particlesystem-asset)

---

## Protocol Types

### Position

**Java Class:** `com.hypixel.hytale.protocol.Position`

A 3D position in world space used in network packets.

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `x` | `number` (double) | X coordinate in world space |
| `y` | `number` (double) | Y coordinate in world space |
| `z` | `number` (double) | Z coordinate in world space |

#### Constructors

```typescript
new Position()
new Position(x: number, y: number, z: number)
new Position(other: Position)
```

#### Methods

- `clone(): Position` - Creates a copy of this position

#### Example

```typescript
// Create a position at coordinates (100, 64, -50)
const pos = new Position(100, 64, -50);

// Clone a position
const posCopy = pos.clone();

// Access coordinates
logger.info(`Position: ${pos.x}, ${pos.y}, ${pos.z}`);
```

---

### Direction

**Java Class:** `com.hypixel.hytale.protocol.Direction`

Rotation angles (yaw, pitch, roll) used in network packets.

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `yaw` | `number` (float) | Horizontal rotation angle in degrees |
| `pitch` | `number` (float) | Vertical rotation angle in degrees |
| `roll` | `number` (float) | Roll angle in degrees |

#### Constructors

```typescript
new Direction()
new Direction(yaw: number, pitch: number, roll: number)
new Direction(other: Direction)
```

#### Methods

- `clone(): Direction` - Creates a copy of this direction

#### Example

```typescript
// Create a direction facing east (90° yaw)
const dir = new Direction(90, 0, 0);

// Clone a direction
const dirCopy = dir.clone();

// Access angles
logger.info(`Direction: yaw=${dir.yaw}, pitch=${dir.pitch}, roll=${dir.roll}`);
```

---

### Color

**Java Class:** `com.hypixel.hytale.protocol.Color`

RGB color value using signed bytes. Each component ranges from 0-255 in user input, but is stored as a signed byte (-128 to 127) internally.

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `red` | `number` (byte) | Red component (0-255, converted to signed byte) |
| `green` | `number` (byte) | Green component (0-255, converted to signed byte) |
| `blue` | `number` (byte) | Blue component (0-255, converted to signed byte) |

#### Constructors

```typescript
new Color()
new Color(red: number, green: number, blue: number)
new Color(other: Color)
```

#### Methods

- `clone(): Color` - Creates a copy of this color

#### Important Note on Byte Conversion

When creating colors, values 0-127 are used directly, but values 128-255 must be converted to negative bytes:

```typescript
// Helper function for RGB to signed byte conversion
function toSignedByte(value: number): number {
  return value > 127 ? value - 256 : value;
}

// Example: Create a bright red color (255, 0, 0)
let r = 255, g = 0, b = 0;
if (r > 127) r = r - 256;  // 255 becomes -1
if (g > 127) g = g - 256;
if (b > 127) b = b - 256;
const redColor = new Color(r, g, b);
```

#### Example

```typescript
// Create a purple color (200, 0, 200)
let r = 200, g = 0, b = 200;
if (r > 127) r = r - 256;  // 200 becomes -56
if (b > 127) b = b - 256;  // 200 becomes -56
const purple = new Color(r, g, b);
```

---

## Packets

### PlaySoundEvent3D

**Java Class:** `com.hypixel.hytale.protocol.packets.world.PlaySoundEvent3D`
**Packet ID:** 155

Plays a sound effect at a specific 3D position in the world. Players hear the sound with spatial audio based on their distance and direction from the source.

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `soundEventIndex` | `number` (int) | Index of the sound event from the asset map |
| `category` | `SoundCategory` | Sound category (Music, Ambient, SFX, UI) |
| `position` | `Position` | World position where the sound originates |
| `volumeModifier` | `number` (float) | Volume multiplier (typically 0.0 to 2.0) |
| `pitchModifier` | `number` (float) | Pitch multiplier (typically 0.5 to 2.0) |

#### Constructors

```typescript
new PlaySoundEvent3D()
new PlaySoundEvent3D(
  soundEventIndex: number,
  category: SoundCategory,
  position: Position,
  volumeModifier: number,
  pitchModifier: number
)
```

#### Methods

- `getId(): number` - Returns the packet ID (155)
- `clone(): PlaySoundEvent3D` - Creates a copy of this packet

#### Example

```typescript
// Play an explosion sound at a specific location
const soundIndex = SoundEvent.getAssetMap().getIndex("hytale:sfx.explosion");
const position = new Position(100, 64, -50);
const packet = new PlaySoundEvent3D(
  soundIndex,
  SoundCategory.SFX,
  position,
  1.0,  // Normal volume
  1.0   // Normal pitch
);

// Send to a player
playerRef.getPacketHandler().write(packet);
```

---

### PlaySoundEventEntity

**Java Class:** `com.hypixel.hytale.protocol.packets.world.PlaySoundEventEntity`
**Packet ID:** 156

Plays a sound effect attached to an entity. The sound follows the entity as it moves.

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `soundEventIndex` | `number` (int) | Index of the sound event from the asset map |
| `networkId` | `number` (int) | Network ID of the entity to attach the sound to |
| `volumeModifier` | `number` (float) | Volume multiplier (typically 0.0 to 2.0) |
| `pitchModifier` | `number` (float) | Pitch multiplier (typically 0.5 to 2.0) |

#### Constructors

```typescript
new PlaySoundEventEntity()
new PlaySoundEventEntity(
  soundEventIndex: number,
  networkId: number,
  volumeModifier: number,
  pitchModifier: number
)
```

#### Methods

- `getId(): number` - Returns the packet ID (156)
- `clone(): PlaySoundEventEntity` - Creates a copy of this packet

#### Example

```typescript
// Play a sound attached to a player entity
const soundIndex = SoundEvent.getAssetMap().getIndex("hytale:sfx.footstep.grass");
// Note: You would need to get the entity's network ID
const packet = new PlaySoundEventEntity(
  soundIndex,
  entityNetworkId,  // Entity's network ID
  1.0,  // Normal volume
  1.0   // Normal pitch
);

playerRef.getPacketHandler().write(packet);
```

---

### SpawnParticleSystem

**Java Class:** `com.hypixel.hytale.protocol.packets.world.SpawnParticleSystem`
**Packet ID:** 152

Spawns a particle system at a specific location with custom properties.

#### Fields

| Field | Type | Description |
|-------|------|-------------|
| `particleSystemId` | `string` | ID of the particle system asset (e.g., "hytale:particles.smoke") |
| `position` | `Position` | World position where particles spawn |
| `rotation` | `Direction` | Rotation/orientation of the particle system |
| `scale` | `number` (float) | Scale multiplier for particle size |
| `color` | `Color` | Color tint applied to particles |

#### Constructors

```typescript
new SpawnParticleSystem()
new SpawnParticleSystem(
  particleSystemId: string,
  position: Position,
  rotation: Direction,
  scale: number,
  color: Color
)
```

#### Methods

- `getId(): number` - Returns the packet ID (152)
- `clone(): SpawnParticleSystem` - Creates a copy of this packet

#### Example

```typescript
// Spawn red smoke particles above a player
const position = new Position(100, 65, -50);
const rotation = new Direction(0, 0, 0);

// Create red color (255, 0, 0 -> -1, 0, 0 in signed bytes)
let r = 255, g = 0, b = 0;
if (r > 127) r = r - 256;
const redColor = new Color(r, g, b);

const packet = new SpawnParticleSystem(
  "hytale:particles.smoke",
  position,
  rotation,
  2.0,      // 2x scale
  redColor
);

playerRef.getPacketHandler().write(packet);
```

---

## Assets

### ParticleSystem (Asset)

**Java Class:** `com.hypixel.hytale.server.core.asset.type.particle.config.ParticleSystem`

Particle system asset definitions loaded from game data. These define reusable particle effects.

#### Static Methods

- `getAssetStore(): AssetStore` - Returns the asset store containing all particle systems
- `getAssetMap(): DefaultAssetMap` - Returns the asset map for accessing particle systems by ID

#### Asset Properties

When you retrieve a `ParticleSystem` asset from the map, it has these methods:

- `getId(): string` - Gets the particle system ID
- `getLifeSpan(): number` - Gets the lifetime of the particle system in seconds
- `getCullDistance(): number` - Gets the distance at which particles are no longer rendered
- `getBoundingRadius(): number` - Gets the bounding radius used for culling
- `isImportant(): boolean` - Whether this particle system is marked as important (affects rendering priority)

#### Example - Listing Particle Systems

```typescript
// Get all available particle systems
const assetMap = ParticleSystem.getAssetMap();
const map = assetMap.getAssetMap();
const keys = map.keySet();
const iterator = keys.iterator();

while (iterator.hasNext()) {
  const particleId = iterator.next();
  logger.info(`Found particle: ${particleId}`);
}

// Get total count
const total = assetMap.getAssetCount();
logger.info(`Total particles: ${total}`);
```

#### Example - Filtering Particles

```typescript
// Find all particle systems containing "fire" in their ID
const assetMap = ParticleSystem.getAssetMap();
const map = assetMap.getAssetMap();
const keys = map.keySet();
const iterator = keys.iterator();

const fireParticles = [];
while (iterator.hasNext()) {
  const particleId = iterator.next();
  if (particleId.toLowerCase().includes("fire")) {
    fireParticles.push(particleId);
  }
}

logger.info(`Found ${fireParticles.length} fire particles`);
```

---

## Complete Example: Custom Particle Effect on Player Join

```typescript
import { EventListener } from "@hytalejs.com/core";

class ParticlePlugin {
  @EventListener("PlayerConnectEvent")
  onPlayerJoin(event: PlayerConnectEvent): void {
    const playerRef = event.getPlayerRef();
    const transform = playerRef.getTransform();
    const pos = transform.getPosition();

    // Spawn colorful particles above the player
    const position = new Position(pos.getX(), pos.getY() + 2.5, pos.getZ());
    const direction = new Direction(0, 0, 0);

    // Create a cyan color (0, 200, 255)
    let r = 0, g = 200, b = 255;
    if (g > 127) g = g - 256;  // 200 -> -56
    if (b > 127) b = b - 256;  // 255 -> -1
    const cyanColor = new Color(r, g, b);

    const packet = new SpawnParticleSystem(
      "hytale:particles.sparkle",
      position,
      direction,
      1.5,
      cyanColor
    );

    playerRef.getPacketHandler().write(packet);
  }
}
```

---

## Notes

### Coordinate Systems

- **Position**: Uses world coordinates (doubles for precision)
  - X: East (+) / West (-)
  - Y: Up (+) / Down (-)
  - Z: South (+) / North (-)

### Rotation Angles

- **Direction**: All angles in degrees
  - Yaw: Horizontal rotation (0° = North, 90° = East, 180° = South, 270° = West)
  - Pitch: Vertical rotation (-90° = Looking up, 0° = Horizontal, 90° = Looking down)
  - Roll: Tilt rotation (rarely used)

### Color Conversion

Java bytes are signed (-128 to 127), but RGB values use 0-255:
- Values 0-127: Use as-is
- Values 128-255: Subtract 256 to get negative byte value
  - 128 → -128
  - 200 → -56
  - 255 → -1

### Packet Usage

Packets are sent via `PlayerRef.getPacketHandler().write(packet)`. Some packets may be broadcast to multiple players:

```typescript
// Broadcast to all players
const players = Universe.get().getPlayers();
for (let i = 0; i < players.length; i++) {
  players[i].getPacketHandler().write(packet);
}
```
