const assert = require('assert').strict;

const make = module.require('../src/make');

describe('make', function () {
  const sum = (a, b) => a + b;
  const sub = (a, b) => a - b;

  it('case 1', function () {
    assert.ok(make(15)(34, 21, 666)(41)(sum), 777);
  });
  it('case 2', function () {
    assert.ok(make(15, 47)(34, 21, 666)(41)(sub), -700);
  });
});
