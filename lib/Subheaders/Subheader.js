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

var _themeColors = require('../utils/themeColors');

var _themeColors2 = _interopRequireDefault(_themeColors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `Subheader` component is generally used inside of lists or menus.
 */
var Subheader = function (_PureComponent) {
  _inherits(Subheader, _PureComponent);

  function Subheader() {
    _classCallCheck(this, Subheader);

    return _possibleConstructorReturn(this, (Subheader.__proto__ || Object.getPrototypeOf(Subheader)).apply(this, arguments));
  }

  _createClass(Subheader, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          Component = _props.component,
          inset = _props.inset,
          primary = _props.primary,
          primaryText = _props.primaryText,
          className = _props.className,
          children = _props.children,
          props = _objectWithoutProperties(_props, ['component', 'inset', 'primary', 'primaryText', 'className', 'children']);

      return _react2.default.createElement(
        Component,
        _extends({}, props, {
          className: (0, _classnames2.default)('md-subheader', {
            'md-list-item--inset': inset
          }, (0, _themeColors2.default)({ primary: primary, hint: !primary }), className)
        }),
        primaryText,
        children
      );
    }
  }]);

  return Subheader;
}(_react.PureComponent);

Subheader.propTypes = {
  /**
   * An optional style to apply to the subheader.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the subheader.
   */
  className: _propTypes2.default.string,

  /**
   * Boolean if the subheader should be styled with the primary color.
   */
  primary: _propTypes2.default.bool,

  /**
   * Boolean if the subheader is inset in the list. This will add additional
   * spacing to align the subheader.
   */
  inset: _propTypes2.default.bool,

  /**
   * The primary text to use in the subheader.
   */
  primaryText: _propTypes2.default.node.isRequired,

  /**
   * Any optional children to display after the `primaryText`. This prop is
   * not recommended.
   */
  children: _propTypes2.default.node,

  /**
   * The component to render the Subheader as.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired
};
Subheader.defaultProps = {
  component: 'li'
};
exports.default = Subheader;
//# sourceMappingURL=Subheader.js.map