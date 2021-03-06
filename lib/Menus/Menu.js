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

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _CSSTransitionGroupTick = require('../constants/CSSTransitionGroupTick');

var _CSSTransitionGroupTick2 = _interopRequireDefault(_CSSTransitionGroupTick);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _handleKeyboardAccessibility = require('../utils/EventUtils/handleKeyboardAccessibility');

var _handleKeyboardAccessibility2 = _interopRequireDefault(_handleKeyboardAccessibility);

var _anchorShape = require('../Helpers/anchorShape');

var _anchorShape2 = _interopRequireDefault(_anchorShape);

var _fixedToShape = require('../Helpers/fixedToShape');

var _fixedToShape2 = _interopRequireDefault(_fixedToShape);

var _positionShape = require('../Helpers/positionShape');

var _positionShape2 = _interopRequireDefault(_positionShape);

var _Layover = require('../Helpers/Layover');

var _Layover2 = _interopRequireDefault(_Layover);

var _List = require('../Lists/List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `Menu` controlled component is used to display a list of children in the `List`
 * component once the `visible` prop is true.
 */
var Menu = function (_PureComponent) {
  _inherits(Menu, _PureComponent);

  function Menu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Menu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Menu.__proto__ || Object.getPrototypeOf(Menu)).call.apply(_ref, [this].concat(args))), _this), _this._handleClose = function (e) {
      var _this$props = _this.props,
          close = _this$props.close,
          onClose = _this$props.onClose;

      if (close || onClose) {
        (close || onClose)(e);
      }
    }, _this._handleClick = function (e) {
      if (_this.props.onClick) {
        _this.props.onClick(e);
      }

      var node = e.target;
      while (_this._container && _this._container.contains(node)) {
        if (_this._isIgnoreTarget(node)) {
          return;
        } else if (_this._isCloseTarget(node)) {
          e.persist();
          // set a timeout so item click events still trigger, and then close
          _this._timeout = setTimeout(function () {
            _this._timeout = null;
            _this._handleClose(e);
          }, _CSSTransitionGroupTick2.default);

          return;
        }

        node = node.parentNode;
      }
    }, _this._handleKeyDown = function (e) {
      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }

      (0, _handleKeyboardAccessibility2.default)(e, _this._handleClick, true, true);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Menu, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _props = this.props,
          cascading = _props.cascading,
          id = _props.id,
          fixedTo = _props.fixedTo,
          cascadingAnchor = _props.cascadingAnchor;

      var listLevel = this.context.listLevel || 0;
      var cascadingMenu = typeof cascading !== 'undefined' ? cascading : this.context.cascadingMenu;
      var cascadingZDepth = (0, _getField2.default)(this.context, this.props, 'cascadingZDepth');
      var cascadingFixedTo = typeof fixedTo !== 'undefined' ? fixedTo : this.context.cascadingFixedTo;

      return {
        listLevel: listLevel,
        cascadingId: id + '-level-' + (listLevel + 1),
        cascadingMenu: cascadingMenu,
        cascadingAnchor: cascadingAnchor,
        cascadingZDepth: cascadingZDepth,
        cascadingFixedTo: cascadingFixedTo
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._container = (0, _reactDom.findDOMNode)(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
    }
  }, {
    key: '_isCloseTarget',


    /**
     * Checks if a provided event target or HTML Element is considered a menu click target.
     * This normally is just a ListItem.
     */
    value: function _isCloseTarget(target) {
      return target.classList.contains('md-list-item') && !target.classList.contains('md-list-item--nested-container');
    }

    /**
     * Checks if a provided event target or HTML Element is something that should shortcut/break
     * out of the click event loop because it **should not** close menus when clicked.
     */

  }, {
    key: '_isIgnoreTarget',
    value: function _isIgnoreTarget(target) {
      return target.getAttribute('disabled') !== null || target.classList.contains('md-list-control');
    }
  }, {
    key: 'render',
    value: function render() {
      var _cn;

      var _props2 = this.props,
          id = _props2.id,
          className = _props2.className,
          listStyle = _props2.listStyle,
          listClassName = _props2.listClassName,
          visible = _props2.visible,
          children = _props2.children,
          listProps = _props2.listProps,
          listZDepth = _props2.listZDepth,
          listInline = _props2.listInline,
          listHeightRestricted = _props2.listHeightRestricted,
          cascading = _props2.cascading,
          sameWidth = _props2.sameWidth,
          simplified = _props2.simplified,
          contained = _props2.contained,
          isOpen = _props2.isOpen,
          propFixedTo = _props2.fixedTo,
          propListId = _props2.listId,
          cascadingAnchor = _props2.cascadingAnchor,
          cascadingZDepth = _props2.cascadingZDepth,
          onClose = _props2.onClose,
          propPosition = _props2.position,
          close = _props2.close,
          autoclose = _props2.autoclose,
          limitHeight = _props2.limitHeight,
          expanderIconChildren = _props2.expanderIconChildren,
          expanderIconClassName = _props2.expanderIconClassName,
          props = _objectWithoutProperties(_props2, ['id', 'className', 'listStyle', 'listClassName', 'visible', 'children', 'listProps', 'listZDepth', 'listInline', 'listHeightRestricted', 'cascading', 'sameWidth', 'simplified', 'contained', 'isOpen', 'fixedTo', 'listId', 'cascadingAnchor', 'cascadingZDepth', 'onClose', 'position', 'close', 'autoclose', 'limitHeight', 'expanderIconChildren', 'expanderIconClassName']);

      var _props3 = this.props,
          listId = _props3.listId,
          position = _props3.position;

      if (!listId) {
        listId = id + '-list';
      }

      // can't have a simplified menu for cascading and context menus
      var simple = !cascading && !props.onContextMenu && position !== 'context' && simplified;
      if (position === 'context') {
        position = Menu.Positions.BELOW;
      }

      var below = position === Menu.Positions.BELOW;
      var fixedTo = typeof propFixedTo !== 'undefined' ? propFixedTo : this.context.cascadingFixedTo;
      var listVisible = typeof isOpen !== 'undefined' ? isOpen : visible;
      return _react2.default.createElement(
        _Layover2.default,
        _extends({}, props, {
          id: id,
          className: (0, _classnames2.default)('md-menu-container', {
            'md-menu-container--menu-below': simplified && below
          }, className),
          simplified: simple,
          sameWidth: contained || sameWidth,
          fixedTo: fixedTo,
          onClick: this._handleClick,
          onKeyDown: this._handleKeyDown,
          onClose: this._handleClose,
          animationPosition: position,
          visible: listVisible,
          'aria-haspopup': true,
          'aria-expanded': listVisible,
          'aria-owns': listId
        }),
        _react2.default.createElement(
          _List2.default,
          _extends({}, listProps, {
            id: listId,
            key: 'menu-list',
            style: listStyle,
            className: (0, _classnames2.default)('md-list--menu', (_cn = {
              'md-list--menu-restricted': listHeightRestricted,
              'md-list--menu-contained': simplified && (sameWidth || contained)
            }, _defineProperty(_cn, 'md-list--menu-' + position, simplified), _defineProperty(_cn, 'md-paper md-paper--' + listZDepth, listZDepth), _cn), listClassName),
            inline: listInline
          }),
          children
        )
      );
    }
  }]);

  return Menu;
}(_react.PureComponent);

Menu.HorizontalAnchors = _Layover2.default.HorizontalAnchors;
Menu.VerticalAnchors = _Layover2.default.VerticalAnchors;
Menu.Positions = {
  // Can't do ...Layover.Positions since it triggers the get for CONTEXT
  TOP_LEFT: _Layover2.default.Positions.TOP_LEFT,
  TOP_RIGHT: _Layover2.default.Positions.TOP_RIGHT,
  BOTTOM_LEFT: _Layover2.default.Positions.BOTTOM_LEFT,
  BOTTOM_RIGHT: _Layover2.default.Positions.BOTTOM_RIGHT,
  BELOW: _Layover2.default.Positions.BELOW,
  _warned: false,
  get CONTEXT() {
    if (!this._warned) {
      /* eslint-disable no-console */
      console.error('The `Menu.Positions.CONTEXT` position has been deprecated and will be removed ' + 'in the next major release. To make the `Menu` behave as a context menu, provide ' + 'the `onContextMenu` prop instead.');
      /* eslint-enable no-console */
    }

    this._warned = true;
    return 'context';
  }
};
Menu.propTypes = {
  /**
   * An id to provide to the menu's container. This is required for accessibility as it generates
   * the `aria-` attributes for dynamic content.
   *
   * @see {@link #listId}
   */
  id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

  /**
   * An optional id to provide to the menu's list. If this prop is omitted, the list's id will be
   * `\`${id}-list\``
   */
  listId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional style to apply to the main container for the menu.
   */
  style: _propTypes2.default.object,

  /**
   * An optional class name to apply to the main container for the menu.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the list once the menu has opened.
   */
  listStyle: _propTypes2.default.object,

  /**
   * An optional class name to apply to the list once the menu has opened.
   */
  listClassName: _propTypes2.default.string,

  /**
   * The component to render the main container as.
   *
   * @see {@link Helpers/Layover#component}
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),

  /**
   * This is how the menu's `List` gets anchored to the `toggle` element.
   *
   * @see {@link Helpers/Layover#anchor}
   */
  anchor: _anchorShape2.default,

  /**
   * This is the optional anchor to use when the `position` is set to `Menu.Positions.BELOW`.
   * Set this to `null` to use the default `anchor` prop.
   *
   * @see {@link Helpers/Layover#belowAnchor}
   */
  belowAnchor: _anchorShape2.default,

  /**
   * This is the animation position for the list that appears.
   *
   * @see {@link Helpers/Layover#animationPosition}
   */
  position: _positionShape2.default,

  /**
   * This is the component/element that should toggle the menu open.
   *
   * @see {@link Helpers/Layover#toggle}
   */
  toggle: _propTypes2.default.node,

  /**
   * This is how the menu's list will be "fixed" to the `toggle` component.
   *
   * @see {@link Helpers/Layover#fixedTo}
   */
  fixedTo: _fixedToShape2.default,

  /**
   * Any additional props that should be applied to the list in the menu. This is really used
   * when additional `aria-` tags need to be applied.
   */
  listProps: _propTypes2.default.object,

  /**
   * Boolean if the menu's list should appear horizontally instead of vertically.
   */
  listInline: _propTypes2.default.bool,

  /**
   * The list's z-depth for applying box shadow. This should be a number from 0 to 5.
   */
  listZDepth: _propTypes2.default.number.isRequired,

  /**
   * Boolean if the list should have its height restricted to the `$md-menu-mobile-max-height`/
   * `$md-menu-desktop-max-height` values.
   *
   * @see [md-menu-mobile-max-height](/components/menus?tab=2#variable-md-menu-mobile-max-height)
   * @see [md-menu-desktop-max-height](/components/menus?tab=2#variable-md-menu-desktop-max-height)
   */
  listHeightRestricted: _propTypes2.default.bool,

  /**
   * Boolean if the menu's list is visible.
   */
  visible: _propTypes2.default.bool.isRequired,

  /**
   * Any children to render in the menu's list. This _should_ normally be `ListItem`, or
   * `ListItemControl`.
   */
  children: _propTypes2.default.node,

  /**
   * An optional function to call when en element in the menu has been clicked.
   */
  onClick: _propTypes2.default.func,

  /**
   * An optional function to call when a key is pressed anywhere in the menu.
   */
  onKeyDown: _propTypes2.default.func,

  /**
   * A function to call to close the menu. This is used for closing on outside clicks,
   * closing when a list item has been clicked, or the user presses escape.
   */
  onClose: _propTypes2.default.func.isRequired,

  /**
   * Boolean if the menu should be cascading. This means that the menu will pop the additional
   * `nestedItems` on any `ListItem` to be appear either to the right or left of the visible list.
   */
  cascading: _propTypes2.default.bool,

  /**
   * This is how the cascading lists get anchored to the list item.
   *
   * @see {@link Helpers/Layover#anchor}
   */
  cascadingAnchor: _Layover2.default.propTypes.anchor,

  /**
   * This is the z-depth the list should gain for a cascading menu. This only gets applied on
   * items that are more than 1 level deep.
   */
  cascadingZDepth: _propTypes2.default.number.isRequired,

  /**
   * Boolean if the `md-full-width` class name should get applied to the menu's container.
   */
  fullWidth: _propTypes2.default.bool,

  /**
   * Boolean if the menu should be displayed as a block instead of as an inline block.
   *
   * @see {@link #fullWidth}
   */
  block: _propTypes2.default.bool,

  /**
   * @see {@link Helpers/Layover#centered}
   */
  centered: _Layover2.default.propTypes.centered,

  /**
   * @see {@link Helpers/Layover#sameWidth}
   */
  sameWidth: _Layover2.default.propTypes.sameWidth,

  /**
   * If you would like the menu to interact as a context menu, provide this prop.
   *
   * @see {@link Helpers/Layover#onContextMenu}
   */
  onContextMenu: _Layover2.default.propTypes.onContextMenu,

  /**
   * Boolean if the default behavior of the context menu should be prevented when using the
   * `onContextMenu` prop.
   *
   * @see {@link Helpers/Layover#preventContextMenu}
   */
  preventContextMenu: _Layover2.default.propTypes.preventContextMenu,

  /**
   * @see {@link Helpers/Layover#xThreshold}
   */
  xThreshold: _propTypes2.default.number,

  /**
   * @see {@link Helpers/Layover#yThreshold}
   */
  yThreshold: _propTypes2.default.number,

  /**
   * @see {@link Helpers/Layover#closeOnOutsideClick}
   */
  closeOnOutsideClick: _propTypes2.default.bool,

  /**
   * @see {@link Helpers/Layover#toggleQuery}
   */
  toggleQuery: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * An optional transition name to use for the list appearing/disappearing.
   *
   * @see {@link Helpers/Layover#transitionName}
   */
  transitionName: _propTypes2.default.string,

  /**
   * @see {@link Helpers/Layover#transitionEnterTimeout}
   */
  transitionEnterTimeout: _propTypes2.default.number,

  /**
   * @see {@link Helpers/Layover#transitionLeaveTimeout}
   */
  transitionLeaveTimeout: _propTypes2.default.number,

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
   * @see {@link Helpers/Layover#simplified}
   */
  simplified: _propTypes2.default.bool,

  /**
   * @see {@link Helpers/Layover#minLeft}
   */
  minLeft: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * @see {@link Helpers/Layover#minRight}
   */
  minRight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * @see {@link Helpers/Layover#minBottom}
   */
  minBottom: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * @see {@link Helpers/Layover#fillViewportWidth}
   */
  fillViewportWidth: _propTypes2.default.bool,

  /**
   * @see {@link Helpers/Layover#fillViewportHeight}
   */
  fillViewportHeight: _propTypes2.default.bool,

  isOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `visible` instead'),
  close: (0, _deprecated2.default)(_propTypes2.default.func, 'Use `onClose` instead'),
  autoclose: (0, _deprecated2.default)(_propTypes2.default.bool, 'The menus will always autoclose as according to the specs'),
  contained: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `sameWidth` instead'),
  limitHeight: (0, _deprecated2.default)(_propTypes2.default.bool, 'The menus will always be limited in height as according to the specs'),
  expanderIconClassName: (0, _deprecated2.default)(_propTypes2.default.node, 'The expander for cascading menus will now just be a simple rotate of the existing `ListItem` ' + 'expander icon'),
  expanderIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'The expander for cascading menus will now just be a simple rotate of the existing `ListItem` ' + 'expander icon')
};
Menu.defaultProps = {
  anchor: {
    x: _Layover2.default.HorizontalAnchors.INNER_RIGHT,
    y: _Layover2.default.VerticalAnchors.OVERLAP
  },
  cascadingAnchor: {
    x: _Layover2.default.HorizontalAnchors.RIGHT,
    y: _Layover2.default.VerticalAnchors.OVERLAP
  },
  position: _Layover2.default.Positions.TOP_RIGHT,
  fixedTo: typeof window !== 'undefined' ? window : {},
  listZDepth: 2,
  listHeightRestricted: true,
  cascadingZDepth: 3,
  repositionOnScroll: true,
  repositionOnResize: false,
  simplified: true
};
Menu.contextTypes = {
  listLevel: _propTypes2.default.number,
  cascadingId: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  cascadingMenu: _propTypes2.default.bool,
  cascadingAnchor: _anchorShape2.default,
  cascadingZDepth: _propTypes2.default.number
};
Menu.childContextTypes = {
  listLevel: _propTypes2.default.number,
  cascadingId: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  cascadingMenu: _propTypes2.default.bool,
  cascadingFixedTo: _fixedToShape2.default,
  cascadingAnchor: _anchorShape2.default,
  cascadingZDepth: _propTypes2.default.number
};
exports.default = Menu;
//# sourceMappingURL=Menu.js.map