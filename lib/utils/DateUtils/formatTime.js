'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatTime;
/** @module utils/DateUtils/formatTime */

/**
 * Formats a date as a time string using the DateTimeFormat function and locales.
 *
 * @param {function} DateTimeFormat the DateTimeFormat function to use.
 * @param {string|string[]} locales the locales to use.
 * @param {Date} time the time to format into a string.
 * @return a string of the formatted time.
 */
function formatTime(DateTimeFormat, locales, time) {
  return new DateTimeFormat(locales, { hour: 'numeric', minute: '2-digit' }).format(time);
}
//# sourceMappingURL=formatTime.js.map