#!/usr/bin/env node

/**
 * Text Analysis CLI Tool
 *
 * A command-line interface for analyzing text files
 */

import { Command } from 'commander';
import { analyzeText } from './tool.js';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

const program = new Command();

program
  .name('text-analyzer')
  .description('CLI tool for analyzing text files')
  .version('1.0.0')
  .argument('<file>', 'file to analyze')
  .option('-f, --format <format>', 'output format (json or table)', 'table')
  .action(async (file, options) => {
    try {
      // Read the file
      const filePath = resolve(file);
      const text = await readFile(filePath, 'utf8');

      // Analyze the text
      const analysis = analyzeText(text);

      // Output results
      if (options.format === 'json') {
        console.log(JSON.stringify(analysis, null, 2));
      } else {
        console.log('Text Analysis Results:');
        console.log('=====================');
        console.log(`Words: ${analysis.words}`);
        console.log(`Characters: ${analysis.characters}`);
        console.log(`Lines: ${analysis.lines}`);
        console.log(
          `Average Word Length: ${analysis.averageWordLength.toFixed(2)}`
        );
      }
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
