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

var _reactMotion = require('react-motion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `Collapse` component is used to animate a single child entering
 * or leaving. This uses the `react-motion` library to animate the height,
 * padding-top, and padding-bottom of an element when the `collapsed` prop
 * changes.
 */
var Collapse = function (_PureComponent) {
  _inherits(Collapse, _PureComponent);

  function Collapse(props) {
    _classCallCheck(this, Collapse);

    var _this = _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this, props));

    _this._setHeight = function (child) {
      if (_this._child && typeof _this._child.ref === 'function') {
        _this._child.ref(child);
      }

      var height = 0;
      var paddingTop = 0;
      var paddingBottom = 0;
      if (child !== null) {
        var node = (0, _reactDom.findDOMNode)(child);
        var cs = window.getComputedStyle(node);
        height = node.offsetHeight;
        paddingTop = parseInt(cs.getPropertyValue('padding-top'), 10);
        paddingBottom = parseInt(cs.getPropertyValue('padding-bottom'), 10);
      }

      height = Math.max(_this.props.minHeight, height);

      _this.setState({ height: height, paddingTop: paddingTop, paddingBottom: paddingBottom });
    };

    if (!props.collapsed) {
      _this.state = { initialOpen: true };
    } else {
      _this.state = {
        height: props.minHeight,
        paddingTop: 0,
        paddingBottom: 0
      };
    }
    return _this;
  }

  _createClass(Collapse, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.initialOpen && nextProps.collapsed) {
        this.setState({ initialOpen: false });
      }
    }
  }, {
    key: '_spring',
    value: function _spring(collapsed, initialOpen, value, config) {
      var min = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

      var nextValue = !collapsed ? Math.max(min, value) : min;
      if (initialOpen && !collapsed) {
        return nextValue;
      }

      return (0, _reactMotion.spring)(nextValue, config);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          height = _state.height,
          paddingTop = _state.paddingTop,
          paddingBottom = _state.paddingBottom,
          initialOpen = _state.initialOpen;
      var _props = this.props,
          children = _props.children,
          collapsed = _props.collapsed,
          defaultStyle = _props.defaultStyle,
          motionStyle = _props.style,
          springConfig = _props.springConfig,
          animate = _props.animate,
          minHeight = _props.minHeight;


      if (!animate) {
        return collapsed ? null : children;
      }

      return _react2.default.createElement(
        _reactMotion.Motion,
        {
          style: _extends({}, motionStyle, {
            height: this._spring(collapsed, initialOpen, height, springConfig, minHeight),
            paddingTop: this._spring(collapsed, initialOpen, paddingTop, springConfig),
            paddingBottom: this._spring(collapsed, initialOpen, paddingBottom, springConfig)
          }),
          defaultStyle: _extends({}, defaultStyle, {
            height: height,
            paddingTop: paddingTop,
            paddingBottom: paddingBottom
          })
        },
        function (style) {
          if (collapsed && !style.height) {
            return null;
          }

          var child = _react.Children.only(children);
          _this2._child = child;
          var nextStyle = child.props.style;
          if (collapsed && (!minHeight || style.height !== minHeight) || style.height !== height) {
            nextStyle = _extends({}, child.props.style, style, {
              overflow: 'hidden'
            });
          }
          return (0, _react.cloneElement)(child, {
            ref: !collapsed ? _this2._setHeight : null,
            style: nextStyle
          });
        }
      );
    }
  }]);

  return Collapse;
}(_react.PureComponent);

Collapse.propTypes = {
  /**
   * An optional style to merge with the `Motion` style.
   */
  style: _propTypes2.default.object,

  /**
   * An optional default style to merge with the `Motion` default style.
   */
  defaultStyle: _propTypes2.default.object,

  /**
   * Boolean if the children are currently collapsed.
   */
  collapsed: _propTypes2.default.bool.isRequired,

  /**
   * A single child to collapse or expand.
   */
  children: _propTypes2.default.element.isRequired,

  /**
   * The spring config to use for the animation.
   */
  springConfig: _propTypes2.default.object.isRequired,

  /**
   * Boolean if the single child entering or leaving should be animated.
   */
  animate: _propTypes2.default.bool,

  /**
   * The min height to apply for the collapse div.
   */
  minHeight: _propTypes2.default.number.isRequired
};
Collapse.defaultProps = {
  animate: true,
  springConfig: {
    precision: 0.5
  },
  minHeight: 0
};
exports.default = Collapse;
//# sourceMappingURL=Collapse.js.map