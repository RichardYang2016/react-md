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

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _keyCodes = require('../constants/keyCodes');

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _isValidClick = require('../utils/EventUtils/isValidClick');

var _isValidClick2 = _interopRequireDefault(_isValidClick);

var _touches = require('../utils/EventUtils/touches');

var _calculateValueDistance = require('../utils/NumberUtils/calculateValueDistance');

var _calculateValueDistance2 = _interopRequireDefault(_calculateValueDistance);

var _isWithinStep = require('../utils/NumberUtils/isWithinStep');

var _isWithinStep2 = _interopRequireDefault(_isWithinStep);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _SliderLabel = require('./SliderLabel');

var _SliderLabel2 = _interopRequireDefault(_SliderLabel);

var _Track = require('./Track');

var _Track2 = _interopRequireDefault(_Track);

var _TextField = require('../TextFields/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `Slider` component is used to let users select a value from a continuous
 * or discrete range of values by moving the slider thumb.
 *
 * When the user has finished dragging the Slider or increments the value by using
 * the edit field/keyboard arrows, the value will be rounded to the nearest `step`.
 */
var Slider = function (_PureComponent) {
  _inherits(Slider, _PureComponent);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _initialiseProps.call(_this);

    var min = props.min,
        max = props.max,
        step = props.step;

    var scale = Math.abs(max - min) / step;

    var value = typeof props.value !== 'undefined' ? props.value : props.defaultValue;

    if (typeof value === 'undefined') {
      value = min;
    }

    var distance = _this._calcDistance(value, min, max);
    var thumbLeft = _this._calcLeft(distance);
    var trackFillWidth = distance + '%';

    if (typeof props.value !== 'undefined') {
      value = undefined;
    }

    var trackWidth = void 0;
    if (props.label && !props.editable && !props.leftIcon && !props.rightIcon) {
      trackWidth = '100%';
    }

    _this.state = {
      value: value,
      scale: scale,
      distance: distance,
      thumbLeft: thumbLeft,
      trackWidth: trackWidth,
      trackFillWidth: trackFillWidth,
      active: false,
      dragging: false,
      maskInked: false
    };
    _this._dragAdded = false;
    return _this;
  }

  _createClass(Slider, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          leftIcon = _props.leftIcon,
          rightIcon = _props.rightIcon,
          label = _props.label,
          min = _props.min,
          max = _props.max,
          step = _props.step,
          value = _props.value;

      if (value !== nextProps.value) {
        var distance = this._calcDistance(nextProps.value, nextProps.min, nextProps.max);
        this.setState({ distance: distance, trackFillWidth: distance + '%', thumbLeft: this._calcLeft(distance) });
      }

      if (leftIcon !== nextProps.leftIcon || rightIcon !== nextProps.rightIcon || label !== nextProps.label) {
        this._calcTrackWidth(nextProps);
      }

      if (min !== nextProps.min || max !== nextProps.max || step !== nextProps.step) {
        this.setState({ scale: Math.abs(nextProps.max - nextProps.min) / nextProps.step });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _state = this.state,
          active = _state.active,
          manualIncrement = _state.manualIncrement;

      var fn = window[(active ? 'add' : 'remove') + 'EventListener'];
      if (active !== prevState.active) {
        fn('click', this._blurOnOutsideClick);

        if (active) {
          this._focusThumb();
        }
      }

      var addDrag = active && !manualIncrement;
      fn = window[(addDrag ? 'add' : 'remove') + 'EventListener'];
      if (this._dragAdded !== addDrag) {
        fn('mousemove', this._handleDragMove);
        fn('mouseup', this._handleDragEnd);
        (0, _touches.setTouchEvent)(addDrag, window, 'move', this._handleDragMove);
        (0, _touches.setTouchEvent)(addDrag, window, 'end', this._handleDragEnd);

        this._dragAdded = addDrag;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var rm = window.removeEventListener;
      rm('click', this._blurOnOutsideClick);
      rm('mousemove', this._handleMouseMove);
      rm('mouseup', this._handleMouseUp);
      (0, _touches.removeTouchEvent)(window, 'move', this._handleDragMove);
      (0, _touches.removeTouchEvent)(window, 'end', this._handleDragEnd);

      if (this._inkTimeout) {
        clearTimeout(this._inkTimeout);
      }

      if (this._focusTimeout) {
        clearTimeout(this._focusTimeout);
      }
    }

    /**
     * Gets the `left` position for the thumb based on the value given.
     *
     * @param {number} value - The current value.
     * @return {string} the `calc` string.
     */

  }, {
    key: '_calcLeft',
    value: function _calcLeft(value) {
      return 'calc(' + value + '% - 6px)';
    }
  }, {
    key: '_calcDistance',
    value: function _calcDistance(value, min, max) {
      return Math.max(0, Math.min(100, (value - min) / (max - min) * 100));
    }

    /**
     * Checks if a classList does not contain all the *bad* class names.
     *
     * @param {function} classList - The classList to check.
     * @return {Boolean} true if the classList does not contain any of the *bad* class names.
     */

  }, {
    key: '_isValidClassList',
    value: function _isValidClassList(classList) {
      var invalid = false;
      ['md-slider-label', 'md-slider-ind', 'md-icon'].some(function (cl) {
        invalid = classList.contains(cl);
        return invalid;
      });

      return !invalid;
    }
  }, {
    key: '_isInTextField',
    value: function _isInTextField(e) {
      var className = e.target.className;

      // SVG's className is an object instead of a string

      return typeof className.match === 'function' && className.match(/text-field/);
    }

    /**
     * Checks if the target is within the text field container.
     *
     * @param {Object} target - The event target.
     * @return {Boolean} true if the target is in the text field.
     */


    /**
     * Updates the slider's thumb position and the slider's track fill width based
     * on the thumb's current x position on the screen.
     *
     * The slider distance will be *normalized* when:
     *  - The user does a quick jump
     *  - The user stops dragging with the mouse
     *  - The user drops dragging with touch
     *
     * If the position is not *normalized*, the `onDragChange` prop will be called
     * with the new distance percentage, the value, and the move event.
     *
     * The `onChange` function will always be called.
     *
     * @param {Object} e - The current event to extract an x location from
     * @param {bool} normalize - Boolean if the distance should be normalized
     *    to the current scale of the slider.
     */


    /**
     * This will either allow a user to start dragging the slider or quickly
     * jump to a new value on the slider if the slider is not disabled.
     *
     * This will handle the `touchstart` and `mousedown` events.
     *
     * @param {Object} e - The touchstart or mousedown event.
     */


    /**
     * This will set the active state of the slider to false if the user
     * clicks outside of the slider's container.
     *
     * @param {Object} e - The window's click event.
     */


    /**
     * Updates the slider with the `step` prop and calls the `onChange`
     * function with the new value.
     *
     * @param {number} incrementedValue - The newly incremented value of the slider.
     * @param {Object} e - Either the text field's change event, mouse down event, or
     *    touch start event.
     * @param {bool} disableTransition - Boolean if the jump's transition should be disabled.
     */


    /**
     * This will increment the Slider's value by the `step` prop. If the left or
     * right key arrow is pressed.
     *
     * @param {Object} e - the keydown event.
     */


    /**
     * This function will animate the discrete Slider's ink if it gains focus
     * by a tab event.
     *
     * @param {Object} e - the key up event.
     */


    /**
     * For some reason the width of the track gets set to 0 if the `Slider` has a label and
     * does not include the `leftIcon`, `rightIcon`, and is not `editable` OR it is
     * `editable` and does not include the `leftIcon`. All other cases the width works
     * correctly.
     *
     * This function just checks these things, and sets the width accordingly.
     */


    /**
     * The ink for a Discrete slider is only visible for a short time on initial
     * focus. This function will handle the in/out transitions.
     */


    /**
     * This is a helper function for focusing the Slider's thumb component. There
     * is a short delay because the body sometimes gets focused immediately after
     * if there is no timeout..
     */

  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          dragging = _state2.dragging,
          active = _state2.active,
          thumbLeft = _state2.thumbLeft,
          trackFillWidth = _state2.trackFillWidth,
          maskInked = _state2.maskInked,
          trackWidth = _state2.trackWidth,
          scale = _state2.scale,
          distance = _state2.distance;

      var _props2 = this.props,
          id = _props2.id,
          min = _props2.min,
          max = _props2.max,
          disabled = _props2.disabled,
          className = _props2.className,
          trackStyle = _props2.trackStyle,
          trackClassName = _props2.trackClassName,
          thumbStyle = _props2.thumbStyle,
          thumbClassName = _props2.thumbClassName,
          discreteValueStyle = _props2.discreteValueStyle,
          discreteValueClassName = _props2.discreteValueClassName,
          label = _props2.label,
          editable = _props2.editable,
          step = _props2.step,
          inputWidth = _props2.inputWidth,
          leftIcon = _props2.leftIcon,
          rightIcon = _props2.rightIcon,
          discrete = _props2.discrete,
          discreteTicks = _props2.discreteTicks,
          tickWidth = _props2.tickWidth,
          valuePrecision = _props2.valuePrecision,
          propValue = _props2.value,
          onChange = _props2.onChange,
          onDragChange = _props2.onDragChange,
          discreteInkTransitionTime = _props2.discreteInkTransitionTime,
          stepPrecision = _props2.stepPrecision,
          props = _objectWithoutProperties(_props2, ['id', 'min', 'max', 'disabled', 'className', 'trackStyle', 'trackClassName', 'thumbStyle', 'thumbClassName', 'discreteValueStyle', 'discreteValueClassName', 'label', 'editable', 'step', 'inputWidth', 'leftIcon', 'rightIcon', 'discrete', 'discreteTicks', 'tickWidth', 'valuePrecision', 'value', 'onChange', 'onDragChange', 'discreteInkTransitionTime', 'stepPrecision']);

      var value = (0, _getField2.default)(this.props, this.state);
      var rightChildren = rightIcon;
      if (editable) {
        rightChildren = _react2.default.createElement(_TextField2.default, {
          id: id + '-editor',
          ref: this._setField,
          type: 'number',
          value: value,
          inputClassName: 'md-slider-editor',
          style: { width: inputWidth },
          onChange: this._handleTextFieldChange,
          step: step
        });
      }

      return _react2.default.createElement(
        'div',
        _extends({}, props, {
          ref: this._setNode,
          className: (0, _classnames2.default)('md-slider-container', className, {
            'md-pointer--hover': !disabled
          }),
          onMouseDown: this._handleDragStart,
          onTouchStart: this._handleDragStart
        }),
        _react2.default.createElement(
          _SliderLabel2.default,
          { htmlFor: id },
          label
        ),
        _react2.default.createElement('input', {
          id: id,
          type: 'range',
          className: 'md-slider-input',
          readOnly: true,
          min: min,
          max: max,
          value: value,
          disabled: disabled
        }),
        leftIcon,
        _react2.default.createElement(_Track2.default, {
          ref: this._setTrack,
          style: Object.assign({}, trackStyle, { width: trackWidth }),
          className: (0, _classnames2.default)(trackClassName, {
            'md-slider-track--ind-left': leftIcon,
            'md-slider-track--ind-right': rightIcon
          }),
          thumbStyle: thumbStyle,
          thumbClassName: thumbClassName,
          discreteValueStyle: discreteValueStyle,
          discreteValueClassName: discreteValueClassName,
          active: active,
          dragging: dragging,
          disabled: disabled,
          thumbLeft: thumbLeft,
          trackFillWidth: trackFillWidth,
          on: !disabled && distance > 0,
          off: distance === 0,
          maskInked: maskInked,
          onThumbKeyUp: this._handleKeyUp,
          onThumbKeyDown: this._handleKeyDown,
          onThumbFocus: this._handleFocus,
          discrete: discrete,
          tickWidth: tickWidth,
          discreteTicks: discreteTicks,
          valuePrecision: valuePrecision,
          step: step,
          scale: scale,
          value: value
        }),
        rightChildren
      );
    }
  }]);

  return Slider;
}(_react.PureComponent);

Slider.propTypes = {
  /**
   * An id to use for the `Slider`. This is required if the `label` prop
   * is defined.
   */
  id: function id(props, propName, component) {
    for (var _len = arguments.length, others = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      others[_key - 3] = arguments[_key];
    }

    if (typeof props.label === 'undefined') {
      return _propTypes2.default.string.apply(_propTypes2.default, [props, propName, component].concat(others));
    }

    return (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])).apply(undefined, [props, propName, component].concat(others));
  },

  /**
   * An optional style to apply to the slider's container.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the slider's container.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the slider's thumb.
   */
  thumbStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the slider's thumb.
   */
  thumbClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the slider's track.
   */
  trackStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the slider's track.
   */
  trackClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the slider's track fill.
   */
  trackFillStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the slider's track fill.
   */
  trackFillClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to a discrete slider's value.
   */
  discreteValueStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to a discrete slider's value.
   */
  discreteValueClassName: _propTypes2.default.string,

  /**
   * The default value for the slider. This number must be between the min and max values if
   * defined. If this is undefined, it's value will be set to the min value.
   */
  defaultValue: _propTypes2.default.number,

  /**
   * The min value for the slider. This value **must** be less than the `max` value.
   */
  min: function min(props, propName, component) {
    for (var _len2 = arguments.length, others = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      others[_key2 - 3] = arguments[_key2];
    }

    var _PropTypes$number;

    var err = (_PropTypes$number = _propTypes2.default.number).isRequired.apply(_PropTypes$number, [props, propName, component].concat(others));
    if (!err) {
      var min = props[propName];
      var name = void 0;
      if (min > props.value) {
        name = 'value';
      } else if (typeof props.defaultValue !== 'undefined' && min > props.defaultValue) {
        name = 'defaultValue';
      }

      if (name) {
        err = new Error('The \'' + propName + '\' prop must be less than or equal to the \'' + name + '\' prop for the \'' + component + '\' but ' + ('received: \'min: ' + min + '\' and \'' + name + ': ' + props[name] + '\''));
      }
    }

    return err;
  },

  /**
   * The max value for the slider. This value **must** be greater than the `min` value.
   */
  max: function max(props, propName, component) {
    for (var _len3 = arguments.length, others = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
      others[_key3 - 3] = arguments[_key3];
    }

    var _PropTypes$number2;

    var err = (_PropTypes$number2 = _propTypes2.default.number).isRequired.apply(_PropTypes$number2, [props, propName, component].concat(others));
    if (!err) {
      var max = props[propName];
      var name = void 0;
      if (max < props.value) {
        name = 'value';
      } else if (max < props.defaultValue) {
        name = 'defaultValue';
      }

      if (name) {
        err = new Error('The \'' + propName + '\' prop must be greater than or equal to the \'' + name + '\' prop for the \'' + component + '\' but ' + ('received: \'' + propName + ': ' + max + '\' and \'' + name + ': ' + props[name] + '\''));
      }
    }

    return err;
  },

  /**
   * Boolean if the slider is disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * An optional value for the slider. This will make the component controlled
   * and require the `onChange` function.
   */
  value: (0, _controlled2.default)(_propTypes2.default.number, 'onChange'),

  /**
   * This is called when the slider's value gets updated. The value can be updated
   * by one of the following:
   *
   * - Clicking a section of the slider
   * - Dragging the slider with the mouse
   * - Touching a section of the slider.
   * - Dragging the slider with touch
   * - Using the text field to update the value either by typing or incrementing
   * - Using the left or right arrow keys to increment/decrement the value.
   *
   * The callback for this function is as follows:
   *
   * ```js
   * onChange(value, event);
   * ```
   *
   * where the event can either be:
   * - a touch start event
   * - a touch move event
   * - a touch end event
   * - a mouse down event
   * - a mouse move event
   * - a mouse up event
   * - a key up event
   * - a key down event
   */
  onChange: _propTypes2.default.func,

  /**
   * This is only called when the user is dragging the slider with either
   * the mouse or touch. Probably not really useful. It just includes the
   * new drag percentage while the `onChange` does not.
   *
   * The callback for this function is defined as:
   *
   * ```js
   * onDragChange(dragPercentage, value, (touchMove || mouseMove) event);
   * ```
   */
  onDragChange: _propTypes2.default.func,

  /**
   * An optional function to call when the slider's container has
   * the mousedown event.
   */
  onMouseDown: _propTypes2.default.func,

  /**
   * An optional function to call when the slider's container has
   * the touchstart event.
   */
  onTouchStart: _propTypes2.default.func,

  /**
   * An optional icon or letter to place to the left of the slider.
   * if you want to use a non-font icon or a letter, use the `md-slider-ind`
   * className on your element.
   */
  leftIcon: _propTypes2.default.element,

  /**
   * An optional icon or letter to place to the right of the slider.
   * if you want to use a non-font icon or a letter, use the `md-slider-ind`
   * className on your element.
   *
   * > NOTE: This can not be used if the `editable` prop is true.
   */
  rightIcon: _propTypes2.default.element,

  /**
   * An optional label to display above the slider. If this prop
   * is set, then an `id` must also be given.
   */
  label: _propTypes2.default.node,

  /**
   * The incremental amount when the user hits left or right with the
   * keyboard arrows, or the user hits the up or down buttons in the
   * editable number text field. This number must be a number between
   * 0 and 1 or a whole number above 1.
   */
  step: function step(props, propName, component) {
    for (var _len4 = arguments.length, others = Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
      others[_key4 - 3] = arguments[_key4];
    }

    var _PropTypes$number3;

    var err = (_PropTypes$number3 = _propTypes2.default.number).isRequired.apply(_PropTypes$number3, [props, propName, component].concat(others));
    if (!err) {
      var step = props[propName];
      if (step <= 0) {
        err = new Error('The \'' + propName + '\' for the \'' + component + '\' must be a number greater than 0. The ' + ('current value is \'' + step + '\'.'));
      } else {
        var valueDefined = typeof props.value !== 'undefined';
        var defaultDefined = typeof props.defaultValue !== 'undefined';
        var value = props.value;
        if (!valueDefined) {
          value = defaultDefined ? props.defaultValue : props.min;
        }

        var name = void 0;
        if (!(0, _isWithinStep2.default)(value, step)) {
          if (valueDefined) {
            name = 'value';
          } else if (defaultDefined) {
            name = 'defaultValue';
          } else {
            name = 'min';
          }
        }

        if (name) {
          err = new Error('The \'' + name + '\' prop on \'' + component + '\' should be a number divisible by the ' + ('\'' + propName + '\' prop. The current value is \'' + props[name] + '\' and the \'' + propName + '\' ') + ('is \'' + step + '\'.'));
        }
      }
    }

    return err;
  },

  /**
   * Boolean if the Slider should be editable. This will place a number text field
   * to the right of the slider. If this prop is set to `true`, the `rightIcon`
   * prop can not be set.
   */
  editable: function editable(props, propName, component) {
    for (var _len5 = arguments.length, others = Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
      others[_key5 - 3] = arguments[_key5];
    }

    var _PropTypes$bool;

    if (typeof props[propName] === 'undefined') {
      return null;
    }

    var err = (_PropTypes$bool = _propTypes2.default.bool).isRequired.apply(_PropTypes$bool, [props, propName, component].concat(others));
    if (!err && typeof props.rightIcon !== 'undefined') {
      err = new Error('The \'' + component + '\' is unable to be \'editable\' and include a \'rightIcon\'.');
    }

    return err;
  },

  /**
   * The width for the number text field when the Slider is editable.
   */
  inputWidth: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,

  /**
   * Boolean if the slider should be discrete. This will update the slider to include a
   * _balloon_ with the current value inside. It will also not allow the `Slider` to be
   * editable.
   */
  discrete: function discrete(props, propName, component) {
    for (var _len6 = arguments.length, others = Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
      others[_key6 - 3] = arguments[_key6];
    }

    if (typeof props[propName] === 'undefined') {
      return null;
    }

    var err = _propTypes2.default.bool.apply(_propTypes2.default, [props, propName, component].concat(others));
    if (!err && typeof props.editable !== 'undefined') {
      err = new Error('The \'' + component + '\' cannot be \'discrete\' and \'editable\'. Please choose one.');
    }

    return err;
  },

  /**
   * The width of each tick for a discrete slider with ticks. This can either be a number
   * which gets converted to `px`, or a valid CSS unit.
   */
  tickWidth: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,

  /**
   * This is number divisible by the total number of values included in the Slider. Every
   * value that is divisible by this number will include a tick mark. It is common recommended
   * to have this equal to the `step` prop.
   *
   * This prop is completely optional.
   */
  discreteTicks: function discreteTicks(props, propName, component) {
    for (var _len7 = arguments.length, others = Array(_len7 > 3 ? _len7 - 3 : 0), _key7 = 3; _key7 < _len7; _key7++) {
      others[_key7 - 3] = arguments[_key7];
    }

    if (typeof props[propName] === 'undefined') {
      return null;
    }

    var err = _propTypes2.default.number.apply(_propTypes2.default, [props, propName, component].concat(others));
    if (!err) {
      var min = props.min,
          max = props.max,
          step = props.step;

      var range = Math.abs(max - min);

      if (range / props[propName] % 1 !== 0) {
        err = new Error('The \'' + propName + '\' must be a number divisible by the range set by the \'min\' and ' + ('\'max\' props. The current range is \'' + range + '\' by including the min: \'' + min + '\' and ') + ('max: \'' + max + '\' values. The current value of \'' + propName + '\' is \'' + props[propName] + '\'.'));
      } else if (props[propName] % step !== 0) {
        err = new Error('The \'step\' prop must be a number divisible by the \'' + propName + '\'. It is common to have ' + ('them as the same value. The current \'step\' is \'' + step + '\' and the \'' + propName + '\' is \'' + props[propName] + '\'.'));
      }
    }

    return err;
  },

  /**
   * The transition time for a discrete Slider's keyboard focus ink. This should match the
   * `md-slider-discrete-ink-transition-time` value in your SCSS. This is used because
   * the ink is only visible temporarily for a discrete slider when keyboard focusing.
   */
  discreteInkTransitionTime: _propTypes2.default.number.isRequired,

  /**
   * The precision that the value should be rounded to when the Slider is updated. This
   * needs to be a whole number greater than or equal to 0.
   */
  valuePrecision: function valuePrecision(props, propName, component) {
    for (var _len8 = arguments.length, others = Array(_len8 > 3 ? _len8 - 3 : 0), _key8 = 3; _key8 < _len8; _key8++) {
      others[_key8 - 3] = arguments[_key8];
    }

    var _PropTypes$number4;

    var err = (_PropTypes$number4 = _propTypes2.default.number).isRequired.apply(_PropTypes$number4, [props, propName, component].concat(others));
    if (!err) {
      var precision = props[propName];

      if (precision % 1 !== 0 || precision < 0) {
        err = new Error('The \'' + propName + '\' must be a positive whole number or 0 on the \'' + component + '\'. ' + ('The current \'' + propName + '\' is \'' + precision + '\''));
      }
    }

    return err;
  },

  stepPrecision: (0, _deprecated2.default)(_propTypes2.default.number, 'Use `step` and `valuePrecision` instead')
};
Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  inputWidth: 40,
  tickWidth: 6,
  discreteInkTransitionTime: 300,
  valuePrecision: 0
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._isTextField = function (target) {
    return _this2._field && _this2._field.contains(target);
  };

  this._updatePosition = function (e, normalize) {
    var x = (e.changedTouches ? e.changedTouches[0] : e).clientX;
    var scale = _this2.state.scale;
    var _props3 = _this2.props,
        onChange = _props3.onChange,
        onDragChange = _props3.onDragChange,
        min = _props3.min,
        max = _props3.max,
        step = _props3.step;

    var _calculateValueDistan = (0, _calculateValueDistance2.default)(x, _this2._track.offsetWidth, _this2._track.getBoundingClientRect().left, scale, step, min, max, normalize),
        value = _calculateValueDistan.value,
        distance = _calculateValueDistan.distance;

    var isNewValue = (0, _getField2.default)(_this2.props, _this2.state, 'value') !== value;
    if (onChange && isNewValue) {
      onChange(value, e);
    }

    if (!normalize && onDragChange && (isNewValue || _this2.state.distance !== distance)) {
      onDragChange(distance, value, e);
    }

    var state = {
      active: true,
      distance: distance,
      manualIncrement: false,
      dragging: !normalize,
      thumbLeft: _this2._calcLeft(distance),
      trackFillWidth: distance + '%'
    };

    if (e.type === 'touchend' || e.type === 'mousedown') {
      state.maskInked = false;
    }

    if (typeof _this2.props.value === 'undefined') {
      state.value = value;
    }

    _this2.setState(state);
  };

  this._handleDragStart = function (e) {
    if (e.type === 'mousedown' && _this2.props.onMouseDown) {
      _this2.props.onMouseDown(e);
    } else if (e.type === 'touchstart' && _this2.props.onTouchStart) {
      _this2.props.onTouchStart(e);
    }

    if (_this2.props.disabled || e.type === 'mousedown' && !(0, _isValidClick2.default)(e, 'mousedown') || _this2._isInTextField(e)) {
      return;
    }

    var classList = e.target.classList;

    var isDiscreteValue = classList.contains('md-slider-discrete-value');
    if (classList.contains('md-slider-thumb') || isDiscreteValue) {
      // Prevents text highlighting while dragging.
      if (e.type.match(/mouse/)) {
        e.preventDefault();
      }
      _this2.setState({ dragging: true, active: true, manualIncrement: false, maskInked: false });
    } else if (!_this2._isTextField(e.target) && _this2._isValidClassList(classList)) {
      _this2._updatePosition(e, true);
    }
  };

  this._setNode = function (node) {
    _this2._node = (0, _reactDom.findDOMNode)(node);
  };

  this._setTrack = function (track) {
    _this2._track = (0, _reactDom.findDOMNode)(track);
  };

  this._setField = function (field) {
    _this2._field = (0, _reactDom.findDOMNode)(field);
    _this2._calcTrackWidth(_this2.props);
  };

  this._handleDragMove = function (e) {
    if (_this2.props.disabled || !_this2.state.dragging) {
      return;
    }

    // Stops the text highlighting while dragging
    if (e.type.match(/mouse/)) {
      e.preventDefault();
    }

    _this2._updatePosition(e, false);
  };

  this._handleDragEnd = function (e) {
    if (!_this2.state.dragging || _this2.props.disabled || e.type === 'mouseup' && !(0, _isValidClick2.default)(e)) {
      return;
    }

    _this2._updatePosition(e, true);
  };

  this._blurOnOutsideClick = function (e) {
    if (_this2.state.dragging && !_this2.state.manualIncrement || _this2.props.disabled) {
      return;
    }

    if (!_this2._node.contains(e.target)) {
      _this2.setState({ active: false, maskInked: false });
    }
  };

  this._handleIncrement = function (incrementedValue, e, disableTransition) {
    var _props4 = _this2.props,
        onChange = _props4.onChange,
        min = _props4.min,
        max = _props4.max,
        discrete = _props4.discrete;


    var value = Math.max(min, Math.min(max, incrementedValue));
    var distance = _this2._calcDistance(value, min, max);

    if (onChange) {
      onChange(value, e);
    }

    var state = {
      distance: distance,
      manualIncrement: true,
      thumbLeft: _this2._calcLeft(distance),
      trackFillWidth: distance + '%',
      dragging: Math.abs(_this2.state.distance - distance) < 2 && disableTransition
    };

    if (typeof _this2.props.value === 'undefined') {
      state.value = value;
    }

    if (e.type === 'keydown' && !discrete) {
      state.maskInked = true;
    }

    _this2.setState(state);
  };

  this._handleTextFieldChange = function (newValue, e) {
    _this2._handleIncrement(newValue, e, false);
  };

  this._handleKeyDown = function (e) {
    var key = e.which || e.keyCode;
    var _props5 = _this2.props,
        min = _props5.min,
        max = _props5.max,
        step = _props5.step,
        disabled = _props5.disabled;

    if (disabled) {
      return;
    }

    if (key === _keyCodes.TAB) {
      _this2.setState({ active: false, maskInked: false });
      return;
    } else if (key !== _keyCodes.LEFT && key !== _keyCodes.RIGHT) {
      return;
    }

    var nextValue = (0, _getField2.default)(_this2.props, _this2.state, 'value');
    nextValue = Math.max(min, Math.min((key === _keyCodes.LEFT ? -step : step) + nextValue, max));

    _this2._handleIncrement(nextValue, e, true);
  };

  this._handleKeyUp = function (e) {
    if ((e.which || e.keyCode) !== _keyCodes.TAB) {
      return;
    }

    if (_this2.props.discrete) {
      _this2._animateDiscreteInk();
    }

    _this2.setState({ maskInked: true });
  };

  this._handleFocus = function () {
    _this2.setState({ active: true });
  };

  this._calcTrackWidth = function (props) {
    var editable = props.editable,
        leftIcon = props.leftIcon,
        rightIcon = props.rightIcon,
        inputWidth = props.inputWidth,
        label = props.label;


    if (!label) {
      _this2.setState({ trackWidth: null });
      return;
    }

    var trackWidth = null;
    if (!leftIcon && !rightIcon && !editable) {
      trackWidth = '100%';
    } else if (_this2._field && editable && !leftIcon) {
      var cs = window.getComputedStyle(_this2._field);
      var pl = parseInt(cs.getPropertyValue('padding-left'), 10) || 0;
      var ml = parseInt(cs.getPropertyValue('margin-left'), 10) || 0;

      trackWidth = pl + ml + inputWidth;
    }

    if (trackWidth !== _this2.state.trackWidth) {
      _this2.setState({ trackWidth: trackWidth });
    }
  };

  this._animateDiscreteInk = function () {
    var wait = _this2.props.discreteInkTransitionTime;
    if (_this2._inkTimeout) {
      clearTimeout(_this2._inkTimeout);
    }

    _this2._inkTimeout = setTimeout(function () {
      _this2.setState({ leaving: true, maskInked: false });

      _this2._inkTimeout = setTimeout(function () {
        _this2._inkTimeout = null;
        _this2.setState({ leaving: false });
      }, wait);
    }, wait);
  };

  this._focusThumb = function () {
    if (_this2._focusTimeout) {
      clearTimeout(_this2._focusTimeout);
    }

    _this2._focusTimeout = setTimeout(function () {
      _this2._focusTimeout = null;
      if (!_this2._thumb) {
        _this2._thumb = _this2._node.querySelector('.md-slider-thumb');
      }

      _this2._thumb.focus();
    }, 100);
  };
};

exports.default = Slider;
//# sourceMappingURL=Slider.js.map