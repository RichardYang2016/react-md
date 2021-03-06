'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _invalidIf = require('../utils/PropTypes/invalidIf');

var _invalidIf2 = _interopRequireDefault(_invalidIf);

var _Button = require('../Buttons/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Drawer = require('../Drawers/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _List = require('../Lists/List');

var _List2 = _interopRequireDefault(_List);

var _Toolbar = require('../Toolbars/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _getDeprecatedIcon = require('../FontIcons/getDeprecatedIcon');

var _getDeprecatedIcon2 = _interopRequireDefault(_getDeprecatedIcon);

var _isType = require('../Drawers/isType');

var _JumpToContentLink = require('./JumpToContentLink');

var _JumpToContentLink2 = _interopRequireDefault(_JumpToContentLink);

var _CloseButton = require('./CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _MiniListItem = require('./MiniListItem');

var _MiniListItem2 = _interopRequireDefault(_MiniListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DrawerTypes = _Drawer2.default.DrawerTypes;


function getNonMiniType(type) {
  var pMini = DrawerTypes.PERSISTENT_MINI,
      tMini = DrawerTypes.TEMPORARY_MINI;

  if ([pMini, tMini].indexOf(type) === -1) {
    return type;
  }

  return pMini === type ? DrawerTypes.PERSISTENT : DrawerTypes.TEMPORARY;
}

function toMiniListItem(item, index) {
  if ((0, _react.isValidElement)(item)) {
    return item;
  }

  var divider = item.divider,
      subheader = item.subheader,
      key = item.key,
      itemProps = _objectWithoutProperties(item, ['divider', 'subheader', 'key']);

  if (divider || subheader) {
    return null;
  }

  return _react2.default.createElement(_MiniListItem2.default, _extends({ key: key || index }, itemProps));
}

/**
 * The `NavigationDrawer` is used when you want a full layout configuration. It is a combination
 * of the `Toolbar` component and the `Drawer` component. Any props that are not specifically
 * listed below will be provided to the `Drawer` component. So if there are props on the `Drawer`
 * that are not listed here, they will be passed along.
 *
 * The main benefit of using this component is that it will manage adding respective offset
 * classes automatically for you to the content and the drawer. It will also manage using
 * a mini drawer type for you.
 */

var NavigationDrawer = function (_PureComponent) {
  _inherits(NavigationDrawer, _PureComponent);

  _createClass(NavigationDrawer, null, [{
    key: 'getCurrentMedia',


    /**
     * Determines the current media and returns an object containing matches for `mobile`, `tablet`, `desktop`,
     * and the current drawer type. This expects a `props` object of the drawer.
     *
     * If this is used server side, it will default to only matching mobile.
     *
     * @param {Object=} props - The current drawer's prop shape to extract the mobile, tablet, and desktop type/min
     *    widths. This defaults to the drawer's default props.
     * @return {Object} an object containing the media matches and the current type to use for the drawer.
     */
    value: function getCurrentMedia() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NavigationDrawer.defaultProps;

      var mobileType = props.mobileDrawerType,
          tabletType = props.tabletDrawerType,
          desktopType = props.desktopDrawerType,
          constantType = props.constantDrawerType,
          others = _objectWithoutProperties(props, ['mobileDrawerType', 'tabletDrawerType', 'desktopDrawerType', 'constantDrawerType']);

      return _Drawer2.default.getCurrentMedia(_extends({ mobileType: mobileType, tabletType: tabletType, desktopType: desktopType, constantType: constantType }, others));
    }
  }]);

  function NavigationDrawer(props) {
    _classCallCheck(this, NavigationDrawer);

    var _this = _possibleConstructorReturn(this, (NavigationDrawer.__proto__ || Object.getPrototypeOf(NavigationDrawer)).call(this, props));

    _initialiseProps.call(_this);

    var defaultMedia = props.defaultMedia,
        defaultVisible = props.defaultVisible,
        initialDrawerType = props.initialDrawerType;


    _this.state = {
      mobile: initialDrawerType || defaultMedia === 'mobile',
      tablet: initialDrawerType || defaultMedia === 'tablet',
      desktop: initialDrawerType || defaultMedia === 'desktop'
    };

    if (typeof props.drawerType === 'undefined') {
      _this.state.drawerType = props[(initialDrawerType || defaultMedia) + 'DrawerType'];
    }

    var type = (0, _getField2.default)(props, _this.state, 'drawerType');

    if (typeof props.visible === 'undefined') {
      // The logic for determining the visibility is handled by the created mini drawer
      _this.state.visible = (0, _isType.isPermanent)(type);
      if (!_this.state.visible && typeof defaultVisible !== 'undefined') {
        _this.state.visible = defaultVisible;
      }
    }
    return _this;
  }

  _createClass(NavigationDrawer, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _props = this.props,
          persistentIcon = _props.persistentIcon,
          id = _props.contentId,
          label = _props.jumpLabel,
          persistentIconChildren = _props.persistentIconChildren,
          persistentIconClassName = _props.persistentIconClassName,
          closeIconChildren = _props.closeIconChildren,
          closeIconClassName = _props.closeIconClassName;


      return {
        id: id,
        label: label,
        closeIcon: (0, _getDeprecatedIcon2.default)(closeIconClassName || persistentIconClassName, closeIconChildren || persistentIconChildren, persistentIcon),
        onCloseClick: this._toggleVisibility,
        renderNode: this.context.renderNode
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var visible = (0, _getField2.default)(this.props, this.state, 'visible');
      var nVisible = (0, _getField2.default)(nextProps, this.state, 'visible');
      if (visible !== nVisible) {
        this._animate(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          id = _props2.id,
          style = _props2.style,
          className = _props2.className,
          toolbarStyle = _props2.toolbarStyle,
          toolbarClassName = _props2.toolbarClassName,
          drawerStyle = _props2.drawerStyle,
          drawerClassName = _props2.drawerClassName,
          contentStyle = _props2.contentStyle,
          contentClassName = _props2.contentClassName,
          Content = _props2.contentComponent,
          miniDrawerStyle = _props2.miniDrawerStyle,
          miniDrawerClassName = _props2.miniDrawerClassName,
          miniNavStyle = _props2.miniNavStyle,
          miniNavClassName = _props2.miniNavClassName,
          miniDrawerId = _props2.miniDrawerId,
          miniNavItemsId = _props2.miniNavItemsId,
          navItems = _props2.navItems,
          children = _props2.children,
          drawerId = _props2.drawerId,
          drawerTitle = _props2.drawerTitle,
          drawerZDepth = _props2.drawerZDepth,
          drawerChildren = _props2.drawerChildren,
          drawerHeaderChildren = _props2.drawerHeaderChildren,
          drawerTransitionDuration = _props2.drawerTransitionDuration,
          toolbarId = _props2.toolbarId,
          toolbarTitle = _props2.toolbarTitle,
          toolbarTitleMenu = _props2.toolbarTitleMenu,
          toolbarTitleStyle = _props2.toolbarTitleStyle,
          toolbarTitleClassName = _props2.toolbarTitleClassName,
          toolbarActions = _props2.toolbarActions,
          toolbarProminent = _props2.toolbarProminent,
          toolbarProminentTitle = _props2.toolbarProminentTitle,
          toolbarThemeType = _props2.toolbarThemeType,
          toolbarSingleColor = _props2.toolbarSingleColor,
          toolbarChildren = _props2.toolbarChildren,
          toolbarZDepth = _props2.toolbarZDepth,
          mobileType = _props2.mobileDrawerType,
          tabletType = _props2.tabletDrawerType,
          desktopType = _props2.desktopDrawerType,
          transitionName = _props2.transitionName,
          transitionEnterTimeout = _props2.transitionEnterTimeout,
          transitionLeaveTimeout = _props2.transitionLeaveTimeout,
          extractMini = _props2.extractMini,
          miniDrawerHeader = _props2.miniDrawerHeader,
          miniDrawerChildren = _props2.miniDrawerChildren,
          footer = _props2.footer,
          includeDrawerHeader = _props2.includeDrawerHeader,
          contentId = _props2.contentId,
          contentProps = _props2.contentProps,
          constantDrawerType = _props2.constantDrawerType,
          temporaryIcon = _props2.temporaryIcon,
          temporaryIconChildren = _props2.temporaryIconChildren,
          temporaryIconClassName = _props2.temporaryIconClassName,
          menuIconChildren = _props2.menuIconChildren,
          menuIconClassName = _props2.menuIconClassName,
          propDrawerType = _props2.drawerType,
          propDrawerHeader = _props2.drawerHeader,
          propRenderNode = _props2.renderNode,
          jumpLabel = _props2.jumpLabel,
          persistentIcon = _props2.persistentIcon,
          onDrawerChange = _props2.onDrawerChange,
          closeIconChildren = _props2.closeIconChildren,
          closeIconClassName = _props2.closeIconClassName,
          persistentIconChildren = _props2.persistentIconChildren,
          persistentIconClassName = _props2.persistentIconClassName,
          props = _objectWithoutProperties(_props2, ['id', 'style', 'className', 'toolbarStyle', 'toolbarClassName', 'drawerStyle', 'drawerClassName', 'contentStyle', 'contentClassName', 'contentComponent', 'miniDrawerStyle', 'miniDrawerClassName', 'miniNavStyle', 'miniNavClassName', 'miniDrawerId', 'miniNavItemsId', 'navItems', 'children', 'drawerId', 'drawerTitle', 'drawerZDepth', 'drawerChildren', 'drawerHeaderChildren', 'drawerTransitionDuration', 'toolbarId', 'toolbarTitle', 'toolbarTitleMenu', 'toolbarTitleStyle', 'toolbarTitleClassName', 'toolbarActions', 'toolbarProminent', 'toolbarProminentTitle', 'toolbarThemeType', 'toolbarSingleColor', 'toolbarChildren', 'toolbarZDepth', 'mobileDrawerType', 'tabletDrawerType', 'desktopDrawerType', 'transitionName', 'transitionEnterTimeout', 'transitionLeaveTimeout', 'extractMini', 'miniDrawerHeader', 'miniDrawerChildren', 'footer', 'includeDrawerHeader', 'contentId', 'contentProps', 'constantDrawerType', 'temporaryIcon', 'temporaryIconChildren', 'temporaryIconClassName', 'menuIconChildren', 'menuIconClassName', 'drawerType', 'drawerHeader', 'renderNode', 'jumpLabel', 'persistentIcon', 'onDrawerChange', 'closeIconChildren', 'closeIconClassName', 'persistentIconChildren', 'persistentIconClassName']);

      var drawerHeader = this.props.drawerHeader;
      var _state = this.state,
          desktop = _state.desktop,
          tablet = _state.tablet,
          contentActive = _state.contentActive;


      var drawerType = (0, _getField2.default)(this.props, this.state, 'drawerType');
      var visible = (0, _getField2.default)(this.props, this.state, 'visible');
      var renderNode = (0, _getField2.default)(this.props, this.context, 'renderNode');
      var mini = (0, _isType.isMini)(drawerType);
      var temporary = (0, _isType.isTemporary)(drawerType);
      var persistent = (0, _isType.isPersistent)(drawerType);
      var clipped = drawerType === DrawerTypes.CLIPPED;
      var floating = drawerType === DrawerTypes.FLOATING;

      var offset = desktop || tablet ? !temporary && visible : visible;
      var toolbarRelative = (0, _classnames2.default)({
        'md-toolbar-relative': !toolbarProminent && !toolbarProminentTitle,
        'md-toolbar-relative--prominent': toolbarProminent || toolbarProminentTitle
      });

      var nav = void 0;
      if (temporary || persistent) {
        nav = _react2.default.createElement(_Button2.default, {
          key: 'nav',
          onClick: this._toggleVisibility,
          disabled: persistent && visible,
          icon: true,
          iconEl: (0, _getDeprecatedIcon2.default)(menuIconClassName || temporaryIconClassName, menuIconChildren || temporaryIconChildren, temporaryIcon)
        });
      }

      var closeButton = void 0;
      if (persistent) {
        closeButton = _react2.default.createElement(_CloseButton2.default, null);
      }

      if (!drawerHeader && includeDrawerHeader) {
        drawerHeader = _react2.default.createElement(
          _Toolbar2.default,
          {
            key: 'drawer-header',
            title: drawerTitle,
            actions: visible && nav ? closeButton : null,
            className: (0, _classnames2.default)('md-divider-border md-divider-border--bottom', _defineProperty({}, toolbarRelative, clipped || floating))
          },
          drawerHeaderChildren,
          _react2.default.createElement(_JumpToContentLink2.default, null)
        );
      }
      var miniDrawer = void 0;
      if (mini) {
        var miniList = void 0;
        if (extractMini) {
          miniList = _react2.default.createElement(
            _List2.default,
            {
              id: miniNavItemsId,
              key: 'mini-nav-items',
              style: miniNavStyle,
              className: (0, _classnames2.default)(miniNavClassName, toolbarRelative)
            },
            navItems.map(toMiniListItem)
          );
        }

        miniDrawer = _react2.default.createElement(
          _Drawer2.default,
          {
            id: miniDrawerId,
            key: 'mini-drawer',
            type: drawerType,
            renderNode: renderNode,
            'aria-hidden': visible,
            style: miniDrawerStyle,
            className: miniDrawerClassName
          },
          miniDrawerHeader,
          miniList,
          miniDrawerChildren
        );
      }

      var desktopOffset = !clipped && !floating && offset;

      return _react2.default.createElement(
        'div',
        { id: id, style: style, className: className },
        _react2.default.createElement(
          _Toolbar2.default,
          {
            id: toolbarId,
            colored: toolbarThemeType === 'colored',
            themed: toolbarThemeType === 'themed',
            singleColor: toolbarSingleColor,
            style: toolbarStyle,
            className: (0, _classnames2.default)({
              'md-toolbar--over-drawer': clipped || floating || mini && !visible
            }, toolbarClassName),
            title: toolbarTitle,
            titleMenu: toolbarTitleMenu,
            prominent: toolbarProminent,
            prominentTitle: toolbarProminentTitle,
            titleStyle: toolbarTitleStyle,
            titleClassName: (0, _classnames2.default)({
              'md-title--drawer-active': contentActive,
              'md-transition--deceleration': offset && visible,
              'md-transition--acceleration': offset && !visible,
              'md-title--permanent-offset': desktopOffset && (0, _isType.isPermanent)(drawerType),
              'md-title--persistent-offset': desktopOffset && persistent
            }, toolbarTitleClassName),
            nav: nav,
            actions: toolbarActions,
            fixed: true,
            zDepth: toolbarZDepth
          },
          toolbarChildren
        ),
        miniDrawer,
        _react2.default.createElement(
          _Drawer2.default,
          _extends({}, props, {
            id: drawerId,
            constantType: constantDrawerType,
            transitionDuration: drawerTransitionDuration,
            header: drawerHeader,
            style: drawerStyle,
            className: drawerClassName,
            navItems: navItems,
            renderNode: renderNode,
            mobileType: mobileType,
            tabletType: tabletType,
            desktopType: desktopType,
            type: getNonMiniType(drawerType),
            visible: visible,
            zDepth: drawerZDepth,
            onVisibilityChange: this._handleVisibility,
            onMediaTypeChange: this._handleTypeChange
          }),
          drawerChildren
        ),
        _react2.default.createElement(
          _CSSTransitionGroup2.default,
          _extends({}, contentProps, {
            id: contentId,
            component: Content,
            transitionName: transitionName,
            transitionEnter: !!transitionEnterTimeout,
            transitionEnterTimeout: transitionEnterTimeout,
            transitionLeave: !!transitionLeaveTimeout,
            transitionLeaveTimeout: transitionLeaveTimeout,
            tabIndex: -1,
            style: contentStyle,
            className: (0, _classnames2.default)('md-navigation-drawer-content', {
              'md-navigation-drawer-content--active': contentActive,
              'md-navigation-drawer-content--inactive': !visible,
              'md-navigation-drawer-content--prominent-offset': toolbarProminent || toolbarProminentTitle,
              'md-transition--deceleration': visible,
              'md-transition--acceleration': !visible,
              'md-drawer-relative': offset,
              'md-drawer-relative--mini': mini && (!visible || temporary)
            }, toolbarRelative, contentClassName)
          }),
          children
        ),
        footer
      );
    }
  }]);

  return NavigationDrawer;
}(_react.PureComponent);

NavigationDrawer.DrawerType = { // deprecated
  /* eslint-disable no-console */
  _warned: false,
  _msg: 'Invalid use of `NavigationDrawer.DrawerType.{{TYPE}}`. The `NavigationDrawer.DrawerType` ' + 'has been deprecated and will be removed in the next major release. Please use the ' + '`NavigationDrawer.DrawerTypes.{{TYPE}}` instead.',

  get FULL_HEIGHT() {
    if (!this._warned) {
      console.error(this._msg.replace(/{{TYPE}}/g, 'FULL_HEIGHT'));
    }
    this._warned = true;

    return DrawerTypes.FULL_HEIGHT;
  },

  get CLIPPED() {
    if (!this._warned) {
      console.error(this._msg.replace(/{{TYPE}}/g, 'CLIPPED'));
    }
    this._warned = true;

    return DrawerTypes.CLIPPED;
  },

  get FLOATING() {
    if (!this._warned) {
      console.error(this._msg.replace(/{{TYPE}}/g, 'FLOATING'));
    }
    this._warned = true;

    return DrawerTypes.FLOATING;
  },

  get PERSISTENT() {
    if (!this._warned) {
      console.error(this._msg.replace(/{{TYPE}}/g, 'PERSISTENT'));
    }
    this._warned = true;

    return DrawerTypes.PERSISTENT;
  },

  get PERSISTENT_MINI() {
    if (!this._warned) {
      console.error(this._msg.replace(/{{TYPE}}/g, 'PERSISTENT_MINI'));
    }
    this._warned = true;

    return DrawerTypes.PERSISTENT_MINI;
  },

  get TEMPORARY() {
    if (!this._warned) {
      console.error(this._msg.replace(/{{TYPE}}/g, 'TEMPORARY'));
    }
    this._warned = true;

    return DrawerTypes.TEMPORARY;
  },

  get TEMPORARY_MINI() {
    if (!this._warned) {
      console.error(this._msg.replace(/{{TYPE}}/g, 'TEMPORARY_MINI'));
    }
    this._warned = true;

    return DrawerTypes.TEMPORARY_MINI;
  }
};
NavigationDrawer.DrawerTypes = DrawerTypes;
NavigationDrawer.propTypes = {
  /**
   * An optional id to provide to the entire div wrapper.
   */
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional id to provide to the drawer. This is generally a good idea to provide if
   * there are any `navItems` defined.
   *
   * @see {@link #navItemsId}
   * @see {@link #miniDrawerId}
   */
  drawerId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional id to provide to the navItems list. If this is omitted and the `drawerId` prop is
   * defined, it will be defaulted to `${drawerId}-nav-items`.
   *
   * @see {@link #drawerId}
   * @see {@link Drawer#navItemsId}
   */
  navItemsId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional id to apply to mini drawer that gets created when the `drawerType` is set to
   * one of the mini types.
   *
   * @see {@link #drawerId}
   * @see {@link #miniNavItemsId}
   */
  miniDrawerId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional id to apply to mini drawer's navigation list that gets created when the `drawerType`
   * is set to one of the mini types.
   *
   * @see {@link #navItemsId}
   * @see {@link #miniDrawerId}
   */
  miniNavItemsId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional id to provide to the main toolbar.
   */
  toolbarId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An id to give the main content. A hidden link is created in the main drawer's header that links to the main
   * content. This is used for keyboard only users to jump the navigation and jump straight to the content.
   *
   * If you provide your own `drawerHeader`, it is suggested to include the link yourself.
   */
  contentId: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

  /**
   * An optional style to apply to the surrounding container.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the surrounding container.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the main toolbar.
   */
  toolbarStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the toolbar.
   */
  toolbarClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the main toolbar's title.
   */
  toolbarTitleStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the main toolbar's title.
   */
  toolbarTitleClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the drawer.
   */
  drawerStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the drawer.
   */
  drawerClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the `List` surrounding the `navItems`.
   */
  navStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the `List` surrounding the `navItems`.
   */
  navClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the mini drawer that gets created when the `drawerType` is set
   * to one of the mini types.
   *
   * @see {@link #miniDrawerClassName}
   * @see {@link #miniNavStyle}
   * @see {@link #miniNavClassName}
   */
  miniDrawerStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the mini drawer that gets created when the `drawerType` is set
   * to one of the mini types.
   *
   * @see {@link #miniDrawerStyle}
   * @see {@link #miniNavStyle}
   * @see {@link #miniNavClassName}
   */
  miniDrawerClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the mini drawer's navigation list when the `drawerType` is set
   * to one of the mini types.
   *
   * @see {@link #miniDrawerStyle}
   * @see {@link #miniDrawerClassName}
   * @see {@link #miniNavClassName}
   */
  miniNavStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the mini drawer's navigation list when the `drawerType` is set
   * to one of the mini types.
   *
   * @see {@link #miniDrawerStyle}
   * @see {@link #miniDrawerClassName}
   * @see {@link #miniNavStyle}
   */
  miniNavClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the content. This is the container surrounding whatever
   * `children` are passed in.
   */
  contentStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the content. This is the container surrounding whatever
   * `children` are passed in.
   */
  contentClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the overlay.
   */
  overlayStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the overlay.
   */
  overlayClassName: _propTypes2.default.string,

  /**
   * The children to display in the main content.
   */
  children: _propTypes2.default.node,

  /**
   * Boolean if the `drawerHeader` component should be built if the `drawerHeader` prop is not
   * passed in.
   */
  includeDrawerHeader: _propTypes2.default.bool,

  /**
   * An optional header to display in the drawer. This will normally be the `Toolbar` component
   * or any other type of header. You can either use this prop with the `CloseButton` component
   * when displaying a persistent drawer, or use the `drawerTitle` and `drawerHeaderChildren` prop
   * to build a toolbar.
   */
  drawerHeader: _propTypes2.default.node,

  /**
   * An optional title to use for the drawer's header toolbar. If the `drawerHeader` prop is defined,
   * this is invalid.
   */
  drawerTitle: (0, _invalidIf2.default)(_propTypes2.default.node, 'drawerHeader'),

  /**
   * An optional zDepth to apply to the drawer. If this is omitted, the value will be set as follows:
   * - floating || inline = 1
   * - temporary = 5
   * - all others = 1
   *
   * @see {@link Papers/Paper#zDepth}
   */
  drawerZDepth: _propTypes2.default.number,

  /**
   * Any additional children to display after the `drawerHeader` and `navItems` list in the drawer.
   */
  drawerChildren: _propTypes2.default.node,

  /**
   * Any additional children to display in the drawer's header `Toolbar`. If the `drawerHeader` prop is defined,
   * this is invalid.
   */
  drawerHeaderChildren: (0, _invalidIf2.default)(_propTypes2.default.node, 'drawerHeader'),

  /**
   * The position for the drawer to be displayed.
   */
  position: _propTypes2.default.oneOf(['left', 'right']).isRequired,

  /**
   * An optional list of elements or props to use to build a navigational list in the drawer.
   * When the item is an object of props, it will build a `ListItem` component unless a key of
   * `divider` or `subheader` is set to true. It will then create the Divider or Subheader component
   * with any other remaining keys.
   */
  navItems: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.shape({
    divider: _propTypes2.default.bool,
    subheader: _propTypes2.default.bool,
    primaryText: _propTypes2.default.node
  })])),

  /**
   * The drawer type to use for mobile devices.
   */
  mobileDrawerType: _propTypes2.default.oneOf([DrawerTypes.TEMPORARY, DrawerTypes.TEMPORARY_MINI]).isRequired,

  /**
   * The drawer type to use for tablets.
   */
  tabletDrawerType: _propTypes2.default.oneOf([DrawerTypes.FULL_HEIGHT, DrawerTypes.CLIPPED, DrawerTypes.FLOATING, DrawerTypes.PERSISTENT, DrawerTypes.PERSISTENT_MINI, DrawerTypes.TEMPORARY, DrawerTypes.TEMPORARY_MINI]).isRequired,

  /**
   * The drawer type to use for desktop displays.
   */
  desktopDrawerType: _propTypes2.default.oneOf([DrawerTypes.FULL_HEIGHT, DrawerTypes.CLIPPED, DrawerTypes.FLOATING, DrawerTypes.PERSISTENT, DrawerTypes.PERSISTENT_MINI, DrawerTypes.TEMPORARY, DrawerTypes.TEMPORARY_MINI]).isRequired,

  /**
   * An optional drawer type to enforce on all screen sizes. If the drawer type is not
   * `temporary`, you are required to define the `onMediaTypeChange` prop to handle switching
   * to temporary when the media matches a mobile device.
   * ```
   */
  drawerType: _propTypes2.default.oneOf([DrawerTypes.FULL_HEIGHT, DrawerTypes.CLIPPED, DrawerTypes.FLOATING, DrawerTypes.PERSISTENT, DrawerTypes.PERSISTENT_MINI, DrawerTypes.TEMPORARY, DrawerTypes.TEMPORARY_MINI]),

  /**
   * The default media match for the drawer. This will be what is displayed on first render.
   * The component will adjust itself to the current media after it has mounted, but this
   * is mostly used for server side rendering.
   */
  defaultMedia: _propTypes2.default.oneOf(['mobile', 'tablet', 'desktop']),

  /**
   * The min width to use for a mobile media query. This prop should match the `md-mobile-min-width`
   * variable.
   *
   * The media query for a mobile device will be:
   *
   * ```js
   * window.matchMedia(
   *   `screen and (min-width: ${mobileMinWidth}px) and (max-width: ${tabletMinWidth - 1}px`
   * ).matches;
   * ```
   */
  mobileMinWidth: _propTypes2.default.number.isRequired,

  /**
   * The min width to use for a tablet media query. This prop should match the `md-tablet-min-width`
   * variable.
   *
   * The media query for a tablet device will be:
   *
   * ```js
   * window.matchMedia(
   *   `screen and (min-width: ${tabletMinWidth}px) and (max-width: ${desktopWidth - 1}px`
   * ).matches;
   * ```
   */
  tabletMinWidth: _propTypes2.default.number.isRequired,

  /**
   * The min width to use for a desktop media query. This prop should match the `md-desktop-min-width`
   * variable.
   *
   * The media query for a tablet device will be:
   *
   * ```js
   * window.matchMedia(`screen and (min-width: ${tabletMinWidth}px)`).matches;
   * ```
   */
  desktopMinWidth: _propTypes2.default.number.isRequired,

  /**
   * An optional function to call when the type of the drawer changes because of the
   * new media queries. The callback will include the newly selected drawer type
   * and an object containing the media matches of `mobile`, `tablet`, and `desktop`.
   *
   * ```js
   * this.props.onMediaTypeChange(NavigationDrawer.DrawerTypes.TEMPORARY, {
   *   mobile: true,
   *   tablet: false,
   *   desktop: false,
   * });
   * ```
   */
  onMediaTypeChange: _propTypes2.default.func,

  /**
   * Boolean if the temporary or persistent drawers are visible by default.
   */
  defaultVisible: _propTypes2.default.bool,

  /**
   * Boolean if the temporary or persistent drawers are visible. If this is defined,
   * it will make the component controlled and require the `onVisibilityChange` prop
   * to be defined.
   */
  visible: (0, _controlled2.default)(_propTypes2.default.bool, 'onVisibilityChange', 'defaultVisible'),

  /**
   * An optional function to call when the visibility of the drawer changes. The callback
   * will include the new visibility.
   *
   * ```js
   * onVisibilityChange(false);
   * ```
   */
  onVisibilityChange: _propTypes2.default.func,

  /**
   * A boolean if the mini drawer's list should be generated from the `navItems` prop. When building
   * the list, it will extract the `leftIcon` or `leftAvatar` from the `navItem` and then create a
   * mini `ListItem` containing only that icon or image. Any other event listeners will also be applied.
   *
   *
   * @see {@link #miniDrawerHeader}
   * @see {@link #miniDrawerChildren}
   */
  extractMini: _propTypes2.default.bool,

  /**
   * An optional header to display in the mini drawer. This will be displayed above the optional
   * mini nav list that get generated if the `extractMini` prop is `true` and the `miniDrawerChildren`.
   *
   * @see {@link #extractMini}
   */
  miniDrawerHeader: _propTypes2.default.node,

  /**
   * Any additional children to display in the mini drawer. This will be displayed after the `miniDrawerHeader`
   * and the optional mini nav list that gets generated if the `extractMini` prop is `true`.
   *
   * @see {@link #extractMini}
   */
  miniDrawerChildren: _propTypes2.default.node,

  /**
   * Boolean if the drawer should automatically close after a nav item has been clicked for `temporary` drawers.
   */
  autoclose: _propTypes2.default.bool,

  /**
   * An optional title to display in the main toolbar. Either the `toolbarTitle` or the `toolbarTitleMenu`
   * may be defined, not both.
   */
  toolbarTitle: (0, _invalidIf2.default)(_propTypes2.default.node, 'toolbarTitleMenu'),

  /**
   * An optional select field menu to display in the main toolbar. Either the `toolbarTitle` or the `toolbarTitleMenu`
   * may be defined, not both.
   */
  toolbarTitleMenu: _propTypes2.default.element,

  /**
   * The theme style for the main toolbar.
   *
   * @see {@link Toolbars/Toolbar}
   */
  toolbarThemeType: _propTypes2.default.oneOf(['default', 'colored', 'themed']).isRequired,

  /**
   * Boolean if the toolbar's nav, actions, and title should share the same color.
   */
  toolbarSingleColor: _propTypes2.default.bool,

  /**
   * A boolean if the toolbar should be prominent.
   */
  toolbarProminent: _propTypes2.default.bool,

  /**
   * A boolean if the toolbar's title should be prominent.
   */
  toolbarProminentTitle: _propTypes2.default.bool,

  /**
   * A list of elements or a single element to display to the right of the
   * toolbar's nav, title, and children.
   *
   * @see {@link Toolbars/Toolbar#actions}
   */
  toolbarActions: _Toolbar2.default.propTypes.actions,

  /**
   * Any children to display in the toolbar. This will be displayed between the optional title and
   * actions.
   */
  toolbarChildren: _Toolbar2.default.propTypes.children,

  /**
   * An optional zDepth to apply to the toolbar.
   *
   * @see {@link Toolbars/Toolbar#zDepth}
   */
  toolbarZDepth: _propTypes2.default.number,

  /**
   * The component to render the content in.
   */
  contentComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

  /**
   * An optional footer display after the main content.
   */
  footer: _propTypes2.default.node,

  /**
   * The icon to use to render the button that will toggle the visibility of the
   * navigation drawer for `temporary` and `persistent` drawers. This is normally a
   * hamburger menu.
   */
  temporaryIcon: _propTypes2.default.element,

  /**
   * The icon to use to render the button that appears on a persistent drawer's open
   * header. This is used to create the `CloseButton` for drawers. When a persistent
   * drawer is closed, the `temporaryIcon` will be used to create a button to open the drawer.
   *
   * If the `drawerHeader` prop is defined, you will have to either include the `CloseButton`
   * in your header manually, or create your own controlled button to close the drawer.
   */
  persistentIcon: _propTypes2.default.element,

  /**
   * The transition name to use when the page's content changes. If you want to disable
   * transitions, set both the `transitionEnterTimeout` and `transitionLeaveTimeout` props
   * to a false-ish value. (`null`, `undefined`, or `0`).
   */
  transitionName: _propTypes2.default.string.isRequired,

  /**
   * The transition enter timeout when the page's content changes. If you want to disable
   * the enter transition, set this to a false-ish value (`null`, `undefined`, or `0`).
   */
  transitionEnterTimeout: _propTypes2.default.number,

  /**
   * The transition leave timeout when the page's content changes. If you want to disable
   * the leave transition, set this to a false-ish value (`null`, `undefined`, or `0`).
   */
  transitionLeaveTimeout: _propTypes2.default.number,

  /**
   * The transition duration for the drawer when sliding in and out of view.
   */
  drawerTransitionDuration: _propTypes2.default.number.isRequired,

  /**
   * Any additional props to provide to the main content. This will be applied before any of the generated props,
   * so this should not include `style`, `className`, or `component`.
   */
  contentProps: _propTypes2.default.object,

  /**
   * The label to use for a keyboard accessibility link that jumps all the navigation and allows a user to focus
   * the main content. This is created in the drawer's header.
   */
  jumpLabel: _propTypes2.default.node.isRequired,

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
   * Boolean if the `drawerType` should remain constant across all media. This is really only valid
   * if the `drawerType` is one of the temporary types.
   */
  constantDrawerType: _propTypes2.default.bool,

  menuIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use `temporaryIcon` instead'),
  menuIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `temporaryIcon` instead'),
  closeIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use `persistentIcon` instead'),
  closeIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `persistentIcon` instead'),
  temporaryIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `temporaryIcon` instead'),
  temporaryIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `temporaryIcon` instead'),
  persistentIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `persistentIcon` instead'),
  persistentIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `persistentIcon` prop instead'),
  onDrawerChange: (0, _deprecated2.default)(_propTypes2.default.func, 'Use `onVisibilityChange` or `onMediaTypeChange` instead'),
  onVisibilityToggle: (0, _deprecated2.default)(_propTypes2.default.func, 'Use `onVisibilityChange` instead'),
  contentTransitionName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `transitionName` instead'),
  contentTransitionEnterTimeout: (0, _deprecated2.default)(_propTypes2.default.number, 'Use `transtionEnterTimeout` instead'),
  contentTransitionLeaveTimeout: (0, _deprecated2.default)(_propTypes2.default.number, 'Use `transtionLeaveTimeout` instead'),
  initialDrawerType: (0, _deprecated2.default)(_propTypes2.default.oneOf(['mobile', 'tablet', 'desktop']), 'Use `defaultMedia` instead')
};
NavigationDrawer.contextTypes = {
  renderNode: _propTypes2.default.object
};
NavigationDrawer.childContextTypes = {
  closeIcon: _propTypes2.default.element,
  onCloseClick: _propTypes2.default.func,
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  label: _propTypes2.default.node.isRequired,
  renderNode: _propTypes2.default.object
};
NavigationDrawer.defaultProps = {
  autoclose: _Drawer2.default.defaultProps.autoclose,
  contentId: 'main-content',
  // Defaults to false since it keeps the state of the drawerType in sync and makes the Drawer
  // controlled. On initial mount without any defaultMedia updates, it would always be considered
  // temporary
  constantDrawerType: false,
  jumpLabel: 'Jump to content',
  extractMini: true,
  position: _Drawer2.default.defaultProps.position,
  defaultMedia: _Drawer2.default.defaultProps.defaultMedia,
  mobileDrawerType: _Drawer2.default.defaultProps.mobileType,
  tabletDrawerType: _Drawer2.default.defaultProps.tabletType,
  desktopDrawerType: _Drawer2.default.defaultProps.desktopType,
  mobileMinWidth: _Drawer2.default.defaultProps.mobileMinWidth,
  tabletMinWidth: _Drawer2.default.defaultProps.tabletMinWidth,
  desktopMinWidth: _Drawer2.default.defaultProps.desktopMinWidth,
  includeDrawerHeader: true,
  contentComponent: 'main',
  temporaryIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'menu'
  ),
  toolbarThemeType: 'colored',
  persistentIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'arrow_back'
  ),
  transitionName: 'md-cross-fade',
  transitionEnterTimeout: 300,
  drawerTransitionDuration: _Drawer2.default.defaultProps.transitionDuration
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._animate = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.props;
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this2.state;

    if ((0, _isType.isTemporary)((0, _getField2.default)(props, state, 'drawerType'))) {
      return;
    }

    if (_this2._timeout) {
      clearTimeout(_this2._timeout);
    }

    _this2._timeout = setTimeout(function () {
      _this2.setState({ contentActive: false });
    }, props.drawerTransitionDuration);

    _this2.setState({ contentActive: true });
  };

  this._toggleVisibility = function (e) {
    var _props3 = _this2.props,
        onVisibilityToggle = _props3.onVisibilityToggle,
        onVisibilityChange = _props3.onVisibilityChange,
        onDrawerChange = _props3.onDrawerChange;

    var visible = !(0, _getField2.default)(_this2.props, _this2.state, 'visible');
    var callback = onVisibilityChange || onVisibilityToggle || onDrawerChange;
    if (callback) {
      callback(visible, e);
    }

    if (typeof _this2.props.visible === 'undefined') {
      _this2.setState({ visible: visible });
      _this2._animate(_this2.props);
    }
  };

  this._handleVisibility = function (visible) {
    var _props4 = _this2.props,
        onVisibilityToggle = _props4.onVisibilityToggle,
        onVisibilityChange = _props4.onVisibilityChange,
        onDrawerChange = _props4.onDrawerChange;

    var callback = onVisibilityChange || onVisibilityToggle || onDrawerChange;
    if (callback) {
      callback(visible);
    }

    if (typeof _this2.props.visible === 'undefined') {
      _this2.setState({ visible: visible });
      _this2._animate(_this2.props);
    }
  };

  this._handleTypeChange = function (drawerType, mediaState) {
    var onMediaTypeChange = _this2.props.onMediaTypeChange;

    var state = mediaState;
    if (onMediaTypeChange) {
      onMediaTypeChange(drawerType, mediaState);
    }

    if (typeof _this2.props.drawerType === 'undefined') {
      state = _extends({}, mediaState, { drawerType: drawerType });
    }

    _this2.setState(state);
  };
};

exports.default = NavigationDrawer;
//# sourceMappingURL=NavigationDrawer.js.map