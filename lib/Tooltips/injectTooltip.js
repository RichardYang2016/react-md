'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getDisplayName = require('../utils/StringUtils/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _TooltipContainer = require('./TooltipContainer');

var _TooltipContainer2 = _interopRequireDefault(_TooltipContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Takes any component and injects a tooltip container as a prop. The tooltip container
 * will add event listeners for touch, mouse, and keyboard events so that a tooltip will appear
 * in the ComposedComponent.
 *
 * If the `tooltipLabel` prop is omitted, the tooltip and event listeners will not
 * be included.
 *
 * ```js
 * @param {function} ComposedComponent the component to compose with the tooltip functionality.
 * @return {function} the ComposedComponent with a tooltip.
 * ```
 */
exports.default = function (ComposedComponent) {
  var _class, _temp2;

  return _temp2 = _class = function (_PureComponent) {
    _inherits(TooltipedComponent, _PureComponent);

    function TooltipedComponent() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, TooltipedComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TooltipedComponent.__proto__ || Object.getPrototypeOf(TooltipedComponent)).call.apply(_ref, [this].concat(args))), _this), _this._composed = null, _this.getComposedComponent = function () {
        return _this._composed;
      }, _this._setComposedComponent = function (component) {
        _this._composed = component;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Gets the composed component as a ref. This is useful if you need to access the ref of the
     * composed component instead of the `injectTooltip` HOC to use some publicly accessible methods.
     *
     * ```js
     * <SomeTooltippedComponent
     *   ref={tooltipHOC => {
     *     tooltipHOC.getComposedComponent().focus();
     *   }}
     * />
     * ```
     *
     * > NOTE: This can be `null`, so make sure to do a null check before using.
     */


    _createClass(TooltipedComponent, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            tooltipLabel = _props.tooltipLabel,
            tooltipDelay = _props.tooltipDelay,
            tooltipPosition = _props.tooltipPosition,
            tooltipStyle = _props.tooltipStyle,
            tooltipClassName = _props.tooltipClassName,
            tooltipContainerStyle = _props.tooltipContainerStyle,
            tooltipContainerClassName = _props.tooltipContainerClassName,
            tooltipTransitionEnterTimeout = _props.tooltipTransitionEnterTimeout,
            tooltipTransitionLeaveTimeout = _props.tooltipTransitionLeaveTimeout,
            props = _objectWithoutProperties(_props, ['tooltipLabel', 'tooltipDelay', 'tooltipPosition', 'tooltipStyle', 'tooltipClassName', 'tooltipContainerStyle', 'tooltipContainerClassName', 'tooltipTransitionEnterTimeout', 'tooltipTransitionLeaveTimeout']);

        if (tooltipLabel) {
          props.tooltip = _react2.default.createElement(_TooltipContainer2.default, {
            key: 'tooltipContainer',
            label: tooltipLabel,
            delay: tooltipDelay,
            position: tooltipPosition,
            enterTimeout: tooltipTransitionEnterTimeout,
            leaveTimeout: tooltipTransitionLeaveTimeout,
            style: tooltipContainerStyle,
            className: tooltipContainerClassName,
            tooltipStyle: tooltipStyle,
            tooltipClassName: tooltipClassName
          });
        }

        props.ref = this._setComposedComponent;

        return _react2.default.createElement(ComposedComponent, props);
      }
    }]);

    return TooltipedComponent;
  }(_react.PureComponent), _class.displayName = (0, _getDisplayName2.default)(ComposedComponent, 'Tooltip'), _class.propTypes = {
    /**
     * An optional style to apply to the tooltip container.
     */
    tooltipContainerStyle: _propTypes2.default.object,

    /**
     * An optional className to apply to the tooltip container.
     */
    tooltipContainerClassName: _propTypes2.default.string,

    /**
     * An optional style to apply to the tooltip itself.
     */
    tooltipStyle: _propTypes2.default.object,

    /**
     * An optional className to the tooltip itself.
     */
    tooltipClassName: _propTypes2.default.string,

    /**
     * The tooltip to display. If omitted, the `tooltip` prop will not be injected.
     */
    tooltipLabel: _propTypes2.default.node,

    /**
     * The amount of delay before the tooltip will appear on hover, touch, or keyboard focus.
     */
    tooltipDelay: _TooltipContainer2.default.propTypes.delay,

    /**
     * The position that the tooltip should appear related to the composed component.
     */
    tooltipPosition: _TooltipContainer2.default.propTypes.position,

    /**
     * The transition time for the tooltip appearing.
     */
    tooltipTransitionEnterTimeout: _TooltipContainer2.default.propTypes.enterTimeout,

    /**
     * The transition time for the tooltip disappearing.
     */
    tooltipTransitionLeaveTimeout: _TooltipContainer2.default.propTypes.leaveTimeout
  }, _temp2;
};
//# sourceMappingURL=injectTooltip.js.map