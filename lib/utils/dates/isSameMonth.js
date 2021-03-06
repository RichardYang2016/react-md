'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameMonth;

var _isSameYear = require('./isSameYear');

var _isSameYear2 = _interopRequireDefault(_isSameYear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if two dates are part of the same month. This will also
 * make sure the dates are part of the same year.
 *
 * @param {Date} d1 - The first date to compare.
 * @param {Date} d2 - The second date to compare.
 * @param {boolean=false} bothNullValue - boolean for what should be returned if
 *  both values are null.
 * @return {boolean} true if both the dates are defined and part of the same year and month
 *  or if both values are null it will return the `bothNullValue`
 */
function isSameMonth(d1, d2) {
  var bothNullValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!d1 && !d2) {
    return bothNullValue;
  }

  return (0, _isSameYear2.default)(d1, d2, bothNullValue) && d1.getMonth() === d2.getMonth();
}
//# sourceMappingURL=isSameMonth.js.map