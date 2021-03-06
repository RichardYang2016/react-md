'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calcPageOffset;

var _getPagePosition = require('./getPagePosition');

var _getPagePosition2 = _interopRequireDefault(_getPagePosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calculates the page offset of an element. If the element
 * is false-ish, an empty object will be returned.
 *
 * This is really only used for calculating an ink position.
 *
 * @param {Node} el - An html node to find a page offset for.
 * @return {Object} an object with a left and top attribute for the page
 *    offset.
 */
function calcPageOffset(el) {
  if (!el) {
    return { left: null, right: null };
  }

  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + (0, _getPagePosition2.default)('x'),
    top: rect.top + (0, _getPagePosition2.default)('y')
  };
} /** @module utils/Positioning/calcPageOffset */
//# sourceMappingURL=calcPageOffset.js.map