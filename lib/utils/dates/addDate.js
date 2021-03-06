'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addDate;

var _addDay = require('./addDay');

var _addDay2 = _interopRequireDefault(_addDay);

var _addMonth = require('./addMonth');

var _addMonth2 = _interopRequireDefault(_addMonth);

var _addYear = require('./addYear');

var _addYear2 = _interopRequireDefault(_addYear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adds a given amount to a date.
 *
 * @param {Date} date - The date to add
 * @param {number} amount - The amount to add
 * @param {string} part - The date part to add to. ['D', 'M', 'Y']
 * @param {number=1} newMonthDate - An optional date to set in the new month
 *    if the new month does not have the old date. This only applies to month
 *    addition.
 * @return a new Date with the part added or the date if the part is not valid.
 */
function addDate(date, amount, part, newMonthDate) {
  switch (part) {
    case 'D':
      return (0, _addDay2.default)(date, amount);
    case 'M':
      return (0, _addMonth2.default)(date, amount, newMonthDate);
    case 'Y':
      return (0, _addYear2.default)(date, amount);
    default:
      return date;
  }
}
//# sourceMappingURL=addDate.js.map