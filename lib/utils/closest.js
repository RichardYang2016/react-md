'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closest;
/** @module utils/closest */

/**
 * A _very_ primitive polyfill for the Element.closest function. If this is a browser that doesn't
 * support it (IE, Edge, etc), it will just keep searching the parent elements until the nodeName
 * matches the provided type.
 *
 * @param {Element} el - the html element to find a closest node type for
 * @param {String} type - the html element type to find.
 * @return {Element} the found element or null.
 */
function closest(el, type) {
  if (typeof el.closest === 'function') {
    return el.closest(type);
  }

  var nodeType = type.toUpperCase();
  var node = el.parentElement;
  while (node && node.parentElement) {
    if (node.nodeName === nodeType) {
      return node;
    }

    node = node.parentElement;
  }

  return null;
}
//# sourceMappingURL=closest.js.map