'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** @module utils/findIgnoreCase */


exports.default = findIgnoreCase;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This function finds the first item in a `haystack` that starts with every
 * letter of the `value` in order. It will ignore:
 *  - null or undefined
 *  - valid React components
 *
 * @param {Array.<string|number|Object|function>} haystack - the haystack to search.
 * @param {string} value - the current value to use.
 * @param {string=} dataLabel - the object key to use to extract the comparing value.
 *
 * @return {string} the found element or the empty string.
 */
function findIgnoreCase(haystack, value, dataLabel) {
  var needle = value ? value.toLowerCase() : '';

  if (!needle) {
    return needle;
  }

  var suggestion = '';
  haystack.some(function (hay) {
    if (hay === null || typeof hay === 'undefined' || _react2.default.isValidElement(hay)) {
      return false;
    }

    var hayStr = (typeof hay === 'undefined' ? 'undefined' : _typeof(hay)) === 'object' ? hay[dataLabel] : hay.toString();

    if (hayStr.toLowerCase().indexOf(needle) === 0) {
      suggestion = hayStr;
    }

    return suggestion;
  });

  return suggestion;
}
//# sourceMappingURL=findIgnoreCase.js.map