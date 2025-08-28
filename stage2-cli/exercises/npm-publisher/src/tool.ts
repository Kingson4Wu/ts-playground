/**
 * Text Analysis Tool
 *
 * A simple CLI tool for analyzing text files
 */

/**
 * Text analysis results
 */
export interface TextAnalysis {
  /** Number of words in the text */
  words: number;
  /** Number of characters in the text */
  characters: number;
  /** Number of lines in the text */
  lines: number;
  /** Average word length */
  averageWordLength: number;
}

/**
 * Analyzes text and returns statistics
 *
 * @param text - Text to analyze
 * @returns Text analysis results
 */
export function analyzeText(text: string): TextAnalysis {
  // Count lines
  const lines = text === '' ? 0 : text.split('\n').length;

  // Count characters
  const characters = text.length;

  // Count words
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  // Calculate average word length
  let totalWordLength = 0;
  if (words > 0) {
    const wordArray = text.trim().split(/\s+/);
    totalWordLength = wordArray.reduce((sum, word) => sum + word.length, 0);
  }
  const averageWordLength = words > 0 ? totalWordLength / words : 0;

  return {
    words,
    characters,
    lines,
    averageWordLength,
  };
}
