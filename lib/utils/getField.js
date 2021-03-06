'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getField;
/** @module utils/getField */

/**
 * Gets the current field for a component that can the field
 * as either uncontrolled or controlled.
 *
 * @param {Object} props - the props object.
 * @param {Object} state = the state object.
 * @param {string=} field - the field to extract a value from. Defaults to 'value'.
 *
 * @return the field's value.
 */
function getField(props, state) {
  var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'value';

  return typeof props[field] !== 'undefined' ? props[field] : state[field];
}
//# sourceMappingURL=getField.js.map