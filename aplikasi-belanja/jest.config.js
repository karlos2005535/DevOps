/** @type {import('jest').Config} */
const config = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],

  // Module name mapping
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^app/(.*)$": "<rootDir>/src/app/$1",
  },

  // Transform
  transform: {
    "^.+\\.(ts|js|mjs|html)$": [
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.(html|svg)$",
      },
    ],
  },

  // Test matching
  testMatch: ["<rootDir>/src/**/*.spec.ts"],

  // Ignore patterns
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],

  // Setup untuk ESM
  extensionsToTreatAsEsm: [".ts"],

  // Environment
  testEnvironment: "jsdom",

  // NO coverage untuk sekarang
  collectCoverage: false,
};

module.exports = config;
