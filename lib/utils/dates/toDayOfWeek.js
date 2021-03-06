'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDayOfWeek;

var _isValidDate = require('./isValidDate');

var _isValidDate2 = _interopRequireDefault(_isValidDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes in a date and returns a new date at the specified day of week.
 *
 * Examples:
 * // to Sunday
 * - toDayOfWeek(new Date(2018, 0, 1), 0) == new Date(2017, 11, 31)
 *
 * // to Monday
 * - toDayOfWeek(new Date(2018, 0, 1), 1) == new Date(2018, 0, 1)
 *
 * @param {Date} date - The date to convert to a day of week
 * @param {number=0} dow - The day of the week to convert to
 * @return {Date} the new date set at the day of week or null if the
 *    date is invalid or false-ish.
 */
function toDayOfWeek(date) {
  var dow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!(0, _isValidDate2.default)(date)) {
    return null;
  }

  var d = new Date(date);
  var day = date.getDay();
  var diff = d.getDate() - day + dow;
  return new Date(d.setDate(diff));
}
//# sourceMappingURL=toDayOfWeek.js.map