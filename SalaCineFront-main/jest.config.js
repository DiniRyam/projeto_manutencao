const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // aqui fala pro jest onde esta a configuração do next
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}

module.exports = createJestConfig(customJestConfig)