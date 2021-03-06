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

var _CalendarMonth = require('./CalendarMonth');

var _CalendarMonth2 = _interopRequireDefault(_CalendarMonth);

var _CalendarHeader = require('./CalendarHeader');

var _CalendarHeader2 = _interopRequireDefault(_CalendarHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePickerCalendar = function (_PureComponent) {
  _inherits(DatePickerCalendar, _PureComponent);

  function DatePickerCalendar() {
    _classCallCheck(this, DatePickerCalendar);

    return _possibleConstructorReturn(this, (DatePickerCalendar.__proto__ || Object.getPrototypeOf(DatePickerCalendar)).apply(this, arguments));
  }

  _createClass(DatePickerCalendar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          previousIcon = _props.previousIcon,
          onPreviousClick = _props.onPreviousClick,
          nextIcon = _props.nextIcon,
          onNextClick = _props.onNextClick,
          calendarDate = _props.calendarDate,
          calendarTempDate = _props.calendarTempDate,
          onCalendarDateClick = _props.onCalendarDateClick,
          DateTimeFormat = _props.DateTimeFormat,
          locales = _props.locales,
          minDate = _props.minDate,
          maxDate = _props.maxDate,
          firstDayOfWeek = _props.firstDayOfWeek,
          disableWeekEnds = _props.disableWeekEnds,
          showAllDays = _props.showAllDays,
          disableOuterDates = _props.disableOuterDates,
          dateClassName = _props.dateClassName,
          outerDateClassName = _props.outerDateClassName,
          titleClassName = _props.titleClassName,
          titleFormat = _props.titleFormat,
          weekdayClassName = _props.weekdayClassName,
          weekdayFormat = _props.weekdayFormat;


      return _react2.default.createElement(
        'section',
        { className: (0, _classnames2.default)('md-picker-content md-picker-content--calendar', className) },
        _react2.default.createElement(_CalendarHeader2.default, {
          date: calendarDate,
          minDate: minDate,
          maxDate: maxDate,
          DateTimeFormat: DateTimeFormat,
          locales: locales,
          onPreviousClick: onPreviousClick,
          previousIcon: previousIcon,
          onNextClick: onNextClick,
          nextIcon: nextIcon,
          firstDayOfWeek: firstDayOfWeek,
          titleClassName: titleClassName,
          titleFormat: titleFormat,
          weekdayClassName: weekdayClassName,
          weekdayFormat: weekdayFormat
        }),
        _react2.default.createElement(_CalendarMonth2.default, {
          key: new DateTimeFormat(locales).format(calendarDate),
          calendarDate: calendarDate,
          calendarTempDate: calendarTempDate,
          onCalendarDateClick: onCalendarDateClick,
          minDate: minDate,
          maxDate: maxDate,
          DateTimeFormat: DateTimeFormat,
          locales: locales,
          firstDayOfWeek: firstDayOfWeek,
          disableWeekEnds: disableWeekEnds,
          showAllDays: showAllDays,
          disableOuterDates: disableOuterDates,
          dateClassName: dateClassName,
          outerDateClassName: outerDateClassName
        })
      );
    }
  }]);

  return DatePickerCalendar;
}(_react.PureComponent);

DatePickerCalendar.propTypes = {
  className: _propTypes2.default.string,
  previousIcon: _propTypes2.default.element,
  onPreviousClick: _propTypes2.default.func.isRequired,
  nextIcon: _propTypes2.default.element,
  onNextClick: _propTypes2.default.func.isRequired,
  onCalendarDateClick: _propTypes2.default.func.isRequired,
  calendarDate: _propTypes2.default.instanceOf(Date).isRequired,
  calendarTempDate: _propTypes2.default.instanceOf(Date).isRequired,
  DateTimeFormat: _propTypes2.default.func.isRequired,
  locales: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired,
  minDate: _propTypes2.default.instanceOf(Date),
  maxDate: _propTypes2.default.instanceOf(Date),

  /**
   * The first day of week: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
   */
  firstDayOfWeek: _propTypes2.default.oneOf([0, 1, 2, 3, 4, 5, 6]),

  /**
   * True if weekends are to be greyed out.
   */
  disableWeekEnds: _propTypes2.default.bool,

  /**
   * True if dates from adjacent months should be shown.
   */
  showAllDays: _propTypes2.default.bool,
  disableOuterDates: _propTypes2.default.bool,

  /**
   * An optional className to apply to a date in calendar.
   */
  dateClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to a date from an adjacent month.
   */
  outerDateClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to the title in calendar header.
   */
  titleClassName: _propTypes2.default.string,

  /**
   * The DateTimeFormat options to apply to format the title in calendar header.
   */
  titleFormat: _propTypes2.default.shape({
    era: _propTypes2.default.oneOf(['narrow', 'short', 'long']),
    year: _propTypes2.default.oneOf(['numeric', '2-digit']),
    month: _propTypes2.default.oneOf(['numeric', '2-digit', 'narrow', 'short', 'long'])
  }),

  /**
   * An optional className to apply to a weekday in calendar header.
   */
  weekdayClassName: _propTypes2.default.string,

  /**
   * The DateTimeFormat option to apply to format a weekday in calendar header.
   */
  weekdayFormat: _propTypes2.default.oneOf(['narrow', 'short', 'long'])
};
exports.default = DatePickerCalendar;
//# sourceMappingURL=DatePickerCalendar.js.map