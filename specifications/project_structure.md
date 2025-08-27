# TypeScript Learning Playground - Project Structure

This document outlines the planned project structure and organization for the TypeScript learning playground, following the four-stage learning pathway.

## Overall Directory Structure

```
ts-playground/
├── .gitignore
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── PROJECT.md
├── package.json
├── tsconfig.json
├── .editorconfig
├── .eslintrc.js
├── .npmrc
├── .prettierrc
├── .github/
│   └── workflows/
│       └── ci.yml
├── .husky/
│   └── pre-commit
├── jest.config.js
├── specifications/
│   ├── TODO.md
│   ├── project_structure.md
│   └── coding_standards.md
├── scripts/
│   ├── build.sh
│   ├── dev.sh
│   └── test.sh
├── stage1-foundations/
│   ├── tsconfig.json
│   ├── exercises/
│   │   ├── calculator/
│   │   │   ├── index.ts
│   │   │   └── calculator.ts
│   │   ├── password-generator/
│   │   │   ├── index.ts
│   │   │   └── password-generator.ts
│   │   └── file-processor/
│   │       ├── index.ts
│   │       └── file-processor.ts
│   └── practice/
│       └── playground.ts
├── stage2-cli/
│   ├── tsconfig.json
│   ├── package.json
│   ├── exercises/
│   │   ├── file-renamer/
│   │   │   ├── src/
│   │   │   │   ├── index.ts
│   │   │   │   └── renamer.ts
│   │   │   ├── tests/
│   │   │   │   └── renamer.test.ts
│   │   │   ├── package.json
│   │   │   └── README.md
│   │   ├── data-converter/
│   │   │   ├── src/
│   │   │   │   ├── index.ts
│   │   │   │   └── converter.ts
│   │   │   ├── tests/
│   │   │   │   └── converter.test.ts
│   │   │   ├── package.json
│   │   │   └── README.md
│   │   └── npm-publisher/
│   │       ├── src/
│   │       │   ├── index.ts
│   │       │   └── publisher.ts
│   │       ├── tests/
│   │       │   └── publisher.test.ts
│   │       ├── package.json
│   │       └── README.md
│   └── practice/
│       └── playground.ts
├── stage3-backend/
│   ├── tsconfig.json
│   ├── package.json
│   ├── shared/
│   │   └── types/
│   │       └── index.ts
│   ├── exercises/
│   │   ├── user-api/
│   │   │   ├── src/
│   │   │   │   ├── index.ts
│   │   │   │   ├── routes/
│   │   │   │   │   └── users.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── userService.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── user.ts
│   │   │   │   └── utils/
│   │   │   │       └── database.ts
│   │   │   ├── tests/
│   │   │   │   └── user.test.ts
│   │   │   ├── package.json
│   │   │   └── README.md
│   │   ├── todo-service/
│   │   │   ├── src/
│   │   │   │   ├── index.ts
│   │   │   │   ├── routes/
│   │   │   │   │   └── todos.ts
│   │   │   │   ├── services/
│   │   │   │   │   └── todoService.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── todo.ts
│   │   │   │   └── utils/
│   │   │   │       └── database.ts
│   │   │   ├── tests/
│   │   │   │   └── todo.test.ts
│   │   │   ├── package.json
│   │   │   └── README.md
│   │   └── microservices/
│   │       ├── service-a/
│   │       │   ├── src/
│   │       │   │   ├── index.ts
│   │       │   │   └── service.ts
│   │       │   ├── tests/
│   │       │   │   └── service.test.ts
│   │       │   ├── package.json
│   │       │   └── README.md
│   │       └── service-b/
│   │           ├── src/
│   │           │   ├── index.ts
│   │           │   └── service.ts
│   │           ├── tests/
│   │           │   └── service.test.ts
│   │           ├── package.json
│   │           └── README.md
│   └── practice/
│       └── playground.ts
├── stage4-production/
│   ├── tsconfig.json
│   ├── package.json
│   ├── exercises/
│   │   ├── dockerized-app/
│   │   │   ├── src/
│   │   │   │   ├── index.ts
│   │   │   │   └── app.ts
│   │   │   ├── Dockerfile
│   │   │   ├── docker-compose.yml
│   │   │   ├── package.json
│   │   │   └── README.md
│   │   └── performance-monitor/
│   │       ├── src/
│   │       │   ├── index.ts
│   │       │   ├── monitor.ts
│   │       │   └── logger.ts
│   │       ├── tests/
│   │       │   └── monitor.test.ts
│   │       ├── package.json
│   │       └── README.md
│   └── practice/
│       └── playground.ts
└── tests/
    ├── setup.ts
    └── global.test.ts
```

## Directory Descriptions

### Root Level

- `.gitignore`: Git ignore patterns for TypeScript/Node.js projects
- `LICENSE`: MIT License file
- `README.md`: Main documentation with learning pathway
- `PROJECT.md`: Project specification and context file for AI tools
- `package.json`: Root package configuration with workspace definitions
- `tsconfig.json`: Base TypeScript configuration
- `.eslintrc.js`: ESLint configuration for code quality
- `.prettierrc`: Prettier configuration for code formatting

### Stage Directories

Each stage (1-4) has its own directory with:

- `tsconfig.json`: Stage-specific TypeScript configuration
- `package.json`: Stage-specific dependencies (if needed)
- `exercises/`: Contains all practice exercises for that stage
- `practice/`: Playground for experimentation

### Exercise Structure

Each exercise follows a consistent structure:

- `src/`: Source code
- `tests/`: Test files
- `package.json`: Exercise-specific dependencies
- `README.md`: Exercise documentation
- Additional files as needed (Dockerfile, etc.)

## File Naming Conventions

1. **TypeScript Files**: Use kebab-case for file names (e.g., `user-service.ts`)
2. **Test Files**: Use the same name as the source file with `.test.ts` suffix (e.g., `user-service.test.ts`)
3. **Index Files**: Use `index.ts` for entry points
4. **Configuration Files**: Use standard names (`.eslintrc.js`, `tsconfig.json`, etc.)

## Module Organization

1. **ES Modules**: Use ES module syntax (`import`/`export`) throughout
2. **Barrel Exports**: Use `index.ts` files for barrel exports in directories
3. **Relative Imports**: Use relative paths for local imports
4. **Absolute Imports**: Configure path aliases for shared modules when appropriate
