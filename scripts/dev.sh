#!/bin/bash
# Development script for the TypeScript playground

echo "Starting development mode..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start development server
echo "Starting development server..."
npx tsx watch