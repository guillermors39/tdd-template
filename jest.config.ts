import type { Config } from 'jest';

const config: Config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: 'tests/unit/.*\\.spec\\.ts$',
    transform: {
        '^.+\.ts$': 'ts-jest',
    },
    collectCoverageFrom: ['src/**/*.(t|j)s', '!src/index.ts'],
    coverageDirectory: '<rootDir>/coverage',
    testEnvironment: 'node',
};

export default config;
