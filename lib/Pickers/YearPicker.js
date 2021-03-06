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

var _Year = require('./Year');

var _Year2 = _interopRequireDefault(_Year);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `YearPicker` component is the Year view in a `DatePicker`. This
 * will display a list of years to select from within the given range.
 */
var YearPicker = function (_PureComponent) {
  _inherits(YearPicker, _PureComponent);

  function YearPicker(props) {
    _classCallCheck(this, YearPicker);

    var _this = _possibleConstructorReturn(this, (YearPicker.__proto__ || Object.getPrototypeOf(YearPicker)).call(this, props));

    _this.state = _this._getYearRange(props);
    return _this;
  }

  _createClass(YearPicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.yearsDisplayed !== nextProps.yearsDisplayed) {
        this.setState(this._getFullYear(nextProps));
      }
    }

    /**
     * Gets the current start and end years for the year picker.
     *
     * @param {Object} props - The current props to extract the year range from.
     * @return {Object} an object containign the start and end years
     */

  }, {
    key: '_getYearRange',
    value: function _getYearRange(_ref) {
      var minDate = _ref.minDate,
          maxDate = _ref.maxDate,
          yearsDisplayed = _ref.yearsDisplayed,
          calendarTempDate = _ref.calendarTempDate;

      var year = calendarTempDate.getFullYear();
      var range = !minDate && !maxDate ? parseInt(yearsDisplayed / 2, 10) : yearsDisplayed;

      var startYear = void 0;
      var endYear = void 0;
      if (minDate && maxDate) {
        startYear = minDate.getFullYear();
        endYear = maxDate.getFullYear();
      } else if (!minDate && !maxDate) {
        startYear = year - range;
        endYear = year + range;
        if (yearsDisplayed % 2 === 0) {
          endYear -= 1;
        }
      } else if (!maxDate) {
        startYear = minDate.getFullYear();
        endYear = startYear + yearsDisplayed - 1;
      } else {
        endYear = maxDate.getFullYear();
        startYear = endYear - yearsDisplayed + 1;
      }

      return { startYear: startYear, endYear: endYear };
    }
  }, {
    key: '_setContainer',
    value: function _setContainer(container) {
      if (container === null) {
        return;
      }

      var offsetHeight = container.offsetHeight,
          offsetWidth = container.offsetWidth;

      var _container$querySelec = container.querySelector('.md-year--active'),
          top = _container$querySelec.offsetTop,
          height = _container$querySelec.offsetHeight;

      // Portrait seems to be 3/4 of the way while landscape is about 1/2


      if (offsetHeight > offsetWidth) {
        container.scrollTop = top - offsetHeight * 3 / 4;
      } else {
        container.scrollTop = top - offsetHeight / 2 + height / 2;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          startYear = _state.startYear,
          endYear = _state.endYear;


      var currentYear = this.props.calendarTempDate.getFullYear();
      var years = [];
      for (var year = startYear; year <= endYear; year++) {
        years.push(_react2.default.createElement(_Year2.default, {
          key: year,
          year: year,
          active: year === currentYear,
          onClick: this.props.onCalendarYearClick
        }));
      }

      return _react2.default.createElement(
        'section',
        {
          className: (0, _classnames2.default)('md-picker-content md-picker-content--year', this.props.className),
          ref: this._setContainer
        },
        _react2.default.createElement(
          'ol',
          { className: 'md-years' },
          years
        )
      );
    }
  }]);

  return YearPicker;
}(_react.PureComponent);

YearPicker.propTypes = {
  className: _propTypes2.default.string,
  calendarTempDate: _propTypes2.default.instanceOf(Date).isRequired,
  onCalendarYearClick: _propTypes2.default.func.isRequired,
  yearsDisplayed: _propTypes2.default.number.isRequired,
  minDate: _propTypes2.default.instanceOf(Date),
  maxDate: _propTypes2.default.instanceOf(Date)
};
exports.default = YearPicker;
//# sourceMappingURL=YearPicker.js.map