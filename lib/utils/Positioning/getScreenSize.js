'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getScreenSize;
/** @module utils/Positioning/getScreenSize */

/**
 * A utility function to get the height or width of the of the browser with
 * a fallback for older browsers.
 *
 * @param {String} position - the position to get the screen size for
 * @return {number} the screen size for the provided position.
 */
function getScreenSize(position) {
  if (position !== 'Height' && position !== 'Width' && process.env.NODE_ENV !== 'production') {
    throw new Error('The \'getScreenSize\' function requires either a position of \'Height\' or \'Width\' ' + ('but received `' + position + '`'));
  }

  return window['inner' + position] || document.documentElement['client' + position];
}
//# sourceMappingURL=getScreenSize.js.map