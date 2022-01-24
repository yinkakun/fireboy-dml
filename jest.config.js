const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestSetup = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@components(.*)$': '<rootDir>/components$1',
    '^@hooks(.*)$': '<rootDir>/hooks$1',
    '^@lib(.*)$': '<rootDir>/lib$1',
    '^@styles(.*)$': '<rootDir>/styles$1',
    '^@public(.*)$': '<rootDir>/public$1',
  },
};

module.exports = createJestConfig(customJestSetup);
