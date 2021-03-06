'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _keyCodes = require('../constants/keyCodes');

var _isFormPartRole = require('../utils/isFormPartRole');

var _isFormPartRole2 = _interopRequireDefault(_isFormPartRole);

var _calcPageOffset = require('../utils/Positioning/calcPageOffset');

var _calcPageOffset2 = _interopRequireDefault(_calcPageOffset);

var _isValidClick = require('../utils/EventUtils/isValidClick');

var _isValidClick2 = _interopRequireDefault(_isValidClick);

var _touches = require('../utils/EventUtils/touches');

var _captureNextEvent = require('../utils/EventUtils/captureNextEvent');

var _captureNextEvent2 = _interopRequireDefault(_captureNextEvent);

var _calculateHypotenuse = require('../utils/NumberUtils/calculateHypotenuse');

var _calculateHypotenuse2 = _interopRequireDefault(_calculateHypotenuse);

var _Ink = require('./Ink');

var _Ink2 = _interopRequireDefault(_Ink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `InkContainer` is used for holding the list of inks that get created by touch,
 * click, or keyboard focus.
 *
 * If the container element has the `type="submit"` attribute, the ink will also be
 * triggered when the user presses enter anywhere in the form.
 */
var InkContainer = function (_PureComponent) {
  _inherits(InkContainer, _PureComponent);

  function InkContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InkContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InkContainer.__proto__ || Object.getPrototypeOf(InkContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = { inks: [] }, _this.createInk = function (pageX, pageY) {
      _this._createInk(pageX, pageY);
      _this._removeTimeout = setTimeout(function () {
        _this._removeTimeout = null;
        _this._removeInk();
      }, _this.props.transitionOverlap);
    }, _this.focus = function () {
      _this._getKeyboardContainer().focus();
    }, _this._createInk = function (pageX, pageY) {
      var _this$_inkContainer = _this._inkContainer,
          offsetWidth = _this$_inkContainer.offsetWidth,
          offsetHeight = _this$_inkContainer.offsetHeight;


      var x = void 0;
      var y = void 0;
      if (typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
        var pageOffset = (0, _calcPageOffset2.default)(_this._inkContainer);

        x = pageX - pageOffset.left;
        y = pageY - pageOffset.top;
      } else {
        x = offsetWidth / 2;
        y = offsetHeight / 2;
      }

      var r = Math.max((0, _calculateHypotenuse2.default)(x, y), (0, _calculateHypotenuse2.default)(offsetWidth - x, y), (0, _calculateHypotenuse2.default)(offsetWidth - x, offsetHeight - y), (0, _calculateHypotenuse2.default)(x, offsetHeight - y));

      var ink = {
        left: x - r,
        top: y - r,
        size: r * 2,
        key: Date.now()
      };

      var inks = _this.state.inks.slice();
      inks.push(ink);
      _this.setState({ inks: inks });
    }, _this._removeInk = function () {
      var inks = _this.state.inks.slice();
      inks.pop();

      _this.setState({ inks: inks });
    }, _this._getKeyboardContainer = function () {
      if (_this._container.classList.contains('md-text-field-container')) {
        return _this._container.querySelector('.md-text-field');
      }

      return _this._container;
    }, _this._setContainers = function (group) {
      if (group !== null) {
        _this._inkContainer = (0, _reactDom.findDOMNode)(group);
        _this._container = _this._inkContainer.parentElement;

        if (_this._container) {
          _this._initOrRemoveEvents(_this.props);
        }
      }
    }, _this._initOrRemoveEvents = function (props) {
      var keyboardDiff = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var mouseDiff = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var touchDiff = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      var mouseDisabled = _this._isListenerDisabled('mouse', props.disabledInteractions);
      var touchDisabled = _this._isListenerDisabled('touch', props.disabledInteractions);
      var keyboardDisabled = _this._isListenerDisabled('keyboard', props.disabledInteractions);

      if (keyboardDiff) {
        var fn = (keyboardDisabled ? 'remove' : 'add') + 'EventListener';
        _this._getKeyboardContainer()[fn]('focus', _this._handleFocus);
        _this._getKeyboardContainer()[fn]('keydown', _this._handleKeyDown);

        if (_this._container.getAttribute('type') === 'submit') {
          window[fn]('submit', _this._handleSubmit);
        }

        if (mouseDiff) {
          _this._container[(!mouseDisabled ? 'add' : 'remove') + 'EventListener']('mousedown', _this._stopPropagationToFocus);
        }

        if (touchDiff) {
          (0, _touches.setTouchEvent)(!touchDisabled, _this._container, 'start', _this._stopPropagationToFocus);
        }
      }

      if (mouseDiff) {
        var _fn = (mouseDisabled ? 'remove' : 'add') + 'EventListener';
        _this._container[_fn]('mousedown', _this._handleMouseDown);
        _this._container[_fn]('mouseup', _this._handleMouseUp);
      }

      if (touchDiff) {
        (0, _touches.setTouchEvent)(!touchDisabled, _this._container, 'start', _this._handleTouchStart);
        (0, _touches.setTouchEvent)(!touchDisabled, _this._container, 'end', _this._handleTouchEnd);
      }
    }, _this._maybeDelayClick = function () {
      if (!_this.props.waitForInkTransition) {
        return;
      }

      (0, _captureNextEvent2.default)('click', _this._container);
    }, _this._handleRemove = function () {
      if (_this._clicked && _this.props.waitForInkTransition) {
        // For some reason if the click event will make the ink unmount, it will no longer
        // have a debug id in the TransitionGroup and it displays a warning. Adding a 1ms timeout
        // fixes that issue... It only happens on an actual click instead of an enter click.
        setTimeout(function () {
          _this._container.click();
        }, 1);
      }

      _this._clicked = false;
    }, _this._handleKeyDown = function (e) {
      var key = e.which || e.keyCode;
      var enter = key === _keyCodes.ENTER;
      var space = key === _keyCodes.SPACE;
      // Don't trigger ink when enter key is pressed and the target has an input inside of it (SelectField)
      if (space || enter && !(0, _isFormPartRole2.default)(e.target) && !e.target.querySelector('input')) {
        _this._clicked = true;
        _this.createInk();
        _this._maybeDelayClick();
      }
    }, _this._handleFocus = function () {
      if (_this._clicked) {
        return;
      }

      _this._createInk();
      _this._getKeyboardContainer().addEventListener('blur', _this._handleBlur);
    }, _this._handleBlur = function () {
      _this._getKeyboardContainer().removeEventListener('blur', _this._handleBlur);
      _this._removeInk();
    }, _this._handleMouseDown = function (e) {
      _this._clicked = true;
      if (!(0, _isValidClick2.default)(e) || _this._skipNextMouse) {
        _this._skipNextMouse = false;
        return;
      }

      _this._mouseLeave = false;
      _this._container.addEventListener('mouseleave', _this._handleMouseLeave);
      _this._createInk(e.pageX, e.pageY);
    }, _this._handleMouseLeave = function () {
      _this._container.removeEventListener('mouseleave', _this._handleMouseLeave);
      _this._mouseLeave = true;
      _this._removeInk();
    }, _this._handleMouseUp = function () {
      if (_this._mouseLeave) {
        return;
      }

      _this._maybeDelayClick();
      _this._container.removeEventListener('mouseleave', _this._handleMouseLeave);
      _this._removeInk();
    }, _this._handleTouchStart = function (e) {
      _this._aborted = false;
      _this._clicked = true;
      _this._skipNextMouse = true;
      (0, _touches.addTouchEvent)(window, 'move', _this._handleTouchMove);

      var _e$changedTouches$ = e.changedTouches[0],
          pageX = _e$changedTouches$.pageX,
          pageY = _e$changedTouches$.pageY;

      _this._createInk(pageX, pageY);
    }, _this._handleTouchMove = function () {
      (0, _touches.removeTouchEvent)(window, 'move', _this._handleTouchMove);
      var lastInk = _this.state.inks[_this.state.inks.length - 1];
      if (!lastInk || Date.now() > lastInk.key + 200) {
        _this._aborted = false;
        return;
      }

      var inks = _this.state.inks.slice();
      var index = inks.length - 1;

      var abortedInk = Object.assign({}, lastInk, { aborted: true });
      inks.splice(index, 1, abortedInk);

      _this._aborted = true;
      _this.setState({ inks: inks }, _this._removeInk);
    }, _this._handleTouchEnd = function () {
      _this._skipNextMouse = true;

      if (_this._aborted) {
        return;
      } else {
        (0, _touches.removeTouchEvent)(window, 'move', _this._handleTouchMove);
      }

      _this._removeInk();
    }, _this._handleSubmit = function (e) {
      if (document.activeElement === _this._container || !e.target.contains(_this._container)) {
        return;
      }

      _this._maybeDelayClick();
      _this.createInk();
    }, _this._stopPropagationToFocus = function (e) {
      switch (e.type) {
        case 'touchstart':
          (0, _touches.addTouchEvent)(window, 'end', _this._stopPropagationToFocus, { capture: true });
          break;
        case 'touchend':
          (0, _touches.removeTouchEvent)(window, 'end', _this._stopPropagationToFocus, { capture: true });
          break;
        case 'mousedown':
          window.addEventListener('mouseup', _this._stopPropagationToFocus, true);
          break;
        case 'mouseup':
          window.removeEventListener('mouseup', _this._stopPropagationToFocus, true);
          break;
        default:
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InkContainer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var di = this.props.disabledInteractions;
      var ndi = nextProps.disabledInteractions;

      if (di === ndi || !this._container) {
        return;
      }

      var mouseDisabledDiff = this._isListenerDisabledDiff('mouse', di, ndi);
      var touchDisabledDiff = this._isListenerDisabledDiff('touch', di, ndi);
      var keyboardDisabledDiff = this._isListenerDisabledDiff('keyboard', di, ndi);
      this._initOrRemoveEvents(nextProps, keyboardDisabledDiff, mouseDisabledDiff, touchDisabledDiff);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._removeTimeout) {
        clearTimeout(this._removeTimeout);
      }

      if (this._container) {
        this._initOrRemoveEvents({ disabledInteractions: ['keyboard', 'mouse', 'touch'] });
        this._getKeyboardContainer().removeEventListener('blur', this._handleBlur);
      }
    }

    /**
     * Creates an ink from pageX and pageY coordinates. These values should either come
     * from the `changedTouches` or just the base event (if clicked). These coordinates
     * are used to position the ink correctly in the container from touch/click point.
     * If either value is undefined, an ink will be created from the center of the
     * container.
     *
     * It will also automatically remove the ink.
     *
     * @param {number} pageX - The page x coordinate of the click or touch event.
     * @param {number} pageY - The page y coordinate of the click or touch event.
     */


    /**
     * Focuses the main element.
     */

  }, {
    key: '_isListenerDisabledDiff',
    value: function _isListenerDisabledDiff(interaction, disabledInteractions, nextDisabledInteractions) {
      var i = disabledInteractions.indexOf(interaction);
      var ni = nextDisabledInteractions.indexOf(interaction);

      return i < 0 && ni >= 0 || i >= 0 && ni < 0;
    }
  }, {
    key: '_isListenerDisabled',
    value: function _isListenerDisabled(interaction, disabledInteractions) {
      return disabledInteractions && disabledInteractions.indexOf(interaction) !== -1;
    }

    /**
     * Creates an ink from pageX and pageY coordinates. These values should either come
     * from the `changedTouches` or just the base event (if clicked). These coordinates
     * are used to position the ink correctly in the container from touch/click point.
     * If either value is undefined, an ink will be created from the center of the
     * container.
     *
     * @param {number} pageX - The page x coordinate of the click or touch event.
     * @param {number} pageY - The page y coordinate of the click or touch event.
     */


    /**
     * Removes an ink from the container.
     */


    /**
     * Gets the container for any keyboard events. This will almost always be the main element,
     * but text fields will need to be the input itself.
     */


    /**
     * Sets the ink container and the main container from the ref callback. When the component
     * is mounting, the keyboard, mouse, and keyboard events will be initialized.
     */


    /**
     * This function will either add or remove the event listeners for creating inks.
     *
     * @param {Object} props - The current props to use for figuring out if the events should
     *    be added or removed.
     * @param {bool=} keyboardDiff - Boolean if there was a difference between the current props and either
     *    the previous or next props for the keyboard interactions being disabled.
     * @param {bool=} mouseDiff - Boolean if there was a difference between the current props and either
     *    the previous or next props for the mouse interactions being disabled.
     * @param {bool=} touchDiff - Boolean if there was a difference between the current props and either
     *    the previous or next props for the touch interactions being disabled.
     */


    /**
     * If a form was submitted that contains the container of the ink and the current focus element
     * is not the container, trigger an ink effect.
     *
     * The current focus check is added so that two inks are not created.
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          inkStyle = _props.inkStyle,
          inkClassName = _props.inkClassName,
          transitionOverlap = _props.transitionOverlap,
          transitionEnterTimeout = _props.transitionEnterTimeout,
          transitionLeaveTimeout = _props.transitionLeaveTimeout,
          pulse = _props.pulse;

      var inks = this.state.inks.map(function (props) {
        return _react2.default.createElement(_Ink2.default, _extends({}, props, {
          pulse: pulse,
          style: inkStyle,
          className: inkClassName,
          onRemove: _this2._handleRemove,
          transitionOverlap: transitionOverlap,
          transitionEnterTimeout: transitionEnterTimeout,
          transitionLeaveTimeout: transitionLeaveTimeout
        }));
      });

      return _react2.default.createElement(
        _TransitionGroup2.default,
        {
          component: 'div',
          style: style,
          className: (0, _classnames2.default)('md-ink-container', className),
          ref: this._setContainers
        },
        inks
      );
    }
  }]);

  return InkContainer;
}(_react.PureComponent);

InkContainer.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  inkStyle: _propTypes2.default.object,
  inkClassName: _propTypes2.default.string,
  waitForInkTransition: _propTypes2.default.bool,
  disabledInteractions: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['keyboard', 'mouse', 'touch'])),
  transitionOverlap: _propTypes2.default.number.isRequired,
  transitionEnterTimeout: _propTypes2.default.number.isRequired,
  transitionLeaveTimeout: _propTypes2.default.number.isRequired,
  pulse: _propTypes2.default.bool
};
InkContainer.defaultProps = {
  transitionOverlap: 150,
  transitionEnterTimeout: 450,
  transitionLeaveTimeout: 300
};
exports.default = InkContainer;
//# sourceMappingURL=InkContainer.js.map