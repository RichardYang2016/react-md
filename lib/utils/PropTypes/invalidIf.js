'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invalidIf;
/** @module utils/PropTypes/invalidIf */

/**
 * A custom validator that will throw an error if any of the `ifDefinedProps` are also defined.
 *
 * @param {function} validator - The PropTypes validator to use.
 * @param {String...} ifDefinedProps - any othe rprop names to validate against
 * @return {Error} an error or null
 */
function invalidIf(validator) {
  for (var _len = arguments.length, ifDefinedProps = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    ifDefinedProps[_key - 1] = arguments[_key];
  }

  return function validate(props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    for (var _len2 = arguments.length, args = Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
      args[_key2 - 5] = arguments[_key2];
    }

    var err = validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
    if (err) {
      return err;
    }

    var defined = typeof props[propName] !== 'undefined' && !!props[propName];
    var othersDefined = ifDefinedProps.filter(function (name) {
      return typeof props[name] !== 'undefined' && !!props[name];
    });
    if (defined && othersDefined.length) {
      var names = '`' + othersDefined.join('`, `') + '`';
      if (othersDefined.length === 1) {
        return new Error('You provided both a `' + propFullNameSafe + '` and ' + names + ' prop to the ' + componentNameSafe + ' ' + 'but only one can be given.');
      }

      return new Error('You provided a `' + propFullNameSafe + '` ' + location + ' to the ' + componentNameSafe + ' when ' + ('the following props were defined: ' + names + '. Either remove the `' + propFullNameSafe + '` ') + 'or use the remove all the other props.');
    }

    return null;
  };
}
//# sourceMappingURL=invalidIf.js.map