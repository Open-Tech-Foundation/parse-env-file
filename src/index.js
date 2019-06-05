const { open } = require('fs');
const { promisify } = require('util');

const openFileAsync = promisify(open);

module.exports = async filePath => {
  if (!filePath) {
    throw new Error('Invalid file argument');
  }

  try {
    await openFileAsync(filePath, 'r');
  } catch (error) {
    throw new Error('File not found');
  }
};
