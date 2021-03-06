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

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chip = function (_PureComponent) {
  _inherits(Chip, _PureComponent);

  function Chip() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Chip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chip.__proto__ || Object.getPrototypeOf(Chip)).call.apply(_ref, [this].concat(args))), _this), _this.state = { hover: false }, _this._handleMouseEnter = function (e) {
      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(e);
      }

      _this.setState({ hover: true });
    }, _this._handleMouseLeave = function (e) {
      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(e);
      }

      _this.setState({ hover: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chip, [{
    key: 'render',
    value: function render() {
      var hover = this.state.hover;

      var _props = this.props,
          label = _props.label,
          className = _props.className,
          labelStyle = _props.labelStyle,
          labelClassName = _props.labelClassName,
          avatar = _props.avatar,
          children = _props.children,
          removable = _props.removable,
          remove = _props.remove,
          onClick = _props.onClick,
          rotateIcon = _props.rotateIcon,
          iconClassName = _props.iconClassName,
          removeIconChildren = _props.removeIconChildren,
          removeIconClassName = _props.removeIconClassName,
          props = _objectWithoutProperties(_props, ['label', 'className', 'labelStyle', 'labelClassName', 'avatar', 'children', 'removable', 'remove', 'onClick', 'rotateIcon', 'iconClassName', 'removeIconChildren', 'removeIconClassName']);

      var icon = void 0;
      if (removable || remove) {
        var chipIconCN = (0, _classnames2.default)('md-chip-icon', {
          'md-chip-icon--rotate': rotateIcon,
          'md-chip-text--hover': hover
        });

        if (_react2.default.isValidElement(children)) {
          icon = _react2.default.Children.only(children);
          icon = _react2.default.cloneElement(icon, { className: (0, _classnames2.default)(chipIconCN, icon.props.className) });
        } else {
          icon = _react2.default.createElement(
            _FontIcon2.default,
            { className: chipIconCN, iconClassName: iconClassName },
            children
          );
        }
      }

      return _react2.default.createElement(
        'button',
        _extends({
          type: 'button'
        }, props, {
          className: (0, _classnames2.default)('md-chip', {
            'md-chip--avatar': avatar,
            'md-chip--remove': removable,
            'md-chip--hover': hover
          }, className),
          onClick: remove || onClick,
          onMouseEnter: this._handleMouseEnter,
          onMouseLeave: this._handleMouseLeave
        }),
        avatar,
        _react2.default.createElement(
          'span',
          {
            style: labelStyle,
            className: (0, _classnames2.default)('md-chip-text', {
              'md-chip-text--hover': hover
            }, labelClassName)
          },
          label
        ),
        icon
      );
    }
  }]);

  return Chip;
}(_react.PureComponent);

Chip.propTypes = {
  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the chip's label.
   */
  labelStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the chip's label.
   */
  labelClassName: _propTypes2.default.string,

  /**
   * Boolean if the `.md-chip-icon--rotate` style should be applied to the remove icon.
   * The `.md-chip-icon--rotate` just rotates the icon 45 degrees.
   */
  rotateIcon: _propTypes2.default.bool,

  /**
   * Any children used to display the remove icon when `removable`.
   */
  children: _propTypes2.default.node,

  /**
   * The label to display on the chip.
   */
  label: _propTypes2.default.node.isRequired,

  /**
   * Boolean if the chip is removable.
   */
  removable: _propTypes2.default.bool,

  /**
   * An optional avatar to display on the chip.
   */
  avatar: _propTypes2.default.element,

  /**
   * An optional function to call when the `click` event is triggered.
   */
  onClick: _propTypes2.default.func,

  /**
   * An optional function to call when the `mouseenter` event is triggered.
   */
  onMouseEnter: _propTypes2.default.func,

  /**
   * An optional function to call when the `mouseleave` event is triggered.
   */
  onMouseLeave: _propTypes2.default.func,

  iconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `children` prop as a single FontIcon or SVGIcon instead'),
  remove: (0, _deprecated2.default)(_propTypes2.default.func, 'Use `removable` and `onClick` instead'),
  removeIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use `children` instead'),
  removeIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `children` prop as a single FontIcon or SVGIcon instead')
};
Chip.defaultProps = {
  rotateIcon: true,
  children: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'add_circle'
  )
};
exports.default = Chip;
//# sourceMappingURL=Chip.js.map