'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = minNumber;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validates the a prop's value is greater than or equal to the minimum value.
 *
 * @param {Number} min - the minimum value for the prop.
 * @param {Boolean} required - Boolean if the prop is required.
 * @return {Error} an error or null.
 */
function minNumber(min, required) {
  return function validate(props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    var validator = _propTypes2.default.number;
    if (required) {
      validator = validator.isRequired;
    }

    for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      args[_key - 5] = arguments[_key];
    }

    var err = validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
    if (!required && !err && props[propName] < min) {
      err = new Error('The ' + location + ' `' + propFullNameSafe + '` must be greater than or equal to the min value ' + ('`' + min + '` but received `' + props[propName] + '` for the `' + componentNameSafe + '` component.'));
    }

    return err;
  };
} /** @module utils/PropTypes/minNumber */
//# sourceMappingURL=minNumber.js.map