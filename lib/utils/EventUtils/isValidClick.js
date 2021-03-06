'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValidClick;

var _keyCodes = require('../../constants/keyCodes');

/**
 * Checks if an event is a valid click event by ignoring
 * any clisk that are not the left mouse button and not
 * clicks that involve the shift key.
 *
 * @param {Object} e - the event to check
 * @return {Boolean} true if the event is valid.
 */
function isValidClick(e) {
  return e.button === _keyCodes.LEFT_MOUSE && !e.shiftKey;
} /** @module utils/EventUtils/isValidClick */
//# sourceMappingURL=isValidClick.js.map