"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = omit;
/** @module utils/omit */

/**
 * This should hopefully be very similar to lodash's omit function. It will
 * take an object and return a new object without any of the given keys.
 *
 * @param {Object} obj - The object to omit keys from.
 * @param {Array.<String>} keys - a list of keys to remove.
 */
function omit(obj, keys) {
  if (!obj) {
    return {};
  } else if (!keys || !keys.length) {
    return obj;
  }

  return Object.keys(obj).filter(function (key) {
    return keys.indexOf(key) === -1;
  }).reduce(function (newProps, key) {
    newProps[key] = obj[key];

    return newProps;
  }, {});
}
//# sourceMappingURL=omit.js.map