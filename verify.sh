#!/bin/bash

echo "Verifying Hytale TypeScript Plugins Project..."
echo ""

errors=0
warnings=0

check_file() {
    if [ -f "$1" ]; then
        echo "✓ $1"
    else
        echo "✗ $1 (missing)"
        errors=$((errors + 1))
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo "✓ $1/"
    else
        echo "✗ $1/ (missing)"
        errors=$((errors + 1))
    fi
}

check_optional() {
    if [ -f "$1" ]; then
        echo "✓ $1"
    else
        echo "⚠ $1 (optional, not built yet)"
        warnings=$((warnings + 1))
    fi
}

echo "Checking project structure..."
echo ""

echo "Documentation:"
check_file "README.md"
check_file "QUICKSTART.md"
check_file "ARCHITECTURE.md"
check_file "PROJECT.md"
echo ""

echo "Build scripts:"
check_file "build.sh"
check_file "deploy.sh"
check_file "verify.sh"
check_file ".gitignore"
echo ""

echo "Java Loader:"
check_file "loader/pom.xml"
check_file "loader/src/main/java/com/hytale/typescript/HytaleScriptLoader.java"
check_file "loader/src/main/java/com/hytale/typescript/ScriptPlayerConnectEvent.java"
check_file "loader/src/main/resources/plugin.json"
check_optional "loader/target/hytale-typescript-loader.jar"
echo ""

echo "TypeScript Template:"
check_file "template/package.json"
check_file "template/tsconfig.json"
check_file "template/src/types.ts"
echo ""

echo "Demo Plugin:"
check_file "examples/hello-world/package.json"
check_file "examples/hello-world/tsconfig.json"
check_file "examples/hello-world/src/demo.ts"
check_file "examples/hello-world/src/types.ts"
check_optional "examples/hello-world/dist/demo.js"
echo ""

echo "Dependencies:"
check_dir "lib"
check_file "lib/README.md"
if [ -f "lib/hytale-server.jar" ]; then
    echo "✓ lib/hytale-server.jar"
else
    echo "⚠ lib/hytale-server.jar (required for build, not included)"
    warnings=$((warnings + 1))
fi
echo ""

echo "Checking executables..."
if [ -x "build.sh" ]; then
    echo "✓ build.sh is executable"
else
    echo "✗ build.sh is not executable"
    errors=$((errors + 1))
fi

if [ -x "deploy.sh" ]; then
    echo "✓ deploy.sh is executable"
else
    echo "✗ deploy.sh is not executable"
    errors=$((errors + 1))
fi
echo ""

echo "Summary:"
echo "  Errors: $errors"
echo "  Warnings: $warnings"
echo ""

if [ $errors -eq 0 ]; then
    echo "✓ Project structure is valid!"
    if [ $warnings -gt 0 ]; then
        echo ""
        echo "To build the project: ./build.sh"
        echo "To deploy: ./deploy.sh <server-path>"
    fi
    exit 0
else
    echo "✗ Project has $errors error(s)!"
    exit 1
fi
