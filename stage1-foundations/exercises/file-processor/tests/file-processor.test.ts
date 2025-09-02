/**
 * Unit tests for the file processor module
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import {
  processFile,
  OperationType,
} from '../../file-processor/src/file-processor.ts';

// Create a temporary directory for test files
const tempDir = join(process.cwd(), 'temp-tests');

// Test files content
const testFiles = {
  'simple.txt': 'Hello world\nThis is a test file\nWith multiple lines',
  'empty.txt': '',
  'whitespace.txt': '  Hello    world  \n\n  This   is   a   test  ',
  'pattern.txt':
    'The quick brown fox jumps over the lazy dog. The fox is quick.',
};

// Create test files before running tests
beforeAll(async () => {
  // Create temp directory
  try {
    await fs.mkdir(tempDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }

  // Create test files
  for (const [filename, content] of Object.entries(testFiles)) {
    await fs.writeFile(join(tempDir, filename), content, 'utf8');
  }
});

// Clean up test files after running tests
afterAll(async () => {
  // Remove test files
  for (const filename of Object.keys(testFiles)) {
    try {
      await fs.unlink(join(tempDir, filename));
    } catch (error) {
      // File might not exist
    }
  }

  // Remove temp directory
  try {
    await fs.rmdir(tempDir);
  } catch (error) {
    // Directory might not be empty or might not exist
  }
});

describe('File Processor', () => {
  describe('count-words operation', () => {
    it('should count words in a file', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'simple.txt'),
        operation: 'count-words',
      });
      expect(result).toBe(10);
    });

    it('should return 0 for an empty file', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'empty.txt'),
        operation: 'count-words',
      });
      expect(result).toBe(0);
    });
  });

  describe('count-lines operation', () => {
    it('should count lines in a file', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'simple.txt'),
        operation: 'count-lines',
      });
      expect(result).toBe(3);
    });

    it('should return 0 for an empty file', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'empty.txt'),
        operation: 'count-lines',
      });
      expect(result).toBe(0);
    });
  });

  describe('count-chars operation', () => {
    it('should count characters in a file', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'simple.txt'),
        operation: 'count-chars',
      });
      expect(result).toBe(51); // 48 characters + 3 newlines
    });

    it('should return 0 for an empty file', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'empty.txt'),
        operation: 'count-chars',
      });
      expect(result).toBe(0);
    });
  });

  describe('find-pattern operation', () => {
    it('should find occurrences of a pattern in a file', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'pattern.txt'),
        operation: 'find-pattern',
        pattern: 'the',
      });
      expect(result).toBe(1);
    });

    it('should return 0 when pattern is not found', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'pattern.txt'),
        operation: 'find-pattern',
        pattern: 'xyz',
      });
      expect(result).toBe(0);
    });

    it('should throw an error when pattern is not provided', async () => {
      await expect(
        processFile({
          filePath: join(tempDir, 'simple.txt'),
          operation: 'find-pattern',
        })
      ).rejects.toThrow('Pattern is required for find-pattern operation');
    });

    it('should throw an error when pattern is invalid regex', async () => {
      await expect(
        processFile({
          filePath: join(tempDir, 'simple.txt'),
          operation: 'find-pattern',
          pattern: '[',
        })
      ).rejects.toThrow(/Invalid regex pattern/);
    });
  });

  describe('to-upper operation', () => {
    it('should convert file content to uppercase', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'simple.txt'),
        operation: 'to-upper',
      });
      expect(result).toBe(
        'HELLO WORLD\nTHIS IS A TEST FILE\nWITH MULTIPLE LINES'
      );
    });

    it('should return empty string for an empty file', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'empty.txt'),
        operation: 'to-upper',
      });
      expect(result).toBe('');
    });
  });

  describe('to-lower operation', () => {
    it('should convert file content to lowercase', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'simple.txt'),
        operation: 'to-lower',
      });
      expect(result).toBe(
        'hello world\nthis is a test file\nwith multiple lines'
      );
    });

    it('should return empty string for an empty file', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'empty.txt'),
        operation: 'to-lower',
      });
      expect(result).toBe('');
    });
  });

  describe('remove-whitespace operation', () => {
    it('should remove extra whitespace from file content', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'whitespace.txt'),
        operation: 'remove-whitespace',
      });
      expect(result).toBe('Hello world This is a test');
    });

    it('should return empty string for an empty file', async () => {
      const result = await processFile({
        filePath: join(tempDir, 'empty.txt'),
        operation: 'remove-whitespace',
      });
      expect(result).toBe('');
    });
  });

  describe('error handling', () => {
    it('should throw an error for non-existent file', async () => {
      await expect(
        processFile({
          filePath: join(tempDir, 'non-existent.txt'),
          operation: 'count-words',
        })
      ).rejects.toThrow(/Failed to read file/);
    });

    it('should throw an error for unsupported operation', async () => {
      // Cast to any to bypass TypeScript's type checking for this test
      await expect(
        processFile({
          filePath: join(tempDir, 'simple.txt'),
          operation: 'invalid-operation' as OperationType,
        })
      ).rejects.toThrow('Unsupported operation: invalid-operation');
    });
  });
});
