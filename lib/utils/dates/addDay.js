'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addDay;

var _isValidDate = require('./isValidDate');

var _isValidDate2 = _interopRequireDefault(_isValidDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adds the specified number of days to a provided date. If the date
 * is null, an invalid formatted date, or not a Date instance, null
 * will be returned instead.
 *
 * @param {Date} date - The date to update
 * @param {number} amount - The number of days to add. This can be positive
 *    or negative.
 * @return {Date} a new date with the number of days added or null.
 */
function addDay(date, amount) {
  if (!(0, _isValidDate2.default)(date)) {
    return null;
  }

  var d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}
//# sourceMappingURL=addDay.js.map