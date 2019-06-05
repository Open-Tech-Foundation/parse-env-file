const parseEnvFile = require('../src');

describe('When invalid env file argument passed', () => {
  test('the empty argument fails with an error', async () => {
    await expect(parseEnvFile()).rejects.toThrow();
    await expect(parseEnvFile('')).rejects.toThrow('');
  });

  test('the non existence file argument fails with an error', async () => {
    await expect(parseEnvFile('.env.test')).rejects.toThrow('File not found');
  });
});

describe('When valid env file passed', () => {
  const emptyFile = './__tests__/.env.empty';
  const invalidFile = './__tests__/.env.vars.invalid';
  const varsOneFile = './__tests__/.env.vars.one';
  const varsMultiFile = './__tests__/.env.vars.multi';
  const varsCommentFile = './__tests__/.env.vars.comment';

  it('returns the empty object', async () => {
    await expect(parseEnvFile(emptyFile)).resolves.toMatchObject({});
    await expect(parseEnvFile(invalidFile)).resolves.toMatchObject({});
  });

  it('returns object with one property', async () => {
    const output = {
      ENV: 'val',
    };
    const data = await parseEnvFile(varsOneFile);
    expect(Object.keys(data)).toHaveLength(1);
    expect(data).toMatchObject(output);
  });

  it('returns object with multi properties', async () => {
    const output = {
      ENV: 'val',
      ENV2: 'val2',
      ENV3: 'val3',
    };
    const data = await parseEnvFile(varsMultiFile);
    expect(Object.keys(data)).toHaveLength(3);
    expect(data).toMatchObject(output);
  });

  it('returns object with multi properties from commented file', async () => {
    const output = {
      ENV: 'val',
      ENV2: 'val2',
      ENV3: 'val3',
    };
    const data = await parseEnvFile(varsCommentFile);
    expect(Object.keys(data)).toHaveLength(3);
    expect(data).toMatchObject(output);
  });
});
