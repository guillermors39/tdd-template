import type { Config } from 'jest';

const config: Config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: 'src/.*/__tests__/.*\\.spec\\.ts$',
    transform: {
        '^.+\.ts$': 'ts-jest',
    },
    collectCoverageFrom: [
        'src/**/*.(t|j)s',
        '!src/index.ts',
        '!src/bootstrap.ts',
        '!src/**/*.interface.ts',
        '!src/**/*.type.ts',
        '!src/**/*/infrastructure/**/*.ts',
    ],
    coverageDirectory: '<rootDir>/coverage',
    testEnvironment: 'node',
};

export default config;
