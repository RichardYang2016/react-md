'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = controlled;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validates the a component is fully controlled or uncontrolled.  If the given prop is not
 * `undefined`, it will check if the `funcName` is defined and a function. A missing function
 * will generate an error similar to the built-in React controlled validation message.
 *
 * @param {String} funcName - The function name to use for additional validation.
 * @param {function} validator - The PropTypes validator to use for the given prop.
 * @return {Error} an error or null.
 */
function controlled(validator, funcName) {
  var fallbackPropName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'defaultValue';

  return function validate(props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      args[_key - 5] = arguments[_key];
    }

    var err = validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
    if (!err && typeof props[propName] !== 'undefined' && !props.readOnly && !props.disabled) {
      var _PropTypes$func;

      var funcError = (_PropTypes$func = _propTypes2.default.func).isRequired.apply(_PropTypes$func, [props, funcName, componentName, location, propFullName].concat(args));
      if (funcError) {
        err = new Error('You provided a `' + propFullNameSafe + '` ' + location + ' to the ' + componentNameSafe + ' without a ' + ('`' + funcName + '` handler. This will render a read only field. Set either the `' + funcName + '` ') + ('or use the `' + fallbackPropName + '` instead.'));
      }
    }

    return err;
  };
} /** @module utils/PropTypes/controlled */
//# sourceMappingURL=controlled.js.map