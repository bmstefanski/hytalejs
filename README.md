# HytaleJS

TypeScript/JavaScript scripting for Hytale servers. Write plugins with full type safety, autocomplete, and a familiar development experience.

> [!WARNING]
> This project is experimental. APIs may change as we work towards stability.

> [!NOTE]
> Full documentation at [hytalejs.com](https://hytalejs.com) · Demo server: `play.hytalejs.com`

## Features

- 🎯 **TypeScript Support** - Full type safety and IDE autocomplete
- 🎮 **Event System** - 30+ events for player actions, world changes, and server lifecycle
- 💬 **Commands** - Custom commands with permissions and integration with native /help command
- ⏰ **Scheduler** - Delayed and repeating tasks
- 🔊 **Sound API** - Play sounds to players
- 📦 **Direct Java Bindings** - Access the full Hytale server API

## Documentation

📚 **[Complete API Documentation](docs/API.md)** - Detailed reference for all APIs with examples

## Supported APIs

### Core APIs
- [x] **Universe** - Server universe and world management
- [x] **HytaleServer** - Server instance and controls
- [x] **Message** - Chat message creation and formatting
- [x] **Player** - Player manipulation and queries
- [x] **World** - World manipulation and queries

### Items & Inventory
- [x] **ItemStack** - Item stack creation and manipulation
- [x] **Item** - Item type information and asset access

### Math & Geometry
- [x] **Vector3i**, **Vector3f**, **Vector3d** - 3D vectors
- [x] **Vector2i**, **Vector2d**, **Vector2f** - 2D vectors
- [x] **Transform** - Position and rotation transforms
- [x] **Position** - 3D world positions for packets
- [x] **Direction** - Rotation angles (yaw, pitch, roll)
- [x] **Box** - Axis-aligned bounding boxes
- [x] **Cylinder** - Cylindrical shapes

### Graphics
- [x] **Color** - RGB color values
- [x] **ColorLight** - RGBA light colors

### Lighting
- [x] **DynamicLight** - Dynamic light component for entities
- [x] **PersistentDynamicLight** - Persistent dynamic light component (saved across restarts)

### Audio
- [x] **SoundEvent** - Sound event definitions
- [x] **SoundCategory** - Sound categories (Music, Ambient, SFX, UI)
- [x] **PlaySoundEvent2D** - 2D sound playback packets
- [x] **PlaySoundEvent3D** - 3D positional sound playback packets
- [x] **PlaySoundEventEntity** - Entity-attached sound playback packets

### Particles
- [x] **SpawnParticleSystem** - Spawn particle systems in the world

### Utilities
- [x] **logger** - Server logging
- [x] **commands** - Command registration
- [x] **scheduler** - Task scheduling (delayed, repeating)

## Quick Example

```typescript
import { EventListener, Colors } from "@hytalejs.com/core";

class MyPlugin {
  @EventListener("PlayerConnectEvent")
  onJoin(event: PlayerConnectEvent) {
    event.getPlayer().sendMessage(Message.raw("Welcome!").color(Colors.GREEN).bold(true));
  }
}

commands.register("countdown", "Start a countdown", (ctx) => {
  let count = 3;
  const task = scheduler.runRepeating(
    () => {
      if (count > 0) Universe.get().sendMessage(Message.raw(count-- + "..."));
      else {
        Universe.get().sendMessage(Message.raw("Go!").color(Colors.GREEN));
        task.cancel();
      }
    },
    0,
    1000,
  );
});
```

## Setup

### Server

1. Download `HytaleJS.jar` from [releases](https://github.com/bmstefanski/HytaleJS/releases)
2. Copy to `hytale-server/mods/`
3. Start your server - scripts folder will be created at `mods/bmstefanski_HytaleJS/scripts/`

### Development

```bash
mkdir my-plugin && cd my-plugin
npm init -y
npm install @hytalejs.com/core
npm install -D typescript esbuild
```

Build your TypeScript to JavaScript and copy to the scripts folder.

See [`examples/kitchensink`](examples/kitchensink) for a complete working setup with esbuild bundling and all features demonstrated.

## Tech Stack

- **GraalJS** - JavaScript runtime for JVM
- **TypeScript** - Type definitions & utilities for Hytale API
- **esbuild** - Fast bundling for plugins

## License

MIT
