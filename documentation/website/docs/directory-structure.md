---
sidebar_position: 2
---

# Directory Architecture & Component Reference

This document provides a comprehensive reference of the ts-playground project's directory architecture, detailing the organization, purpose, and professional standards for each component within the learning environment.

## Core Infrastructure Directories

### `documentation/` - Technical Documentation Hub
- **Purpose**: Houses the complete Docusaurus-generated documentation website
- **Subdirectories**:
  - `website/` - Docusaurus source files, configuration, and static assets
  - `website/docs/` - Organized documentation aligned with learning stages
- **Deployment**: Automatically deployed to GitHub Pages via CI/CD pipeline

### `specifications/` - Professional Standards Repository
- **Purpose**: Repository of detailed technical specifications, requirements, and development standards
- **Key Components**:
  - Requirements definitions and acceptance criteria
  - Professional development conventions and best practices
  - Learning objectives and completion standards
  - Git workflow and commit message specifications

## Learning Stage Architecture

### `stage1-foundations/` - TypeScript Fundamentals
- **Focus**: Core TypeScript syntax, type system, and foundational concepts
- **Structure**: Progressive exercises from basic syntax to advanced type manipulation
- **Standards**: Emphasis on type safety, interfaces, and generic programming

### `stage2-cli/` - Command-Line Interface Development
- **Focus**: Building robust CLI applications with Node.js and TypeScript
- **Structure**: Tool development, package publishing, and system integration exercises
- **Standards**: Professional CLI architecture, user experience, and npm ecosystem integration

### `stage3-backend/` - Backend Service Development
- **Focus**: Type-safe backend services with API design and database integration
- **Structure**: RESTful API development, ORM integration, and authentication systems
- **Standards**: Security best practices, API design principles, and database interaction patterns

### `stage4-production/` - Production Deployment & Optimization
- **Focus**: Production readiness, deployment strategies, and performance optimization
- **Structure**: Containerization, monitoring, and professional deployment patterns
- **Standards**: Observability, security, performance, and operational excellence

## Development Tooling & Automation

### `scripts/` - Build & Automation Scripts
- **Purpose**: Contains professional-grade scripts for development automation
- **Components**:
  - `clean_commit.sh` - Git commit message sanitization and formatting
  - Build, test, and deployment automation scripts
  - Code quality and consistency enforcement tools

### `.github/` - CI/CD Configuration
- **Purpose**: GitHub Actions workflows for continuous integration and deployment
- **Key Workflows**:
  - `ci.yml` - Automated testing, linting, and build verification
  - `docs-deploy.yml` - Automated documentation deployment to GitHub Pages

## Configuration & Standards Framework

### Root-Level Configuration Files

**Project Management:**
- `package.json` - Root configuration with workspace definitions, dependencies, and standardized scripts
  - Defines npm workspaces for modular development
  - Contains uniform scripts across all learning stages
  - Specifies project metadata and dependencies

**TypeScript Infrastructure:**
- `tsconfig.json` - Centralized TypeScript compiler configuration with strict settings
  - Enforces `strict: true` compilation mode
  - Defines module resolution and output configurations
  - Serves as base configuration extended by stage-specific options

**Code Quality Pipeline:**
- `.eslintrc.js` - Comprehensive ESLint configuration for code quality enforcement
  - TypeScript-specific linting rules
  - Security and performance rule sets
  - Style and consistency enforcement
- `.prettierrc` - Automated code formatting configuration for consistent style
  - TypeScript and JavaScript formatting standards
  - Multi-editor compatibility settings
- `.editorconfig` - Cross-editor consistency configuration

### Stage-Specific Architecture

Each learning stage follows the standardized architectural pattern:

```
stageN-name/
├── exercises/                    # Structured learning exercises with specifications
│   ├── exercise-name/           # Individual exercise with requirements
│   ├── src/                     # Exercise source code directory
│   ├── tests/                   # Exercise-specific test files
│   └── README.md                # Exercise objectives and completion criteria
├── practice/                     # Open-ended implementation projects
│   ├── project-name/            # Individual practice implementation
│   └── README.md                # Practice project guidelines
├── tsconfig.json                 # Stage-specific TypeScript compiler options
│   # Extends root configuration with stage-specific overrides
├── package.json                  # Stage-specific dependencies and scripts
│   # Inherited from workspace architecture with stage-specific additions
├── tests/                        # Stage-wide integration and validation tests
└── README.md                     # Stage overview, objectives, and deliverables
```

## Professional Development Standards

### Directory Naming Conventions
- **Lowercase with hyphens**: `stage1-foundations`, `my-cli-tool`
- **Consistent structure**: Each stage follows identical subdirectory patterns
- **Descriptive names**: Directory names clearly indicate purpose and scope

### File Organization Principles
- **Single Responsibility**: Each directory has a clearly defined purpose
- **Logical Grouping**: Related functionality grouped within appropriate directories
- **Scalable Structure**: Architecture supports growth and addition of new components

This professional directory architecture ensures consistency, maintainability, and scalability across all stages of the TypeScript learning journey.