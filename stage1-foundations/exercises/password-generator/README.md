# Random Password Generator

A command-line tool that generates cryptographically secure random passwords with customizable options.

## Features

- Cryptographically secure password generation using Node.js crypto module
- Customizable password length
- Options to include/exclude character types (uppercase, lowercase, numbers, symbols)
- Option to exclude similar characters (0, O, l, I, 1)
- Ensures at least one character from each selected character set
- Comprehensive test coverage

## How to Run

1. Ensure you're in the project root directory
2. Compile the TypeScript code:
   ```bash
   npx tsc
   ```
3. Run the password generator:
   ```bash
   node stage1-foundations/exercises/password-generator/src/index.js [options]
   ```

### Options

- `-l, --length <number>` - Password length (default: 12)
- `--no-uppercase` - Exclude uppercase letters
- `--no-lowercase` - Exclude lowercase letters
- `--no-numbers` - Exclude numbers
- `--no-symbols` - Exclude symbols
- `--exclude-similar` - Exclude similar characters (0, O, l, I, 1)
- `-h, --help` - Display help message

### Example Usage

```bash
# Generate a 12-character password with all character types (default)
node stage1-foundations/exercises/password-generator/src/index.js
# Output: K7#mP9$xQ2@v

# Generate a 16-character password
node stage1-foundations/exercises/password-generator/src/index.js -l 16
# Output: R9$mN4#pL8!vX3@q

# Generate a password without symbols
node stage1-foundations/exercises/password-generator/src/index.js --no-symbols
# Output: K7mP9xQ2vR4nL8

# Generate a password excluding similar characters
node stage1-foundations/exercises/password-generator/src/index.js --exclude-similar
# Output: K7#mP9$xQ2@v
```

## How to Run Tests

1. Ensure you're in the project root directory
2. Run the tests:
   ```bash
   npm test -- stage1-foundations/tests/password-generator.test.ts
   ```

## Implementation Details

This exercise demonstrates:

- Advanced TypeScript types (interfaces, union types)
- Working with Node.js built-in modules (crypto)
- Array manipulation and string processing
- Configuration objects with interfaces
- Error handling and validation
- Command-line argument parsing
- Unit testing with Jest
