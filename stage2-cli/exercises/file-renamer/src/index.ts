#!/usr/bin/env node

/**
 * Batch File Renaming Tool CLI
 *
 * A command-line interface for batch renaming files with various operations
 */

import { Command } from 'commander';
import { renameFiles } from './renamer.js';

const program = new Command();

program
  .name('file-renamer')
  .description('CLI tool for batch renaming files')
  .version('1.0.0')
  .requiredOption('-d, --directory <path>', 'target directory path')
  .requiredOption(
    '-p, --pattern <pattern>',
    'pattern to match files (* for all, *.txt for text files, etc.)'
  )
  .requiredOption(
    '-o, --operation <type>',
    'operation to perform (add-prefix, add-suffix, change-case, replace, sequence)'
  )
  .option('--prefix <prefix>', 'prefix to add (for add-prefix operation)')
  .option('--suffix <suffix>', 'suffix to add (for add-suffix operation)')
  .option(
    '--case-type <type>',
    'case type (upper, lower, title) for change-case operation'
  )
  .option('--search <text>', 'text to search for (for replace operation)')
  .option('--replace <text>', 'replacement text (for replace operation)')
  .option(
    '--start-number <number>',
    'starting number for sequence operation',
    parseInt
  )
  .action(async options => {
    try {
      const stats = await renameFiles({
        directory: options.directory,
        pattern: options.pattern,
        operation: options.operation,
        prefix: options.prefix,
        suffix: options.suffix,
        caseType: options.caseType,
        search: options.search,
        replace: options.replace,
        startNumber: options.startNumber,
      });

      console.log(
        `Renaming completed. ${stats.renamed} files renamed, ${stats.errors} errors.`
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error('An unknown error occurred');
      }
      process.exit(1);
    }
  });

program.parse();
