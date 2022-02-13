module.exports = {
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.ts', '!**/src/main/**'],
  testTimeout: 20000
}
