---
sidebar_position: 3
title: "Environment Setup"
description: "Complete guide to setting up your TypeScript development environment for the ts-playground learning path. Professional setup instructions for TypeScript mastery."
keywords: [typescript setup, development environment, node.js, npm, typescript configuration, learning environment]
---

# Environment Setup

This comprehensive guide provides step-by-step instructions for establishing a professional development environment for the ts-playground project. Follow these instructions to set up your environment for the complete TypeScript learning journey.

## System Requirements

Before beginning the setup process, ensure your development environment meets the following requirements:

### Essential Dependencies
- **Node.js** (version 18.0 or higher) - JavaScript runtime environment
- **npm** (version 9.0 or higher) or **Yarn** - Package management
- **Git** (version 2.0 or higher) - Version control system
- **A modern code editor** with TypeScript support (Visual Studio Code recommended)

### Recommended Development Environment
- **Operating System**: macOS, Linux, or Windows 10/11 with WSL2 (for Windows users)
- **Minimum RAM**: 8GB (16GB recommended for optimal performance)
- **Available Disk Space**: 2GB for dependencies and build artifacts

## Initial Project Setup

### 1. Repository Acquisition

Clone the repository to your local development environment:

```bash
git clone https://github.com/Kingson4Wu/ts-playground.git
cd ts-playground
```

### 2. Dependency Installation

Install all project dependencies and development tools:

```bash
npm install
```

### 3. Environment Validation

Verify that your environment is correctly configured:

```bash
npm run build
```

Successful execution indicates proper setup with no compilation errors.

## Development Environment Configuration

### Editor Integration

The project includes comprehensive configuration for consistent development experiences:

- `.editorconfig`: Ensures consistent code formatting across different editors
- `.eslintrc.js`: Code quality and style enforcement rules
- `.prettierrc`: Automated code formatting configuration
- `tsconfig.json`: Comprehensive TypeScript compiler settings
- `.vscode/`: Recommended VS Code settings and extensions

### Available Command Scripts

Execute the following commands from the project root directory:

**Build & Compilation:**
- `npm run build`: Compile all TypeScript files to JavaScript
- `npm run dev`: Start development mode with file watching and hot reload

**Quality Assurance:**
- `npm run lint`: Run ESLint for code quality analysis
- `npm run lint:fix`: Automatically fix linting issues where possible
- `npm run format`: Apply Prettier formatting to all files
- `npm run format:check`: Check formatting without applying changes

**Testing:**
- `npm run test`: Execute all tests across all stages
- `npm run test:stage1`: Run tests for Stage 1 only
- `npm run test:stage2`: Run tests for Stage 2 only
- `npm run test:stage3`: Run tests for Stage 3 only
- `npm run test:stage4`: Run tests for Stage 4 only

**Documentation:**
- `npm run docs:dev`: Start local documentation server
- `npm run docs:build`: Build production documentation bundle

## Stage-Specific Development

The project follows a modular architecture with stage-specific workspaces:

```bash
# Navigate to specific stage directory
cd stage1-foundations

# Install stage-specific dependencies (if needed)
npm install

# Run stage-specific tests
npm test
```

Each stage operates as an independent workspace while maintaining project-wide consistency through shared configuration.

## Documentation Development

This documentation site is built using Docusaurus and can be developed locally:

```bash
cd documentation/website
npm start
```

The development server will be accessible at `http://localhost:3000` with hot-reload functionality.

## Troubleshooting

If you encounter issues during setup:

1. **Dependency Conflicts**: Clear npm cache with `npm cache clean --force` and reinstall dependencies
2. **Permission Issues**: Ensure Node.js and npm are installed with proper user permissions
3. **Build Failures**: Check TypeScript configuration and ensure all dependencies are correctly installed
4. **Git Integration**: Verify Git configuration and authentication with remote repositories

## Next Steps

With your development environment properly configured, proceed to the [Development Conventions](./conventions) section to understand project standards and best practices.