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

var _Button = require('../Buttons/Button');

var _Button2 = _interopRequireDefault(_Button);

var _isInvalidAnimate = require('./isInvalidAnimate');

var _isInvalidAnimate2 = _interopRequireDefault(_isInvalidAnimate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Snackbar = function (_PureComponent) {
  _inherits(Snackbar, _PureComponent);

  function Snackbar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Snackbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Snackbar.__proto__ || Object.getPrototypeOf(Snackbar)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = function (e) {
      var _this$props = _this.props,
          onDismiss = _this$props.onDismiss,
          action = _this$props.toast.action,
          leaveTimeout = _this$props.leaveTimeout,
          multiline = _this$props.multiline;

      if (typeof action.onClick === 'function') {
        action.onClick(e);
      }

      if (_this._fab) {
        _this._fab._animateForSnackbar(multiline, leaveTimeout);
      }

      onDismiss();
    }, _this._clearTimeout = function () {
      if (_this._timeout) {
        clearTimeout(_this._timeout);
        _this._timeout = null;
      }
    }, _this._handleAutohide = function () {
      var _this$props2 = _this.props,
          autohide = _this$props2.autohide,
          autohideTimeout = _this$props2.autohideTimeout,
          onDismiss = _this$props2.onDismiss,
          multiline = _this$props2.multiline,
          leaveTimeout = _this$props2.leaveTimeout;

      if (!autohide) {
        return;
      }

      window.addEventListener('blur', _this._handleWindowBlur);
      _this._eventType = 'blur';
      _this._timeout = setTimeout(function () {
        _this._timeout = null;
        _this._eventType = null;

        window.removeEventListener('blur', _this._handleWindowBlur);

        if (_this._fab) {
          _this._fab._animateForSnackbar(multiline, leaveTimeout);
        }

        onDismiss();
      }, autohideTimeout || _this.state.toast);
    }, _this._handleWindowBlur = function () {
      _this._clearTimeout();
      window.removeEventListener('blur', _this._handleWindowBlur);
      window.addEventListener('focus', _this._handleWindowFocus);
      _this._eventType = 'focus';
    }, _this._handleWindowFocus = function () {
      window.removeEventListener('focus', _this._handleWindowFocus);
      _this._eventType = null;
      _this._handleAutohide();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Snackbar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          fab = _props.fab,
          multiline = _props.multiline,
          onAppear = _props.toast.onAppear;

      if (onAppear) {
        onAppear();
      }

      if (!fab || (0, _isInvalidAnimate2.default)(fab)) {
        return;
      }

      this._fab = fab.getComposedComponent().getComposedComponent();
      this._fab._animateForSnackbar(multiline);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._handleAutohide();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._clearTimeout();

      if (this._eventType === 'focus') {
        window.removeEventListener('focus', this._handleWindowFocus);
      } else if (this._eventType === 'blur') {
        window.removeEventListener('blur', this._handleWindowBlur);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          toast = _props2.toast,
          multiline = _props2.multiline,
          propId = _props2.id,
          fab = _props2.fab,
          autohide = _props2.autohide,
          autohideTimeout = _props2.autohideTimeout,
          leaveTimeout = _props2.leaveTimeout,
          onDismiss = _props2.onDismiss,
          props = _objectWithoutProperties(_props2, ['className', 'toast', 'multiline', 'id', 'fab', 'autohide', 'autohideTimeout', 'leaveTimeout', 'onDismiss']);

      var text = toast.text,
          action = toast.action;
      var id = this.props.id;


      var Component = 'p';
      if (action) {
        Component = 'section';
        text = _react2.default.createElement(
          'p',
          { className: 'md-snackbar--toast md-snackbar--action' },
          text
        );

        var btnProps = {
          flat: true,
          onClick: this._handleClick,
          children: action,
          secondary: true,
          className: 'md-btn--snackbar'
        };

        if (typeof action !== 'string') {
          btnProps = Object.assign(btnProps, action, {
            className: (0, _classnames2.default)(btnProps.className, action.className),
            onClick: this._handleClick
          });
        }

        action = _react2.default.createElement(_Button2.default, btnProps);
      }

      if (!id) {
        id = 'snackbar-alert' + (action ? '-dialog' : '');
      }

      var role = 'alert' + (action ? 'dialog' : '');
      return _react2.default.createElement(
        Component,
        _extends({}, props, {
          id: id,
          role: role,
          className: (0, _classnames2.default)('md-snackbar', {
            'md-snackbar--multiline': multiline,
            'md-snackbar--toast': !action
          }, className)
        }),
        text,
        action
      );
    }
  }]);

  return Snackbar;
}(_react.PureComponent);

Snackbar.propTypes = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  onDismiss: _propTypes2.default.func.isRequired,
  toast: _propTypes2.default.shape({
    text: _propTypes2.default.node.isRequired,
    action: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.shape({
      label: _propTypes2.default.node,
      children: _propTypes2.default.node,
      onClick: _propTypes2.default.func
    })]),
    onAppear: _propTypes2.default.func
  }).isRequired,
  multiline: _propTypes2.default.bool,
  autohide: _propTypes2.default.bool,
  autohideTimeout: _propTypes2.default.number,
  fab: _propTypes2.default.object,
  leaveTimeout: _propTypes2.default.number.isRequired
};
exports.default = Snackbar;
//# sourceMappingURL=Snackbar.js.map