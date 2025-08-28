#!/usr/bin/env node

/**
 * File Content Processing Script CLI
 *
 * A command-line interface for processing text files with various operations
 */

import { processFile, OperationType } from './file-processor.js';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

/**
 * Parses command-line arguments and processes a file
 *
 * @param args - Command-line arguments (excluding node and script name)
 */
async function main(args: string[]): Promise<void> {
  // Check if we have enough arguments
  if (args.length < 2) {
    printHelp();
    process.exit(1);
  }

  const options: {
    filePath?: string;
    operation?: OperationType;
    pattern?: string;
    output?: string;
  } = {};

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    // Help flags
    if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    }

    // File path
    if ((arg === '-f' || arg === '--file') && i + 1 < args.length) {
      options.filePath = args[i + 1];
      i++; // Skip the next argument
      continue;
    }

    // Operation
    if ((arg === '-o' || arg === '--operation') && i + 1 < args.length) {
      options.operation = args[i + 1] as OperationType;
      i++; // Skip the next argument
      continue;
    }

    // Pattern (for find-pattern operation)
    if ((arg === '-p' || arg === '--pattern') && i + 1 < args.length) {
      options.pattern = args[i + 1];
      i++; // Skip the next argument
      continue;
    }

    // Output file (for transformation operations)
    if ((arg === '--output' || arg === '-out') && i + 1 < args.length) {
      options.output = args[i + 1];
      i++; // Skip the next argument
      continue;
    }
  }

  // Validate required options
  if (!options.filePath) {
    console.error('Error: File path is required');
    process.exit(1);
  }

  if (!options.operation) {
    console.error('Error: Operation is required');
    process.exit(1);
  }

  try {
    const result = await processFile({
      filePath: options.filePath,
      operation: options.operation,
      pattern: options.pattern,
    });

    // For transformation operations, we might want to write to a file
    const isTransformation = [
      'to-upper',
      'to-lower',
      'remove-whitespace',
    ].includes(options.operation);

    if (isTransformation && options.output) {
      // Write result to output file
      await writeFile(resolve(options.output), result as string, 'utf8');
      console.log(`Result written to ${options.output}`);
    } else if (isTransformation) {
      // Output to stdout for transformation operations
      console.log(result);
    } else {
      // Output result for counting operations
      console.log(result);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
}

/**
 * Prints help information
 */
function printHelp(): void {
  console.log(`
File Content Processing Script

Usage: file-processor [options]

Options:
  -f, --file <path>         Path to the file to process
  -o, --operation <type>    Operation to perform:
                              count-words: Count words in the file
                              count-lines: Count lines in the file
                              count-chars: Count characters in the file
                              find-pattern: Find occurrences of a pattern
                              to-upper: Convert file content to uppercase
                              to-lower: Convert file content to lowercase
                              remove-whitespace: Remove extra whitespace
  -p, --pattern <regex>     Pattern to search for (required for find-pattern)
  --output, -out <path>     Output file path (for transformation operations)
  -h, --help                Display this help message

Examples:
  file-processor -f document.txt -o count-words
  file-processor -f document.txt -o find-pattern -p "hello"
  file-processor -f document.txt -o to-upper --output upper.txt
  `);
}

// Run the file processor with command-line arguments
main(process.argv.slice(2)).catch(error => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
