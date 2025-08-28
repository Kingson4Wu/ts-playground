/**
 * Calculator module for performing basic arithmetic operations
 *
 * This module provides a type-safe calculator implementation with proper error handling
 */

/**
 * Supported arithmetic operations
 */
export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

/**
 * Performs arithmetic operations on two numbers
 *
 * @param a - First operand
 * @param b - Second operand
 * @param operation - The arithmetic operation to perform
 * @returns The result of the arithmetic operation
 * @throws {Error} When dividing by zero
 */
export function calculate(a: number, b: number, operation: Operation): number {
  switch (operation) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) {
        throw new Error('Division by zero is not allowed');
      }
      return a / b;
    default:
      // This should never happen due to TypeScript's type system
      throw new Error(`Unsupported operation: ${operation}`);
  }
}
