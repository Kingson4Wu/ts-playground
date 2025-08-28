# JSON/CSV Data Conversion Utility

A command-line utility for converting data between JSON and CSV formats.

## Features

- Convert JSON arrays to CSV files
- Convert CSV files to JSON arrays
- Support for custom CSV delimiters
- Field selection for CSV output
- Nested object flattening
- Comprehensive error handling
- Cross-platform compatibility

## Installation

1. Ensure you're in the exercise directory:

   ```bash
   cd stage2-cli/exercises/data-converter
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

- `-i, --input-file <path>` - Input file path (required)
- `-o, --output-file <path>` - Output file path (required)
- `--input-format <format>` - Input format (json or csv) (required)
- `--output-format <format>` - Output format (json or csv) (required)
- `-d, --delimiter <char>` - CSV delimiter (default: ,)
- `-f, --fields <fields...>` - Fields to include in CSV output
- `--flatten` - Flatten nested JSON objects

### Example Usage

```bash
# Convert JSON to CSV
node dist/index.js -i data.json -o data.csv --input-format json --output-format csv

# Convert CSV to JSON
node dist/index.js -i data.csv -o data.json --input-format csv --output-format json

# Convert JSON to CSV with custom delimiter
node dist/index.js -i data.json -o data.tsv --input-format json --output-format csv -d $'\t'

# Convert JSON to CSV with specific fields
node dist/index.js -i data.json -o data.csv --input-format json --output-format csv -f name age

# Convert JSON to CSV with nested object flattening
node dist/index.js -i data.json -o data.csv --input-format json --output-format csv --flatten
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

## Supported Data Formats

### JSON Input

The utility expects JSON input to be an array of objects. For example:

```json
[
  {
    "name": "John Doe",
    "age": 30,
    "city": "New York"
  },
  {
    "name": "Jane Smith",
    "age": 25,
    "city": "Los Angeles"
  }
]
```

### CSV Input

CSV input should have a header row followed by data rows. For example:

```csv
name,age,city
John Doe,30,New York
Jane Smith,25,Los Angeles
```

## Implementation Details

This exercise demonstrates:

- Advanced CLI development with argument parsing using Commander.js
- File system operations (reading/writing JSON and CSV files)
- Data transformation and serialization
- Handling different data formats (JSON, CSV)
- Error handling and validation for file operations and data formats
- Unit testing with Jest

```

```
