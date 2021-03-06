'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBtnStyles;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _themeColors = require('../utils/themeColors');

var _themeColors2 = _interopRequireDefault(_themeColors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Since it can be helpful to apply button styles on other components, this is a utlity function
 * to apply those styles based on props.
 */
function getBtnStyles(_ref) {
  var _ref2;

  var flat = _ref.flat,
      raised = _ref.raised,
      icon = _ref.icon,
      floating = _ref.floating,
      disabled = _ref.disabled,
      primary = _ref.primary,
      secondary = _ref.secondary,
      hover = _ref.hover,
      swapTheming = _ref.swapTheming,
      pressed = _ref.pressed,
      mini = _ref.mini,
      fixed = _ref.fixed,
      fixedPosition = _ref.fixedPosition;

  var flatStyles = flat || icon;
  var raisedStyles = raised || floating;
  var textTheming = flatStyles && !swapTheming || raisedStyles && swapTheming;
  var backgroundTheming = (!disabled && raisedStyles && !swapTheming || flatStyles && swapTheming) && (primary || secondary);

  for (var _len = arguments.length, classNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classNames[_key - 1] = arguments[_key];
  }

  return _classnames2.default.apply(undefined, ['md-btn', (_ref2 = {
    'md-btn--flat': flat || disabled && raised,
    'md-btn--raised': !disabled && raised,
    'md-btn--icon': icon || floating,
    'md-btn--floating': floating,
    'md-btn--text': flat || raised,
    'md-btn--hover': !disabled && hover,
    'md-btn--raised-disabled': disabled && raised,
    'md-btn--raised-pressed': !disabled && raisedStyles && pressed,
    'md-btn--fixed': fixed
  }, _defineProperty(_ref2, 'md-btn--fixed-' + fixedPosition, floating && fixed), _defineProperty(_ref2, 'md-btn--floating-mini', floating && mini), _defineProperty(_ref2, 'md-btn--color-primary-active', !disabled && primary && hover && textTheming), _defineProperty(_ref2, 'md-btn--color-secondary-active', !disabled && secondary && hover && textTheming), _defineProperty(_ref2, 'md-pointer--hover', !disabled), _defineProperty(_ref2, 'md-paper md-paper--2', !disabled && floating), _defineProperty(_ref2, 'md-paper--4', !disabled && floating && pressed), _ref2), (0, _themeColors2.default)({
    text: !icon && !floating && !backgroundTheming,
    themeText: !backgroundTheming,
    disabled: disabled,
    primary: primary,
    secondary: secondary,
    hover: true,
    ink: true
  })].concat(classNames));
}
//# sourceMappingURL=getBtnStyles.js.map