"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addHours;
/** @module utils/DateUtils/addHours */

/**
 * Adds hours to a date.
 *
 * @param {Date} time the time to increment
 * @param {number} hours the number of hours to increment by.
 * @return a new Date with the new hours set.
 */
function addHours(time, hours) {
  var t = new Date(time.getTime());
  t.setHours(t.getHours() + hours);
  return t;
}
//# sourceMappingURL=addHours.js.map