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

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _keyCodes = require('../constants/keyCodes');

var _CSSTransitionGroupTick = require('../constants/CSSTransitionGroupTick');

var _CSSTransitionGroupTick2 = _interopRequireDefault(_CSSTransitionGroupTick);

var _getBtnStyles2 = require('./getBtnStyles');

var _getBtnStyles3 = _interopRequireDefault(_getBtnStyles2);

var _invalidIf = require('../utils/PropTypes/invalidIf');

var _invalidIf2 = _interopRequireDefault(_invalidIf);

var _captureNextEvent = require('../utils/EventUtils/captureNextEvent');

var _captureNextEvent2 = _interopRequireDefault(_captureNextEvent);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _IconSeparator = require('../Helpers/IconSeparator');

var _IconSeparator2 = _interopRequireDefault(_IconSeparator);

var _injectInk = require('../Inks/injectInk');

var _injectInk2 = _interopRequireDefault(_injectInk);

var _injectTooltip = require('../Tooltips/injectTooltip');

var _injectTooltip2 = _interopRequireDefault(_injectTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `Button` component can either be a `FlatButton`, `RaisedButton`, `IconButton`, or a
 * `FloatingButton`.
 *
 * A `FlatButton` is a button with no depth on the screen that is ideally used in `Dialog`s
 * or `CardActions`. The text can be optionally styled with the `primary` or `secondary` colors.
 *
 * A `RaisedButton` is a button with some depth to help actions have more prominent in flat
 * layouts or layouts with varying content. The background can be styled by the light/dark theme,
 * or optionally the `primary` or `secondary` color.
 *
 * An `IconButton` is a button that just displays a `FontIcon` as the child in a circle.
 * The `FontIcon` can be optionally styled with the `primary` or `secondary` color.
 *
 * A `FloatingButton` is a special case. Woop
 */
var Button = function (_PureComponent) {
  _inherits(Button, _PureComponent);

  function Button() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Button, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.disabled && !nextProps.disabled && this.state.hover) {
        this.setState({ hover: false });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var _this2 = this;

      if (!this.state.pressed && nextState.pressed) {
        this._timeout = setTimeout(function () {
          _this2._timeout = null;
          if (_this2._attemptedBlur) {
            _this2._attemptedBlur = false;

            _this2.setState({ pressed: false });
          }
        }, 450);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }

      if (this._snackbarTimeout) {
        clearTimeout(this._snackbarTimeout);
      }

      window.removeEventListener('click', this._blur);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          iconClassName = _props.iconClassName,
          iconChildren = _props.iconChildren,
          iconBefore = _props.iconBefore,
          href = _props.href,
          primary = _props.primary,
          secondary = _props.secondary,
          flat = _props.flat,
          raised = _props.raised,
          floating = _props.floating,
          mini = _props.mini,
          fixed = _props.fixed,
          fixedPosition = _props.fixedPosition,
          disabled = _props.disabled,
          component = _props.component,
          ink = _props.ink,
          tooltip = _props.tooltip,
          icon = _props.icon,
          forceIconSize = _props.forceIconSize,
          forceIconFontSize = _props.forceIconFontSize,
          type = _props.type,
          children = _props.children,
          swapTheming = _props.swapTheming,
          svg = _props.svg,
          propIconEl = _props.iconEl,
          label = _props.label,
          props = _objectWithoutProperties(_props, ['className', 'iconClassName', 'iconChildren', 'iconBefore', 'href', 'primary', 'secondary', 'flat', 'raised', 'floating', 'mini', 'fixed', 'fixedPosition', 'disabled', 'component', 'ink', 'tooltip', 'icon', 'forceIconSize', 'forceIconFontSize', 'type', 'children', 'swapTheming', 'svg', 'iconEl', 'label']);

      var iconEl = this.props.iconEl;


      if (!href) {
        props.type = type;
      }

      var _state = this.state,
          pressed = _state.pressed,
          hover = _state.hover,
          snackbar = _state.snackbar,
          snackbarType = _state.snackbarType;

      var iconBtnType = icon || floating;

      var visibleChildren = void 0;
      if (!iconEl && !svg && (iconClassName || iconChildren || iconBtnType || label && children)) {
        var resolvedIconChildren = iconChildren;
        if (typeof iconChildren === 'undefined') {
          resolvedIconChildren = iconBtnType || label ? children : null;
        }

        iconEl = _react2.default.createElement(
          _FontIcon2.default,
          { iconClassName: iconClassName, forceSize: forceIconSize, forceFontSize: forceIconFontSize, inherit: true },
          resolvedIconChildren
        );
      } else if (iconEl || svg) {
        var el = _react2.default.Children.only(iconEl || children);
        iconEl = _react2.default.cloneElement(el, { inherit: !el.props.error });
      }

      if (!iconBtnType) {
        visibleChildren = label || children;
        if (iconEl) {
          visibleChildren = _react2.default.createElement(
            _IconSeparator2.default,
            { label: visibleChildren, iconBefore: iconBefore },
            iconEl
          );
        }
      } else {
        visibleChildren = iconEl;
      }

      var Component = component || (href ? 'a' : 'button');
      return _react2.default.createElement(
        Component,
        _extends({}, props, {
          disabled: disabled,
          onTouchStart: this._handleTouchStart,
          onTouchEnd: this._handleTouchEnd,
          onMouseDown: this._handleMouseDown,
          onMouseUp: this._handleMouseUp,
          onKeyDown: this._handleKeyDown,
          onKeyUp: this._handleKeyUp,
          onMouseEnter: this._handleMouseEnter,
          onMouseLeave: this._handleMouseLeave,
          href: href,
          className: (0, _getBtnStyles3.default)({
            flat: flat,
            raised: raised,
            icon: icon,
            floating: floating,
            disabled: disabled,
            primary: primary,
            secondary: secondary,
            hover: hover,
            swapTheming: swapTheming,
            pressed: pressed,
            mini: mini,
            fixed: fixed,
            fixedPosition: fixedPosition
          }, _defineProperty({
            'md-btn--tooltip': tooltip,
            'md-btn--snackbar-floating': snackbar
          }, 'md-btn--snackbar-floating-' + snackbarType + 'adjust', snackbar && snackbarType !== null), 'md-inline-block', className)
        }),
        ink,
        tooltip,
        visibleChildren
      );
    }
  }]);

  return Button;
}(_react.PureComponent);

Button.propTypes = {
  /**
   * An optional style to apply to the button.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the button.
   */
  className: _propTypes2.default.string,

  /**
   * A boolean if the icon should appear before or after the text for a `FlatButton` or
   * a `RaisedButton`.
   */
  iconBefore: _propTypes2.default.bool,

  /**
   * Any children used to display the button. When the button type is `icon` or `floating`,
   * this can be used to render the `FontIcon` instead of the `iconChildren` prop.
   *
   * When the button type is `raised` or `flat`, this will be the label or any other elements
   * you'd like to display in the button. This can work hand-in-hand with the `iconClassName`
   * and `iconChildren` to make a button with an icon and text.
   */
  children: _propTypes2.default.node,

  /**
   * An icon className to use in an optional `FontIcon` in any version of the button. This will
   * be used with the `children` prop. If the `floating` or `icon` props are set to true, this or
   * the children are required.
   *
   * @see {@link #iconEl}
   */
  iconClassName: _propTypes2.default.string,

  /**
   * Any children to use to display an icon in the button.
   *
   * @see {@link #iconEl}
   */
  iconChildren: _propTypes2.default.node,

  /**
   * An optional icon to display. This prop is recommended over the `iconClassName` and `iconChildren`
   * props since it allows more control for you. There is also better SVG support since it won't wrap
   * the SVG with the `FontIcon` element.
   */
  iconEl: _propTypes2.default.element,

  /**
   * The type for the button. This is required when the `component` prop is not
   * the 'a' tag, a `function`, or when the `href` prop is defined.
   */
  type: function type(props, propName, component) {
    for (var _len2 = arguments.length, args = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      args[_key2 - 3] = arguments[_key2];
    }

    var c = props.component;
    var validator = _propTypes2.default.oneOf(['button', 'submit', 'reset']);
    if (!props.href && c !== 'a' && typeof c !== 'function') {
      validator = validator.isRequired;
    }

    return validator.apply(undefined, [props, propName, component].concat(args));
  },

  /**
   * Boolean if the button should be styled with the primary color.
   */
  primary: _propTypes2.default.bool,

  /**
   * Boolean if the button should be styled with the secondary color.
   */
  secondary: _propTypes2.default.bool,

  /**
   * Boolean if the button is disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * An optional href for the button. This will style the `a` tag as a button.
   */
  href: _propTypes2.default.string,

  /**
   * An optional component to render the button as. This allows you to get all the styles and functionality
   * of the Button, but as a custom React component.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),

  /**
   * An optional function to call when the `click` event is triggered.
   */
  onClick: _propTypes2.default.func,

  /**
   * An optional function to call when the `touchstart` event is triggered.
   */
  onTouchStart: _propTypes2.default.func,

  /**
   * An optional function to call when the `touchend` event is triggered.
   */
  onTouchEnd: _propTypes2.default.func,

  /**
   * An optional function to call when the `mousedown` event is triggered.
   */
  onMouseDown: _propTypes2.default.func,

  /**
   * An optional function to call when the `mouseup` event is triggered.
   */
  onMouseUp: _propTypes2.default.func,

  /**
   * An optional function to call when the `keyup` event is triggered.
   */
  onKeyUp: _propTypes2.default.func,

  /**
   * An optional function to call when the `keydown` event is triggered.
   */
  onKeyDown: _propTypes2.default.func,

  /**
   * An optional function to call when the `mouseenter` event is triggered.
   */
  onMouseEnter: _propTypes2.default.func,

  /**
   * An optional function to call when the `mouseleave` event is triggered.
   */
  onMouseLeave: _propTypes2.default.func,

  /**
   * Boolean if the `FloatingButton` should be fixed to the page. This prop can
   * only be enabled if the `floating` prop is true.
   */
  fixed: (0, _invalidIf2.default)(_propTypes2.default.bool, 'flat', 'raised', 'icon'),

  /**
   * The position that the `FloatingButton` should be fixed to the page. It will
   * either be fixed to the top right, top left, bottom right, or bottom left of
   * the page. This prop is only used if the `floating` prop and `fixed` prop are
   * `true`.
   */
  fixedPosition: _propTypes2.default.oneOf(['tr', 'tl', 'br', 'bl']).isRequired,

  /**
   * Boolean if the `FloatingButton` should be `mini`. This prop can only be used
   * when the `floating` prop is true.
   */
  mini: (0, _invalidIf2.default)(_propTypes2.default.bool, 'flat', 'raised', 'icon'),

  /**
   * Boolean if the `Button` should be styled as a `FlatButton`.
   */
  flat: _propTypes2.default.bool,

  /**
   * Boolean if the `Button` should be styled as a `RaisedButton`.
   */
  raised: _propTypes2.default.bool,

  /**
   * Boolean if the `Button` should be styled as a `IconButton`.
   *
   * @see {@link #svg}
   */
  icon: _propTypes2.default.bool,

  /**
   * Boolean if the `Button` should be styled as a `FloatingButton`.
   *
   * @see {@link #svg}
   */
  floating: _propTypes2.default.bool,

  /**
   * Boolean if the theming of `primary` or `secondary` should be swapped. By default,
   * only flat and icon buttons can gain the theme colors as text color while the raised
   * and floating buttons can gain the theme colors as background color.
   *
   * If this prop is enabled, the flat and icon buttons will gain the theme background colors
   * while the raised and icon will gain the theme text colors instead.
   *
   * @see {@link #primary}
   * @see {@link #secondary}
   */
  swapTheming: _propTypes2.default.bool,

  /**
   * An optional label to use for the tooltip. This is normally only used for
   * `IconButton`s or `FloatingButton`s, but can be used on `FlatButton`s and
   * `RaisedButton`s if you wish. Knock yourself out!
   *
   * If this prop is omitted, no tooltip will be included.
   */
  tooltipLabel: _propTypes2.default.node,

  /**
   * An optional delay before the tooltip appears on mouse over.
   */
  tooltipDelay: _propTypes2.default.number,

  /**
   * The position for the tooltip.
   */
  tooltipPosition: _propTypes2.default.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * An ink from `injectInk`.
   * @access private
   */
  ink: _propTypes2.default.node,

  /**
   * A tooltip from `injectTooltip`
   * @access private
   */
  tooltip: _propTypes2.default.node,

  /**
   * Custom validator for verifying that only one type is defined and that
   * at one type is defined.
   */
  _typeValidator: function _typeValidator(props, propName, component) {
    var flat = props.flat,
        raised = props.raised,
        icon = props.icon,
        floating = props.floating;


    var defined = [raised, flat, icon, floating].filter(function (d) {
      return d;
    });
    var len = defined.length;
    if (len === 0) {
      return new Error('A material design button type must be specified in the `' + component + '` but none were ' + 'given. Valid types are `flat`, `raised`, `icon`, or `floating`.');
    } else if (len !== 1) {
      return new Error('Only one material design button type may be specified in the `' + component + '` but `' + len + '` ' + 'were given. Select only one of `flat`, `raised`, `icon`, or `floating`.');
    }

    return null;
  },

  /**
   * Either a boolean that will enforce the 24x24 size of the font icon or a number of the size
   * to enforce. This is useful when using other font icon libraries that do not have a consistent
   * size.
   */
  forceIconSize: _FontIcon2.default.propTypes.forceSize,

  /**
   * Boolean if the `forceIconSize` prop should also force the `font-size` instead of only `width` and `height`.
   */
  forceIconFontSize: _propTypes2.default.bool,

  /**
   * Boolean if the child is an SVGIcon or FontIcon when using the `icon` or `floating` props. This is only needed
   * until the next release when the `label` migration can be removed.
   */
  svg: _propTypes2.default.bool,

  label: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `children` prop instead'),
  noIcon: (0, _deprecated2.default)(_propTypes2.default.bool, 'This has been removed during the alpha release. Children will always attempt to be rendered outside of an ' + 'icon by default for flat and raised buttons')
};
Button.defaultProps = {
  type: 'button',
  iconBefore: true,
  fixedPosition: 'br'
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.state = {
    pressed: false,
    snackbar: false,
    snackbarType: null
  };

  this._blur = function () {
    if (_this3.props.disabled) {
      return;
    }

    if (_this3._timeout) {
      _this3._attemptedBlur = true;
    } else {
      _this3.setState({ pressed: false });
    }
  };

  this._handleMouseUp = function (e) {
    if (_this3.props.onMouseUp) {
      _this3.props.onMouseUp(e);
    }

    _this3._blur();
  };

  this._handleMouseDown = function (e) {
    if (_this3.props.onMouseDown) {
      _this3.props.onMouseDown(e);
    }

    if (!_this3.props.disabled) {
      _this3.setState({ pressed: true });
    }
  };

  this._handleTouchStart = function (e) {
    if (_this3.props.onTouchStart) {
      _this3.props.onTouchStart(e);
    }

    if (!_this3.props.disabled) {
      _this3.setState({ pressed: true });
    }
  };

  this._handleTouchEnd = function (e) {
    if (_this3.props.onTouchEnd) {
      _this3.props.onTouchEnd(e);
    }

    _this3._blur();
    (0, _captureNextEvent2.default)('mouseover');
  };

  this._handleKeyUp = function (e) {
    if (_this3.props.onKeyUp) {
      _this3.props.onKeyUp(e);
    }

    if ((e.which || e.keyCode) === _keyCodes.TAB) {
      window.addEventListener('click', _this3._blur);
      _this3.setState({ pressed: true });
    }
  };

  this._handleKeyDown = function (e) {
    if (_this3.props.onKeyDown) {
      _this3.props.onKeyDown(e);
    }

    if ((e.which || e.keyCode) === _keyCodes.TAB) {
      window.removeEventListener('click', _this3._blur);
      _this3.setState({ pressed: false });
    }
  };

  this._handleMouseEnter = function (e) {
    if (_this3.props.onMouseEnter) {
      _this3.props.onMouseEnter(e);
    }

    if (!_this3.props.disabled) {
      _this3.setState({ hover: true });
    }
  };

  this._handleMouseLeave = function (e) {
    if (_this3.props.onMouseLeave) {
      _this3.props.onMouseLeave(e);
    }

    if (!_this3.props.disabled) {
      _this3.setState({ hover: false });
    }
  };

  this._animateForSnackbar = function (multiline, leaveTimeout) {
    if (typeof leaveTimeout === 'number') {
      _this3._snackbarTimeout = setTimeout(function () {
        _this3._snackbarTimeout = setTimeout(function () {
          _this3._snackbarTimeout = null;

          _this3.setState({ snackbar: false });
        }, leaveTimeout + 150);

        _this3.setState({ snackbarType: null });
      }, _CSSTransitionGroupTick2.default);
    } else {
      _this3._snackbarTimeout = setTimeout(function () {
        _this3._snackbarTimeout = null;

        _this3.setState({ snackbar: true, snackbarType: multiline ? 'multiline-' : '' });
      }, _CSSTransitionGroupTick2.default);
    }
  };
};

exports.default = (0, _injectInk2.default)((0, _injectTooltip2.default)(Button));
//# sourceMappingURL=Button.js.map