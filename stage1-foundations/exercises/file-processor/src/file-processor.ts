/**
 * File Processor module for processing text files
 *
 * This module provides a type-safe file processing implementation with various operations
 */

import { readFile } from 'fs/promises';
import { resolve } from 'path';

/**
 * Supported file processing operations
 */
export type OperationType =
  | 'count-words'
  | 'count-lines'
  | 'count-chars'
  | 'find-pattern'
  | 'to-upper'
  | 'to-lower'
  | 'remove-whitespace';

/**
 * Options for file processing
 */
export interface FileProcessorOptions {
  /** Path to the file to process */
  filePath: string;
  /** Operation to perform on the file */
  operation: OperationType;
  /** Pattern to search for (required for find-pattern operation) */
  pattern?: string;
}

/**
 * Processes a file according to the specified options
 *
 * @param options - File processing options
 * @returns Promise that resolves to the result of the operation
 * @throws {Error} When file operations fail or options are invalid
 */
export async function processFile(
  options: FileProcessorOptions
): Promise<string | number> {
  const { filePath, operation, pattern } = options;

  // Resolve the file path
  const resolvedPath = resolve(filePath);

  // Read the file content
  let content: string;
  try {
    content = await readFile(resolvedPath, 'utf8');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
    throw new Error('Failed to read file: Unknown error');
  }

  // Perform the requested operation
  switch (operation) {
    case 'count-words':
      return content.trim() === '' ? 0 : content.trim().split(/\s+/).length;

    case 'count-lines':
      return content === '' ? 0 : content.split('\n').length;

    case 'count-chars':
      return content.length;

    case 'find-pattern':
      if (!pattern) {
        throw new Error('Pattern is required for find-pattern operation');
      }
      try {
        const regex = new RegExp(pattern, 'g');
        const matches = content.match(regex);
        return matches ? matches.length : 0;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Invalid regex pattern: ${error.message}`);
        }
        throw new Error('Invalid regex pattern: Unknown error');
      }

    case 'to-upper':
      return content.toUpperCase();

    case 'to-lower':
      return content.toLowerCase();

    case 'remove-whitespace':
      return content.replace(/\s+/g, ' ').trim();

    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}
