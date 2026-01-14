# Hytale TypeScript Plugins

Minimal working demo of TypeScript plugins for Hytale server using GraalVM.

## Overview

This project proves that TypeScript can run on the official Hytale server by:
1. Using GraalVM Polyglot API to execute JavaScript in Java
2. Compiling TypeScript to JavaScript
3. Bridging Hytale events (like PlayerConnectEvent) to JavaScript handlers
4. Providing type-safe TypeScript definitions for Hytale APIs

## Project Structure

```
hytale-typescript-plugins/
├── loader/                          # Java plugin that loads JS files
│   ├── src/main/java/
│   │   └── com/hytale/typescript/
│   │       ├── HytaleScriptLoader.java           # Main loader class
│   │       └── ScriptPlayerConnectEvent.java     # Event wrapper
│   ├── src/main/resources/
│   │   └── plugin.json              # Plugin manifest
│   └── pom.xml                      # Maven configuration
├── template/                        # Reusable TypeScript template
│   ├── src/
│   │   └── types.ts                 # Type definitions & decorators
│   ├── package.json
│   └── tsconfig.json
├── examples/
│   └── hello-world/                 # Demo plugin
│       ├── src/
│       │   ├── demo.ts              # Main plugin code
│       │   └── types.ts             # Type definitions
│       ├── package.json
│       └── tsconfig.json
└── lib/                             # Place Hytale server JAR here
```

## Prerequisites

1. **Java 21+** with GraalVM support
2. **Maven 3.8+** for building the loader
3. **Node.js 18+** and npm for TypeScript compilation
4. **Hytale Server JAR** (decompiled or official)

## Setup Instructions

### Step 1: Prepare Dependencies

Create a `lib` directory and place the Hytale server JAR:

```bash
mkdir -p lib
cp /path/to/hytale-server.jar lib/
```

### Step 2: Build the Java Loader

```bash
cd loader
mvn clean package
cd ..
```

This creates `loader/target/hytale-typescript-loader.jar`

### Step 3: Build the Demo Plugin

```bash
cd examples/hello-world
npm install
npm run build
cd ../..
```

This creates `examples/hello-world/dist/demo.js`

### Step 4: Install on Hytale Server

1. Copy the loader JAR to your Hytale plugins directory:
   ```bash
   cp loader/target/hytale-typescript-loader.jar /path/to/hytale/plugins/
   ```

2. Create scripts directory and copy the demo:
   ```bash
   mkdir -p /path/to/hytale/plugins/TypeScriptLoader/scripts/
   cp examples/hello-world/dist/demo.js /path/to/hytale/plugins/TypeScriptLoader/scripts/
   ```

### Step 5: Run the Server

Start your Hytale server. You should see:

```
[INFO] [TypeScriptLoader|P] Loading script: demo.js
[INFO] [TypeScriptLoader|P] Registered handler for event: PlayerConnectEvent
[INFO] [TypeScriptLoader|P] Successfully loaded script: demo.js
[INFO] [TypeScriptLoader|P] TypeScript Loader started with 1 event handlers
```

When a player joins:

```
[INFO] [TypeScriptLoader|P] Player Steve (UUID: 123e4567-e89b-12d3-a456-426614174000) joined world: Overworld
[INFO] [TypeScriptLoader|P] Welcome to the TypeScript plugin demo!
```

## How It Works

### 1. Java Loader (`HytaleScriptLoader`)

- Extends `JavaPlugin` from Hytale API
- Creates GraalVM JavaScript context with host access
- Loads all `.js` files from `scripts/` directory
- Registers Java event listeners
- Bridges events to JavaScript handlers

### 2. TypeScript Decorator (`@EventListener`)

```typescript
@EventListener('PlayerConnectEvent')
onPlayerJoin(event: PlayerConnectEvent): void {
  const playerName = event.getPlayerName();
  logger.at(LogLevel.INFO).log('Player %s joined!', playerName);
}
```

The decorator collects handlers into an exported `handlers` array that the Java loader reads.

### 3. Event Flow

```
Hytale Server
  → PlayerConnectEvent fired
    → HytaleScriptLoader.onPlayerConnect()
      → Wraps event in ScriptPlayerConnectEvent
        → Executes JavaScript handler.callback()
          → Your TypeScript code runs!
```

## Creating Your Own Plugin

1. Copy the template:
   ```bash
   cp -r template my-plugin
   cd my-plugin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your plugin in `src/index.ts`:
   ```typescript
   import { PlayerConnectEvent, EventListener, handlers, logger, LogLevel } from './types';

   class MyPlugin {
     @EventListener('PlayerConnectEvent')
     onPlayerJoin(event: PlayerConnectEvent): void {
       logger.at(LogLevel.INFO).log('Hello from TypeScript!');
     }
   }

   new MyPlugin();
   export { handlers };
   ```

4. Build and deploy:
   ```bash
   npm run build
   cp dist/index.js /path/to/hytale/plugins/TypeScriptLoader/scripts/
   ```

## Adding More Event Types

To support additional Hytale events:

1. Add event wrapper in Java:
   ```java
   public class ScriptPlayerChatEvent {
       private final PlayerChatEvent event;
       public String getMessage() { return event.getMessage(); }
   }
   ```

2. Register listener in `HytaleScriptLoader`:
   ```java
   getEventRegistry().register(PlayerChatEvent.class, this::onPlayerChat);
   ```

3. Add TypeScript types:
   ```typescript
   export interface PlayerChatEvent {
     getMessage(): string;
   }
   ```

## Troubleshooting

### "Script failed to load"
- Check that TypeScript compiled successfully (`npm run build`)
- Verify the JS file is valid JavaScript
- Check server logs for detailed error messages

### "No event handlers registered"
- Ensure your class is instantiated: `new MyPlugin()`
- Verify `handlers` array is exported
- Check decorator is applied correctly

### "ClassNotFoundException"
- Verify GraalVM dependencies are included in the JAR
- Check Maven shade plugin configuration
- Ensure Java 21+ with GraalVM is being used

### "Event not firing"
- Verify event name matches exactly (case-sensitive)
- Check that Hytale event is actually being triggered
- Review event flow in server logs

## Performance Considerations

- JavaScript execution via GraalVM has minimal overhead
- Event handlers are executed synchronously on the main thread
- For heavy operations, consider using Hytale's TaskRegistry for async work

## Limitations

- Currently only supports PlayerConnectEvent (easily extensible)
- Decorators require `experimentalDecorators` TypeScript flag
- GraalVM JS context is shared across all scripts
- No hot-reload support (requires server restart)

## Future Enhancements

- Support for more Hytale events
- NPM package for type definitions
- Hot-reload capability
- Async event handlers
- Inter-script communication API
- TypeScript source map support for debugging

## License

MIT

## Contributing

This is a proof-of-concept. Contributions welcome!
