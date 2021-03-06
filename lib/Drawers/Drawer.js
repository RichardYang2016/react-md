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

var _media = require('../constants/media');

var _CSSTransitionGroupTick = require('../constants/CSSTransitionGroupTick');

var _CSSTransitionGroupTick2 = _interopRequireDefault(_CSSTransitionGroupTick);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _mapToListParts = require('../utils/mapToListParts');

var _mapToListParts2 = _interopRequireDefault(_mapToListParts);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _Paper = require('../Papers/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Portal = require('../Helpers/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _List = require('../Lists/List');

var _List2 = _interopRequireDefault(_List);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _isType = require('./isType');

var _DrawerTypes = require('./DrawerTypes');

var _DrawerTypes2 = _interopRequireDefault(_DrawerTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var oneOfDrawerTypes = _propTypes2.default.oneOf([_DrawerTypes2.default.FULL_HEIGHT, _DrawerTypes2.default.CLIPPED, _DrawerTypes2.default.FLOATING, _DrawerTypes2.default.PERSISTENT, _DrawerTypes2.default.PERSISTENT_MINI, _DrawerTypes2.default.TEMPORARY, _DrawerTypes2.default.TEMPORARY_MINI]);

/**
 * The `Drawer` component is used for having a sliding panel of content or navigation
 * that appears from the side of a screen.
 *
 * If the `Drawer` uses any of the `_MINI` drawer types, you will need to also create another
 * `Drawer` that is not `_MINI`. Transitioning the `width` on mobile devices is very sluggish,
 * and it isn't much more work to create another drawer.
 */

var Drawer = function (_PureComponent) {
  _inherits(Drawer, _PureComponent);

  _createClass(Drawer, null, [{
    key: 'getCurrentMedia',


    /**
     * Determines the current media and returns an object containing matches for `mobile`, `tablet`, `desktop`,
     * and the current drawer type. This expects a `props` object of the drawer.
     *
     * If this is used server side, it will default to only matching mobile.
     *
     * @param {Object=} props - The current drawer's prop shape to extract the mobile, tablet,
     *    and desktop type/min widths. This defaults to the drawer's default props.
     * @return {Object} an object containing the media matches and the current type to use for the drawer.
     */
    value: function getCurrentMedia() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Drawer.defaultProps;
      var mobileMinWidth = props.mobileMinWidth,
          tabletMinWidth = props.tabletMinWidth,
          desktopMinWidth = props.desktopMinWidth,
          mobileType = props.mobileType,
          tabletType = props.tabletType,
          desktopType = props.desktopType,
          constantType = props.constantType;

      if (typeof window === 'undefined') {
        var _type = constantType && props.type ? props.type : mobileType;
        return { mobile: true, tablet: false, desktop: false, type: _type };
      }

      var mobile = Drawer.matchesMedia(mobileMinWidth, tabletMinWidth - 1);
      var tablet = Drawer.matchesMedia(tabletMinWidth, desktopMinWidth);
      var desktop = Drawer.matchesMedia(desktopMinWidth);

      var type = void 0;
      if (constantType && props.type && (0, _isType.isTemporary)(props.type)) {
        type = props.type;
      } else if (desktop) {
        type = desktopType;
      } else if (tablet) {
        type = tabletType;
      } else {
        type = mobileType;
      }

      return { type: type, mobile: mobile, tablet: tablet, desktop: desktop };
    }

    /**
     * Simply does a `window.matchMedia(query)` where the query gets defined as a min width
     * and optional max width.
     *
     * @param {number} min - The min width for the media query.
     * @param {number=} max - An optional max width to include for the media query.
     * @return {boolean} true if the media matches.
     */

  }, {
    key: 'matchesMedia',
    value: function matchesMedia(min, max) {
      var media = 'screen and (min-width: ' + min + 'px)';
      if (max) {
        media += ' and (max-width: ' + max + 'px)';
      }

      return window.matchMedia(media).matches;
    }
  }]);

  function Drawer(props) {
    _classCallCheck(this, Drawer);

    var _this = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, props));

    _initialiseProps.call(_this);

    var defaultVisible = props.defaultVisible,
        defaultMedia = props.defaultMedia,
        overlay = props.overlay;


    _this.state = {
      mobile: defaultMedia === 'mobile',
      tablet: defaultMedia === 'tablet',
      desktop: defaultMedia === 'desktop',
      animating: false,
      overlayActive: false,
      drawerActive: false
    };

    if (typeof props.type === 'undefined') {
      _this.state.type = props[defaultMedia + 'Type'];
    }

    var type = (0, _getField2.default)(props, _this.state, 'type');
    _this._initialFix = true;

    if (typeof props.visible === 'undefined') {
      var _visible = (0, _isType.isPermanent)(type) || (0, _isType.isMini)(type);
      if (!_visible && typeof defaultVisible !== 'undefined') {
        _visible = defaultVisible;
      }

      _this.state.visible = _visible;
    }

    var visible = (0, _getField2.default)(props, _this.state, 'visible');

    _this.state.overlayActive = (typeof overlay !== 'undefined' ? overlay : (0, _isType.isTemporary)(type) && !_this.state.desktop) && visible;
    _this.state.drawerActive = visible;
    return _this;
  }

  _createClass(Drawer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (typeof window !== 'undefined') {
        this._updateType(this.props);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!(0, _isType.isMini)((0, _getField2.default)(this.props, this.state, 'type'))) {
        window.addEventListener('resize', this._updateMedia);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          mobileMinWidth = _props.mobileMinWidth,
          mobileType = _props.mobileType,
          tabletMinWidth = _props.tabletMinWidth,
          tabletType = _props.tabletType,
          desktopMinWidth = _props.desktopMinWidth,
          desktopType = _props.desktopType;


      if (nextProps.mobileMinWidth !== mobileMinWidth || nextProps.mobileType !== mobileType || nextProps.tabletMinWidth !== tabletMinWidth || nextProps.tabletType !== tabletType || nextProps.desktopMinWidth !== desktopMinWidth || nextProps.desktopType !== desktopType) {
        this._updateType(nextProps);
      }

      var visible = nextProps.visible,
          transitionDuration = nextProps.transitionDuration,
          overlay = nextProps.overlay;

      if (this.props.visible === nextProps.visible) {
        return;
      }

      var type = (0, _getField2.default)(nextProps, this.state, 'type');
      this._animate(visible, type, transitionDuration, overlay, this.state.desktop);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }

      if (this._closeTimeout) {
        clearTimeout(this._closeTimeout);
      }

      window.removeEventListener('resize', this._updateMedia);
    }
  }, {
    key: 'render',
    value: function render() {
      var _cn;

      var _state = this.state,
          overlayActive = _state.overlayActive,
          drawerActive = _state.drawerActive,
          animating = _state.animating;

      var _props2 = this.props,
          id = _props2.id,
          style = _props2.style,
          className = _props2.className,
          navStyle = _props2.navStyle,
          navClassName = _props2.navClassName,
          component = _props2.component,
          navItems = _props2.navItems,
          header = _props2.header,
          children = _props2.children,
          inline = _props2.inline,
          position = _props2.position,
          overlay = _props2.overlay,
          clickableDesktopOverlay = _props2.clickableDesktopOverlay,
          lastChild = _props2.lastChild,
          portal = _props2.portal,
          overlayStyle = _props2.overlayStyle,
          overlayClassName = _props2.overlayClassName,
          propType = _props2.type,
          propVisible = _props2.visible,
          propRenderNode = _props2.renderNode,
          propNavItemsId = _props2.navItemsId,
          propZDepth = _props2.zDepth,
          constantType = _props2.constantType,
          defaultVisible = _props2.defaultVisible,
          defaultMedia = _props2.defaultMedia,
          mobileType = _props2.mobileType,
          mobileMinWidth = _props2.mobileMinWidth,
          tabletType = _props2.tabletType,
          tabletMinWidth = _props2.tabletMinWidth,
          desktopType = _props2.desktopType,
          desktopMinWidth = _props2.desktopMinWidth,
          transitionDuration = _props2.transitionDuration,
          onMediaTypeChange = _props2.onMediaTypeChange,
          onVisibilityChange = _props2.onVisibilityChange,
          autoclose = _props2.autoclose,
          autocloseAfterInk = _props2.autocloseAfterInk,
          onVisibilityToggle = _props2.onVisibilityToggle,
          closeOnNavItemClick = _props2.closeOnNavItemClick,
          props = _objectWithoutProperties(_props2, ['id', 'style', 'className', 'navStyle', 'navClassName', 'component', 'navItems', 'header', 'children', 'inline', 'position', 'overlay', 'clickableDesktopOverlay', 'lastChild', 'portal', 'overlayStyle', 'overlayClassName', 'type', 'visible', 'renderNode', 'navItemsId', 'zDepth', 'constantType', 'defaultVisible', 'defaultMedia', 'mobileType', 'mobileMinWidth', 'tabletType', 'tabletMinWidth', 'desktopType', 'desktopMinWidth', 'transitionDuration', 'onMediaTypeChange', 'onVisibilityChange', 'autoclose', 'autocloseAfterInk', 'onVisibilityToggle', 'closeOnNavItemClick']);

      var _props3 = this.props,
          navItemsId = _props3.navItemsId,
          zDepth = _props3.zDepth;

      if (!navItemsId && id) {
        navItemsId = id + '-nav-items';
      }

      var desktop = this.state.desktop;

      var renderNode = (0, _getField2.default)(this.props, this.context, 'renderNode');
      var type = (0, _getField2.default)(this.props, this.state, 'type');
      var visible = (0, _getField2.default)(this.props, this.state, 'visible');
      var mini = (0, _isType.isMini)(type);
      var temporary = (0, _isType.isTemporary)(type);
      var floating = _DrawerTypes2.default.FLOATING === type;
      var permanent = (0, _isType.isPermanent)(type);

      var Component = void 0;
      if (component) {
        Component = component;
      } else if (navItems) {
        Component = 'nav';
      } else {
        Component = 'aside';
      }

      var navigation = void 0;
      if (navItems) {
        navigation = _react2.default.createElement(
          _List2.default,
          {
            ref: this._setNavigation,
            key: 'navigation',
            id: navItemsId,
            style: navStyle,
            className: (0, _classnames2.default)('md-list--drawer', {
              'md-toolbar-relative': mini && !visible,
              'md-background': floating
            }, navClassName),
            onClick: this._handleNavClick
          },
          navItems.map(_mapToListParts2.default)
        );
      }

      if (typeof zDepth === 'undefined') {
        zDepth = 1;
        if (floating || inline) {
          zDepth = 0;
        } else if (!mini && temporary) {
          zDepth = 5;
        }
      }

      var overlayVisible = overlay;
      if (typeof overlayVisible !== 'boolean') {
        overlayVisible = temporary && !mini && (!desktop || clickableDesktopOverlay) && (animating || visible);
      }

      var drawer = _react2.default.createElement(
        _Paper2.default,
        _extends({}, props, {
          id: id,
          key: 'drawer',
          component: Component,
          zDepth: zDepth,
          raiseOnHover: false,
          style: style,
          className: (0, _classnames2.default)('md-drawer', (_cn = {}, _defineProperty(_cn, 'md-drawer--' + position, !inline), _defineProperty(_cn, 'md-drawer--fixed', !inline), _defineProperty(_cn, 'md-drawer--inline', inline), _defineProperty(_cn, 'md-drawer--active', mini || drawerActive), _defineProperty(_cn, 'md-drawer--mini', mini), _defineProperty(_cn, 'md-transition--deceleration', !mini && !permanent && visible), _defineProperty(_cn, 'md-transition--acceleration', !mini && !permanent && !visible), _defineProperty(_cn, 'md-background', inline || floating), _defineProperty(_cn, 'md-background--card', !floating && !inline), _cn), className)
        }),
        header,
        navigation,
        children,
        _react2.default.createElement(_Overlay2.default, {
          style: overlayStyle,
          className: overlayClassName,
          active: overlayActive,
          onClick: this._closeDrawer,
          visible: overlayVisible,
          renderNode: renderNode
        })
      );

      if (inline || permanent) {
        return drawer;
      } else if (!portal) {
        return mini || animating || visible ? drawer : null;
      }

      return _react2.default.createElement(
        _Portal2.default,
        { visible: animating || visible, renderNode: renderNode, lastChild: lastChild },
        drawer
      );
    }
  }]);

  return Drawer;
}(_react.PureComponent);

Drawer.DrawerTypes = _DrawerTypes2.default;
Drawer.propTypes = {
  /**
   * An optional id to provide to the drawer. This is generally a good idea to provide if
   * there are any `navItems` defined.
   *
   * @see {@link #navItemsId}
   */
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional id to provide to the navItems list. If this is omitted and the `id` prop is
   * defined, it will be defaulted to `${id}-nav-items`.
   */
  navItemsId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the `List` surrounding the `navItems`.
   */
  navStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the `List` surrounding the `navItems`.
   */
  navClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the overlay.
   */
  overlayStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the overlay.
   */
  overlayClassName: _propTypes2.default.string,

  /**
   * An optional component to render the drawer in. When this prop is undefined, the drawer
   * will be rendered as a `nav` if the `navItems` prop is defined, otherwise an `aside`.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]),

  /**
   * An optional list of navigation items to display in the drawer. This list can either contain
   * a valid child component for a `List` or an object used to create a `Divider`, `Subheader`,
   * or `ListItem`.
   *
   * - To create a divider in the list, set a `divider` key to `true`. Any other keys will be
   * passed to the `Divider` component.
   * - To create a subheader in the list, set the `subheader` key to `true`. Any other keys will
   * be passed to the `Subheader` component.
   * - To create a list item, just create an object with any normal `ListItem` props.
   */
  navItems: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.shape({
    divider: _propTypes2.default.bool,
    subheader: _propTypes2.default.bool,
    primaryText: _propTypes2.default.node
  })])),

  /**
   * Boolean if a temporary drawer should close when a nav item is clicked.
   */
  autoclose: _propTypes2.default.bool,

  /**
   * An optional header to display. This _should_ normally be a toolbar.
   */
  header: _propTypes2.default.node,

  /**
   * Any additional children to display after the `header` and `navItems`.
   */
  children: _propTypes2.default.node,

  /**
   * The drawer type to use when the current device matches the mobile
   * media query.
   */
  mobileType: _propTypes2.default.oneOf([Drawer.DrawerTypes.TEMPORARY, Drawer.DrawerTypes.TEMPORARY_MINI]).isRequired,

  /**
   * The min-width to use for the mobile media query.
   */
  mobileMinWidth: _propTypes2.default.number.isRequired,

  /**
   * The drawer type to use when the current device matches the tablet
   * media query.
   */
  tabletType: oneOfDrawerTypes.isRequired,

  /**
   * The min-width to use for the tablet media query.
   */
  tabletMinWidth: _propTypes2.default.number.isRequired,

  /**
   * The drawer type to use when the current device matches the desktop media
   * query.
   */
  desktopType: oneOfDrawerTypes.isRequired,

  /**
   * The min-width for a desktop screen.
   */
  desktopMinWidth: _propTypes2.default.number.isRequired,

  /**
   * An optional type to enforce across all media sizes. Since `mobile` devices are
   * included, you are required to manually specify when the `type` should be `temporary`.
   *
   * When the `type` is not one of the `temporary` types, the `onMediaTypeChange` prop
   * must be provided.
   */
  type: function type(props, propName, component) {
    for (var _len = arguments.length, others = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      others[_key - 3] = arguments[_key];
    }

    var type = props[propName];
    if ((0, _isType.isTemporary)(type)) {
      return oneOfDrawerTypes.apply(undefined, [props, propName, component].concat(others));
    }

    var err = oneOfDrawerTypes.apply(undefined, [props, propName, component].concat(others));
    if (!err && typeof type !== 'undefined' && !(0, _isType.isMini)(type) && typeof props.onMediaTypeChange === 'undefined') {
      err = new Error('You provided a `' + propName + '` prop to the ' + component + ' without the `onMediaTypeChange` ' + ('handler. The `onMediaTypeChange` prop must be specified when the `' + propName + '` is not ') + 'one of the `temporary` types.');
    }

    return err;
  },

  /**
   * An optional function to call when the drawer's type changes when the screen resizes.
   * The callback will include the new `type` that should be used for the screen size,
   * and an object containing the media matches for `mobile`, `tablet`, and `desktop`.
   *
   * ```js
   * this.props.onMediaTypeChange(Drawer.DrawerTypes.TEMPORARY, {
   *   mobile: true,
   *   tablet: false,
   *   desktop: false,
   * });
   * ```
   */
  onMediaTypeChange: _propTypes2.default.func,

  /**
   * The default drawer type to display on initial render. The drawer will automatically
   * adjust itself to the correct media once it has mounted. This prop is really only useful
   * for server side rendering.
   */
  defaultMedia: _propTypes2.default.oneOf(['mobile', 'tablet', 'desktop']).isRequired,

  /**
   * Boolean if there should be a visible overlay when the drawer is visible. The default behavior
   * is to only include a visible overlay when the `type` is `TEMPORARY` or `TEMPORARY_MINI` and
   * the device is not a desktop.
   *
   * Definining this variable as `true` or `false` will override any default behavior. This means that
   * if this is enabled for a full-height drawer, an overlay will still be created.
   */
  overlay: _propTypes2.default.bool,

  /**
   * Boolean if the Portal's functionality of rendering in a separate react tree should be applied
   * to the drawer. The overlay that appears for temporary type drawers will still appear in the
   * separate subtree.
   *
   * @see {@link Helpers/Portal}
   */
  portal: _propTypes2.default.bool,

  /**
   * An optional DOM Node to render the drawer into. The default is to render as
   * the first child in the `body`.
   *
   * > This prop will not be used when the drawer is of the permanent type or `inline` is specified
   * since the `Portal` component will not be used.
   */
  renderNode: _propTypes2.default.object,

  /**
   * Boolean if the drawer should be rendered as the last child instead of the first child
   * in the `renderNode` or `body`.
   *
   * > This prop will not be used when the drawer is of the permanent type or `inline` is specified
   * since the `Portal` component will not be used.
   */
  lastChild: _propTypes2.default.bool,

  /**
   * Boolean if the drawer is visible by default. If this is omitted, the drawer will be visible
   * if the current drawer type is NOT `Drawer.DrawerTypes.TEMPORARY` or `Drawer.DrawerTypes.TEMPORARY_MINI`.
   *
   * This basically means that if you are using the default configuration, a mobile device's drawer
   * will be hidden while tablets and desktops will be visible.
   */
  defaultVisible: _propTypes2.default.bool,

  /**
   * Boolean if the drawer is visible. This will force the component to define the `onVisibilityChange`
   * prop as well as manually updating the drawer's visibility.
   */
  visible: (0, _controlled2.default)(_propTypes2.default.bool, 'onVisibilityChange', 'defaultVisible'),

  /**
   * An optional function to call when the visibility of the drawer is changed. The function will
   * be called with the new visibility state.
   *
   * ```js
   * onVisibilityChange(!currentlyVisible);
   * ```
   */
  onVisibilityChange: _propTypes2.default.func,

  /**
   * The drawer's position on the page when it is not `inline`. When the drawer's position is `left`,
   * the width will be `calc(100vw - 56px)` on mobile devices and `$md-drawer-desktop-width` on desktops.
   *
   * When the position is `right`, the width will be `100vw` for mobile devices and scaling to the drawer's
   * children width on desktops.
   */
  position: _propTypes2.default.oneOf(['left', 'right']).isRequired,

  /**
   * Boolean if the drawer should be displayed inline instead of fixed to the page. When this prop
   * is enabled, the `position` prop will not be used.
   */
  inline: _propTypes2.default.bool,

  /**
   * The `$md-drawer-transition-time` value from sass.
   */
  transitionDuration: _propTypes2.default.number.isRequired,

  /**
   * Boolean if the temporary drawer's overlay should be created on desktop screens. This is really used so that
   * the drawer will close when a user clicks anywhere on the page except in the drawer.
   */
  clickableDesktopOverlay: _propTypes2.default.bool,

  /**
   * Boolean if the `autoclose` feature should wait for the ink transition to finish before automatically
   * closing the drawer. This will add a `300ms` delay. If this is `false`, there will only be a `17ms` delay.
   *
   * > The delay is required so that any event listeners will still be correctly invoked when an item is clicked.
   */
  autocloseAfterInk: _propTypes2.default.bool,

  /**
   * Boolean if the `type` prop should be constant across all media sizes. This is only valid if the `type` is
   * one of the temporary types.
   *
   * This will basically mean that when attempting to do a media adjustment, it will use the `type` prop instead of
   * `mobileType`, `tabletType`, and `desktopType` to determine the next drawer type.
   */
  constantType: _propTypes2.default.bool.isRequired,

  /**
   * An optional zDepth to apply to the drawer. If this is omitted, the value will be set as follows:
   * - floating || inline = 1
   * - temporary = 5
   * - all others = 1
   *
   * @see {@link Papers/Paper#zDepth}
   */
  zDepth: _propTypes2.default.number,

  closeOnNavItemClick: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `autoclose` instead'),
  onVisibilityToggle: (0, _deprecated2.default)(_propTypes2.default.func, 'Use `onVisibilityChange` instead')
};
Drawer.defaultProps = {
  defaultMedia: 'mobile',
  mobileType: Drawer.DrawerTypes.TEMPORARY,
  mobileMinWidth: _media.MOBILE_MIN_WIDTH,
  tabletType: Drawer.DrawerTypes.PERSISTENT,
  tabletMinWidth: _media.TABLET_MIN_WIDTH,
  desktopType: Drawer.DrawerTypes.FULL_HEIGHT,
  desktopMinWidth: _media.DESKTOP_MIN_WIDTH,
  position: 'left',
  transitionDuration: 300,
  autoclose: true,
  clickableDesktopOverlay: true,
  constantType: true
};
Drawer.contextTypes = {
  renderNode: _propTypes2.default.object
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._updateType = function (props) {
    var onMediaTypeChange = props.onMediaTypeChange,
        overlay = props.overlay,
        transitionDuration = props.transitionDuration;


    var onVisibilityChange = props.onVisibilityToggle || props.onVisibilityChange;

    var state = Drawer.getCurrentMedia(props);
    var diffType = (0, _getField2.default)(props, _this2.state, 'type') !== state.type;
    var diffMedia = state.mobile !== _this2.state.mobile || state.tablet !== _this2.state.tablet || state.desktop !== _this2.state.desktop;

    if (onMediaTypeChange && (diffType || diffMedia)) {
      onMediaTypeChange(state.type, { mobile: state.mobile, tablet: state.tablet, desktop: state.desktop });
    }

    if (diffType) {
      var visible = (0, _isType.isPermanent)(state.type);
      if (_this2._initialFix) {
        if (props.defaultVisible) {
          visible = props.defaultVisible;
        } else if (props.visible) {
          visible = props.visible;
        }
      }

      var prevVisible = (0, _getField2.default)(props, _this2.state, 'visible');
      if (onVisibilityChange && visible !== prevVisible) {
        onVisibilityChange(visible);
      }

      if (typeof props.visible === 'undefined') {
        state.visible = visible;
        _this2._animate(visible, state.type, transitionDuration, overlay, state.desktop);
      }
    } else if (_this2._initialFix && diffMedia) {
      state.overlayActive = (typeof overlay !== 'undefined' ? overlay : (0, _isType.isTemporary)(state.type) && !state.desktop) && (0, _getField2.default)(props, _this2.state, 'visible');
    }

    if (typeof props.type !== 'undefined') {
      var _state2 = state,
          type = _state2.type,
          realState = _objectWithoutProperties(_state2, ['type']); // eslint-disable-line no-unused-vars


      state = realState;
    }

    _this2._initialFix = false;
    _this2.setState(state);
  };

  this._updateMedia = function () {
    _this2._updateType(_this2.props);
  };

  this._animate = function (visible, type, timeout, overlay, desktop) {
    if (_this2._timeout) {
      clearTimeout(_this2._timeout);
    }

    if (visible) {
      _this2._timeout = setTimeout(function () {
        _this2._timeout = null;

        _this2.setState({
          overlayActive: overlay || (0, _isType.isTemporary)(type) && !desktop,
          drawerActive: true,
          animating: true
        });
      }, _CSSTransitionGroupTick2.default);
    } else {
      _this2._timeout = setTimeout(function () {
        _this2._timeout = null;

        _this2.setState({ animating: false });
      }, timeout);
      _this2.setState({ animating: true, overlayActive: false, drawerActive: false });
    }
  };

  this._setNavigation = function (navigation) {
    _this2._navigation = (0, _reactDom.findDOMNode)(navigation);
  };

  this._handleNavClick = function (e) {
    var _props4 = _this2.props,
        closeOnNavItemClick = _props4.closeOnNavItemClick,
        autoclose = _props4.autoclose,
        autocloseAfterInk = _props4.autocloseAfterInk;

    var enabled = typeof closeOnNavItemClick !== 'undefined' ? closeOnNavItemClick : autoclose;
    if (!enabled || !(0, _isType.isTemporary)((0, _getField2.default)(_this2.props, _this2.state, 'type'))) {
      return;
    }

    var target = e.target;

    while (target && _this2._navigation.contains(target)) {
      if (target.classList.contains('md-list-tile')) {
        // Clicked a nav item that has a nested list
        if (target.getAttribute('aria-expanded') !== null) {
          return;
        }

        _this2._closeTimeout = setTimeout(function () {
          _this2._closeTimeout = null;

          _this2._closeDrawer(e);
        }, autocloseAfterInk ? 300 : _CSSTransitionGroupTick2.default);
        return;
      }

      target = target.parentNode;
    }
  };

  this._closeDrawer = function () {
    var _props5 = _this2.props,
        onVisibilityChange = _props5.onVisibilityChange,
        onVisibilityToggle = _props5.onVisibilityToggle,
        transitionDuration = _props5.transitionDuration,
        overlay = _props5.overlay;

    var callback = onVisibilityToggle || onVisibilityChange;
    if (callback) {
      callback(false);
    }

    if (typeof _this2.props.visible === 'undefined') {
      _this2.setState({ visible: false });
      _this2._animate(false, (0, _getField2.default)(_this2.props, _this2.state, 'type'), transitionDuration, overlay, _this2.state.desktop);
    }
  };
};

exports.default = Drawer;
//# sourceMappingURL=Drawer.js.map