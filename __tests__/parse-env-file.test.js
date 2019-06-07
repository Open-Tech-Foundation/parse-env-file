import parseEnvFile from '../src';

describe('When invalid env file argument passed', () => {
  test('the empty argument fails with an error', async () => {
    await expect(parseEnvFile()).rejects.toThrow();
    await expect(parseEnvFile('')).rejects.toThrow('');
  });

  test('the non existence file argument fails with an error', async () => {
    await expect(parseEnvFile('.env.test')).rejects.toThrow();
  });
});

describe('When valid env file passed', () => {
  const emptyFile = './__tests__/.env.empty';
  const invalidFile = './__tests__/.env.vars.invalid';
  const varsOneFile = './__tests__/.env.vars.one';
  const varsMultiFile = './__tests__/.env.vars.multi';
  const varsCommentFile = './__tests__/.env.vars.comment';
  const varsMixedFile = './__tests__/.env.vars.mixed';

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

  test('the mixed env vars file', async () => {
    const output = {
      ENV: 'val',
      ENV2: 'val2',
      ENV3: 'val3',
      ENV4: 'val4',
      ENV5: 'val5',
      ENV6:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      NEW_ENV_VAR_6: '10',
      NEW_ENV_VAR_7: 'https://example.com',
      NODE_PATH: '/usr/local/lib/node_modules:/home/runner/node_modules',
      EMPTY: '',
      JSON: '{"foo": "bar"}',
      FOO: '" some value "',
    };
    const data = await parseEnvFile(varsMixedFile);
    expect(Object.keys(data)).toHaveLength(12);
    expect(data).toEqual(output);
  });
});
