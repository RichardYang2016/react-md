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

var _isMonthBefore = require('../utils/dates/isMonthBefore');

var _isMonthBefore2 = _interopRequireDefault(_isMonthBefore);

var _toDayOfWeek = require('../utils/dates/toDayOfWeek');

var _toDayOfWeek2 = _interopRequireDefault(_toDayOfWeek);

var _addDate = require('../utils/dates/addDate');

var _addDate2 = _interopRequireDefault(_addDate);

var _Button = require('../Buttons/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This component renders the controls for a `DatePicker`'s Calendar.
 * This will render a next and previous month button along with the
 * current month/year. It also renders the abbreviiations for the days
 * of the week.
 */
var CalendarHeader = function (_PureComponent) {
  _inherits(CalendarHeader, _PureComponent);

  function CalendarHeader(props) {
    _classCallCheck(this, CalendarHeader);

    var _this = _possibleConstructorReturn(this, (CalendarHeader.__proto__ || Object.getPrototypeOf(CalendarHeader)).call(this, props));

    _this.state = _this._createState(props);
    return _this;
  }

  _createClass(CalendarHeader, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          DateTimeFormat = _props.DateTimeFormat,
          locales = _props.locales,
          date = _props.date;

      if (DateTimeFormat !== nextProps.DateTimeFormat || locales !== nextProps.locales || date !== nextProps.date) {
        this.setState(this._createState(nextProps));
      }
    }
  }, {
    key: '_createState',
    value: function _createState() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props,
          DateTimeFormat = _ref.DateTimeFormat,
          locales = _ref.locales,
          date = _ref.date,
          firstDayOfWeek = _ref.firstDayOfWeek,
          titleFormat = _ref.titleFormat,
          weekdayClassName = _ref.weekdayClassName,
          weekdayFormat = _ref.weekdayFormat;

      var firstDay = (0, _toDayOfWeek2.default)(date, firstDayOfWeek);
      var formatter = new DateTimeFormat(locales, { weekday: weekdayFormat });
      var dows = [];
      for (var i = 0; i < 7; i++) {
        var dow = formatter.format((0, _addDate2.default)(firstDay, i, 'D'));
        dows.push(_react2.default.createElement(
          'h4',
          {
            key: i,
            className: (0, _classnames2.default)('md-calendar-date md-calendar-dow', (0, _themeColors2.default)({ disabled: true }), weekdayClassName)
          },
          dow
        ));
      }

      return {
        dows: dows,
        title: new DateTimeFormat(locales, titleFormat).format(date)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          dows = _state.dows,
          title = _state.title;
      var _props2 = this.props,
          date = _props2.date,
          minDate = _props2.minDate,
          maxDate = _props2.maxDate,
          onPreviousClick = _props2.onPreviousClick,
          previousIcon = _props2.previousIcon,
          onNextClick = _props2.onNextClick,
          nextIcon = _props2.nextIcon,
          titleClassName = _props2.titleClassName;


      var isPreviousDisabled = (0, _isMonthBefore2.default)(minDate, date);
      var isNextDisabled = (0, _isMonthBefore2.default)(date, maxDate);
      return _react2.default.createElement(
        'header',
        { className: 'md-calendar-header' },
        _react2.default.createElement(
          'div',
          { className: 'md-calendar-controls' },
          _react2.default.createElement(_Button2.default, {
            icon: true,
            onClick: onPreviousClick,
            disabled: isPreviousDisabled,
            className: 'md-calendar-control',
            iconEl: previousIcon
          }),
          _react2.default.createElement(
            'h4',
            { className: (0, _classnames2.default)('md-title', titleClassName) },
            title
          ),
          _react2.default.createElement(_Button2.default, {
            icon: true,
            onClick: onNextClick,
            disabled: isNextDisabled,
            className: 'md-calendar-control',
            iconEl: nextIcon
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'md-calendar-dows' },
          dows
        )
      );
    }
  }]);

  return CalendarHeader;
}(_react.PureComponent);

CalendarHeader.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  date: _propTypes2.default.instanceOf(Date).isRequired,
  minDate: _propTypes2.default.instanceOf(Date),
  maxDate: _propTypes2.default.instanceOf(Date),
  previousIcon: _propTypes2.default.element,
  onPreviousClick: _propTypes2.default.func.isRequired,
  nextIcon: _propTypes2.default.node,
  onNextClick: _propTypes2.default.func.isRequired,
  DateTimeFormat: _propTypes2.default.func.isRequired,
  locales: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired,
  /**
   * The first day of week: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
   */
  firstDayOfWeek: _propTypes2.default.oneOf([0, 1, 2, 3, 4, 5, 6]),
  /**
   * An optional className to apply to the title.
   */
  titleClassName: _propTypes2.default.string,
  /**
   * The DateTimeFormat options to apply to format the title.
   */
  titleFormat: _propTypes2.default.shape({
    era: _propTypes2.default.oneOf(['narrow', 'short', 'long']),
    year: _propTypes2.default.oneOf(['numeric', '2-digit']),
    month: _propTypes2.default.oneOf(['numeric', '2-digit', 'narrow', 'short', 'long'])
  }),
  /**
   * An optional className to apply to a weekday.
   */
  weekdayClassName: _propTypes2.default.string,
  /**
   * The DateTimeFormat option to apply to format a weekday.
   */
  weekdayFormat: _propTypes2.default.oneOf(['narrow', 'short', 'long'])
};
CalendarHeader.defaultProps = {
  firstDayOfWeek: 0,
  titleFormat: { month: 'long', year: 'numeric' },
  weekdayFormat: 'narrow'
};
exports.default = CalendarHeader;
//# sourceMappingURL=CalendarHeader.js.map