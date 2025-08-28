/**
 * Unit tests for the password generator module
 */

import {
  generatePassword,
  PasswordOptions,
} from '../exercises/password-generator/src/password-generator.js';

describe('Password Generator', () => {
  describe('default options', () => {
    it('should generate a password with default length of 12', () => {
      const password = generatePassword();
      expect(password).toHaveLength(12);
    });

    it('should generate a password containing all character types by default', () => {
      const password = generatePassword();
      expect(password).toMatch(/[A-Z]/); // Uppercase
      expect(password).toMatch(/[a-z]/); // Lowercase
      expect(password).toMatch(/[0-9]/); // Numbers
      expect(password).toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/); // Symbols
    });
  });

  describe('length option', () => {
    it('should generate a password with specified length', () => {
      const password = generatePassword({ length: 16 });
      expect(password).toHaveLength(16);
    });

    it('should throw an error for length less than 1', () => {
      expect(() => generatePassword({ length: 0 })).toThrow(
        'Password length must be at least 1'
      );
      expect(() => generatePassword({ length: -5 })).toThrow(
        'Password length must be at least 1'
      );
    });
  });

  describe('character set options', () => {
    it('should generate a password with only uppercase letters', () => {
      const password = generatePassword({
        length: 10,
        includeUppercase: true,
        includeLowercase: false,
        includeNumbers: false,
        includeSymbols: false,
      });
      expect(password).toHaveLength(10);
      expect(password).toMatch(/^[A-Z]+$/);
    });

    it('should generate a password with only lowercase letters', () => {
      const password = generatePassword({
        length: 10,
        includeUppercase: false,
        includeLowercase: true,
        includeNumbers: false,
        includeSymbols: false,
      });
      expect(password).toHaveLength(10);
      expect(password).toMatch(/^[a-z]+$/);
    });

    it('should generate a password with only numbers', () => {
      const password = generatePassword({
        length: 10,
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: true,
        includeSymbols: false,
      });
      expect(password).toHaveLength(10);
      expect(password).toMatch(/^[0-9]+$/);
    });

    it('should generate a password with only symbols', () => {
      const password = generatePassword({
        length: 10,
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: false,
        includeSymbols: true,
      });
      expect(password).toHaveLength(10);
      expect(password).toMatch(/^[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/);
    });

    it('should throw an error when all character sets are disabled', () => {
      expect(() =>
        generatePassword({
          includeUppercase: false,
          includeLowercase: false,
          includeNumbers: false,
          includeSymbols: false,
        })
      ).toThrow('At least one character set must be selected');
    });
  });

  describe('exclude similar characters option', () => {
    it('should exclude similar characters when requested', () => {
      const password = generatePassword({
        length: 50,
        excludeSimilarCharacters: true,
      });
      expect(password).toHaveLength(50);
      expect(password).not.toMatch(/[0OlI1]/);
    });
  });

  describe('minimum length requirements', () => {
    it('should throw an error when length is less than required character types', () => {
      expect(() =>
        generatePassword({
          length: 2,
          includeUppercase: true,
          includeLowercase: true,
          includeNumbers: true,
          includeSymbols: true,
        })
      ).toThrow(
        'Password length must be at least 4 to include all required character types'
      );
    });

    it('should generate a password with minimum length for selected character types', () => {
      const password = generatePassword({
        length: 3,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: false,
      });
      expect(password).toHaveLength(3);
      expect(password).toMatch(/[A-Z]/); // Uppercase
      expect(password).toMatch(/[a-z]/); // Lowercase
      expect(password).toMatch(/[0-9]/); // Numbers
    });
  });

  describe('randomness', () => {
    it('should generate different passwords on each call', () => {
      const passwords = new Set();
      for (let i = 0; i < 100; i++) {
        passwords.add(generatePassword());
      }
      // With a good random generator, the chance of having duplicate passwords
      // in 100 iterations is extremely low
      expect(passwords.size).toBe(100);
    });
  });
});
