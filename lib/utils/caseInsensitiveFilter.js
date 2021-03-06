'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** @module utils/caseInsensitiveFilter */


exports.default = caseInsensitiveFilter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This function does a simple ignore case search of some `filterText` for every
 * item in a `haystack`. It will only include items that are:
 *  - not null or undefined
 *  - valid React Components
 *  - a number or string that contains each letter/number in exact order ignoring case
 *  - an object's `dataLabel` value that contains each letter/number in exact order ignoring case.
 *
 * Example:
 *
 * ```js
 * const haystack = ['Apple', 'Banana', 'Orange'];
 * caseInsensitiveFilter(haystack, 'An') // ['Banana', 'Orange'];
 * caseInsensitiveFilter(haystack, 'ae') // []
 * ```
 *
 * @param {Array.<string|number|Object|function>} haystack - the haystack to search
 * @param {string} filterText - the filter text to use.
 * @param {string=} dataLabel - the data label to use if the element is an object.
 *
 * @return {Array.<string|number|Object|function>} a filtered list.
 */
function caseInsensitiveFilter(haystack, filterText, dataLabel) {
  var needle = filterText.toLowerCase();

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

    return value && value.toLowerCase().indexOf(needle) !== -1;
  });
}
//# sourceMappingURL=caseInsensitiveFilter.js.map