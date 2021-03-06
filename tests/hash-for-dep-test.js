'use strict';
var path = require('path');
var assert = require('assert');
var hashForDep = require('../');

var fixturesPath = path.join(__dirname, 'fixtures');

describe('hashForDep', function() {
  it('Provides a consistent md5 hash for a dependent package', function() {
    var hashTreeCallCount = 0;
    var hashTreePaths = [
      path.join(fixturesPath, '/node_modules/dedupped/'),
      path.join(fixturesPath, '/node_modules/dedupped/node_modules/dedupped-child/'),
      path.join(fixturesPath, '/node_modules/foo/')
    ];

    var result = hashForDep('foo', fixturesPath, function stableHashTreeOverride(statPath) {
      hashTreeCallCount++;
      assert.equal(statPath, hashTreePaths.shift(), 'hashTree override has correct path');
      return 42;
    });

    assert.equal(hashTreeCallCount, 3, 'hashTree override was called correct number of times');
    assert.equal(result, 'a4756b662e8a0f5607e1376405d61bfb', 'Expected md5');
  });
});
