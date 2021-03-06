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

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _contextTypes = require('./contextTypes');

var _contextTypes2 = _interopRequireDefault(_contextTypes);

var _getDeprecatedIcon = require('../FontIcons/getDeprecatedIcon');

var _getDeprecatedIcon2 = _interopRequireDefault(_getDeprecatedIcon);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Paper = require('../Papers/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Collapse = require('../Helpers/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function (_PureComponent) {
  _inherits(Card, _PureComponent);

  function Card(props) {
    _classCallCheck(this, Card);

    var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

    _this._handleMouseOver = function (e) {
      if (_this.props.onMouseOver) {
        _this.props.onMouseOver(e);
      }

      if (_this.props.raise && !_this._touched) {
        _this.setState({ zDepth: 4 });
      }
    };

    _this._handleMouseLeave = function (e) {
      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(e);
      }

      _this._touched = false;
      if (_this.props.raise && _this.state.zDepth !== 1) {
        _this.setState({ zDepth: 1 });
      }
    };

    _this._handleTouchStart = function (e) {
      if (_this.props.onTouchStart) {
        _this.props.onTouchStart(e);
      }

      _this._touched = true;
    };

    _this._handleExpandClick = function (e) {
      var onExpanderClick = _this.props.onExpanderClick;

      var expanded = !(0, _getField2.default)(_this.props, _this.state, 'expanded');
      if (onExpanderClick) {
        onExpanderClick(expanded, e);
      }

      if (typeof _this.props.expanded === 'undefined') {
        _this.setState({ expanded: expanded });
      }
    };

    _this.state = {
      zDepth: 1,
      expanded: typeof props.initiallyExpanded !== 'undefined' ? props.initiallyExpanded : !!props.defaultExpanded
    };
    return _this;
  }

  _createClass(Card, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _props = this.props,
          expanderTooltipLabel = _props.expanderTooltipLabel,
          expanderTooltipDelay = _props.expanderTooltipDelay,
          expanderTooltipPosition = _props.expanderTooltipPosition,
          expanderIcon = _props.expanderIcon,
          iconClassName = _props.iconClassName,
          iconChildren = _props.iconChildren,
          expanderIconClassName = _props.expanderIconClassName,
          expanderIconChildren = _props.expanderIconChildren;


      var expanded = typeof this.props.isExpanded !== 'undefined' ? this.props.isExpanded : (0, _getField2.default)(this.props, this.state, 'expanded');

      return {
        expanded: expanded,
        onExpandClick: this._handleExpandClick,
        icon: (0, _getDeprecatedIcon2.default)(iconChildren || expanderIconChildren, iconClassName || expanderIconClassName, expanderIcon),
        tooltipLabel: expanderTooltipLabel,
        tooltipDelay: expanderTooltipDelay,
        tooltipPosition: expanderTooltipPosition
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var zDepth = this.state.zDepth;

      var _props2 = this.props,
          className = _props2.className,
          raise = _props2.raise,
          tableCard = _props2.tableCard,
          children = _props2.children,
          animate = _props2.animate,
          propExpanded = _props2.expanded,
          onExpanderClick = _props2.onExpanderClick,
          defaultExpanded = _props2.defaultExpanded,
          expanderIcon = _props2.expanderIcon,
          expanderIconChildren = _props2.expanderIconChildren,
          expanderIconClassName = _props2.expanderIconClassName,
          expanderTooltipLabel = _props2.expanderTooltipLabel,
          expanderTooltipDelay = _props2.expanderTooltipDelay,
          expanderTooltipPosition = _props2.expanderTooltipPosition,
          iconChildren = _props2.iconChildren,
          iconClassName = _props2.iconClassName,
          isExpanded = _props2.isExpanded,
          initiallyExpanded = _props2.initiallyExpanded,
          props = _objectWithoutProperties(_props2, ['className', 'raise', 'tableCard', 'children', 'animate', 'expanded', 'onExpanderClick', 'defaultExpanded', 'expanderIcon', 'expanderIconChildren', 'expanderIconClassName', 'expanderTooltipLabel', 'expanderTooltipDelay', 'expanderTooltipPosition', 'iconChildren', 'iconClassName', 'isExpanded', 'initiallyExpanded']);

      var expanded = typeof this.props.isExpanded !== 'undefined' ? this.props.isExpanded : (0, _getField2.default)(this.props, this.state, 'expanded');
      var expanderIndex = -1;
      var parts = _react.Children.map(_react.Children.toArray(children), function (child, i) {
        if (!child || !child.props) {
          return child;
        } else if (expanderIndex < 0 && (child.props.isExpander || child.props.expander)) {
          expanderIndex = i;
        }

        if (!child.props.expandable) {
          return child;
        }

        var collapsed = expanderIndex === -1 || expanderIndex === i || !expanded;
        return _react2.default.createElement(
          _Collapse2.default,
          { collapsed: collapsed, animate: animate },
          child
        );
      });

      return _react2.default.createElement(
        _Paper2.default,
        _extends({}, props, {
          zDepth: zDepth,
          className: (0, _classnames2.default)('md-card', {
            'md-card--raise': raise,
            'md-card--table': tableCard
          }, 'md-background--card', className),
          onMouseOver: this._handleMouseOver,
          onMouseLeave: this._handleMouseLeave,
          onTouchStart: this._handleTouchStart
        }),
        parts
      );
    }
  }]);

  return Card;
}(_react.PureComponent);

Card.propTypes = {
  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the card.
   */
  className: _propTypes2.default.string,

  /**
   * Any Card parts that should be rendered.
   */
  children: _propTypes2.default.node,

  /**
   * Boolean if the card is expanded by default when there is an expander
   * component.
   */
  defaultExpanded: _propTypes2.default.bool,

  /**
   * Boolean if the card should raise on hover when on a desktop display.
   */
  raise: _propTypes2.default.bool,

  /**
   * Boolean if the card is currently expanded. This will require the `onExpanderClick` function
   * to toggle the state. The card will become controlled if this is not `undefined`.
   */
  expanded: (0, _controlled2.default)(_propTypes2.default.bool, 'onExpanderClick', 'defaultExpanded'),

  /**
   * An optional function to call when the expander is clicked.
   */
  onExpanderClick: _propTypes2.default.func,

  /**
   * The icon to use for the expander button. It is recommended to use this prop over
   * the `expaderIconChildren` and `expanderIconClassName` since it provides more control.
   */
  expanderIcon: _propTypes2.default.element,

  /**
   * The tooltip position for the expander icon.
   */
  expanderTooltipPosition: _propTypes2.default.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The optional tooltip to display for the expander icon.
   */
  expanderTooltipLabel: _propTypes2.default.node,

  /**
   * An optional delay before the tooltip appears for the expander icon on hover.
   */
  expanderTooltipDelay: _propTypes2.default.number,

  /**
   * Boolean if the card contains a table. It will update the styling accordingly.
   * When using the `DataTable` component, do not wrap it in a `CardText` component.
   *
   * ```js
   * <Card tableCard={true}>
   *   <CardTitle title="Example />
   *   <DataTable>
   *     ...
   *   </DataTable>
   * </Card>
   * ```
   */
  tableCard: _propTypes2.default.bool,

  /**
   * An optional function to call when the mouseover event is triggered.
   */
  onMouseOver: _propTypes2.default.func,

  /**
   * An optional function to call when the mouseleave event is triggered.
   */
  onMouseLeave: _propTypes2.default.func,

  /**
   * An optional function to call when the touchstart event is triggered.
   */
  onTouchStart: _propTypes2.default.func,

  /**
   * Boolean if the card expansion should be animated.
   */
  animate: _propTypes2.default.bool,

  expanderIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `expanderIcon` instead'),
  expanderIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use `expanderIcon` instead'),
  initiallyExpanded: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `defaultExpanded` instead'),
  isExpanded: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `expanded` instead'),
  iconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `expanderIconChildren` prop instead'),
  iconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `expanderIconClassName` prop instead')
};
Card.defaultProps = {
  animate: true,
  expanderIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'keyboard_arrow_down'
  ),
  expanderTooltipPosition: 'left'
};
Card.childContextTypes = _contextTypes2.default;
exports.default = Card;
//# sourceMappingURL=Card.js.map