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

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _keyCodes = require('../constants/keyCodes');

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _themeColors = require('../utils/themeColors');

var _themeColors2 = _interopRequireDefault(_themeColors);

var _oneRequiredForA11y = require('../utils/PropTypes/oneRequiredForA11y');

var _oneRequiredForA11y2 = _interopRequireDefault(_oneRequiredForA11y);

var _capitalizeFirst = require('../utils/StringUtils/capitalizeFirst');

var _capitalizeFirst2 = _interopRequireDefault(_capitalizeFirst);

var _AccessibleFakeInkedButton = require('../Helpers/AccessibleFakeInkedButton');

var _AccessibleFakeInkedButton2 = _interopRequireDefault(_AccessibleFakeInkedButton);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _SwitchTrack = require('./SwitchTrack');

var _SwitchTrack2 = _interopRequireDefault(_SwitchTrack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Prevents a second warning from appearing when using the deprecated or a11y required
 * props by using the `__superSecretProp`.... So secret!
 */
function preventDouble(validator) {
  return function validate(props, propName) {
    for (var _len = arguments.length, others = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      others[_key - 2] = arguments[_key];
    }

    var err = validator.apply(undefined, [props, propName].concat(others));
    if (err && props.__superSecreteProp) {
      err = null;
    }

    return err;
  };
}

/**
 * The `SelectionControl` component is used to render any of the `Radio`, `Checkbox`, or `Switch`
 * selection control type. This component might eventually replace all three since they use this
 * anyways. I am not sure yet though.
 */

var SelectionControl = function (_PureComponent) {
  _inherits(SelectionControl, _PureComponent);

  function SelectionControl(props) {
    _classCallCheck(this, SelectionControl);

    var _this = _possibleConstructorReturn(this, (SelectionControl.__proto__ || Object.getPrototypeOf(SelectionControl)).call(this, props));

    _this._setInput = function (input) {
      _this._input = input;
    };

    _this._setControl = function (control) {
      _this._control = control;
    };

    _this._setContainer = function (container) {
      _this._container = container;
    };

    _this._getIcon = function () {
      var _this$props = _this.props,
          checkedIcon = _this$props.checkedIcon,
          uncheckedIcon = _this$props.uncheckedIcon,
          type = _this$props.type;

      var checked = (0, _getField2.default)(_this.props, _this.state, 'checked');
      if (checkedIcon || uncheckedIcon) {
        return checked ? checkedIcon : uncheckedIcon;
      }

      var prefix = (checked ? '' : 'un') + 'checked' + (0, _capitalizeFirst2.default)(type) + 'Icon';
      var iconClassName = _this.props[prefix + 'ClassName'];
      var children = _this.props[prefix + 'Children'];

      if (iconClassName || children) {
        return _react2.default.createElement(
          _FontIcon2.default,
          { iconClassName: iconClassName, inherit: true },
          children
        );
      }

      var icon = _this.props[prefix];
      return icon ? _react2.default.cloneElement(icon, { inherit: true }) : null;
    };

    _this._handleKeyDown = function (e) {
      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }

      var key = e.which || e.keyCode;
      if (key === _keyCodes.SPACE) {
        _this._input.click();
      }
    };

    _this._handleChange = function (e) {
      var _this$props2 = _this.props,
          type = _this$props2.type,
          onChange = _this$props2.onChange;

      var checked = !(0, _getField2.default)(_this.props, _this.state, 'checked');
      if (onChange) {
        onChange(type === 'radio' ? e.target.value : checked, e);
      }

      if (typeof _this.props.checked === 'undefined') {
        _this.setState({ checked: checked });
      }
    };

    _this.state = {};
    if (typeof props.checked === 'undefined') {
      _this.state.checked = !!props.defaultChecked;
    }
    return _this;
  }

  /**
   * Gets the current checked value from the selection control. This is used when you have
   * an uncontrolled selection control and simply need the checked state from a ref callback.
   *
   * @return {boolean} the checked state for the selection control.\
   */


  _createClass(SelectionControl, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          style = _props.style,
          className = _props.className,
          inline = _props.inline,
          type = _props.type,
          name = _props.name,
          value = _props.value,
          disabled = _props.disabled,
          labelBefore = _props.labelBefore,
          tabIndex = _props.tabIndex,
          inkDisabled = _props.inkDisabled,
          disabledInteractions = _props.disabledInteractions,
          ariaLabel = _props['aria-label'],
          ariaLabelledBy = _props['aria-labelledby'],
          propLabel = _props.label,
          propChildren = _props.checked,
          onChange = _props.onChange,
          tooltip = _props.tooltip,
          checkedCheckboxIcon = _props.checkedCheckboxIcon,
          uncheckedCheckboxIcon = _props.uncheckedCheckboxIcon,
          checkedRadioIcon = _props.checkedRadioIcon,
          uncheckedRadioIcon = _props.uncheckedRadioIcon,
          __superSecreteProp = _props.__superSecreteProp,
          checkedIcon = _props.checkedIcon,
          uncheckedIcon = _props.uncheckedIcon,
          checkedRadioIconChildren = _props.checkedRadioIconChildren,
          checkedRadioIconClassName = _props.checkedRadioIconClassName,
          uncheckedRadioIconChildren = _props.uncheckedRadioIconChildren,
          uncheckedRadioIconClassName = _props.uncheckedRadioIconClassName,
          checkedCheckboxIconChildren = _props.checkedCheckboxIconChildren,
          checkedCheckboxIconClassName = _props.checkedCheckboxIconClassName,
          uncheckedCheckboxIconChildren = _props.uncheckedCheckboxIconChildren,
          uncheckedCheckboxIconClassName = _props.uncheckedCheckboxIconClassName,
          props = _objectWithoutProperties(_props, ['id', 'style', 'className', 'inline', 'type', 'name', 'value', 'disabled', 'labelBefore', 'tabIndex', 'inkDisabled', 'disabledInteractions', 'aria-label', 'aria-labelledby', 'label', 'checked', 'onChange', 'tooltip', 'checkedCheckboxIcon', 'uncheckedCheckboxIcon', 'checkedRadioIcon', 'uncheckedRadioIcon', '__superSecreteProp', 'checkedIcon', 'uncheckedIcon', 'checkedRadioIconChildren', 'checkedRadioIconClassName', 'uncheckedRadioIconChildren', 'uncheckedRadioIconClassName', 'checkedCheckboxIconChildren', 'checkedCheckboxIconClassName', 'uncheckedCheckboxIconChildren', 'uncheckedCheckboxIconClassName']);

      var checked = (0, _getField2.default)(this.props, this.state, 'checked');
      var isSwitch = type === 'switch';
      var label = this.props.label && _react2.default.createElement(
        'span',
        null,
        this.props.label
      );

      var control = void 0;
      if (isSwitch) {
        control = _react2.default.createElement(_SwitchTrack2.default, { disabled: disabled, checked: checked });
      } else {
        control = _react2.default.createElement(
          _AccessibleFakeInkedButton2.default,
          {
            inkDisabled: inkDisabled,
            disabledInteractions: disabledInteractions,
            role: type,
            className: (0, _classnames2.default)('md-selection-control-toggle md-btn md-btn--icon', (0, _themeColors2.default)({
              disabled: disabled,
              hint: !checked,
              secondary: checked
            })),
            'aria-checked': checked,
            tabIndex: tabIndex,
            disabled: disabled
          },
          tooltip,
          this._getIcon()
        );
      }

      return _react2.default.createElement(
        'div',
        _extends({}, props, {
          style: style,
          className: (0, _classnames2.default)('md-selection-control-container', {
            'md-selection-control-container--inline': inline,
            'md-switch-container': isSwitch
          }, className),
          onKeyDown: this._handleKeyDown
        }),
        _react2.default.createElement('input', {
          ref: this._setInput,
          id: id,
          type: isSwitch ? 'checkbox' : type,
          checked: checked,
          onChange: this._handleChange,
          disabled: disabled,
          className: 'md-selection-control-input',
          name: name,
          value: value,
          'aria-hidden': true,
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabelledBy
        }),
        _react2.default.createElement(
          'label',
          {
            htmlFor: id,
            className: (0, _classnames2.default)('md-selection-control-label', {
              'md-pointer--hover': !disabled
            }, (0, _themeColors2.default)({ disabled: disabled, text: !disabled }))
          },
          labelBefore && label,
          control,
          !labelBefore && label
        )
      );
    }
  }, {
    key: 'checked',
    get: function get() {
      return (0, _getField2.default)(this.props, this.state, 'checked');
    }
  }]);

  return SelectionControl;
}(_react.PureComponent);

SelectionControl.propTypes = {
  /**
   * An id to use with the selection control. This is used for accessibility and so that the label
   * triggers the selection control toggle.
   */
  id: preventDouble((0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]))),

  /**
   * An optional label to apply to the checkbox when there is no visible label.
   */
  'aria-label': (0, _oneRequiredForA11y2.default)(_propTypes2.default.string, 'label', 'aria-labelledby'),

  /**
   * An optional id that points to a label for the selection control when there is no visible label.
   */
  'aria-labelledby': _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional style to apply to the selection control's container.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the selection control's container.
   */
  className: _propTypes2.default.string,

  /**
   * The type of selection control to render.
   */
  type: _propTypes2.default.oneOf(['checkbox', 'radio', 'switch']).isRequired,

  /**
   * A label to display with the selection control. This is required for accessibility and triggering
   * the toggle.
   */
  label: _propTypes2.default.node,

  /**
   * Boolean if the label should appear before the checkbox/radio icon or switch.
   */
  labelBefore: _propTypes2.default.bool,

  /**
   * A name to use for the `SelectionControl`. This is required for accessibility. If the `type`
   * is a `checkbox` and it is part of a group, it is recommended to make this a string ending
   * in `[]` so that the value can be found from `document.querySelector('input[name="someName[]"]').value`.
   */
  name: preventDouble((0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]))),

  /**
   * Boolean if the `Radio` is disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * A function to call when the `SelectionControl` triggers the `change` event. The `onChange`
   * callback will either include:
   * - the currently changed radio's value
   * - the next checked state for the `Switch` or `Checkbox`.
   *
   * as the first parameter followed by the change event.
   *
   * ```js
   * // Radio
   * onChange(changeEvent.target.value, changeEvent);
   *
   * // Checkbox or Switch
   * onChange(changeEvent.target.checked, changeEvent);
   * ```
   */
  onChange: _propTypes2.default.func,

  /**
   * An optional function to call when the `keydown` event is triggered.
   */
  onKeyDown: _propTypes2.default.func,

  /**
   * The value for the `SelectionControl`. It is not required for `Checkbox` and `Switch`,
   * but it is recommended.
   */
  value: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.string]),

  /**
   * A boolean if the `SelectionControl` is currently checked. This _really_ makes the `onChange`
   * prop required, but since there are cases you might want to have the `onChange` listener on a
   * `fieldset` or something above the component, it is never set to `required`. It will however
   * prevent updates if there is no change listener.
   */
  checked: _propTypes2.default.bool,

  /**
   * Boolean if the `Checkbox` or `Switch` are checked by default. This prop is invalid for a
   * `Radio`.
   */
  defaultChecked: _propTypes2.default.bool,

  /**
   * Boolean if the `SelectionControl` should be displayed inline instead of a block.
   */
  inline: _propTypes2.default.bool,

  /**
   * The icon to use for a checked `checkbox` selection control.
   */
  checkedCheckboxIcon: _propTypes2.default.element,

  /**
   * The icon to use for an unchecked `checkbox` selection control.
   */
  uncheckedCheckboxIcon: _propTypes2.default.element,

  /**
   * The icon to use for a checked `radio` selection control.
   */
  checkedRadioIcon: _propTypes2.default.element,

  /**
   * The icon to use for an unchecked `radio` selection control.
   */
  uncheckedRadioIcon: _propTypes2.default.element,

  /**
   * An optional tooltip to render with the control. This is only used if you inject the
   * tooltip manually yourself.
   *
   * `const TooltippedSelectionControl = injectTooltip(SelectionControl);`
   */
  tooltip: _propTypes2.default.node,

  /**
   * Boolean if the ink should be disabled for radios or checkboxes.
   *
   * @see {@link Inks#inkDisabled}
   */
  inkDisabled: _propTypes2.default.bool,

  /**
   * An optional list of ink interactions that should be disabled.
   *
   * @see {@link Inks#disabledInteractions}
   */
  disabledInteractions: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['keyboard', 'touch', 'mouse'])),

  /**
   * An optional tab index to apply to the selection control.
   */
  tabIndex: _propTypes2.default.number,

  checkedIcon: preventDouble((0, _deprecated2.default)(_propTypes2.default.node, 'Use the `checkedCheckboxIconChildren` and `checkedCheckboxIconClassName`  or the ' + '`checkedRadioIconChildren` and `checkedRadioIconClassName` props instead')),
  uncheckedIcon: preventDouble((0, _deprecated2.default)(_propTypes2.default.node, 'Use the `uncheckedCheckboxIconChildren` and `uncheckedCheckboxIconClassName`  or the ' + '`uncheckedRadioIconChildren` and `uncheckedRadioIconClassName` props instead')),
  checkedCheckboxIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `checkedCheckboxIcon` prop instead'),
  checkedCheckboxIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `checkedCheckboxIcon` prop instead'),
  uncheckedCheckboxIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `uncheckedCheckboxIcon` prop instead'),
  uncheckedCheckboxIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `uncheckedCheckboxIcon` prop instead'),
  checkedRadioIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `checkedRadioIcon` prop instead'),
  checkedRadioIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `checkedRadioIcon` prop instead'),
  uncheckedRadioIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `uncheckedRadioIcon` prop instead'),
  uncheckedRadioIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `uncheckedRadioIcon` prop instead'),

  /* maybe removed once upgrade again? */
  __superSecreteProp: _propTypes2.default.bool
};
SelectionControl.defaultProps = {
  checkedCheckboxIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'check_box'
  ),
  uncheckedCheckboxIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'check_box_outline_blank'
  ),
  checkedRadioIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'radio_button_checked'
  ),
  uncheckedRadioIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'radio_button_unchecked'
  )
};
exports.default = SelectionControl;
//# sourceMappingURL=SelectionControl.js.map