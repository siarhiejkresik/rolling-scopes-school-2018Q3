const assert = require('assert').strict;

const recursion = module.require('../src/recursion');

describe('recursion', function () {
  it('case 1', function () {
    const tree = {
      value: 100,
      left: {
        value: 90,
        left: { value: 70 },
        right: { value: 99 },
      },
      right: {
        value: 120,
        left: { value: 110 },
        right: { value: 130 },
      },
    };
    const arr = [[100], [90, 120], [70, 99, 110, 130]];
    assert.deepEqual(recursion(tree), arr);
  });
  it('case 2', function () {
    const tree = {
      value: 1,
      left: { value: 2 },
      right: { value: 3 },
    };
    const arr = [[1], [2, 3]];
    assert.deepEqual(recursion(tree), arr);
  });
  it('tree with only left childs', function () {
    const tree = {
      value: 1,
      left: {
        value: 2,
        left: {
          value: 3,
          left: {
            value: 4,
          },
        },
      },
    };
    const arr = [[1], [2], [3], [4]];
    assert.deepEqual(recursion(tree), arr);
  });
  it('one node tree', function () {
    const tree = {
      value: 10,
    };
    const arr = [[10]];
    assert.deepEqual(recursion(tree), arr);
  });
  it('invalid tree with a node without value field', function () {
    const tree = {
      value: 1,
      left: {
        value: 2,
      },
      right: {
        // value: 3, // this field is absent in tree
      },
    };
    assert.throws(() => recursion(tree), /invalid tree: node at level \d+ has not a value field/);
  });
});
