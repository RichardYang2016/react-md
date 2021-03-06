"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateHypotenuse;
/** @module utils/NumberUtils/calculateHypotenuse */

/**
 * Calculates the hypotenuse using the x and y coordinates given.
 *
 * @param {number} a the x coordinate
 * @param {number} b the y coordinate
 * @return {number} the hypotenuse length for the given x and y coordinates.
 */
function calculateHypotenuse(a, b) {
  return Math.sqrt(a * a + b * b);
}
//# sourceMappingURL=calculateHypotenuse.js.map