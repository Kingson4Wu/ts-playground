/**
 * Simple test for the data converter module
 */

import { convertData } from '../src/converter';

// This is a simple test to verify the module can be imported without errors
describe('Data Converter Module', () => {
  it('should export convertData function', () => {
    expect(typeof convertData).toBe('function');
  });
});
