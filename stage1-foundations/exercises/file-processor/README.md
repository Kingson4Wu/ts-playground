# File Content Processing Script

A command-line script that processes text files to perform operations like counting words, lines, characters, finding patterns, or transforming text.

## Features

- Count words, lines, and characters in a file
- Find occurrences of patterns (regex) in a file
- Transform text (convert case, remove whitespace)
- Asynchronous file operations using fs/promises
- Comprehensive error handling
- Command-line interface with multiple options

## How to Run

1. Ensure you're in the project root directory
2. Compile the TypeScript code:
   ```bash
   npx tsc
   ```
3. Run the file processor with options:
   ```bash
   node stage1-foundations/exercises/file-processor/src/index.js [options]
   ```

### Options

- `-f, --file <path>` - Path to the file to process
- `-o, --operation <type>` - Operation to perform:
  - `count-words`: Count words in the file
  - `count-lines`: Count lines in the file
  - `count-chars`: Count characters in the file
  - `find-pattern`: Find occurrences of a pattern
  - `to-upper`: Convert file content to uppercase
  - `to-lower`: Convert file content to lowercase
  - `remove-whitespace`: Remove extra whitespace
- `-p, --pattern <regex>` - Pattern to search for (required for find-pattern)
- `--output, -out <path>` - Output file path (for transformation operations)
- `-h, --help` - Display help message

### Example Usage

```bash
# Count words in a file
node stage1-foundations/exercises/file-processor/src/index.js -f document.txt -o count-words
# Output: 125

# Find occurrences of a pattern
node stage1-foundations/exercises/file-processor/src/index.js -f document.txt -o find-pattern -p "hello"
# Output: 3

# Convert file content to uppercase and save to a new file
node stage1-foundations/exercises/file-processor/src/index.js -f document.txt -o to-upper --output upper.txt
# Output: Result written to upper.txt

# Remove extra whitespace from file content
node stage1-foundations/exercises/file-processor/src/index.js -f document.txt -o remove-whitespace
# Output: Cleaned file content...
```

## How to Run Tests

1. Ensure you're in the project root directory
2. Run the tests:
   ```bash
   npm test -- stage1-foundations/tests/file-processor.test.ts
   ```

## Implementation Details

This exercise demonstrates:

- Asynchronous file system operations using fs/promises
- Working with Node.js built-in modules (fs, path)
- String manipulation and regular expressions
- Error handling for file operations
- Command-line argument parsing
- Union types for operation selection
- Unit testing with Jest
