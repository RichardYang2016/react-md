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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This component renders a selectable date in the `CalendarMonth` component.
 */
var CalendarDate = function (_PureComponent) {
  _inherits(CalendarDate, _PureComponent);

  function CalendarDate(props) {
    _classCallCheck(this, CalendarDate);

    var _this = _possibleConstructorReturn(this, (CalendarDate.__proto__ || Object.getPrototypeOf(CalendarDate)).call(this, props));

    _this._setFocus = function (btn) {
      if (btn && _this.props.active) {
        btn.focus();
      }
    };

    _this._handleClick = function (e) {
      _this.props.onClick(new Date(_this.props.date), e);
    };

    _this._setActive = function () {
      if (!_this.props.disabled) {
        _this.setState({ desktopActive: true });
      }
    };

    _this._setInactive = function () {
      if (!_this.props.disabled) {
        _this.setState({ desktopActive: false });
      }
    };

    _this.state = _extends({}, _this._getFormattedDate(props), { desktopActive: false });
    return _this;
  }

  _createClass(CalendarDate, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          DateTimeFormat = _props.DateTimeFormat,
          locales = _props.locales,
          date = _props.date;

      if (DateTimeFormat !== nextProps.DateTimeFormat || locales !== nextProps.locales || date !== nextProps.date) {
        this.setState(this._getFormattedDate(nextProps));
      }
    }
  }, {
    key: '_getFormattedDate',
    value: function _getFormattedDate(_ref) {
      var DateTimeFormat = _ref.DateTimeFormat,
          locales = _ref.locales,
          date = _ref.date;

      return {
        date: new DateTimeFormat(locales, { day: 'numeric' }).format(date)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          date = _state.date,
          desktopActive = _state.desktopActive;
      var _props2 = this.props,
          disabled = _props2.disabled,
          active = _props2.active,
          today = _props2.today,
          className = _props2.className;


      var fullyActive = today && !active && !desktopActive;
      return _react2.default.createElement(
        'button',
        {
          type: 'button',
          ref: this._setFocus,
          onFocus: this._setActive,
          onBlur: this._setInactive,
          onMouseOver: this._setActive,
          onMouseLeave: this._setInactive,
          className: (0, _classnames2.default)('md-calendar-date md-calendar-date--btn', {
            'md-calendar-date--btn-active': active || desktopActive,
            'md-pointer--hover': !disabled
          }, (0, _themeColors2.default)({ disabled: disabled, primary: fullyActive }), 'md-btn', className),
          onClick: this._handleClick,
          disabled: disabled
        },
        _react2.default.createElement(
          'span',
          {
            className: (0, _classnames2.default)('md-calendar-date--date', {
              'md-picker-text--active': active || desktopActive,
              'md-font-bold': fullyActive
            })
          },
          date
        )
      );
    }
  }]);

  return CalendarDate;
}(_react.PureComponent);

CalendarDate.propTypes = {
  className: _propTypes2.default.string,
  date: _propTypes2.default.instanceOf(Date).isRequired,
  DateTimeFormat: _propTypes2.default.func.isRequired,
  locales: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func.isRequired,
  active: _propTypes2.default.bool,
  today: _propTypes2.default.bool
};
exports.default = CalendarDate;
//# sourceMappingURL=CalendarDate.js.map