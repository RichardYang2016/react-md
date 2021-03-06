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

var _DialogFooter = require('../Dialogs/DialogFooter');

var _DialogFooter2 = _interopRequireDefault(_DialogFooter);

var _DatePickerHeader = require('./DatePickerHeader');

var _DatePickerHeader2 = _interopRequireDefault(_DatePickerHeader);

var _DatePickerCalendar = require('./DatePickerCalendar');

var _DatePickerCalendar2 = _interopRequireDefault(_DatePickerCalendar);

var _YearPicker = require('./YearPicker');

var _YearPicker2 = _interopRequireDefault(_YearPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = function (_PureComponent) {
  _inherits(DatePicker, _PureComponent);

  function DatePicker() {
    _classCallCheck(this, DatePicker);

    return _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).apply(this, arguments));
  }

  _createClass(DatePicker, [{
    key: 'render',
    value: function render() {
      var _cn;

      var _props = this.props,
          okLabel = _props.okLabel,
          okPrimary = _props.okPrimary,
          onOkClick = _props.onOkClick,
          cancelLabel = _props.cancelLabel,
          cancelPrimary = _props.cancelPrimary,
          onCancelClick = _props.onCancelClick,
          DateTimeFormat = _props.DateTimeFormat,
          locales = _props.locales,
          calendarTempDate = _props.calendarTempDate,
          calendarMode = _props.calendarMode,
          changeCalendarMode = _props.changeCalendarMode,
          style = _props.style,
          className = _props.className,
          inline = _props.inline,
          icon = _props.icon,
          displayMode = _props.displayMode,
          firstDayOfWeek = _props.firstDayOfWeek,
          disableWeekEnds = _props.disableWeekEnds,
          showAllDays = _props.showAllDays,
          disableOuterDates = _props.disableOuterDates,
          headerClassName = _props.headerClassName,
          contentClassName = _props.contentClassName,
          footerClassName = _props.footerClassName,
          calendarClassName = _props.calendarClassName,
          yearPickerClassName = _props.yearPickerClassName,
          calendarDateClassName = _props.calendarDateClassName,
          calendarOuterDateClassName = _props.calendarOuterDateClassName,
          calendarTitleClassName = _props.calendarTitleClassName,
          calendarTitleFormat = _props.calendarTitleFormat,
          calendarWeekdayClassName = _props.calendarWeekdayClassName,
          calendarWeekdayFormat = _props.calendarWeekdayFormat,
          props = _objectWithoutProperties(_props, ['okLabel', 'okPrimary', 'onOkClick', 'cancelLabel', 'cancelPrimary', 'onCancelClick', 'DateTimeFormat', 'locales', 'calendarTempDate', 'calendarMode', 'changeCalendarMode', 'style', 'className', 'inline', 'icon', 'displayMode', 'firstDayOfWeek', 'disableWeekEnds', 'showAllDays', 'disableOuterDates', 'headerClassName', 'contentClassName', 'footerClassName', 'calendarClassName', 'yearPickerClassName', 'calendarDateClassName', 'calendarOuterDateClassName', 'calendarTitleClassName', 'calendarTitleFormat', 'calendarWeekdayClassName', 'calendarWeekdayFormat']);

      var picker = void 0;
      if (calendarMode === 'calendar') {
        picker = _react2.default.createElement(_DatePickerCalendar2.default, _extends({}, props, {
          key: 'calendar',
          className: calendarClassName,
          calendarTempDate: calendarTempDate,
          DateTimeFormat: DateTimeFormat,
          locales: locales,
          firstDayOfWeek: firstDayOfWeek,
          disableWeekEnds: disableWeekEnds,
          showAllDays: showAllDays,
          disableOuterDates: disableOuterDates,
          dateClassName: calendarDateClassName,
          outerDateClassName: calendarOuterDateClassName,
          titleClassName: calendarTitleClassName,
          titleFormat: calendarTitleFormat,
          weekdayClassName: calendarWeekdayClassName,
          weekdayFormat: calendarWeekdayFormat
        }));
      } else {
        picker = _react2.default.createElement(_YearPicker2.default, _extends({}, props, {
          key: 'year',
          className: yearPickerClassName,
          calendarTempDate: calendarTempDate,
          DateTimeFormat: DateTimeFormat,
          locales: locales
        }));
      }

      var actions = [{
        key: 'cancel',
        onClick: onCancelClick,
        primary: cancelPrimary,
        secondary: !cancelPrimary,
        label: cancelLabel
      }, {
        key: 'ok',
        onClick: onOkClick,
        primary: okPrimary,
        secondary: !okPrimary,
        label: okLabel
      }];

      return _react2.default.createElement(
        'div',
        {
          style: style,
          className: (0, _classnames2.default)('md-picker md-picker--date', (_cn = {}, _defineProperty(_cn, 'md-picker--' + displayMode, displayMode), _defineProperty(_cn, 'md-picker--inline', inline), _defineProperty(_cn, 'md-picker--inline-icon', inline && icon), _cn), className)
        },
        _react2.default.createElement(_DatePickerHeader2.default, {
          className: headerClassName,
          DateTimeFormat: DateTimeFormat,
          locales: locales,
          calendarTempDate: calendarTempDate,
          calendarMode: calendarMode,
          changeCalendarMode: changeCalendarMode
        }),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('md-picker-content-container', contentClassName) },
          picker,
          _react2.default.createElement(_DialogFooter2.default, {
            className: footerClassName,
            actions: actions
          })
        )
      );
    }
  }]);

  return DatePicker;
}(_react.PureComponent);

DatePicker.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  okLabel: _propTypes2.default.node.isRequired,
  okPrimary: _propTypes2.default.bool.isRequired,
  onOkClick: _propTypes2.default.func.isRequired,
  cancelLabel: _propTypes2.default.node.isRequired,
  cancelPrimary: _propTypes2.default.bool.isRequired,
  onCancelClick: _propTypes2.default.func.isRequired,
  DateTimeFormat: _propTypes2.default.func.isRequired,
  locales: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired,
  calendarDate: _propTypes2.default.instanceOf(Date).isRequired,
  calendarTempDate: _propTypes2.default.instanceOf(Date).isRequired,
  calendarMode: _propTypes2.default.oneOf(['calendar', 'year']).isRequired,
  changeCalendarMode: _propTypes2.default.func.isRequired,
  icon: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  displayMode: _propTypes2.default.oneOf(['landscape', 'portrait']),

  /**
   * The first day of week: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
   */
  firstDayOfWeek: _propTypes2.default.oneOf([0, 1, 2, 3, 4, 5, 6]),

  /**
   * True if weekends are to be greyed out.
   */
  disableWeekEnds: _propTypes2.default.bool,

  /**
   * True if dates from adjacent months should be shown in calendar.
   */
  showAllDays: _propTypes2.default.bool,
  disableOuterDates: _propTypes2.default.bool,

  /**
   * An optional className to apply to the header of date picker.
   */
  headerClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to the content container of date picker.
   */
  contentClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to the footer of date picker.
   */
  footerClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to the calendar container of date picker.
   */
  calendarClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to the year picker of date picker.
   */
  yearPickerClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to a date in calendar.
   */
  calendarDateClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to a date from an adjacent month in calendar.
   */
  calendarOuterDateClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to the title in calendar header.
   */
  calendarTitleClassName: _propTypes2.default.string,

  /**
   * The DateTimeFormat options to apply to format the title in calendar header.
   */
  calendarTitleFormat: _propTypes2.default.shape({
    era: _propTypes2.default.oneOf(['narrow', 'short', 'long']),
    year: _propTypes2.default.oneOf(['numeric', '2-digit']),
    month: _propTypes2.default.oneOf(['numeric', '2-digit', 'narrow', 'short', 'long'])
  }),

  /**
   * An optional className to apply to a weekday in calendar header.
   */
  calendarWeekdayClassName: _propTypes2.default.string,

  /**
   * The DateTimeFormat option to apply to format a weekday in calendar header.
   */
  calendarWeekdayFormat: _propTypes2.default.oneOf(['narrow', 'short', 'long'])
};
exports.default = DatePicker;
//# sourceMappingURL=DatePicker.js.map