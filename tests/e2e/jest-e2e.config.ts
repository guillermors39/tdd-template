import { Config } from 'jest';

const config: Config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '../../',
    testEnvironment: 'node',
    testRegex: 'tests/e2e/.*\\.e2e-spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: [
        'src/**/controllers/**/*.ts',
        'src/**/responses/**/*.ts',
        'src/**/requests/**/*.ts',
        'src/**/repositories/**/*.ts',
    ],
    coverageDirectory: '<rootDir>/tests/e2e/coverage',
    setupFilesAfterEnv: ['<rootDir>/tests/e2e/jest.e2e.setup.ts'],
    testTimeout: 60000, // 60 segundos para tests e2e
    forceExit: true, // Fuerza la salida después de completar los tests
    detectOpenHandles: true, // Detecta handles abiertos para debugging
};

export default config;
