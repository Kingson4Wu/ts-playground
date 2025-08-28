/**
 * Unit tests for the calculator module
 */

import {
  calculate,
  Operation,
} from '../exercises/calculator/src/calculator.js';

describe('Calculator', () => {
  describe('addition', () => {
    it('should correctly add two positive numbers', () => {
      expect(calculate(2, 3, 'add')).toBe(5);
    });

    it('should correctly add negative numbers', () => {
      expect(calculate(-2, -3, 'add')).toBe(-5);
    });

    it('should correctly add a positive and negative number', () => {
      expect(calculate(5, -3, 'add')).toBe(2);
    });

    it('should correctly add decimal numbers', () => {
      expect(calculate(1.5, 2.5, 'add')).toBe(4);
    });
  });

  describe('subtraction', () => {
    it('should correctly subtract two positive numbers', () => {
      expect(calculate(5, 3, 'subtract')).toBe(2);
    });

    it('should correctly subtract negative numbers', () => {
      expect(calculate(-2, -3, 'subtract')).toBe(1);
    });

    it('should correctly subtract a positive and negative number', () => {
      expect(calculate(5, -3, 'subtract')).toBe(8);
    });

    it('should correctly subtract decimal numbers', () => {
      expect(calculate(3.5, 1.5, 'subtract')).toBe(2);
    });
  });

  describe('multiplication', () => {
    it('should correctly multiply two positive numbers', () => {
      expect(calculate(3, 4, 'multiply')).toBe(12);
    });

    it('should correctly multiply negative numbers', () => {
      expect(calculate(-3, -4, 'multiply')).toBe(12);
    });

    it('should correctly multiply a positive and negative number', () => {
      expect(calculate(3, -4, 'multiply')).toBe(-12);
    });

    it('should correctly multiply decimal numbers', () => {
      expect(calculate(1.5, 2, 'multiply')).toBe(3);
    });

    it('should correctly multiply by zero', () => {
      expect(calculate(5, 0, 'multiply')).toBe(0);
    });
  });

  describe('division', () => {
    it('should correctly divide two positive numbers', () => {
      expect(calculate(8, 4, 'divide')).toBe(2);
    });

    it('should correctly divide negative numbers', () => {
      expect(calculate(-8, -4, 'divide')).toBe(2);
    });

    it('should correctly divide a positive and negative number', () => {
      expect(calculate(8, -4, 'divide')).toBe(-2);
    });

    it('should correctly divide decimal numbers', () => {
      expect(calculate(3.5, 0.5, 'divide')).toBe(7);
    });

    it('should throw an error when dividing by zero', () => {
      expect(() => calculate(5, 0, 'divide')).toThrow(
        'Division by zero is not allowed'
      );
    });
  });

  describe('unsupported operations', () => {
    it('should throw an error for unsupported operations', () => {
      // Cast to any to bypass TypeScript's type checking for this test
      expect(() => calculate(1, 2, 'modulo' as Operation)).toThrow(
        'Unsupported operation: modulo'
      );
    });
  });
});
