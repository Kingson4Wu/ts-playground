# Text Analyzer CLI

A simple command-line tool for analyzing text files.

## Features

- Count words, characters, and lines in text files
- Calculate average word length
- Support for JSON and table output formats
- Cross-platform compatibility
- Lightweight and fast

## Installation

You can install this tool globally using npm:

```bash
npm install -g @Kingson4Wu/text-analyzer-cli
```

Or run it directly using npx without installing:

```bash
npx @Kingson4Wu/text-analyzer-cli <file>
```

## Usage

```bash
text-analyzer <file> [options]
```

### Arguments

- `file` - The path to the text file to analyze (required)

### Options

- `-f, --format <format>` - Output format (json or table) (default: "table")
- `-V, --version` - Output the version number
- `-h, --help` - Display help for command

### Examples

```bash
# Analyze a text file with default table format
text-analyzer document.txt

# Analyze a text file with JSON output
text-analyzer document.txt -f json

# Run directly with npx
npx @Kingson4Wu/text-analyzer-cli document.txt
```

## Output

### Table Format (Default)

```
Text Analysis Results:
=====================
Words: 125
Characters: 750
Lines: 10
Average Word Length: 5.25
```

### JSON Format

```json
{
  "words": 125,
  "characters": 750,
  "lines": 10,
  "averageWordLength": 5.25
}
```

## Development

### Prerequisites

- Node.js >= 14.0.0
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Kingson4Wu/ts-playground.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ts-playground/stage2-cli/exercises/npm-publisher
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

### Running in Development Mode

```bash
npm run dev -- <file> [options]
```

## API

The tool can also be used programmatically:

```javascript
import { analyzeText } from '@Kingson4Wu/text-analyzer-cli';

const text = 'Hello world! This is a test.';
const analysis = analyzeText(text);

console.log(analysis);
// Output: { words: 6, characters: 28, lines: 1, averageWordLength: 4.67 }
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
