'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameYear;

var _isValidDate = require('./isValidDate');

var _isValidDate2 = _interopRequireDefault(_isValidDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if two dates are part of the same year.
 *
 * @param {Date} d1 - The first date to compare.
 * @param {Date} d2 - The second date to compare.
 * @param {boolean=false} bothNullValue - boolean for what should be returned if
 *  both values are null.
 * @return {boolean} true if both the dates are defined and part of the same year or
 *  if both values are null it will return the `bothNullValue`.
 */
function isSameYear(d1, d2) {
  var bothNullValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!d1 && !d2) {
    return bothNullValue;
  } else if (!(0, _isValidDate2.default)(d1) || !(0, _isValidDate2.default)(d2)) {
    return false;
  }

  return d1.getFullYear() === d2.getFullYear();
}
//# sourceMappingURL=isSameYear.js.map