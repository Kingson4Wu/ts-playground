/**
 * File Renamer module for batch renaming files
 *
 * This module provides a type-safe file renaming implementation with various operations
 */

import { readdir, rename } from 'fs/promises';
import { resolve, extname, basename } from 'path';

/**
 * Supported renaming operations
 */
export type OperationType =
  | 'add-prefix'
  | 'add-suffix'
  | 'change-case'
  | 'replace'
  | 'sequence';

/**
 * Case types for change-case operation
 */
export type CaseType = 'upper' | 'lower' | 'title';

/**
 * Options for file renaming
 */
export interface RenameOptions {
  /** Target directory path */
  directory: string;
  /** Pattern to match files (glob pattern or simple pattern) */
  pattern: string;
  /** Operation to perform on the files */
  operation: OperationType;
  /** Prefix to add (for add-prefix operation) */
  prefix?: string;
  /** Suffix to add (for add-suffix operation) */
  suffix?: string;
  /** Case type (for change-case operation) */
  caseType?: CaseType;
  /** Text to search for (for replace operation) */
  search?: string;
  /** Replacement text (for replace operation) */
  replace?: string;
  /** Starting number for sequence operation */
  startNumber?: number;
}

/**
 * Statistics about the renaming operation
 */
export interface RenameStats {
  /** Number of files successfully renamed */
  renamed: number;
  /** Number of errors encountered */
  errors: number;
}

/**
 * Renames files in a directory according to the specified options
 *
 * @param options - File renaming options
 * @returns Promise that resolves to statistics about the operation
 */
export async function renameFiles(
  options: RenameOptions
): Promise<RenameStats> {
  const { directory, pattern, operation } = options;
  const stats: RenameStats = { renamed: 0, errors: 0 };

  // Resolve the directory path
  const resolvedDir = resolve(directory);

  // Read the directory contents
  let files: string[];
  try {
    files = await readdir(resolvedDir);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read directory: ${error.message}`);
    }
    throw new Error('Failed to read directory: Unknown error');
  }

  // Filter files based on pattern
  const matchedFiles = files.filter(file => {
    // Simple pattern matching
    if (pattern === '*') return true;
    if (pattern.startsWith('*.')) {
      // Extension matching
      const extension = pattern.substring(1);
      return extname(file) === extension;
    }
    // Exact match
    return file === pattern;
  });

  // Process each matched file
  let counter = options.startNumber ?? 1;

  for (const file of matchedFiles) {
    try {
      const oldPath = resolve(resolvedDir, file);
      let newName = file;

      // Perform the requested operation
      switch (operation) {
        case 'add-prefix':
          if (!options.prefix) {
            throw new Error('Prefix is required for add-prefix operation');
          }
          newName = options.prefix + file;
          break;

        case 'add-suffix': {
          if (!options.suffix) {
            throw new Error('Suffix is required for add-suffix operation');
          }
          const extSuffix = extname(file);
          const name = basename(file, extSuffix);
          newName = name + options.suffix + extSuffix;
          break;
        }

        case 'change-case': {
          if (!options.caseType) {
            throw new Error('Case type is required for change-case operation');
          }
          switch (options.caseType) {
            case 'upper':
              newName = file.toUpperCase();
              break;
            case 'lower':
              newName = file.toLowerCase();
              break;
            case 'title':
              newName = toTitleCase(file);
              break;
          }
          break;
        }

        case 'replace':
          if (!options.search) {
            throw new Error('Search text is required for replace operation');
          }
          newName = file.replace(
            new RegExp(options.search, 'g'),
            options.replace ?? ''
          );
          break;

        case 'sequence': {
          const extSequence = extname(file);
          newName = `${counter}${extSequence}`;
          counter++;
          break;
        }

        default:
          throw new Error(`Unsupported operation: ${operation}`);
      }

      // Rename the file if the name changed
      if (newName !== file) {
        const newPath = resolve(resolvedDir, newName);
        await rename(oldPath, newPath);
        stats.renamed++;
      }
    } catch (error) {
      // Re-throw validation errors
      if (error instanceof Error && (
        error.message.includes('required') || 
        error.message.includes('Unsupported operation')
      )) {
        throw error;
      }
      
      // Count other errors
      stats.errors++;
      // Continue with other files even if one fails
    }
  }

  return stats;
}

/**
 * Converts a string to title case
 *
 * @param str - String to convert
 * @returns Title case string
 */
function toTitleCase(str: string): string {
  // Split by underscores and dots to handle file names properly
  const parts = str.split(/([_.])/);
  return parts.map(part => {
    if (part === '_' || part === '.') return part;
    return part.charAt(0).toUpperCase() + part.substring(1).toLowerCase();
  }).join('');
}
