export default buffer => {
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
