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

var _PickerControl = require('./PickerControl');

var _PickerControl2 = _interopRequireDefault(_PickerControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable new-cap */


/**
 * The `DatePickerHeader` component is the component that holds the
 * current year and the current date. It allows the user to switch
 * between calendar and year picker mode.
 */
var DatePickerHeader = function (_PureComponent) {
  _inherits(DatePickerHeader, _PureComponent);

  function DatePickerHeader(props) {
    _classCallCheck(this, DatePickerHeader);

    var _this = _possibleConstructorReturn(this, (DatePickerHeader.__proto__ || Object.getPrototypeOf(DatePickerHeader)).call(this, props));

    _this._selectYear = function (e) {
      _this.props.changeCalendarMode('year', e);
    };

    _this._selectCalendar = function (e) {
      _this.props.changeCalendarMode('calendar', e);
    };

    _this.state = _this._getFormattedDate(props);
    return _this;
  }

  _createClass(DatePickerHeader, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          DateTimeFormat = _props.DateTimeFormat,
          locales = _props.locales,
          calendarTempDate = _props.calendarTempDate,
          changeCalendarMode = _props.changeCalendarMode;

      if (DateTimeFormat !== nextProps.DateTimeFormat || locales !== nextProps.locales || calendarTempDate !== nextProps.calendarTempDate || changeCalendarMode !== nextProps.changeCalendarMode) {
        this.setState(this._getFormattedDate(nextProps));
      }
    }
  }, {
    key: '_getFormattedDate',
    value: function _getFormattedDate(_ref) {
      var DateTimeFormat = _ref.DateTimeFormat,
          locales = _ref.locales,
          calendarTempDate = _ref.calendarTempDate;

      return {
        year: DateTimeFormat(locales, { year: 'numeric' }).format(calendarTempDate),
        weekday: DateTimeFormat(locales, { weekday: 'short' }).format(calendarTempDate),
        date: DateTimeFormat(locales, { month: 'short', day: '2-digit' }).format(calendarTempDate)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          year = _state.year,
          weekday = _state.weekday,
          date = _state.date;
      var _props2 = this.props,
          calendarMode = _props2.calendarMode,
          className = _props2.className;

      return _react2.default.createElement(
        'header',
        { className: (0, _classnames2.default)('md-picker-header', className) },
        _react2.default.createElement(
          _PickerControl2.default,
          { onClick: this._selectYear, active: calendarMode === 'year' },
          _react2.default.createElement(
            'h6',
            { className: 'md-subheading-1' },
            year
          )
        ),
        _react2.default.createElement(
          _PickerControl2.default,
          { onClick: this._selectCalendar, active: calendarMode === 'calendar' },
          _react2.default.createElement(
            'h4',
            { className: 'md-display-1' },
            weekday + ',',
            '\xA0'
          ),
          _react2.default.createElement(
            'h4',
            { className: 'md-display-1' },
            date
          )
        )
      );
    }
  }]);

  return DatePickerHeader;
}(_react.PureComponent);

DatePickerHeader.propTypes = {
  className: _propTypes2.default.string,
  DateTimeFormat: _propTypes2.default.func.isRequired,
  locales: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired,
  calendarTempDate: _propTypes2.default.instanceOf(Date).isRequired,
  calendarMode: _propTypes2.default.oneOf(['calendar', 'year']).isRequired,
  changeCalendarMode: _propTypes2.default.func.isRequired
};
exports.default = DatePickerHeader;
//# sourceMappingURL=DatePickerHeader.js.map