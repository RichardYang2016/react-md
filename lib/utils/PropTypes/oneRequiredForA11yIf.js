'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = oneRequiredForA11yIf;
/** @module utils/PropTypes/oneRequiredForA11yIf */

/**
 * A PropType validator to make sure that any of the other prop names have been defined
 * if the current prop is also defined.
 *
 * This is mostly useful for when adding a prop requires additional accessibility props defined
 * as well.
 *
 * @param {function} validator - The current prop's validator.
 */
function oneRequiredForA11yIf(validator) {
  for (var _len = arguments.length, otherPropNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    otherPropNames[_key - 1] = arguments[_key];
  }

  return function validate(props, propName, componentName, location, propFullName) {
    var filterUndefined = function filterUndefined(pn) {
      return typeof props[pn] !== 'undefined';
    };
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;
    var defined = typeof props[propName] !== 'undefined';
    var allPropNames = [propFullNameSafe].concat(otherPropNames);

    for (var _len2 = arguments.length, args = Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
      args[_key2 - 5] = arguments[_key2];
    }

    var err = validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
    if (!err && defined && !allPropNames.filter(filterUndefined).length) {
      err = new Error('One of the following props are required to make `' + componentNameSafe + '` accessible ' + ('for users of assistive technologies such as screen readers when using the `' + propFullNameSafe + '` ') + ('prop. `' + allPropNames.join('`, `') + '`.'));
    }

    return err;
  };
}
//# sourceMappingURL=oneRequiredForA11yIf.js.map