'use strict';
var path = require('path');

/*
 * @private
 *
 * when using require.resolve, the entry files location is provided. This
 * utility attempts to locate the true root directory.
 *
 * given:  /path/to/project/node_modules/library/lib/index.js + library
 * we get: /path/to/project/node_modules/library
 *
 * @method moduleBaseDir
 * @param modulePath {String}
 * @param moduleName {String}
 * @return {String} the root directory of a given module
 *
 */
module.exports = function moduleBaseDir(modulePath, moduleName) {
  var joinedModulePath = path.join(modulePath, moduleName);

  // if moduleName contains something like '..'
  if (joinedModulePath.length < modulePath.length) {
    return joinedModulePath;
  }

  // path.join covers both linux and windows
  var segment = path.join('node_modules', moduleName);

  // this will match windows only and have no effect on linux
  var regexSegment = segment.replace(/\\/g, '\\\\');

  modulePath = modulePath.replace(new RegExp(regexSegment + '.*$'), segment);
  modulePath = modulePath.replace(/index\.js\/?$/, '');

  return modulePath;
};
