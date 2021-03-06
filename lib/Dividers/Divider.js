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
 * The divider component will pass all other props such as style or
 * event listeners on to the component.
 */
var Divider = function (_PureComponent) {
  _inherits(Divider, _PureComponent);

  function Divider() {
    _classCallCheck(this, Divider);

    return _possibleConstructorReturn(this, (Divider.__proto__ || Object.getPrototypeOf(Divider)).apply(this, arguments));
  }

  _createClass(Divider, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          inset = _props.inset,
          vertical = _props.vertical,
          props = _objectWithoutProperties(_props, ['className', 'inset', 'vertical']);

      var Component = vertical ? 'div' : 'hr';

      return _react2.default.createElement(Component, _extends({}, props, {
        className: (0, _classnames2.default)('md-divider', {
          'md-divider--vertical': vertical,
          'md-divider--inset': inset
        }, className)
      }));
    }
  }]);

  return Divider;
}(_react.PureComponent);

Divider.propTypes = {
  /*
   * An optional style to apply to the divider.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the divider.
   */
  className: _propTypes2.default.string,

  /**
   * Boolean if this divider should be inset relative to it's container
   * component. This means that if it is in a `List` with `Avatar`, it
   * will start the divider  to the left of the main text in the list.
   */
  inset: _propTypes2.default.bool,

  /**
   * Boolean if the divider should be vertical instead of horizontal.
   */
  vertical: _propTypes2.default.bool
};
exports.default = Divider;
//# sourceMappingURL=Divider.js.map