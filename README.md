# @open-tech-world/parse-env-file

> Node.js utility to parse .env files.

Note: Apart from `.env` files, you can pass any valid file with any extension to get parsed. Eg: `.env.staging`, `env.txt`, etc.

## Syntax rules

- It expects each line in a file to be in VAR=VAL format.
- Lines beginning with `#` or `//` are processed as comments and ignored.
- Blank lines are ignored.
- The quotation marks in `VAL` will not be stripped away.

Input with mixed valid & invalid lines:

```
# Comment 1
ENV=val

// Comment 2
ENV2=val2

ENV3= val3

ENV4 =val4

ENV5 = val5

ENV6=Lorem Ipsum is simply dummy text of the printing and typesetting industry.

NEW_ENV_VAR_6=10

NEW_ENV_VAR_7=https://example.com

NODE_PATH=/usr/local/lib/node_modules:/home/runner/node_modules

EMPTY=

JSON={"foo": "bar"}

FOO=" some value "
```

Output:

```js
{
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
}
```

## Install

```bash
# With npm
$ npm install @open-tech-world/parse-env-file

# With yarn
$ yarn add @open-tech-world/parse-env-file
```

## Usage

```js
const parseEnvFile = require('@open-tech-world/parse-env-file');

// or

import parseEnvFile from '@open-tech-world/parse-env-file';
```

## License

MIT © [Thanga Ganapathy](https://github.com/ganapathy888)
