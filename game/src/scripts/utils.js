/**
 * Returns an integer between 0 and (max - 1)
 */
const randomInt = max => Math.floor(Math.random() * max);

const randomArrayElement = (array) => {
  const length = array === null ? 0 : array.length;
  return length ? array[Math.floor(Math.random() * length)] : undefined;
};

const randomObjectElement = obj => obj[randomArrayElement(Object.keys(obj))];

const decreaseNotOver = (variable, value, lowerBound) => Math.max(variable - value, lowerBound);
const increaseNotOver = (variable, value, upperBound) => Math.min(variable + value, upperBound);

const pause = time => new Promise((resolve) => {
  setTimeout(resolve, time);
});

export {
  randomArrayElement,
  randomObjectElement,
  randomInt,
  decreaseNotOver,
  increaseNotOver,
  pause,
};
