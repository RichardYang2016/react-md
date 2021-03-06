'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = oneRequired;
/** @module utils/PropTypes/oneRequired */

/**
 * A simple prop type validation that makes sure that at least this prop or one of the
 * other defined prop names are defined for a component.
 *
 * @param {function} validator - The PropType validator for the current prop.
 * @param {...String} otherPropNames - A single or list of prop names that could be defined
 * @return {Error} a prop type validation error or null.
 */
function oneRequired(validator) {
  for (var _len = arguments.length, otherPropNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    otherPropNames[_key - 1] = arguments[_key];
  }

  return function validate(props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;
    var allPropNames = [propFullNameSafe].concat(otherPropNames);

    for (var _len2 = arguments.length, args = Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
      args[_key2 - 5] = arguments[_key2];
    }

    var err = validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
    if (!err && !allPropNames.filter(function (pn) {
      return typeof props[pn] !== 'undefined';
    }).length) {
      err = new Error('One of the following props are required for the ' + componentNameSafe + ' component. ' + ('`' + allPropNames.join('`, `') + '`.'));
    }

    return err;
  };
}
//# sourceMappingURL=oneRequired.js.map