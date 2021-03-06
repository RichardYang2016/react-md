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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _themeColors = require('../utils/themeColors');

var _themeColors2 = _interopRequireDefault(_themeColors);

var _getCollapserStyles = require('../utils/getCollapserStyles');

var _getCollapserStyles2 = _interopRequireDefault(_getCollapserStyles);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _keyCodes = require('../constants/keyCodes');

var _anchorShape = require('../Helpers/anchorShape');

var _anchorShape2 = _interopRequireDefault(_anchorShape);

var _fixedToShape = require('../Helpers/fixedToShape');

var _fixedToShape2 = _interopRequireDefault(_fixedToShape);

var _AccessibleFakeInkedButton = require('../Helpers/AccessibleFakeInkedButton');

var _AccessibleFakeInkedButton2 = _interopRequireDefault(_AccessibleFakeInkedButton);

var _Collapse = require('../Helpers/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _getDeprecatedIcon = require('../FontIcons/getDeprecatedIcon');

var _getDeprecatedIcon2 = _interopRequireDefault(_getDeprecatedIcon);

var _TileAddon = require('./TileAddon');

var _TileAddon2 = _interopRequireDefault(_TileAddon);

var _ListItemText = require('./ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _Menu = require('../Menus/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `ListItem` component is used for rendering a `li` tag with text and optional
 * icons/avatars.
 */
var ListItem = function (_PureComponent) {
  _inherits(ListItem, _PureComponent);

  function ListItem(props) {
    _classCallCheck(this, ListItem);

    var _this = _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = { active: false };

    if (typeof props.isOpen === 'undefined' && typeof props.visible === 'undefined') {
      var defined = function defined(v) {
        return typeof v !== 'undefined';
      };
      var _this$props = _this.props,
          initiallyOpen = _this$props.initiallyOpen,
          defaultOpen = _this$props.defaultOpen,
          defaultVisible = _this$props.defaultVisible;

      var visible = defined(initiallyOpen) ? initiallyOpen : defaultVisible;
      visible = defined(defaultOpen) ? defaultOpen : visible;
      visible = !!visible;

      _this.state.visible = visible;
    }
    return _this;
  }

  _createClass(ListItem, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.state.active) {
        window.removeEventListener('click', this._handleOutsideClick);
      }

      if (this._touchTimeout) {
        clearTimeout(this._touchTimeout);
      }
    }

    /**
     * A utility function to focus the `AccessibleFakeInkedButton` in the `ListItem` and also
     * inject an ink to indicate focus.
     */


    /**
     * A utility function to blur the `AccessibleFakeInkedButton` in the `ListItem`.
     */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          className = _props.className,
          tileStyle = _props.tileStyle,
          tileClassName = _props.tileClassName,
          contentStyle = _props.contentStyle,
          contentClassName = _props.contentClassName,
          leftNodeStyle = _props.leftNodeStyle,
          leftNodeClassName = _props.leftNodeClassName,
          rightNodeStyle = _props.rightNodeStyle,
          rightNodeClassName = _props.rightNodeClassName,
          primaryTextStyle = _props.primaryTextStyle,
          primaryTextClassName = _props.primaryTextClassName,
          secondaryTextStyle = _props.secondaryTextStyle,
          secondaryTextClassName = _props.secondaryTextClassName,
          nestedListStyle = _props.nestedListStyle,
          nestedListClassName = _props.nestedListClassName,
          nestedListHeightRestricted = _props.nestedListHeightRestricted,
          disabled = _props.disabled,
          leftIcon = _props.leftIcon,
          leftAvatar = _props.leftAvatar,
          inset = _props.inset,
          rightIcon = _props.rightIcon,
          rightAvatar = _props.rightAvatar,
          primaryText = _props.primaryText,
          secondaryText = _props.secondaryText,
          threeLines = _props.threeLines,
          children = _props.children,
          nestedItems = _props.nestedItems,
          prependNested = _props.prependNested,
          active = _props.active,
          activeClassName = _props.activeClassName,
          activeBoxStyle = _props.activeBoxStyle,
          activeBoxClassName = _props.activeBoxClassName,
          animateNestedItems = _props.animateNestedItems,
          expanderIcon = _props.expanderIcon,
          expanderLeft = _props.expanderLeft,
          component = _props.component,
          ItemComponent = _props.itemComponent,
          itemProps = _props.itemProps,
          tileProps = _props.tileProps,
          passPropsToItem = _props.passPropsToItem,
          ariaSize = _props['aria-setsize'],
          ariaPos = _props['aria-posinset'],
          isOpen = _props.isOpen,
          expanderIconChildren = _props.expanderIconChildren,
          expanderIconClassName = _props.expanderIconClassName,
          propVisible = _props.visible,
          defaultVisible = _props.defaultVisible,
          itemRef = _props.itemRef,
          defaultOpen = _props.defaultOpen,
          initiallyOpen = _props.initiallyOpen,
          props = _objectWithoutProperties(_props, ['style', 'className', 'tileStyle', 'tileClassName', 'contentStyle', 'contentClassName', 'leftNodeStyle', 'leftNodeClassName', 'rightNodeStyle', 'rightNodeClassName', 'primaryTextStyle', 'primaryTextClassName', 'secondaryTextStyle', 'secondaryTextClassName', 'nestedListStyle', 'nestedListClassName', 'nestedListHeightRestricted', 'disabled', 'leftIcon', 'leftAvatar', 'inset', 'rightIcon', 'rightAvatar', 'primaryText', 'secondaryText', 'threeLines', 'children', 'nestedItems', 'prependNested', 'active', 'activeClassName', 'activeBoxStyle', 'activeBoxClassName', 'animateNestedItems', 'expanderIcon', 'expanderLeft', 'component', 'itemComponent', 'itemProps', 'tileProps', 'passPropsToItem', 'aria-setsize', 'aria-posinset', 'isOpen', 'expanderIconChildren', 'expanderIconClassName', 'visible', 'defaultVisible', 'itemRef', 'defaultOpen', 'initiallyOpen']);

      var _context = this.context,
          cascadingId = _context.cascadingId,
          cascadingMenu = _context.cascadingMenu,
          cascadingAnchor = _context.cascadingAnchor,
          cascadingFixedTo = _context.cascadingFixedTo;

      var visible = (0, _getField2.default)(this.props, this.state, 'visible');
      if (typeof isOpen !== 'undefined') {
        visible = isOpen;
      }

      var leftNode = _react2.default.createElement(_TileAddon2.default, {
        key: 'left-addon',
        style: leftNodeStyle,
        className: leftNodeClassName,
        active: active,
        activeClassName: activeClassName,
        icon: leftIcon,
        avatar: leftAvatar
      });

      var rightNode = _react2.default.createElement(_TileAddon2.default, {
        key: 'right-addon',
        style: rightNodeStyle,
        className: rightNodeClassName,
        active: active,
        activeClassName: activeClassName,
        icon: rightIcon,
        avatar: rightAvatar
      });

      var nestedList = void 0;
      if (nestedItems) {
        if (!cascadingMenu) {
          nestedList = _react2.default.createElement(
            _Collapse2.default,
            { collapsed: !visible, animate: animateNestedItems },
            _react2.default.createElement(
              _List2.default,
              { style: nestedListStyle, className: nestedListClassName },
              nestedItems
            )
          );
        }

        var icon = _react2.default.Children.only((0, _getDeprecatedIcon2.default)(expanderIconClassName, expanderIconChildren, expanderIcon));
        var collapser = _react2.default.createElement(_TileAddon2.default, {
          key: 'expander-addon',
          icon: _react2.default.cloneElement(icon, {
            className: (0, _getCollapserStyles2.default)({ flipped: visible }, icon.props.className)
          }),
          avatar: null
        });

        if (expanderLeft) {
          if (!leftIcon && !leftAvatar) {
            leftNode = collapser;
          }
        } else if (!rightIcon && !rightAvatar) {
          rightNode = collapser;
        }
      }

      var icond = !!leftIcon || !!rightIcon || !!nestedItems;
      var avatard = !!leftAvatar || !!rightAvatar;

      var tile = _react2.default.createElement(
        _AccessibleFakeInkedButton2.default,
        _extends({}, tileProps, passPropsToItem ? undefined : props, {
          component: component,
          __SUPER_SECRET_REF__: this._setTile,
          key: 'tile',
          onClick: this._handleClick,
          onMouseOver: this._handleMouseOver,
          onMouseLeave: this._handleMouseLeave,
          onTouchStart: this._handleTouchStart,
          onTouchEnd: this._handleTouchEnd,
          onKeyDown: this._handleKeyDown,
          onKeyUp: this._handleKeyUp,
          disabled: disabled,
          style: tileStyle,
          className: (0, _classnames2.default)('md-list-tile', {
            'md-list-tile--active': this.state.active && !this._touched,
            'md-list-tile--icon': !secondaryText && icond && !avatard,
            'md-list-tile--avatar': !secondaryText && avatard,
            'md-list-tile--two-lines': secondaryText && !threeLines,
            'md-list-tile--three-lines': secondaryText && threeLines,
            'md-list-item--inset': inset && !leftIcon && !leftAvatar
          }, (0, _themeColors2.default)({ disabled: disabled, text: true }), tileClassName),
          'aria-expanded': nestedList && !cascadingMenu ? visible : null
        }),
        leftNode,
        _react2.default.createElement(_ListItemText2.default, {
          active: active,
          activeClassName: activeClassName,
          disabled: disabled,
          primaryText: primaryText,
          secondaryText: secondaryText,
          threeLines: threeLines,
          style: contentStyle,
          className: (0, _classnames2.default)({
            'md-tile-content--left-icon': leftIcon || expanderLeft && nestedItems,
            'md-tile-content--left-avatar': leftAvatar,
            'md-tile-content--right-padding': rightIcon || rightAvatar
          }, contentClassName),
          primaryTextStyle: primaryTextStyle,
          primaryTextClassName: primaryTextClassName,
          secondaryTextStyle: secondaryTextStyle,
          secondaryTextClassName: secondaryTextClassName
        }),
        rightNode,
        children
      );

      var sharedProps = _extends({}, itemProps, passPropsToItem ? props : undefined, {
        style: Object.assign({}, style, active ? activeBoxStyle : null),
        className: (0, _classnames2.default)('md-list-item', _defineProperty({
          'md-list-item--nested-container': nestedItems
        }, activeBoxClassName, activeBoxClassName && active), className),
        'aria-setsize': ariaSize,
        'aria-posinset': ariaPos,
        ref: this._setContainer
      });
      if (cascadingMenu && nestedItems) {
        return _react2.default.createElement(
          _Menu2.default,
          _extends({
            id: cascadingId,
            visible: visible,
            onClose: this._handleClick,
            toggle: tile,
            block: true,
            simplified: false,
            anchor: cascadingAnchor,
            belowAnchor: null,
            position: _Menu2.default.Positions.BELOW,
            component: ItemComponent,
            listStyle: nestedListStyle,
            listClassName: nestedListClassName,
            listHeightRestricted: nestedListHeightRestricted
          }, sharedProps, {
            fixedTo: cascadingFixedTo
          }),
          nestedItems
        );
      }

      return _react2.default.createElement(
        ItemComponent,
        sharedProps,
        prependNested ? nestedList : null,
        tile,
        prependNested ? null : nestedList
      );
    }
  }]);

  return ListItem;
}(_react.PureComponent);

ListItem.propTypes = {
  /**
   * An optional style to apply to the `li` tag.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the `li` tag.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the `.md-list-tile`.
   *
   * @see {@link #component}
   */
  tileStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the `.md-list-tile`.
   *
   * @see {@link #component}
   */
  tileClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the div that surrounds the `primaryText` and `secondaryText`
   * nodes.
   */
  contentStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the div that surrounds the `primaryText` and `secondaryText`
   * nodes.
   */
  contentClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the element that is rendered before content node.
   */
  leftNodeStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the element that is rendered before content node.
   */
  leftNodeClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the element that is rendered after content node.
   */
  rightNodeStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the element that is rendered after content node.
   */
  rightNodeClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the div surrounding the `primaryText`.
   */
  primaryTextStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the div surrounding the `primaryText`.
   */
  primaryTextClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the div surrounding the `secondaryText`.
   */
  secondaryTextStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the div surrounding the `secondaryText`.
   */
  secondaryTextClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the nested `List` that gets created when using `nestedItems`.
   */
  nestedListStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the nested `List` that gets created when using `nestedItems`.
   */
  nestedListClassName: _propTypes2.default.string,

  /**
   * Boolean if the nested `List` in a cascading menu should be restricted.
   */
  nestedListHeightRestricted: _propTypes2.default.bool,

  /**
   * Any additional children to display in the `.md-list-tile`. If you use this prop,
   * you will most likely need to override the `height` for the `.md-list-tile--icon`,
   * `.md-list-tile--avatar`, `.md-list-tile--two-lines`, and/or `.md-list-tile--three-lines`
   * to get it to display correctly unless the children are positioned `absolute`.
   */
  children: _propTypes2.default.node,

  /**
   * Boolean if the `ListItem` is disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * An optional tab index for the `.md-list-tile`. If omitted, it will default to the
   * `AccessibleFakeButton`'s `tabIndex` default prop value.
   */
  tabIndex: _propTypes2.default.number,

  /**
   * The primary text to display. This will only be rendered as a single line. Any overflown
   * text will be converted to ellipsis.
   */
  primaryText: _propTypes2.default.node.isRequired,

  /**
   * An optional secondary text to display below the `primaryText`. This can be an additional
   * one or two lines. Like the `primaryText`, and overflown text will be converted to ellipsis.
   *
   * You must set the `threeLines` prop to `true` if you want this to be displayed as two lines.
   */
  secondaryText: _propTypes2.default.node,

  /**
   * An optional `FontIcon` to display to the left of the text.
   */
  leftIcon: _propTypes2.default.node,

  /**
   * An optional `Avatar` to display to the left of the text. If you have a mixed `List` of
   * `FontIcon` and `Avatar`, it is recommended to set the `iconSized` prop on the `Avatar` to
   * `true` so that the `Avatar` will be scaled down to the `FontIcon` size.
   */
  leftAvatar: _propTypes2.default.node,

  /**
   * An optional `FontIcon` to display to the right of the text.
   */
  rightIcon: _propTypes2.default.node,

  /**
   * An optional `Avatar` to display to the right of the text. If you have a mixed `List` of
   * `FontIcon` and `Avatar`, it is recommended to set the `iconSized` prop on the `Avatar` to
   * `true` so that the `Avatar` will be scaled down to the `FontIcon` size.
   */
  rightAvatar: _propTypes2.default.node,

  /**
   * Boolean if the list item should be inset as if there is a `leftIcon` or a `leftAvatar`.
   * This is used for some lists where only a parent contains the icon.
   */
  inset: _propTypes2.default.bool,

  /**
   * Boolean if the `secondaryText` should span two lines instead of one. This will include
   * three lines of text in total when including the `primaryText`.
   */
  threeLines: _propTypes2.default.bool,

  /**
   * The component to render the `.md-list-tile` as. This is mostly useful if you
   * want to use the `ListItem` for navigation and working with the `react-router`'s `Link`
   * component.
   *
   * This prop is **not** the top-most element of the `ListItem` component. To change the
   * top-most element, see the `itemComponent` prop.
   *
   * @see {@link #itemComponent}
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,

  /**
   * The component to render the top-most element of the `ListItem` component. This is the
   * `.md-list-item` and defaults to the `<li>` element.
   *
   * @see {@link #component}
   * @see {@link #itemProps}
   */
  itemComponent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,

  /**
   * An optional ref callback to get reference to the top-most element of the `ListItem` component.
   * Just like other refs, this will provide null when it unmounts.
   */
  itemRef: _propTypes2.default.func,

  /**
   * An optional list of `ListItem`, `ListItemControl`, `Divider`, or `Subheader` components
   * to render in a nested list. This will inject an expander icon to the right of the text
   * in the `.md-list-tile` that rotates 180 degrees when open.
   *
   * The nested items will be visible once the user clicks on the `ListItem`.
   *
   * @see {@link #visible}
   */
  nestedItems: _propTypes2.default.arrayOf(_propTypes2.default.node),

  /**
   * An optional parameter determining whether `nestedItems` should be placed before or after `ListItemText`
   */
  prependNested: _propTypes2.default.bool,

  /**
   * Boolean if the `nestedItems` are visible by default.
   */
  defaultVisible: _propTypes2.default.bool,

  /**
   * Boolean if the `nestedItems` are visible. This will make the `nestedItems` controlled
   * and require the `onClick` function to be defined.
   *
   * @see {@link #defaultVisible}
   */
  visible: (0, _controlled2.default)(_propTypes2.default.bool, 'onClick', 'defaultVisible'),

  /**
   * An icon to use for the expander icon when there are nested items.
   */
  expanderIcon: _propTypes2.default.element,

  /**
   * Boolean if the expander icon should appear as the left icon instead of the right.
   */
  expanderLeft: _propTypes2.default.bool,

  /**
   * An optional function to call when the `.md-list-tile` is clicked. This is required if the
   * `visible` prop is defined.
   */
  onClick: _propTypes2.default.func,

  /**
   * An optional function to call when the `.md-list-tile` triggers the `mouseover` event.
   */
  onMouseOver: _propTypes2.default.func,

  /**
   * An optional function to call when the `.md-list-tile` triggers the `mouseleave` event.
   */
  onMouseLeave: _propTypes2.default.func,

  /**
   * An optional function to call when the `.md-list-tile` triggers the `touchstart` event.
   */
  onTouchStart: _propTypes2.default.func,

  /**
   * An optional function to call when the `.md-list-tile` triggers the `touchend` event.
   */
  onTouchEnd: _propTypes2.default.func,

  /**
   * An optional function to call when the `.md-list-tile` triggers the `keydown` event.
   */
  onKeyDown: _propTypes2.default.func,

  /**
   * An optional function to call when the `.md-list-tile` triggers the `keyup` event.
   */
  onKeyUp: _propTypes2.default.func,

  /**
   * Boolean if the `ListItem` is currently active. This will apply the `activeClassName` prop
   * to the `leftIcon`, `rightIcon`, and the `primaryText`.
   */
  active: _propTypes2.default.bool,

  /**
   * The className to apply to the `leftIcon`, `rightIcon`, and `primaryText` when the `active`
   * prop is `true`.
   */
  activeClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the top-most element of the `ListItem` component (`.md-list-item`)
   * when the `active` prop is `true`.
   */
  activeBoxStyle: _propTypes2.default.object,

  /**
   * The className to apply to the top-most element of the `ListItem` component (`.md-list-item`)
   * when the `active` prop is `true`.
   */
  activeBoxClassName: _propTypes2.default.string,

  /**
   * Boolean if the nested items should animate when they appear or disappear.
   */
  animateNestedItems: _propTypes2.default.bool,

  /**
   * Defines the number of items in the list. This is only required when all items in the
   * list are not present in the DOM.
   *
   * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-setsize
   */
  'aria-setsize': _propTypes2.default.number,

  /**
   * Defines the items position in the list. This is only required when all items in the list
   * are not present in the DOM. The custom validation just requires this prop if the `aria-setsize`
   * prop is defined as a helpful reminder.
   *
   * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-posinset
   */
  'aria-posinset': function ariaPosinset(props, propName) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var validator = _propTypes2.default.number;
    if (typeof props['aria-setsize'] !== 'undefined') {
      validator = validator.isRequired;
    }

    return validator.apply(undefined, [props, propName].concat(args));
  },

  /**
   * Any additional props you would like to supply to the surrounding `<li>` tag for the `ListItem`.
   * By default, all props will be provided to the inner `AccessibleFakeButton`. If the `passPropsToItem`
   * prop is enabled, the remaining props will be provided to the `<li>` tag instead and this prop
   * is probably useless.
   */
  itemProps: _propTypes2.default.object,

  /**
   * Any additional props you would like to add to the inner `AccessibleFakeButton`. By default, all the
   * remaining props will be provided to the `AccessibleFakeButton`, so this prop is probably useless.
   * Enabling the `passPropsToItem` prop will change the default behavior so that the remaining props
   * are provided to the surrounding `<li>` node instead and this prop becomes useful.
   */
  tileProps: _propTypes2.default.object,

  /**
   * All the remaining props should be passed to the surrounding `<li>` node instead of the `AccessibleFakeButton`.
   *
   * > NOTE: This will most likely become the default in the next *major* release. Migration warnings will be added
   * if that is the case.
   */
  passPropsToItem: _propTypes2.default.bool,
  expanderIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use `expanderIcon` instead'),
  expanderIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `expanderIcon` instead'),
  initiallyOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `defaultVisible` instead'),
  defaultOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `defaultVisible` instead'),
  isOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `visible` instead')
};
ListItem.defaultProps = {
  animateNestedItems: true,
  activeClassName: 'md-text--theme-primary',
  component: 'div',
  itemComponent: 'li',
  expanderIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'keyboard_arrow_down'
  )
};
ListItem.contextTypes = {
  cascadingId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  cascadingMenu: _propTypes2.default.bool,
  cascadingAnchor: _anchorShape2.default,
  cascadingFixedTo: _fixedToShape2.default
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.focus = function () {
    if (_this2._tile) {
      _this2._tile.focus();
    }
  };

  this.blur = function () {
    if (_this2._tile) {
      _this2._tile.blur();
    }
  };

  this._setTile = function (tile) {
    if (tile) {
      _this2._tile = tile;
      _this2._tileNode = (0, _reactDom.findDOMNode)(tile);
    }
  };

  this._setContainer = function (container) {
    var itemRef = _this2.props.itemRef;

    if (container) {
      _this2._container = (0, _reactDom.findDOMNode)(container);
    }
    if (itemRef) {
      itemRef(container ? _this2._container : null);
    }
  };

  this._handleOutsideClick = function (e) {
    if (_this2._container && !_this2._container.contains(e.target)) {
      window.removeEventListener('click', _this2._handleOutsideClick);
      _this2.setState({ active: false });
    }
  };

  this._handleClick = function (e) {
    if (_this2.props.onClick) {
      _this2.props.onClick(e);
    }

    if (typeof _this2.state.visible !== 'undefined') {
      _this2.setState({ visible: !_this2.state.visible });
    }
  };

  this._handleMouseOver = function (e) {
    if (_this2.props.onMouseOver) {
      _this2.props.onMouseOver(e);
    }

    if (!_this2.props.disabled) {
      _this2.setState({ active: true });
    }
  };

  this._handleMouseLeave = function (e) {
    if (_this2.props.onMouseLeave) {
      _this2.props.onMouseLeave(e);
    }

    if (!_this2.props.disabled) {
      _this2.setState({ active: false });
    }
  };

  this._handleTouchStart = function (e) {
    if (_this2.props.onTouchStart) {
      _this2.props.onTouchStart(e);
    }

    _this2._touched = true;

    _this2.setState({ active: true, touchedAt: Date.now() });
  };

  this._handleTouchEnd = function (e) {
    if (_this2.props.onTouchEnd) {
      _this2.props.onTouchEnd(e);
    }

    var time = Date.now() - _this2.state.touchedAt;
    _this2._touchTimeout = setTimeout(function () {
      _this2._touchTimeout = null;

      _this2.setState({ active: false });
    }, time > 450 ? 0 : 450 - time);
  };

  this._handleKeyUp = function (e) {
    if (_this2.props.onKeyUp) {
      _this2.props.onKeyUp(e);
    }

    if ((e.which || e.keyCode) === _keyCodes.TAB) {
      window.addEventListener('click', _this2._handleOutsideClick);
      _this2.setState({ active: true });
    }
  };

  this._handleKeyDown = function (e) {
    if (_this2.props.onKeyDown) {
      _this2.props.onKeyDown(e);
    }

    if ((e.which || e.keyCode) === _keyCodes.TAB) {
      window.removeEventListener('click', _this2._handleOutsideClick);
      _this2.setState({ active: false });
    }
  };
};

exports.default = ListItem;
//# sourceMappingURL=ListItem.js.map