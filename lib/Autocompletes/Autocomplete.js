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

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _omit = require('../utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _findIgnoreCase = require('../utils/findIgnoreCase');

var _findIgnoreCase2 = _interopRequireDefault(_findIgnoreCase);

var _fuzzyFilter = require('../utils/fuzzyFilter');

var _fuzzyFilter2 = _interopRequireDefault(_fuzzyFilter);

var _caseInsensitiveFilter = require('../utils/caseInsensitiveFilter');

var _caseInsensitiveFilter2 = _interopRequireDefault(_caseInsensitiveFilter);

var _getTextWidth = require('../utils/Positioning/getTextWidth');

var _getTextWidth2 = _interopRequireDefault(_getTextWidth);

var _oneRequiredForA11y = require('../utils/PropTypes/oneRequiredForA11y');

var _oneRequiredForA11y2 = _interopRequireDefault(_oneRequiredForA11y);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _invalidIf = require('../utils/PropTypes/invalidIf');

var _invalidIf2 = _interopRequireDefault(_invalidIf);

var _keyCodes = require('../constants/keyCodes');

var _anchorShape = require('../Helpers/anchorShape');

var _anchorShape2 = _interopRequireDefault(_anchorShape);

var _fixedToShape = require('../Helpers/fixedToShape');

var _fixedToShape2 = _interopRequireDefault(_fixedToShape);

var _positionShape = require('../Helpers/positionShape');

var _positionShape2 = _interopRequireDefault(_positionShape);

var _ListItem = require('../Lists/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _Menu = require('../Menus/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _TextField = require('../TextFields/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `Autocomplete` component is useful for presenting real-time suggestions, completions,
 * or filtering.
 */
var Autocomplete = function (_PureComponent) {
  _inherits(Autocomplete, _PureComponent);

  function Autocomplete(props) {
    _classCallCheck(this, Autocomplete);

    var _this = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, props));

    _initialiseProps.call(_this);

    var defaultValue = props.defaultValue,
        data = props.data,
        dataLabel = props.dataLabel,
        filter = props.filter;


    var matches = [];
    if (defaultValue && filter) {
      matches = filter(data, defaultValue, dataLabel);
    } else if (!filter) {
      matches = data;
    }

    _this.state = {
      value: defaultValue,
      matches: matches,
      visible: false,
      matchIndex: -1,
      manualFocus: false,
      suggestion: '',
      suggestionIndex: -1
    };
    return _this;
  }

  _createClass(Autocomplete, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextValue = nextProps.value,
          data = nextProps.data,
          filter = nextProps.filter,
          dataLabel = nextProps.dataLabel;

      var dataDiff = data !== this.props.data;
      if (nextValue !== this.props.value || dataDiff) {
        var _state = this.state,
            visible = _state.visible,
            matches = _state.matches;

        var value = (0, _getField2.default)(nextProps, this.state, 'value');

        if (filter) {
          matches = filter(data, value, dataLabel);
        } else if (dataDiff) {
          matches = data;
        }

        if (this.state.focus) {
          visible = !!matches.length;
        }

        this.setState({ matches: matches, visible: visible });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.visible !== nextState.visible) {
        var menuFn = nextProps['onMenu' + (nextState.visible ? 'Open' : 'Close')];
        if (menuFn) {
          menuFn();
        }
      }
    }

    /**
     * Gets the current value from the text field. This is used when you have an uncontrolled
     * text field and simply need the value from a ref callback.
     *
     * @return {String} the text field's value
     */

  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          visible = _state2.visible,
          matches = _state2.matches,
          tabbed = _state2.tabbed,
          focus = _state2.focus,
          suggestionStyle = _state2.suggestionStyle;

      var _props = this.props,
          fullWidth = _props.fullWidth,
          block = _props.block,
          style = _props.style,
          className = _props.className,
          listStyle = _props.listStyle,
          listClassName = _props.listClassName,
          textFieldStyle = _props.textFieldStyle,
          textFieldClassName = _props.textFieldClassName,
          inlineSuggestionStyle = _props.inlineSuggestionStyle,
          inlineSuggestionClassName = _props.inlineSuggestionClassName,
          menuId = _props.menuId,
          inline = _props.inline,
          anchor = _props.anchor,
          belowAnchor = _props.belowAnchor,
          position = _props.position,
          fixedTo = _props.fixedTo,
          listId = _props.listId,
          listInline = _props.listInline,
          listZDepth = _props.listZDepth,
          listHeightRestricted = _props.listHeightRestricted,
          xThreshold = _props.xThreshold,
          yThreshold = _props.yThreshold,
          closeOnOutsideClick = _props.closeOnOutsideClick,
          transitionName = _props.transitionName,
          transitionEnterTimeout = _props.transitionEnterTimeout,
          transitionLeaveTimeout = _props.transitionLeaveTimeout,
          centered = _props.centered,
          sameWidth = _props.sameWidth,
          repositionOnScroll = _props.repositionOnScroll,
          repositionOnResize = _props.repositionOnResize,
          simplifiedMenu = _props.simplifiedMenu,
          minLeft = _props.minLeft,
          minRight = _props.minRight,
          minBottom = _props.minBottom,
          fillViewportWidth = _props.fillViewportWidth,
          fillViewportHeight = _props.fillViewportHeight,
          propValue = _props.value,
          total = _props.total,
          offset = _props.offset,
          filter = _props.filter,
          data = _props.data,
          dataLabel = _props.dataLabel,
          dataValue = _props.dataValue,
          deleteKeys = _props.deleteKeys,
          defaultValue = _props.defaultValue,
          clearOnAutocomplete = _props.clearOnAutocomplete,
          autocompleteWithLabel = _props.autocompleteWithLabel,
          findInlineSuggestion = _props.findInlineSuggestion,
          inlineSuggestionPadding = _props.inlineSuggestionPadding,
          onAutocomplete = _props.onAutocomplete,
          onMenuOpen = _props.onMenuOpen,
          onMenuClose = _props.onMenuClose,
          onBlur = _props.onBlur,
          onFocus = _props.onFocus,
          onKeyDown = _props.onKeyDown,
          onMouseDown = _props.onMouseDown,
          onChange = _props.onChange,
          props = _objectWithoutProperties(_props, ['fullWidth', 'block', 'style', 'className', 'listStyle', 'listClassName', 'textFieldStyle', 'textFieldClassName', 'inlineSuggestionStyle', 'inlineSuggestionClassName', 'menuId', 'inline', 'anchor', 'belowAnchor', 'position', 'fixedTo', 'listId', 'listInline', 'listZDepth', 'listHeightRestricted', 'xThreshold', 'yThreshold', 'closeOnOutsideClick', 'transitionName', 'transitionEnterTimeout', 'transitionLeaveTimeout', 'centered', 'sameWidth', 'repositionOnScroll', 'repositionOnResize', 'simplifiedMenu', 'minLeft', 'minRight', 'minBottom', 'fillViewportWidth', 'fillViewportHeight', 'value', 'total', 'offset', 'filter', 'data', 'dataLabel', 'dataValue', 'deleteKeys', 'defaultValue', 'clearOnAutocomplete', 'autocompleteWithLabel', 'findInlineSuggestion', 'inlineSuggestionPadding', 'onAutocomplete', 'onMenuOpen', 'onMenuClose', 'onBlur', 'onFocus', 'onKeyDown', 'onMouseDown', 'onChange']);

      delete props.focusInputOnAutocomplete;

      var value = (0, _getField2.default)(this.props, this.state, 'value');

      var autocomplete = _react2.default.createElement(_TextField2.default, _extends({}, props, {
        'aria-autocomplete': inline ? 'inline' : 'list',
        style: textFieldStyle,
        className: (0, _classnames2.default)('md-autocomplete', textFieldClassName),
        key: 'autocomplete',
        ref: this._setField,
        value: value,
        onKeyDown: this._handleTextFieldKeyDown,
        onMouseDown: this._toggleMenu,
        onChange: this._handleChange,
        onFocus: this._handleFocus,
        onBlur: this._handleBlur,
        fullWidth: fullWidth,
        block: block
      }));

      if (inline) {
        var suggestion = void 0;
        if (focus && this.state.suggestion) {
          suggestion = _react2.default.createElement(
            'span',
            {
              key: 'suggestion',
              style: _extends({}, suggestionStyle, inlineSuggestionStyle),
              className: (0, _classnames2.default)('md-autocomplete-suggestion', {
                'md-autocomplete-suggestion--floating': props.label,
                'md-autocomplete-suggestion--block': block
              }, inlineSuggestionClassName)
            },
            this.state.suggestion
          );
        }

        return _react2.default.createElement(
          _CSSTransitionGroup2.default,
          {
            component: 'div',
            style: style,
            className: (0, _classnames2.default)('md-menu-container md-autocomplete-container', className, {
              'md-full-width': fullWidth || block
            }),
            transitionName: 'opacity',
            transitionEnterTimeout: 150,
            transitionLeave: !tabbed,
            transitionLeaveTimeout: 150,
            onTouchStart: this._handleTouchStart
          },
          autocomplete,
          suggestion
        );
      }

      return _react2.default.createElement(
        _Menu2.default,
        {
          id: menuId || props.id + '-menu',
          listId: listId,
          ref: this._setMenu,
          toggle: autocomplete,
          visible: visible,
          onClick: this._handleClick,
          onClose: this._close,
          onKeyDown: this._handleMenuKeyDown,
          simplified: simplifiedMenu,
          sameWidth: sameWidth,
          centered: centered,
          anchor: anchor,
          belowAnchor: belowAnchor,
          position: position,
          fixedTo: fixedTo,
          listInline: listInline,
          listZDepth: listZDepth,
          listHeightRestricted: listHeightRestricted,
          xThreshold: xThreshold,
          yThreshold: yThreshold,
          closeOnOutsideClick: closeOnOutsideClick,
          transitionName: transitionName,
          transitionEnterTimeout: transitionEnterTimeout,
          transitionLeaveTimeout: transitionLeaveTimeout,
          fullWidth: fullWidth || block,
          style: style,
          className: (0, _classnames2.default)('md-autocomplete-container', className),
          listStyle: listStyle,
          listClassName: (0, _classnames2.default)('md-autocomplete-list', listClassName),
          repositionOnScroll: repositionOnScroll,
          repositionOnResize: repositionOnResize,
          minLeft: minLeft,
          minRight: minRight,
          minBottom: minBottom,
          fillViewportWidth: fillViewportWidth,
          fillViewportHeight: fillViewportHeight
        },
        matches.map(this._mapToListItem)
      );
    }
  }, {
    key: 'value',
    get: function get() {
      return (0, _getField2.default)(this.props, this.state, 'value');
    }

    /**
     * Just check if the click target is in a list item.. if it is, autocomplete the text field
     * with that item.
     */


    /**
     * The `mousedown` event is used instead of `click` because of the order
     * of the `mousedown`, `focus`, and `click` events.
     */


    /**
     * Allows touch devices to autocomplete the inline view by tapping:
     * - the suggestion text
     * - the text field IF there is a suggestion visible
     */

  }]);

  return Autocomplete;
}(_react.PureComponent);

Autocomplete.HorizontalAnchors = _Menu2.default.HorizontalAnchors;
Autocomplete.VerticalAnchors = _Menu2.default.VerticalAnchors;
Autocomplete.Positions = _Menu2.default.Positions;
Autocomplete.fuzzyFilter = _fuzzyFilter2.default;
Autocomplete.caseInsensitiveFilter = _caseInsensitiveFilter2.default;
Autocomplete.findIgnoreCase = _findIgnoreCase2.default;
Autocomplete.propTypes = {
  /**
   * An id to give the autocomplete. Either this or the `menuId` is required for accessibility.
   *
   * @see {@link #menuId}
   */
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * The menu id to provide to the autocomplete. Either this prop or the `id` prop is required. If
   * this props is omitted, the menuId will become: `${id}-menu`
   */
  menuId: (0, _oneRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]), 'id'),

  /**
   * An optional id to provide to the menu's list.
   *
   * @see {@link Menus/Menu#listId}
   */
  listId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional style to apply to the menu that contains the autocomplete.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the menu that contains the autocomplete.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the autocomplete's text field.
   */
  textFieldStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the autocomplete's text field.
   */
  textFieldClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the autocomplete's text field input itself.
   */
  inputStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the autocomplete's input field itself.
   */
  inputClassName: _propTypes2.default.string,

  /**
   * The optional style to apply to the opened menu List if the
   * `Autocomplete` is not using `inline` suggestions.
   */
  listStyle: _propTypes2.default.object,

  /**
   * The optional className to apply to the opened menu List if the
   * `Autocomplete` is not using `inline` suggestions.
   */
  listClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the inline suggestion when using `inline` mode.
   */
  inlineSuggestionStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the inline suggestion when using `inline` mode.
   */
  inlineSuggestionClassName: _propTypes2.default.string,

  /**
   * Boolean if the autocomplete is disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * A label to display with the autocomplete.
   */
  label: _propTypes2.default.node,

  /**
   * An optional value to use for the text field. This will force this component
   * to be controlled and require the `onChange` function.
   */
  value: (0, _controlled2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]), 'onChange'),

  /**
   * The default value for the autocomplete's text field.
   */
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  /**
   * An object key to use to extract the text to be compared for filtering.
   * This will only be applied if the given `data` prop is an array of objects.
   */
  dataLabel: _propTypes2.default.string.isRequired,

  /**
   * An optional object key to use to extract the `value` of the given `data` prop.
   * This is really only used with generating a unique react key. The unique react
   * key with either be:
   * - the datum if it is a string or number
   * - the `key` attribute of the datum object
   * - the `datum[dataValue]`
   * - or the `datum[dataLabel]`
   */
  dataValue: _propTypes2.default.string,

  /**
   * A single key or an array of keys to delete from your data object before passing
   * to the `ListItem` component.
   */
  deleteKeys: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),

  /**
   * The data that will be used for autocomplete suggestions. This can either be
   * an array of string, number, or object. If it is an array of objects, the key
   * `dataLabel` is required.
   *
   * ```docgen
   * PropTypes.arrayOf(PropTypes.oneOfType([
   *   PropTypes.element,
   *   PropTypes.string,
   *   PropTypes.number,
   *   PropTypes.shape({
   *     [dataLabel]: PropTypes.oneOfType([
   *       PropTypes.string,
   *       PropTypes.number,
   *       PropTypes.node,
   *     ]).isRequired,
   *   }),
   * ])).isRequired
   * ```
   */
  data: function data(props, propName, component) {
    for (var _len = arguments.length, others = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      others[_key - 3] = arguments[_key];
    }

    var _PropTypes$arrayOf;

    var dataLabel = props.dataLabel;

    return (_PropTypes$arrayOf = _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.shape(_defineProperty({}, dataLabel, _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.node]).isRequired))]))).isRequired.apply(_PropTypes$arrayOf, [props, propName, component].concat(others));
  },

  /**
   * An optional number representing the total number of results in the `data` prop.
   * This should really only be used when the data is paginated. When this is set,
   * each item in the suggestion menu will be updated with the `aria-setsize` and
   * `aria-posinset`.
   *
   * @see {@link #offset}
   */
  total: (0, _invalidIf2.default)(_propTypes2.default.number, 'inline'),

  /**
   * An optional number representing the data's offset if the results were paginated.
   * This is used for accessibility with the `aria-posinset` attribute.
   *
   * @see {@link #total}
   */
  offset: _propTypes2.default.number.isRequired,

  /**
   * An optional function to use to filter the `data`. If you have a sexy backend
   * using solr or some other search/indexer, it is recommended to set this prop to
   * `null`.
   */
  filter: _propTypes2.default.func,

  /**
   * An optional function to call when the `Autocomplete`'s text field has a `keydown` event.
   */
  onKeyDown: _propTypes2.default.func,

  /**
   * An optional function to call when the `Autocomplete`'s text field has a `mousedown` event.
   */
  onMouseDown: _propTypes2.default.func,

  /**
   * An optional function to call when the `Autocomplete`'s text field value changes.
   * The callback will be given the new value and the change event.
   *
   * `onChange(textFeldValue, event)`
   */
  onChange: _propTypes2.default.func,

  /**
   * An optional function to call when the `Autocomplete`'s text field is focused.
   */
  onFocus: _propTypes2.default.func,

  /**
   * An optional function to call when the entire `Autocomplete` component is blurred.
   * This will be triggered when the window is clicked or when a user tabs away from
   * the autocomplete.
   */
  onBlur: _propTypes2.default.func,

  /**
   * Boolean if this text field should be styled as a full width text field.
   * Floating labels and the text field indicator will be removed automatically.
   */
  block: _propTypes2.default.bool,

  /**
   * Boolean if the autocomplete should span the entire width.
   */
  fullWidth: _propTypes2.default.bool,

  /**
   * Boolean if the `Autocomplete` should display suggestions inline instead
   * of in a `Menu`.
   */
  inline: _propTypes2.default.bool,

  /**
   * The amount of padding to use between the current text and the inline suggestion text.
   */
  inlineSuggestionPadding: _propTypes2.default.number.isRequired,

  /**
   * The function to call to find a suggestion for an inline autocomplete. This function
   * expects to return a single result of a number or a string.
   *
   * ```js
   * @param {Array<Object|String|Number>} data - The data prop to search.
   * @param {String} value - The current value to use for searching.
   * @param {String} dataLabel - The `dataLabel` prop to use if a datum is an object.
   * @return {String|Number} the found suggestion or false-ish
   * ```
   */
  findInlineSuggestion: _propTypes2.default.func,

  /**
   * An optional function to call when an autocomplete suggestion is clicked either
   * by using the mouse, the enter/space key, or touch. The match index and current
   * `dataLabel` will be given back.
   *
   * `onAutocomplete(suggestion, suggestionIndex, matches);`
   *
   * @see {@link #autocompleteWithLabel}
   */
  onAutocomplete: _propTypes2.default.func,

  /**
   * Boolean if the `onAutocomplete` should attempt send the `suggestion[dataLabel]` instead
   * of `suggestion[dataValue]` when the data is an object.
   *
   * @see {@link #onAutocomplete}
   */
  autocompleteWithLabel: _propTypes2.default.bool,

  /**
   * A boolean if the text field's value should be reset to the empty string when
   * an item is auto-completed. This is useful if you do not want a fully controlled
   * component and the values are stored outside of the `TextField`. (like `Chips`).
   */
  clearOnAutocomplete: _propTypes2.default.bool,

  /**
   * An optional function to call when the `Autocomplete` suggestion menu opens.
   */
  onMenuOpen: _propTypes2.default.func,

  /**
   * An optional function to call when the `Autocomplete` suggestion menu closes.
   */
  onMenuClose: _propTypes2.default.func,

  /**
   * This prop is used for disabling the browser's default autocomplete suggestions
   * of previously typed values in the text field. By default, this is disabled.
   */
  autoComplete: _propTypes2.default.oneOf(['on', 'off']),

  /**
   * Boolean if the `input` should be focused again after a suggestion was clicked.
   *
   * This is really only added for keyboard support and the fact that each of suggestions
   * are focusable.
   */
  focusInputOnAutocomplete: _propTypes2.default.bool,

  /**
   * This is how the menu's `List` gets anchored to the `toggle` element.
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
   * @see [md-menu-mobile-max-height](/components/menus?tab=2#variable-md-menu-mobile-max-height)
   * @see [md-menu-desktop-max-height](/components/menus?tab=2#variable-md-menu-desktop-max-height)
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
   * @see {@link Helpers/Layover#centered}
   */
  centered: _Menu2.default.propTypes.centered,

  /**
   * @see {@link Helpers/Layover#sameWidth}
   */
  sameWidth: _Menu2.default.propTypes.sameWidth,

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
  minLeft: _propTypes2.default.number,

  /**
   * @see {@link Helpers/Layover#minRight}
   */
  minRight: _propTypes2.default.number,

  /**
   * @see {@link Helpers/Layover#minBottom}
   */
  minBottom: _propTypes2.default.number,

  /**
   * @see {@link Helpers/Layover#fillViewportWidth}
   */
  fillViewportWidth: _propTypes2.default.bool,

  /**
   * @see {@link Helpers/Layover#fillViewportHeight}
   */
  fillViewportHeight: _propTypes2.default.bool,

  /**
   * @see {@link TextFields#toolbar}
   */
  toolbar: _propTypes2.default.bool
};
Autocomplete.defaultProps = {
  autocompleteWithLabel: false,
  position: _Menu2.default.Positions.BELOW,
  sameWidth: true,
  offset: 0,
  fullWidth: true,
  defaultValue: '',
  dataLabel: 'primaryText',
  filter: Autocomplete.fuzzyFilter,
  findInlineSuggestion: Autocomplete.findIgnoreCase,
  autoComplete: 'off',
  repositionOnScroll: true,
  repositionOnResize: true,
  inlineSuggestionPadding: 6
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._close = function (e) {
    if (_this2.props.onBlur) {
      _this2.props.onBlur(e);
    }

    _this2.setState({ visible: false });
  };

  this._handleChange = function (value, event) {
    var _props2 = _this2.props,
        onChange = _props2.onChange,
        filter = _props2.filter,
        findInlineSuggestion = _props2.findInlineSuggestion,
        data = _props2.data,
        dataLabel = _props2.dataLabel,
        inline = _props2.inline;


    if (onChange) {
      onChange(value, event);
    }

    if (inline) {
      // If findInlineSuggestion does not exist, assume that `onChange` will handle it.
      return findInlineSuggestion ? _this2._findInlineSuggestions(value) : null;
    }

    var visible = _this2.state.visible;

    var matches = value || !filter ? _this2.state.matches : [];
    if (value && filter) {
      matches = filter(data, value, dataLabel);
    }

    if (filter) {
      visible = !!matches.length;
    }

    return _this2.setState({ matches: matches, visible: visible, value: value });
  };

  this._handleFocus = function (e) {
    if (_this2.props.onFocus) {
      _this2.props.onFocus(e);
    }

    var value = e.target.value;

    if (_this2.props.inline && value) {
      if (_this2.props.findInlineSuggestion) {
        _this2._findInlineSuggestions(value);
      }

      return;
    }
    _this2.setState({
      matchIndex: -1,
      visible: true,
      manualFocus: false,
      focus: true,
      matches: _this2.props.data
    });
  };

  this._handleBlur = function (e) {
    if (_this2.props.inline || !_this2.state.matches.length) {
      if (_this2.props.onBlur) {
        _this2.props.onBlur(e);
      }
    }

    _this2.setState({ focus: false });
  };

  this._handleInlineAutocomplete = function () {
    var _state3 = _this2.state,
        suggestionIndex = _state3.suggestionIndex,
        matches = _state3.matches;

    if (suggestionIndex === -1) {
      return;
    }

    var _props3 = _this2.props,
        data = _props3.data,
        dataLabel = _props3.dataLabel,
        dataValue = _props3.dataValue,
        label = _props3.autocompleteWithLabel,
        onAutocomplete = _props3.onAutocomplete;


    var value = data[suggestionIndex];
    if (onAutocomplete) {
      var v = value;
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        if (!label) {
          v = value[dataValue];
        } else {
          v = value[dataLabel];
        }
      }

      onAutocomplete(v, suggestionIndex, matches);
    }

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      value = value[dataLabel];
    }

    _this2.setState({
      value: value,
      suggestion: '',
      suggestionIndex: -1,
      tabbed: true
    });
  };

  this._handleTextFieldKeyDown = function (e) {
    var _props4 = _this2.props,
        inline = _props4.inline,
        onKeyDown = _props4.onKeyDown;
    var suggestionIndex = _this2.state.suggestionIndex;


    var key = e.which || e.keyCode;
    if (onKeyDown) {
      onKeyDown(e);
    }

    if (inline && key === _keyCodes.TAB && suggestionIndex !== -1) {
      // Autocomplete the text field
      e.preventDefault();
      _this2._handleInlineAutocomplete();
    }
  };

  this._handleMenuKeyDown = function (e) {
    var key = e.which || e.keyCode;
    if (key === _keyCodes.TAB) {
      if (_this2.props.onBlur) {
        _this2.props.onBlur(e);
      }

      _this2.setState({ visible: false });
    } else if (key === _keyCodes.UP || key === _keyCodes.DOWN) {
      _this2._focusSuggestion(key === _keyCodes.UP, e);
    }
  };

  this._handleClick = function (e) {
    var target = e.target;
    while (_this2._menu && _this2._menu.contains(target)) {
      if (target.classList.contains('md-list-item')) {
        var items = target.parentNode.querySelectorAll('.md-list-item');
        items = Array.prototype.slice.call(items);

        return _this2._handleItemClick(items.indexOf(target));
      }

      target = target.parentNode;
    }

    return null;
  };

  this._handleItemClick = function (index) {
    if (index === -1) {
      return;
    }

    var matches = _this2.state.matches;
    var _props5 = _this2.props,
        data = _props5.data,
        dataLabel = _props5.dataLabel,
        dataValue = _props5.dataValue,
        filter = _props5.filter,
        onAutocomplete = _props5.onAutocomplete,
        clearOnAutocomplete = _props5.clearOnAutocomplete,
        focusInputOnAutocomplete = _props5.focusInputOnAutocomplete,
        label = _props5.autocompleteWithLabel;


    var value = matches.filter(function (m) {
      return !_react2.default.isValidElement(m);
    })[index];
    if (onAutocomplete) {
      var v = value;
      if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
        if (!label) {
          v = value[dataValue];
        } else {
          v = value[dataLabel];
        }
      }

      onAutocomplete(v, index, matches);
    }

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      value = value[dataLabel];
    }

    value = clearOnAutocomplete ? '' : value;
    var callback = void 0;
    if (focusInputOnAutocomplete) {
      callback = function callback() {
        _this2._field.focus();
      };
    }

    _this2.setState({
      visible: false,
      manualFocus: focusInputOnAutocomplete,
      matches: filter ? filter(data, value, dataLabel) : matches,
      value: value
    }, callback);
  };

  this._focusSuggestion = function (negative, e) {
    e.preventDefault();
    var _state4 = _this2.state,
        matchIndex = _state4.matchIndex,
        matches = _state4.matches;

    var l = matches.length;

    var index = void 0;
    if (negative && matchIndex === -1 || !negative && matchIndex >= l) {
      return;
    } else if (negative) {
      index = matchIndex - 1;
      if (index === -1) {
        _this2._field.focus();
      }
    } else {
      index = Math.min(l, matchIndex + 1);
    }

    if (index !== -1 && index !== matchIndex) {
      var item = _this2._menu.querySelectorAll('.md-list-tile')[index];
      if (item) {
        item.focus();
      }
    }

    _this2.setState({ matchIndex: index });
  };

  this._findInlineSuggestions = function (value) {
    var _props6 = _this2.props,
        data = _props6.data,
        dataLabel = _props6.dataLabel,
        findInlineSuggestion = _props6.findInlineSuggestion,
        inlineSuggestionPadding = _props6.inlineSuggestionPadding;


    var suggestion = findInlineSuggestion(data, value, dataLabel);
    if ((typeof suggestion === 'undefined' ? 'undefined' : _typeof(suggestion)) === 'object') {
      throw new Error('`findInlineSuggestion` should return a string or a number, but got an object.', suggestion);
    }

    var suggestionStyle = _this2.state.suggestionStyle;

    var suggestionIndex = -1;
    if (suggestion) {
      // Find index of suggestion
      data.some(function (datum, i) {
        var d = (typeof dataum === 'undefined' ? 'undefined' : _typeof(dataum)) === 'object' ? datum[dataLabel] : datum;
        if (d === suggestion) {
          suggestionIndex = i;
        }

        return suggestionIndex !== -1;
      });

      // Strip already used letters
      suggestion = suggestion.toString().substring(value.length, suggestion.length);

      // Position the inline suggestion next to the text
      var width = (0, _getTextWidth2.default)(value, _this2._field);
      if (width !== null) {
        width += inlineSuggestionPadding;
      }

      if (width !== null && (!suggestionStyle || suggestionStyle.left !== width)) {
        suggestionStyle = { left: width };
      }
    }

    _this2.setState({
      value: value,
      suggestion: suggestion,
      suggestionIndex: suggestionIndex,
      suggestionStyle: suggestionStyle,
      tabbed: false,
      focus: true
    });
  };

  this._mapToListItem = function (match, i) {
    if (_react2.default.isValidElement(match)) {
      return match;
    }

    var _props7 = _this2.props,
        dataLabel = _props7.dataLabel,
        dataValue = _props7.dataValue,
        deleteKeys = _props7.deleteKeys,
        total = _props7.total,
        offset = _props7.offset,
        data = _props7.data;

    var props = void 0;
    switch (typeof match === 'undefined' ? 'undefined' : _typeof(match)) {
      case 'string':
      case 'number':
        props = {
          key: match,
          primaryText: match
        };
        break;
      default:
        if (deleteKeys) {
          props = (0, _omit2.default)(match, typeof deleteKeys === 'string' ? [deleteKeys] : deleteKeys);
        } else {
          props = match;
        }

        props = _extends({}, props, {
          key: match.key || dataValue && match[dataValue] || match[dataLabel],
          primaryText: match[dataLabel]
        });
    }

    if (typeof total !== 'undefined' && data.length < total) {
      props['aria-setsize'] = total;
      props['aria-posinset'] = i + 1 + offset;
    }

    // Allows focus, but does not let tab focus. This is so up and down keys work.
    return _react2.default.createElement(_ListItem2.default, _extends({ tabIndex: -1 }, props));
  };

  this._toggleMenu = function (e) {
    if (_this2.props.onMouseDown) {
      _this2.props.onMouseDown(e);
    }

    if (!_this2.props.inline && _this2.state.matches.length && (0, _getField2.default)(_this2.props, _this2.state, 'value')) {
      _this2.setState({ visible: !_this2.state.visible });
    }
  };

  this._handleTouchStart = function (e) {
    var target = e.target;
    var suggestion = _this2.state.suggestion;

    if (target.classList.contains('md-autocomplete-suggestion') && suggestion) {
      _this2._handleInlineAutocomplete();
    }
  };

  this._setField = function (field) {
    if (field) {
      _this2._field = field.getField();
    }
  };

  this._setMenu = function (menu) {
    _this2._menu = (0, _reactDom.findDOMNode)(menu);
  };
};

exports.default = Autocomplete;
//# sourceMappingURL=Autocomplete.js.map