/** @type {import('jest').Config} */
const config = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],

  // Hanya ini yang diperlukan
  testEnvironment: "jsdom",

  // Transformasi
  transform: {
    "^.+\\.(ts|js|html)$": "jest-preset-angular",
  },

  // Module mapping SEDERHANA
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },

  // Test matching
  testMatch: ["<rootDir>/src/**/*.spec.ts"],

  // Ignore
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],

  // NO coverage untuk sekarang
  collectCoverage: false,

  // NO globals, NO resolver
};

module.exports = config;
