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

var _addDate = require('../utils/dates/addDate');

var _addDate2 = _interopRequireDefault(_addDate);

var _getLastDay = require('../utils/dates/getLastDay');

var _getLastDay2 = _interopRequireDefault(_getLastDay);

var _stripTime = require('../utils/dates/stripTime');

var _stripTime2 = _interopRequireDefault(_stripTime);

var _toDayOfWeek = require('../utils/dates/toDayOfWeek');

var _toDayOfWeek2 = _interopRequireDefault(_toDayOfWeek);

var _CalendarDate = require('./CalendarDate');

var _CalendarDate2 = _interopRequireDefault(_CalendarDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This component renders a month for the calendar view of the `DatePicker`.
 */
var CalendarMonth = function (_PureComponent) {
  _inherits(CalendarMonth, _PureComponent);

  function CalendarMonth() {
    _classCallCheck(this, CalendarMonth);

    return _possibleConstructorReturn(this, (CalendarMonth.__proto__ || Object.getPrototypeOf(CalendarMonth)).apply(this, arguments));
  }

  _createClass(CalendarMonth, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          calendarDate = _props.calendarDate,
          calendarTempDate = _props.calendarTempDate,
          onCalendarDateClick = _props.onCalendarDateClick,
          minDate = _props.minDate,
          maxDate = _props.maxDate,
          DateTimeFormat = _props.DateTimeFormat,
          locales = _props.locales,
          className = _props.className,
          firstDayOfWeek = _props.firstDayOfWeek,
          disableWeekEnds = _props.disableWeekEnds,
          dateClassName = _props.dateClassName,
          showAllDays = _props.showAllDays,
          outerDateClassName = _props.outerDateClassName,
          disableOuterDates = _props.disableOuterDates,
          props = _objectWithoutProperties(_props, ['calendarDate', 'calendarTempDate', 'onCalendarDateClick', 'minDate', 'maxDate', 'DateTimeFormat', 'locales', 'className', 'firstDayOfWeek', 'disableWeekEnds', 'dateClassName', 'showAllDays', 'outerDateClassName', 'disableOuterDates']);

      var days = [];
      var firstDay = (0, _stripTime2.default)(calendarDate);
      firstDay.setDate(1);
      var lastDay = (0, _getLastDay2.default)(calendarDate);
      var currentDate = (0, _toDayOfWeek2.default)(firstDay, 0);
      var endDate = (0, _toDayOfWeek2.default)(lastDay, 6);
      var activeDateTime = (0, _stripTime2.default)(calendarTempDate).getTime();
      var todayTime = new Date().getTime();

      if (firstDayOfWeek) {
        currentDate = (0, _addDate2.default)(currentDate, firstDayOfWeek > firstDay.getDay() ? firstDayOfWeek - 7 : firstDayOfWeek, 'D');
        endDate = (0, _addDate2.default)(endDate, firstDayOfWeek > lastDay.getDay() ? firstDayOfWeek - 7 : firstDayOfWeek, 'D');
      }

      while (currentDate <= endDate) {
        var key = currentDate.getMonth() + '-' + currentDate.getDate();
        var currentMonth = currentDate.getMonth() === calendarDate.getMonth();

        var date = void 0;
        if (currentMonth || showAllDays) {
          var time = currentDate.getTime();
          var isMinDateDisabled = minDate && minDate.getTime() > time;
          var isMaxDateDisabled = maxDate && maxDate.getTime() < time;
          var isWeekendDisabled = disableWeekEnds && (currentDate.getDay() === 0 || currentDate.getDay() === 6);
          var disabled = !currentMonth && disableOuterDates || isMinDateDisabled || isMaxDateDisabled || isWeekendDisabled;

          date = _react2.default.createElement(_CalendarDate2.default, {
            key: key,
            className: (0, _classnames2.default)(dateClassName, _defineProperty({}, outerDateClassName, !currentMonth && outerDateClassName)),
            today: time === todayTime,
            active: time === activeDateTime,
            disabled: disabled,
            onClick: onCalendarDateClick,
            date: currentDate,
            DateTimeFormat: DateTimeFormat,
            locales: locales
          });
        } else {
          date = _react2.default.createElement('div', { key: key, className: 'md-calendar-date' });
        }

        days.push(date);
        currentDate = (0, _addDate2.default)(currentDate, 1, 'D');
      }

      return _react2.default.createElement(
        'div',
        _extends({ className: (0, _classnames2.default)('md-calendar-month', className) }, props),
        days
      );
    }
  }]);

  return CalendarMonth;
}(_react.PureComponent);

CalendarMonth.propTypes = {
  /**
   * A className to apply.
   */
  className: _propTypes2.default.string,

  /**
   * The current selected date of the calendar. This is
   * the date after hitting the Ok button or `value` || `defaultValue`.
   */
  calendarDate: _propTypes2.default.instanceOf(Date).isRequired,

  /**
   * The current selected date of the calendar before verifying
   * the new date.
   */
  calendarTempDate: _propTypes2.default.instanceOf(Date).isRequired,

  /**
   * An optional min date for the calendar. This will disable any
   * dates that come before this date in the month.
   */
  minDate: _propTypes2.default.instanceOf(Date),

  /**
   * An optional max date for the calendar. This will disable any
   * dates that come after this date in the month.
   */
  maxDate: _propTypes2.default.instanceOf(Date),

  /**
   * A function to call that will select a new date.
   */
  onCalendarDateClick: _propTypes2.default.func.isRequired,

  /**
   * The first day of week: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
   */
  firstDayOfWeek: _propTypes2.default.oneOf([0, 1, 2, 3, 4, 5, 6]),

  /**
   * True if weekends are to be greyed out.
   */
  disableWeekEnds: _propTypes2.default.bool,

  /**
   * An optional className to apply to a date.
   */
  dateClassName: _propTypes2.default.string,

  /**
   * True if dates from adjacent months should be shown.
   */
  showAllDays: _propTypes2.default.bool,
  disableOuterDates: _propTypes2.default.bool,

  /**
   * An optional className to apply to a date from an adjacent month.
   */
  outerDateClassName: _propTypes2.default.string,
  DateTimeFormat: _propTypes2.default.func.isRequired,
  locales: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired
};
CalendarMonth.defaultProps = {
  firstDayOfWeek: 0
};
exports.default = CalendarMonth;
//# sourceMappingURL=CalendarMonth.js.map