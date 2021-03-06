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

var _componentDeprecated = require('../utils/PropTypes/componentDeprecated');

var _componentDeprecated2 = _interopRequireDefault(_componentDeprecated);

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A `FloatingButton` is an extension of the `IconButton`.
 * A tooltip can be displayed on hover or touch hold if the
 * `tooltipLabel` prop is given.
 *
 * Another name for this button is a `FloatingActionButton` (FAB).
 *
 * Any other props (such as style or event listeners) will also be
 * applied.
 */
var FloatingButton = function (_PureComponent) {
  _inherits(FloatingButton, _PureComponent);

  function FloatingButton() {
    _classCallCheck(this, FloatingButton);

    return _possibleConstructorReturn(this, (FloatingButton.__proto__ || Object.getPrototypeOf(FloatingButton)).apply(this, arguments));
  }

  _createClass(FloatingButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          fixed = _props.fixed,
          mini = _props.mini,
          children = _props.children,
          iconClassName = _props.iconClassName,
          props = _objectWithoutProperties(_props, ['className', 'fixed', 'mini', 'children', 'iconClassName']);

      return _react2.default.createElement(
        _IconButton2.default,
        _extends({}, props, {
          className: (0, _classnames2.default)({
            'md-btn--floating-fixed': fixed,
            'md-btn--floating-mini': mini
          }, className),
          iconClassName: iconClassName,
          floating: true
        }),
        children
      );
    }
  }]);

  return FloatingButton;
}(_react.PureComponent);

FloatingButton.propTypes = {
  /**
   * The className to use for rendering the `FontIcon`.
   */
  iconClassName: _propTypes2.default.string,

  /**
   * Any children to use to render the `FontIcon`.
   */
  children: _propTypes2.default.node,

  /**
   * An optional className to apply to the button.
   */
  className: _propTypes2.default.string,

  /**
   * The button type.
   */
  type: _propTypes2.default.string,

  /**
   * Boolean if the button is disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * An optional href to convert the button into a link button.
   */
  href: _propTypes2.default.string,

  /**
   * An optional function to call when the button is clicked.
   */
  onClick: _propTypes2.default.func,

  /**
   * An optional label to use if you would like a tooltip to display
   * on hover or touch hold.
   */
  tooltipLabel: _propTypes2.default.node,

  /**
   * The position that the tooltip should be displayed relative to
   * the button.
   */
  tooltipPosition: _propTypes2.default.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * An optional amount of delay before the tooltip appears.
   */
  tooltipDelay: _propTypes2.default.number,

  /**
   * Boolean if the floating button is fixed.
   */
  fixed: _propTypes2.default.bool,

  /**
   * Boolean if the floating button should be displayed as the mini
   * version.
   */
  mini: _propTypes2.default.bool,

  /**
   * Boolean if the floating button should be styled with the primary color.
   */
  primary: _propTypes2.default.bool,

  /**
   * Boolean if the floating button should be styled with the secondary color.
   */
  secondary: _propTypes2.default.bool,

  deprecated: (0, _componentDeprecated2.default)('The behavior of the `FloatingButton` can be achieved with the `Button` component ' + 'without the additional bundle size. Switch to the `Button` component and add a ' + 'prop `floating`.')
};
exports.default = FloatingButton;
//# sourceMappingURL=FloatingButton.js.map