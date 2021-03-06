'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDisplayName;
/** @module utils/StringUtils/getDisplayName */

/**
 * Gets the display name for a composed component.
 *
 * @param {function|Object} ComposedComponent - The composed component to use
 * @param {String} hoc - The higher order component's name to use.
 * @return {String} the new name of the component.
 */
function getDisplayName(ComposedComponent, hoc) {
  var name = '' + (ComposedComponent.displayName || ComposedComponent.name || 'Component');

  return 'with' + hoc + '(' + name + ')';
}
//# sourceMappingURL=getDisplayName.js.map