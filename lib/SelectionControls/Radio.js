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

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _getDeprecatedIcon = require('../FontIcons/getDeprecatedIcon');

var _getDeprecatedIcon2 = _interopRequireDefault(_getDeprecatedIcon);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _SelectionControl = require('./SelectionControl');

var _SelectionControl2 = _interopRequireDefault(_SelectionControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `Radio` component is used for the selection of a single option from a set. Unfortunately
 * the `Radio` component must always be controlled because of the `FontIcon` toggles and how
 * the `radio` input type works. It is recommended to use the `SelectionControlGroup` component
 * to manage the `radio`.
 */
var Radio = function (_PureComponent) {
  _inherits(Radio, _PureComponent);

  function Radio() {
    _classCallCheck(this, Radio);

    return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
  }

  _createClass(Radio, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          checkedIcon = _props.checkedIcon,
          uncheckedIcon = _props.uncheckedIcon,
          checkedIconChildren = _props.checkedIconChildren,
          checkedIconClassName = _props.checkedIconClassName,
          uncheckedIconChildren = _props.uncheckedIconChildren,
          uncheckedIconClassName = _props.uncheckedIconClassName,
          props = _objectWithoutProperties(_props, ['checkedIcon', 'uncheckedIcon', 'checkedIconChildren', 'checkedIconClassName', 'uncheckedIconChildren', 'uncheckedIconClassName']);

      var checked = (0, _getDeprecatedIcon2.default)(checkedIconClassName, checkedIconChildren, checkedIcon);
      var unchecked = (0, _getDeprecatedIcon2.default)(uncheckedIconClassName, uncheckedIconChildren, uncheckedIcon);

      return _react2.default.createElement(_SelectionControl2.default, _extends({
        type: 'radio',
        checkedCheckboxIcon: checked,
        uncheckedCheckboxIcon: unchecked,
        __superSecreteProp: true
      }, props));
    }
  }]);

  return Radio;
}(_react.PureComponent);

Radio.propTypes = {
  /**
   * An id to use with the radio. This is used for accessibility and so that the label
   * triggers the radio toggle.
   */
  id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),

  /**
   * An optional style to apply to the radio's container.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the radio's container.
   */
  className: _propTypes2.default.string,

  /**
   * A label to display with the radio. This is required for accessibility and triggering
   * the toggle.
   */
  label: _propTypes2.default.node.isRequired,

  /**
   * Boolean if the label should appear before the radio icon.
   */
  labelBefore: _propTypes2.default.bool,

  /**
   * A name to use for the `Radio`. This is required for accessibility.
   */
  name: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

  /**
   * Boolean if the `Radio` is disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * A function to call when the `Radio` triggers the `change` event. The `onChange` callback
   * will include the current value of the checked `radio` and the change event.
   *
   * ```js
   * onChange(changeEvent.target.value, changeEvent);
   * ```
   */
  onChange: _propTypes2.default.func,

  /**
   * The value for the `Radio` component.
   */
  value: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.string]).isRequired,

  /**
   * A boolean if the `Radio` is currently checked.
   */
  checked: _propTypes2.default.bool.isRequired,

  /**
   * Boolean if the `Radio` should be displayed inline.
   */
  inline: _propTypes2.default.bool,

  /**
   * The icon to display when the radio is checked/selected.
   */
  checkedIcon: _propTypes2.default.node.isRequired,

  /**
   * The icon to display when the radio is not checked/selected.
   */
  uncheckedIcon: _propTypes2.default.node.isRequired,
  checkedIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use `checkedIcon` instead'),
  checkedIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `checkedIcon` instead'),
  uncheckedIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use `uncheckedIcon` instead'),
  uncheckedIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `uncheckedIcon` instead')
};
Radio.defaultProps = {
  checkedIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'radio_button_checked'
  ),
  uncheckedIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'radio_button_unchecked'
  )
};
exports.default = Radio;
//# sourceMappingURL=Radio.js.map