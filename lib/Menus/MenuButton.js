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

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _anchorShape = require('../Helpers/anchorShape');

var _anchorShape2 = _interopRequireDefault(_anchorShape);

var _fixedToShape = require('../Helpers/fixedToShape');

var _fixedToShape2 = _interopRequireDefault(_fixedToShape);

var _positionShape = require('../Helpers/positionShape');

var _positionShape2 = _interopRequireDefault(_positionShape);

var _Button = require('../Buttons/Button');

var _Button2 = _interopRequireDefault(_Button);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `MenuButton` is a simple wrapper / combination of the `Button` and the `Menu`
 * components that can be uncontrolled.
 */
var MenuButton = function (_PureComponent) {
    _inherits(MenuButton, _PureComponent);

    function MenuButton() {
        _classCallCheck(this, MenuButton);

        return _possibleConstructorReturn(this, (MenuButton.__proto__ || Object.getPrototypeOf(MenuButton)).apply(this, arguments));
    }

    _createClass(MenuButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                listId = _props.listId,
                buttonId = _props.buttonId,
                menuStyle = _props.menuStyle,
                menuClassName = _props.menuClassName,
                listStyle = _props.listStyle,
                listClassName = _props.listClassName,
                listProps = _props.listProps,
                listZDepth = _props.listZDepth,
                listInline = _props.listInline,
                listHeightRestricted = _props.listHeightRestricted,
                menuItems = _props.menuItems,
                buttonChildren = _props.buttonChildren,
                children = _props.children,
                anchor = _props.anchor,
                belowAnchor = _props.belowAnchor,
                fixedTo = _props.fixedTo,
                position = _props.position,
                cascading = _props.cascading,
                cascadingAnchor = _props.cascadingAnchor,
                cascadingZDepth = _props.cascadingZDepth,
                fullWidth = _props.fullWidth,
                block = _props.block,
                centered = _props.centered,
                sameWidth = _props.sameWidth,
                repositionOnScroll = _props.repositionOnScroll,
                repositionOnResize = _props.repositionOnResize,
                xThreshold = _props.xThreshold,
                yThreshold = _props.yThreshold,
                closeOnOutsideClick = _props.closeOnOutsideClick,
                transitionName = _props.transitionName,
                transitionEnterTimeout = _props.transitionEnterTimeout,
                transitionLeaveTimeout = _props.transitionLeaveTimeout,
                visible = _props.visible,
                defaultVisible = _props.defaultVisible,
                onVisibilityChange = _props.onVisibilityChange,
                simplifiedMenu = _props.simplifiedMenu,
                minLeft = _props.minLeft,
                minRight = _props.minRight,
                minBottom = _props.minBottom,
                fillViewportWidth = _props.fillViewportWidth,
                fillViewportHeight = _props.fillViewportHeight,
                onMenuClick = _props.onMenuClick,
                onMenuMouseDown = _props.onMenuMouseDown,
                onMenuMouseUp = _props.onMenuMouseUp,
                onMenuMouseEnter = _props.onMenuMouseEnter,
                onMenuMouseMove = _props.onMenuMouseMove,
                onMenuMouseLeave = _props.onMenuMouseLeave,
                onMenuTouchStart = _props.onMenuTouchStart,
                onMenuTouchMove = _props.onMenuTouchMove,
                onMenuTouchCancel = _props.onMenuTouchCancel,
                onMenuTouchEnd = _props.onMenuTouchEnd,
                onMenuFocus = _props.onMenuFocus,
                onMenuBlur = _props.onMenuBlur,
                onMenuKeyDown = _props.onMenuKeyDown,
                onMenuKeyUp = _props.onMenuKeyUp,
                isOpen = _props.isOpen,
                defaultOpen = _props.defaultOpen,
                onMenuToggle = _props.onMenuToggle,
                props = _objectWithoutProperties(_props, ['id', 'listId', 'buttonId', 'menuStyle', 'menuClassName', 'listStyle', 'listClassName', 'listProps', 'listZDepth', 'listInline', 'listHeightRestricted', 'menuItems', 'buttonChildren', 'children', 'anchor', 'belowAnchor', 'fixedTo', 'position', 'cascading', 'cascadingAnchor', 'cascadingZDepth', 'fullWidth', 'block', 'centered', 'sameWidth', 'repositionOnScroll', 'repositionOnResize', 'xThreshold', 'yThreshold', 'closeOnOutsideClick', 'transitionName', 'transitionEnterTimeout', 'transitionLeaveTimeout', 'visible', 'defaultVisible', 'onVisibilityChange', 'simplifiedMenu', 'minLeft', 'minRight', 'minBottom', 'fillViewportWidth', 'fillViewportHeight', 'onMenuClick', 'onMenuMouseDown', 'onMenuMouseUp', 'onMenuMouseEnter', 'onMenuMouseMove', 'onMenuMouseLeave', 'onMenuTouchStart', 'onMenuTouchMove', 'onMenuTouchCancel', 'onMenuTouchEnd', 'onMenuFocus', 'onMenuBlur', 'onMenuKeyDown', 'onMenuKeyUp', 'isOpen', 'defaultOpen', 'onMenuToggle']);

            var items = children;
            var toggleChildren = buttonChildren;
            if (typeof menuItems !== 'undefined') {
                toggleChildren = children;
                items = menuItems;
            }

            return _react2.default.createElement(
                _DropdownMenu2.default,
                {
                    id: id,
                    listId: listId,
                    style: menuStyle,
                    className: menuClassName,
                    listStyle: listStyle,
                    listClassName: listClassName,
                    listProps: listProps,
                    listInline: listInline,
                    listZDepth: listZDepth,
                    listHeightRestricted: listHeightRestricted,
                    visible: typeof isOpen !== 'undefined' ? isOpen : visible,
                    defaultVisible: typeof defaultOpen !== 'undefined' ? defaultOpen : defaultVisible,
                    menuItems: items,
                    simplifiedMenu: simplifiedMenu,
                    anchor: anchor,
                    belowAnchor: belowAnchor,
                    fixedTo: fixedTo,
                    position: position,
                    cascading: cascading,
                    cascadingAnchor: cascadingAnchor,
                    cascadingZDepth: cascadingZDepth,
                    fullWidth: fullWidth,
                    block: block,
                    centered: centered,
                    sameWidth: sameWidth,
                    minLeft: minLeft,
                    minRight: minRight,
                    minBottom: minBottom,
                    fillViewportWidth: fillViewportWidth,
                    fillViewportHeight: fillViewportHeight,
                    repositionOnScroll: repositionOnScroll,
                    repositionOnResize: repositionOnResize,
                    xThreshold: xThreshold,
                    yThreshold: yThreshold,
                    closeOnOutsideClick: closeOnOutsideClick,
                    transitionName: transitionName,
                    transitionEnterTimeout: transitionEnterTimeout,
                    transitionLeaveTimeout: transitionLeaveTimeout,
                    onVisibilityChange: onMenuToggle || onVisibilityChange,
                    onClick: onMenuClick,
                    onMouseDown: onMenuMouseDown,
                    onMouseUp: onMenuMouseUp,
                    onMouseEnter: onMenuMouseEnter,
                    onMouseMove: onMenuMouseMove,
                    onMouseLeave: onMenuMouseLeave,
                    onTouchStart: onMenuTouchStart,
                    onTouchMove: onMenuTouchMove,
                    onTouchCancel: onMenuTouchCancel,
                    onTouchEnd: onMenuTouchEnd,
                    onFocus: onMenuFocus,
                    onBlur: onMenuBlur,
                    onKeyDown: onMenuKeyDown,
                    onKeyUp: onMenuKeyUp
                },
                _react2.default.createElement(
                    _Button2.default,
                    _extends({}, props, { id: buttonId }),
                    toggleChildren
                )
            );
        }
    }]);

    return MenuButton;
}(_react.PureComponent);

MenuButton.Positions = _DropdownMenu2.default.Positions;
MenuButton.HorizontalAnchors = _DropdownMenu2.default.HorizontalAnchors;
MenuButton.VerticalAnchors = _DropdownMenu2.default.VerticalAnchors;
MenuButton.propTypes = {
    /**
     * An id to use for the menu button. This is required for accessibility.
     *
     * @see {@link Menus/Menu#id}
     */
    id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

    /**
     * An optional id to provide to the menu's list.
     *
     * @see {@link Menus/Menu#listId}
     */
    listId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

    /**
     * An optional id to provide to the button. If this is omitted, the button will automatically
     * gain an id of `${id}-toggle`.
     */
    buttonId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

    /**
     * An optional style to apply to the button.
     */
    style: _propTypes2.default.object,

    /**
     * An optional className to apply to the button.
     */
    className: _propTypes2.default.string,

    /**
     * An optional style to apply to the surrounding menu.
     */
    menuStyle: _propTypes2.default.object,

    /**
     * An optional className to apply to the surrounding menu.
     */
    menuClassName: _propTypes2.default.string,

    /**
     * An optional style to apply to the list.
     */
    listStyle: _propTypes2.default.object,

    /**
     * An optional class name to apply to the list.
     */
    listClassName: _propTypes2.default.string,

    /**
     * Any additional props to provide to the list.
     *
     * @see {@link Menus/Menu#listProps}
     */
    listProps: _propTypes2.default.object,

    /**
     * The z-depth to use for the list.
     *
     * @see {@link Menus/Menu/listZDepth}
     */
    listZDepth: _propTypes2.default.number,

    /**
     * Boolean if the list should be displayed inline.
     *
     * @see {@link Lists/List#inline}
     */
    listInline: _propTypes2.default.bool,

    /**
     * Boolean if the list's height should be restricted.
     *
     * @see {@link Menus/Menu#listHeightRestricted}
     */
    listHeightRestricted: _propTypes2.default.bool,

    /**
     * Boolean if the menu's list is currently visible. If this is defined, it will
     * require the `onVisibilityChange` function to be defined since it will become
     * a controlled component.
     */
    visible: (0, _controlled2.default)(_propTypes2.default.bool, 'onVisibilityChange', 'defaultVisible'),

    /**
     * Boolean if the menu's list should be visible by default.
     */
    defaultVisible: _propTypes2.default.bool.isRequired,

    /**
     * An optional function to call when the button is clicked.
     *
     * @see {@link #onMenuClick}
     */
    onClick: _propTypes2.default.func,

    /**
     * An optional function to call when the `mousedown` event is triggered by the button.
     *
     * @see {@link #onMenuMouseDown}
     */
    onMouseDown: _propTypes2.default.func,

    /**
     * An optional function to call when the `mouseup` event is triggered by the button.
     *
     * @see {@link #onMenuMouseUp}
     */
    onMouseUp: _propTypes2.default.func,

    /**
     * An optional function to call when the `mouseenter` event is triggered by the button.
     *
     * @see {@link #onMenuMouseEnter}
     */
    onMouseEnter: _propTypes2.default.func,

    /**
     * An optional function to call when the `mousemove` event is triggered by the button.
     *
     * @see {@link #onMenuMouseMove}
     */
    onMouseMove: _propTypes2.default.func,

    /**
     * An optional function to call when the `mouseleave` event is triggered by the button.
     *
     * @see {@link #onMenuMouseLeave}
     */
    onMouseLeave: _propTypes2.default.func,

    /**
     * An optional function to call when the `touchstart` event is triggered by the button.
     *
     * @see {@link #onMenuTouchStart}
     */
    onTouchStart: _propTypes2.default.func,

    /**
     * An optional function to call when the `touchmove` event is triggered by the button.
     *
     * @see {@link #onMenuTouchMove}
     */
    onTouchMove: _propTypes2.default.func,

    /**
     * An optional function to call when the `touchend` event is triggered by the button.
     *
     * @see {@link #onMenuTouchEnd}
     */
    onTouchEnd: _propTypes2.default.func,

    /**
     * An optional function to call when the `touchcancel` event is triggered by the button.
     *
     * @see {@link #onMenuTouchCancel}
     */
    onTouchCancel: _propTypes2.default.func,

    /**
     * An optional function to call when the `focus` event is triggered by the button.
     *
     * @see {@link #onMenuFocus}
     */
    onFocus: _propTypes2.default.func,

    /**
     * An optional function to call when the `blur` event is triggered by the button.
     *
     * @see {@link #onMenuBlur}
     */
    onBlur: _propTypes2.default.func,

    /**
     * An optional function to call when the `keydown` event is triggered by the button.
     *
     * @see {@link #onMenuKeyDown}
     */
    onKeyDown: _propTypes2.default.func,

    /**
     * An optional function to call when the `keyup` event is triggered by the button.
     *
     * @see {@link #onMenuKeyUp}
     */
    onKeyUp: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the entire `MenuButton` is clicked. This can be triggered
     * by clicking the button or any list item that appears in the menu list.
     *
     * @see {@link #onClick}
     */
    onMenuClick: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `mousedown` event.
     *
     * @see {@link #onMouseDown}
     */
    onMenuMouseDown: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `mouseup` event.
     *
     * @see {@link #onMouseUp}
     */
    onMenuMouseUp: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `mouseenter` event.
     *
     * @see {@link #onMouseEnter}
     */
    onMenuMouseEnter: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `mousemove` event.
     *
     * @see {@link #onMouseMove}
     */
    onMenuMouseMove: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `mouseleave` event.
     *
     * @see {@link #onMouseLeave}
     */
    onMenuMouseLeave: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `touchstart` event.
     *
     * @see {@link @onTouchStart}
     */
    onMenuTouchStart: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `touchmove` event.
     *
     * @see {@link @onTouchMove}
     */
    onMenuTouchMove: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `touchend` event.
     *
     * @see {@link @onTouchEnd}
     */
    onMenuTouchEnd: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `touchcancel` event.
     *
     * @see {@link @onTouchCancel}
     */
    onMenuTouchCancel: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `focus` event.
     *
     * @see {@link #onFocus}
     */
    onMenuFocus: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `blur` event.
     *
     * @see {@link #onBlur}
     */
    onMenuBlur: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `keydown` event.
     *
     * @see {@link #onKeyDown}
     */
    onMenuKeyDown: _propTypes2.default.func,

    /**
     * An optional function to call when any element in the `MenuButton` triggers the `keyup` event.
     *
     * @see {@link #onKeyUp}
     */
    onMenuKeyUp: _propTypes2.default.func,

    /**
     * An optional function to call when the visibility changes for the menu. The callback will
     * include the next visibility state and the event that triggered the change.
     *
     * ```js
     * onVisibilityChange(visible, event);
     * ```
     */
    onVisibilityChange: _propTypes2.default.func,

    /**
     * This is a 0 to many relationship of `ListItem` to display in the menu's `List`. If the type
     * of the item is a number or string, it will be passed to the `ListItem` as the `primaryText`.
     * If it is an object, it should be the shape of the `ListItem` props. If it is a node, it will
     * just be rendered in the `List`.
     *
     * @see {@link Lists/ListItem}
     * @see {@link Menus/Menu#children}
     */
    menuItems: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.object, _propTypes2.default.node]))]),

    /**
     * This should be the children to use in the `Button` that gets created as the menu's toggle.
     *
     * @see {@link Buttons/Button}
     * @see {@link Menus/Menu#toggle}
     */
    children: _propTypes2.default.node,

    /**
     * The anchor position of the menu's list.
     *
     * @see {@link Helpers/Layover#anchor}
     */
    anchor: _anchorShape2.default,

    /**
     * This is the anchor to use when the `position` is set to `Autocomplete.Positions.BELOW`.
     *
     * @see {@link Helpers/Layover#belowAnchor}
     */
    belowAnchor: _anchorShape2.default,

    /**
     * This is how the menu's list is fixed to the toggle.
     *
     * @see {@link Menus/Menu#fixedTo}
     */
    fixedTo: _fixedToShape2.default,

    /**
     * This is the animation position for the menu's list.
     *
     * @see {@link Menus/Menu#position}
     */
    position: _positionShape2.default,

    /**
     * Boolean if the menu's list should gain the cascading styles.
     *
     * @see {@link Menus/Menu#cascading}
     */
    cascading: _propTypes2.default.bool,

    /**
     * The zDepth to use for the lists that appear in cascading menus.
     *
     * @see {@link Menus/Menu#cascadingZDepth}
     */
    cascadingZDepth: _propTypes2.default.number,

    /**
     * The anchor position for the cascading lists.
     *
     * @see {@link Menus/Menu#cascadingAnchor}
     */
    cascadingAnchor: _anchorShape2.default,

    /**
     * Boolean if the menu should display as a full width container. This will *not* update the button
     * to be full width as well.
     *
     * @see {@link Menus/Menu#fullWidth}
     */
    fullWidth: _propTypes2.default.bool,

    /**
     * Boolean if the menu's container should display as `block` instead of `inline-block`.
     *
     * @see {@link Menus/Menu#block}
     */
    block: _propTypes2.default.bool,

    /**
     * Boolean if the list should appear centered related to the button.
     *
     * @see {@link Menus/Menu#centered}
     */
    centered: _propTypes2.default.bool,

    /**
     * Boolean if the menu's list should be the same width as the button.
     *
     * @see {@link Menus/Menu#sameWidth}
     */
    sameWidth: _propTypes2.default.bool,

    /**
     * @see {@link Menus/Menu#xThreshold}
     */
    xThreshold: _propTypes2.default.number,

    /**
     * @see {@link Menus/Menu#yThreshold}
     */
    yThreshold: _propTypes2.default.number,

    /**
     * Boolean if the menu's list should be closed when an element outside of the menu has been clicked.
     *
     * @see {@link Menus/Menu#closeOnOutsideClick}
     */
    closeOnOutsideClick: _propTypes2.default.bool,

    /**
     * The transition name to use for the menu's list visibility changes.
     *
     * @see {@link Menus/Menu#transitionName}
     */
    transitionName: _propTypes2.default.string,

    /**
     * The transition name to use when the menu's list gains visibility.
     *
     * @see {@link Menus/Menu#transitionEnterTimeout}
     */
    transitionEnterTimeout: _propTypes2.default.number,

    /**
     * The transition timeout to use when the menu's list loses visibility.
     *
     * @see {@link Menus/Menu#transitionLeaveTimeout}
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
     * Boolean if the menu logic should be simplified without any viewport logic and position
     * based on the relative position of the menu. This will most like require some additional
     * styles applied to the menu.
     *
     * @see {@link Helpers/Layover#simplified}
     */
    simplifiedMenu: _propTypes2.default.bool,

    /**
     * @see {@link Helpers/Layover#minLeft}
     */
    minLeft: _DropdownMenu2.default.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minRight}
     */
    minRight: _DropdownMenu2.default.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minBottom}
     */
    minBottom: _DropdownMenu2.default.propTypes.minBottom,

    /**
     * @see {@link Helpers/Layover#fillViewportWidth}
     */
    fillViewportWidth: _propTypes2.default.bool,

    /**
     * @see {@link Helpers/Layover#fillViewportHeight}
     */
    fillViewportHeight: _propTypes2.default.bool,

    buttonChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'To build a button, put any elements in the `children`. The `ListItem` have been moved to the `menuItems` prop'),
    onMenuToggle: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `onVisibilityChange` instead'),
    isOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `visible` instead'),
    defaultOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `defaultVisible` instead')
};
MenuButton.defaultProps = {
    defaultVisible: false,
    repositionOnScroll: true,
    repositionOnResize: false
};
exports.default = MenuButton;
//# sourceMappingURL=MenuButton.js.map