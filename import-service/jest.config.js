module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'mjs', 'ts'],
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(js|mjs)$',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.(ts|mjs|js)$': 'babel-jest',
    },
};

