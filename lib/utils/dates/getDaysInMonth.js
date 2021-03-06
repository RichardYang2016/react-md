'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDaysInMonth;

var _getLastDay = require('./getLastDay');

var _getLastDay2 = _interopRequireDefault(_getLastDay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the number of days in a month for the provided date.
 *
 * @param {Date} date - The date to get the number of days for
 * @return {number} the number of days in the month or -1 if it is false-ish
 *    or an invalid date object.
 */
function getDaysInMonth(date) {
  var day = (0, _getLastDay2.default)(date);
  return day === null ? -1 : day.getDate();
}
//# sourceMappingURL=getDaysInMonth.js.map