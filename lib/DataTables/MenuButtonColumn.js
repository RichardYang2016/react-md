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

var _fixedToShape = require('../Helpers/fixedToShape');

var _fixedToShape2 = _interopRequireDefault(_fixedToShape);

var _withTableFixes = require('./withTableFixes');

var _withTableFixes2 = _interopRequireDefault(_withTableFixes);

var _MenuButton = require('../Menus/MenuButton');

var _MenuButton2 = _interopRequireDefault(_MenuButton);

var _TableColumn = require('./TableColumn');

var _TableColumn2 = _interopRequireDefault(_TableColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuButtonColumn = function (_PureComponent) {
  _inherits(MenuButtonColumn, _PureComponent);

  function MenuButtonColumn() {
    _classCallCheck(this, MenuButtonColumn);

    return _possibleConstructorReturn(this, (MenuButtonColumn.__proto__ || Object.getPrototypeOf(MenuButtonColumn)).apply(this, arguments));
  }

  _createClass(MenuButtonColumn, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          className = _props.className,
          menuStyle = _props.menuStyle,
          menuClassName = _props.menuClassName,
          header = _props.header,
          adjusted = _props.adjusted,
          tooltipLabel = _props.tooltipLabel,
          tooltipDelay = _props.tooltipDelay,
          tooltipPosition = _props.tooltipPosition,
          props = _objectWithoutProperties(_props, ['style', 'className', 'menuStyle', 'menuClassName', 'header', 'adjusted', 'tooltipLabel', 'tooltipDelay', 'tooltipPosition']);

      return _react2.default.createElement(
        _TableColumn2.default,
        {
          style: style,
          className: className,
          header: header,
          adjusted: adjusted,
          tooltipLabel: tooltipLabel,
          tooltipDelay: tooltipDelay,
          tooltipPosition: tooltipPosition
        },
        _react2.default.createElement(_MenuButton2.default, _extends({}, props, { style: menuStyle, className: menuClassName }))
      );
    }
  }]);

  return MenuButtonColumn;
}(_react.PureComponent);

MenuButtonColumn.Positions = _MenuButton2.default.Positions;
MenuButtonColumn.HorizontalAnchors = _MenuButton2.default.HorizontalAnchors;
MenuButtonColumn.VerticalAnchors = _MenuButton2.default.VerticalAnchors;
MenuButtonColumn.propTypes = {
  /**
   * An optional id to use for the menu button in the column. If this is omitted, it's value will be
   * `${rowId}-${cellIndex}-menu-button`
   */
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * This is the optional style to apply to the `TableColumn`.
   */
  style: _propTypes2.default.object,

  /**
   * This is the optional className to apply to the `TableColumn`.
   */
  className: _propTypes2.default.string,

  /**
   * The is the optional style to apply to the menu button's menu container.
   *
   * @see {@link Menus/MenuButton#style}
   */
  menuStyle: _propTypes2.default.object,

  /**
   * The is the optional class name to apply to the menu button's menu container.
   *
   * @see {@link Menus/MenuButton#className}
   */
  menuClassName: _propTypes2.default.string,

  /**
   * This is how the select field should be fixed within the table. When this is omitted,
   * it will automatically use the responsive table as the fixture so that the select field
   * will close/adjust itself to the scrolling of the table.
   *
   * @see {@link Helpers/Layover#fixedTo}
   */
  fixedTo: _fixedToShape2.default,

  /**
   * The optional tooltip to render on hover.
   *
   * @see {@link DataTables/TableColumn#tooltipLabel}
   */
  tooltipLabel: _propTypes2.default.string,

  /**
   * An optional delay to apply to the tooltip before it appears.
   *
   * @see {@link DataTables/TableColumn#tooltipDelay}
   */
  tooltipDelay: _propTypes2.default.number,

  /**
   * The position of the tooltip.
   *
   * @see {@link DataTables/TableColumn#tooltipPosition}
   */
  tooltipPosition: _propTypes2.default.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * Boolean if the menu should automatically try to reposition itself to stay within
   * the viewport when the `fixedTo` element scrolls.
   *
   * @see {@link Helpers/Layover#repositionOnScroll}
   */
  repositionOnScroll: _propTypes2.default.bool,

  /**
   * Boolean if the menu should automatically try to reposition itself to stay within
   * the viewport when the window resizes.
   *
   * @see {@link Helpers/Layover#repositionOnResize}
   */
  repositionOnResize: _propTypes2.default.bool,

  /**
   * Boolean if the menu logic should be simplified without any viewport logic and position
   * based on the relative position of the menu. This will most like require some additional
   * styles applied to the menu.
   *
   * @see {@link Helpers/Layover#simplified}
   */
  simplifiedMenu: _propTypes2.default.bool,

  /**
   * This is injected by the `TableRow` component.
   * @access private
   */
  header: _propTypes2.default.bool,

  /**
   * @access private
   */
  adjusted: _propTypes2.default.bool
};
MenuButtonColumn.defaultProps = {
  simplifiedMenu: false
};
exports.default = (0, _withTableFixes2.default)(MenuButtonColumn, 'menu-button');
//# sourceMappingURL=MenuButtonColumn.js.map