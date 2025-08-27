# TypeScript Learning Playground - Coding Standards

This document defines the coding standards and best practices for the TypeScript learning playground, ensuring consistency and quality across all stages of learning.

## TypeScript Language Standards

### Strictness

1. **Strict Mode**: Enable all strict type checking options in `tsconfig.json`

   ```json
   {
     "strict": true,
     "noImplicitAny": true,
     "strictNullChecks": true,
     "strictFunctionTypes": true,
     "strictBindCallApply": true,
     "strictPropertyInitialization": true,
     "noImplicitThis": true,
     "alwaysStrict": true
   }
   ```

2. **Additional Type Safety**: Enable additional safety checks
   ```json
   {
     "noUnusedLocals": true,
     "noUnusedParameters": true,
     "noImplicitReturns": true,
     "noFallthroughCasesInSwitch": true
   }
   ```

### Type Annotations

1. **Explicit Typing**: Add explicit type annotations for:

   - Function parameters
   - Return types
   - Class properties
   - Object literals when not obvious

2. **Type Inference**: Allow TypeScript to infer types for:

   - Local variables
   - Generic type parameters when they can be easily inferred

3. **Avoid `any`**: Never use `any` unless absolutely necessary with a comment explaining why

### Interfaces vs Types

1. **Interfaces**: Use for object shapes and classes
2. **Type Aliases**: Use for unions, primitives, and tuples

### Generics

1. **Naming**: Use single uppercase letters for generic types (T, U, V, etc.)
2. **Constraints**: Use constraints (`extends`) when appropriate to limit generic types

## Code Organization

### Imports

1. **Ordering**: Order imports as follows:

   - Built-in Node.js modules
   - External packages
   - Internal modules
   - Relative imports
   - CSS imports (if applicable)

2. **Grouping**: Separate import groups with a blank line
3. **Destructuring**: Use destructuring imports when importing multiple items from a module

### Exports

1. **Named Exports**: Prefer named exports over default exports
2. **Export Placement**: Place exports at the bottom of the file when possible
3. **Barrel Files**: Use `index.ts` files to re-export from directories

### File Structure

1. **Single Responsibility**: Each file should have a single responsibility
2. **Logical Grouping**: Group related functionality in the same file or directory
3. **Size Limits**: Keep files under 500 lines when possible

### Project Structure

1. **Stage Organization**: Each stage contains independent exercises
2. **Exercise Organization**: Exercises are organized in `exercises/` directory
3. **Source Files**: Implementation files are placed in `src/` directory
4. **Test Files**: Test files are placed in `tests/` directory
5. **Configuration Files**: Configuration files follow standard naming conventions

## Naming Conventions

### Variables and Functions

1. **camelCase**: Use camelCase for variables, functions, and methods
2. **Descriptive Names**: Use descriptive names that convey purpose
3. **Booleans**: Prefix boolean variables with `is`, `has`, `should`, etc.

### Classes and Interfaces

1. **PascalCase**: Use PascalCase for classes, interfaces, and type aliases
2. **Interfaces**: Do not prefix interfaces with `I`
3. **Classes**: Use nouns for class names

### Constants

1. **UPPER_SNAKE_CASE**: Use UPPER_SNAKE_CASE for module-level constants
2. **Descriptive Names**: Use descriptive names for constants

### Files

1. **kebab-case**: Use kebab-case for file names
2. **Extensions**: Use `.ts` for TypeScript files

## Comment Standards

### General Comments

1. **File Headers**: Each source file header must contain file description and usage instructions
2. **Function Comments**: Important functions need comments explaining functionality and parameters
3. **Complex Logic**: Complex logic needs comments explaining implementation approach

### Documentation Comments

1. **JSDoc**: Use JSDoc for public APIs and complex functions
2. **Explanatory Comments**: Use comments to explain why, not what
3. **TODO Comments**: Use TODO comments with associated issue numbers when appropriate

### README Files

1. **Exercise Documentation**: Each exercise should have a README with:
   - Description of the exercise
   - How to run the code
   - How to run tests
   - Any additional notes

## Functions

### Parameters

1. **Limit Parameters**: Limit function parameters to 3 or fewer
2. **Object Parameters**: Use an interface for functions with many parameters
3. **Default Values**: Use default parameter values instead of conditionals

### Return Values

1. **Explicit Returns**: Always explicitly return values from functions
2. **Consistent Returns**: Don't mix `return undefined` and `return` without a value

### Arrow Functions

1. **Conciseness**: Use arrow functions for short, simple functions
2. **Avoid Side Effects**: Don't use arrow functions for complex logic with side effects

## Classes

### Properties

1. **Access Modifiers**: Explicitly declare access modifiers (`public`, `private`, `protected`)
2. **Readonly**: Use `readonly` for properties that shouldn't change

### Methods

1. **Single Responsibility**: Each method should have a single responsibility
2. **Naming**: Use verbs for method names

### Inheritance

1. **Composition over Inheritance**: Prefer composition over inheritance when possible
2. **Abstract Classes**: Use abstract classes when you need to share implementation

## Error Handling

### Throwing Errors

1. **Error Instances**: Always throw `Error` instances, not strings or other values
2. **Descriptive Messages**: Include descriptive error messages

### Catching Errors

1. **Specific Handling**: Handle specific error types when possible
2. **Logging**: Log errors appropriately for debugging

## Testing Standards

### Test Structure

1. **AAA Pattern**: Structure tests with Arrange, Act, Assert
2. **Descriptive Names**: Use descriptive test names that explain what is being tested
3. **One Assert Per Test**: Aim for one assertion per test when possible

### Test Implementation

1. \*\*Each test file needs to include instructions on how to run tests
2. \*\*Test cases need to cover normal and exceptional situations
3. **Test passing standard**: All test cases must pass 100%

### Mocking

1. **Minimal Mocking**: Only mock what is necessary for the test
2. **Clear Mocks**: Make it clear when you are using mocks

### Coverage

1. **Target Coverage**: Aim for at least 80% code coverage
2. **Quality over Quantity**: Focus on meaningful test coverage rather than just hitting the percentage

## Tooling Standards

### ESLint

1. **Configuration**: Use a standard ESLint configuration for TypeScript
2. **Rules**: Enable rules that enforce the coding standards above

### Prettier

1. **Consistent Formatting**: Use Prettier for consistent code formatting
2. **Configuration**: Use a standard Prettier configuration

### Git Hooks

1. **Pre-commit**: Run linting and tests before committing
2. **Pre-push**: Run full test suite before pushing

## Development Workflow

For Git commit standards and development workflow, please refer to the dedicated documentation files:

- [@docs/git_standards.md](git_standards.md) for Git commit standards
- [@docs/conventions_and_standards.md](conventions_and_standards.md) for development conventions
