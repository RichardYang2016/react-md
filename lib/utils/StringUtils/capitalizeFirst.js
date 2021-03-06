"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalizeFirst;
/** @module utils/StringUtils/capitlizeFirst */

/**
 * Capitalizes the first letter of a string. If the string is falsish, it will be
 * returned as is. If the string is only one letter long, it will be capitalized;
 *
 * @param {String} str - The string to capitalize.
 * @return {String} the updated string or false-ish self.
 */
function capitalizeFirst(str) {
  if (!str) {
    return str;
  } else if (str.length === 1) {
    return str.toUpperCase();
  }

  return "" + str.charAt(0).toUpperCase() + str.substring(1, str.length);
}
//# sourceMappingURL=capitalizeFirst.js.map