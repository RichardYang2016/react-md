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

var _themeColors = require('../utils/themeColors');

var _themeColors2 = _interopRequireDefault(_themeColors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The main use case of the `Badge` component is for notifications. It can
 * however also place any content floating to whatever children are supplied.
 */
var Badge = function (_PureComponent) {
  _inherits(Badge, _PureComponent);

  function Badge(props) {
    _classCallCheck(this, Badge);

    var _this = _possibleConstructorReturn(this, (Badge.__proto__ || Object.getPrototypeOf(Badge)).call(this, props));

    var single = _this._isSingleChild(props);
    _this.state = {
      single: single,
      element: single && (0, _react.isValidElement)(props.children),
      count: _this._normalizeCount(props)
    };
    return _this;
  }

  _createClass(Badge, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          badgeContent = _props.badgeContent,
          max = _props.max,
          children = _props.children;

      var nextState = void 0;
      if (badgeContent !== nextProps.badgeContent || max !== nextProps.max) {
        nextState = { count: this._normalizeCount(nextProps) };
      }

      if (children !== nextProps.children) {
        nextState = nextState || {};
        nextState.single = this._isSingleChild(nextProps);
        nextState.element = nextState.single && (0, _react.isValidElement)(nextProps.children);
      }

      if (nextState) {
        this.setState(nextState);
      }
    }
  }, {
    key: '_isSingleChild',
    value: function _isSingleChild(_ref) {
      var children = _ref.children;

      return _react.Children.count(children) === 1;
    }
  }, {
    key: '_normalizeCount',
    value: function _normalizeCount(_ref2) {
      var badgeContent = _ref2.badgeContent,
          max = _ref2.max;

      var count = void 0;
      if (max) {
        var n = parseInt(badgeContent, 10);
        if (!Number.isNaN(n) && n.toString() === badgeContent.toString()) {
          count = n > max ? max + '+' : n;
        }
      }

      return count;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          count = _state.count,
          single = _state.single,
          element = _state.element;

      var _props2 = this.props,
          className = _props2.className,
          badgeStyle = _props2.badgeStyle,
          badgeClassName = _props2.badgeClassName,
          badgeContent = _props2.badgeContent,
          Component = _props2.component,
          children = _props2.children,
          primary = _props2.primary,
          secondary = _props2.secondary,
          defaultTheme = _props2.default,
          circular = _props2.circular,
          badgeId = _props2.badgeId,
          invisibleOnZero = _props2.invisibleOnZero,
          max = _props2.max,
          props = _objectWithoutProperties(_props2, ['className', 'badgeStyle', 'badgeClassName', 'badgeContent', 'component', 'children', 'primary', 'secondary', 'default', 'circular', 'badgeId', 'invisibleOnZero', 'max']);

      var useCircular = typeof circular !== 'undefined' ? circular : typeof count !== 'undefined';
      var content = children;
      if (single && element) {
        var c = _react.Children.only(content);
        if (!c.props['aria-describedby']) {
          content = (0, _react.cloneElement)(c, { 'aria-describedby': badgeId });
        }
      } else if (single && !element && !props['aria-describedby']) {
        props['aria-describedby'] = badgeId;
      }

      var badge = _react2.default.createElement(
        'span',
        {
          id: badgeId,
          key: 'badge',
          role: 'status',
          style: badgeStyle,
          className: (0, _classnames2.default)('md-badge', {
            'md-badge--circular': useCircular,
            'md-badge--default': defaultTheme
          }, (0, _themeColors2.default)({
            primary: primary,
            secondary: secondary,
            text: useCircular,
            themeText: !primary && !secondary
          }, badgeClassName))
        },
        count || badgeContent
      );

      return _react2.default.createElement(
        Component,
        _extends({}, props, {
          className: (0, _classnames2.default)('md-badge-container md-inline-block', className)
        }),
        content,
        invisibleOnZero && count === 0 ? null : badge
      );
    }
  }]);

  return Badge;
}(_react.PureComponent);

Badge.propTypes = {
  /**
   * An optional style to apply to the badge's container.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the badge's container.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the badge.
   */
  badgeStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the badge.
   */
  badgeClassName: _propTypes2.default.string,

  /**
   * The id to give the badge's content. This is required to help with the
   * `aria-describedby` attribute that should be applied to one of the children.
   *
   * If there is only one child that is a valid React element, the `aria-describedby`
   * will automatically be cloned into that child (so make sure your component passes
   * that prop correctly).
   *
   * If there is only one child, but it is a string or number, the badge's container
   * will be updated to include the `aria-describedby`.
   *
   * If there is more than child, you are required to add it to a child yourself.
   */
  badgeId: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

  /**
   * The content to display with the badge's content. The size of this
   * element is determinate of the location of the content. You might have
   * to update the positioning yourself.
   */
  children: _propTypes2.default.node.isRequired,

  /**
   * The component to render the badge as.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,

  /**
   * The content to display in the badge. If the content is a number or a number string,
   * the number will be normalized if `normalizeContent` is enabled.
   */
  badgeContent: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.node]).isRequired,

  /**
   * This will basically update the display value of the content to only be 2 digits. If
   * a number is greater than 99, 99+ will be displayed instead. This is really just to
   * keep the count inside the circular bubble.
   */
  max: _propTypes2.default.number,

  /**
   * Boolean if the primary color background should get applied to the badge's content.
   */
  primary: _propTypes2.default.bool,

  /**
   * Boolean if the secondary color background should get applied to the badge's content.
   */
  secondary: _propTypes2.default.bool,

  /**
   * Boolean if the default styles should be applied.
   */
  default: _propTypes2.default.bool,

  /**
   * Boolean if the badge's content should appear in a circular container. If this is
   * undefined, the content will be in a circular container if the badgeContent is a number.
   */
  circular: _propTypes2.default.bool,

  /**
   * Boolean if the badge's notification should be invisible when the count is 0.
   */
  invisibleOnZero: _propTypes2.default.bool
};
Badge.defaultProps = {
  max: 99,
  component: 'div'
};
exports.default = Badge;
//# sourceMappingURL=Badge.js.map