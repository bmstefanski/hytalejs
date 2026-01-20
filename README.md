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

## Supported APIs

HytaleJS provides bindings to all major Hytale APIs (528+ supported APIs) including:

- Server management, events, commands, and task scheduling
- Players, entities, components, and stats
- World manipulation, blocks, and prefabs
- Combat, interactions, abilities, and effects
- Items, inventory, and crafting
- Audio, particles, and lighting
- Physics, collision, and movement
- UI, cosmetics, and camera control
- Networking, access control, and internationalization
- Math utilities and geometry

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

- **Javet (V8)** - JavaScript runtime for JVM
- **TypeScript** - Type definitions & utilities for Hytale API
- **esbuild** - Fast bundling for plugins

## License

MIT
