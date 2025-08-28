# Implementation Plan: Batch File Renaming Tool

## Task Overview
Create a command-line tool that can rename multiple files in a directory based on various patterns and rules. This tool should support operations like adding prefixes/suffixes, changing case, replacing text, and sequential numbering.

## Requirements Analysis
Based on Stage 2 learning objectives, this exercise should demonstrate:
- Advanced CLI development with argument parsing
- File system operations (reading directories, renaming files)
- String manipulation and pattern matching
- Configuration through command-line options
- Working with external libraries (commander or yargs for CLI parsing)
- Error handling and validation for file operations

## Implementation Approach

### 1. Project Structure
```
stage2-cli/exercises/file-renamer/
├── package.json          # Exercise-specific dependencies
├── README.md             # Exercise documentation
├── src/
│   ├── index.ts          # Entry point for CLI
│   └── renamer.ts        # Core renaming logic
└── tests/
    └── renamer.test.ts   # Unit tests
```

### 2. Core Components

#### renamer.ts
- Define RenameOptions interface with:
  - directory: string (target directory path)
  - pattern: string (pattern to match files)
  - operation: 'add-prefix' | 'add-suffix' | 'change-case' | 'replace' | 'sequence'
  - prefix?: string (for add-prefix operation)
  - suffix?: string (for add-suffix operation)
  - caseType?: 'upper' | 'lower' | 'title' (for change-case operation)
  - search?: string (text to search for in replace operation)
  - replace?: string (replacement text in replace operation)
  - startNumber?: number (starting number for sequence operation)
- Implement renameFiles function:
  - Parameters: options object implementing RenameOptions interface
  - Return type: Promise<{ renamed: number, errors: number }>
  - Use fs/promises for asynchronous file operations
  - Use glob patterns or simple pattern matching for file selection
  - Implement all operations:
    * add-prefix: Add a prefix to all matching filenames
    * add-suffix: Add a suffix to all matching filenames
    * change-case: Change filename case (upper, lower, title)
    * replace: Replace text in filenames
    * sequence: Rename files with sequential numbers
  - Handle file reading and renaming errors appropriately
  - Validate operation parameters
  - Return statistics about the operation (files renamed, errors)
- Export the interface and function using named exports

#### index.ts
- Use commander or yargs for CLI argument parsing
- Define CLI options matching RenameOptions
- Implement help documentation with examples
- Validate input arguments with type checking
- Call the renameFiles function with parsed options
- Handle errors gracefully and display user-friendly messages
- Output operation statistics to console

### 3. Technical Requirements
- Use strict TypeScript mode with all strict options enabled
- Implement proper error handling with TypeScript's type system
- Use Node.js built-in fs/promises and path modules for file operations
- Use commander or yargs for robust CLI argument parsing
- Follow naming conventions (kebab-case for files, camelCase for variables)
- Include comprehensive JSDoc comments for exported functions and interfaces
- Use ES Module syntax for imports/exports

### 4. Testing Plan
- Unit tests for the renameFiles function with various operations
- Test cases for all operation types
- Test cases for error conditions (directory not found, permission errors)
- Test cases for edge cases (empty directories, files with special characters)
- Mock file system operations for testing to avoid actual file system changes
- Target: 100% test coverage for core logic
- Follow AAA pattern (Arrange, Act, Assert) for tests

### 5. Quality Assurance
- All code must pass ESLint and Prettier checks
- All tests must pass with 100% success rate
- README.md must include:
  - Description of the exercise
  - How to run the file renamer
  - How to run tests
  - Available operations and their usage
  - Example usage with command-line examples
  - Installation instructions if needed

### 6. Dependencies
- commander or yargs for CLI argument parsing
- Use built-in Node.js modules (fs, path)
- Jest for testing framework
- ts-jest for TypeScript testing support

## Implementation Steps
1. Create project structure directories
2. Initialize package.json with required dependencies
3. Implement the core renaming logic in src/renamer.ts
4. Create unit tests in tests/renamer.test.ts
5. Implement the CLI interface in src/index.ts
6. Write comprehensive README.md documentation
7. Verify all tests pass
8. Ensure code meets TypeScript strict mode requirements
9. Validate ESLint and Prettier compliance

## Success Criteria
- File renamer correctly performs all specified operations
- Proper error handling for file operations and invalid inputs
- CLI argument parsing works correctly with all options
- All unit tests pass with 100% success rate
- Code follows all TypeScript coding standards
- README.md provides clear instructions for usage and testing