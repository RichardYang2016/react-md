'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _addHours = require('../utils/DateUtils/addHours');

var _addHours2 = _interopRequireDefault(_addHours);

var _PickerControl = require('./PickerControl');

var _PickerControl2 = _interopRequireDefault(_PickerControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This component displays a section for switching between the AM
 * and PM time periods.
 */
var TimePeriods = function (_PureComponent) {
  _inherits(TimePeriods, _PureComponent);

  function TimePeriods() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TimePeriods);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimePeriods.__proto__ || Object.getPrototypeOf(TimePeriods)).call.apply(_ref, [this].concat(args))), _this), _this._setAM = function () {
      if (_this.props.timePeriod !== 'AM') {
        _this.props.setTempTime((0, _addHours2.default)(_this.props.tempTime, -12));
      }
    }, _this._setPM = function () {
      if (_this.props.timePeriod !== 'PM') {
        _this.props.setTempTime((0, _addHours2.default)(_this.props.tempTime, 12));
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TimePeriods, [{
    key: 'render',
    value: function render() {
      var timePeriod = this.props.timePeriod;

      return _react2.default.createElement(
        'div',
        { className: 'md-time-periods' },
        _react2.default.createElement(
          _PickerControl2.default,
          { onClick: this._setAM, active: timePeriod === 'AM' },
          _react2.default.createElement(
            'h6',
            { className: 'md-time-period' },
            'AM'
          )
        ),
        _react2.default.createElement(
          _PickerControl2.default,
          { onClick: this._setPM, active: timePeriod === 'PM' },
          _react2.default.createElement(
            'h6',
            { className: 'md-time-period' },
            'PM'
          )
        )
      );
    }
  }]);

  return TimePeriods;
}(_react.PureComponent);

TimePeriods.propTypes = {
  /**
   * The current time for the time picker.
   */
  tempTime: _propTypes2.default.instanceOf(Date).isRequired,

  /**
   * A function to update the time for the time picker.
   */
  setTempTime: _propTypes2.default.func.isRequired,

  /**
   * The current time period.
   */
  timePeriod: _propTypes2.default.string.isRequired
};
exports.default = TimePeriods;
//# sourceMappingURL=TimePeriods.js.map