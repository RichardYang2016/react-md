'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPagePosition;
/** @module utils/Positioning/getPagePosition */

/**
 * Gets the current page position.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
 * @param {String} direction - The direction that should be retrieved. This
 *    should be either 'x' or 'y'.
 * @return {number} the position of the direction on the page.
 */
function getPagePosition(direction) {
  var scroll = 'scroll' + (direction === 'x' ? 'Left' : 'Top');
  if (typeof window.pageXOffset !== 'undefined') {
    return window['page' + direction.toUpperCase() + 'Offset'];
  } else if ((document.compatMode || '') === 'CSS1Compat') {
    return document.documentElement[scroll];
  } else {
    return document.body[scroll];
  }
}
//# sourceMappingURL=getPagePosition.js.map