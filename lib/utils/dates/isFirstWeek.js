'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFirstWeek;

var _getWeekNumber = require('./getWeekNumber');

var _getWeekNumber2 = _interopRequireDefault(_getWeekNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if a provided date is within the first week of its month.
 *
 * @param {Date} date - the date to check
 * @return {boolean} true if the date is within the first week.
 */
function isFirstWeek(date) {
  return (0, _getWeekNumber2.default)(date) === 1;
}
//# sourceMappingURL=isFirstWeek.js.map