const make = (...acc) => {
  const inner = (...args) => {
    if (args.length === 1 && typeof args[0] === 'function') {
      return acc.reduce(args[0]);
    }
    return make(...acc.concat(args));
  };
  return inner;
};

module.exports = make;
