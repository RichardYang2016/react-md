'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWeekNumber;

var _isValidDate = require('./isValidDate');

var _isValidDate2 = _interopRequireDefault(_isValidDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the current week number within a month for a provided date. If
 * the date is invalid, -1 will be returned instead.
 *
 * @param {Date} date - The date to get a week number for.
 * @return {number} the week number with the date's month or -1.
 */
function getWeekNumber(date) {
  if (!(0, _isValidDate2.default)(date)) {
    return -1;
  }

  var d = new Date(date);
  d.setDate(1);

  var firstDay = d.getDay();
  var dateOffset = date.getDate() + (firstDay - 1);
  return Math.floor(dateOffset / 7) + 1;
}
//# sourceMappingURL=getWeekNumber.js.map