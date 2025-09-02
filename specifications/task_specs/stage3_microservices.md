# Implementation Plan: Simulated Microservices Interaction

## Task Overview

Create two simulated microservices that interact with each other to demonstrate microservices architecture concepts. This exercise should show how to design and implement services that communicate over HTTP, handle distributed data, and manage service boundaries.

## Requirements Analysis

Based on Stage 3 learning objectives, this exercise should demonstrate:

- Microservices architecture concepts
- HTTP communication between services
- API design for service-to-service interaction
- Error handling in distributed systems
- Data consistency across services
- TypeScript type safety in a distributed context

## Implementation Approach

### 1. Project Structure

```
stage3-backend/exercises/microservices/
├── service-a/
│   ├── package.json       # Service A dependencies
│   ├── README.md          # Service A documentation
│   ├── src/
│   │   ├── index.ts       # Service A entry point
│   │   ├── routes/
│   │   │   └── api.ts     # Service A route handlers
│   │   ├── services/
│   │   │   └── business.ts # Service A business logic
│   │   └── models/
│   │       └── data.ts    # Service A data models
│   ├── tests/
│   │   └── api.test.ts    # Service A tests
│   └── tsconfig.json      # Service A TypeScript configuration
└── service-b/
    ├── package.json       # Service B dependencies
    ├── README.md          # Service B documentation
    ├── src/
    │   ├── index.ts       # Service B entry point
    │   ├── routes/
    │   │   └── api.ts     # Service B route handlers
    │   ├── services/
    │   │   └── business.ts # Service B business logic
    │   └── models/
    │       └── data.ts    # Service B data models
    ├── tests/
    │   └── api.test.ts    # Service B tests
    └── tsconfig.json      # Service B TypeScript configuration
```

### 2. Core Components

#### Service A - Order Management Service

Purpose: Manage customer orders

##### models/data.ts

- Define Order interface with:
  - id: number (auto-generated)
  - customerId: number
  - productId: number
  - quantity: number
  - status: 'pending' | 'processing' | 'shipped' | 'delivered'
  - createdAt: Date
  - updatedAt: Date

##### services/business.ts

- Implement business logic for order operations:
  - createOrder: Create a new order
  - getOrderById: Retrieve order by ID
  - updateOrderStatus: Update order status
  - getAllOrders: Retrieve all orders
- Implement service-to-service communication:
  - Call Service B to validate customer information
  - Call Service B to check product availability
  - Handle service communication errors
- Export service functions using named exports

##### routes/api.ts

- Implement Express/Fastify routes for order operations:
  - GET /orders - Get all orders
  - GET /orders/:id - Get order by ID
  - POST /orders - Create new order
  - PUT /orders/:id/status - Update order status
- Implement request validation and sanitization
- Handle route parameters
- Call business service functions
- Return appropriate HTTP status codes and responses
- Implement error handling for service communication failures

##### index.ts

- Set up Express/Fastify application for Service A
- Configure middleware
- Register order routes
- Start server on specified port (e.g., 3001)
- Implement graceful shutdown

#### Service B - Customer & Product Service

Purpose: Manage customer information and product inventory

##### models/data.ts

- Define Customer interface with:
  - id: number (auto-generated)
  - name: string
  - email: string
  - address: string
  - createdAt: Date
  - updatedAt: Date
- Define Product interface with:
  - id: number (auto-generated)
  - name: string
  - description: string
  - price: number
  - inventory: number
  - createdAt: Date
  - updatedAt: Date

##### services/business.ts

- Implement business logic for customer operations:
  - getCustomerById: Retrieve customer by ID
  - validateCustomer: Validate customer exists
- Implement business logic for product operations:
  - getProductById: Retrieve product by ID
  - checkProductAvailability: Check if product is in stock
  - updateProductInventory: Update product inventory after order
- Export service functions using named exports

##### routes/api.ts

- Implement Express/Fastify routes for customer operations:
  - GET /customers/:id - Get customer by ID
  - POST /customers/validate - Validate customer exists
- Implement Express/Fastify routes for product operations:
  - GET /products/:id - Get product by ID
  - POST /products/check-availability - Check product availability
  - POST /products/:id/update-inventory - Update product inventory
- Implement request validation and sanitization
- Handle route parameters
- Call business service functions
- Return appropriate HTTP status codes and responses

##### index.ts

- Set up Express/Fastify application for Service B
- Configure middleware
- Register customer and product routes
- Start server on specified port (e.g., 3002)
- Implement graceful shutdown

### 3. Technical Requirements

- Use strict TypeScript mode with all strict options enabled
- Implement proper error handling with TypeScript's type system
- Use Express or Fastify for API framework
- Use axios or fetch for HTTP communication between services
- Simulate database with in-memory storage or simple file-based storage
- Follow RESTful API design principles
- Implement proper HTTP status codes
- Use ES Module syntax for imports/exports
- Include comprehensive JSDoc comments for exported functions and interfaces

### 4. Service Interaction Design

- Service A (Order Management) communicates with Service B (Customer & Product) via HTTP
- Service A calls Service B to:
  - Validate customer information before creating an order
  - Check product availability before creating an order
  - Update product inventory after order is processed
- Error handling for service communication failures:
  - Retry mechanism for transient failures
  - Graceful degradation when dependent service is unavailable
  - Proper error responses to clients

### 5. Testing Plan

- Integration tests for each service independently
- Integration tests for service-to-service communication
- Test cases for all API endpoints in both services
- Test cases for service communication scenarios:
  - Successful customer validation
  - Failed customer validation
  - Successful product availability check
  - Insufficient product inventory
  - Service communication errors
- Use supertest or similar library for HTTP testing
- Mock HTTP calls between services for isolated testing
- Target: 100% test coverage for API routes and service logic
- Follow AAA pattern (Arrange, Act, Assert) for tests

### 6. Quality Assurance

- All code must pass ESLint and Prettier checks
- All tests must pass with 100% success rate
- README.md files for each service must include:
  - Description of the service
  - How to run the service
  - How to run tests
  - API endpoints documentation with examples
  - Service interaction documentation
  - Request/response examples
  - Error handling documentation

### 7. Dependencies

- Express or Fastify for API framework
- axios or node-fetch for HTTP communication
- Jest for testing framework
- ts-jest for TypeScript testing support
- supertest for API integration testing
- TypeScript compiler

## Implementation Steps

1. Create project structure directories for both services
2. Initialize package.json files with required dependencies
3. Implement data models for both services
4. Implement business logic for Service B (Customer & Product)
5. Implement API routes for Service B
6. Set up Express/Fastify application for Service B
7. Implement business logic for Service A (Order Management)
8. Implement API routes for Service A
9. Set up Express/Fastify application for Service A
10. Implement service-to-service communication
11. Create integration tests for both services
12. Write comprehensive README.md documentation for both services
13. Verify all tests pass
14. Ensure code meets TypeScript strict mode requirements
15. Validate ESLint and Prettier compliance

## Success Criteria

- Both services correctly implement their respective functionalities
- Services can communicate with each other successfully
- Proper error handling for service communication failures
- Data consistency maintained across services
- All integration tests pass with 100% success rate
- Code follows all TypeScript coding standards
- README.md files provide clear documentation with examples
