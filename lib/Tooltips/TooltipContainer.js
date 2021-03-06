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

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _keyCodes = require('../constants/keyCodes');

var _captureNextEvent = require('../utils/EventUtils/captureNextEvent');

var _captureNextEvent2 = _interopRequireDefault(_captureNextEvent);

var _touches = require('../utils/EventUtils/touches');

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getContainer(tooltip) {
  return tooltip.parentNode;
}

var TooltipContainer = function (_PureComponent) {
  _inherits(TooltipContainer, _PureComponent);

  function TooltipContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TooltipContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TooltipContainer.__proto__ || Object.getPrototypeOf(TooltipContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = { visible: false }, _this._delayedTimeout = null, _this._unlinkTarget = function () {
      var target = _this._target;
      if (target) {
        (0, _touches.removeTouchEvent)(target, 'start', _this._showTooltip);
        (0, _touches.removeTouchEvent)(target, 'end', _this._hideTooltip);
        target.removeEventListener('mouseover', _this._showTooltip);
        target.removeEventListener('mouseleave', _this._hideTooltip);
        target.removeEventListener('keyup', _this._handleKeyUp);
        target.removeEventListener('blur', _this._hideTooltip);
      }
    }, _this._setTarget = function () {
      var container = _this._container;
      var target = _this.props.target;


      _this._unlinkTarget();

      if (typeof target === 'function') {
        target = target(container, _this);
      }
      target = target ? (0, _reactDom.findDOMNode)(target) : container;
      _this._target = target || null;

      if (target) {
        (0, _touches.addTouchEvent)(target, 'start', _this._showTooltip);
        (0, _touches.addTouchEvent)(target, 'end', _this._hideTooltip);
        target.addEventListener('mouseover', _this._showTooltip);
        target.addEventListener('mouseleave', _this._hideTooltip);
        target.addEventListener('keyup', _this._handleKeyUp);
        target.addEventListener('blur', _this._hideTooltip);
      }
    }, _this._setContainers = function (span) {
      if (span) {
        _this._container = _this.props.container(span.parentNode, _this);
      }
    }, _this._stopContextMenu = function (e) {
      e.preventDefault();
      window.removeEventListener('contextmenu', _this._stopContextMenu, true);
      (0, _captureNextEvent2.default)('click');
      _this.setState({ visible: true });
    }, _this._showTooltip = function (e) {
      if (e.type === 'mouseover' && _this._touched) {
        return;
      }

      if (e.type === 'touchstart') {
        _this._touched = true;

        window.addEventListener('contextmenu', _this._stopContextMenu, true);
        return;
      }

      var delay = _this.props.delay;

      if (_this._delayedTimeout) {
        clearTimeout(_this._delayedTimeout);
      }

      if (delay) {
        _this._delayedTimeout = setTimeout(function () {
          _this._delayedTimeout = null;

          _this.setState({ visible: true });
        }, delay);
      } else {
        _this.setState({ visible: true });
      }
    }, _this._hideTooltip = function (e) {
      if (_this._delayedTimeout) {
        clearTimeout(_this._delayedTimeout);
      }

      if (e.type === 'mouseover' && _this._touched) {
        return;
      }

      _this.setState({ visible: false });
    }, _this._handleKeyUp = function (e) {
      if ((e.which || e.keyCode) === _keyCodes.TAB) {
        _this._showTooltip(e);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TooltipContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setTarget();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.target !== prevProps.target) {
        this._setTarget();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unlinkTarget();
      this._target = null;

      if (this._delayedTimeout) {
        clearTimeout(this._delayedTimeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var visible = this.state.visible;
      var _props = this.props,
          style = _props.style,
          className = _props.className,
          tooltipStyle = _props.tooltipStyle,
          tooltipClassName = _props.tooltipClassName,
          label = _props.label,
          position = _props.position,
          enterTimeout = _props.enterTimeout,
          leaveTimeout = _props.leaveTimeout;


      var tooltip = _react2.default.createElement(
        _Tooltip2.default,
        {
          key: 'tooltip',
          style: tooltipStyle,
          className: tooltipClassName,
          position: position,
          enterTimeout: enterTimeout,
          leaveTimeout: leaveTimeout
        },
        label
      );

      return _react2.default.createElement(
        _TransitionGroup2.default,
        {
          style: style,
          className: (0, _classnames2.default)('md-tooltip-container', className),
          component: 'div'
        },
        _react2.default.createElement('span', { ref: this._setContainers, 'aria-hidden': true }),
        visible ? tooltip : null
      );
    }
  }]);

  return TooltipContainer;
}(_react.PureComponent);

TooltipContainer.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  tooltipStyle: _propTypes2.default.object,
  tooltipClassName: _propTypes2.default.string,
  label: _propTypes2.default.node.isRequired,
  position: _Tooltip2.default.propTypes.position,
  delay: _propTypes2.default.number,
  enterTimeout: _Tooltip2.default.propTypes.enterTimeout,
  leaveTimeout: _Tooltip2.default.propTypes.leaveTimeout,
  /**
   * A function that returns a DOM element that will be used as the tooltip's container.
   * A ref to the tooltip's DOM element will be passed into the function.
   */
  container: _propTypes2.default.func,
  /**
   * A component/element the tooltip should be linked to,
   * or a function that returns such a component/element.
   * A ref to the tooltip's container will be passed into the function.
   *
   * By default the tooltip's container will be used as the target.
   */
  target: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func])
};
TooltipContainer.defaultProps = {
  container: getContainer,
  delay: 0
};
exports.default = TooltipContainer;
//# sourceMappingURL=TooltipContainer.js.map