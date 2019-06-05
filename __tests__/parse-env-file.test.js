const parseEnvFile = require('../src');

describe('When invalid env file passed', () => {
  test('the empty argument fails with an error', async () => {
    await expect(parseEnvFile()).rejects.toThrow();
    await expect(parseEnvFile('')).rejects.toThrow('');
  });

  test('the non existence file argument fails with an error', async () => {
    await expect(parseEnvFile('.env.test')).rejects.toThrow('File not found');
  });
});
