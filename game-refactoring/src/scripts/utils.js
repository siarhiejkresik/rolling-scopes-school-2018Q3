/**
 * Returns an integer between 0 and (max - 1)
 */
const randomInt = max => Math.floor(Math.random() * max);

const randomArrayElement = array => {
  const length = array === null ? 0 : array.length;
  return length ? array[Math.floor(Math.random() * length)] : undefined;
};

const randomObjectElement = obj => obj[randomArrayElement(Object.keys(obj))];

const decreaseNotOver = (variable, value, bound) => {
  return variable - value < bound ? bound : variable - value;
};
const increaseNotOver = (variable, value, bound) => {
  return variable + value > bound ? bound : variable + value;
};

const pause = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};
