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

var _addDate = require('../utils/dates/addDate');

var _addDate2 = _interopRequireDefault(_addDate);

var _isSameDay = require('../utils/dates/isSameDay');

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _DateTimeFormat = require('../utils/DateUtils/DateTimeFormat');

var _DateTimeFormat2 = _interopRequireDefault(_DateTimeFormat);

var _Collapse = require('../Helpers/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _getDeprecatedIcon = require('../FontIcons/getDeprecatedIcon');

var _getDeprecatedIcon2 = _interopRequireDefault(_getDeprecatedIcon);

var _TextField = require('../TextFields/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _DialogContainer = require('../Dialogs/DialogContainer');

var _DialogContainer2 = _interopRequireDefault(_DialogContainer);

var _DatePicker = require('./DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable new-cap,no-shadow */


/**
 * The `DatePickerContainer` component is a wrapper for the main `DatePicker` component
 * to manage the state and _logic_ for rendering the `DatePicker`. This component will
 * either render inline or in a `Dialog` depending if the `inline` prop is set to `true`.
 *
 * NOTE: This component is actually exported as `DatePicker` when using the `import { member }` syntax.
 * The following two lines are equivalent:
 *
 * ```js
 * import { DatePicker } from 'react-md/lib/Pickers';
 * import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
 * ```
 */
var DatePickerContainer = function (_PureComponent) {
  _inherits(DatePickerContainer, _PureComponent);

  function DatePickerContainer(props) {
    _classCallCheck(this, DatePickerContainer);

    var _this = _possibleConstructorReturn(this, (DatePickerContainer.__proto__ || Object.getPrototypeOf(DatePickerContainer)).call(this, props));

    _initialiseProps.call(_this);

    var date = void 0;
    var value = void 0;
    var defaultValue = props.defaultValue,
        DateTimeFormat = props.DateTimeFormat,
        locales = props.locales,
        formatOptions = props.formatOptions,
        minDate = props.minDate,
        maxDate = props.maxDate;


    if (typeof props.value !== 'undefined') {
      date = _this._getDate(props.value);
    } else if (defaultValue) {
      date = _this._getDate(defaultValue);
      value = typeof defaultValue === 'string' ? defaultValue : DateTimeFormat(locales, formatOptions).format(defaultValue);
    } else {
      date = new Date();
      value = '';
    }

    date = _this._validateDateRange(date, minDate, maxDate);

    var defaultCalendarDate = typeof props.initialCalendarDate !== 'undefined' ? props.initialCalendarDate : props.defaultCalendarDate;
    var calendarTempDate = date;
    if (typeof defaultCalendarDate !== 'undefined' && !props.value && !props.defaultValue) {
      calendarTempDate = _this._getDate(defaultCalendarDate);
      date = calendarTempDate;
    } else if (calendarTempDate === null) {
      calendarTempDate = new Date();
      date = new Date();
    }

    var visible = typeof props.initiallyOpen !== 'undefined' ? props.initiallyOpen : !!props.defaultVisible;

    _this.state = {
      value: value,
      visible: visible,
      calendarDate: date,
      calendarTempDate: calendarTempDate,
      calendarMode: props.initialCalendarMode || props.defaultCalendarMode
    };
    return _this;
  }

  _createClass(DatePickerContainer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = nextProps.value,
          minDate = nextProps.minDate,
          maxDate = nextProps.maxDate;

      var minEqual = (0, _isSameDay2.default)(this.props.minDate, minDate);
      var maxEqual = (0, _isSameDay2.default)(this.props.maxDate, maxDate);
      if (this.props.value !== value || !minEqual || !maxEqual) {
        var calendarDate = this.state.calendarDate;

        if (typeof value !== 'undefined') {
          calendarDate = this._getDate(value);
        }

        calendarDate = this._validateDateRange(calendarDate, minDate, maxDate);

        if (!(0, _isSameDay2.default)(this.state.calendarDate, calendarDate)) {
          this.setState({ calendarDate: calendarDate, calendarTempDate: calendarDate });
        }
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
    key: '_getDate',
    value: function _getDate(value) {
      if (value === '' || value === null) {
        return new Date();
      } else if (typeof value === 'string') {
        return new Date(value);
      }

      return value;
    }
  }, {
    key: '_getFormattedValue',


    /**
     * Gets the current value from the date picker as a formatted string.
     *
     * @param {Object} props? the props object to use.
     * @param {Object} state? the state object to use.
     * @return {String} a formatted date string or the empty string.
     */
    value: function _getFormattedValue(props, state) {
      var DateTimeFormat = props.DateTimeFormat,
          locales = props.locales,
          formatOptions = props.formatOptions;

      var value = (0, _getField2.default)(props, state, 'value');
      if (!value) {
        return '';
      } else if (value instanceof Date) {
        return DateTimeFormat(locales, formatOptions).format(new Date(value));
      } else {
        return value;
      }
    }

    /**
     * Attempts to validate the `calendarDate` in the state against the min and
     * max dates.
     *
     * This will return null if the current calendarDate is still within the range.
     *
     * @param {Date} calendarDate - The current calendar date to compare to.
     * @param {Date} minDate - An optional min date to compare to.
     * @param {Date} maxDate - An optional max date to compare to.
     * @return {Object} - The new state object with the updated calendarDate and
     *    calendarTempDate keys or null.
     */

  }, {
    key: '_validateDateRange',
    value: function _validateDateRange(calendarDate, minDate, maxDate) {
      var date = calendarDate;
      if (minDate && minDate > calendarDate) {
        date = new Date(minDate);
      }

      if (maxDate && maxDate < calendarDate) {
        date = new Date(maxDate);
      }

      return date;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          style = _props2.style,
          className = _props2.className,
          pickerStyle = _props2.pickerStyle,
          pickerClassName = _props2.pickerClassName,
          pickerHeaderClassName = _props2.pickerHeaderClassName,
          pickerContentClassName = _props2.pickerContentClassName,
          pickerFooterClassName = _props2.pickerFooterClassName,
          inputStyle = _props2.inputStyle,
          inputClassName = _props2.inputClassName,
          textFieldStyle = _props2.textFieldStyle,
          textFieldClassName = _props2.textFieldClassName,
          label = _props2.label,
          placeholder = _props2.placeholder,
          icon = _props2.icon,
          inline = _props2.inline,
          displayMode = _props2.displayMode,
          fullWidth = _props2.fullWidth,
          lineDirection = _props2.lineDirection,
          id = _props2.id,
          disabled = _props2.disabled,
          closeOnEsc = _props2.closeOnEsc,
          animateInline = _props2.animateInline,
          portal = _props2.portal,
          renderNode = _props2.renderNode,
          lastChild = _props2.lastChild,
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
          propNextIcon = _props2.nextIcon,
          propPreviousIcon = _props2.previousIcon,
          isOpen = _props2.isOpen,
          previousIconChildren = _props2.previousIconChildren,
          previousIconClassName = _props2.previousIconClassName,
          nextIconChildren = _props2.nextIconChildren,
          nextIconClassName = _props2.nextIconClassName,
          propValue = _props2.value,
          propVisible = _props2.visible,
          defaultValue = _props2.defaultValue,
          defaultVisible = _props2.defaultVisible,
          onChange = _props2.onChange,
          readOnly = _props2.readOnly,
          onVisibilityChange = _props2.onVisibilityChange,
          defaultCalendarDate = _props2.defaultCalendarDate,
          initialCalendarDate = _props2.initialCalendarDate,
          initiallyOpen = _props2.initiallyOpen,
          adjustMinWidth = _props2.adjustMinWidth,
          props = _objectWithoutProperties(_props2, ['style', 'className', 'pickerStyle', 'pickerClassName', 'pickerHeaderClassName', 'pickerContentClassName', 'pickerFooterClassName', 'inputStyle', 'inputClassName', 'textFieldStyle', 'textFieldClassName', 'label', 'placeholder', 'icon', 'inline', 'displayMode', 'fullWidth', 'lineDirection', 'id', 'disabled', 'closeOnEsc', 'animateInline', 'portal', 'renderNode', 'lastChild', 'block', 'paddedBlock', 'active', 'error', 'floating', 'required', 'leftIconStateful', 'rightIcon', 'rightIconStateful', 'customSize', 'errorText', 'helpText', 'helpOnFocus', 'inlineIndicator', 'disableScrollLocking', 'aria-label', 'nextIcon', 'previousIcon', 'isOpen', 'previousIconChildren', 'previousIconClassName', 'nextIconChildren', 'nextIconClassName', 'value', 'visible', 'defaultValue', 'defaultVisible', 'onChange', 'readOnly', 'onVisibilityChange', 'defaultCalendarDate', 'initialCalendarDate', 'initiallyOpen', 'adjustMinWidth']);

      var nextIcon = (0, _getDeprecatedIcon2.default)(nextIconClassName, nextIconChildren, propNextIcon);
      var previousIcon = (0, _getDeprecatedIcon2.default)(previousIconClassName, previousIconChildren, propPreviousIcon);
      var visible = typeof isOpen !== 'undefined' ? isOpen : (0, _getField2.default)(this.props, this.state, 'visible');

      var picker = _react2.default.createElement(_DatePicker2.default, _extends({}, this.state, props, {
        nextIcon: nextIcon,
        previousIcon: previousIcon,
        icon: !!icon,
        inline: inline,
        style: pickerStyle,
        className: pickerClassName,
        headerClassName: pickerHeaderClassName,
        contentClassName: pickerContentClassName,
        footerClassName: pickerFooterClassName,
        displayMode: displayMode,
        onCancelClick: this._handleCancelClick,
        onOkClick: this._handleOkClick,
        changeCalendarMode: this._changeCalendarMode,
        onPreviousClick: this._previousMonth,
        onNextClick: this._nextMonth,
        onCalendarDateClick: this._setCalendarTempDate,
        onCalendarYearClick: this._setCalendarTempYear
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
            renderNode: renderNode,
            portal: portal,
            lastChild: lastChild,
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
          value: this._getFormattedValue(this.props, this.state),
          readOnly: true
        }),
        content
      );
    }
  }]);

  return DatePickerContainer;
}(_react.PureComponent);

DatePickerContainer.propTypes = {
  /**
   * An id for the text field in the date picker. This is require for a11y.
   */
  id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),

  /**
   * An aria label for the dialog. This is required for a11y.
   */
  'aria-label': (0, _isRequiredForA11y2.default)(_propTypes2.default.string),

  /**
   * An optional style to apply to the date picker's container.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the date picker's container.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the date picker.
   */
  pickerStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the date picker.
   */
  pickerClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to the header of date picker.
   */
  pickerHeaderClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to the content container of date picker.
   */
  pickerContentClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to the footer of date picker.
   */
  pickerFooterClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to the calendar container of date picker.
   */
  calendarClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to the year picker of date picker.
   */
  yearPickerClassName: _propTypes2.default.string,

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
   * An optional icon to display with the date picker.
   *
   * @see {@link TextFields/TextField#leftIcon}
   */
  icon: _propTypes2.default.node,

  /**
   * Boolean if the date picker is open by default.
   */
  defaultVisible: _propTypes2.default.bool,

  /**
   * An optional label to be displayed in the date picker's text
   * field.
   */
  label: _propTypes2.default.node,

  /**
   * An optional placeholder to be displayed in the date picker's text field.
   */
  placeholder: _propTypes2.default.string,

  /**
   * The value of the date picker. This will make the date picker
   * be a controlled component. This value should either be a
   * formatted date string or a date object.
   */
  value: (0, _controlled2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(Date)]), 'onChange', 'defaultValue'),

  /**
   * An optional default value to give for the date picker. This should
   * either be a formatted date string or a date object.
   */
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(Date)]),

  /**
   * An optional date to use when the calendar is opened for the first time.
   * If this is omitted, it will either be the `defaultValue`, `value`, or
   * today.
   */
  defaultCalendarDate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(Date)]),

  /**
   * An optional function to call when the selected date is changed
   * by hitting the OK button. The newly formatted date string,
   * the new Date object, and the change event will be given.
   *
   * `onChange(dateString, dateObject, event)`.
   */
  onChange: _propTypes2.default.func,

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
   * The label to use for the ok button on the date picker.
   */
  okLabel: _propTypes2.default.node.isRequired,

  /**
   * Boolean if the ok button should be styled with the primary color.
   */
  okPrimary: _propTypes2.default.bool,

  /**
   * The label to use for the cancel button on the date picker.
   */
  cancelLabel: _propTypes2.default.node.isRequired,

  /**
   * Boolean if the cancel button should be styled with the primary color.
   */
  cancelPrimary: _propTypes2.default.bool,

  /**
   * The initial mode to open the calendar in.
   */
  defaultCalendarMode: _propTypes2.default.oneOf(['calendar', 'year']),

  /**
   * The icon to use to display the previous month icon in the calendar.
   */
  previousIcon: _propTypes2.default.node,

  /**
   * The icon to use to display the next month icon in the calendar.
   */
  nextIcon: _propTypes2.default.node,

  /**
   * An optional min date to use for the date picker. This will prevent
   * any dates before this time to be chosen.
   */
  minDate: _propTypes2.default.instanceOf(Date),

  /**
   * An optional max date to use for the date picker. This will prevent
   * any dates after this time to be chosen.
   */
  maxDate: function maxDate(props, propName, component) {
    for (var _len = arguments.length, others = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      others[_key - 3] = arguments[_key];
    }

    var err = _propTypes2.default.instanceOf(Date).apply(undefined, [props, propName, component].concat(others));
    if (err || !props.minDate || !props[propName]) {
      return err;
    }

    var minDate = props.minDate,
        maxDate = props.maxDate;

    if (minDate > maxDate) {
      return new Error('The min date: \'' + minDate + '\' is greater than the max date: \'' + maxDate + '\'');
    }

    return null;
  },

  /**
   * Boolean if the date should automatically be selected when a user clicks
   * on a new date instead of making them hit the ok button.
   */
  autoOk: _propTypes2.default.bool,

  /**
   * The number of years to display.
   */
  yearsDisplayed: _propTypes2.default.number,

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
   * The DateTimeFormat options to apply to format the date.
   */
  formatOptions: _propTypes2.default.shape({
    weekday: _propTypes2.default.oneOf(['narrow', 'short', 'long']),
    era: _propTypes2.default.oneOf(['narrow', 'short', 'long']),
    year: _propTypes2.default.oneOf(['numeric', '2-digit']),
    month: _propTypes2.default.oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
    day: _propTypes2.default.oneOf(['numeric', '2-digit']),
    hour: _propTypes2.default.oneOf(['numeric', '2-digit']),
    minute: _propTypes2.default.oneOf(['numeric', '2-digit']),
    second: _propTypes2.default.oneOf(['numeric', '2-digit']),
    timeZoneName: _propTypes2.default.oneOf(['short', 'long'])
  }),

  /**
   * Boolean if the text field for the Date Picker should be displayed as full width.
   */
  fullWidth: _propTypes2.default.bool,

  /**
   * The direction that the text field divider expands from when the text field
   * in the date picker gains focus.
   */
  lineDirection: _propTypes2.default.oneOf(['left', 'center', 'right']),

  /**
   * An optional boolean if the time picker is current visible by dialog or inline.
   * If this is set, the `onOpenToggle` function is required.
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
   * Boolean if the DatePicker should be read only. This will prevent the user from opening the picker
   * and only display the current date in the text field.
   */
  readOnly: _propTypes2.default.bool,

  /**
   * The first day of week: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
   */
  firstDayOfWeek: _propTypes2.default.oneOf([0, 1, 2, 3, 4, 5, 6]),

  /**
   * True if weekends are to be greyed out.
   */
  disableWeekEnds: _propTypes2.default.bool,

  /**
   * True if dates from adjacent months should be shown in calendar.
   */
  showAllDays: _propTypes2.default.bool,

  /**
   * Boolean if the dates from adjacent months should be disabled. This will only
   * do something if the `showAllDays` prop is enabled as well.
   *
   * This is really only helpful if youd like the other days to appear, but not be
   * clickable until the user switches to that month.
   *
   * @see {@link #showAllDays}
   */
  disableOuterDates: _propTypes2.default.bool,

  /**
   * An optional className to apply to a date in calendar.
   */
  calendarDateClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to a date from an adjacent month in calendar. This will be applied
   * along with the `calendarDateClassName`.
   *
   * @see {@link #showAllDays}
   * @see {@link #calendarDateClassName}
   */
  calendarOuterDateClassName: _propTypes2.default.string,

  /**
   * An optional className to apply to the title in calendar header.
   */
  calendarTitleClassName: _propTypes2.default.string,

  /**
   * The DateTimeFormat options to apply to format the title in calendar header.
   */
  calendarTitleFormat: _propTypes2.default.shape({
    era: _propTypes2.default.oneOf(['narrow', 'short', 'long']),
    year: _propTypes2.default.oneOf(['numeric', '2-digit']),
    month: _propTypes2.default.oneOf(['numeric', '2-digit', 'narrow', 'short', 'long'])
  }),

  /**
   * An optional className to apply to a weekday in calendar header.
   */
  calendarWeekdayClassName: _propTypes2.default.string,

  /**
   * The DateTimeFormat option to apply to format a weekday in calendar header.
   */
  calendarWeekdayFormat: _propTypes2.default.oneOf(['narrow', 'short', 'long']),

  /**
   * @see {@link Dialogs/DialogContainer#disableScrollLocking}
   */
  disableScrollLocking: _propTypes2.default.bool,

  /**
   * Boolean if the dialog should be rendered as the last child of the `renderNode` or `body` instead
   * of the first.
   */
  lastChild: _propTypes2.default.bool,

  previousIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `previousIcon` prop instead'),
  previousIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `previousIcon` prop instead'),
  nextIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'use the `nextIcon` prop instead'),
  nextIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `nextIcon` prop instead'),
  adjustMinWidth: (0, _deprecated2.default)(_propTypes2.default.bool, 'No longer valid for a text field'),
  isOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `visible` instead'),
  initiallyOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `defaultVisible` instead'),
  initialCalendarDate: (0, _deprecated2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(Date)]), 'Use `defaultCalendarDate` instead'),
  initialCalendarMode: (0, _deprecated2.default)(_propTypes2.default.oneOf(['calendar', 'year']), 'Use `defaultCalendarMode` instead'),
  initialYearsDisplayed: (0, _deprecated2.default)(_propTypes2.default.number, 'Use `yearsDisplayed` instead. I have not implemented infinite loading years')
};
DatePickerContainer.defaultProps = {
  animateInline: true,
  previousIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'chevron_left'
  ),
  nextIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'chevron_right'
  ),
  autoOk: false,
  icon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'date_range'
  ),
  yearsDisplayed: 100,
  defaultCalendarMode: 'calendar',
  DateTimeFormat: _DateTimeFormat2.default, // eslint-disable-line object-shorthand
  locales: typeof window !== 'undefined' ? window.navigator.userLanguage || window.navigator.language : 'en-US',
  okLabel: 'Ok',
  okPrimary: true,
  cancelLabel: 'Cancel',
  cancelPrimary: true,
  closeOnEsc: true,
  disableScrollLocking: false,
  'aria-label': 'Pick a date'
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
      _this2.setState({ visible: visible });
    }
  };

  this._handleKeyDown = function (e) {
    (0, _handleKeyboardAccessibility2.default)(e, _this2._toggleOpen, true, true);

    if ((e.which || e.keyCode) === _keyCodes.TAB && _this2.state.active) {
      _this2.setState({ active: false });
    }
  };

  this._handleOkClick = function (e) {
    var _props3 = _this2.props,
        DateTimeFormat = _props3.DateTimeFormat,
        locales = _props3.locales,
        onChange = _props3.onChange,
        formatOptions = _props3.formatOptions,
        onVisibilityChange = _props3.onVisibilityChange;

    var value = DateTimeFormat(locales, formatOptions).format(_this2.state.calendarTempDate);
    if (onChange) {
      onChange(value, new Date(_this2.state.calendarTempDate), e);
    }

    if (onVisibilityChange) {
      onVisibilityChange(false, e);
    }

    var state = void 0;
    if (typeof _this2.props.value === 'undefined') {
      state = { value: value };
    }

    if (typeof _this2.props.visible === 'undefined' && typeof _this2.props.isOpen === 'undefined') {
      state = state || {};
      state.visible = false;
    }

    if (state) {
      _this2.setState(state);
    }
  };

  this._handleCancelClick = function (e) {
    var state = { calendarTempDate: _this2.state.calendarDate };
    if (typeof _this2.props.isOpen === 'undefined' && typeof _this2.props.isOpen === 'undefined') {
      state.visible = false;
    }

    if (_this2.props.onVisibilityChange) {
      _this2.props.onVisibilityChange(false, e);
    }

    _this2.setState(state);
  };

  this._changeCalendarMode = function (calendarMode) {
    if (_this2.state.calendarMode === calendarMode) {
      return;
    }

    _this2.setState({ calendarMode: calendarMode });
  };

  this._previousMonth = function () {
    var calendarDate = (0, _addDate2.default)(_this2.state.calendarDate, -1, 'M');
    _this2.setState({ calendarDate: calendarDate });
  };

  this._nextMonth = function () {
    var calendarDate = (0, _addDate2.default)(_this2.state.calendarDate, 1, 'M');
    _this2.setState({ calendarDate: calendarDate });
  };

  this._setCalendarTempDate = function (calendarTempDate) {
    var _props4 = _this2.props,
        autoOk = _props4.autoOk,
        DateTimeFormat = _props4.DateTimeFormat,
        locales = _props4.locales,
        onChange = _props4.onChange,
        formatOptions = _props4.formatOptions;


    var state = { calendarTempDate: calendarTempDate };
    if (autoOk) {
      var value = DateTimeFormat(locales, formatOptions).format(calendarTempDate);
      if (onChange) {
        onChange(value, new Date(calendarTempDate));
      }

      if (typeof _this2.props.value === 'undefined') {
        state.value = value;
      }

      _this2._timeout = setTimeout(function () {
        _this2._timeout = null;

        if (_this2.props.onVisibilityChange) {
          _this2.props.onVisibilityChange(false);
        }

        if (typeof _this2.props.visible === 'undefined' && typeof _this2.props.isOpen === 'undefined') {
          _this2.setState({ visible: false });
        }
      });
    }
    _this2.setState(state);
  };

  this._setCalendarTempYear = function (year) {
    var _state = _this2.state,
        calendarTempDate = _state.calendarTempDate,
        calendarDate = _state.calendarDate;

    if (calendarTempDate.getFullYear() === year) {
      return;
    }

    var _props5 = _this2.props,
        minDate = _props5.minDate,
        maxDate = _props5.maxDate;

    var nextDate = new Date(calendarDate.setFullYear(year));
    var nextTemp = new Date(calendarTempDate.setFullYear(year));

    if (minDate && nextTemp < minDate) {
      nextDate = new Date(minDate);
      nextTemp = new Date(minDate);
    }

    if (maxDate && nextTemp > maxDate) {
      nextDate = new Date(maxDate);
      nextTemp = new Date(maxDate);
    }

    _this2.setState({
      calendarDate: nextDate,
      calendarTempDate: nextTemp
    });
  };
};

exports.default = DatePickerContainer;
//# sourceMappingURL=DatePickerContainer.js.map