'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stripTime;

var _isValidDate = require('./isValidDate');

var _isValidDate2 = _interopRequireDefault(_isValidDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Removes all the time parts (hours, minutes, seconds, milliseconds) from a date.
 * The hour of the stripped time is set to 1 by default to help with cross-browser
 * date implementations and how hour 0 sometimes is the previous day.
 *
 * @param {Date} date the date to strip
 * @param {number=0} hours - the fake hours to set for the stripped time date.
 * @return a new Date with the time stripped.
 */
function stripTime(date) {
  var hours = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!(0, _isValidDate2.default)(date)) {
    return null;
  }

  var d = new Date(date);
  d.setHours(hours, 0, 0, 0);

  return d;
}
//# sourceMappingURL=stripTime.js.map