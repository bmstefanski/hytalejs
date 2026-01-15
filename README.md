# HytaleJS

TypeScript/JavaScript scripting for Hytale servers. Write plugins in TypeScript, compile to JavaScript, and run them on your Hytale server.

## Features

- Event listeners with decorators
- Command registration with permissions
- Full access to Hytale server API
- TypeScript type definitions for autocomplete

## Quick Start

1. Build the loader:

```bash
cd loader
./gradlew shadowJar
```

2. Build the example plugin:

```bash
cd examples/hello-world
npm install
npm run build
```

3. Deploy:

```bash
./deploy.sh
```

4. Start your Hytale server

## Project Structure

```
HytaleJS/
├── loader/                 # Java plugin that loads JS scripts
├── examples/hello-world/   # Example TypeScript plugin
├── hytale-server/          # Hytale server (for development)
└── lib/                    # HytaleServer.jar for compilation
```

## Writing Plugins

See `examples/hello-world/src/demo.ts` for a complete example.

```typescript
import { EventListener, handlers } from './types';

class MyPlugin {
  @EventListener("PlayerConnectEvent")
  onPlayerJoin(event: PlayerConnectEvent): void {
    const player = event.getPlayer();
    player.sendMessage(Message.create("Welcome!").color(Colors.GREEN));
  }
}

new MyPlugin();

commands.register("hello", "Say hello", (ctx) => {
  ctx.sendMessage("Hello, " + ctx.getSenderName() + "!");
});
```

## License

MIT
