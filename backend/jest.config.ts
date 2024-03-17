module.exports =  {
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: ['<rootDir>/tests/**/*.ts'],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  // preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
