# Batch File Renaming Tool

A command-line tool that can rename multiple files in a directory based on various patterns and rules.

## Features

- Add prefixes or suffixes to filenames
- Change filename case (upper, lower, title)
- Replace text in filenames
- Rename files with sequential numbers
- Pattern matching for file selection
- Comprehensive error handling
- Statistics reporting

## Installation

1. Ensure you're in the exercise directory:

   ```bash
   cd stage2-cli/exercises/file-renamer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## How to Run

1. Ensure you're in the exercise directory
2. Run the tool with options:
   ```bash
   node dist/index.js [options]
   ```

### Options

- `-d, --directory <path>` - Target directory path (required)
- `-p, --pattern <pattern>` - Pattern to match files (_ for all, _.txt for text files, etc.) (required)
- `-o, --operation <type>` - Operation to perform (required):
  - `add-prefix`: Add a prefix to filenames
  - `add-suffix`: Add a suffix to filenames
  - `change-case`: Change filename case
  - `replace`: Replace text in filenames
  - `sequence`: Rename files with sequential numbers
- `--prefix <prefix>` - Prefix to add (for add-prefix operation)
- `--suffix <suffix>` - Suffix to add (for add-suffix operation)
- `--case-type <type>` - Case type (upper, lower, title) for change-case operation
- `--search <text>` - Text to search for (for replace operation)
- `--replace <text>` - Replacement text (for replace operation)
- `--start-number <number>` - Starting number for sequence operation

### Example Usage

```bash
# Add prefix to all text files
node dist/index.js -d /path/to/directory -p "*.txt" -o add-prefix --prefix "new-"

# Add suffix to all files
node dist/index.js -d /path/to/directory -p "*" -o add-suffix --suffix "-backup"

# Change all filenames to uppercase
node dist/index.js -d /path/to/directory -p "*" -o change-case --case-type upper

# Replace text in filenames
node dist/index.js -d /path/to/directory -p "*" -o replace --search "old" --replace "new"

# Rename files with sequential numbers
node dist/index.js -d /path/to/directory -p "*" -o sequence --start-number 1
```

## Development

### Running Tests

1. Ensure you're in the exercise directory
2. Run the tests:
   ```bash
   npm test
   ```

### Running in Development Mode

1. Ensure you're in the exercise directory
2. Run the tool directly with ts-node:
   ```bash
   npm run dev -- [options]
   ```

## Implementation Details

This exercise demonstrates:

- Advanced CLI development with argument parsing using Commander.js
- File system operations (reading directories, renaming files)
- String manipulation and pattern matching
- Configuration through command-line options
- Error handling and validation for file operations
- Unit testing with Jest and mocking
