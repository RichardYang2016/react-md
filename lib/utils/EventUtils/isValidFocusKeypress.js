'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValidFocusKeypress;

var _keyCodes = require('../../constants/keyCodes');

/**
 * Checks if a keydown or keyup event's key was the TAB key or any additional valid
 * keys that were passed in.
 *
 * @param {Object} event - The event to check.
 * @param {Array.<number>=} additionalKeys - An optional array of additional key codes
 *    that are considered valid for a focus event.
 */
function isValidFocusKeypress(event, additionalKeys) {
  var key = event.which || event.keyCode;
  return key === _keyCodes.TAB || additionalKeys && additionalKeys.indexOf(key) !== -1;
} /** @module utils/EventUtils/isValidFocusKeypress */
//# sourceMappingURL=isValidFocusKeypress.js.map