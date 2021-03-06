'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** @module utils/fuzzyFilter */


exports.default = fuzzyFilter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This function does a simple fuzzy search of some `needle` for every
 * item in a `haystack`. It will only include items that are:
 *  - not null or undefined
 *  - valid React Components
 *  - a number or string that contains each letter/number in order ignoring case
 *  - an object's `dataLabel` value that contains each letter/number in order ignoring case.
 *
 * Example:
 * ```js
 * const haystack = ['Apple', 'Banana', 'Orange'];
 * fuzzyFilter(haystack, 'An') // ['Banana', 'Orange'];
 * fuzzyFilter(haystack, 'ae') // ['Apple']
 * ```
 *
 * @param {Array.<string|number|Object|function>} haystack - the haystack to search
 * @param {string} needle - the filter text to use.
 * @param {string=} dataLabel - the data label to use if the element is an object.
 *
 * @return {Array.<string|number|Object|function>} a filtered list.
 */
function fuzzyFilter(haystack, needle, dataLabel) {
  // Create an amazing regex that matches the letters in order
  // and escapes any strings that could be part of a regex.
  var reg = new RegExp(('' + needle).split('').join('\\w*').replace(/(\(|\||\)|\\(?!w\*)|\[|\|-|\.|\^|\+|\$|\?|^(?!w)\*)/g, '\\$1')
  // Couldn't get the matching of two '*' working, so replace them here..
  .replace(/\*\*/g, '*\\*'), 'i');

  return haystack.filter(function (hay) {
    if (hay === null || typeof hay === 'undefined') {
      return false;
    } else if (_react2.default.isValidElement(hay)) {
      return true;
    }

    var value = void 0;
    switch (typeof hay === 'undefined' ? 'undefined' : _typeof(hay)) {
      case 'string':
      case 'number':
        value = hay.toString();
        break;
      default:
        value = hay[dataLabel];
    }

    return value && value.match(reg);
  });
}
//# sourceMappingURL=fuzzyFilter.js.map