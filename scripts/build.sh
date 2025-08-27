#!/bin/bash
# Build script for the TypeScript playground

echo "Building TypeScript playground..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build all stages
echo "Building all stages..."
npx tsc

echo "Build completed successfully!"