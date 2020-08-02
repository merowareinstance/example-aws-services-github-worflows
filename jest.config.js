module.exports = {
  testEnvironment: "<rootDir>/config/tests/test-environment.js",
  setupFilesAfterEnv: ["./config/tests/test-setup.js"],
  globals: {
    NODE_ENV: "test",
  },
  modulePathIgnorePatterns: ["./config"],
};
