'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _getDisplayName = require('../utils/StringUtils/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _InkContainer = require('./InkContainer');

var _InkContainer2 = _interopRequireDefault(_InkContainer);

var _inkContextTypes = require('./inkContextTypes');

var _inkContextTypes2 = _interopRequireDefault(_inkContextTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Takes any component and injects an ink container for having the Material Design Ink effect.
 *
 * The default triggers for an ink are:
 * - mouse down event
 * - touch start event
 * - keyboard focus
 * - form submit
 *
 * The form submit ink will only be triggered if the `ComposedComponent` has the attribute
 * `type="submit"`, the `ComposedComponent` is in a form, and the user hits the `enter` key
 * while not actively focusing the `ComposedComponent`.
 *
 * ```js
 * @param {function} ComposedComponent - The React Component to inject an `ink` prop into.
 * @return {function} a new React class rendering the `ComposedComponent` and adding an
 *    `ink` pop.
 * ```
 */
exports.default = function (ComposedComponent) {
  var _class, _temp2;

  return _temp2 = _class = function (_PureComponent) {
    _inherits(InkedComponent, _PureComponent);

    function InkedComponent() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, InkedComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InkedComponent.__proto__ || Object.getPrototypeOf(InkedComponent)).call.apply(_ref, [this].concat(args))), _this), _this.createInk = function (pageX, pageY) {
        if (_this._inkContainer && !_this.props.disabled && !_this.props.inkDisabled) {
          _this._inkContainer.createInk(pageX, pageY);
        }
      }, _this.focus = function () {
        if (_this.props.inkDisabled) {
          var composed = (0, _reactDom.findDOMNode)(_this._composed);
          if (composed) {
            composed.focus();
          }
        } else if (_this._inkContainer) {
          _this._inkContainer.focus();
        }
      }, _this.getComposedComponent = function () {
        return _this._composed;
      }, _this._setInkRef = function (inkContainer) {
        if (inkContainer) {
          _this._inkContainer = inkContainer;
        }
      }, _this._setComposedComponent = function (component) {
        _this._composed = component;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(InkedComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var ref = this.props.__SUPER_SECRET_REF__;
        // Emulate the ref callback...

        if (ref) {
          ref(this);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var ref = this.props.__SUPER_SECRET_REF__;
        // Emulate the ref callback...

        if (ref) {
          ref(null);
        }
      }

      /**
       * A publicly accessible way to manually create an ink. This can be used with the `refs`.
       * The ink can either be created by using the `pageX` and `pageY` from a click/touch event
       * or it will be created in the center of the `ComposedComponent`.
       *
       * ```js
       * <SomeInkedComponent ref={inkHOC => inkHOC.createInk()} />
       * ```
       *
       * @param {number=} pageX - An optional pageX of the click or touch event.
       * @param {number=} pageY - An optional pageY of the click or touch event.
       */


      /**
       * This will attempt to focus the composed component. If the component is disabled, nothing
       * will happen. If the `disabled` and `inkDisabled` props are not set to `true`, an ink will
       * also be created.
       *
       * ```js
       * <SomeInkedComponent ref={inkHOC => inkHOC.focus()} />
       * ```
       */


      /**
       * Gets the composed component as a ref. This is useful if you need to access the ref of the
       * composed component instead of the `injectInk` HOC to use some publicly accessible methods.
       *
       * ```js
       * <SomeInkedComponent
       *   ref={inkHOC => {
       *     inkHOC.getComposedComponent().focus();
       *   }}
       * />
       * ```
       */

    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            transitionOverlap = _props.inkTransitionOverlap,
            transitionEnterTimeout = _props.inkTransitionEnterTimeout,
            transitionLeaveTimeout = _props.inkTransitionLeaveTimeout,
            inkStyle = _props.inkStyle,
            inkClassName = _props.inkClassName,
            inkContainerStyle = _props.inkContainerStyle,
            inkContainerClassName = _props.inkContainerClassName,
            waitForInkTransition = _props.waitForInkTransition,
            disabledInteractions = _props.disabledInteractions,
            pulse = _props.pulse,
            propInkDisabled = _props.inkDisabled,
            __SUPER_SECRET_REF__ = _props.__SUPER_SECRET_REF__,
            props = _objectWithoutProperties(_props, ['inkTransitionOverlap', 'inkTransitionEnterTimeout', 'inkTransitionLeaveTimeout', 'inkStyle', 'inkClassName', 'inkContainerStyle', 'inkContainerClassName', 'waitForInkTransition', 'disabledInteractions', 'pulse', 'inkDisabled', '__SUPER_SECRET_REF__']);

        var inkDisabled = (0, _getField2.default)(this.props, this.context, 'inkDisabled');
        var inkDisabledInteractions = typeof disabledInteractions !== 'undefined' ? disabledInteractions : this.context.inkDisabledInteractions;

        if (!(props.disabled || inkDisabled)) {
          props.ink = _react2.default.createElement(_InkContainer2.default, {
            ref: this._setInkRef,
            key: 'ink-container',
            pulse: pulse,
            style: inkContainerStyle,
            className: inkContainerClassName,
            inkStyle: inkStyle,
            inkClassName: inkClassName,
            disabledInteractions: inkDisabledInteractions,
            transitionOverlap: transitionOverlap,
            transitionEnterTimeout: transitionEnterTimeout,
            transitionLeaveTimeout: transitionLeaveTimeout,
            waitForInkTransition: waitForInkTransition
          });
        }

        props.ref = this._setComposedComponent;

        return _react2.default.createElement(ComposedComponent, props);
      }
    }]);

    return InkedComponent;
  }(_react.PureComponent), _class.displayName = (0, _getDisplayName2.default)(ComposedComponent, 'Ink'), _class.propTypes = {
    /**
     * An optional style to apply to each ink that gets generated.
     */
    inkStyle: _propTypes2.default.object,

    /**
     * An optional className to apply to each ink that gets generated.
     */
    inkClassName: _propTypes2.default.string,

    /**
     * An optional style to apply to the ink's container.
     */
    inkContainerStyle: _propTypes2.default.object,

    /**
     * An optional className to apply to the ink's container.
     */
    inkContainerClassName: _propTypes2.default.string,

    /**
     * Boolean if the composed component or the ink is disabled.
     */
    disabled: _propTypes2.default.bool,

    /**
     * Boolean if only the ink is disabled for the composed component.
     */
    inkDisabled: _propTypes2.default.bool,

    /**
     * The time (in ms) that the enter and leave transitions for the ink should overlap.
     * This really just allows for a more _fluid_ looking ink when something is quickly
     * touched or clicked by having it fade out while growing.
     */
    inkTransitionOverlap: _propTypes2.default.number.isRequired,

    /**
     * The transition time for the ink to be considered fully entered. This should really
     * map up to whatever value you set for `$md-ink-enter-transition-time`.
     */
    inkTransitionEnterTimeout: _propTypes2.default.number.isRequired,

    /**
     * The transition time for the ink to be considered fully leaved (left?). This should really
     * map up to whatever value you set for `$md-ink-leave-transition-time`.
     */
    inkTransitionLeaveTimeout: _propTypes2.default.number.isRequired,

    /**
     * Boolean if the `ComposedComponent`'s click event only after the ink has finished transitioning
     * in and out. This is really only to get a more _fluid_ looking click event when clicking on
     * the `ComposedComponent` ends up taking it out of the view. (ex: Closing a Dialog).
     */
    waitForInkTransition: _propTypes2.default.bool,

    /**
     * An optional array of interactions that can be disabled for the ink. This is a *very* limited
     * use case where `Switches` needed the ink disabled only when using a mouse.
     */
    disabledInteractions: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['keyboard', 'mouse', 'touch'])),

    /**
     * Boolean if the ink should do a pulse animation while focused. This was enabled by default in
     * previous versions.
     */
    pulse: _propTypes2.default.bool,

    /**
     * When using inked components in a `TransitionGroup`, the ref callback is not actually invoked.
     * This is a little _hack_ to get it to work by not using `ref`, but this name.
     */
    __SUPER_SECRET_REF__: _propTypes2.default.func
  }, _class.defaultProps = {
    inkTransitionOverlap: 150,
    inkTransitionEnterTimeout: 450,
    inkTransitionLeaveTimeout: 300
  }, _class.contextTypes = _inkContextTypes2.default, _temp2;
};
//# sourceMappingURL=injectInk.js.map