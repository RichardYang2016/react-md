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

var _AccessibleFakeInkedButton = require('../Helpers/AccessibleFakeInkedButton');

var _AccessibleFakeInkedButton2 = _interopRequireDefault(_AccessibleFakeInkedButton);

var _TileAddon = require('../Lists/TileAddon');

var _TileAddon2 = _interopRequireDefault(_TileAddon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MiniListItem = function (_PureComponent) {
  _inherits(MiniListItem, _PureComponent);

  function MiniListItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MiniListItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MiniListItem.__proto__ || Object.getPrototypeOf(MiniListItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = { active: false }, _this._handleMouseOver = function (e) {
      if (_this.props.onMouseOver) {
        _this.props.onMouseOver(e);
      }

      if (!_this.props.disabled) {
        _this.setState({ active: true });
      }
    }, _this._handleMouseLeave = function (e) {
      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(e);
      }

      if (!_this.props.disabled) {
        _this.setState({ active: false });
      }
    }, _this._handleTouchStart = function (e) {
      if (_this.props.onTouchStart) {
        _this.props.onTouchStart(e);
      }

      _this._touched = true;

      _this.setState({ active: true, touchedAt: Date.now() });
    }, _this._handleTouchEnd = function (e) {
      if (_this.props.onTouchEnd) {
        _this.props.onTouchEnd(e);
      }

      var time = Date.now() - _this.state.touchedAt;
      _this._touchTimeout = setTimeout(function () {
        _this._touchTimeout = null;

        _this.setState({ active: false });
      }, time > 450 ? 0 : 450 - time);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MiniListItem, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._touchTimeout) {
        clearTimeout(this._touchTimeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          className = _props.className,
          tileStyle = _props.tileStyle,
          tileClassName = _props.tileClassName,
          leftIcon = _props.leftIcon,
          leftAvatar = _props.leftAvatar,
          active = _props.active,
          activeClassName = _props.activeClassName,
          ItemComponent = _props.itemComponent,
          primaryText = _props.primaryText,
          secondaryText = _props.secondaryText,
          rightIcon = _props.rightIcon,
          rightAvatar = _props.rightAvatar,
          threeLines = _props.threeLines,
          children = _props.children,
          defaultOpen = _props.defaultOpen,
          isOpen = _props.isOpen,
          inset = _props.inset,
          nestedItems = _props.nestedItems,
          animateNestedItems = _props.animateNestedItems,
          expanderIcon = _props.expanderIcon,
          expanderIconChildren = _props.expanderIconChildren,
          expanderIconClassName = _props.expanderIconClassName,
          props = _objectWithoutProperties(_props, ['style', 'className', 'tileStyle', 'tileClassName', 'leftIcon', 'leftAvatar', 'active', 'activeClassName', 'itemComponent', 'primaryText', 'secondaryText', 'rightIcon', 'rightAvatar', 'threeLines', 'children', 'defaultOpen', 'isOpen', 'inset', 'nestedItems', 'animateNestedItems', 'expanderIcon', 'expanderIconChildren', 'expanderIconClassName']);

      return _react2.default.createElement(
        ItemComponent,
        { style: style, className: className },
        _react2.default.createElement(
          _AccessibleFakeInkedButton2.default,
          _extends({}, props, {
            style: tileStyle,
            className: (0, _classnames2.default)('md-list-tile md-list-tile--icon md-list-tile--mini', {
              'md-list-tile--active': this.state.active && !this._touched
            }, tileClassName),
            onMouseOver: this._handleMouseOver,
            onMouseLeave: this._handleMouseLeave,
            onTouchStart: this._handleTouchStart,
            onTouchEnd: this._handleTouchEnd
          }),
          _react2.default.createElement(_TileAddon2.default, {
            active: active,
            activeClassName: activeClassName,
            icon: leftIcon,
            avatar: leftAvatar
          })
        )
      );
    }
  }]);

  return MiniListItem;
}(_react.PureComponent);

MiniListItem.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  tileStyle: _propTypes2.default.object,
  tileClassName: _propTypes2.default.string,
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  active: _propTypes2.default.bool,
  activeClassName: _propTypes2.default.string,
  leftIcon: _propTypes2.default.node,
  leftAvatar: _propTypes2.default.node,
  disabled: _propTypes2.default.bool,
  onTouchStart: _propTypes2.default.func,
  onTouchEnd: _propTypes2.default.func,
  onMouseOver: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  defaultOpen: _propTypes2.default.bool,
  itemComponent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired
};
MiniListItem.defaultProps = {
  activeClassName: 'md-text--theme-primary',
  component: 'div',
  itemComponent: 'li'
};
exports.default = MiniListItem;
//# sourceMappingURL=MiniListItem.js.map