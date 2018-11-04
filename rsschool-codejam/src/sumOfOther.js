const sumOfOther = (arr) => {
  if (arr.length < 2) {
    return [];
  }
  const sum = arr.reduce((acc, x) => acc + x, 0);
  return arr.map(x => sum - x);
};

module.exports = sumOfOther;
