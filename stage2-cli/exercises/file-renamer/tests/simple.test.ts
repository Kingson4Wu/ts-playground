/**
 * Simple test for the file renamer module
 */

import { renameFiles } from '../src/renamer';

// This is a simple test to verify the module can be imported without errors
describe('File Renamer Module', () => {
  it('should export renameFiles function', () => {
    expect(typeof renameFiles).toBe('function');
  });
});
