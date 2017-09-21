'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-courses-md:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'foo'
      });
  });

  it('creates files', () => {
    assert.file([
      'README.md'
    ]);
  });
});
