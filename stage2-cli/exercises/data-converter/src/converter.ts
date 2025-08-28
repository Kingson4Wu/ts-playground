/**
 * Data Converter module for converting between JSON and CSV formats
 *
 * This module provides a type-safe data conversion implementation with various options
 */

import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

/**
 * Supported input/output formats
 */
export type Format = 'json' | 'csv';

/**
 * Options for data conversion
 */
export interface ConversionOptions {
  /** Path to input file */
  inputFile: string;
  /** Path to output file */
  outputFile: string;
  /** Input format */
  inputFormat: Format;
  /** Output format */
  outputFormat: Format;
  /** CSV delimiter (default: ',') */
  delimiter?: string;
  /** Fields to include in CSV output */
  fields?: string[];
  /** Flatten nested JSON objects */
  flatten?: boolean;
}

/**
 * JSON data type
 */
export type JsonData = any[];

/**
 * CSV data type
 */
export type CsvData = string[][];

/**
 * Converts data between JSON and CSV formats
 *
 * @param options - Conversion options
 * @returns Promise that resolves when conversion is complete
 */
export async function convertData(options: ConversionOptions): Promise<void> {
  const {
    inputFile,
    outputFile,
    inputFormat,
    outputFormat,
    delimiter = ',',
    fields,
    flatten = false,
  } = options;

  // Resolve file paths
  const inputPath = resolve(inputFile);
  const outputPath = resolve(outputFile);

  // Read input file
  let inputData: string;
  try {
    inputData = await readFile(inputPath, 'utf8');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read input file: ${error.message}`);
    }
    throw new Error('Failed to read input file: Unknown error');
  }

  // Convert data based on formats
  let outputData: string;

  if (inputFormat === 'json' && outputFormat === 'csv') {
    // JSON to CSV conversion
    let jsonData: JsonData;
    try {
      jsonData = JSON.parse(inputData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to parse JSON: ${error.message}`);
      }
      throw new Error('Failed to parse JSON: Unknown error');
    }

    if (!Array.isArray(jsonData)) {
      throw new Error('JSON data must be an array');
    }

    const csvData = jsonToCsv(jsonData, delimiter, fields, flatten);
    outputData = csvData.map(row => row.join(delimiter)).join('\n');
  } else if (inputFormat === 'csv' && outputFormat === 'json') {
    // CSV to JSON conversion
    const lines = inputData.split('\n').filter(line => line.trim() !== '');
    const csvData: CsvData = lines.map(line => parseCsvLine(line, delimiter));
    const jsonData = csvToJson(csvData);
    outputData = JSON.stringify(jsonData, null, 2);
  } else {
    throw new Error(
      `Unsupported conversion: ${inputFormat} to ${outputFormat}`
    );
  }

  // Write output file
  try {
    await writeFile(outputPath, outputData, 'utf8');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to write output file: ${error.message}`);
    }
    throw new Error('Failed to write output file: Unknown error');
  }
}

/**
 * Converts JSON data to CSV format
 *
 * @param jsonData - JSON data to convert
 * @param delimiter - CSV delimiter
 * @param fields - Fields to include (optional)
 * @param flatten - Whether to flatten nested objects
 * @returns CSV data
 */
function jsonToCsv(
  jsonData: JsonData,
  delimiter: string,
  fields?: string[],
  flatten: boolean = false
): CsvData {
  if (jsonData.length === 0) {
    return [];
  }

  // Get all possible fields if not specified
  let allFields: string[];
  if (fields) {
    allFields = fields;
  } else {
    const fieldSet = new Set<string>();
    for (const item of jsonData) {
      if (typeof item === 'object' && item !== null) {
        const itemFields = flatten ? getFlattenedKeys(item) : Object.keys(item);
        for (const field of itemFields) {
          fieldSet.add(field);
        }
      }
    }
    allFields = Array.from(fieldSet);
  }

  // Create header row
  const csvData: CsvData = [allFields];

  // Create data rows
  for (const item of jsonData) {
    if (typeof item !== 'object' || item === null) {
      continue;
    }

    const row: string[] = [];
    const flatItem = flatten ? flattenObject(item) : item;

    for (const field of allFields) {
      const value = flatItem[field];
      if (value === undefined || value === null) {
        row.push('');
      } else if (typeof value === 'string') {
        // Escape quotes and wrap in quotes if necessary
        if (
          value.includes(delimiter) ||
          value.includes('"') ||
          value.includes('\n')
        ) {
          row.push(`"${value.replace(/"/g, '""')}"`);
        } else {
          row.push(value);
        }
      } else {
        row.push(String(value));
      }
    }
    csvData.push(row);
  }

  return csvData;
}

/**
 * Converts CSV data to JSON format
 *
 * @param csvData - CSV data to convert
 * @returns JSON data
 */
function csvToJson(csvData: CsvData): JsonData {
  if (csvData.length === 0) {
    return [];
  }

  const headers = csvData[0];
  const jsonData: JsonData = [];

  for (let i = 1; i < csvData.length; i++) {
    const row = csvData[i];
    const obj: any = {};

    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      const value = row[j];

      // Try to parse the value
      if (value === '') {
        obj[header] = null;
      } else if (value === 'true') {
        obj[header] = true;
      } else if (value === 'false') {
        obj[header] = false;
      } else if (!isNaN(Number(value)) && !isNaN(parseFloat(value))) {
        obj[header] = Number(value);
      } else {
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          obj[header] = value.slice(1, -1).replace(/""/g, '"');
        } else {
          obj[header] = value;
        }
      }
    }

    jsonData.push(obj);
  }

  return jsonData;
}

/**
 * Gets all keys from a nested object (flattened)
 *
 * @param obj - Object to get keys from
 * @param prefix - Prefix for nested keys
 * @returns Array of flattened keys
 */
function getFlattenedKeys(obj: any, prefix: string = ''): string[] {
  const keys: string[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        keys.push(...getFlattenedKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
  }

  return keys;
}

/**
 * Flattens a nested object
 *
 * @param obj - Object to flatten
 * @param prefix - Prefix for nested keys
 * @returns Flattened object
 */
function flattenObject(obj: any, prefix: string = ''): any {
  const flattened: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        Object.assign(flattened, flattenObject(obj[key], fullKey));
      } else {
        flattened[fullKey] = obj[key];
      }
    }
  }

  return flattened;
}

/**
 * Parses a CSV line into an array of values
 *
 * @param line - CSV line to parse
 * @param delimiter - CSV delimiter
 * @returns Array of values
 */
function parseCsvLine(line: string, delimiter: string): string[] {
  const values: string[] = [];
  let currentValue = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        // Escaped quote
        currentValue += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      // End of value
      values.push(currentValue);
      currentValue = '';
    } else {
      currentValue += char;
    }
  }

  // Add last value
  values.push(currentValue);

  return values;
}
