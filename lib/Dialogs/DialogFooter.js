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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FOOTER_PADDING = 8;

var DialogFooter = function (_PureComponent) {
  _inherits(DialogFooter, _PureComponent);

  function DialogFooter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DialogFooter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DialogFooter.__proto__ || Object.getPrototypeOf(DialogFooter)).call.apply(_ref, [this].concat(args))), _this), _this.state = { stacked: false }, _this._setContainer = function (container) {
      if (container !== null) {
        _this._container = container;
        var maxWidth = (_this._container.offsetWidth - FOOTER_PADDING * 3) / 2;

        var stacked = false;
        Array.prototype.slice.call(_this._container.querySelectorAll('.md-btn')).some(function (_ref2) {
          var offsetWidth = _ref2.offsetWidth;

          stacked = offsetWidth > maxWidth;
          return stacked;
        });

        _this.setState({ stacked: stacked });
      }
    }, _this._generateActions = function () {
      var actions = _this.props.actions;

      if (!actions) {
        return null;
      } else if (Array.isArray(actions)) {
        return actions.map(_this._toElement);
      }

      return _this._toElement(actions);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DialogFooter, [{
    key: '_toElement',
    value: function _toElement(action, index) {
      if ((0, _react.isValidElement)(action)) {
        var button = _react.Children.only(action);

        return (0, _react.cloneElement)(action, {
          key: button.key || index,
          className: (0, _classnames2.default)('md-btn--dialog', button.props.className)
        });
      }

      // Both label and children are valid for dialog actions

      var label = action.label,
          children = action.children,
          remaining = _objectWithoutProperties(action, ['label', 'children']);

      return _react2.default.createElement(
        _Button2.default,
        _extends({
          key: index,
          flat: true
        }, remaining, {
          className: (0, _classnames2.default)('md-btn--dialog', action.className)
        }),
        label || children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          actions = _props.actions,
          className = _props.className,
          children = _props.children,
          propStacked = _props.stacked,
          props = _objectWithoutProperties(_props, ['actions', 'className', 'children', 'stacked']);

      if (!children && (!actions || Array.isArray(actions) && !actions.length)) {
        return null;
      }

      var stacked = this.props.stacked;

      var stackedDefined = typeof propStacked !== 'undefined';
      if (!stackedDefined) {
        stacked = this.state.stacked;
      }

      return _react2.default.createElement(
        'footer',
        _extends({}, props, {
          className: (0, _classnames2.default)('md-dialog-footer', {
            'md-dialog-footer--inline': !stacked,
            'md-dialog-footer--stacked': stacked
          }, className),
          ref: !stackedDefined ? this._setContainer : null
        }),
        this._generateActions(),
        children
      );
    }
  }]);

  return DialogFooter;
}(_react.PureComponent);

DialogFooter.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  actions: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object]))]),
  stacked: _propTypes2.default.bool
};
exports.default = DialogFooter;
//# sourceMappingURL=DialogFooter.js.map