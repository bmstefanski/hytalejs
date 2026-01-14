#!/bin/bash
set -e

echo "Building Hytale TypeScript Plugins Demo..."
echo ""

echo "Step 1: Building Java Loader..."
cd loader
mvn clean package -q
cd ..
echo "✓ Java loader built: loader/target/hytale-typescript-loader.jar"
echo ""

echo "Step 2: Building TypeScript Demo..."
cd examples/hello-world
npm install --silent
npm run build
cd ../..
echo "✓ Demo plugin built: examples/hello-world/dist/demo.js"
echo ""

echo "Build complete!"
echo ""
echo "Next steps:"
echo "1. Copy loader/target/hytale-typescript-loader.jar to your Hytale plugins directory"
echo "2. Create directory: <hytale>/plugins/TypeScriptLoader/scripts/"
echo "3. Copy examples/hello-world/dist/demo.js to the scripts directory"
echo "4. Start your Hytale server"
