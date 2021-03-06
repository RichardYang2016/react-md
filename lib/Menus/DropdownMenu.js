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

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _mapToListParts = require('../utils/mapToListParts');

var _mapToListParts2 = _interopRequireDefault(_mapToListParts);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _anchorShape = require('../Helpers/anchorShape');

var _anchorShape2 = _interopRequireDefault(_anchorShape);

var _fixedToShape = require('../Helpers/fixedToShape');

var _fixedToShape2 = _interopRequireDefault(_fixedToShape);

var _positionShape = require('../Helpers/positionShape');

var _positionShape2 = _interopRequireDefault(_positionShape);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `DropdownMenu` is just a simple wrapper to the `Menu` component. The main differences
 * is that the `toggle` component will now be the children and the list of items to display
 * will be the `menuItems` prop.
 *
 * The dropdown menu is mostly used to control the state of the menu and render a single element
 * as the toggle.
 */
var DropdownMenu = function (_PureComponent) {
    _inherits(DropdownMenu, _PureComponent);

    function DropdownMenu(props) {
        _classCallCheck(this, DropdownMenu);

        var _this = _possibleConstructorReturn(this, (DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call(this, props));

        _this._handleClick = function (e) {
            var _this$props = _this.props,
                onVisibilityChange = _this$props.onVisibilityChange,
                children = _this$props.children;

            var visible = !(0, _getField2.default)(_this.props, _this.state, 'visible');
            if (onVisibilityChange) {
                onVisibilityChange(visible, e);
            }

            var toggle = _react2.default.Children.only(children);
            if (toggle.props.onClick) {
                toggle.props.onClick(e);
            }

            if (typeof _this.props.visible === 'undefined') {
                _this.setState({ visible: visible });
            }
        };

        _this._handleClose = function (e) {
            var onVisibilityChange = _this.props.onVisibilityChange;

            var visible = false;
            if (onVisibilityChange) {
                onVisibilityChange(visible, e);
            }

            if (typeof _this.props.visible === 'undefined') {
                _this.setState({ visible: visible });
            }
        };

        _this.state = {};
        if (typeof props.visible === 'undefined') {
            _this.state.visible = props.defaultVisible;
        }
        return _this;
    }

    _createClass(DropdownMenu, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                listId = _props.listId,
                menuItems = _props.menuItems,
                propChildren = _props.children,
                simplifiedMenu = _props.simplifiedMenu,
                propVisible = _props.visible,
                onVisibilityChange = _props.onVisibilityChange,
                defaultVisible = _props.defaultVisible,
                props = _objectWithoutProperties(_props, ['id', 'listId', 'menuItems', 'children', 'simplifiedMenu', 'visible', 'onVisibilityChange', 'defaultVisible']);

            var visible = (0, _getField2.default)(this.props, this.state, 'visible');

            var children = _react2.default.Children.only(propChildren);
            var toggle = _react2.default.cloneElement(children, {
                id: children.props.id || id + '-toggle',
                onClick: this._handleClick
            });

            var items = void 0;
            if (!Array.isArray(menuItems)) {
                items = (0, _mapToListParts2.default)(menuItems);
            } else {
                items = menuItems.map(_mapToListParts2.default);
            }

            return _react2.default.createElement(
                _Menu2.default,
                _extends({}, props, {
                    simplified: simplifiedMenu,
                    id: id,
                    listId: listId,
                    toggle: toggle,
                    visible: visible,
                    onClose: this._handleClose
                }),
                items
            );
        }
    }]);

    return DropdownMenu;
}(_react.PureComponent);

DropdownMenu.Positions = _Menu2.default.Positions;
DropdownMenu.HorizontalAnchors = _Menu2.default.HorizontalAnchors;
DropdownMenu.VerticalAnchors = _Menu2.default.VerticalAnchors;
DropdownMenu.propTypes = {
    /**
     * An id to use for the menu. This is required for accessibility.
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
     * An optional style to apply to the menu.
     */
    style: _propTypes2.default.object,

    /**
     * An optional className to apply to the menu.
     */
    className: _propTypes2.default.string,

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
     */
    onClick: _propTypes2.default.func,

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
     * @see {@link Menus/Menu#toggle}
     */
    children: _propTypes2.default.element.isRequired,

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
    minLeft: _Menu2.default.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minRight}
     */
    minRight: _Menu2.default.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minBottom}
     */
    minBottom: _Menu2.default.propTypes.minBottom,

    /**
     * @see {@link Helpers/Layover#fillViewportWidth}
     */
    fillViewportWidth: _propTypes2.default.bool,

    /**
     * @see {@link Helpers/Layover#fillViewportHeight}
     */
    fillViewportHeight: _propTypes2.default.bool
};
DropdownMenu.defaultProps = {
    defaultVisible: false,
    repositionOnScroll: true,
    repositionOnResize: false
};
exports.default = DropdownMenu;
//# sourceMappingURL=DropdownMenu.js.map