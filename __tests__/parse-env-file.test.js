const parseEnvFile = require('../src');

it('returns hello world', () => {
  expect(parseEnvFile()).toBe('Hello world!');
});
