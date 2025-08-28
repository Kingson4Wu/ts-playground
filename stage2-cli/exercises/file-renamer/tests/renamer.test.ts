/**
 * Unit tests for the file renamer module
 */

// Mock file system functions
const mockReaddir = jest.fn();
const mockRename = jest.fn();

// Mock the fs/promises module
jest.mock('fs/promises', () => ({
  readdir: mockReaddir,
  rename: mockRename,
}));

import { renameFiles } from '../src/renamer';

describe('File Renamer', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('add-prefix operation', () => {
    it('should add prefix to all matching files', async () => {
      mockReaddir.mockResolvedValue(['file1.txt', 'file2.txt', 'other.doc']);

      const stats = await renameFiles({
        directory: '/test/dir',
        pattern: '*.txt',
        operation: 'add-prefix',
        prefix: 'new-',
      });

      expect(mockReaddir).toHaveBeenCalledWith('/test/dir');
      expect(mockRename).toHaveBeenCalledTimes(2);
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file1.txt',
        '/test/dir/new-file1.txt'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file2.txt',
        '/test/dir/new-file2.txt'
      );
      expect(stats.renamed).toBe(2);
      expect(stats.errors).toBe(0);
    });

    it('should throw an error when prefix is not provided', async () => {
      mockReaddir.mockResolvedValue(['file1.txt']);

      await expect(
        renameFiles({
          directory: '/test/dir',
          pattern: '*.txt',
          operation: 'add-prefix',
        })
      ).rejects.toThrow('Prefix is required for add-prefix operation');
    });
  });

  describe('add-suffix operation', () => {
    it('should add suffix to all matching files', async () => {
      mockReaddir.mockResolvedValue(['file1.txt', 'file2.txt', 'other.doc']);

      const stats = await renameFiles({
        directory: '/test/dir',
        pattern: '*.txt',
        operation: 'add-suffix',
        suffix: '-backup',
      });

      expect(mockReaddir).toHaveBeenCalledWith('/test/dir');
      expect(mockRename).toHaveBeenCalledTimes(2);
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file1.txt',
        '/test/dir/file1-backup.txt'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file2.txt',
        '/test/dir/file2-backup.txt'
      );
      expect(stats.renamed).toBe(2);
      expect(stats.errors).toBe(0);
    });

    it('should throw an error when suffix is not provided', async () => {
      mockReaddir.mockResolvedValue(['file1.txt']);

      await expect(
        renameFiles({
          directory: '/test/dir',
          pattern: '*.txt',
          operation: 'add-suffix',
        })
      ).rejects.toThrow('Suffix is required for add-suffix operation');
    });
  });

  describe('change-case operation', () => {
    it('should convert filenames to uppercase', async () => {
      mockReaddir.mockResolvedValue(['File1.txt', 'file2.TXT', 'Other.doc']);

      const stats = await renameFiles({
        directory: '/test/dir',
        pattern: '*',
        operation: 'change-case',
        caseType: 'upper',
      });

      expect(mockReaddir).toHaveBeenCalledWith('/test/dir');
      expect(mockRename).toHaveBeenCalledTimes(3);
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/File1.txt',
        '/test/dir/FILE1.TXT'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file2.TXT',
        '/test/dir/FILE2.TXT'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/Other.doc',
        '/test/dir/OTHER.DOC'
      );
      expect(stats.renamed).toBe(3);
      expect(stats.errors).toBe(0);
    });

    it('should convert filenames to lowercase', async () => {
      mockReaddir.mockResolvedValue(['File1.txt', 'file2.TXT', 'Other.doc']);

      const stats = await renameFiles({
        directory: '/test/dir',
        pattern: '*',
        operation: 'change-case',
        caseType: 'lower',
      });

      expect(mockReaddir).toHaveBeenCalledWith('/test/dir');
      expect(mockRename).toHaveBeenCalledTimes(3);
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/File1.txt',
        '/test/dir/file1.txt'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file2.TXT',
        '/test/dir/file2.txt'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/Other.doc',
        '/test/dir/other.doc'
      );
      expect(stats.renamed).toBe(3);
      expect(stats.errors).toBe(0);
    });

    it('should convert filenames to title case', async () => {
      mockReaddir.mockResolvedValue([
        'file1.txt',
        'test_file.TXT',
        'other.doc',
      ]);

      const stats = await renameFiles({
        directory: '/test/dir',
        pattern: '*',
        operation: 'change-case',
        caseType: 'title',
      });

      expect(mockReaddir).toHaveBeenCalledWith('/test/dir');
      expect(mockRename).toHaveBeenCalledTimes(3);
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file1.txt',
        '/test/dir/File1.Txt'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/test_file.TXT',
        '/test/dir/Test_File.Txt'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/other.doc',
        '/test/dir/Other.Doc'
      );
      expect(stats.renamed).toBe(3);
      expect(stats.errors).toBe(0);
    });

    it('should throw an error when case type is not provided', async () => {
      mockReaddir.mockResolvedValue(['file1.txt']);

      await expect(
        renameFiles({
          directory: '/test/dir',
          pattern: '*',
          operation: 'change-case',
        })
      ).rejects.toThrow('Case type is required for change-case operation');
    });
  });

  describe('replace operation', () => {
    it('should replace text in filenames', async () => {
      mockReaddir.mockResolvedValue([
        'file_old.txt',
        'old_file.txt',
        'other.doc',
      ]);

      const stats = await renameFiles({
        directory: '/test/dir',
        pattern: '*.txt',
        operation: 'replace',
        search: 'old',
        replace: 'new',
      });

      expect(mockReaddir).toHaveBeenCalledWith('/test/dir');
      expect(mockRename).toHaveBeenCalledTimes(2);
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file_old.txt',
        '/test/dir/file_new.txt'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/old_file.txt',
        '/test/dir/new_file.txt'
      );
      expect(stats.renamed).toBe(2);
      expect(stats.errors).toBe(0);
    });

    it('should throw an error when search text is not provided', async () => {
      mockReaddir.mockResolvedValue(['file1.txt']);

      await expect(
        renameFiles({
          directory: '/test/dir',
          pattern: '*',
          operation: 'replace',
        })
      ).rejects.toThrow('Search text is required for replace operation');
    });
  });

  describe('sequence operation', () => {
    it('should rename files with sequential numbers', async () => {
      mockReaddir.mockResolvedValue(['file1.txt', 'file2.txt', 'file3.txt']);

      const stats = await renameFiles({
        directory: '/test/dir',
        pattern: '*.txt',
        operation: 'sequence',
      });

      expect(mockReaddir).toHaveBeenCalledWith('/test/dir');
      expect(mockRename).toHaveBeenCalledTimes(3);
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file1.txt',
        '/test/dir/1.txt'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file2.txt',
        '/test/dir/2.txt'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file3.txt',
        '/test/dir/3.txt'
      );
      expect(stats.renamed).toBe(3);
      expect(stats.errors).toBe(0);
    });

    it('should rename files with sequential numbers starting from a custom number', async () => {
      mockReaddir.mockResolvedValue(['file1.txt', 'file2.txt', 'file3.txt']);

      const stats = await renameFiles({
        directory: '/test/dir',
        pattern: '*.txt',
        operation: 'sequence',
        startNumber: 10,
      });

      expect(mockReaddir).toHaveBeenCalledWith('/test/dir');
      expect(mockRename).toHaveBeenCalledTimes(3);
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file1.txt',
        '/test/dir/10.txt'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file2.txt',
        '/test/dir/11.txt'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file3.txt',
        '/test/dir/12.txt'
      );
      expect(stats.renamed).toBe(3);
      expect(stats.errors).toBe(0);
    });
  });

  describe('error handling', () => {
    it('should handle directory read errors', async () => {
      mockReaddir.mockRejectedValue(new Error('Permission denied'));

      await expect(
        renameFiles({
          directory: '/test/dir',
          pattern: '*',
          operation: 'add-prefix',
          prefix: 'new-',
        })
      ).rejects.toThrow('Failed to read directory: Permission denied');
    });

    it('should continue renaming other files when one fails', async () => {
      mockReaddir.mockResolvedValue(['file1.txt', 'file2.txt', 'file3.txt']);
      mockRename
        .mockResolvedValueOnce(undefined) // First rename succeeds
        .mockRejectedValueOnce(new Error('Permission denied')) // Second rename fails
        .mockResolvedValueOnce(undefined); // Third rename succeeds

      const stats = await renameFiles({
        directory: '/test/dir',
        pattern: '*.txt',
        operation: 'add-prefix',
        prefix: 'new-',
      });

      expect(mockReaddir).toHaveBeenCalledWith('/test/dir');
      expect(mockRename).toHaveBeenCalledTimes(3);
      expect(stats.renamed).toBe(2);
      expect(stats.errors).toBe(1);
    });
  });

  describe('pattern matching', () => {
    it('should match all files with * pattern', async () => {
      mockReaddir.mockResolvedValue(['file1.txt', 'file2.doc', 'file3.pdf']);

      const stats = await renameFiles({
        directory: '/test/dir',
        pattern: '*',
        operation: 'add-prefix',
        prefix: 'new-',
      });

      expect(mockReaddir).toHaveBeenCalledWith('/test/dir');
      expect(mockRename).toHaveBeenCalledTimes(3);
      expect(stats.renamed).toBe(3);
      expect(stats.errors).toBe(0);
    });

    it('should match files with specific extension', async () => {
      mockReaddir.mockResolvedValue(['file1.txt', 'file2.doc', 'file3.txt']);

      const stats = await renameFiles({
        directory: '/test/dir',
        pattern: '*.txt',
        operation: 'add-prefix',
        prefix: 'new-',
      });

      expect(mockReaddir).toHaveBeenCalledWith('/test/dir');
      expect(mockRename).toHaveBeenCalledTimes(2);
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file1.txt',
        '/test/dir/new-file1.txt'
      );
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file3.txt',
        '/test/dir/new-file3.txt'
      );
      expect(stats.renamed).toBe(2);
      expect(stats.errors).toBe(0);
    });

    it('should match files with exact name', async () => {
      mockReaddir.mockResolvedValue(['file1.txt', 'file2.doc', 'file3.txt']);

      const stats = await renameFiles({
        directory: '/test/dir',
        pattern: 'file1.txt',
        operation: 'add-prefix',
        prefix: 'new-',
      });

      expect(mockReaddir).toHaveBeenCalledWith('/test/dir');
      expect(mockRename).toHaveBeenCalledTimes(1);
      expect(mockRename).toHaveBeenCalledWith(
        '/test/dir/file1.txt',
        '/test/dir/new-file1.txt'
      );
      expect(stats.renamed).toBe(1);
      expect(stats.errors).toBe(0);
    });
  });
});
