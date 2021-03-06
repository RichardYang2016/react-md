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

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _keyCodes = require('../constants/keyCodes');

var _handleKeyboardAccessibility = require('../utils/EventUtils/handleKeyboardAccessibility');

var _handleKeyboardAccessibility2 = _interopRequireDefault(_handleKeyboardAccessibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `AccessibleFakeButton` is a generic component that can be used to render
 * a `div` or any other non `button` components as a button. This should not be
 * used often.
 *
 * The `AccessibleFakeButton` allows the user to tab focus the element, use the
 * space or enter key to trigger the `onClick` event, and toggles the `aria-pressed`
 * attribute.
 */
var AccessibleFakeButton = function (_PureComponent) {
  _inherits(AccessibleFakeButton, _PureComponent);

  function AccessibleFakeButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AccessibleFakeButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AccessibleFakeButton.__proto__ || Object.getPrototypeOf(AccessibleFakeButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = { pressed: false, tabFocused: false }, _this.focus = function () {
      if (_this._node) {
        _this._node.focus();
      }
    }, _this.blur = function () {
      if (_this._node) {
        _this._node.blur();
      }
    }, _this._setNode = function (node) {
      if (node) {
        _this._node = (0, _reactDom.findDOMNode)(node);
      }
    }, _this._handleClick = function (e) {
      if (_this.props.disabled) {
        return;
      }

      if (_this.props.onClick) {
        _this.props.onClick(e);
      }

      _this._node.focus();
      _this.setState({ pressed: !_this.state.pressed });
    }, _this._handleKeyDown = function (e) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onKeyDown = _this$props.onKeyDown,
          listenToEnter = _this$props.listenToEnter,
          listenToSpace = _this$props.listenToSpace;

      if (disabled) {
        return;
      }

      if (onKeyDown) {
        onKeyDown(e);
      }

      (0, _handleKeyboardAccessibility2.default)(e, _this._handleClick, listenToEnter, listenToSpace);
    }, _this._handleKeyUp = function (e) {
      var _this$props2 = _this.props,
          onKeyUp = _this$props2.onKeyUp,
          onTabFocus = _this$props2.onTabFocus;

      if (onKeyUp) {
        onKeyUp(e);
      }

      if ((e.which || e.keyCode) === _keyCodes.TAB) {
        if (onTabFocus) {
          onTabFocus(e);
        }

        _this.setState({ tabFocused: true });
      }
    }, _this._handleBlur = function (e) {
      if (_this.props.onBlur) {
        _this.props.onBlur(e);
      }

      if (_this.state.tabFocused) {
        _this.setState({ tabFocused: false });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Focuses the button.
   */


  /**
   * Blurs the button.
   */


  _createClass(AccessibleFakeButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          Component = _props.component,
          children = _props.children,
          className = _props.className,
          tabbedClassName = _props.tabbedClassName,
          disabled = _props.disabled,
          tabIndex = _props.tabIndex,
          ink = _props.ink,
          noFocusOutline = _props.noFocusOutline,
          onBlur = _props.onBlur,
          onClick = _props.onClick,
          onKeyUp = _props.onKeyUp,
          onKeyDown = _props.onKeyDown,
          onTabFocus = _props.onTabFocus,
          listenToEnter = _props.listenToEnter,
          listenToSpace = _props.listenToSpace,
          props = _objectWithoutProperties(_props, ['component', 'children', 'className', 'tabbedClassName', 'disabled', 'tabIndex', 'ink', 'noFocusOutline', 'onBlur', 'onClick', 'onKeyUp', 'onKeyDown', 'onTabFocus', 'listenToEnter', 'listenToSpace']);

      var childElements = children;
      if (ink) {
        childElements = _react.Children.toArray(children);
        childElements.unshift(ink);
      }

      return _react2.default.createElement(
        Component,
        _extends({}, props, {
          ref: this._setNode,
          className: (0, _classnames2.default)('md-fake-btn', _defineProperty({
            'md-pointer--hover': !disabled,
            'md-fake-btn--no-outline': noFocusOutline
          }, tabbedClassName, tabbedClassName && this.state.tabFocused), className),
          disabled: disabled,
          tabIndex: disabled ? null : tabIndex,
          onBlur: this._handleBlur,
          onClick: this._handleClick,
          onKeyUp: this._handleKeyUp,
          onKeyDown: this._handleKeyDown,
          'aria-pressed': this.state.pressed
        }),
        childElements
      );
    }
  }]);

  return AccessibleFakeButton;
}(_react.PureComponent);

AccessibleFakeButton.propTypes = {
  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply.
   */
  className: _propTypes2.default.string,

  /**
   * An optional function to call only when the button has been focused with the tab key.
   */
  tabbedClassName: _propTypes2.default.string,

  /**
   * Any children to display in the Accessible Fake Button.
   */
  children: _propTypes2.default.node,

  /**
   * An optional onClick function to call when the user clicks the
   * button or presses space || enter.
   */
  onClick: _propTypes2.default.func,

  /**
   * An optional onKeyDown function to call.
   */
  onKeyDown: _propTypes2.default.func,

  /**
   * An optional onBlur function to call.
   */
  onBlur: _propTypes2.default.func,

  /**
   * An optional onKeyUp function to call.
   */
  onKeyUp: _propTypes2.default.func,

  /**
   * An optional function to call when the element is focused with the tab key.
   */
  onTabFocus: _propTypes2.default.func,

  /**
   * The component to render the Fake button as.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

  /**
   * Boolean if the default outline should be removed the when the fake button has been focused.
   *
   * @see {@link #tabbedClassName}
   */
  noFocusOutline: _propTypes2.default.bool,

  /**
   * The tab index to use for the Fake button so it is keyboard focusable.
   */
  tabIndex: _propTypes2.default.number,

  /**
   * Boolean if the Button is disabled. This will prevent tab focus.
   */
  disabled: _propTypes2.default.bool,

  /**
   * The role for the accessible fake button. It is recommended to keep it
   * the default of `button` unless you are rendering it as an `a` tag.
   */
  role: _propTypes2.default.string,

  /**
   * The ink when coming from the AccessibleFakeInkedButton
   * @access private
   */
  ink: _propTypes2.default.node,

  /**
   * Boolean if the spacebar should be used to trigger the click event. This _should_ be `true`
   * is almost all cases.
   */
  listenToSpace: _propTypes2.default.bool,

  /**
   * Boolean if the enter key should be used to trigger the click event. This _should_ be `true`
   * in most cases. By default, the param will be ignored if the `role` attribute is for a `checkbox`
   * or `radio`. When it is a checkbox or radio, it will attempt to submit the form on the enter
   * keypress instead like the native elements.
   */
  listenToEnter: _propTypes2.default.bool
};
AccessibleFakeButton.defaultProps = {
  component: 'div',
  tabIndex: 0,
  role: 'button',
  noFocusOutline: true,
  listenToEnter: true,
  listenToSpace: true
};
exports.default = AccessibleFakeButton;
//# sourceMappingURL=AccessibleFakeButton.js.map