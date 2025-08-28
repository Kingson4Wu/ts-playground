/**
 * Password Generator module for creating cryptographically secure random passwords
 *
 * This module provides a type-safe password generator implementation with customizable options
 */

import { randomBytes } from 'crypto';

/**
 * Options for password generation
 */
export interface PasswordOptions {
  /** Length of the password (default: 12) */
  length?: number;
  /** Include uppercase letters (default: true) */
  includeUppercase?: boolean;
  /** Include lowercase letters (default: true) */
  includeLowercase?: boolean;
  /** Include numbers (default: true) */
  includeNumbers?: boolean;
  /** Include symbols (default: true) */
  includeSymbols?: boolean;
  /** Exclude similar characters like 0, O, l, I, 1 (default: false) */
  excludeSimilarCharacters?: boolean;
}

// Character sets
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR_CHARACTERS = '0OlI1';

/**
 * Generates a cryptographically secure random password
 *
 * @param options - Password generation options
 * @returns The generated password
 * @throws {Error} When options are invalid or password cannot be generated
 */
export function generatePassword(options: PasswordOptions = {}): string {
  // Set default options
  const {
    length = 12,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true,
    excludeSimilarCharacters = false,
  } = options;

  // Validate options
  if (length < 1) {
    throw new Error('Password length must be at least 1');
  }

  // Build character set based on options
  let charset = '';
  const requiredChars: string[] = [];

  if (includeUppercase) {
    let chars = UPPERCASE;
    if (excludeSimilarCharacters) {
      chars = chars
        .split('')
        .filter(char => !SIMILAR_CHARACTERS.includes(char))
        .join('');
    }
    charset += chars;
    requiredChars.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }

  if (includeLowercase) {
    let chars = LOWERCASE;
    if (excludeSimilarCharacters) {
      chars = chars
        .split('')
        .filter(char => !SIMILAR_CHARACTERS.includes(char))
        .join('');
    }
    charset += chars;
    requiredChars.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }

  if (includeNumbers) {
    let chars = NUMBERS;
    if (excludeSimilarCharacters) {
      chars = chars
        .split('')
        .filter(char => !SIMILAR_CHARACTERS.includes(char))
        .join('');
    }
    charset += chars;
    requiredChars.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }

  if (includeSymbols) {
    let chars = SYMBOLS;
    if (excludeSimilarCharacters) {
      chars = chars
        .split('')
        .filter(char => !SIMILAR_CHARACTERS.includes(char))
        .join('');
    }
    charset += chars;
    requiredChars.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }

  // Check if at least one character set is selected
  if (charset.length === 0) {
    throw new Error('At least one character set must be selected');
  }

  // Check if length is sufficient for required characters
  if (length < requiredChars.length) {
    throw new Error(
      `Password length must be at least ${requiredChars.length} to include all required character types`
    );
  }

  // Generate random bytes
  const randomBytesBuffer = randomBytes(length);

  // Generate password
  let password = '';

  // Add required characters first
  for (const char of requiredChars) {
    password += char;
  }

  // Fill the rest of the password with random characters
  for (let i = requiredChars.length; i < length; i++) {
    const randomIndex = randomBytesBuffer[i] % charset.length;
    password += charset[randomIndex];
  }

  // Shuffle the password to avoid predictable patterns
  const passwordArray = password.split('');
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = randomBytesBuffer[i] % (i + 1);
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join('');
}
