import { readFile } from 'fs';
import { promisify } from 'util';

const asyncReadFile = promisify(readFile);

export default filePath => {
  return asyncReadFile(filePath, {
    encoding: 'utf8',
    flag: 'r',
  });
};
