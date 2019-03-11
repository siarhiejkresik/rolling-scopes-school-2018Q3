/**
 * Given length `n` of an array of natural numbers `(0...n-1)`
 * and a number `c` from that array,
 * return the first element of a subarray of length `m`,
 * where `c` is the center element of that subarray.
 *
 * Examples:
 *
 * [0 1 2 [3 4 5* 6 7] 8 9] -> 3, m=5, n=10
 *
 * [0 1 [2 3* 4] 5 6 7 8 9] -> 2, m=3, n=10
 *
 * [[0 1* 2 3 4] 5 6 7 8 9] -> 0, m=5, n=10
 *
 * [0 1 2 3 4 5 6 [7 8 9*] -> 0, m=3, n=10
 *
 * [[0 1 2 3 4 ]] -> 0, m=6, n=5
 *
 * @param {*} centerValue the center element of subarray
 * @param {*} subArrLength length of subarray
 * @param {*} arrLength length of array of natural numbers from 0 to arrLength - 1
 */
export const leftValue = (centerValue, subArrLength, arrLength) => {
  if (arrLength <= subArrLength) {
    return 0;
  }
  const left = centerValue - Math.trunc(subArrLength / 2);
  // left value can not be negative
  if (left < 0) {
    return 0;
  }
  // right value can not be more than the last value of array
  if (left + subArrLength > arrLength - 1) {
    return arrLength - subArrLength;
  }

  return left;
};

export const page = {
  indexToNumber: index => index + 1,
  numberToIndex: number => parseInt(number - 1, 10),
};
