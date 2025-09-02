# Implementation Plan: To-Do List Service with Database

## Task Overview

Create a RESTful API for a to-do list service with full CRUD operations and database integration. This service should demonstrate backend development with TypeScript, including proper API design, data validation, database relationships, and querying capabilities.

## Requirements Analysis

Based on Stage 3 learning objectives, this exercise should demonstrate:

- Building RESTful APIs with Express or Fastify
- Database integration with ORMs (TypeORM or Prisma)
- Data modeling with relationships (users and todos)
- Querying and filtering data
- Pagination and sorting
- Error handling in backend services
- TypeScript type safety across the stack

## Implementation Approach

### 1. Project Structure

```
stage3-backend/exercises/todo-service/
├── package.json           # Exercise-specific dependencies
├── README.md              # Exercise documentation
├── src/
│   ├── index.ts           # Application entry point
│   ├── routes/
│   │   └── todos.ts       # Todo route handlers
│   ├── services/
│   │   └── todoService.ts # Todo business logic
│   ├── models/
│   │   ├── todo.ts        # Todo data model
│   │   └── user.ts        # User data model (for ownership)
│   └── utils/
│       └── database.ts    # Database connection utilities
├── tests/
│   └── todo.test.ts       # API integration tests
└── tsconfig.json          # TypeScript configuration
```

### 2. Core Components

#### models/user.ts

- Define User interface with:
  - id: number (auto-generated)
  - name: string
  - email: string (unique)
  - createdAt: Date
  - updatedAt: Date

#### models/todo.ts

- Define Todo interface with:
  - id: number (auto-generated)
  - title: string
  - description: string (optional)
  - completed: boolean (default: false)
  - userId: number (foreign key to User)
  - createdAt: Date
  - updatedAt: Date
- Define relationships between User and Todo (one-to-many)

#### utils/database.ts

- Implement database connection with TypeORM or Prisma
- Use SQLite for development database
- Implement database initialization and connection
- Export database connection/utilities

#### services/todoService.ts

- Implement business logic for todo operations:
  - createTodo: Create a new todo item
  - getTodoById: Retrieve todo by ID
  - getAllTodos: Retrieve all todos with filtering, pagination, and sorting
  - updateTodo: Update an existing todo
  - deleteTodo: Delete a todo
  - markTodoAsCompleted: Mark a todo as completed
  - getTodosByUser: Retrieve todos for a specific user
- Implement query parameters support:
  - Filtering by completion status
  - Pagination (limit, offset)
  - Sorting (by createdAt, updatedAt, title)
- Implement proper error handling:
  - Todo not found errors
  - Validation errors
  - User not found errors (for user-specific operations)
- Export service functions using named exports

#### routes/todos.ts

- Implement Express/Fastify routes for todo operations:
  - GET /todos - Get all todos (with query parameters for filtering, pagination, sorting)
  - GET /todos/:id - Get todo by ID
  - POST /todos - Create new todo
  - PUT /todos/:id - Update todo
  - DELETE /todos/:id - Delete todo
  - PATCH /todos/:id/complete - Mark todo as completed
  - GET /users/:userId/todos - Get todos for a specific user
- Implement request validation and sanitization
- Handle route parameters and query parameters
- Call todoService functions
- Return appropriate HTTP status codes and responses
- Implement error handling middleware integration

#### index.ts

- Set up Express/Fastify application
- Configure middleware (body parser, CORS if needed)
- Register todo routes
- Connect to database
- Start server on specified port
- Implement graceful shutdown
- Handle application errors

### 3. Technical Requirements

- Use strict TypeScript mode with all strict options enabled
- Implement proper error handling with TypeScript's type system
- Use Express or Fastify for API framework
- Use TypeORM or Prisma for database integration
- Use SQLite for development database
- Follow RESTful API design principles
- Implement proper HTTP status codes
- Use ES Module syntax for imports/exports
- Include comprehensive JSDoc comments for exported functions and interfaces

### 4. API Design

- Base URL: /api/v1
- Todo endpoints:
  - GET /api/v1/todos - Retrieve all todos
    - Query parameters: completed, limit, offset, sortBy, sortOrder
  - GET /api/v1/todos/:id - Retrieve a specific todo
  - POST /api/v1/todos - Create a new todo
  - PUT /api/v1/todos/:id - Update an existing todo
  - DELETE /api/v1/todos/:id - Delete a todo
  - PATCH /api/v1/todos/:id/complete - Mark todo as completed
  - GET /api/v1/users/:userId/todos - Retrieve todos for a specific user
- Request/Response format: JSON
- Error responses: Consistent error format with message and code

### 5. Testing Plan

- Integration tests for all API endpoints
- Test cases for all CRUD operations
- Test cases for query parameters (filtering, pagination, sorting)
- Test cases for error conditions (todo not found, invalid input)
- Test cases for edge cases (empty database, large payloads)
- Test cases for user-specific operations
- Use supertest or similar library for HTTP testing
- Target: 100% test coverage for API routes and service logic
- Follow AAA pattern (Arrange, Act, Assert) for tests

### 6. Quality Assurance

- All code must pass ESLint and Prettier checks
- All tests must pass with 100% success rate
- README.md must include:
  - Description of the service
  - How to run the API server
  - How to run tests
  - API endpoints documentation with examples
  - Request/response examples
  - Error handling documentation
  - Database schema documentation

### 7. Dependencies

- Express or Fastify for API framework
- TypeORM or Prisma for database integration
- SQLite for development database
- Jest for testing framework
- ts-jest for TypeScript testing support
- supertest for API integration testing
- TypeScript compiler

## Implementation Steps

1. Create project structure directories
2. Initialize package.json with required dependencies
3. Implement data models in src/models/
4. Implement database utilities in src/utils/database.ts
5. Implement business logic in src/services/todoService.ts
6. Implement API routes in src/routes/todos.ts
7. Set up Express/Fastify application in src/index.ts
8. Create integration tests in tests/todo.test.ts
9. Write comprehensive README.md documentation
10. Verify all tests pass
11. Ensure code meets TypeScript strict mode requirements
12. Validate ESLint and Prettier compliance

## Success Criteria

- Service correctly implements all CRUD operations for todos
- Proper error handling for all endpoints
- Data validation and sanitization
- Support for filtering, pagination, and sorting
- Database relationships implemented correctly
- RESTful API design principles followed
- All integration tests pass with 100% success rate
- Code follows all TypeScript coding standards
- README.md provides clear API documentation with examples
