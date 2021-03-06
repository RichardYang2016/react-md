'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isOutOfBounds;

var _getScreenSize = require('./getScreenSize');

var _getScreenSize2 = _interopRequireDefault(_getScreenSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isOutHorizontally(fixedTo, child, threshold) {
  var _fixedTo$getBoundingC = fixedTo.getBoundingClientRect(),
      fixedLeft = _fixedTo$getBoundingC.left,
      fixedRight = _fixedTo$getBoundingC.right;

  var _child$getBoundingCli = child.getBoundingClientRect(),
      childLeft = _child$getBoundingCli.left,
      childRight = _child$getBoundingCli.right;

  var offset = child.offsetWidth * threshold;

  var left = childLeft + offset;
  var right = childRight - offset;

  var screenEdge = childLeft === 0 || (0, _getScreenSize2.default)('Width') === childRight;
  return fixedLeft > left || fixedRight < right || screenEdge;
} /** @module utils/Positioning/isOutOfBounds */

function isOutVertically(fixedTo, child, toggle, threshold) {
  var _fixedTo$getBoundingC2 = fixedTo.getBoundingClientRect(),
      fixedTop = _fixedTo$getBoundingC2.top,
      fixedBottom = _fixedTo$getBoundingC2.bottom;

  var _child$getBoundingCli2 = child.getBoundingClientRect(),
      childTop = _child$getBoundingCli2.top,
      childBottom = _child$getBoundingCli2.bottom;

  var offset = toggle.offsetHeight * threshold;

  var screenEdge = childTop === 0 || (0, _getScreenSize2.default)('Height') === childBottom;
  return fixedTop > childTop + offset || fixedBottom < childTop - offset || screenEdge;
}

/**
 * Checks if the fixedTo object for the Layover component is considered
 * out of bounds relative to the container.
 *
 * @param {Object} fixedTo - The Layover's `fixedTo` prop.
 * @param {Object} child - The Layover's `children` prop as a DOM element.
 * @param {Object} toggle - The Layover's `toggle` prop as a DOM element.
 * @param {number} verticalThreshold - The vertical threshold multiplier to apply.
 * @param {number} horizontalThreshold - The horizontal threshold multiplier to apply.
 * @return {boolean} true if the Layover's `fixedTo` prop is considered out of bounds.
 */
function isOutOfBounds(fixedTo, child, toggle, verticalThreshold, horizontalThreshold) {
  if (fixedTo === window) {
    return false;
  } else if (fixedTo.x || fixedTo.y) {
    var x = fixedTo.x,
        y = fixedTo.y;

    return !!y && isOutVertically(y, child, toggle, verticalThreshold) || !!x && isOutHorizontally(x, child, horizontalThreshold);
  }

  return isOutVertically(fixedTo, child, toggle, verticalThreshold) || isOutHorizontally(fixedTo, child, horizontalThreshold);
}
//# sourceMappingURL=isOutOfBounds.js.map