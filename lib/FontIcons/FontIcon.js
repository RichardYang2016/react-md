'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _themeColors = require('../utils/themeColors');

var _themeColors2 = _interopRequireDefault(_themeColors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ICON_SIZE = 24;

/**
 * The \`FontIcon\` component is used for rendering a font-icon library's
 * icon. The default is to use the `material-icons` library, but others
 * can be used as well.
 *
 * If you are using another font-icon library that does not always create
 * icons with a perfect 1:1 scale (such as font-awesome), it is recommended
 * to update the `.md-icon` styles to set the width and height to `$md-font-icon-size`.
 * However, this will prevent different sided icons.
 *
 * ```scss
 * .md-icon.fa {
 *   height: $md-font-icon-size;
 *   width: $md-font-icon-size;
 * }
 * ```
 */

var FontIcon = function (_PureComponent) {
  _inherits(FontIcon, _PureComponent);

  function FontIcon(props) {
    _classCallCheck(this, FontIcon);

    var _this = _possibleConstructorReturn(this, (FontIcon.__proto__ || Object.getPrototypeOf(FontIcon)).call(this));

    _initialiseProps.call(_this);

    _this.state = { styles: _this._mergeStyles(props) };
    return _this;
  }

  _createClass(FontIcon, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          style = _props.style,
          forceSize = _props.forceSize,
          forceFontSize = _props.forceFontSize;

      if (style !== nextProps.style || forceSize !== nextProps.forceSize || forceFontSize !== nextProps.forceFontSize) {
        this.setState({ styles: this._mergeStyles(nextProps) });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.state.styles;

      var _props2 = this.props,
          iconClassName = _props2.iconClassName,
          className = _props2.className,
          children = _props2.children,
          disabled = _props2.disabled,
          primary = _props2.primary,
          secondary = _props2.secondary,
          error = _props2.error,
          inherit = _props2.inherit,
          style = _props2.style,
          forceSize = _props2.forceSize,
          forceFontSize = _props2.forceFontSize,
          props = _objectWithoutProperties(_props2, ['iconClassName', 'className', 'children', 'disabled', 'primary', 'secondary', 'error', 'inherit', 'style', 'forceSize', 'forceFontSize']);

      var classes = (0, _classnames2.default)('md-icon', iconClassName, (0, _themeColors2.default)({
        disabled: disabled,
        error: error,
        inherit: inherit,
        primary: primary,
        secondary: secondary
      }), className);

      return _react2.default.createElement(
        'i',
        _extends({}, props, { style: styles, className: classes }),
        children
      );
    }
  }]);

  return FontIcon;
}(_react.PureComponent);

FontIcon.propTypes = {
  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the `FontIcon`.
   */
  className: _propTypes2.default.string,

  /**
   * The icon font library className to use to display the icon.
   */
  iconClassName: _propTypes2.default.string.isRequired,

  /**
   * Boolean if the primary theme color should be applied.
   */
  primary: _propTypes2.default.bool,

  /**
   * Boolean if the secondary theme color should be applied.
   */
  secondary: _propTypes2.default.bool,

  /**
   * Boolean if the icon is considered disabled and should inherit the
   * disabled color.
   */
  disabled: _propTypes2.default.bool,

  /**
   * Boolean if the error color should be applied to the icon.
   */
  error: _propTypes2.default.bool,

  /**
   * Boolean if the color of the icon should be inherited by parent elements.
   */
  inherit: _propTypes2.default.bool,

  /**
   * Either a boolean that will enforce the 24x24 size of the font icon or a number of the size
   * to enforce. This is useful when using other font icon libraries that do not have a consistent
   * size.
   */
  forceSize: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),

  /**
   * Boolean if the `forceSize` prop should also force the `font-size` instead of only `width` and `height`.
   */
  forceFontSize: function forceFontSize(props, propName, component) {
    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    var error = _propTypes2.default.bool.apply(_propTypes2.default, [props, propName, component].concat(args));
    if (!error && typeof props.forceSize === 'undefined' && props[propName]) {
      error = new Error('You provided a `forceFontSize` prop to the ' + component + ' component, without specifying the `forceSize` ' + ('prop. Either set the `forceSize` prop to a boolean or a number, or disable `' + propName + '`.'));
    }

    return error;
  },

  /**
   * Any children required to display the icon with the font library.
   */
  children: _propTypes2.default.node
};
FontIcon.defaultProps = {
  iconClassName: 'material-icons'
};

var _initialiseProps = function _initialiseProps() {
  this._mergeStyles = function (_ref) {
    var style = _ref.style,
        forceSize = _ref.forceSize,
        forceFontSize = _ref.forceFontSize;

    var styles = style;
    if (typeof forceSize === 'boolean') {
      styles = _extends({
        height: ICON_SIZE,
        width: ICON_SIZE,
        fontSize: forceFontSize ? ICON_SIZE : undefined
      }, style);
    } else if (typeof forceSize === 'number') {
      styles = _extends({
        height: forceSize,
        width: forceSize,
        fontSize: forceFontSize ? forceSize : undefined
      }, style);
    }

    return styles;
  };
};

exports.default = FontIcon;
//# sourceMappingURL=FontIcon.js.map