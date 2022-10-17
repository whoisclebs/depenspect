module.exports = {
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: [
    '<rootDir>/lib/**/*.ts',
    '!<rootDir>/lib/main/**'
  ],
  testEnvironment: 'node',
  coverageProvider: 'babel',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/lib/$1'
  }
}
