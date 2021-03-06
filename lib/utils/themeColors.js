'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = themeColors;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is a utility function to apply the different text colors as a class name.
 *
 * @param {Object} options - The options to use to figure out which styles to apply.
 * @param {boolean?} options.text - Boolean if the base text color should attempt to be
 *    applied. This will only be applied if all the other states are not true.
 * @param {boolean?} options.disabled - Boolean if the text should be disabled.
 * @param {boolean?} options.error - Boolean if the error color should attempt to be applied.
 *    This will only be applied if the disabled state is false.
 * @param {boolean?} options.primary - Boolean if the primary color should be applied. This
 *    will only be applied if all the other states are false.
 * @param {boolean?} options.secondary - Boolean if the secondary color should be applied.
 *    This will only be applied if all the other states are false.
 * @param {boolean?} options.inherit - Boolean if the color should be inherited by a parent.
 *    This will only be applied if the error and disabled states are false.
 * @return {String} the class name
 */
function themeColors() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$themeText = _ref.themeText,
      themeText = _ref$themeText === undefined ? true : _ref$themeText,
      _ref$text = _ref.text,
      text = _ref$text === undefined ? false : _ref$text,
      _ref$background = _ref.background,
      background = _ref$background === undefined ? false : _ref$background,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === undefined ? false : _ref$disabled,
      _ref$error = _ref.error,
      error = _ref$error === undefined ? false : _ref$error,
      _ref$hint = _ref.hint,
      hint = _ref$hint === undefined ? false : _ref$hint,
      _ref$primary = _ref.primary,
      primary = _ref$primary === undefined ? false : _ref$primary,
      _ref$secondary = _ref.secondary,
      secondary = _ref$secondary === undefined ? false : _ref$secondary,
      _ref$inherit = _ref.inherit,
      inherit = _ref$inherit === undefined ? false : _ref$inherit,
      _ref$ink = _ref.ink,
      ink = _ref$ink === undefined ? false : _ref$ink,
      _ref$card = _ref.card,
      card = _ref$card === undefined ? false : _ref$card,
      _ref$hover = _ref.hover,
      hover = _ref$hover === undefined ? false : _ref$hover;

  var className = arguments[1];

  var colors = '';
  if (themeText) {
    if (disabled) {
      colors = 'md-text--disabled';
    } else if (error) {
      colors = 'md-text--error';
    } else if (inherit) {
      colors = 'md-text--inherit';
    } else {
      colors = (0, _classnames2.default)({
        'md-text': text && !primary && !secondary && !hint,
        'md-text--secondary': hint,
        'md-text--theme-primary': !hint && primary,
        'md-text--theme-secondary': !hint && secondary,
        'md-ink--primary': ink && primary,
        'md-ink--secondary': ink && secondary
      });
    }
  } else {
    colors = (0, _classnames2.default)({
      'md-background': background && !primary && !secondary && !card,
      'md-background--card': card,
      'md-background--primary': primary,
      'md-background--primary-hover': primary && hover,
      'md-background--secondary': secondary,
      'md-background--secondary-hover': secondary && hover
    });
  }

  return (0, _classnames2.default)(colors, className);
} /** @module utils/themeColors */
//# sourceMappingURL=themeColors.js.map