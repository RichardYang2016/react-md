'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWithinStep;
/** @module utils/NumberUtils/isWithinStep */

/**
 * Checks if a provided value is within the current step. I don't remember the main
 * usage for this, but it is for the Slider component.
 *
 * @param {number} value - the current value
 * @param {number} step - the step value
 * @return {Boolean} true if the vlaue is within the step
 */
function isWithinStep(value, step) {
  var decimals = String(step).split('.')[1];
  var corrector = typeof decimals !== 'undefined' && decimals.length > 0 ? Math.pow(10, decimals.length) : 1;

  return value * corrector % (step * corrector) === 0;
}
//# sourceMappingURL=isWithinStep.js.map