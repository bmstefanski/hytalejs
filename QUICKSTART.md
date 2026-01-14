# Quick Start Guide

Get TypeScript plugins running on Hytale server in 5 minutes.

## Prerequisites

```bash
java -version    # Need Java 21+
mvn -version     # Need Maven 3.8+
node -version    # Need Node.js 18+
```

## Setup

### 1. Add Hytale Server JAR

```bash
mkdir lib
cp /path/to/hytale-server.jar lib/
```

### 2. Build Everything

```bash
chmod +x build.sh
./build.sh
```

### 3. Install on Server

```bash
SERVER_DIR="/path/to/hytale"

cp loader/target/hytale-typescript-loader.jar $SERVER_DIR/plugins/

mkdir -p $SERVER_DIR/plugins/TypeScriptLoader/scripts/
cp examples/hello-world/dist/demo.js $SERVER_DIR/plugins/TypeScriptLoader/scripts/
```

### 4. Start Server

```bash
cd $SERVER_DIR
java -jar hytale-server.jar
```

## Expected Output

On server start:
```
[INFO] [TypeScriptLoader|P] Loading script: demo.js
[INFO] [TypeScriptLoader|P] Registered handler for event: PlayerConnectEvent
[INFO] [TypeScriptLoader|P] TypeScript Loader started with 1 event handlers
```

On player join:
```
[INFO] [TypeScriptLoader|P] Player Steve (UUID: ...) joined world: Overworld
[INFO] [TypeScriptLoader|P] Welcome to the TypeScript plugin demo!
```

## What Just Happened?

1. **Java Loader** (`hytale-typescript-loader.jar`)
   - Loaded by Hytale as a normal plugin
   - Created GraalVM JavaScript runtime
   - Loaded `demo.js` from scripts directory
   - Registered event handlers

2. **TypeScript Plugin** (`demo.js`)
   - Compiled from TypeScript with type safety
   - Uses decorators for clean event handling
   - Accesses Hytale APIs through Java bridge

## Next Steps

See [README.md](README.md) for:
- Creating your own plugins
- Adding more event types
- API reference
- Troubleshooting

## Test Without Server

You can verify builds without a Hytale server:

```bash
./build.sh

ls -lh loader/target/hytale-typescript-loader.jar
ls -lh examples/hello-world/dist/demo.js
```

Both files should exist and have reasonable sizes (JAR: ~1-5MB, JS: ~1-5KB).
