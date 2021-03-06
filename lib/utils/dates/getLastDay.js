'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLastDay;

var _isValidDate = require('./isValidDate');

var _isValidDate2 = _interopRequireDefault(_isValidDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the last day in a month as a new Date.
 *
 * @param {Date} date - The date to get the last date in a month for
 * @return {Date} the last day in the month as a date object or null.
 */
function getLastDay(date) {
  if (!(0, _isValidDate2.default)(date)) {
    return null;
  }

  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
//# sourceMappingURL=getLastDay.js.map