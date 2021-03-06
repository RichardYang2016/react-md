'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLastWeek;

var _getWeekNumber = require('./getWeekNumber');

var _getWeekNumber2 = _interopRequireDefault(_getWeekNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if a provided date is the last week within its month.
 *
 * @param {Date} date - the date to check
 * @return {boolean} true if the date is within the last week within its month.
 */
function isLastWeek(date) {
  var weekNumber = (0, _getWeekNumber2.default)(date);
  if (weekNumber === -1) {
    return false;
  }

  var d = new Date(date);
  d.setDate(1);

  var firstDay = d.getDay();
  var lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  var weeksInMonth = Math.ceil((firstDay + lastDay) / 7);
  return weeksInMonth === weekNumber;
}
//# sourceMappingURL=isLastWeek.js.map