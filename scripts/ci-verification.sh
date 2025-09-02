#!/bin/bash

# Script to run all CI commands for verification
# This script can be used as part of the task completion acceptance criteria

echo "Running CI verification checks..."

# Check code formatting
echo "1. Checking code formatting..."
npm run format:check --workspaces=false
if [ $? -ne 0 ]; then
  echo "❌ Code formatting check failed"
  exit 1
fi
echo "✅ Code formatting check passed"

# Run ESLint
echo "2. Running ESLint..."
npm run lint --workspaces=false
if [ $? -ne 0 ]; then
  echo "❌ ESLint check failed"
  exit 1
fi
echo "✅ ESLint check passed"

# Build root project
echo "3. Building root project..."
npm run build --workspaces=false
if [ $? -ne 0 ]; then
  echo "❌ Root project build failed"
  exit 1
fi
echo "✅ Root project build passed"

# Build all workspaces
echo "4. Building all workspaces..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Workspace builds failed"
  exit 1
fi
echo "✅ All workspace builds passed"

# Run tests for all workspaces
echo "5. Running tests for all workspaces..."
npm test
if [ $? -ne 0 ]; then
  echo "❌ Tests failed"
  exit 1
fi
echo "✅ All tests passed"

echo "🎉 All CI verification checks passed!"