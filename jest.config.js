export default {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/**/*.test.js', '<rootDir>/tests/**/*.test.jsx'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/tests/setup.js'],
  collectCoverageFrom: [
    '<rootDir>/src/api/studentApi.js',
    '<rootDir>/src/pages/AddStudent.jsx',
  ],
}
