# Simple CLI Calculator

A command-line calculator that performs basic arithmetic operations (addition, subtraction, multiplication, division) on two numbers.

## Features

- Type-safe implementation using TypeScript
- Support for basic arithmetic operations
- Proper error handling (e.g., division by zero)
- Command-line interface for easy use
- Comprehensive test coverage

## How to Run

1. Ensure you're in the project root directory
2. Compile the TypeScript code:
   ```bash
   npx tsc
   ```
3. Run the calculator with arguments:
   ```bash
   node stage1-foundations/exercises/calculator/index.js <number1> <operation> <number2>
   ```

### Example Usage

```bash
# Addition
node stage1-foundations/exercises/calculator/index.js 5 add 3
# Output: 5 add 3 = 8

# Subtraction
node stage1-foundations/exercises/calculator/index.js 10 subtract 4
# Output: 10 subtract 4 = 6

# Multiplication
node stage1-foundations/exercises/calculator/index.js 6 multiply 7
# Output: 6 multiply 7 = 42

# Division
node stage1-foundations/exercises/calculator/index.js 15 divide 3
# Output: 15 divide 3 = 5
```

## How to Run Tests

1. Ensure you're in the project root directory
2. Run the tests:
   ```bash
   npm test -- stage1-foundations/exercises/calculator
   ```

## Implementation Details

This exercise demonstrates:

- TypeScript's type system with union types
- Error handling with proper TypeScript types
- Command-line argument parsing
- Module organization with ES Modules
- Unit testing with Jest
