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

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _keyCodes = require('../constants/keyCodes');

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _handleWindowClickListeners = require('../utils/EventUtils/handleWindowClickListeners');

var _handleWindowClickListeners2 = _interopRequireDefault(_handleWindowClickListeners);

var _handleKeyboardAccessibility = require('../utils/EventUtils/handleKeyboardAccessibility');

var _handleKeyboardAccessibility2 = _interopRequireDefault(_handleKeyboardAccessibility);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _DateTimeFormat = require('../utils/DateUtils/DateTimeFormat');

var _DateTimeFormat2 = _interopRequireDefault(_DateTimeFormat);

var _formatTime = require('../utils/DateUtils/formatTime');

var _formatTime2 = _interopRequireDefault(_formatTime);

var _extractTimeParts = require('../utils/DateUtils/extractTimeParts');

var _extractTimeParts2 = _interopRequireDefault(_extractTimeParts);

var _DialogContainer = require('../Dialogs/DialogContainer');

var _DialogContainer2 = _interopRequireDefault(_DialogContainer);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _TextField = require('../TextFields/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Collapse = require('../Helpers/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _TimePicker = require('./TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-shadow */


/**
 * The `TimePickerContainer` component is a wrapper for the main `TimePicker` component
 * to manage the state and _logic_ for rendering the `TimePicker`. This component will
 * either render inline or in a `Dialog` depending if the `inline` prop is set
 * to `true`.
 *
 * NOTE: This component is actually exported as `TimePicker` when using the `import { member }` syntax.
 * The following two lines are equivalent:
 *
 * ```js
 * import { TimePicker } from 'react-md/lib/Pickers';
 * import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';
 * ```
 */
var TimePickerContainer = function (_PureComponent) {
  _inherits(TimePickerContainer, _PureComponent);

  function TimePickerContainer(props) {
    _classCallCheck(this, TimePickerContainer);

    var _this = _possibleConstructorReturn(this, (TimePickerContainer.__proto__ || Object.getPrototypeOf(TimePickerContainer)).call(this, props));

    _initialiseProps.call(_this);

    var initialDate = void 0;
    if (props.defaultValue) {
      initialDate = new Date(props.defaultValue);
    } else if (props.value) {
      initialDate = new Date(props.value);
    } else {
      initialDate = new Date();
    }

    var visible = typeof props.initiallyOpen !== 'undefined' ? props.initiallyOpen : !!props.defaultVisible;

    _this.state = _extends({
      visible: visible
    }, _this._getTimeParts(initialDate, props), {
      value: props.defaultValue,
      time: initialDate,
      timeMode: props.initialTimeMode || props.defaultTimeMode,
      tempTime: initialDate
    });
    return _this;
  }

  _createClass(TimePickerContainer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        var time = nextProps.value || new Date();
        this.setState(_extends({ tempTime: time }, this._getTimeParts(time, nextProps)));
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props,
          inline = _props.inline,
          isOpen = _props.isOpen;

      var visible = typeof isOpen !== 'undefined' ? isOpen : (0, _getField2.default)(this.props, this.state, 'visible');
      var pVisible = typeof prevProps.isOpen !== 'undefined' ? prevProps.isOpen : (0, _getField2.default)(prevProps, prevState, 'visible');

      if (visible === pVisible) {
        return;
      }

      if (visible) {
        if (inline) {
          (0, _handleWindowClickListeners2.default)(this._handleOutsideClick, true);
          window.addEventListener('keydown', this._closeOnEsc);
        }
      } else if (inline) {
        (0, _handleWindowClickListeners2.default)(this._handleOutsideClick, false);
        window.removeEventListener('keydown', this._closeOnEsc);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var visible = typeof this.props.isOpen !== 'undefined' ? this.props.isOpen : (0, _getField2.default)(this.props, this.state, 'visible');
      if (visible && this.props.inline) {
        (0, _handleWindowClickListeners2.default)(this._handleOutsideClick, false);
        window.removeEventListener('keydown', this._closeOnEsc);
      }
    }
  }, {
    key: '_getTimeParts',
    value: function _getTimeParts(date, props) {
      return (0, _extractTimeParts2.default)(props.DateTimeFormat, props.locales, date);
    }
  }, {
    key: '_getTextFieldValue',
    value: function _getTextFieldValue(props, state) {
      var DateTimeFormat = props.DateTimeFormat,
          locales = props.locales;

      var value = (0, _getField2.default)(props, state, 'value');
      if (!value) {
        return '';
      } else if (value instanceof Date) {
        return (0, _formatTime2.default)(DateTimeFormat, locales, value);
      } else {
        // currently don't support value of string
        return value;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          timeMode = _state.timeMode,
          tempTime = _state.tempTime,
          hours = _state.hours,
          minutes = _state.minutes,
          timePeriod = _state.timePeriod;

      var _props2 = this.props,
          style = _props2.style,
          className = _props2.className,
          pickerStyle = _props2.pickerStyle,
          pickerClassName = _props2.pickerClassName,
          inputStyle = _props2.inputStyle,
          inputClassName = _props2.inputClassName,
          textFieldStyle = _props2.textFieldStyle,
          textFieldClassName = _props2.textFieldClassName,
          id = _props2.id,
          disabled = _props2.disabled,
          label = _props2.label,
          placeholder = _props2.placeholder,
          icon = _props2.icon,
          inline = _props2.inline,
          displayMode = _props2.displayMode,
          fullWidth = _props2.fullWidth,
          lineDirection = _props2.lineDirection,
          closeOnEsc = _props2.closeOnEsc,
          hoverMode = _props2.hoverMode,
          portal = _props2.portal,
          renderNode = _props2.renderNode,
          lastChild = _props2.lastChild,
          animateInline = _props2.animateInline,
          block = _props2.block,
          paddedBlock = _props2.paddedBlock,
          active = _props2.active,
          error = _props2.error,
          floating = _props2.floating,
          required = _props2.required,
          leftIconStateful = _props2.leftIconStateful,
          rightIcon = _props2.rightIcon,
          rightIconStateful = _props2.rightIconStateful,
          customSize = _props2.customSize,
          errorText = _props2.errorText,
          helpText = _props2.helpText,
          helpOnFocus = _props2.helpOnFocus,
          inlineIndicator = _props2.inlineIndicator,
          disableScrollLocking = _props2.disableScrollLocking,
          ariaLabel = _props2['aria-label'],
          propValue = _props2.value,
          propVisible = _props2.visible,
          readOnly = _props2.readOnly,
          defaultValue = _props2.defaultValue,
          defaultVisible = _props2.defaultVisible,
          defaultTimeMode = _props2.defaultTimeMode,
          onVisibilityChange = _props2.onVisibilityChange,
          isOpen = _props2.isOpen,
          initialTimeMode = _props2.initialTimeMode,
          initiallyOpen = _props2.initiallyOpen,
          props = _objectWithoutProperties(_props2, ['style', 'className', 'pickerStyle', 'pickerClassName', 'inputStyle', 'inputClassName', 'textFieldStyle', 'textFieldClassName', 'id', 'disabled', 'label', 'placeholder', 'icon', 'inline', 'displayMode', 'fullWidth', 'lineDirection', 'closeOnEsc', 'hoverMode', 'portal', 'renderNode', 'lastChild', 'animateInline', 'block', 'paddedBlock', 'active', 'error', 'floating', 'required', 'leftIconStateful', 'rightIcon', 'rightIconStateful', 'customSize', 'errorText', 'helpText', 'helpOnFocus', 'inlineIndicator', 'disableScrollLocking', 'aria-label', 'value', 'visible', 'readOnly', 'defaultValue', 'defaultVisible', 'defaultTimeMode', 'onVisibilityChange', 'isOpen', 'initialTimeMode', 'initiallyOpen']);

      var visible = typeof this.props.isOpen !== 'undefined' ? this.props.isOpen : (0, _getField2.default)(this.props, this.state, 'visible');

      var picker = _react2.default.createElement(_TimePicker2.default, _extends({}, props, {
        inline: inline,
        icon: !!icon,
        tempTime: tempTime,
        timeMode: timeMode,
        hours: hours,
        minutes: minutes,
        timePeriod: timePeriod,
        style: pickerStyle,
        className: pickerClassName,
        displayMode: displayMode,
        onOkClick: this._handleOkClick,
        onCancelClick: this._handleCancelClick,
        setTimeMode: this._setTimeMode,
        setTempTime: this._setTempTime,
        hoverMode: hoverMode
      }));

      var content = void 0;
      if (inline) {
        content = _react2.default.createElement(
          _Collapse2.default,
          { collapsed: !visible, animate: animateInline },
          picker
        );
      } else {
        content = _react2.default.createElement(
          _DialogContainer2.default,
          {
            id: id + '-dialog',
            visible: visible,
            onHide: this._handleCancelClick,
            dialogClassName: 'md-dialog--picker',
            contentClassName: 'md-dialog-content--picker',
            'aria-label': ariaLabel,
            closeOnEsc: closeOnEsc,
            portal: portal,
            lastChild: lastChild,
            renderNode: renderNode,
            focusOnMount: false,
            disableScrollLocking: disableScrollLocking
          },
          picker
        );
      }

      return _react2.default.createElement(
        'div',
        { style: style, className: (0, _classnames2.default)('md-picker-container', className), ref: this._setContainer },
        _react2.default.createElement(_TextField2.default, {
          id: id,
          style: textFieldStyle,
          className: (0, _classnames2.default)({ 'md-pointer--hover': !disabled }, textFieldClassName),
          inputStyle: inputStyle,
          inputClassName: (0, _classnames2.default)({ 'md-pointer--hover': !disabled }, inputClassName),
          active: active || visible,
          error: error,
          floating: floating || visible,
          required: required,
          disabled: disabled,
          leftIcon: icon,
          leftIconStateful: leftIconStateful,
          rightIcon: rightIcon,
          rightIconStateful: rightIconStateful,
          inlineIndicator: inlineIndicator,
          block: block,
          paddedBlock: paddedBlock,
          fullWidth: fullWidth,
          lineDirection: lineDirection,
          customSize: customSize,
          helpText: helpText,
          helpOnFocus: helpOnFocus,
          errorText: errorText,
          label: label,
          placeholder: placeholder,
          onClick: this._toggleOpen,
          onKeyDown: this._handleKeyDown,
          value: this._getTextFieldValue(this.props, this.state),
          readOnly: true
        }),
        content
      );
    }
  }]);

  return TimePickerContainer;
}(_react.PureComponent);

TimePickerContainer.propTypes = {
  /**
   * An id for the text field in the time picker. This is require for a11y.
   */
  id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),

  /**
   * An aria-label to apply to the dialog when it has been opened. This is required for
   * a11y.
   */
  'aria-label': (0, _isRequiredForA11y2.default)(_propTypes2.default.string),

  /**
   * An optional style to apply to the time picker's container.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the time picker's container.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the time picker.
   */
  pickerStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the time picker.
   */
  pickerClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the input tag.
   */
  inputStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the input tag.
   */
  inputClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the text field's container.
   */
  textFieldStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the text field's container.
   */
  textFieldClassName: _propTypes2.default.string,

  /**
   * An optional icon to display with the time picker.
   *
   * @see {@link TextFields/TextField#leftIcon}
   */
  icon: _propTypes2.default.node,

  /**
   * Boolean if the time picker is open by default.
   */
  defaultVisible: _propTypes2.default.bool,

  /**
   * An optional label to be displayed in the time picker's text
   * field.
   */
  label: _propTypes2.default.node,

  /**
   * An optional placeholder to be displayed in the time picker's text field.
   */
  placeholder: _propTypes2.default.string,

  /**
   * The value of the time picker. This will make the time picker
   * be a controlled component.
   */
  value: (0, _controlled2.default)(_propTypes2.default.instanceOf(Date), 'onChange', 'defaultValue'),

  /**
   * An optional function to call when the selected date is changed
   * by hitting the OK button. The newly formatted time string,
   * the new Date object, and the change event will be given.
   *
   * `onChange(timeString, dateObject, event)`.
   */
  onChange: _propTypes2.default.func,

  /**
   * An optional default value to give for the year picker.
   */
  defaultValue: _propTypes2.default.instanceOf(Date),

  /**
   * A function to format the dates since it should be formatted to the user's
   * locale. This _should_ be the `Intl.DateTimeFormat` function. You
   * can also create your own if you really wanted. Inadvisable though.
   *
   * See [intl-polyfill](https://github.com/andyearnshaw/Intl.js/) for more info.
   */
  DateTimeFormat: _propTypes2.default.func.isRequired,

  /**
   * The locales to use for formatting the date. This will default to using
   * the user's language in the browser or `'en-US'` when server rendering.
   */
  locales: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]).isRequired,

  /**
   * The label to use for the ok button on the year picker.
   */
  okLabel: _propTypes2.default.node.isRequired,

  /**
   * Boolean if the ok button should be styled with the primary color.
   */
  okPrimary: _propTypes2.default.bool,

  /**
   * The label to use for the cancel button on the year picker.
   */
  cancelLabel: _propTypes2.default.node.isRequired,

  /**
   * Boolean if the cancel button should be styled with the primary color.
   */
  cancelPrimary: _propTypes2.default.bool,

  /**
   * The default mode to open the time picker in.
   */
  defaultTimeMode: _propTypes2.default.oneOf(['hour', 'minute']),

  /**
   * Boolean if the date should automatically be selected when a user clicks
   * on a new date instead of making them hit the ok button.
   */
  autoOk: _propTypes2.default.bool,

  /**
   * Boolean if the date picker should be displayed inline instead of in a
   * dialog.
   */
  inline: _propTypes2.default.bool,

  /**
   * An optional force of the display mode of the date picker.
   * This _should_ not really be used since there are media queries
   * to use the correct mode based on device orientation.
   */
  displayMode: _propTypes2.default.oneOf(['landscape', 'portrait']),

  /**
   * Boolean if the text field for the Time Picker should be displayed as full width.
   */
  fullWidth: _propTypes2.default.bool,

  /**
   * The direction that the text field divider expands from when the text field
   * in the date picker gains focus.
   */
  lineDirection: _propTypes2.default.oneOf(['left', 'center', 'right']),

  /**
   * An optional boolean if the time picker is current visible by dialog or inline.
   * If this is set, the `onVisibilityChange` function is required.
   */
  visible: (0, _controlled2.default)(_propTypes2.default.bool, 'onVisibilityChange', 'defaultVisible'),

  /**
   * An optional function to call when the date picker is opened in either a dialog, or
   * inline. The callback will include the next state.
   *
   * ```js
   * onVisibilityChange(!visible, e);
   * ```
   */
  onVisibilityChange: _propTypes2.default.func,

  /**
   * Boolean if the time picker is disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * Boolean if the dialog should be able to close if a keyboard user presses the escape key.
   */
  closeOnEsc: _propTypes2.default.bool,

  /**
   * If true the hover mode of the Time Picker is activated.
   * In hover mode no clicks are required to start selecting an hour
   * and the time mode switches automatically when a time was chosen.
   * When a minute is selected the chosen time is applied automatically.
   */
  hoverMode: _propTypes2.default.bool,

  /**
   * Boolean if the inline time picker's visibility should be animated.
   */
  animateInline: _propTypes2.default.bool,

  /**
   * Boolean if the time is required.
   *
   * @see {@link TextFields/TextField#required}
   */
  required: _propTypes2.default.bool,

  /**
   * @see {@link TextFields/TextField#block}
   */
  block: _TextField2.default.propTypes.block,

  /**
   * @see {@link TextFields/TextField#paddedBlock}
   */
  paddedBlock: _TextField2.default.propTypes.paddedBlock,

  /**
   * @see {@link TextFields/TextField#active}
   */
  active: _TextField2.default.propTypes.active,

  /**
   * @see {@link TextFields/TextField#error}
   */
  error: _TextField2.default.propTypes.error,

  /**
   * @see {@link TextFields/TextField#floating}
   */
  floating: _TextField2.default.propTypes.floating,

  /**
   * @see {@link TextFields/TextField#leftIconStateful}
   */
  leftIconStateful: _TextField2.default.propTypes.leftIconStateful,

  /**
   * @see {@link TextFields/TextField#rightIcon}
   */
  rightIcon: _TextField2.default.propTypes.rightIcon,

  /**
   * @see {@link TextFields/TextField#rightIconStateful}
   */
  rightIconStateful: _TextField2.default.propTypes.rightIconStateful,

  /**
   * @see {@link TextFields/TextField#customSize}
   */
  customSize: _TextField2.default.propTypes.customSize,

  /**
   * @see {@link TextFields/TextField#errorText}
   */
  errorText: _TextField2.default.propTypes.errorText,

  /**
   * @see {@link TextFields/TextField#helpText}
   */
  helpText: _TextField2.default.propTypes.helpText,

  /**
   * @see {@link TextFields/TextField#helpOnFocus}
   */
  helpOnFocus: _TextField2.default.propTypes.helpOnFocus,

  /**
   * @see {@link TextFields/TextField#inlineIndicator}
   */
  inlineIndicator: _TextField2.default.propTypes.inlineIndicator,

  /**
   * Boolean if the Portal's functionality of rendering in a separate react tree should be applied
   * to the dialog.
   *
   * @see {@link Helpers/Portal}
   */
  portal: _propTypes2.default.bool,

  /**
   * An optional DOM Node to render the dialog into. The default is to render as the first child
   * in the `body`.
   */
  renderNode: _propTypes2.default.object,

  /**
   * Boolean if the dialog should be rendered as the last child of the `renderNode` or `body` instead
   * of the first.
   */
  lastChild: _propTypes2.default.bool,

  /**
   * @see {@link Dialogs/DialogContainer#disableScrollLocking}
   */
  disableScrollLocking: _propTypes2.default.bool,

  /**
   * Boolean if the TimePicker should be read only. This will prevent the user from opening the picker
   * and only display the current date in the text field.
   */
  readOnly: _propTypes2.default.bool,

  isOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `visible` instead'),
  initiallyOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `defaultVisible` instead'),
  initialTimeMode: (0, _deprecated2.default)(_propTypes2.default.oneOf(['hour', 'minute']), 'Use `defaultTimeMode` instead')
};
TimePickerContainer.defaultProps = {
  animateInline: true,
  defaultTimeMode: 'hour',
  icon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'access_time'
  ),
  DateTimeFormat: _DateTimeFormat2.default, // eslint-disable-line object-shorthand
  locales: typeof window !== 'undefined' ? window.navigator.userLanguage || window.navigator.language : 'en-US',
  okLabel: 'Ok',
  okPrimary: true,
  cancelLabel: 'Cancel',
  cancelPrimary: true,
  closeOnEsc: true,
  disableScrollLocking: false,
  'aria-label': 'Select a time',
  hoverMode: false
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._setContainer = function (container) {
    _this2._container = container;
  };

  this._closeOnEsc = function (e) {
    if ((e.which || e.keyCode) === _keyCodes.ESC) {
      _this2._handleCancelClick(e);
    }
  };

  this._handleOutsideClick = function (e) {
    if (_this2._container && !_this2._container.contains(e.target)) {
      _this2._handleCancelClick(e);
    }
  };

  this._toggleOpen = function (e) {
    if (_this2.props.disabled || _this2.props.readOnly) {
      return;
    }

    var visible = !(typeof _this2.props.isOpen !== 'undefined' ? _this2.props.isOpen : (0, _getField2.default)(_this2.props, _this2.state, 'visible'));

    if (_this2.props.onVisibilityChange) {
      _this2.props.onVisibilityChange(visible, e);
    }

    if (typeof _this2.props.isOpen === 'undefined' && typeof _this2.props.visible === 'undefined') {
      var hoverMode = _this2.props.hoverMode;


      if (hoverMode) {
        _this2._setTimeMode('hour');
      }

      _this2.setState({ visible: visible });
    }
  };

  this._setTimeMode = function (timeMode) {
    if (_this2.state.timeMode === timeMode) {
      return;
    }

    _this2.setState({ timeMode: timeMode });
  };

  this._setTempTime = function (time) {
    if (_this2.state.tempTime === time) {
      return;
    }

    _this2.setState(_extends({ tempTime: time }, _this2._getTimeParts(time, _this2.props)));
  };

  this._handleKeyDown = function (e) {
    (0, _handleKeyboardAccessibility2.default)(e, _this2._toggleOpen, true, true);

    if ((e.which || e.keyCode) === _keyCodes.TAB && _this2.state.active) {
      _this2.setState({ active: false });
    }
  };

  this._handleOkClick = function (e) {
    var _props3 = _this2.props,
        onVisibilityChange = _props3.onVisibilityChange,
        onChange = _props3.onChange,
        DateTimeFormat = _props3.DateTimeFormat,
        locales = _props3.locales;

    var value = new Date(_this2.state.tempTime);
    if (onChange) {
      onChange((0, _formatTime2.default)(DateTimeFormat, locales, value), value, e);
    }

    if (onVisibilityChange) {
      onVisibilityChange(false, e);
    }

    var state = _extends({ time: value }, _this2._getTimeParts(value, _this2.props));
    if (typeof _this2.props.value === 'undefined') {
      state.value = value;
    }

    if (typeof _this2.props.isOpen === 'undefined' && typeof _this2.props.visible === 'undefined') {
      state.visible = false;
    }

    _this2.setState(state);
  };

  this._handleCancelClick = function (e) {
    if (_this2.props.onVisibilityChange) {
      _this2.props.onVisibilityChange(false, e);
    }

    var state = void 0;
    if (typeof _this2.props.isOpen === 'undefined' && typeof _this2.props.visible === 'undefined') {
      state = { visible: false };
    }

    var value = (0, _getField2.default)(_this2.props, _this2.state, 'value');
    if (value) {
      state = _extends({}, state, _this2._getTimeParts(value, _this2.props));
      state.tempTime = _this2.state.time;
    }

    if (state) {
      _this2.setState(state);
    }
  };
};

exports.default = TimePickerContainer;
//# sourceMappingURL=TimePickerContainer.js.map