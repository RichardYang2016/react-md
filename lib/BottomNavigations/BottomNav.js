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

var _AccessibleFakeInkedButton = require('../Helpers/AccessibleFakeInkedButton');

var _AccessibleFakeInkedButton2 = _interopRequireDefault(_AccessibleFakeInkedButton);

var _Collapse = require('../Helpers/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _FontIcons = require('../FontIcons');

var _FontIcons2 = _interopRequireDefault(_FontIcons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `BottomNav` component is used for rendering the navigation tab/link in the `BottomNavigation`
 * component.
 */
var BottomNav = function (_PureComponent) {
  _inherits(BottomNav, _PureComponent);

  function BottomNav() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BottomNav);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BottomNav.__proto__ || Object.getPrototypeOf(BottomNav)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          onNavChange = _this$props.onNavChange,
          index = _this$props.index;

      if (onClick) {
        onClick(index, e);
      }

      if (onNavChange) {
        onNavChange(index, e);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BottomNav, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          active = _props.active,
          fixed = _props.fixed,
          className = _props.className,
          colored = _props.colored,
          animate = _props.animate,
          iconClassName = _props.iconClassName,
          iconChildren = _props.iconChildren,
          index = _props.index,
          propIcon = _props.icon,
          propLabel = _props.label,
          onClick = _props.onClick,
          onNavChange = _props.onNavChange,
          props = _objectWithoutProperties(_props, ['active', 'fixed', 'className', 'colored', 'animate', 'iconClassName', 'iconChildren', 'index', 'icon', 'label', 'onClick', 'onNavChange']);

      var _props2 = this.props,
          label = _props2.label,
          icon = _props2.icon;

      var labelClassName = (0, _classnames2.default)('md-bottom-nav-label', { 'md-bottom-nav-label--shifting-inactive': !active && !fixed });
      if (_react.Children.count(label) === 1 && (0, _react.isValidElement)(label)) {
        var labelEl = _react.Children.only(label);
        label = (0, _react.cloneElement)(label, {
          className: (0, _classnames2.default)(labelClassName, labelEl.props.className)
        });
      } else {
        label = _react2.default.createElement(
          'div',
          { className: labelClassName },
          label
        );
      }

      if (!icon && (iconClassName || iconChildren)) {
        // Deprecated
        icon = _react2.default.createElement(
          _FontIcons2.default,
          { iconClassName: iconClassName, inherit: true },
          iconChildren
        );
      } else if (icon) {
        icon = _react2.default.cloneElement(icon, { inherit: true });
      }

      return _react2.default.createElement(
        _AccessibleFakeInkedButton2.default,
        _extends({}, props, {
          onClick: this._handleClick,
          className: (0, _classnames2.default)('md-bottom-nav', {
            'md-bottom-nav--active': active,
            'md-bottom-nav--fixed': fixed,
            'md-bottom-nav--shifting': !fixed,
            'md-bottom-nav--shifting-active': !fixed && active,
            'md-bottom-nav--shifting-inactive': !fixed && !active
          }, (0, _themeColors2.default)({ primary: !colored && active, text: !active && !colored }, className))
        }),
        icon,
        _react2.default.createElement(
          _Collapse2.default,
          { collapsed: !fixed && !active, animate: animate },
          label
        )
      );
    }
  }]);

  return BottomNav;
}(_react.PureComponent);

BottomNav.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  active: _propTypes2.default.bool,
  fixed: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  index: _propTypes2.default.number.isRequired,
  label: _propTypes2.default.node.isRequired,
  colored: _propTypes2.default.bool,
  iconChildren: _propTypes2.default.node,
  iconClassName: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  onNavChange: _propTypes2.default.func,
  role: _propTypes2.default.string,
  animate: _propTypes2.default.bool,
  icon: _propTypes2.default.element
};
BottomNav.defaultProps = {
  component: 'a',
  role: null
};
exports.default = BottomNav;
//# sourceMappingURL=BottomNav.js.map