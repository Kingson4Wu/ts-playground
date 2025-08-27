#!/bin/bash
# Test script for the TypeScript playground

echo "Running tests..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run tests
echo "Executing test suite..."
npx jest

echo "Tests completed!"