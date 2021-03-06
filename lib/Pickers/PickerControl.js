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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `PickerControl` component is the button that goes in the header
 * of a `Picker` component. It is used to switch the view of the `Picker`
 * from state to state.
 *
 * For example, this is the year and date views for the `DatePicker`.
 */
var PickerControl = function (_PureComponent) {
  _inherits(PickerControl, _PureComponent);

  function PickerControl() {
    _classCallCheck(this, PickerControl);

    return _possibleConstructorReturn(this, (PickerControl.__proto__ || Object.getPrototypeOf(PickerControl)).apply(this, arguments));
  }

  _createClass(PickerControl, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          active = _props.active,
          props = _objectWithoutProperties(_props, ['className', 'active']);

      return _react2.default.createElement('button', _extends({}, props, {
        type: 'button',
        className: (0, _classnames2.default)('md-btn md-pointer--hover md-picker-control md-picker-text', {
          'md-picker-text--active': active
        }, className)
      }));
    }
  }]);

  return PickerControl;
}(_react.PureComponent);

PickerControl.propTypes = {
  className: _propTypes2.default.string,
  active: _propTypes2.default.bool.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node.isRequired
};
exports.default = PickerControl;
//# sourceMappingURL=PickerControl.js.map