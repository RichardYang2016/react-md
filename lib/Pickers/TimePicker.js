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

var _ClockFace = require('./ClockFace');

var _ClockFace2 = _interopRequireDefault(_ClockFace);

var _DialogFooter = require('../Dialogs/DialogFooter');

var _DialogFooter2 = _interopRequireDefault(_DialogFooter);

var _TimePickerHeader = require('./TimePickerHeader');

var _TimePickerHeader2 = _interopRequireDefault(_TimePickerHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `TimePicker` component is used to display a time picker
 * in the `TimePickerContainer` component.
 */
var TimePicker = function (_PureComponent) {
  _inherits(TimePicker, _PureComponent);

  function TimePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TimePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call.apply(_ref, [this].concat(args))), _this), _this._updateTime = function (newTime) {
      var timePart = newTime;
      var _this$props = _this.props,
          tempTime = _this$props.tempTime,
          setTempTime = _this$props.setTempTime,
          timeMode = _this$props.timeMode,
          timePeriod = _this$props.timePeriod;

      var time = new Date(tempTime);
      if (timeMode === 'hour') {
        var isAM = timePeriod === 'AM';
        var is12 = timePart === 12;
        if (timePeriod && isAM && is12) {
          timePart = 0;
        } else if (timePeriod && !isAM && !is12) {
          timePart += 12;
        }

        time.setHours(timePart);
      } else {
        time.setMinutes(timePart);
      }

      setTempTime(time);
    }, _this._handleTimeChosen = function () {
      var _this$props2 = _this.props,
          hoverMode = _this$props2.hoverMode,
          setTimeMode = _this$props2.setTimeMode,
          onOkClick = _this$props2.onOkClick,
          timeMode = _this$props2.timeMode;


      if (hoverMode) {
        if (timeMode === 'hour') {
          setTimeMode('minute');
        } else {
          onOkClick();
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Takes in the new time (number o'clock or minutes), updates the temp time
   * with that new time, and then calls the setTempTime prop.
   */


  _createClass(TimePicker, [{
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
          style = _props.style,
          className = _props.className,
          setTimeMode = _props.setTimeMode,
          setTempTime = _props.setTempTime,
          timeMode = _props.timeMode,
          tempTime = _props.tempTime,
          hours = _props.hours,
          minutes = _props.minutes,
          timePeriod = _props.timePeriod,
          displayMode = _props.displayMode,
          inline = _props.inline,
          icon = _props.icon,
          hoverMode = _props.hoverMode;


      var hoursInt = parseInt(hours, 10);
      var minutesInt = parseInt(minutes.replace(/[^0-9]/g, ''), 10);
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
          className: (0, _classnames2.default)('md-picker md-picker--time', (_cn = {}, _defineProperty(_cn, 'md-picker--' + displayMode, displayMode), _defineProperty(_cn, 'md-picker--inline', inline), _defineProperty(_cn, 'md-picker--inline-icon', inline && icon), _cn), className)
        },
        _react2.default.createElement(_TimePickerHeader2.default, {
          tempTime: tempTime,
          timeMode: timeMode,
          setTimeMode: setTimeMode,
          setTempTime: setTempTime,
          hours: hours,
          minutes: minutes,
          timePeriod: timePeriod
        }),
        _react2.default.createElement(
          'div',
          { className: 'md-picker-content-container' },
          _react2.default.createElement(
            'div',
            { className: 'md-picker-content md-picker-content--clock' },
            _react2.default.createElement(_ClockFace2.default, {
              time: timeMode === 'hour' ? hoursInt : minutesInt,
              minutes: timeMode === 'minute',
              onChange: this._updateTime,
              timePeriod: timePeriod,
              hoverMode: hoverMode,
              onTimeChosen: this._handleTimeChosen
            })
          ),
          _react2.default.createElement(_DialogFooter2.default, { actions: actions })
        )
      );
    }
  }]);

  return TimePicker;
}(_react.PureComponent);

TimePicker.propTypes = {
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
  icon: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  displayMode: _propTypes2.default.oneOf(['landscape', 'portrait']),

  /**
   * A function that will switch the state from hour to minute.
   */
  setTimeMode: _propTypes2.default.func.isRequired,

  /**
   * A function that will update the time for the TimePicker before
   * the user selects ok. This function will be given a new Date object
   * with a modified time.
   */
  setTempTime: _propTypes2.default.func.isRequired,

  /**
   * The current display mode of the time picker.
   */
  timeMode: _propTypes2.default.oneOf(['hour', 'minute']).isRequired,

  /**
   * The current time as a date object that is being displayed in the
   * time picker.
   */
  tempTime: _propTypes2.default.instanceOf(Date).isRequired,

  /**
   * A string that is a representation of the hours in the user's locale.
   */
  hours: _propTypes2.default.string.isRequired,

  /**
   * A string that is a representation of the minutes in the user's locale.
   * This will also include any separator the locale uses.
   *
   * Example: ':15' in '3:15 PM' for 'en-US'
   */
  minutes: _propTypes2.default.string.isRequired,

  /**
   * An optional time period if a user's locale uses it.
   */
  timePeriod: _propTypes2.default.string,

  /**
   * If true the hover mode of the Time Picker is activated.
   * In hover mode no clicks are required to start selecting an hour
   * and the timemode switches automatically when a time was chosen.
   * When a minute is selected the chosen time is applied automatically.
   */
  hoverMode: _propTypes2.default.bool
};
exports.default = TimePicker;
//# sourceMappingURL=TimePicker.js.map