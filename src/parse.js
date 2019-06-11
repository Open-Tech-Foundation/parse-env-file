export default envStr => {
  const parsedObj = {};
  const envRegex = /^((.+?)[=](.*))$/gm;
  const commentRegex = /^[#].*?$/;

  let matchArr = [];

  while (matchArr !== null) {
    matchArr = envRegex.exec(envStr);

    if (matchArr && !commentRegex.test(matchArr[0])) {
      const key = matchArr[2].trim();
      const value = matchArr[3].trim().replace(/\\n/g, `\n`);
      parsedObj[key] = value;
    }
  }
  return parsedObj;
};
