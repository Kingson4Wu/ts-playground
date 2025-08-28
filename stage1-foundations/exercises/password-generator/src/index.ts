#!/usr/bin/env node

/**
 * Random Password Generator CLI
 *
 * A command-line interface for generating cryptographically secure random passwords
 */

import { generatePassword, PasswordOptions } from './password-generator.js';

/**
 * Parses command-line arguments and generates a password
 *
 * @param args - Command-line arguments (excluding node and script name)
 */
function main(args: string[]): void {
  const options: PasswordOptions = {};

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    // Help flags
    if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    }

    // Length option
    if ((arg === '-l' || arg === '--length') && i + 1 < args.length) {
      const length = parseInt(args[i + 1], 10);
      if (isNaN(length)) {
        console.error('Error: Length must be a number');
        process.exit(1);
      }
      options.length = length;
      i++; // Skip the next argument
      continue;
    }

    // Boolean options
    switch (arg) {
      case '--no-uppercase':
        options.includeUppercase = false;
        break;
      case '--no-lowercase':
        options.includeLowercase = false;
        break;
      case '--no-numbers':
        options.includeNumbers = false;
        break;
      case '--no-symbols':
        options.includeSymbols = false;
        break;
      case '--exclude-similar':
        options.excludeSimilarCharacters = true;
        break;
      default:
        // Ignore unrecognized arguments
        break;
    }
  }

  try {
    const password = generatePassword(options);
    console.log(password);
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
Random Password Generator

Usage: password-generator [options]

Options:
  -l, --length <number>     Password length (default: 12)
  --no-uppercase            Exclude uppercase letters
  --no-lowercase            Exclude lowercase letters
  --no-numbers              Exclude numbers
  --no-symbols              Exclude symbols
  --exclude-similar         Exclude similar characters (0, O, l, I, 1)
  -h, --help                Display this help message

Examples:
  password-generator                    # Generate a 12-character password with all character types
  password-generator -l 16             # Generate a 16-character password
  password-generator --no-symbols      # Generate a password without symbols
  password-generator --exclude-similar # Generate a password excluding similar characters
  `);
}

// Run the password generator with command-line arguments
main(process.argv.slice(2));
