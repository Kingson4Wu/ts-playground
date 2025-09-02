# Implementation Plan: Simple CLI Calculator

## Task Overview

Create a simple command-line calculator that performs basic arithmetic operations (addition, subtraction, multiplication, division) on two numbers.

## Requirements Analysis

Based on Stage 1 learning objectives, this exercise should demonstrate:

- Basic TypeScript syntax and type system
- Function parameter and return types
- Union types for operation selection
- Error handling with proper TypeScript types
- Command-line argument parsing
- Module organization with ES Modules

## Implementation Approach

### 1. Project Structure

```
stage1-foundations/exercises/calculator/
├── index.ts          # Entry point for CLI
├── calculator.ts     # Core calculator logic
├── calculator.test.ts # Unit tests
└── README.md        # Exercise documentation
```

### 2. Core Components

#### calculator.ts

- Define operation types using union types: `'add' | 'subtract' | 'multiply' | 'divide'`
- Implement a calculate function with proper type annotations:
  - Parameters: two numbers and an operation string
  - Return type: number
  - Error handling for division by zero with proper Error types
- Export the function using named exports

#### index.ts

- Parse command-line arguments using `process.argv`
- Validate input arguments with type checking
- Convert string arguments to numbers with error handling
- Call the calculate function with parsed arguments
- Handle errors gracefully and display user-friendly messages
- Output results to console

### 3. Technical Requirements

- Use strict TypeScript mode with all strict options enabled
- Implement proper error handling with TypeScript's type system
- Follow naming conventions (kebab-case for files, camelCase for variables)
- Include comprehensive JSDoc comments for exported functions
- Use ES Module syntax for imports/exports

### 4. Testing Plan

- Unit tests for the calculate function with all operations
- Test cases for error conditions (division by zero)
- Test cases for edge cases (negative numbers, decimals)
- Target: 100% test coverage for core logic
- Follow AAA pattern (Arrange, Act, Assert) for tests

### 5. Quality Assurance

- All code must pass ESLint and Prettier checks
- All tests must pass with 100% success rate
- README.md must include:
  - Description of the exercise
  - How to run the calculator
  - How to run tests
  - Example usage

### 6. Dependencies

- No external dependencies required
- Use built-in Node.js modules only
- Jest for testing framework

## Implementation Steps

1. Create project structure directories
2. Implement the core calculator logic in calculator.ts
3. Create unit tests for calculator.ts
4. Implement the CLI interface in index.ts
5. Write comprehensive README.md documentation
6. Verify all tests pass
7. Ensure code meets TypeScript strict mode requirements
8. Validate ESLint and Prettier compliance

## Success Criteria

- Calculator correctly performs all four basic arithmetic operations
- Proper error handling for invalid inputs and division by zero
- All unit tests pass with 100% success rate
- Code follows all TypeScript coding standards
- README.md provides clear instructions for usage and testing
