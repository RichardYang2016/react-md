'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var _isValued = require('../utils/isValued');

var _isValued2 = _interopRequireDefault(_isValued);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _getTextWidth = require('../utils/Positioning/getTextWidth');

var _getTextWidth2 = _interopRequireDefault(_getTextWidth);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _invalidIf = require('../utils/PropTypes/invalidIf');

var _invalidIf2 = _interopRequireDefault(_invalidIf);

var _minNumber = require('../utils/PropTypes/minNumber');

var _minNumber2 = _interopRequireDefault(_minNumber);

var _addSuffix = require('../utils/StringUtils/addSuffix');

var _addSuffix2 = _interopRequireDefault(_addSuffix);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _getDeprecatedIcon = require('../FontIcons/getDeprecatedIcon');

var _getDeprecatedIcon2 = _interopRequireDefault(_getDeprecatedIcon);

var _FloatingLabel = require('./FloatingLabel');

var _FloatingLabel2 = _interopRequireDefault(_FloatingLabel);

var _TextFieldMessage = require('./TextFieldMessage');

var _TextFieldMessage2 = _interopRequireDefault(_TextFieldMessage);

var _PasswordButton = require('./PasswordButton');

var _PasswordButton2 = _interopRequireDefault(_PasswordButton);

var _InputField = require('./InputField');

var _InputField2 = _interopRequireDefault(_InputField);

var _TextFieldDivider = require('./TextFieldDivider');

var _TextFieldDivider2 = _interopRequireDefault(_TextFieldDivider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_TEXT_FIELD_SIZE = 180;

var WILL_RECEIVE_KEYS = ['style', 'value', 'resize'];
var DID_UPDATE_KEYS = ['leftIcon', 'rightIcon', 'passwordIcon', 'inlineIndicator'];

/**
 * The `TextField` component can either be a single line `input` field or a multiline
 * `textarea` field. `FontIcon`s, messages, and password indicators can also be added
 * to this field.
 *
 * The optional mouse and touch events will be added to the entire container while the
 * text specific events will be added to the `input` or `textarea` tags.
 */

var TextField = function (_PureComponent) {
  _inherits(TextField, _PureComponent);

  function TextField(props) {
    _classCallCheck(this, TextField);

    var _this = _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).call(this, props));

    _initialiseProps.call(_this);

    var currentLength = _this._getLength(typeof props.value !== 'undefined' ? props.value : props.defaultValue);

    _this._canvas = null;
    var width = null;
    if (typeof props.resize !== 'undefined') {
      width = typeof props.resize.min === 'number' ? props.resize.min : DEFAULT_TEXT_FIELD_SIZE;
    }

    _this.state = {
      active: false,
      error: props.maxLength ? props.maxLength < currentLength : false,
      floating: (0, _isValued2.default)(props.defaultValue) || (0, _isValued2.default)(props.value),
      passwordVisible: props.passwordInitiallyVisible,
      currentLength: currentLength,
      styles: width ? _extends({ width: width }, props.style) : props.style
    };
    return _this;
  }

  _createClass(TextField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          value = _props.value,
          defaultValue = _props.defaultValue,
          resize = _props.resize,
          style = _props.style;

      var v = typeof value !== 'undefined' ? value : defaultValue;
      /* eslint-disable react/no-did-mount-set-state */
      if (resize) {
        // always want to set width on mount
        this.setState({ styles: _extends({ width: this._calcWidth(v, this.props) }, style) });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var value = nextProps.value,
          resize = nextProps.resize,
          style = nextProps.style;

      var nextState = {};
      if (value !== this.props.value) {
        nextState.error = this._isErrored(nextProps);
        nextState.floating = this._focus || (0, _isValued2.default)(value);
        nextState.currentLength = this._getLength(value);
      }

      if (WILL_RECEIVE_KEYS.some(function (key) {
        return _this2.props[key] !== nextProps[key];
      })) {
        if (!resize) {
          nextState.styles = style;
        } else {
          var width = this._calcWidth(value, nextProps);
          nextState.styles = _extends({ width: width }, style);
        }
      }

      this.setState(nextState);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      var _props2 = this.props,
          resize = _props2.resize,
          value = _props2.value,
          style = _props2.style;

      if (resize && DID_UPDATE_KEYS.some(function (key) {
        return _this3.props[key] !== prevProps[key];
      })) {
        var width = this._calcWidth(value, this.props);
        this.setState({ styles: _extends({ width: width }, style) }); // eslint-disable-line react/no-did-update-set-state
      }
    }

    /**
     * A helper function for getting the specific `input` field or the `textarea` in the `TextField`.
     * This is accessible if you use `refs`.
     *
     * Example:
     *
     * ```js
     * <TextField ref={field => this._field = field;} label="Hello" />;
     *
     * this._field.getField(); // `input` node
     * ```
     */


    /**
     * A helper function for focusing the `input` field or the `textarea` in the `TextField`.
     * This is accessibile if you use `refs`.
     * Example:
     *
     * ```js
     * <TextField ref={field => this._field = field;} label="Hello" />;
     *
     * this._field.focus();
     * ```
     */

  }, {
    key: 'blur',


    /**
     * A helper function for blurring the `input` field or the `textarea` in the `TextField`.
     * This is accessible if you use `refs`.
     * Example:
     *
     * ```js
     * <TextField ref={field => this._field = field;} label="Hello" />;
     *
     * this._field.blur();
     * ```
     */
    value: function blur() {
      this._field.blur();
    }
  }, {
    key: '_cloneIcon',
    value: function _cloneIcon(icon, active, error, disabled, stateful, block, dir) {
      if (!icon) {
        return icon;
      }

      try {
        var iconEl = _react.Children.only(icon);
        return (0, _react.cloneElement)(iconEl, {
          key: iconEl.key || 'icon-' + dir,
          disabled: stateful ? disabled : undefined,
          primary: stateful ? !error && active : undefined,
          error: stateful ? error : undefined,
          className: (0, _classnames2.default)('md-text-field-icon', {
            'md-text-field-icon--positioned': !block
          }, iconEl.props.className)
        });
      } catch (e) {
        return icon;
      }
    }

    /**
     * A small utility function for calculating an inline-icon's width keeping the SVG Icons
     * in mind and any margin that gets applied for spacing.
     */

  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          currentLength = _state.currentLength,
          passwordVisible = _state.passwordVisible,
          styles = _state.styles;

      var _props3 = this.props,
          id = _props3.id,
          type = _props3.type,
          className = _props3.className,
          inputStyle = _props3.inputStyle,
          inputClassName = _props3.inputClassName,
          block = _props3.block,
          fullWidth = _props3.fullWidth,
          required = _props3.required,
          customSize = _props3.customSize,
          maxLength = _props3.maxLength,
          errorText = _props3.errorText,
          helpText = _props3.helpText,
          helpOnFocus = _props3.helpOnFocus,
          disabled = _props3.disabled,
          leftIconStateful = _props3.leftIconStateful,
          rightIconStateful = _props3.rightIconStateful,
          passwordIcon = _props3.passwordIcon,
          lineDirection = _props3.lineDirection,
          paddedBlock = _props3.paddedBlock,
          onDoubleClick = _props3.onDoubleClick,
          onTouchStart = _props3.onTouchStart,
          onTouchMove = _props3.onTouchMove,
          onTouchCancel = _props3.onTouchCancel,
          onTouchEnd = _props3.onTouchEnd,
          onMouseDown = _props3.onMouseDown,
          onMouseUp = _props3.onMouseUp,
          onMouseOver = _props3.onMouseOver,
          onMouseLeave = _props3.onMouseLeave,
          ink = _props3.ink,
          inlineIndicator = _props3.inlineIndicator,
          toolbar = _props3.toolbar,
          icon = _props3.icon,
          passwordIconChildren = _props3.passwordIconChildren,
          passwordIconClassName = _props3.passwordIconClassName,
          style = _props3.style,
          propLabel = _props3.label,
          propPlaceholder = _props3.placeholder,
          propError = _props3.error,
          propActive = _props3.active,
          propFloating = _props3.floating,
          propLeftIcon = _props3.leftIcon,
          propRightIcon = _props3.rightIcon,
          onClick = _props3.onClick,
          onChange = _props3.onChange,
          onBlur = _props3.onBlur,
          onFocus = _props3.onFocus,
          resize = _props3.resize,
          adjustMinWidth = _props3.adjustMinWidth,
          propFloatingLabel = _props3.floatingLabel,
          props = _objectWithoutProperties(_props3, ['id', 'type', 'className', 'inputStyle', 'inputClassName', 'block', 'fullWidth', 'required', 'customSize', 'maxLength', 'errorText', 'helpText', 'helpOnFocus', 'disabled', 'leftIconStateful', 'rightIconStateful', 'passwordIcon', 'lineDirection', 'paddedBlock', 'onDoubleClick', 'onTouchStart', 'onTouchMove', 'onTouchCancel', 'onTouchEnd', 'onMouseDown', 'onMouseUp', 'onMouseOver', 'onMouseLeave', 'ink', 'inlineIndicator', 'toolbar', 'icon', 'passwordIconChildren', 'passwordIconClassName', 'style', 'label', 'placeholder', 'error', 'active', 'floating', 'leftIcon', 'rightIcon', 'onClick', 'onChange', 'onBlur', 'onFocus', 'resize', 'adjustMinWidth', 'floatingLabel']);

      var _props4 = this.props,
          label = _props4.label,
          placeholder = _props4.placeholder,
          error = _props4.error,
          active = _props4.active,
          floating = _props4.floating,
          leftIcon = _props4.leftIcon,
          rightIcon = _props4.rightIcon;

      active = active || this.state.active;
      error = error || this.state.error;
      floating = floating || this.state.floating;

      if (required) {
        if (label) {
          label = (0, _addSuffix2.default)(label, '*');
        }

        if (placeholder && !label) {
          placeholder = (0, _addSuffix2.default)(placeholder, '*');
        }
      }

      if (label && !floating) {
        placeholder = null;
      }

      leftIcon = this._cloneIcon(icon || leftIcon, active, error, disabled, leftIconStateful, block, 'left');
      if (type === 'password' && !disabled) {
        rightIcon = _react2.default.createElement(_PasswordButton2.default, {
          key: 'password-btn',
          onClick: this._togglePasswordField,
          active: active,
          passwordVisible: passwordVisible,
          icon: (0, _getDeprecatedIcon2.default)(passwordIconClassName, passwordIconChildren, passwordIcon),
          block: block,
          floating: !!label
        });
      } else if (inlineIndicator) {
        var el = _react.Children.only(inlineIndicator);
        rightIcon = (0, _react.cloneElement)(inlineIndicator, {
          key: 'icon-right',
          className: (0, _classnames2.default)('md-text-field-inline-indicator', {
            'md-text-field-inline-indicator--floating': label,
            'md-text-field-inline-indicator--block': block
          }, el.props.className)
        });
      } else {
        rightIcon = this._cloneIcon(rightIcon, active, error, disabled, rightIconStateful, block, 'right');
      }
      var rightIconed = !!rightIcon && type !== 'password' && !inlineIndicator;

      var floatingLabel = _react2.default.createElement(_FloatingLabel2.default, {
        key: 'label',
        label: label,
        htmlFor: id,
        active: active,
        error: error,
        floating: floating,
        customSize: customSize,
        disabled: disabled,
        iconOffset: !!leftIcon
      });

      var message = _react2.default.createElement(_TextFieldMessage2.default, {
        key: 'message',
        active: active,
        error: error,
        errorText: errorText,
        helpText: helpText,
        helpOnFocus: helpOnFocus,
        block: block,
        maxLength: maxLength,
        leftIcon: !!leftIcon,
        rightIcon: !!rightIcon,
        currentLength: currentLength
      });

      var field = _react2.default.createElement(_InputField2.default, _extends({}, props, {
        key: 'field',
        ref: this._setField,
        id: id,
        type: type,
        label: label,
        style: inputStyle,
        className: (0, _classnames2.default)({ 'md-text-field--toolbar': toolbar }, inputClassName),
        disabled: disabled,
        customSize: customSize,
        fullWidth: fullWidth,
        passwordVisible: passwordVisible,
        placeholder: placeholder,
        block: block,
        onFocus: this._handleFocus,
        onBlur: this._handleBlur,
        onChange: this._handleChange,
        inlineIndicator: !!inlineIndicator
      }));

      var divider = void 0;
      if (!block) {
        divider = _react2.default.createElement(_TextFieldDivider2.default, {
          key: 'text-divider',
          active: active,
          error: error,
          lineDirection: lineDirection
        });
      }

      var children = void 0;
      if (leftIcon || rightIconed) {
        children = _react2.default.createElement(
          'div',
          { key: 'icon-divider', className: 'md-text-field-icon-container' },
          leftIcon,
          _react2.default.createElement(
            'div',
            {
              key: 'divider-container',
              className: (0, _classnames2.default)('md-text-field-divider-container', {
                'md-text-field-divider-container--grow': fullWidth
              })
            },
            field,
            divider
          ),
          rightIcon
        );
      } else {
        children = [leftIcon, field, divider, rightIcon];
      }

      children = [floatingLabel, children, message];

      var multiline = typeof props.rows !== 'undefined';
      return _react2.default.createElement(
        'div',
        {
          style: styles,
          className: (0, _classnames2.default)('md-text-field-container', {
            'md-inline-block': !fullWidth && !block,
            'md-full-width': block || fullWidth,
            'md-text-field-container--disabled': disabled,
            'md-text-field-container--input': !multiline,
            'md-text-field-container--input-block': block && !multiline,
            'md-text-field-container--multiline': multiline,
            'md-text-field-container--multiline-block': multiline && block,
            'md-text-field-container--padded-block': block && paddedBlock
          }, className),
          onClick: this._handleContainerClick,
          onDoubleClick: onDoubleClick,
          onMouseOver: onMouseOver,
          onMouseLeave: onMouseLeave,
          onMouseDown: onMouseDown,
          onMouseUp: onMouseUp,
          onTouchStart: onTouchStart,
          onTouchEnd: onTouchEnd,
          onTouchCancel: onTouchCancel,
          onTouchMove: onTouchMove,
          ref: this._setContainer
        },
        ink,
        children
      );
    }
  }, {
    key: 'value',


    /**
     * Gets the current value from the text field. This is used when you have an uncontrolled
     * text field and simply need the value from a ref callback.
     *
     * @return {String} the text field's value
     */
    get: function get() {
      return this.getField().value;
    }
  }]);

  return TextField;
}(_react.PureComponent);

TextField.propTypes = {
  /**
   * The id for a text field. This is required when using the `label` prop for accessibility,
   * but normally a good idea to include one anyways.
   */
  id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

  /**
   * An optional style to apply to the text field's container.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the text field's container.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the `input` or `textarea` tag.
   */
  inputStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the `input` or `textarea` tag.
   */
  inputClassName: _propTypes2.default.string,

  /**
   * An optional value to apply to the text field. This will make the component
   * controlled and require the `onChange` prop.
   */
  value: (0, _controlled2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]), 'onChange'),

  /**
   * An optional default value for the text field.
   */
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  /**
   * Boolean if the text field should be displayed as a `block`. This is equivalent to
   * the `full width` text field in the Material Design specs. This view will disable
   * floating labels and remove the text divider from the component.
   */
  block: _propTypes2.default.bool,

  /**
   * Boolean if the `block` text field should include padding to the left and right of
   * the text field.
   */
  paddedBlock: _propTypes2.default.bool,

  /**
   * Boolean if the text field is currently disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * An optional label to display with the text field. This will convert the text field
   * into a floating label text field. You can make it single line by only using the
   * `placeholder` prop.
   */
  label: (0, _invalidIf2.default)(_propTypes2.default.node, 'block'),

  /**
   * An optional placeholder text to display in the text field. If there is no `label` prop,
   * the text field will be displayed as a single line text field. If there is a `label` prop,
   * this will only be visible when there is no value and the user focused the text field.
   */
  placeholder: _propTypes2.default.string,

  /**
   * The type for the text field. This is one of the most import props for mobile accessibility
   * as it will update the keyboard for the text type. This does not get applied on multiline
   * text fields.
   */
  type: _propTypes2.default.oneOf(['text', 'number', 'email', 'search', 'tel', 'url', 'password']).isRequired,

  /**
   * An optional function to call when the text field's container triggers the `click` event.
   */
  onClick: _propTypes2.default.func,

  /**
   * An optional function to call when the text field's container triggers the `doubleclick`
   * event.
   */
  onDoubleClick: _propTypes2.default.func,

  /**
   * An optional function to call when the text field's container triggers the `touchstart`
   * event.
   */
  onTouchStart: _propTypes2.default.func,

  /**
   * An optional function to call when the text field's container triggers the `touchmove`
   * event.
   */
  onTouchMove: _propTypes2.default.func,

  /**
   * An optional function to call when the text field's container triggers the `touchcancel`
   * event.
   */
  onTouchCancel: _propTypes2.default.func,

  /**
   * An optional function to call when the text field's container triggers the `touchend`
   * event.
   */
  onTouchEnd: _propTypes2.default.func,

  /**
   * An optional function to call when the text field's container triggers the `mousedown`
   * event.
   */
  onMouseDown: _propTypes2.default.func,

  /**
   * An optional function to call when the text field's container triggers the `mouseup`
   * event.
   */
  onMouseUp: _propTypes2.default.func,

  /**
   * An optional function to call when the text field's container triggers the `mouseover`
   * event.
   */
  onMouseOver: _propTypes2.default.func,

  /**
   * An optional function to call when the text field's container triggers the `mouseleave`
   * event.
   */
  onMouseLeave: _propTypes2.default.func,

  /**
   * An optional onChange function to call. If the `value` prop is defined, this is
   * required.
   *
   * When the value changes in the text field, this will be called with the new text
   * field's value and the change event.
   *
   * ```js
   * onChange(e.target.value, e);
   * ```
   */
  onChange: _propTypes2.default.func,

  /**
   * An optional function to call when the text field is blurred.
   */
  onBlur: _propTypes2.default.func,

  /**
   * An optional function to call when the text field is focused.
   */
  onFocus: _propTypes2.default.func,

  /**
   * An optional boolean if the `active` state of the text field can be externally
   * modified as well. The text field is usually considered active when it gains focus.
   *
   * If this prop is set, it will check both the active prop and the active state to
   * determine if one is true.
   */
  active: _propTypes2.default.bool,

  /**
   * An optional boolean if the `error` state of the text field can be externally
   * modified as well. The text field is usually considered errored when it is required
   * and there is no value or the current length of the text field's value is greater
   * than the `maxLength` prop.
   *
   * If this prop is set, it will check both the error prop and the error state to
   * determine if one is true.
   */
  error: _propTypes2.default.bool,

  /**
   * An optional boolean if the `floating` state of the text field's floating label can be
   * externally modified as well. The floating state is true when the text field gains focus
   * or there is a value in the text field.
   *
   * If this prop is set, it will check both the floating prop and the floating state to
   * determine if one is true.
   */
  floating: _propTypes2.default.bool,

  /**
   * Boolean if the text field is required. If the user blurs the text field while there is
   * no value and it is required, the `error` state will be set to true.
   */
  required: _propTypes2.default.bool,

  /**
   * The direction that the underline should appear from.
   */
  lineDirection: _propTypes2.default.oneOf(['left', 'center', 'right']).isRequired,

  /**
   * An optional icon to place to the left of the text field.
   */
  leftIcon: _propTypes2.default.element,

  /**
   * Boolean if the left icon should be stateful. This means that the icon will
   * gain the active or error colors with the text field.
   */
  leftIconStateful: _propTypes2.default.bool,

  /**
   * An optional icon to place to the right of the text field.
   */
  rightIcon: _propTypes2.default.element,

  /**
   * Boolean if the right icon should be stateful. This means that the icon will
   * gain the active or error colors with the text field.
   */
  rightIconStateful: _propTypes2.default.bool,

  /**
   * The icon to use for a password text field.
   */
  passwordIcon: _propTypes2.default.element,

  /**
   * Boolean if the password is initially visible.
   */
  passwordInitiallyVisible: _propTypes2.default.bool,

  /**
   * Boolean if the text field should be displayed as full width.
   */
  fullWidth: _propTypes2.default.bool,

  /**
   * The number of rows for the `multiline` text field. This value must be greater than
   * or equal to 1. When this value is set, the text field will be converted to a multiline
   * field.
   */
  rows: (0, _minNumber2.default)(1, false),

  /**
   * The maximum number of rows for a `multiline` text field. If this value is
   * `undefined`, `0`, or a number less than `0`, the multiline text field will
   * infinitely expand.
   */
  maxRows: _propTypes2.default.number,

  /**
   * An optional custom size to apply to the text field. This is used along with
   * the `$md-text-field-custom-sizes` variable. It basically applies a className of
   * `md-text-field--NAME`.
   */
  customSize: _propTypes2.default.string,

  /**
   * An optional error text to display below the text field. This will only appear when
   * the text field has the `error` state through the `error` prop, the current length
   * of the text field's value is greater than the `maxLength` prop, or the field is
   * required and the user blurs the text field with no value.
   */
  errorText: _propTypes2.default.node,

  /**
   * An optional help text to display below the text field. This will always be visible
   * unless the `helpOnFocus` prop is set to true. Otherwise it will appear on focus.
   */
  helpText: _propTypes2.default.node,

  /**
   * Boolean if the help text should display on focus only.
   */
  helpOnFocus: _propTypes2.default.bool,

  /**
   * An optional max length for the text field. This will insert a counter underneath the
   * text field that appears on focus.
   */
  maxLength: _propTypes2.default.number,

  /**
   * The ink when there is an injectInk above the text field. Used from the SelectField.
   *
   * @access private
   */
  ink: _propTypes2.default.node,

  /**
   * An optional element to display inside of the `TextField` to the farthest right. This will
   * position the indicator absolutely and add some additional padding to the `TextField`.
   */
  inlineIndicator: _propTypes2.default.element,

  /**
   * This prop allows the text field to resize its width to stay between the min and max sizes provided. By
   * default, the field will expand and collapse based on the amount of text provided. The collapsing can
   * be disabled by providing `disableShrink` to the configuration object.
   *
   * If the `min` prop is not provided, it will default to `180` which is about the same size as a default
   * text field.
   */
  resize: _propTypes2.default.shape({
    min: _propTypes2.default.number,
    max: _propTypes2.default.number.isRequired,
    disableShrink: _propTypes2.default.bool
  }),

  /**
   * Boolean if the TextField is in a toolbar and acting as a title. This will apply additional styles to the
   * text field to make it look like the toolbar's title.
   */
  toolbar: _propTypes2.default.bool,

  passwordIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `passwordIcon` prop instead'),
  passwordIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `passwordIcon` prop instead'),
  icon: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `leftIcon` or `rightIcon` prop instead'),
  floatingLabel: (0, _deprecated2.default)(_propTypes2.default.bool, 'The `label` prop is now always floating. To create a non-floating text field, only use the `placeholder` prop'),
  adjustMinWidth: (0, _deprecated2.default)(_propTypes2.default.bool, 'Manually add a min width style instead')
};
TextField.defaultProps = {
  type: 'text',
  lineDirection: 'left',
  passwordIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'remove_red_eye'
  ),
  leftIconStateful: true,
  rightIconStateful: true,
  fullWidth: true
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.getField = function () {
    return _this4._field.getField();
  };

  this.focus = function () {
    _this4._field.focus();
  };

  this._getLength = function (v) {
    if ((0, _isValued2.default)(v)) {
      return String(v).length;
    }

    return 0;
  };

  this._setContainer = function (div) {
    _this4._container = div;
  };

  this._setField = function (field) {
    if (field !== null) {
      _this4._field = field;
    }
  };

  this._calcIconWidth = function (icon) {
    var style = window.getComputedStyle(icon);

    return icon.getBoundingClientRect().width + parseInt(style.marginLeft, 10);
  };

  this._calcWidth = function (value) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this4.props;

    var text = value;
    // if it is a password, use the bullet unicode instead
    if (props.type === 'password') {
      text = Array.from(Array(value.length)).reduce(function (s) {
        return s + '\u2022';
      }, '');
    }

    var field = _this4._field && _this4._field.getField();
    if (!(0, _isValued2.default)(text) && field) {
      text = field.value;
    }

    var min = (0, _getField2.default)(props.resize, { min: DEFAULT_TEXT_FIELD_SIZE }, 'min');
    var width = (0, _getTextWidth2.default)(text, field);
    if (width === null || !field) {
      // some error happened, don't do other logic
      return width || min;
    }

    var max = props.resize.max;


    if (_this4._container) {
      var indicator = _this4._container.querySelector('.md-text-field-inline-indicator');
      if (indicator) {
        width += indicator.getBoundingClientRect().width;
      }

      var iconContainer = _this4._container.querySelector('.md-text-field-icon-container');
      if (iconContainer) {
        // There is conditionally an icon before and after the text field, or only an icon before/after
        var _iconContainer$childr = _slicedToArray(iconContainer.children, 3),
            first = _iconContainer$childr[0],
            second = _iconContainer$childr[1],
            third = _iconContainer$childr[2];

        if (first.classList.contains('md-icon')) {
          width += first.getBoundingClientRect().width;
          width += parseInt(window.getComputedStyle(second).marginLeft, 10);

          if (third) {
            width += _this4._calcIconWidth(third);
          }
        } else if (second) {
          width += _this4._calcIconWidth(second);
        }
      }
    }

    return Math.ceil(Math.min(max, Math.max(min, width)));
  };

  this._isErrored = function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this4.props,
        value = _ref.value,
        maxLength = _ref.maxLength,
        required = _ref.required;

    var error = _this4.state.error;

    var currentLength = _this4._getLength(value);
    if (required && error) {
      error = !(0, _isValued2.default)(value);
    }

    if (maxLength) {
      error = error || currentLength > maxLength;
    }

    return error;
  };

  this._handleContainerClick = function (e) {
    if (_this4.props.onClick) {
      _this4.props.onClick(e);
    }

    if (!_this4.props.disabled) {
      _this4.focus();
    }
  };

  this._handleBlur = function (e) {
    _this4._focus = false;
    var _props5 = _this4.props,
        required = _props5.required,
        maxLength = _props5.maxLength,
        onBlur = _props5.onBlur;

    if (onBlur) {
      onBlur(e);
    }

    var value = e.target.value;

    var state = {
      active: false,
      error: required && !(0, _isValued2.default)(value) || maxLength && String(value).length > maxLength
    };

    if (!_this4.props.block) {
      state.floating = (0, _isValued2.default)(value);
    }

    _this4.setState(state);
  };

  this._handleFocus = function (e) {
    _this4._focus = true;
    var _props6 = _this4.props,
        onFocus = _props6.onFocus,
        block = _props6.block;

    if (onFocus) {
      onFocus(e);
    }

    var state = { active: true };
    if (!block) {
      state.floating = true;
    }

    _this4.setState(state);
  };

  this._handleChange = function (e) {
    var _props7 = _this4.props,
        onChange = _props7.onChange,
        maxLength = _props7.maxLength,
        required = _props7.required,
        resize = _props7.resize;
    var value = e.target.value;

    if (onChange) {
      onChange(e.target.value, e);
    }

    var currentLength = value.length;
    var state = void 0;
    if (typeof maxLength !== 'undefined') {
      state = { currentLength: currentLength, error: currentLength > maxLength };
    } else if (required && _this4.state.error) {
      state = { error: !currentLength };
    }

    if (typeof _this4.props.value === 'undefined' && resize) {
      var width = _this4._calcWidth(value);
      if (!resize.disableShrink || !_this4.state.styles || width > _this4.state.styles.width) {
        state = state || {};
        state.styles = _extends({}, _this4.state.styles, { width: width });
      }
    }

    if (state) {
      _this4.setState(state);
    }
  };

  this._togglePasswordField = function () {
    _this4.setState({ passwordVisible: !_this4.state.passwordVisible }, _this4.focus);
  };
};

exports.default = TextField;
//# sourceMappingURL=TextField.js.map