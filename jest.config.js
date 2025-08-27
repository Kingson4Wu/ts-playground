module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/stage1-foundations',
    '<rootDir>/stage2-cli',
    '<rootDir>/stage3-backend',
    '<rootDir>/stage4-production',
    '<rootDir>/tests'
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\.(ts|tsx)$': 'ts-jest'
  },
  collectCoverageFrom: [
    'stage1-foundations/**/*.{ts,tsx}',
    'stage2-cli/**/*.{ts,tsx}',
    'stage3-backend/**/*.{ts,tsx}',
    'stage4-production/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};