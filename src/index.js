const { open, readFile } = require('fs');
const { promisify } = require('util');

const openFileAsync = promisify(open);
const readFileAsync = promisify(readFile);

module.exports = async filePath => {
  if (!filePath) {
    throw new Error('Invalid file argument');
  }

  let buffer;
  try {
    const fd = await openFileAsync(filePath, 'r');
    buffer = await readFileAsync(fd, { encoding: 'utf8' });
  } catch (error) {
    throw new Error('File not found');
  }

  const parsedObj = {};
  const envParseRegex = /^((.+?)[=](.*))$/;

  buffer.split('\n').forEach(line => {
    const match = envParseRegex.exec(line);
    if (match) {
      parsedObj[match[2].trim()] = match[3].trim();
    }
  });
  return parsedObj;
};
