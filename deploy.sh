#!/bin/bash
set -e

if [ -z "$1" ]; then
    echo "Usage: ./deploy.sh <hytale-server-directory>"
    echo ""
    echo "Example: ./deploy.sh /path/to/hytale-server"
    exit 1
fi

SERVER_DIR="$1"
PLUGINS_DIR="$SERVER_DIR/plugins"
LOADER_DIR="$PLUGINS_DIR/TypeScriptLoader"
SCRIPTS_DIR="$LOADER_DIR/scripts"

if [ ! -d "$SERVER_DIR" ]; then
    echo "Error: Server directory does not exist: $SERVER_DIR"
    exit 1
fi

echo "Deploying to: $SERVER_DIR"
echo ""

echo "Step 1: Creating directories..."
mkdir -p "$PLUGINS_DIR"
mkdir -p "$SCRIPTS_DIR"
echo "✓ Directories created"
echo ""

echo "Step 2: Copying loader JAR..."
if [ ! -f "loader/target/hytale-typescript-loader.jar" ]; then
    echo "Error: Loader JAR not found. Run ./build.sh first."
    exit 1
fi
cp loader/target/hytale-typescript-loader.jar "$PLUGINS_DIR/"
echo "✓ Loader deployed"
echo ""

echo "Step 3: Copying demo script..."
if [ ! -f "examples/hello-world/dist/demo.js" ]; then
    echo "Error: Demo script not found. Run ./build.sh first."
    exit 1
fi
cp examples/hello-world/dist/demo.js "$SCRIPTS_DIR/"
echo "✓ Demo script deployed"
echo ""

echo "Deployment complete!"
echo ""
echo "File locations:"
echo "  - Loader: $PLUGINS_DIR/hytale-typescript-loader.jar"
echo "  - Script: $SCRIPTS_DIR/demo.js"
echo ""
echo "Start your Hytale server to test the plugin."
