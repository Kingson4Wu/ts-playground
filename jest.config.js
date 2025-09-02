module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/stage1-foundations/exercises',
    '<rootDir>/stage2-cli/exercises',
    '<rootDir>/stage3-backend/exercises',
    '<rootDir>/stage4-production/exercises',
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: [
    'stage1-foundations/exercises/**/*.{ts,tsx}',
    'stage2-cli/exercises/**/*.{ts,tsx}',
    'stage3-backend/exercises/**/*.{ts,tsx}',
    'stage4-production/exercises/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
