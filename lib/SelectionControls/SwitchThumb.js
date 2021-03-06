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

var _AccessibleFakeInkedButton = require('../Helpers/AccessibleFakeInkedButton');

var _AccessibleFakeInkedButton2 = _interopRequireDefault(_AccessibleFakeInkedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DISABLED_INTERACTIONS = ['mouse'];

/**
 * This is the `Thumb` for the switch. The `ink` in the Thumb is only active on touch and keyboard
 * interactions, so the `AccessibleFakeInkButton` does not work for this case.
 *
 * This component really just is used for custom inkage.
 */

var SwitchThumb = function (_PureComponent) {
  _inherits(SwitchThumb, _PureComponent);

  function SwitchThumb() {
    _classCallCheck(this, SwitchThumb);

    return _possibleConstructorReturn(this, (SwitchThumb.__proto__ || Object.getPrototypeOf(SwitchThumb)).apply(this, arguments));
  }

  _createClass(SwitchThumb, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          disabled = _props.disabled,
          checked = _props.checked,
          className = _props.className,
          disabledInteractions = _props.disabledInteractions,
          props = _objectWithoutProperties(_props, ['disabled', 'checked', 'className', 'disabledInteractions']);

      return _react2.default.createElement(_AccessibleFakeInkedButton2.default, _extends({}, props, {
        disabled: disabled,
        disabledInteractions: disabledInteractions || DISABLED_INTERACTIONS,
        inkContainerClassName: 'md-ink-container--2x',
        className: (0, _classnames2.default)('md-switch-thumb', {
          'md-switch-thumb--disabled': disabled,
          'md-switch-thumb--on': checked,
          'md-switch-thumb--off': !checked
        }, className)
      }));
    }
  }]);

  return SwitchThumb;
}(_react.PureComponent);

SwitchThumb.propTypes = {
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  checked: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  disabledInteractions: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['keyboard', 'touch', 'mouse']))
};
exports.default = SwitchThumb;
//# sourceMappingURL=SwitchThumb.js.map