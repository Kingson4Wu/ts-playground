---
sidebar_position: 1
---

# Project Architecture & Structure

This document provides a comprehensive overview of the ts-playground project's architecture, directory structure, and organizational patterns designed to facilitate a progressive learning experience in TypeScript development.

## Comprehensive Directory Structure

```
ts-playground/
├── documentation/                    # Docusaurus-powered documentation website
│   └── website/                    # Documentation source and build files
├── specifications/                   # Detailed project specifications and requirements
│   ├── project_overview.md         # Project purpose and learning objectives
│   ├── project_structure.md        # Detailed structural planning
│   ├── TODO.md                     # Implementation task tracking
│   ├── coding_standards.md         # Detailed coding guidelines
│   ├── git_standards.md            # Git workflow and conventions
│   └── ...                         # Additional specification files
├── stage1-foundations/              # Stage 1: TypeScript fundamentals
│   ├── exercises/                  # Foundational exercises
│   ├── practice/                   # Additional practice implementations
│   ├── tsconfig.json               # Stage-specific TypeScript configuration
│   └── package.json                # Stage-specific dependencies and scripts
├── stage2-cli/                     # Stage 2: Command-line interface development
│   ├── exercises/                  # CLI tool exercises
│   ├── practice/                   # Additional CLI implementations
│   ├── tsconfig.json               # Stage-specific TypeScript configuration
│   └── package.json                # Stage-specific dependencies and scripts
├── stage3-backend/                 # Stage 3: Backend service development
│   ├── exercises/                  # Backend API exercises
│   ├── practice/                   # Advanced backend implementations
│   │   ├── user-api/              # User management API implementation
│   │   ├── todo-service/          # To-Do service implementation
│   │   └── microservices/         # Microservices practice implementations
│   ├── tsconfig.json               # Stage-specific TypeScript configuration
│   └── package.json                # Stage-specific dependencies and scripts
├── stage4-production/              # Stage 4: Production deployment and optimization
│   ├── exercises/                  # Production readiness exercises
│   ├── practice/                   # Production-level implementations
│   ├── tsconfig.json               # Stage-specific TypeScript configuration
│   └── package.json                # Stage-specific dependencies and scripts
├── scripts/                        # Build, deployment, and utility scripts
│   ├── clean_commit.sh            # Commit message sanitization script
│   ├── build.sh                   # Build process automation
│   └── test.sh                    # Test execution scripts
├── .github/                        # GitHub configuration and workflows
│   └── workflows/                  # GitHub Actions for CI/CD
│       ├── ci.yml                 # Continuous integration pipeline
│       └── docs-deploy.yml        # Documentation deployment workflow
├── node_modules/                   # Dependencies (not tracked in repository)
├── package.json                    # Root project configuration and workspace definitions
├── tsconfig.json                   # Root TypeScript compiler configuration
├── jest.config.js                  # Jest testing framework configuration
├── .eslintrc.js                    # ESLint configuration for code quality
├── .prettierrc                     # Prettier configuration for auto-formatting
├── .gitignore                      # Git ignore patterns
├── .npmrc                          # npm configuration
├── README.md                       # Primary project documentation and roadmap
├── AGENTS.md                       # AI tool context and project specification
├── CONTRIBUTING.md                 # Contribution guidelines
├── CODE_OF_CONDUCT.md              # Community standards and behavior expectations
└── LICENSE                         # Project licensing information (MIT)
```

## Learning Stage Architecture

### Stage Organization Pattern

Each learning stage follows a consistent architectural pattern:

```
stageN-name/
├── exercises/                      # Structured learning exercises with specifications
│   ├── exercise-name-1/           # Specific exercise with implementation files
│   ├── exercise-name-2/           # Another exercise implementation
│   └── README.md                  # Exercise descriptions and requirements
├── practice/                       # Open-ended practice implementations
│   ├── implementation-1/          # Student-created practice projects
│   └── README.md                  # Practice project guidelines
├── tests/                          # Stage-specific unit and integration tests
│   ├── unit/                      # Unit tests for individual components
│   └── integration/               # Integration tests for system behavior
├── tsconfig.json                   # Stage-specific TypeScript compilation options
├── package.json                    # Stage-specific dependencies and scripts
├── README.md                       # Stage overview, objectives, and deliverables
└── .prettierrc                     # Stage-specific formatting overrides (if needed)
```

## Workspace Configuration

The project utilizes npm workspaces for modular development:

**Root package.json:**
```json
{
  "name": "ts-playground",
  "workspaces": [
    "stage1-foundations",
    "stage2-cli",
    "stage2-cli/exercises/*",
    "stage3-backend",
    "stage3-backend/exercises/*",
    "stage4-production",
    "stage4-production/exercises/*"
  ]
}
```

This enables efficient dependency management and command execution across all stages simultaneously.

## Configuration Architecture

### TypeScript Configuration Hierarchy

```
tsconfig.json (root)          # Base configuration with shared compiler options
├── stage1-foundations/
│   └── tsconfig.json         # Extends root config with stage-specific options
├── stage2-cli/
│   └── tsconfig.json         # Extends root config with CLI-specific options
└── stage3-backend/
    └── tsconfig.json         # Extends root config with backend-specific options
```

### Linting and Formatting Chain

- **ESLint**: Code quality, style, and security linting with TypeScript support
- **Prettier**: Automated code formatting with consistent style across the project
- **EditorConfig**: Editor behavior consistency across different IDEs

## Documentation and Specifications Integration

### Specification Files Purpose

The `specifications/` directory contains detailed requirements and standards:

- `project_overview.md`: Comprehensive project purpose and learning pathway
- `coding_standards.md`: Detailed TypeScript coding conventions
- `git_standards.md`: Professional Git workflow and commit message standards
- `development_conventions.md`: Implementation conventions and best practices
- `TODO.md`: Task tracking and completion criteria

### Alignment with Learning Objectives

Each specification document directly supports the four-stage learning progression:
1. **Foundations** → Basic TypeScript mastery
2. **CLI Development** → Practical tool building
3. **Backend Development** → Server-side TypeScript applications
4. **Production** → Deployment and optimization

This architectural approach ensures consistency, scalability, and professional development practices throughout the learning experience.