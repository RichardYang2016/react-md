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

var _isValidFocusKeypress = require('../utils/EventUtils/isValidFocusKeypress');

var _isValidFocusKeypress2 = _interopRequireDefault(_isValidFocusKeypress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hrefables = ['a', 'area'].map(function (tag) {
  return tag + '[href],';
}).join('');
var disableables = ['button', 'input', 'textarea', 'select'].map(function (tag) {
  return tag + ':not([disabled]),';
}).join('');
var FOCUSABLE_QUERY = '' + hrefables + disableables + '*[tabIndex]';

/**
 * This component is used for keeping the focus within some container. When the container
 * is mounted and the `focusOnMount` prop is `true`, it will attempt to focus either:
 * - an element that matches `document.getElementById(this.props.initialFocus)`
 * - an element that matches `this._container.querySelector(this.props.initialFocus)`
 * - the first focusable element in it's children (if `this.props.initialFocus` is omitted)
 */

var FocusContainer = function (_PureComponent) {
  _inherits(FocusContainer, _PureComponent);

  function FocusContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FocusContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FocusContainer.__proto__ || Object.getPrototypeOf(FocusContainer)).call.apply(_ref, [this].concat(args))), _this), _this._enableFocusTrap = function () {
      window.addEventListener('keydown', _this._handleKeyDown, true);
    }, _this._disableFocusTrap = function () {
      window.removeEventListener('keydown', _this._handleKeyDown, true);
    }, _this._attemptInitialFocus = function () {
      if (!_this._container) {
        return;
      }

      var initialFocus = _this.props.initialFocus;


      var toFocus = initialFocus ? document.getElementById(initialFocus) || _this._container.querySelector(initialFocus) : _this._focusables[0];

      var debugError = void 0;
      if (!toFocus && initialFocus) {
        debugError = ' The `initialFocus` did not match a document\'s `id` or was an invalid ';
        debugError += '`querySelector` for the container. `initialFocus`: `' + initialFocus + '`. ';
        debugError += 'If this was supposed to be an `id`, make sure to prefix with the `#` symbol.';
      }

      if (process.env.NODE_ENV !== 'production' && !toFocus) {
        throw new Error('You specified that the `FocusContainer` should focus an element on mount, ' + 'but a focusable element was not found in the children. This could be because ' + 'the `initialFocus` prop is an invalid id or query selector, or the children ' + ('do not contain a valid focusable element.' + debugError));
      }

      if (toFocus) {
        toFocus.focus();
      }
    }, _this._containFocus = function (containerRef) {
      if (containerRef === null) {
        _this._container = null;
        _this._disableFocusTrap();
        return;
      }

      var _this$props = _this.props,
          focusOnMount = _this$props.focusOnMount,
          containFocus = _this$props.containFocus;

      _this._container = (0, _reactDom.findDOMNode)(containerRef);
      _this._focusables = Array.prototype.slice.call(_this._container.querySelectorAll(FOCUSABLE_QUERY)).filter(function (el) {
        return el.tabIndex !== -1;
      });

      if (focusOnMount) {
        _this._attemptInitialFocus();
      }

      if (containFocus) {
        _this._enableFocusTrap();
      }
    }, _this._handleKeyDown = function (e) {
      _this._shifted = e.shiftKey;
      if (!(0, _isValidFocusKeypress2.default)(e, _this.props.additionalFocusKeys)) {
        return;
      } else if (_this._focusables.length === 1) {
        e.preventDefault();
        return;
      }

      var target = e.target,
          shiftKey = e.shiftKey;

      var _this$_focusables = _toArray(_this._focusables),
          first = _this$_focusables[0],
          focusables = _this$_focusables.slice(1);

      var last = focusables[focusables.length - 1];

      if (shiftKey && target === first) {
        e.preventDefault();
        last.focus();
      } else if (!shiftKey && target === last) {
        e.preventDefault();
        first.focus();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FocusContainer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.containFocus === nextProps.containFocus) {
        return;
      }

      if (nextProps.containFocus) {
        this._enableFocusTrap();
        this._attemptInitialFocus();
      } else {
        this._disableFocusTrap();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.containFocus && this._container) {
        this._focusables = Array.prototype.slice.call(this._container.querySelectorAll(FOCUSABLE_QUERY)).filter(function (el) {
          return el.tabIndex !== -1;
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.containFocus) {
        this._disableFocusTrap();
      }
    }

    /**
     * Manages the event listeners to contain the focus within some container.  When the container
     * ref is not null, the container has mounted and then attempts to focus an element inside
     * if the `focusOnMount` prop is `true`.
     */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          Component = _props.component,
          initialFocus = _props.initialFocus,
          focusOnMount = _props.focusOnMount,
          containFocus = _props.containFocus,
          additionalFocusKeys = _props.additionalFocusKeys,
          props = _objectWithoutProperties(_props, ['component', 'initialFocus', 'focusOnMount', 'containFocus', 'additionalFocusKeys']);

      return _react2.default.createElement(Component, _extends({}, props, { ref: this._containFocus }));
    }
  }]);

  return FocusContainer;
}(_react.PureComponent);

FocusContainer.propTypes = {
  /**
   * The component to render as. This can be a React DOM element or
   * a react Component.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,

  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply.
   */
  className: _propTypes2.default.string,

  /**
   * The children to display.
   */
  children: _propTypes2.default.node,

  /**
   * An optional id string or a query selector string to use for the initial focus.
   * This will only be triggered if the `focusOnMount` prop is `true`. If this is
   * omitted and the `focusOnMount` prop is `true`, the first focusable element in the
   * container will be focused.
   *
   * Examples:
   *
   * ```js
   * initialFocus="#someAmazingId"
   * // or
   * initialFocus=".md-btn,.md-list-tile"
   * ```
   */
  initialFocus: _propTypes2.default.string,

  /**
   * Boolean if an element in the container should be focused when mounted.
   */
  focusOnMount: _propTypes2.default.bool,

  /**
   * An optional list of additional key codes to use for focus events.
   */
  additionalFocusKeys: _propTypes2.default.arrayOf(_propTypes2.default.number),

  /**
   * Boolean if the focus container should start or stop containing the focus within the container.
   * This is useful for changing the focus requirements after mount.
   */
  containFocus: _propTypes2.default.bool
};
FocusContainer.defaultProps = {
  component: 'div',
  containFocus: true
};
exports.default = FocusContainer;
//# sourceMappingURL=FocusContainer.js.map