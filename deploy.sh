#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_DIR="$SCRIPT_DIR/hytale-server"
MODS_DIR="$SERVER_DIR/mods"
LOADER_DIR="$MODS_DIR/HytaleJS"
SCRIPTS_DIR="$LOADER_DIR/scripts"

echo "Building and deploying HytaleJS"

echo "Step 1: Building TypeScript..."
cd "$SCRIPT_DIR/examples/hello-world"
npm run build
echo "TypeScript built"

echo "Step 2: Building loader JAR..."
cd "$SCRIPT_DIR/loader"
./gradlew shadowJar --quiet
echo "Loader JAR built (output: $MODS_DIR/HytaleJS.jar)"

echo "Step 3: Copying demo script..."
mkdir -p "$SCRIPTS_DIR"
cp "$SCRIPT_DIR/examples/hello-world/dist/demo.js" "$SCRIPTS_DIR/"
echo "Demo script deployed"

echo ""
echo "Deployment complete!"
echo ""
echo "File locations:"
echo "  - Loader: $MODS_DIR/HytaleJS.jar"
echo "  - Script: $SCRIPTS_DIR/demo.js"
echo ""
echo "Restart the server to load changes."
