module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRunner: '<rootDir>/lib/index.js',
  testRegex: '(src/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
