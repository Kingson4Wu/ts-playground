#!/usr/bin/env node

/**
 * Simple CLI Calculator
 *
 * A command-line interface for performing basic arithmetic operations
 */

import { calculate, Operation } from './calculator.js';

/**
 * Parses command-line arguments and performs calculation
 *
 * @param args - Command-line arguments (excluding node and script name)
 */
function main(args: string[]): void {
  // Check if we have the correct number of arguments
  if (args.length !== 3) {
    console.error('Usage: calculator <number1> <operation> <number2>');
    console.error('Operations: add, subtract, multiply, divide');
    process.exit(1);
  }

  const [num1Str, operation, num2Str] = args;

  // Parse numbers
  const num1 = parseFloat(num1Str);
  const num2 = parseFloat(num2Str);

  // Validate numbers
  if (isNaN(num1) || isNaN(num2)) {
    console.error('Error: Please provide valid numbers');
    process.exit(1);
  }

  // Validate operation
  const validOperations: Operation[] = [
    'add',
    'subtract',
    'multiply',
    'divide',
  ];
  if (!validOperations.includes(operation as Operation)) {
    console.error(
      `Error: Invalid operation '${operation}'. Valid operations are: ${validOperations.join(', ')}`
    );
    process.exit(1);
  }

  try {
    // Perform calculation
    const result = calculate(num1, num2, operation as Operation);
    console.log(`${num1} ${operation} ${num2} = ${result}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
}

// Run the calculator with command-line arguments
main(process.argv.slice(2));
