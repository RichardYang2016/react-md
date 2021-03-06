'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requiredForA11yIf;
/** @module utils/PropTypes/requiredForA11yIf */

/**
 * This validator checks that the given prop is valid. If any of the `otherPropNames` are true,
 * it also requires this to be defined for a11y.
 *
 * @param {function} validator - The React PropTypes validator to use for the given prop.
 * @param {String[]} otherPropNames - Any other prop names to validate against.
 * @return {Error} an error or null
 */
function requiredForA11yIf(validator) {
  for (var _len = arguments.length, otherPropNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    otherPropNames[_key - 1] = arguments[_key];
  }

  return function validate(props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;
    var defined = typeof props[propName] !== 'undefined';

    for (var _len2 = arguments.length, args = Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
      args[_key2 - 5] = arguments[_key2];
    }

    var err = validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
    if (!err && !defined && otherPropNames.filter(function (pn) {
      return !!props[pn];
    }).length) {
      err = new Error('The `' + propFullNameSafe + '` ' + location + ' is required to make `' + componentNameSafe + '` accessible ' + 'for users of assistive technologies such as screen readers.');
    }

    return err;
  };
}
//# sourceMappingURL=requiredForA11yIf.js.map