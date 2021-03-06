'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addYear;

var _isValidDate = require('./isValidDate');

var _isValidDate2 = _interopRequireDefault(_isValidDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adds the specified number of years to a provided date. If the date
 * is null, an invalid formatted date, or not a Date instance, null
 * will be returned instead.
 *
 * @param {Date} date - The date to update
 * @param {number} amount - The number of years to add. This can be positive
 *    or negative.
 * @return {Date} a new date with the number of years added or null.
 */
function addYear(date, amount) {
  if (!(0, _isValidDate2.default)(date)) {
    return null;
  }

  var d = new Date(date);
  d.setFullYear(d.getFullYear() + amount);

  return d;
}
//# sourceMappingURL=addYear.js.map