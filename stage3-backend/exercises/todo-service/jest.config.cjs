/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          allowSyntheticDefaultImports: true,
          esModuleInterop: true,
          types: ['node', 'jest'],
          allowImportingTsExtensions: true,
        },
      },
    ],
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/index.ts',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^\\.\\/routes\\/(.*)\\.js$': '<rootDir>/src/routes/$1.ts',
    '^\\.{1,2}/services/(.*)\\.js$': '<rootDir>/src/services/$1.ts',
    '^\\.{1,2}/models/(.*)\\.js$': '<rootDir>/src/models/$1.ts',
    '^\\.{1,2}/utils/(.*)\\.js$': '<rootDir>/src/utils/$1.ts',
  },
  extensionsToTreatAsEsm: ['.ts'],
};
