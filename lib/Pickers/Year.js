'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This is a component for rendering a year in the Date Picker's Year picker
 * list.
 */
var Year = function (_PureComponent) {
  _inherits(Year, _PureComponent);

  function Year() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Year);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Year.__proto__ || Object.getPrototypeOf(Year)).call.apply(_ref, [this].concat(args))), _this), _this.state = { desktopActive: false }, _this._setActiveFocus = function (btn) {
      if (btn && _this.props.active) {
        btn.focus();
      }
    }, _this._setActive = function () {
      _this.setState({ desktopActive: true });
    }, _this._setInactive = function () {
      _this.setState({ desktopActive: false });
    }, _this._handleClick = function (e) {
      _this.props.onClick(_this.props.year, e);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Year, [{
    key: 'render',
    value: function render() {
      var desktopActive = this.state.desktopActive;
      var _props = this.props,
          active = _props.active,
          className = _props.className,
          year = _props.year;

      return _react2.default.createElement(
        'button',
        {
          type: 'button',
          ref: this._setActiveFocus,
          className: (0, _classnames2.default)('md-year', { 'md-year--active': active }, (0, _themeColors2.default)({
            text: !active && !desktopActive,
            primary: active || desktopActive
          }), 'md-btn md-pointer--hover md-full-width', className),
          onClick: this._handleClick
        },
        year
      );
    }
  }]);

  return Year;
}(_react.PureComponent);

Year.propTypes = {
  className: _propTypes2.default.string,
  active: _propTypes2.default.bool.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  year: _propTypes2.default.number.isRequired
};
exports.default = Year;
//# sourceMappingURL=Year.js.map