# Implementation Plan: Small GraphQL API Implementation

## Task Overview
Create a GraphQL API that demonstrates the fundamentals of GraphQL with TypeScript. This API should showcase schema definition, resolvers, queries, mutations, and integration with a data source.

## Requirements Analysis
Based on Stage 3 learning objectives, this exercise should demonstrate:
- GraphQL fundamentals (schema, resolvers, queries, mutations)
- Integration of GraphQL with Express or Fastify
- Type safety with TypeScript in GraphQL context
- Data fetching and manipulation through GraphQL
- Error handling in GraphQL APIs
- GraphQL development tools (Playground/Altair)

## Implementation Approach

### 1. Project Structure
```
stage3-backend/exercises/graphql-api/
├── package.json           # Exercise-specific dependencies
├── README.md              # Exercise documentation
├── src/
│   ├── index.ts           # Application entry point
│   ├── schema/
│   │   ├── typeDefs.ts    # GraphQL type definitions
│   │   └── resolvers.ts   # GraphQL resolvers
│   ├── models/
│   │   ├── user.ts        # User data model
│   │   └── post.ts        # Post data model
│   ├── services/
│   │   └── dataService.ts # Data access layer
│   └── utils/
│       └── database.ts    # Database connection utilities
├── tests/
│   └── graphql.test.ts    # GraphQL API tests
└── tsconfig.json          # TypeScript configuration
```

### 2. Core Components

#### models/user.ts
- Define User interface with:
  - id: number (auto-generated)
  - name: string
  - email: string
  - createdAt: Date
  - updatedAt: Date

#### models/post.ts
- Define Post interface with:
  - id: number (auto-generated)
  - title: string
  - content: string
  - authorId: number (foreign key to User)
  - published: boolean (default: false)
  - createdAt: Date
  - updatedAt: Date
- Define relationships between User and Post (one-to-many)

#### utils/database.ts
- Implement database simulation with in-memory storage or simple file-based storage
- Alternative: Use SQLite with a simple query library
- Implement basic CRUD operations for users and posts
- Handle data persistence and retrieval
- Export database connection/utilities

#### services/dataService.ts
- Implement data access layer for users and posts:
  - getUsers: Retrieve all users
  - getUserById: Retrieve user by ID
  - createUser: Create a new user
  - updateUser: Update an existing user
  - deleteUser: Delete a user
  - getPosts: Retrieve all posts (with filtering by author)
  - getPostById: Retrieve post by ID
  - createPost: Create a new post
  - updatePost: Update an existing post
  - deletePost: Delete a post
  - getPostsByAuthor: Retrieve posts for a specific author
- Implement proper error handling:
  - User/Post not found errors
  - Validation errors
- Export service functions using named exports

#### schema/typeDefs.ts
- Define GraphQL schema using GraphQL Schema Definition Language (SDL):
  - User type with fields matching the User interface
  - Post type with fields matching the Post interface
  - Query type with:
    * users: [User!]!
    * user(id: Int!): User
    * posts(authorId: Int): [Post!]!
    * post(id: Int!): Post
  - Mutation type with:
    * createUser(name: String!, email: String!): User!
    * updateUser(id: Int!, name: String, email: String): User
    * deleteUser(id: Int!): Boolean!
    * createPost(title: String!, content: String!, authorId: Int!): Post!
    * updatePost(id: Int!, title: String, content: String, published: Boolean): Post
    * deletePost(id: Int!): Boolean!
  - Input types for mutations

#### schema/resolvers.ts
- Implement GraphQL resolvers matching the schema:
  - Query resolvers for users and posts
  - Mutation resolvers for user and post operations
  - Relationship resolvers (Post.author, User.posts)
- Call dataService functions for data operations
- Implement proper error handling
- Export resolvers object

#### index.ts
- Set up Express/Fastify application with GraphQL middleware
- Configure GraphQL endpoint (e.g., /graphql)
- Enable GraphQL Playground/Altair for development
- Connect to database
- Start server on specified port
- Implement graceful shutdown
- Handle application errors

### 3. Technical Requirements
- Use strict TypeScript mode with all strict options enabled
- Implement proper error handling with TypeScript's type system
- Use Express or Fastify with Apollo Server or GraphQL Helix
- Use GraphQL Schema Definition Language for schema definition
- Simulate database with in-memory storage or simple file-based storage
- Follow GraphQL best practices
- Use ES Module syntax for imports/exports
- Include comprehensive JSDoc comments for exported functions and interfaces

### 4. GraphQL Schema Design
- Define User and Post types with appropriate fields
- Implement queries for retrieving users and posts
- Implement mutations for creating, updating, and deleting users and posts
- Implement relationship fields (User.posts, Post.author)
- Use appropriate GraphQL types (Int, String, Boolean, etc.)
- Use non-null types where appropriate with ! suffix

### 5. Testing Plan
- GraphQL query and mutation tests
- Test cases for all queries and mutations
- Test cases for relationship resolution
- Test cases for error conditions (not found, validation errors)
- Test cases for edge cases
- Use Apollo Server testing utilities or similar
- Target: 100% test coverage for GraphQL resolvers and schema
- Follow AAA pattern (Arrange, Act, Assert) for tests

### 6. Quality Assurance
- All code must pass ESLint and Prettier checks
- All tests must pass with 100% success rate
- README.md must include:
  - Description of the GraphQL API
  - How to run the API server
  - How to run tests
  - GraphQL schema documentation
  - Example queries and mutations
  - How to use GraphQL Playground
  - Error handling documentation

### 7. Dependencies
- Express or Fastify for web framework
- Apollo Server or GraphQL Helix for GraphQL implementation
- GraphQL for GraphQL utilities
- Jest for testing framework
- ts-jest for TypeScript testing support
- TypeScript compiler

## Implementation Steps
1. Create project structure directories
2. Initialize package.json with required dependencies
3. Implement data models in src/models/
4. Implement database utilities in src/utils/database.ts
5. Implement data access layer in src/services/dataService.ts
6. Define GraphQL schema in src/schema/typeDefs.ts
7. Implement GraphQL resolvers in src/schema/resolvers.ts
8. Set up Express/Fastify application with GraphQL in src/index.ts
9. Create GraphQL tests in tests/graphql.test.ts
10. Write comprehensive README.md documentation
11. Verify all tests pass
12. Ensure code meets TypeScript strict mode requirements
13. Validate ESLint and Prettier compliance

## Success Criteria
- GraphQL API correctly implements all defined queries and mutations
- Proper error handling for all operations
- Relationship resolution works correctly
- GraphQL Playground/Altair is accessible for development
- All tests pass with 100% success rate
- Code follows all TypeScript coding standards
- README.md provides clear GraphQL documentation with examples