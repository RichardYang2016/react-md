'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = viewport;

var _getScreenSize = require('./getScreenSize');

var _getScreenSize2 = _interopRequireDefault(_getScreenSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Determines if an element is still in the viewport. If it is,
 * it will return a `true` boolean. If it is not, it will return
 * an object containing booleans for top, right, bottom, and left
 * where a `false` value will mean it is out of the viewport for that
 * position.
 *
 * @param {Object} el - The element to test.
 * @return {boolean|Object} the results.
 */
function viewport(el) {
  if (!el) {
    return {};
  }

  var rect = el.getBoundingClientRect();
  var top = rect.top >= 0;
  var right = rect.right <= (0, _getScreenSize2.default)('Width');
  var bottom = rect.bottom <= (0, _getScreenSize2.default)('Height');
  var left = rect.left >= 0;

  return top && right && bottom && left || { top: top, right: right, bottom: bottom, left: left };
} /** @module utils/Positioning/viewport */
//# sourceMappingURL=viewport.js.map