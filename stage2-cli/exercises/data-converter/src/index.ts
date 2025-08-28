#!/usr/bin/env node

/**
 * JSON/CSV Data Conversion Utility CLI
 *
 * A command-line interface for converting data between JSON and CSV formats
 */

import { Command } from 'commander';
import { convertData } from './converter.js';

const program = new Command();

program
  .name('data-converter')
  .description('CLI utility for converting data between JSON and CSV formats')
  .version('1.0.0')
  .requiredOption('-i, --input-file <path>', 'input file path')
  .requiredOption('-o, --output-file <path>', 'output file path')
  .requiredOption('--input-format <format>', 'input format (json or csv)')
  .requiredOption('--output-format <format>', 'output format (json or csv)')
  .option('-d, --delimiter <char>', 'CSV delimiter (default: ,)')
  .option('-f, --fields <fields...>', 'fields to include in CSV output')
  .option('--flatten', 'flatten nested JSON objects')
  .action(async options => {
    try {
      await convertData({
        inputFile: options.inputFile,
        outputFile: options.outputFile,
        inputFormat: options.inputFormat,
        outputFormat: options.outputFormat,
        delimiter: options.delimiter,
        fields: options.fields,
        flatten: options.flatten,
      });

      console.log(
        `Successfully converted ${options.inputFile} to ${options.outputFile}`
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
