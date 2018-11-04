const assert = require('assert').strict;

const sumOfOther = module.require('../src/sumOfOther');

describe('sumOfOther', function () {
  it('common case 1', function () {
    assert.deepEqual(sumOfOther([2, 3, 4, 1]), [8, 7, 6, 9]);
  });
  it('common case 2', function () {
    assert.deepEqual(sumOfOther([1, -1, 1]), [0, 2, 0]);
  });
  it('array with non-positive numbers', function () {
    assert.deepEqual(sumOfOther([-1, -1, -1]), [-2, -2, -2]);
  });
  it('array with length less than 2', function () {
    assert.deepEqual(sumOfOther([]), []);
    assert.deepEqual(sumOfOther([1]), []);
    assert.deepEqual(sumOfOther([-21]), []);
  });
  it('for an empty input array must return a new empty array', function () {
    const inputArray = [];
    assert.ok(sumOfOther(inputArray) !== inputArray);
  });
});
