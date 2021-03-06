'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TimePeriods = require('./TimePeriods');

var _TimePeriods2 = _interopRequireDefault(_TimePeriods);

var _PickerControl = require('./PickerControl');

var _PickerControl2 = _interopRequireDefault(_PickerControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `TimePickerHeader` component is used for rendering the
 * current time for the `TimePicker` as well as switching between
 * the different views for the time picker.
 */
var TimePickerHeader = function (_PureComponent) {
  _inherits(TimePickerHeader, _PureComponent);

  function TimePickerHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TimePickerHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimePickerHeader.__proto__ || Object.getPrototypeOf(TimePickerHeader)).call.apply(_ref, [this].concat(args))), _this), _this._setHour = function () {
      _this.props.setTimeMode('hour');
    }, _this._setMinute = function () {
      _this.props.setTimeMode('minute');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TimePickerHeader, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          timeMode = _props.timeMode,
          hours = _props.hours,
          minutes = _props.minutes,
          timePeriod = _props.timePeriod,
          setTempTime = _props.setTempTime,
          tempTime = _props.tempTime;

      var timePeriods = void 0;
      if (timePeriod) {
        timePeriods = _react2.default.createElement(_TimePeriods2.default, { tempTime: tempTime, setTempTime: setTempTime, timePeriod: timePeriod });
      }

      return _react2.default.createElement(
        'header',
        { className: 'md-picker-header md-text-right' },
        _react2.default.createElement(
          _PickerControl2.default,
          { onClick: this._setHour, active: timeMode === 'hour' },
          _react2.default.createElement(
            'h4',
            { className: 'md-display-3' },
            hours
          )
        ),
        _react2.default.createElement(
          _PickerControl2.default,
          { onClick: this._setMinute, active: timeMode === 'minute' },
          _react2.default.createElement(
            'h4',
            { className: 'md-display-3' },
            minutes
          )
        ),
        timePeriods
      );
    }
  }]);

  return TimePickerHeader;
}(_react.PureComponent);

TimePickerHeader.propTypes = {
  /**
   * The current time of the time picker.
   */
  tempTime: _propTypes2.default.instanceOf(Date).isRequired,

  /**
   * The current time type that is being changed.
   */
  timeMode: _propTypes2.default.oneOf(['hour', 'minute']).isRequired,

  /**
   * A function to update the time mode.
   */
  setTimeMode: _propTypes2.default.func.isRequired,

  /**
   * A function to update the time for the time picker.
   */
  setTempTime: _propTypes2.default.func.isRequired,

  /**
   * A formatted hours string for the user's locale. This
   * would be '3' for en-US if the time was '3:15'
   */
  hours: _propTypes2.default.string.isRequired,

  /**
   * A formatted minutes string for the user's locale.
   * This would be ':15' for en-US if the time was '3:15'.
   */
  minutes: _propTypes2.default.string.isRequired,

  /**
   * An optional time period to use for locales that use
   * 12 hour clocks and AM/PM.
   */
  timePeriod: _propTypes2.default.string
};
exports.default = TimePickerHeader;
//# sourceMappingURL=TimePickerHeader.js.map