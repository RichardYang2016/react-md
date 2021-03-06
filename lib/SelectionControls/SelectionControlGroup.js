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

var _keyCodes = require('../constants/keyCodes');

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _minMaxLoop = require('../utils/NumberUtils/minMaxLoop');

var _minMaxLoop2 = _interopRequireDefault(_minMaxLoop);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _SelectionControl = require('./SelectionControl');

var _SelectionControl2 = _interopRequireDefault(_SelectionControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A custom PropTypes validator to make sure that each `control` in the `controls` prop
 * contains the given `propName`, or the `SelectionControlGroup` has defined that prop.
 */
function requiredByAllControls(validator) {
  return function validate(props, propName, component) {
    for (var _len = arguments.length, others = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      others[_key - 3] = arguments[_key];
    }

    var err = validator.apply(undefined, [props, propName, component].concat(others));

    if (!err && typeof props[propName] === 'undefined') {
      var invalids = props.controls.filter(function (c) {
        return !c[propName];
      }).map(function (_, i) {
        return i;
      });
      if (invalids.length) {
        var invalidPrefix = invalids.length === props.controls.length ? 'All `controls`' : 'The `controls` at indexes `' + invalids.join('`, `') + '`';
        var invalidMsg = invalidPrefix + ' are missing the `' + propName + '` prop.';

        err = new Error('The `' + propName + '` prop is required to make `' + component + '` accessible for users of ' + ('assistive technologies such as screen readers. Either add the `' + propName + '` to the `' + component + '` ') + ('or add the `' + propName + '` to each `control` in the `controls` prop. ' + invalidMsg));
      }
    }

    return err;
  };
}

/**
 * The `SelectionControlGroup` component is used to simplify the generation of a list
 * of `SelectionControl`. Any common props are extracted to this component and passed
 * to the `SelectionControl`.
 */

var SelectionControlGroup = function (_PureComponent) {
  _inherits(SelectionControlGroup, _PureComponent);

  function SelectionControlGroup(props) {
    _classCallCheck(this, SelectionControlGroup);

    var _this = _possibleConstructorReturn(this, (SelectionControlGroup.__proto__ || Object.getPrototypeOf(SelectionControlGroup)).call(this, props));

    _this._setGroup = function (group) {
      _this._group = group;
    };

    _this._handleChange = function (e) {
      var value = e.target.value;
      if (_this.props.type === 'checkbox') {
        var checked = e.target.checked;


        var values = (0, _getField2.default)(_this.props, _this.state, 'value').split(',');
        var index = values.indexOf(value);
        if (checked) {
          values.push(value);
        } else {
          values.splice(index, 1);
        }

        value = values.join(',');
      }

      if (_this.props.onChange) {
        _this.props.onChange(value, e);
      }

      if (typeof _this.props.value === 'undefined') {
        _this.setState({ value: value });
      }
    };

    _this._handleKeyDown = function (e) {
      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }

      var key = e.which || e.keyCode;
      var dec = key === _keyCodes.UP || key === _keyCodes.LEFT;
      var inc = key === _keyCodes.DOWN || key === _keyCodes.RIGHT;
      if (!_this._group || !dec && !inc) {
        return;
      }

      e.preventDefault();
      var radios = _this._group.querySelectorAll('*[role="radio"]');
      _this._activeIndex = (0, _minMaxLoop2.default)(_this._activeIndex, 0, radios.length - 1, inc);
      radios[_this._activeIndex].focus();
      var value = _this.props.controls[_this._activeIndex].value;

      if ((0, _getField2.default)(_this.props, _this.state, 'value') !== value) {
        if (_this.props.onChange) {
          _this.props.onChange(value, e);
        }

        if (typeof _this.props.value === 'undefined') {
          _this.setState({ value: value });
        }
      }
    };

    var radio = props.type === 'radio';
    _this.state = {};

    if (typeof props.value === 'undefined') {
      var value = props.defaultValue;

      if (typeof value === 'undefined') {
        value = radio ? props.controls[0].value : '';
      }

      _this.state.value = value;
    }

    var groupValue = (0, _getField2.default)(props, _this.state, 'value');
    _this._activeIndex = -1;
    props.controls.some(function (_ref, i) {
      var value = _ref.value;

      if (value === groupValue) {
        _this._activeIndex = i;
      }

      return _this._activeIndex > -1;
    });
    return _this;
  }

  _createClass(SelectionControlGroup, [{
    key: '_isChecked',
    value: function _isChecked(value, controlValue, type) {
      return type === 'radio' ? value === controlValue : value.split(',').indexOf(controlValue) !== -1;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          id = _props.id,
          name = _props.name,
          type = _props.type,
          label = _props.label,
          labelClassName = _props.labelClassName,
          className = _props.className,
          controlStyle = _props.controlStyle,
          controlClassName = _props.controlClassName,
          Component = _props.component,
          LabelComponent = _props.labelComponent,
          inline = _props.inline,
          disabled = _props.disabled,
          checkedRadioIcon = _props.checkedRadioIcon,
          uncheckedRadioIcon = _props.uncheckedRadioIcon,
          checkedCheckboxIcon = _props.checkedCheckboxIcon,
          uncheckedCheckboxIcon = _props.uncheckedCheckboxIcon,
          propValue = _props.value,
          propControls = _props.controls,
          defaultValue = _props.defaultValue,
          props = _objectWithoutProperties(_props, ['id', 'name', 'type', 'label', 'labelClassName', 'className', 'controlStyle', 'controlClassName', 'component', 'labelComponent', 'inline', 'disabled', 'checkedRadioIcon', 'uncheckedRadioIcon', 'checkedCheckboxIcon', 'uncheckedCheckboxIcon', 'value', 'controls', 'defaultValue']);

      var value = (0, _getField2.default)(this.props, this.state, 'value');
      var radio = type === 'radio';

      var controls = this.props.controls.map(function (control, i) {
        var style = control.style;
        if (controlStyle) {
          style = style ? _extends({}, controlStyle, style) : controlStyle;
        }

        var checked = _this2._isChecked(value, control.value, type);
        var controlProps = _extends({
          id: '' + id + i,
          key: 'control' + i,
          name: '' + name + (type === 'checkbox' ? '[]' : ''),
          type: type,
          inline: inline,
          disabled: disabled,
          checked: checked,
          tabIndex: !radio || checked || i === 0 && _this2._activeIndex === -1 ? undefined : -1,
          checkedRadioIcon: checkedRadioIcon,
          uncheckedRadioIcon: uncheckedRadioIcon,
          checkedCheckboxIcon: checkedCheckboxIcon,
          uncheckedCheckboxIcon: uncheckedCheckboxIcon
        }, control, {
          style: style,
          className: (0, _classnames2.default)(controlClassName, control.className)
        });

        return _react2.default.createElement(_SelectionControl2.default, controlProps);
      });

      var ariaLabel = void 0;
      if (label) {
        ariaLabel = _react2.default.createElement(
          LabelComponent,
          { className: labelClassName },
          label
        );
      }

      return _react2.default.createElement(
        Component,
        _extends({}, props, {
          ref: this._setGroup,
          className: (0, _classnames2.default)('md-selection-control-group', className),
          onChange: this._handleChange,
          onKeyDown: radio ? this._handleKeyDown : null
        }),
        ariaLabel,
        controls
      );
    }
  }]);

  return SelectionControlGroup;
}(_react.PureComponent);

SelectionControlGroup.propTypes = {
  /**
   * An optional style to apply to the container.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the container.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to every `SelectionControl`. This will be merged with any `style`
   * that a `control` might have.
   */
  controlStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to every `SelectionControl`. This will be merged with any
   * `className` that a `control` might have.
   */
  controlClassName: _propTypes2.default.string,

  /**
   * An optional base id to apply to each `SelectionControl`. When this is included, the id for
   * each control will start with this and end with their current index. If this is omitted,
   * each `control` in the `controls` prop *must* have an `id` prop. This is required for
   * accessibility.
   */
  id: requiredByAllControls(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

  /**
   * The type to apply to each `SelectionControl` in the group. Only `checkbox` and `radio` is
   * valid for a grouping.
   */
  type: _propTypes2.default.oneOf(['checkbox', 'radio']).isRequired,

  /**
   * The component to render the `SelectionControlGroup` in. This can only be a valid dom element
   * since it relies on the ref callback to add keyboard accessibility.
   */
  component: _propTypes2.default.string.isRequired,

  /**
   * An optional label to display above the group of `SelectionControl`s.
   */
  label: _propTypes2.default.node,

  /**
   * An optional className to apply to the node surrounding the `label` prop.
   */
  labelClassName: _propTypes2.default.string,

  /**
   * The component to render the optional `label` in.
   */
  labelComponent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,

  /**
   * An optional function to call when any `SelectionControl`'s `checked` state is changed
   * in the group. If the `type` of the group is `radio`, the `value` of the `checked` radio
   * will be given in the callback. If the `type` of the group is `checkbox`, a comma-delimited
   * string of all `checked` checkboxes values will be given.
   *
   * ```js
   * // checkbox
   * onChange('Alpha,Omega', changeEvent);
   *
   * // radio
   * onChange('Omega', changeEvent);
   * ```
   */
  onChange: _propTypes2.default.func,

  /**
   * A name to use for each `SelectionControl` in the group. If the `type` of the group is
   * `checkbox`, the name will be updated to be an array name so that using
   * `document.querySelector('input[name="yourName[]"].value` will give the comma-delimited
   * string of checked checkboxes.
   *
   * It is either required to have this prop set or every `control` in the `controls` prop to
   * have the `name` prop.
   */
  name: requiredByAllControls(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

  /**
   * The default value for the `SelectionControlGroup`. This can either be a single value
   * or a comma-delimited string of checkbox values. When the `type` of the group is `radio`
   * and the group is uncontrolled, it is recommended to set this prop. Otherwise the first
   * value of the `controls` prop will be used as the default value.
   */
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional value to use for the `SelectionControlGroup`. This will make the component
   * controlled and require the `onChange` prop to be defined. Like the `defaultValue`, this
   * can either be a single value or a comma-delimited list of checkbox values.
   */
  value: (0, _controlled2.default)(_propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.string]), 'onChange'),

  /**
   * A list of objects to create the `SelectionControl` components. The shape of the object
   * is the `propTypes` of the `SelectionControl` component, except that `value` prop is
   * now required.
   *
   * The `SelectionControl` will inherit any inheritable props from the `SelectionControlGroup`.
   */
  controls: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    key: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    label: _propTypes2.default.node.isRequired,
    value: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.string]).isRequired
  })).isRequired,

  /**
   * Boolean if the `SelectionControl` should be displayed inline.
   */
  inline: _propTypes2.default.bool,

  /**
   * Boolean if all the selection controls in the group are disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * An optional function to call when the keydown event is triggered.
   */
  onKeyDown: _propTypes2.default.func,

  /**
   * An icon to use for a checked `radio` control. This will be applied to each
   * control that has a `type="radio"` in the `controls` list. This is just a simpler
   * way of applying the custom icons for each radio in the list.
   *
   * This will default to the `checkedRadioIcon` on the `SelectionControl`.
   *
   * @see {@link #controls}
   * @see {@link #uncheckedRadioIcon}
   * @see {@link SelectionControls/SelectionControls#checkedRadioIcon}
   * @see {@link SelectionControls/SelectionControls#uncheckedRadioIcon}
   */
  checkedRadioIcon: _propTypes2.default.node,

  /**
   * An icon to use for an unchecked `radio` control. This will be applied to each
   * control that has a `type="radio"` in the `controls` list. This is just a simpler
   * way of applying the custom icons for each radio in the list.
   *
   * This will default to the `uncheckedRadioIcon` on the `SelectionControl`.
   *
   * @see {@link #controls}
   * @see {@link #checkedRadioIcon}
   * @see {@link SelectionControls/SelectionControls#checkedRadioIcon}
   * @see {@link SelectionControls/SelectionControls#uncheckedRadioIcon}
   */
  uncheckedRadioIcon: _propTypes2.default.node,

  /**
   * An icon to use for a checked `checkbox` control. This will be applied to each
   * control that has a `type="checkbox"` in the `controls` list. This is just a simpler
   * way of applying the custom icons for each checkbox in the list.
   *
   * This will default to the `checkedCheckboxIcon` on the `SelectionControl`.
   *
   * @see {@link #controls}
   * @see {@link #uncheckedCheckboxIcon}
   * @see {@link SelectionControls/SelectionControls#checkedCheckboxIcon}
   * @see {@link SelectionControls/SelectionControls#uncheckedCheckboxIcon}
   */
  checkedCheckboxIcon: _propTypes2.default.node,

  /**
   * An icon to use for an unchecked `checkbox` control. This will be applied to each
   * control that has a `type="checkbox"` in the `controls` list. This is just a simpler
   * way of applying the custom icons for each checkbox in the list.
   *
   * This will default to the `uncheckedCheckboxIcon` on the `SelectionControl`.
   *
   * @see {@link #controls}
   * @see {@link #checkedCheckboxIcon}
   * @see {@link SelectionControls/SelectionControls#checkedCheckboxIcon}
   * @see {@link SelectionControls/SelectionControls#uncheckedCheckboxIcon}
   */
  uncheckedCheckboxIcon: _propTypes2.default.node
};
SelectionControlGroup.defaultProps = {
  component: 'fieldset',
  labelComponent: 'legend',
  labelClassName: 'md-subheading-1'
};
exports.default = SelectionControlGroup;
//# sourceMappingURL=SelectionControlGroup.js.map