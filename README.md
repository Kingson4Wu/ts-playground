# TypeScript Learning Playground

[![CI/CD Pipeline](https://github.com/your-username/ts-playground/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/ts-playground/actions/workflows/ci.yml)

This repository serves as a structured learning environment and documentation hub for systematically mastering TypeScript, particularly for developers with a backend background. The goal is to gain proficiency in TypeScript's type system and apply it to building command-line interfaces (CLI) and backend services using Node.js.

## Learning Pathway

The learning journey is divided into four progressive stages, each focusing on specific skills and culminating in practical project exercises.

### Stage 1: Core TypeScript Fundamentals

**Objective:** Gain a solid understanding of TypeScript's core syntax and type system.

**Topics Covered:**

- **Variables and Types:** `let/const`, primitive types (`number`, `string`, `boolean`), `any`, `unknown`, arrays, tuples, enums, union types, intersection types, type assertions, and type inference.
- **Functions and Interfaces:** Function parameter and return types, optional/default parameters, defining contracts with `interface` and `type` aliases, function types.
- **Classes and OOP:** Class definitions, inheritance, access modifiers (`public`, `private`, `protected`), abstract classes, implementing interfaces, static members, getters/setters.
- **Advanced Types:** Generics (functions, classes, interfaces), conditional types, mapped types, indexed access types.
- **Modules:** ES Module syntax (`import`/`export`), understanding module resolution in Node.js.

**Practice Exercises:**

- Simple CLI Calculator
- Random Password Generator
- File Content Processing Script

### Stage 2: Command-Line Interface (CLI) Development

**Objective:** Develop CLI tools in TypeScript and understand the process of packaging and publishing them via npm.

**Topics Covered:**

- **Node.js CLI Basics:** Parsing command-line arguments (`process.argv`), console output, asynchronous file system operations (`fs/promises`).
- **CLI Frameworks:** Using libraries like `commander` or `yargs` for argument parsing and subcommands, `chalk` for colored output, `inquirer` for interactive prompts.
- **TypeScript Project Configuration:** `tsconfig.json` setup, `npm scripts` for compilation and bundling, understanding declaration files (`.d.ts`).
- **Publishing:** The `npm publish` workflow, installing and running tools globally (`npm i -g`) or via `npx`.

**Practice Exercises:**

- Batch File Renaming Tool
- JSON/CSV Data Conversion Utility
- Publishing a Simple CLI Tool to npm

### Stage 3: Backend API Development

**Objective:** Build robust backend services using TypeScript with Node.js, integrating databases and ensuring type safety across the stack.

**Topics Covered:**

- **Node.js Frameworks:** Building APIs with `express` or `fastify`.
- **HTTP Fundamentals:** Handling GET, POST, PUT, DELETE requests, parsing JSON requests/responses, middleware patterns.
- **Database Integration:** Performing CRUD operations using ORMs like `TypeORM` or `Prisma`, mapping database records to TypeScript types.
- **Type Safety Practices:** Defining interfaces for API requests/responses (DTOs) to ensure consistency between client and server.
- **Project Structure:** Organizing code into layers (routes, services, models), testing strategies (`Jest`, `vitest`).
- **Development Workflow:** Compiling TypeScript (`tsc`) and running the application.

**Practice Exercises:**

- User Management RESTful API (CRUD)
- To-Do List Service with Database
- Simulated Microservices Interaction
- Small GraphQL API Implementation

### Stage 4: Production Readiness & Optimization

**Objective:** Prepare TypeScript applications for production environments by focusing on performance, monitoring, deployment, and development tooling.

**Topics Covered:**

- **Performance:** Understanding Node.js single-threaded nature, using `Worker Threads` for CPU-intensive tasks.
- **Observability:** Integrating logging libraries like `pino` or `winston`.
- **Deployment:** Containerizing applications with Docker and deploying Node.js services.
- **Toolchain:** Setting up linters (`ESLint`), formatters (`Prettier`), git hooks (`Husky`), and optimizing the TypeScript compilation process.

## Project Structure

The project follows a structured organization by learning stages:

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
├── .eslintrc.js
├── .prettierrc
├── .husky/
│   └── pre-commit
├── jest.config.js
├── specifications/
│   ├── project_structure.md
│   └── coding_standards.md
├── scripts/
│   ├── build.sh
│   ├── dev.sh
│   └── test.sh
├── stage1-foundations/
│   ├── tsconfig.json
│   ├── exercises/
│   └── practice/
├── stage2-cli/
│   ├── tsconfig.json
│   ├── package.json
│   ├── exercises/
│   └── practice/
├── stage3-backend/
│   ├── tsconfig.json
│   ├── package.json
│   ├── exercises/
│   └── practice/
├── stage4-production/
│   ├── tsconfig.json
│   ├── package.json
│   ├── exercises/
│   └── practice/
└── tests/
```

## Development Standards

This project follows strict development standards to ensure code quality and consistency:

1. **Type Safety**: Strict TypeScript configuration with all strict options enabled
2. **Code Quality**: ESLint and Prettier for linting and formatting
3. **Testing**: Jest for unit testing with a target coverage of 80%+
4. **Documentation**: Comprehensive documentation for all exercises and components
5. **Git Practices**: Conventional commit messages following professional standards

For detailed coding standards, refer to [specifications/coding_standards.md](specifications/coding_standards.md).

## Recommended Learning Sequence

1.  **Stages 1 & 2:** Start with core syntax and build small CLI tools to become comfortable with the type system, modules, and the npm ecosystem.
2.  **Stage 3:** Transition to backend development to apply TypeScript in a server-side context, integrating databases and building APIs.
3.  **Stage 4:** Focus on production concerns, optimization, and professional development workflows to ensure applications are robust and maintainable.

## Running TypeScript Snippets

For quick experimentation and practice, it's recommended to run TypeScript code directly using Node.js with tools like `tsx` or `ts-node`, which eliminate the need for manual compilation steps.

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run a specific TypeScript file directly
npx tsx my-demo-script.ts
```

For running exercises, navigate to the specific exercise directory and follow the instructions in its README.md file.

## Quality Assurance

All exercises should include unit tests with a target coverage of 80% or higher. Tests can be run using:

```bash
# Run all tests
npm test

# Run tests for a specific stage
npm test --workspace=stage1-foundations
```
