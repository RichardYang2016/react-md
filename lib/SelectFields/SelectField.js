'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _keyCodes = require('../constants/keyCodes');

var _omit = require('../utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _isValued = require('../utils/isValued');

var _isValued2 = _interopRequireDefault(_isValued);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _isBetween = require('../utils/NumberUtils/isBetween');

var _isBetween2 = _interopRequireDefault(_isBetween);

var _handleKeyboardAccessibility = require('../utils/EventUtils/handleKeyboardAccessibility');

var _handleKeyboardAccessibility2 = _interopRequireDefault(_handleKeyboardAccessibility);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _anchorShape = require('../Helpers/anchorShape');

var _anchorShape2 = _interopRequireDefault(_anchorShape);

var _fixedToShape = require('../Helpers/fixedToShape');

var _fixedToShape2 = _interopRequireDefault(_fixedToShape);

var _positionShape = require('../Helpers/positionShape');

var _positionShape2 = _interopRequireDefault(_positionShape);

var _Menu = require('../Menus/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _ListItem = require('../Lists/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _SelectFieldToggle = require('./SelectFieldToggle');

var _SelectFieldToggle2 = _interopRequireDefault(_SelectFieldToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MOBILE_LIST_PADDING = 8;
var ARIA_ACTIVE = 'aria-activedescendant';

var SelectField = function (_PureComponent) {
  _inherits(SelectField, _PureComponent);

  function SelectField(props) {
    _classCallCheck(this, SelectField);

    var _this = _possibleConstructorReturn(this, (SelectField.__proto__ || Object.getPrototypeOf(SelectField)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = _extends({
      error: false,
      active: false
    }, _this._getActive(props, { value: props.defaultValue }), {
      listProps: _defineProperty({
        role: 'listbox',
        ref: _this._scrollActiveIntoView
      }, ARIA_ACTIVE, null),
      match: null,
      lastSearch: null,
      value: props.defaultValue,
      visible: props.defaultVisible
    });

    _this._items = [];
    _this._activeItem = null;
    _this._deleteKeys = _this._getDeleteKeys(props);
    return _this;
  }

  _createClass(SelectField, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._container = (0, _reactDom.findDOMNode)(this);
      this._field = this._container.querySelector('.md-select-field');
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          itemLabel = _props.itemLabel,
          itemValue = _props.itemValue,
          deleteKeys = _props.deleteKeys;

      if (deleteKeys !== nextProps.deleteKeys || itemLabel !== nextProps.itemLabel || itemValue !== nextProps.itemValue) {
        this._deleteKeys = this._getDeleteKeys(nextProps);
      }

      if (this.props.value !== nextProps.value || this.props.menuItems !== nextProps.menuItems) {
        this.setState(this._getActive(nextProps, this.state));
      }
    }

    /**
     * Gets the current value from the select field. This is used when you have an uncontrolled
     * text field and simply need the value from a ref callback.
     *
     * @return {String} the select field's value
     */

  }, {
    key: '_getItemPart',
    value: function _getItemPart(item, itemLabel, itemValue) {
      var preferLabel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var type = typeof item === 'undefined' ? 'undefined' : _typeof(item);
      if (type === 'number' || type === 'string') {
        return item;
      } else if (type === 'object') {
        var key1 = preferLabel ? itemLabel : itemValue;
        var key2 = preferLabel ? itemValue : itemLabel;
        return typeof item[key1] !== 'undefined' ? item[key1] : item[key2];
      }

      return '';
    }
  }, {
    key: '_getDeleteKeys',
    value: function _getDeleteKeys(_ref) {
      var itemLabel = _ref.itemLabel,
          itemValue = _ref.itemValue,
          itemProps = _ref.itemProps,
          deleteKeys = _ref.deleteKeys;

      var keys = [itemLabel, itemValue, itemProps];
      if (deleteKeys) {
        return keys.concat(Array.isArray(deleteKeys) ? deleteKeys : [deleteKeys]);
      }

      return keys;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          id = _props2.id,
          style = _props2.style,
          className = _props2.className,
          listStyle = _props2.listStyle,
          listClassName = _props2.listClassName,
          toggleStyle = _props2.toggleStyle,
          toggleClassName = _props2.toggleClassName,
          menuItems = _props2.menuItems,
          anchor = _props2.anchor,
          belowAnchor = _props2.belowAnchor,
          fixedTo = _props2.fixedTo,
          position = _props2.position,
          xThreshold = _props2.xThreshold,
          yThreshold = _props2.yThreshold,
          listZDepth = _props2.listZDepth,
          listInline = _props2.listInline,
          listHeightRestricted = _props2.listHeightRestricted,
          block = _props2.block,
          centered = _props2.centered,
          sameWidth = _props2.sameWidth,
          fullWidth = _props2.fullWidth,
          repositionOnScroll = _props2.repositionOnScroll,
          repositionOnResize = _props2.repositionOnResize,
          simplifiedMenu = _props2.simplifiedMenu,
          minLeft = _props2.minLeft,
          minRight = _props2.minRight,
          minBottom = _props2.minBottom,
          fillViewportWidth = _props2.fillViewportWidth,
          fillViewportHeight = _props2.fillViewportHeight,
          menuTransitionName = _props2.menuTransitionName,
          menuTransitionEnterTimeout = _props2.menuTransitionEnterTimeout,
          menuTransitionLeaveTimeout = _props2.menuTransitionLeaveTimeout,
          isOpen = _props2.isOpen,
          propError = _props2.error,
          propMenuId = _props2.menuId,
          propVisible = _props2.visible,
          itemLabel = _props2.itemLabel,
          itemValue = _props2.itemValue,
          itemProps = _props2.itemProps,
          getItemProps = _props2.getItemProps,
          defaultValue = _props2.defaultValue,
          defaultVisible = _props2.defaultVisible,
          onClick = _props2.onClick,
          onKeyDown = _props2.onKeyDown,
          onVisibilityChange = _props2.onVisibilityChange,
          deleteKeys = _props2.deleteKeys,
          stripActiveItem = _props2.stripActiveItem,
          keyboardMatchingTimeout = _props2.keyboardMatchingTimeout,
          defaultOpen = _props2.defaultOpen,
          initiallyOpen = _props2.initiallyOpen,
          onMenuToggle = _props2.onMenuToggle,
          stretchList = _props2.stretchList,
          menuStyle = _props2.menuStyle,
          menuClassName = _props2.menuClassName,
          floatingLabel = _props2.floatingLabel,
          noAutoAdjust = _props2.noAutoAdjust,
          adjustMinWidth = _props2.adjustMinWidth,
          props = _objectWithoutProperties(_props2, ['id', 'style', 'className', 'listStyle', 'listClassName', 'toggleStyle', 'toggleClassName', 'menuItems', 'anchor', 'belowAnchor', 'fixedTo', 'position', 'xThreshold', 'yThreshold', 'listZDepth', 'listInline', 'listHeightRestricted', 'block', 'centered', 'sameWidth', 'fullWidth', 'repositionOnScroll', 'repositionOnResize', 'simplifiedMenu', 'minLeft', 'minRight', 'minBottom', 'fillViewportWidth', 'fillViewportHeight', 'menuTransitionName', 'menuTransitionEnterTimeout', 'menuTransitionLeaveTimeout', 'isOpen', 'error', 'menuId', 'visible', 'itemLabel', 'itemValue', 'itemProps', 'getItemProps', 'defaultValue', 'defaultVisible', 'onClick', 'onKeyDown', 'onVisibilityChange', 'deleteKeys', 'stripActiveItem', 'keyboardMatchingTimeout', 'defaultOpen', 'initiallyOpen', 'onMenuToggle', 'stretchList', 'menuStyle', 'menuClassName', 'floatingLabel', 'noAutoAdjust', 'adjustMinWidth']);

      var _props3 = this.props,
          menuId = _props3.menuId,
          listId = _props3.listId,
          error = _props3.error;

      error = error || this.state.error;
      if (!menuId) {
        menuId = id + '-menu';
      }

      if (!listId) {
        listId = menuId + '-options';
      }

      var _state = this.state,
          listProps = _state.listProps,
          active = _state.active,
          activeLabel = _state.activeLabel;

      var below = position === SelectField.Positions.BELOW;
      var visible = typeof isOpen !== 'undefined' ? isOpen : (0, _getField2.default)(this.props, this.state, 'visible');
      var value = (0, _getField2.default)(this.props, this.state, 'value');
      var useSameWidth = typeof sameWidth !== 'undefined' ? sameWidth : below;

      var toggle = _react2.default.createElement(_SelectFieldToggle2.default, _extends({}, props, {
        id: id,
        style: toggleStyle,
        className: toggleClassName,
        visible: visible,
        value: value,
        below: below,
        error: error,
        active: active,
        activeLabel: activeLabel,
        onClick: this._toggle,
        onFocus: this._handleFocus,
        onBlur: this._handleBlur
      }));

      return _react2.default.createElement(
        _Menu2.default,
        {
          id: menuId,
          listId: listId,
          style: style,
          className: (0, _classnames2.default)('md-menu--select-field', className),
          listProps: listProps,
          listStyle: listStyle,
          listClassName: listClassName,
          toggle: toggle,
          visible: visible,
          onClose: this._close,
          onKeyDown: this._handleKeyDown,
          onClick: this._handleClick,
          simplified: simplifiedMenu,
          anchor: anchor,
          belowAnchor: belowAnchor,
          fixedTo: fixedTo,
          position: position,
          xThreshold: xThreshold,
          yThreshold: yThreshold,
          listZDepth: listZDepth,
          listInline: listInline,
          listHeightRestricted: listHeightRestricted,
          sameWidth: useSameWidth,
          block: block,
          centered: centered,
          fullWidth: fullWidth,
          minLeft: minLeft,
          minRight: minRight,
          minBottom: minBottom,
          fillViewportWidth: fillViewportWidth,
          fillViewportHeight: fillViewportHeight,
          repositionOnScroll: repositionOnScroll,
          repositionOnResize: repositionOnResize,
          transitionName: menuTransitionName,
          transitionEnterTimeout: menuTransitionEnterTimeout,
          transitionLeaveTimeout: menuTransitionLeaveTimeout
        },
        menuItems.reduce(this._reduceItems, [])
      );
    }
  }, {
    key: 'value',
    get: function get() {
      return (0, _getField2.default)(this.props, this.state, 'value');
    }
  }]);

  return SelectField;
}(_react.PureComponent);

SelectField.HorizontalAnchors = _Menu2.default.HorizontalAnchors;
SelectField.VerticalAnchors = _Menu2.default.VerticalAnchors;
SelectField.Positions = _Menu2.default.Positions;
SelectField.propTypes = {
  /**
   * An id to give the select field. This is required for accessibility.
   */
  id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

  /**
   * An optional name to give to the select field.
   */
  name: _propTypes2.default.string,

  /**
   * An optional id to provide to the select field's menu. If this is omitted,
   * it will default to `${id}-menu`.
   */
  menuId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional id to provide to the select field's list.
   *
   * @see {@link #menuId}
   * @see {@link Menus/Menu#menuId}
   */
  listId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional style to apply to the select field's container (the menu).
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the select field's container (the menu).
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the menu's list.
   */
  listStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the menu's list.
   */
  listClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the select field's toggle.
   */
  toggleStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the select field's toggle.
   */
  toggleClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the `AccessibleFakeInkedButton` that is the trigger
   * for the select field.
   */
  inputStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the `AccessibleFakeInkedButton` that is the trigger
   * for the select field.
   */
  inputClassName: _propTypes2.default.string,

  /**
   * Boolean if the select field should be have the menu's list visible by default.
   */
  defaultVisible: _propTypes2.default.bool.isRequired,

  /**
   * Boolean if the select field should have the menu's list visible. This will make
   * the select field controlled and require the `onVisibilityChange` prop to be defined,
   */
  visible: (0, _controlled2.default)(_propTypes2.default.bool, 'onVisibilityChange', 'defaultVisible'),

  /**
   * An optional function to call when the select field's menu has it's visibility changed. The callback
   * will include the next visible state and the event that triggered it.
   */
  onVisibilityChange: _propTypes2.default.func,

  /**
   * A list of `number`, `string`, or `object` that should be used to create `ListItem`
   * in the menu's list. When it is an `object`, it will use the `itemLabel` prop as the
   * `primaryText` and use the value of `itemValue`.
   *
   * @see {@link #itemLabel}
   * @see {@link #itemValue}
   */
  menuItems: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.element])).isRequired,

  /**
   * The amount of time that a list of letters should be used when finding a menu item
   * while typing. Since a user can select items by typing multiple letters in a row,
   * this will be used as the timeout for clearing those letters.
   *
   * For example:
   * - User types `g`
   *
   * Full match is now `'g'`.
   *
   * - User delays 200ms and types `u`
   *
   * Full match is now `'gu'`
   *
   * - User delays 1000ms and types `a`.
   *
   * Full match is now `'a'`
   */
  keyboardMatchingTimeout: _propTypes2.default.number.isRequired,

  /**
   * The key to use for extracting a menu item's label if the menu item is an object.
   *
   * Example:
   *
   * ```js
   * const item = { something: 'My Label', somethingElse: 'value' };
   * const itemLabel = 'something';
   * const itemValue = 'somethingElse';
   * ```
   */
  itemLabel: _propTypes2.default.string.isRequired,

  /**
   * The key to use for extracting a menu item's value if the menu item is an object.
   *
   * Example:
   *
   * ```js
   * const item = { something: 'My Label', somethingElse: 'value' };
   * const itemLabel = 'something';
   * const itemValue = 'somethingElse';
   * ```
   */
  itemValue: _propTypes2.default.string.isRequired,

  /**
   * The key to use for extracting a menu item's function
   * to get additional `ListItem` props if the menu item is an object.
   *
   * Example:
   *
   * ```js
   * const item = { something: 'My Label', addProps: ({active}) => active ? {secondaryText: 'some text'} : null };
   * const itemLabel = 'something';
   * const itemProps = 'addProps';
   * ```
   *
   * @see {@link #getItemProps}
   */
  itemProps: _propTypes2.default.string.isRequired,

  /**
   * An optional function to get additional `ListItem` props if the menu item is an object.
   *
   * An object with the following fields will be passed into the function:
   * - `index` - item's index
   * - `active` - whether item is active
   * - `disabled` - whether item is disabled
   * - `itemValue` - item's value
   * - `value` - current list value
   * - `props` - default `ListItem` props
   * - `item` - source item's data
   * - `field` - reference to the component instance
   */
  getItemProps: _propTypes2.default.func,

  /**
   * The default value to use for the select field. If this is set, it should either match
   * one of the `number` or `string` in your `menuItems` list or be the empty string. If
   * the `menuItems` is a list of `object`, this value should match one of the menu item's
   * `itemValue` or be the empty string.
   *
   * ```js
   * const menuItems = [{ label: 'Something': value: 0 }, { label: 'Something else', value: 1 }];
   *
   * // both valid
   * defaultValue={0}
   * defaultValue=""
   * ```
   */
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,

  /**
   * The value to use for the select field. If this is defined, it becomes a controlled component
   * and requires the `onChange` prop to be defined. See the `defaultValue` for more behavior info.
   *
   * @see {@link #defaultValue}
   */
  value: (0, _controlled2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]), 'onChange', 'defaultValue'),

  /**
   * An optional function to call when the select field's value has been changed either when the user
   * has click/touched/keyboard selected a value in the list, or the user has selected a value by typing
   * in the select field while the menu's list is closed.
   *
   * The callback will include the next text field value, the selected item's index, the event that
   * triggered the change, and the id, name, and value of the select field.
   *
   * ```js
   * onChange(value, index, event, { id, name, value });
   * ```
   */
  onChange: _propTypes2.default.func,

  /**
   * An optional label to use with the select field. This will be a floating label as seen on the text field.
   */
  label: _propTypes2.default.node,

  /**
   * An optional placeholder to use in the select field. This will only appear when no value has been selected.
   */
  placeholder: _propTypes2.default.string,

  /**
   * Boolean if the select field should be disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * Boolean if the select field is required. This will update the label and placeholder to include a `*` suffix.
   */
  required: _propTypes2.default.bool,

  /**
   * Boolean if the select field is considered to be in an `error` state.
   *
   * @see {@link TextFields/TextField#error}
   */
  error: _propTypes2.default.bool,

  /**
   * An optional text to display when the text select field is in an error state.
   *
   * @see {@link TextFields/TextField#errorText}
   */
  errorText: _propTypes2.default.node,

  /**
   * An optional text to display below the select field to provide input help to the user.
   * This will only be displayed if the select field is not in an error state.
   *
   * @see {@link #helpOnFocus}
   * @see {@link TextFields/TextField#errorText}
   */
  helpText: _propTypes2.default.node,

  /**
   * Boolean if the `helpText` should only appear on focus.
   *
   * @see {@link #helpText}
   * @see {@link TextFields/TextField#helpOnFocus}
   */
  helpOnFocus: _propTypes2.default.bool,

  /**
   * An optional function to call when any element in the select field has been clicked.
   */
  onClick: _propTypes2.default.func,

  /**
   * An optional function to call when the `keydown` event has been triggered anywhere in the
   * select field.
   */
  onKeyDown: _propTypes2.default.func,

  /**
   * An optional function to call when the select field's toggle has gained focus.
   */
  onFocus: _propTypes2.default.func,

  /**
   * An optional function to call when the select field's toggle has been blurred. This
   * will be triggered if the user hits the up or down arrow keys to traverse the list
   * of items.
   */
  onBlur: _propTypes2.default.func,

  /**
   * The icon to use to display the dropdown arrow.
   */
  dropdownIcon: _propTypes2.default.element,

  /**
   * Boolean if the select field is in a toolbar. This should automatically be injected by the `Toolbar`
   * component if being used as a `titleMenu` or one of the `actions`.
   *
   * @see {@link Toolbars/Toolbar#titleMenu}
   * @see {@link Toolbars/Toolbar#actions}
   */
  toolbar: _propTypes2.default.bool,

  /**
   * Boolean if the currently active item should be removed from the list of available `menuItems`.
   * If this is `undefined`, it will strip out the active one only when the
   * `position === SelectField.Positions.BELOW`.
   */
  stripActiveItem: _propTypes2.default.bool,

  /**
   * The transition name to use when a new value has been selected. By default, it will have the
   * new item _drop_ into the select field's input location.
   */
  transitionName: _propTypes2.default.string.isRequired,

  /**
   * The transition time to use when a new value has been selected. If this value is `0`, there
   * will be no transition.
   */
  transitionTime: _propTypes2.default.number.isRequired,

  /**
   * This is how the menu's `List` gets anchored to the select field.
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
   * This is the animation position for the list that appears.
   *
   * @see {@link Helpers/Layover#animationPosition}
   */
  position: _positionShape2.default,

  /**
   * This is how the menu's list will be "fixed" to the `toggle` component.
   *
   * @see {@link Helpers/Layover#fixedTo}
   */
  fixedTo: _fixedToShape2.default,

  /**
   * Boolean if the menu's list should appear horizontally instead of vertically.
   */
  listInline: _propTypes2.default.bool,

  /**
   * The list's z-depth for applying box shadow. This should be a number from 0 to 5.
   */
  listZDepth: _propTypes2.default.number,

  /**
   * Boolean if the list should have its height restricted to the `$md-menu-mobile-max-height`/
   * `$md-menu-desktop-max-height` values.
   *
   * @see [md-menu-mobile-max-height](/components/menus?tab=1#variable-md-menu-mobile-max-height)
   * @see [md-menu-desktop-max-height](/components/menus?tab=1#variable-md-menu-desktop-max-height)
   */
  listHeightRestricted: _propTypes2.default.bool,

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
   * An optional transition name to use for the list appearing/disappearing.
   *
   * @see {@link Menus/Menu#transitionName}
   */
  menuTransitionName: _propTypes2.default.string,

  /**
   * @see {@link Helpers/Layover#transitionEnterTimeout}
   */
  menuTransitionEnterTimeout: _propTypes2.default.number,

  /**
   * @see {@link Helpers/Layover#transitionLeaveTimeout}
   */
  menuTransitionLeaveTimeout: _propTypes2.default.number,

  /**
   * @see {@link Menus/Menu#block}
   */
  block: _propTypes2.default.bool,

  /**
   * @see {@link Menus/Menu#fullWidth}
   */
  fullWidth: _propTypes2.default.bool,

  /**
   * @see {@link Helpers/Layover#centered}
   */
  centered: _Menu2.default.propTypes.centered,

  /**
   * @see {@link Helpers/Layover#sameWidth}
   */
  sameWidth: _Menu2.default.propTypes.sameWidth,

  /**
   * Since the `menuItems` get mapped into `ListItem`, this prop is used to remove
   * any unnecessary props from the `ListItem` itself. This is where you
   * would remove parts of your object such as `description` or `__metadata__`.
   */
  deleteKeys: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]))]),

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
  fillViewportHeight: _propTypes2.default.bool,

  /**
   * The direction that the underline should appear from.
   */
  lineDirection: _propTypes2.default.oneOf(['left', 'center', 'right']).isRequired,

  iconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use `dropdownIcon` instead'),
  iconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `dropdownIcon` instead'),
  isOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `visible` instead'),
  defaultOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `defaultVisible` instead'),
  initiallyOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `defaultVisible` instead'),
  onMenuToggle: (0, _deprecated2.default)(_propTypes2.default.func, 'Use `onVisibilityChange` instead'),
  stretchList: (0, _deprecated2.default)(_propTypes2.default.bool, 'No longer valid after the changes to the `Menu` component. Possibly use `sameWidth` instead'),
  menuStyle: (0, _deprecated2.default)(_propTypes2.default.object, 'Use `style` instead'),
  menuClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `className` instead'),
  floatingLabel: (0, _deprecated2.default)(_propTypes2.default.bool, 'A select field can only have floating labels now. Only provide the `label` prop'),
  noAutoAdjust: (0, _deprecated2.default)(_propTypes2.default.bool, 'No longer valid to use since select fields are no longer text fields'),
  adjustMinWidth: (0, _deprecated2.default)(_propTypes2.default.bool, 'No longer valid to use since select fields are no longer text fields')
};
SelectField.defaultProps = {
  anchor: {
    x: SelectField.HorizontalAnchors.INNER_LEFT,
    y: SelectField.VerticalAnchors.OVERLAP
  },
  fixedTo: _Menu2.default.defaultProps.fixedTo,
  position: SelectField.Positions.TOP_LEFT,
  itemLabel: 'label',
  itemValue: 'value',
  itemProps: 'getProps',
  dropdownIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'arrow_drop_down'
  ),
  lineDirection: 'left',
  menuItems: [],
  defaultValue: '',
  defaultVisible: false,
  keyboardMatchingTimeout: 1000,
  transitionName: 'md-drop',
  transitionTime: 300,
  repositionOnScroll: true,
  repositionOnResize: false
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._getActiveItemLabel = function (item, value, itemLabel, itemValue) {
    var v = _this2._getItemPart(item, itemLabel, itemValue);
    var label = _this2._getItemPart(item, itemLabel, itemValue, true);

    return v === value || v === parseInt(value, 10) ? label : '';
  };

  this._getActive = function (props, state) {
    var activeLabel = '';
    var activeIndex = -1;
    var value = (0, _getField2.default)(props, state, 'value');
    if ((0, _isValued2.default)(value)) {
      var menuItems = props.menuItems,
          itemLabel = props.itemLabel,
          itemValue = props.itemValue;


      menuItems.some(function (item, index) {
        activeLabel = _this2._getActiveItemLabel(item, value, itemLabel, itemValue);
        var found = (0, _isValued2.default)(activeLabel);
        if (found) {
          activeIndex = index;
        }

        return found;
      });
    }

    return { activeLabel: activeLabel, activeIndex: activeIndex };
  };

  this._attemptItemFocus = function (index) {
    if (index === -1) {
      return;
    }

    var item = _this2._items[index];
    if (item) {
      item.focus();
    }
  };

  this._setListItem = function (item) {
    if (!item) {
      return;
    }

    if (item.props.active) {
      _this2._activeItem = (0, _reactDom.findDOMNode)(item);
      item.focus();

      if (!_this2.state.listProps[ARIA_ACTIVE]) {
        _this2.setState({ listProps: _extends({}, _this2.state.listProps, _defineProperty({}, ARIA_ACTIVE, _this2.props.id + '-options-active')) });
      }
    }

    _this2._items.push(item);
  };

  this._scrollActiveIntoView = function (listRef) {
    if (listRef === null) {
      _this2._items = [];
      return;
    } else if (!_this2._activeItem) {
      return;
    }

    var list = (0, _reactDom.findDOMNode)(listRef);
    var offsetTop = _this2._activeItem.offsetTop;

    list.scrollTop = offsetTop > MOBILE_LIST_PADDING ? offsetTop : 0;
  };

  this._toggle = function (e) {
    var _props4 = _this2.props,
        isOpen = _props4.isOpen,
        onVisibilityChange = _props4.onVisibilityChange,
        onMenuToggle = _props4.onMenuToggle;

    var visible = !(typeof isOpen !== 'undefined' ? isOpen : (0, _getField2.default)(_this2.props, _this2.state, 'visible'));
    if (onMenuToggle || onVisibilityChange) {
      (onMenuToggle || onVisibilityChange)(visible, e);
    }

    var state = void 0;
    if (typeof isOpen === 'undefined' && typeof _this2.props.visible === 'undefined') {
      state = { visible: visible };
    }

    if (state) {
      _this2.setState(state);
    }
  };

  this._close = function (e) {
    if (_this2.props.onVisibilityChange) {
      _this2.props.onVisibilityChange(false, e);
    }

    if (e.type === 'keydown' && _this2._field) {
      _this2._field.focus();
    }

    var state = void 0;
    if (_this2.props.required && !(0, _getField2.default)(_this2.props, _this2.state, 'value')) {
      state = { error: true };
    }

    if (typeof _this2.props.visible === 'undefined') {
      state = state || {};
      state.visible = false;
    }

    if (state) {
      _this2.setState(state);
    }
  };

  this._handleClick = function (e) {
    if (_this2.props.onClick) {
      _this2.props.onClick(e);
    }

    var isOpen = _this2.props.isOpen;

    var visible = typeof isOpen !== 'undefined' ? isOpen : (0, _getField2.default)(_this2.props, _this2.state, 'visible');
    if (visible && _this2._container) {
      var node = e.target;
      while (_this2._container.contains(node)) {
        if (node.dataset && typeof node.dataset.id !== 'undefined') {
          var _node$dataset = node.dataset,
              id = _node$dataset.id,
              value = _node$dataset.value;

          _this2._selectItem(parseInt(id, 10), value, e);
          return;
        }

        node = node.parentNode;
      }
    }
  };

  this._selectItem = function (dataIndex, dataValue, e) {
    var _props5 = _this2.props,
        required = _props5.required,
        menuItems = _props5.menuItems,
        itemLabel = _props5.itemLabel,
        itemValue = _props5.itemValue,
        onChange = _props5.onChange,
        id = _props5.id,
        name = _props5.name;

    var value = _this2._getItemPart(menuItems[dataIndex], itemLabel, itemValue);
    var prevValue = (0, _getField2.default)(_this2.props, _this2.state, 'value');
    if (prevValue !== value && onChange) {
      onChange(value, dataIndex, e, { id: id, name: name, value: value });
    }

    var state = _extends({}, _this2._getActive({ value: value, itemLabel: itemLabel, itemValue: itemValue, menuItems: menuItems }, {}), {
      error: !!required && !value && value !== 0
    });

    if (typeof _this2.props.value === 'undefined') {
      state.value = value;
    }

    _this2.setState(state);
  };

  this._handleFocus = function (e) {
    if (_this2.props.onFocus) {
      _this2.props.onFocus(e);
    }

    _this2.setState({ active: true });
  };

  this._handleBlur = function (e) {
    if (_this2.props.onBlur) {
      _this2.props.onBlur(e);
    }

    var error = _this2.state.error;
    var _props6 = _this2.props,
        isOpen = _props6.isOpen,
        required = _props6.required;

    var visible = typeof isOpen !== 'undefined' ? isOpen : (0, _getField2.default)(_this2.props, _this2.state, 'visible');
    var value = (0, _getField2.default)(_this2.props, _this2.state, 'value');

    if (required && !visible) {
      error = !value;
    }

    _this2.setState({ active: false, error: error });
  };

  this._handleKeyDown = function (e) {
    var _props7 = _this2.props,
        isOpen = _props7.isOpen,
        onKeyDown = _props7.onKeyDown;

    if (onKeyDown) {
      onKeyDown(e);
    }

    var key = e.which || e.keyCode;
    var up = key === _keyCodes.UP;
    var down = key === _keyCodes.DOWN;
    var visible = typeof isOpen !== 'undefined' ? isOpen : (0, _getField2.default)(_this2.props, _this2.state, 'visible');

    if (up || down) {
      e.preventDefault();

      if (!visible) {
        _this2._toggle(e);
        return;
      }

      _this2._advanceFocus(up);
    } else if (!visible && (0, _handleKeyboardAccessibility2.default)(e, _this2._toggle, true, true)) {
      return;
    } else if (visible && (key === _keyCodes.ESC || key === _keyCodes.TAB)) {
      if (_this2._field && key === _keyCodes.ESC) {
        _this2._field.focus();
      }

      _this2._close(e);
      return;
    } else {
      _this2._selectItemByLetter(key, e);
    }
  };

  this._advanceFocus = function (decrement) {
    var _props8 = _this2.props,
        position = _props8.position,
        stripActiveItem = _props8.stripActiveItem;
    var activeIndex = _this2.state.activeIndex;


    var below = position === SelectField.Positions.BELOW;
    var value = (0, _getField2.default)(_this2.props, _this2.state, 'value');
    var valued = (0, _isValued2.default)(value);
    var itemStripped = (typeof stripActiveItem !== 'undefined' ? stripActiveItem : below) && valued;

    // If the select field is positioned below and there is no value, need to increment the last index
    // by one since this select field removes the active item. Need to account for that here when there
    // is no value.
    var lastIndex = _this2._items.length - (itemStripped ? 0 : 1);
    if (decrement && activeIndex <= 0 || !decrement && activeIndex >= lastIndex) {
      return;
    }

    var nextIndex = Math.max(-1, Math.min(lastIndex, activeIndex + (decrement ? -1 : 1)));
    if (nextIndex === activeIndex) {
      return;
    }

    _this2._attemptItemFocus(nextIndex - (itemStripped ? 1 : 0));
    _this2.setState({ activeIndex: nextIndex });
  };

  this._selectItemByLetter = function (key, e) {
    var charCode = String.fromCharCode(key);
    var isLetter = charCode && charCode.match(/[A-Za-z0-9-_ ]/);
    var isKeypad = (0, _isBetween2.default)(key, _keyCodes.KEYPAD_ZERO, _keyCodes.KEYPAD_NINE);
    if (!(0, _isBetween2.default)(key, _keyCodes.ZERO, _keyCodes.NINE) && !isKeypad && !isLetter) {
      return;
    }

    var letter = isLetter ? charCode : String(key - (isKeypad ? _keyCodes.KEYPAD_ZERO : _keyCodes.ZERO));

    if (_this2._matchingTimeout) {
      clearTimeout(_this2._matchingTimeout);
    }

    _this2._matchingTimeout = setTimeout(function () {
      _this2._matchingTimeout = null;

      _this2.setState({ match: null, lastSearch: null });
    }, _this2.props.keyboardMatchingTimeout);

    _this2._selectFirstMatch(letter, e);
  };

  this._selectFirstMatch = function (letter, e) {
    var _props9 = _this2.props,
        menuItems = _props9.menuItems,
        itemLabel = _props9.itemLabel,
        itemValue = _props9.itemValue,
        isOpen = _props9.isOpen,
        onChange = _props9.onChange,
        id = _props9.id,
        name = _props9.name;
    var lastSearch = _this2.state.lastSearch;

    var match = -1;
    var search = ('' + (lastSearch || '') + letter).toUpperCase();
    menuItems.some(function (item, index) {
      if (item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item.disabled) {
        return false;
      }

      var label = String(_this2._getItemPart(item, itemLabel, itemValue, true));
      if (label && label.toUpperCase().replace(/\s/g, '').indexOf(search) === 0) {
        match = index;
      }

      return match > -1;
    });

    var state = {
      match: match,
      lastSearch: search
    };

    if (match !== -1) {
      var activeItem = menuItems[match];
      state.activeLabel = _this2._getItemPart(activeItem, itemLabel, itemValue, true);
      state.activeIndex = match;

      var visible = typeof isOpen !== 'undefined' ? isOpen : (0, _getField2.default)(_this2.props, _this2.state, 'visible');
      if (visible) {
        if (state.match !== _this2.state.match) {
          _this2._attemptItemFocus(state.activeIndex);
        }
      } else {
        var value = _this2._getItemPart(activeItem, itemLabel, itemValue);
        var prevValue = (0, _getField2.default)(_this2.props, _this2.state, 'value');

        if (value !== prevValue && onChange) {
          onChange(value, match, e, { id: id, name: name, value: value });
        }

        if (typeof _this2.props.value === 'undefined') {
          state.value = value;
        }
      }
    }

    _this2.setState(state);
  };

  this._reduceItems = function (items, item, i) {
    if (item === null) {
      return items;
    } else if (_react2.default.isValidElement(item)) {
      items.push(item);
      return items;
    }

    var _props10 = _this2.props,
        getItemProps = _props10.getItemProps,
        id = _props10.id,
        itemLabel = _props10.itemLabel,
        itemProps = _props10.itemProps,
        itemValue = _props10.itemValue,
        position = _props10.position,
        stripActiveItem = _props10.stripActiveItem;

    var below = position === SelectField.Positions.BELOW;
    var value = (0, _getField2.default)(_this2.props, _this2.state, 'value');

    var dataValue = _this2._getItemPart(item, itemLabel, itemValue);
    var primaryText = _this2._getItemPart(item, itemLabel, itemValue, true);

    var active = dataValue === value || dataValue === parseInt(value, 10);
    var stripped = (typeof stripActiveItem !== 'undefined' ? stripActiveItem : below) && active;
    if (!stripped) {
      var objectType = (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object';
      var props = objectType ? (0, _omit2.default)(item, _this2._deleteKeys) : {};
      var disabled = props.disabled || false;
      props.ref = disabled ? null : _this2._setListItem;
      props.id = active ? id + '-options-active' : null;
      props.active = active;
      props.tabIndex = -1;
      props.primaryText = primaryText;
      props.key = item.key || dataValue;
      props.role = 'option';
      props['data-id'] = disabled ? null : i;
      props['data-value'] = disabled ? null : dataValue;

      var getProps = objectType && item[itemProps] || getItemProps;
      if (typeof getProps === 'function') {
        Object.assign(props, getProps({
          index: i,
          active: active,
          disabled: disabled,
          itemValue: itemValue,
          value: value,
          props: props,
          item: item,
          field: _this2
        }));
      }

      items.push(_react2.default.createElement(_ListItem2.default, props));
    }

    return items;
  };
};

exports.default = SelectField;
//# sourceMappingURL=SelectField.js.map