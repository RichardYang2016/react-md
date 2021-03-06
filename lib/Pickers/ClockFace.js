'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isValidClick = require('../utils/EventUtils/isValidClick');

var _isValidClick2 = _interopRequireDefault(_isValidClick);

var _captureNextEvent = require('../utils/EventUtils/captureNextEvent');

var _captureNextEvent2 = _interopRequireDefault(_captureNextEvent);

var _touches = require('../utils/EventUtils/touches');

var _calcTimeFromPoint = require('../utils/NumberUtils/calcTimeFromPoint');

var _calcTimeFromPoint2 = _interopRequireDefault(_calcTimeFromPoint);

var _calcPageOffset = require('../utils/Positioning/calcPageOffset');

var _calcPageOffset2 = _interopRequireDefault(_calcPageOffset);

var _ResizeObserver = require('../Helpers/ResizeObserver');

var _ResizeObserver2 = _interopRequireDefault(_ResizeObserver);

var _ClockTime = require('./ClockTime');

var _ClockTime2 = _interopRequireDefault(_ClockTime);

var _ClockHand = require('./ClockHand');

var _ClockHand2 = _interopRequireDefault(_ClockHand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `ClockFace` component is used for rendering all the clock's times
 * and the clock hand.
 */
var ClockFace = function (_PureComponent) {
  _inherits(ClockFace, _PureComponent);

  function ClockFace(props) {
    _classCallCheck(this, ClockFace);

    var _this = _possibleConstructorReturn(this, (ClockFace.__proto__ || Object.getPrototypeOf(ClockFace)).call(this, props));

    _this._setFace = function (face) {
      _this._face = face;
      _this._setPositioning();
    };

    _this._setPositioning = function () {
      if (!_this._face) {
        return;
      }

      var radius = _this._face.offsetWidth / 2;
      var offset = (0, _calcPageOffset2.default)(_this._face);
      _this._center = { x: offset.left + radius, y: offset.top + radius };
      _this._left = offset.left;
      _this._top = offset.top;

      if (_this.state.radius !== radius) {
        _this.setState({ radius: radius });
      }
    };

    _this._handleMouseEnter = function () {
      var hoverMode = _this.props.hoverMode;


      if (hoverMode) {
        _this._enableMouseMoving();
      }
    };

    _this._handleMouseLeave = function () {
      var hoverMode = _this.props.hoverMode;


      if (hoverMode) {
        _this._disableMouseMoving();
      }
    };

    _this._handleMouseDown = function (e) {
      if (!(0, _isValidClick2.default)(e)) {
        return;
      }

      var hoverMode = _this.props.hoverMode;


      if (!hoverMode) {
        _this._enableMouseMoving();
      }
    };

    _this._handleMouseMove = function (e) {
      if (!_this.state.moving) {
        return;
      }

      e.preventDefault();
      _this._calcNewTime(e);
    };

    _this._handleMouseUp = function (e) {
      if (!(0, _isValidClick2.default)(e)) {
        return;
      }

      var _this$props = _this.props,
          onTimeChosen = _this$props.onTimeChosen,
          hoverMode = _this$props.hoverMode;


      if (_this._face) {
        if (_this._face.contains(e.target)) {
          onTimeChosen();
          _this._calcNewTime(e);
        } else {
          (0, _captureNextEvent2.default)('click');
        }
      }

      if (!hoverMode) {
        _this._disableMouseMoving();
      }
    };

    _this._handleTouchStart = function () {
      (0, _captureNextEvent2.default)('mousedown');

      (0, _touches.addTouchEvent)(window, 'move', _this._handleTouchMove);
      (0, _touches.addTouchEvent)(window, 'end', _this._handleTouchEnd);
      _this.setState({ moving: true });
    };

    _this._handleTouchMove = function (e) {
      if (!_this.state.moving) {
        return;
      }

      _this._calcNewTime(e);
    };

    _this._handleTouchEnd = function (e) {
      _this._calcNewTime(e);
      if (_this._face && !_this._face.contains(e.target)) {
        (0, _captureNextEvent2.default)('click');
      }

      (0, _touches.removeTouchEvent)(window, 'move', _this._handleTouchMove);
      (0, _touches.removeTouchEvent)(window, 'end', _this._handleTouchEnd);

      _this.setState({ moving: false });
    };

    _this._calcNewTime = function (e) {
      var _ref = e.changedTouches ? e.changedTouches[0] : e,
          x = _ref.pageX,
          y = _ref.pageY;

      var innerRadius = _this.state.radius - 48;
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          minutes = _this$props2.minutes,
          timePeriod = _this$props2.timePeriod;

      onChange((0, _calcTimeFromPoint2.default)({ x: x, y: y }, _this._center, innerRadius, minutes, timePeriod));
    };

    _this._enableMouseMoving = function () {
      window.addEventListener('mousemove', _this._handleMouseMove);
      window.addEventListener('mouseup', _this._handleMouseUp);

      _this.setState({ moving: true });
    };

    _this._disableMouseMoving = function () {
      window.removeEventListener('mousemove', _this._handleMouseMove);
      window.removeEventListener('mouseup', _this._handleMouseUp);

      _this.setState({ moving: false });
    };

    _this.state = { radius: 136, moving: false };
    _this._center = {};
    return _this;
  }

  _createClass(ClockFace, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this._handleMouseMove);
      window.removeEventListener('mouseup', this._handleMouseMove);

      (0, _touches.removeTouchEvent)(window, 'move', this._handleTouchMove);
      (0, _touches.removeTouchEvent)(window, 'end', this._handleTouchEnd);
      clearInterval(this.interval);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          time = _props.time,
          minutes = _props.minutes,
          timePeriod = _props.timePeriod,
          onChange = _props.onChange,
          hoverMode = _props.hoverMode;
      var radius = this.state.radius;

      var size = !minutes && !timePeriod ? 24 : 12;
      var times = Array.apply(null, new Array(size)).map(function (_, i) {
        var clockTime = i + 1;
        if (minutes) {
          clockTime = clockTime * 5 % 60;
        } else {
          clockTime %= 24;
        }

        return _react2.default.createElement(_ClockTime2.default, {
          key: 'time-' + i,
          index: i + 1,
          time: clockTime,
          active: clockTime === time,
          radius: radius,
          onKeyboardFocus: onChange
        });
      });

      return _react2.default.createElement(
        'div',
        {
          ref: this._setFace,
          className: 'md-clock-face md-block-centered md-pointer--hover',
          onMouseDown: this._handleMouseDown,
          onMouseEnter: hoverMode ? this._handleMouseEnter : undefined,
          onMouseLeave: hoverMode ? this._handleMouseLeave : undefined,
          onTouchStart: this._handleTouchStart
        },
        _react2.default.createElement(_ResizeObserver2.default, { watchHeight: true, onResize: this._setPositioning }),
        times,
        _react2.default.createElement(_ClockHand2.default, { time: time, coords: radius, minutes: minutes })
      );
    }
  }]);

  return ClockFace;
}(_react.PureComponent);

ClockFace.propTypes = {
  /**
   * The current time for the clock.
   */
  time: _propTypes2.default.number.isRequired,

  /**
   * Boolean if the clock is on the minutes view.
   */
  minutes: _propTypes2.default.bool.isRequired,

  /**
   * A function to call when a new time is selected. It gives the
   * new time value. If it is 12 o'clock, 0 will be given.
   */
  onChange: _propTypes2.default.func.isRequired,

  /**
   * An optional time period string. This should be either AM or PM
   * if the locale uses them.
   */
  timePeriod: _propTypes2.default.string,

  /**
   * If true the hover mode of the Time Picker is activated.
   * In hover mode no clicks are required to start selecting an hour
   * and the timemode switches automatically when a time was chosen.
   * When a minute is selected the chosen time is applied automatically.
   */
  hoverMode: _propTypes2.default.bool,

  onTimeChosen: _propTypes2.default.func.isRequired
};
exports.default = ClockFace;
//# sourceMappingURL=ClockFace.js.map