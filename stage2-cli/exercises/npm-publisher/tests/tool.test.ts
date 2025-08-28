/**
 * Unit tests for the text analysis tool
 */

import { analyzeText } from '../src/tool';

describe('Text Analysis Tool', () => {
  describe('analyzeText function', () => {
    it('should correctly analyze a simple text', () => {
      const text = 'Hello world\nThis is a test';
      const result = analyzeText(text);

      expect(result.words).toBe(6);
      expect(result.characters).toBe(26); // 11 + 1 + 14 = 26 characters
      expect(result.lines).toBe(2);
      expect(result.averageWordLength).toBeCloseTo(3.5, 2); // (5+5+4+2+1+4)/6 = 21/6 = 3.5
    });

    it('should handle empty text', () => {
      const text = '';
      const result = analyzeText(text);

      expect(result.words).toBe(0);
      expect(result.characters).toBe(0);
      expect(result.lines).toBe(0);
      expect(result.averageWordLength).toBe(0);
    });

    it('should handle text with extra whitespace', () => {
      const text = '  Hello   world  \n\n  This   is   a   test  ';
      const result = analyzeText(text);

      expect(result.words).toBe(6);
      expect(result.characters).toBe(43); // 43 characters
      expect(result.lines).toBe(3);
      expect(result.averageWordLength).toBeCloseTo(3.5, 2); // (5+5+4+2+1+4)/6 = 21/6 = 3.5
    });

    it('should handle single word', () => {
      const text = 'Hello';
      const result = analyzeText(text);

      expect(result.words).toBe(1);
      expect(result.characters).toBe(5);
      expect(result.lines).toBe(1);
      expect(result.averageWordLength).toBe(5);
    });

    it('should handle text with special characters', () => {
      const text = 'Hello, world!\nThis is a test.';
      const result = analyzeText(text);

      expect(result.words).toBe(6);
      expect(result.characters).toBe(29); // 29 characters
      expect(result.lines).toBe(2);
      expect(result.averageWordLength).toBeCloseTo(4, 2); // (6+6+4+2+1+5)/6 = 24/6 = 4
    });
  });
});
