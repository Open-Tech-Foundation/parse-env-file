import readFileAsync from './readFileAsync';
import parse from './parse';

export default async filePath => {
  const buffer = await readFileAsync(filePath);

  return parse(buffer);
};
