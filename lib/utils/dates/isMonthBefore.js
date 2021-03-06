'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMonthBefore;

var _isValidDate = require('./isValidDate');

var _isValidDate2 = _interopRequireDefault(_isValidDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if a date is the month before another date without time
 *
 * @param {Date} date the date to check if it is before the other
 * @param {Date} toCompare the date to compare to
 * @return true if the date is before the other date's first day of month.
 */
function isMonthBefore(date, toCompare) {
  if (!(0, _isValidDate2.default)(date) || !(0, _isValidDate2.default)(toCompare)) {
    return false;
  }

  var d1 = new Date(date.getFullYear(), date.getMonth(), 1);
  var d2 = new Date(toCompare.getFullYear(), toCompare.getMonth() - 1, 1);
  return d1 > d2;
}
//# sourceMappingURL=isMonthBefore.js.map