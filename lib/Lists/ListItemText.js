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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `ListItemText` component is used to render the `primaryText` and an optional
 * `secondaryText` for a `ListItem`.
 */
var ListItemText = function (_PureComponent) {
  _inherits(ListItemText, _PureComponent);

  function ListItemText() {
    _classCallCheck(this, ListItemText);

    return _possibleConstructorReturn(this, (ListItemText.__proto__ || Object.getPrototypeOf(ListItemText)).apply(this, arguments));
  }

  _createClass(ListItemText, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          active = _props.active,
          activeClassName = _props.activeClassName,
          disabled = _props.disabled,
          primaryText = _props.primaryText,
          primaryTextStyle = _props.primaryTextStyle,
          primaryTextClassName = _props.primaryTextClassName,
          secondaryText = _props.secondaryText,
          secondaryTextStyle = _props.secondaryTextStyle,
          secondaryTextClassName = _props.secondaryTextClassName,
          className = _props.className,
          threeLines = _props.threeLines,
          props = _objectWithoutProperties(_props, ['active', 'activeClassName', 'disabled', 'primaryText', 'primaryTextStyle', 'primaryTextClassName', 'secondaryText', 'secondaryTextStyle', 'secondaryTextClassName', 'className', 'threeLines']);

      var secondaryTextNode = void 0;
      if (secondaryText) {
        secondaryTextNode = _react2.default.createElement(
          'div',
          {
            style: secondaryTextStyle,
            className: (0, _classnames2.default)('md-tile-text--secondary', {
              'md-tile-text--three-lines': threeLines
            }, (0, _themeColors2.default)({ disabled: disabled, hint: !disabled }), secondaryTextClassName)
          },
          secondaryText
        );
      }

      return _react2.default.createElement(
        'div',
        _extends({}, props, { className: (0, _classnames2.default)('md-tile-content', className) }),
        _react2.default.createElement(
          'div',
          {
            style: primaryTextStyle,
            className: (0, _classnames2.default)('md-tile-text--primary', _defineProperty({}, activeClassName, !disabled && active), (0, _themeColors2.default)({ disabled: disabled, text: !active }), primaryTextClassName)
          },
          primaryText
        ),
        secondaryTextNode
      );
    }
  }]);

  return ListItemText;
}(_react.PureComponent);

ListItemText.propTypes = {
  active: _propTypes2.default.bool,
  activeClassName: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  primaryText: _propTypes2.default.node.isRequired,
  primaryTextStyle: _propTypes2.default.object,
  primaryTextClassName: _propTypes2.default.string,
  secondaryText: _propTypes2.default.node,
  secondaryTextStyle: _propTypes2.default.object,
  secondaryTextClassName: _propTypes2.default.string,
  className: _propTypes2.default.string,
  threeLines: _propTypes2.default.bool
};
exports.default = ListItemText;
//# sourceMappingURL=ListItemText.js.map