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

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _TabIndicator = require('./TabIndicator');

var _TabIndicator2 = _interopRequireDefault(_TabIndicator);

var _IconSeparator = require('../Helpers/IconSeparator');

var _IconSeparator2 = _interopRequireDefault(_IconSeparator);

var _ResizeObserver = require('../Helpers/ResizeObserver');

var _ResizeObserver2 = _interopRequireDefault(_ResizeObserver);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _getDeprecatedIcon = require('../FontIcons/getDeprecatedIcon');

var _getDeprecatedIcon2 = _interopRequireDefault(_getDeprecatedIcon);

var _MenuTab = require('./MenuTab');

var _MenuTab2 = _interopRequireDefault(_MenuTab);

var _TabOverflowButton = require('./TabOverflowButton');

var _TabOverflowButton2 = _interopRequireDefault(_TabOverflowButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MOBILE_PADDING = 72;
var DESKTOP_PADDING = 80;
var MOBILE_TAB_MIN_WIDTH = 72;
var DESKTOP_TAB_MIN_WIDTH = 160;

/**
 * The `Tabs` component is used to manage the state of which tab is currently active.
 */

var Tabs = function (_PureComponent) {
  _inherits(Tabs, _PureComponent);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    _this._setContainer = function (container) {
      _this._container = container;
      _this._positionElements(_this._container !== null);
    };

    _this._positionElements = function (initialRender) {
      initialRender = typeof initialRender === 'boolean' && initialRender;
      if (!_this._container) {
        return;
      }

      var _this$props = _this.props,
          centered = _this$props.centered,
          overflowMenu = _this$props.overflowMenu;
      var mobile = _this.props.mobile;


      var paddingLeft = void 0;
      if (!centered && _this._shouldAlign(_this.props)) {
        paddingLeft = _this._calcPaddingLeft(_this._container, mobile);
      }

      var overflowAtIndex = void 0;
      if (!mobile) {
        overflowAtIndex = _this._calcOverflowIndex(_this._container, paddingLeft, overflowMenu);
      }

      var indicatorPosition = _this._calcIndicatorPosition(_this._container, initialRender ? paddingLeft : 0);

      _this.setState(_extends({ mobile: mobile, paddingLeft: paddingLeft, overflowAtIndex: overflowAtIndex }, indicatorPosition), _this._scrollActiveIntoView);
    };

    _this._scrollActiveIntoView = function () {
      if (!_this._container || !_this.state.mobile) {
        return;
      }

      var active = _this._container.querySelector('.md-tab--active');
      if (!active) {
        return;
      }

      var allTabs = Array.prototype.slice.call(_this._container.querySelectorAll('.md-tab'));
      if (allTabs[0] === active) {
        _this._container.scrollLeft = 0;
        return;
      }

      var _this$_container = _this._container,
          containerWidth = _this$_container.offsetWidth,
          scrollLeft = _this$_container.scrollLeft;
      var activeWidth = active.offsetWidth,
          activeOffset = active.offsetLeft;

      var inFullViewLeft = activeOffset - scrollLeft >= 0;
      var inFullViewRight = activeOffset + activeWidth - (containerWidth + scrollLeft) <= 0;
      if (inFullViewLeft && inFullViewRight) {
        return;
      }

      var offset = 0;
      allTabs.some(function (tab, i) {
        if (i < _this.props.activeTabIndex) {
          offset += tab.offsetWidth;
        }

        return i < _this.state.activeTabIndex;
      });

      _this._container.scrollLeft = offset;
    };

    _this._handleTabChange = function (index, tabId, tabControlsId, tabChildren, event) {
      if (_this.props.onTabChange) {
        _this.props.onTabChange(index, tabId, tabControlsId, tabChildren, event);
      }

      if (typeof _this.props.activeTabIndex === 'undefined') {
        _this.setState(_extends({
          activeTabIndex: index
        }, _this._calcIndicatorPosition(_this._container, 0, index, _this.state.overflowAtIndex)));
      }
    };

    _this._mapToOverflowTabProps = function (tab, i) {
      var index = i + _this.state.overflowAtIndex;
      var active = (0, _getField2.default)(_this.props, _this.state, 'activeTabIndex') === index;
      var tabEl = _react.Children.only(tab);
      var handleTabChange = _this._handleTabChange;

      return {
        active: active,
        primaryText: tabEl.props.label,
        onClick: function handleClick(event) {
          var _tabEl$props = tabEl.props,
              onClick = _tabEl$props.onClick,
              id = _tabEl$props.id,
              controlsId = _tabEl$props.controlsId,
              children = _tabEl$props.children;

          if (onClick) {
            onClick(index, event);
          }

          handleTabChange(index, id, controlsId, children, event);
        }
      };
    };

    _this._nextIndexes = function (increment) {
      var _this$state = _this.state,
          overflowIndex = _this$state.overflowIndex,
          overflowAtIndex = _this$state.overflowAtIndex;

      var visibleAmt = (overflowAtIndex - overflowIndex) * (increment ? 1 : -1);

      _this.setState({
        overflowIndex: overflowIndex + visibleAmt,
        overflowAtIndex: overflowAtIndex + visibleAmt
      });
    };

    _this._showNextTabs = function () {
      _this._nextIndexes(true);
    };

    _this._showPreviousTabs = function () {
      _this._nextIndexes(false);
    };

    var defaultTabIndex = typeof props.activeTabIndex === 'undefined' ? props.defaultTabIndex : props.activeTabIndex;
    var indicatorWidth = props.mobile ? MOBILE_TAB_MIN_WIDTH : DESKTOP_TAB_MIN_WIDTH;
    _this.state = {
      indicatorWidth: indicatorWidth,
      indicatorOffset: indicatorWidth * defaultTabIndex,
      indicatorVisible: true,
      overflowIndex: 0
    };

    if (typeof props.activeTabIndex === 'undefined') {
      _this.state.activeTabIndex = defaultTabIndex;
    }
    return _this;
  }

  _createClass(Tabs, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.activeTabIndex !== nextProps.activeTabIndex) {
        this.setState(_extends({}, this._calcIndicatorPosition(this._container, 0, nextProps.activeTabIndex, this.state.overflowAtIndex)), this._scrollActiveIntoView);
      } else if (!this._shouldAlign(nextProps) && this._shouldAlign(this.props)) {
        this.setState({ paddingLeft: null });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this._shouldAlign(this.props) && this.state.overflowAtIndex !== prevState.overflowAtIndex) {
        var paddingLeft = this._calcPaddingLeft(this._container, this.state.mobile);
        // Have to wait for the overflow menus to appear, then wop
        /* eslint-disable react/no-did-update-set-state */
        this.setState({ paddingLeft: paddingLeft });
      } else {
        var labels = _react.Children.map(_react.Children.toArray(this.props.children), function (_ref) {
          var label = _ref.props.label;
          return label;
        });
        var prevLabels = _react.Children.map(_react.Children.toArray(prevProps.children), function (_ref2) {
          var label = _ref2.props.label;
          return label;
        });
        if (labels.length !== prevLabels.length || labels.filter(function (_, i) {
          return labels[i] !== prevLabels[i];
        }).length) {
          this.setState(_extends({}, this._calcIndicatorPosition(this._container, 0, this.props.activeTabIndex, this.state.overflowAtIndex)), this._scrollActiveIntoView);
        }
      }
    }
  }, {
    key: '_shouldAlign',
    value: function _shouldAlign(props) {
      return typeof props.alignToKeyline === 'boolean' ? props.alignToKeyline : _react.Children.toArray(props.children).filter(function (child) {
        return !!child;
      }).length > 3;
    }
  }, {
    key: '_calcPaddingLeft',
    value: function _calcPaddingLeft(container, mobile) {
      var mediaPadding = mobile ? MOBILE_PADDING : DESKTOP_PADDING;
      var tab = container.querySelector('.md-tab');

      var _tab$querySelector = tab.querySelector('.md-tab-label'),
          labelOffset = _tab$querySelector.offsetLeft;

      return mediaPadding - labelOffset;
    }
  }, {
    key: '_calcOverflowIndex',
    value: function _calcOverflowIndex(container) {
      var paddingLeft = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var menu = arguments[2];

      var containerWidth = container.offsetWidth;
      var overflowIndex = 0;
      if (containerWidth < container.scrollWidth) {
        var tabs = Array.prototype.slice.call(container.querySelectorAll('.md-tab'));
        var totalWidth = 0;
        tabs.some(function (tab, i) {
          overflowIndex = i;
          totalWidth += tab.offsetWidth;

          return totalWidth > containerWidth;
        });
      }

      return Math.max(0, overflowIndex - (menu ? 1 : 0));
    }
  }, {
    key: '_calcIndicatorPosition',
    value: function _calcIndicatorPosition(container) {
      var paddingLeft = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var activeTabIndex = arguments[2];
      var overflowAtIndex = arguments[3];

      var activeItem = void 0;
      if (typeof activeTabIndex === 'number') {
        if (overflowAtIndex > 0 && activeTabIndex >= overflowAtIndex) {
          activeItem = container.querySelector('.md-menu--tab');
        } else {
          activeItem = container.querySelectorAll('.md-tab')[activeTabIndex];
        }
      } else {
        activeItem = container.querySelector('.md-tab--active');
      }

      if (!activeItem) {
        return { indicatorVisible: false };
      }

      var _activeItem = activeItem,
          indicatorWidth = _activeItem.offsetWidth,
          indicatorOffset = _activeItem.offsetLeft;

      return {
        indicatorWidth: indicatorWidth,
        indicatorOffset: indicatorOffset + paddingLeft,
        indicatorVisible: !overflowAtIndex || overflowAtIndex > activeTabIndex
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          indicatorOffset = _state.indicatorOffset,
          indicatorWidth = _state.indicatorWidth,
          indicatorVisible = _state.indicatorVisible,
          overflowIndex = _state.overflowIndex,
          overflowAtIndex = _state.overflowAtIndex,
          paddingLeft = _state.paddingLeft;

      var _props = this.props,
          Component = _props.component,
          style = _props.style,
          className = _props.className,
          activeTabClassName = _props.activeTabClassName,
          inactiveTabClassName = _props.inactiveTabClassName,
          colored = _props.colored,
          centered = _props.centered,
          tabId = _props.tabId,
          overflowMenu = _props.overflowMenu,
          overflowMenuLabel = _props.overflowMenuLabel,
          nextIcon = _props.nextIcon,
          previousIcon = _props.previousIcon,
          overflowMenuIcon = _props.overflowMenuIcon,
          overflowMenuIconChildren = _props.overflowMenuIconChildren,
          overflowMenuIconClassName = _props.overflowMenuIconClassName,
          nextIconChildren = _props.nextIconChildren,
          nextIconClassName = _props.nextIconClassName,
          previousIconChildren = _props.previousIconChildren,
          previousIconClassName = _props.previousIconClassName,
          propActiveIndex = _props.activeTabIndex,
          defaultTabIndex = _props.defaultTabIndex,
          onTabChange = _props.onTabChange,
          alignToKeyline = _props.alignToKeyline,
          mobile = _props.mobile,
          defaultMedia = _props.defaultMedia,
          desktopMinWidth = _props.desktopMinWidth,
          props = _objectWithoutProperties(_props, ['component', 'style', 'className', 'activeTabClassName', 'inactiveTabClassName', 'colored', 'centered', 'tabId', 'overflowMenu', 'overflowMenuLabel', 'nextIcon', 'previousIcon', 'overflowMenuIcon', 'overflowMenuIconChildren', 'overflowMenuIconClassName', 'nextIconChildren', 'nextIconClassName', 'previousIconChildren', 'previousIconClassName', 'activeTabIndex', 'defaultTabIndex', 'onTabChange', 'alignToKeyline', 'mobile', 'defaultMedia', 'desktopMinWidth']);

      var activeTabIndex = (0, _getField2.default)(this.props, this.state, 'activeTabIndex');

      var icon = false;
      var children = _react.Children.map(_react.Children.toArray(this.props.children), function (tab, index) {
        var handleOnClick = function handleOnClick(tabIndex, id, tabControlsId, tabChildren, event) {
          if (tab.props.onClick) {
            tab.props.onClick(tabId, id, tabControlsId, tabChildren, event);
          }

          _this2._handleTabChange(tabIndex, id, tabControlsId, tabChildren, event);
        };

        if (tab.props.icon) {
          icon = true;
        }

        return (0, _react.cloneElement)(tab, {
          index: index,
          activeClassName: activeTabClassName,
          inactiveClassName: inactiveTabClassName,
          id: tab.props.id || tabId + '-' + index,
          controlsId: tab.props.controlsId || tabId + '-panel-' + index,
          active: index === activeTabIndex,
          onClick: handleOnClick
        });
      });

      var overflow = void 0;
      var nextControl = void 0;
      var previousControl = void 0;
      if (overflowAtIndex) {
        var length = children.length;
        if (overflowMenu) {
          overflow = _react2.default.createElement(_MenuTab2.default, {
            id: tabId + '-overflow-menu',
            activeTabIndex: activeTabIndex,
            overflowAtIndex: overflowAtIndex,
            label: _react2.default.createElement(
              _IconSeparator2.default,
              { label: overflowMenuLabel },
              (0, _getDeprecatedIcon2.default)(overflowMenuIconClassName, overflowMenuIconChildren, overflowMenuIcon)
            ),
            tabs: children.slice(overflowAtIndex, children.length).map(this._mapToOverflowTabProps)
          });
        }

        children = children.slice(overflowIndex, overflowAtIndex);

        if (!overflowMenu && overflowIndex > 0) {
          previousControl = _react2.default.createElement(_TabOverflowButton2.default, {
            left: true,
            icon: icon,
            iconEl: (0, _getDeprecatedIcon2.default)(previousIconClassName, previousIconChildren, previousIcon),
            onClick: this._showPreviousTabs
          });
        }

        if (!overflowMenu && length > 3 && overflowAtIndex + overflowIndex <= length) {
          nextControl = _react2.default.createElement(_TabOverflowButton2.default, {
            icon: icon,
            onClick: this._showNextTabs,
            iconEl: (0, _getDeprecatedIcon2.default)(nextIconClassName, nextIconChildren, nextIcon)
          });
        }
      }

      return _react2.default.createElement(
        Component,
        _extends({}, props, {
          style: _extends({}, style, { paddingLeft: paddingLeft }),
          className: (0, _classnames2.default)('md-tabs', {
            'md-tabs--pagination': overflowAtIndex && !overflowMenu,
            'md-tabs--centered': centered,
            'md-background--primary': colored
          }, className),
          role: 'tablist'
        }),
        _react2.default.createElement(_ResizeObserver2.default, { watchWidth: true, watchHeight: true, onResize: this._positionElements, elRef: this._setContainer }),
        previousControl,
        children,
        nextControl,
        overflow,
        _react2.default.createElement(_TabIndicator2.default, { offset: indicatorOffset, width: indicatorWidth, visible: indicatorVisible })
      );
    }
  }]);

  return Tabs;
}(_react.PureComponent);

Tabs.propTypes = {
  /**
   * A base id to use for each `Tab`. When the child tabs are created, they are cloned
   * with some additional accessibility props. Each tab will get a prop with this and the
   * current index of the tab.
   */
  tabId: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply.
   */
  className: _propTypes2.default.string,

  /**
   * The className to use when a tab is currently active. The default className does not
   * actually apply any styles.
   *
   * If this prop is set, it will override any `activeClassName` props applied to the child
   * `Tab`s. Either set a custom `activeClassName` on each `Tab`, or use this prop to apply
   * the same `activeClassName` to each `Tab`.
   *
   * @see {@link Tabs/Tab#activeClassName}
   */
  activeTabClassName: _propTypes2.default.string,

  /**
   * The className to use when the tab is not active and not selected. By default,
   * this will set inactive tabs' color to `$md-white-base`. This works great
   * if the tabs are placed on a colored toolbar but fails when the tabs are not colored
   * or on a white background. In these cases, it is recommended to change this value
   * to `md-text--secondary` or some other class name.
   *
   * If this prop is set, it will override any `inactiveClassName` props applied to the child
   * `Tab`s. Either set a custom `inactiveClassName` on each `Tab`, or use this prop to apply
   * the same `inactiveClassName` to each `Tab`.
   *
   * @see {@link Tabs/Tab#inactiveClassName}
   */
  inactiveTabClassName: _propTypes2.default.string,

  /**
   * The component to render the tabs in.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

  /**
   * This should either be a single `Tab` component or a list of `Tab` components. Unfortunately,
   * the child *must* be exactly a `Tab` component because this is unable to extract the correct
   * `label` and `children` from a custom `Tab` component.
   */
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.arrayOf(_propTypes2.default.element)]).isRequired,

  /**
   * Boolean if the tabs should be centered instead of aligned to the keyline. The tabs will
   * only be aligned to the keyline when there are more than 3 tabs and the `alignToKeyline`
   * prop is `false`.
   */
  centered: _propTypes2.default.bool,

  /**
   * Boolean if the tabs should align to a toolbar's title keyline. If this is undefined,
   * the tabs will try to align to the keyline when there are more than 3 tabs.
   */
  alignToKeyline: _propTypes2.default.bool,

  /**
   * Boolean if the tabs should be colored with the primary color. If this is false or undefined,
   * the tabs will be colored for the light or dark theme.
   */
  colored: _propTypes2.default.bool,

  /**
   * A boolean if the overflow tabs on desktop displays should appear in a menu. If this is false,
   * the additional tabs will be available by using pagination buttons.
   */
  overflowMenu: _propTypes2.default.bool,

  /**
   * An optional function to call when the active tab is changed. The callback will include
   * the new active tab index and a click event.
   *
   * ```js
   * onTabChange(newTabIndex, event);
   * ```
   */
  onTabChange: _propTypes2.default.func,

  /**
   * An optional active tab index to use. If this is defined, it will make the component controlled
   * and require the `onTabChange` prop to be defined.
   */
  activeTabIndex: (0, _controlled2.default)(_propTypes2.default.number, 'onTabChange', 'defaultTabIndex'),

  /**
   * The default tab index to use when the component is uncontrolled.
   */
  defaultTabIndex: _propTypes2.default.number.isRequired,

  /**
   * When the `overflowMenu` prop is false, this will be used to render the "next slice of tabs"
   * when there are too many tabs to display at once on desktop screens.
   */
  nextIcon: _propTypes2.default.element,

  /**
   * When the `overflowMenu` prop is false, this will be used to render the "previous slice of tabs"
   * when there are too many tabs to display at once on desktop screens.
   */
  previousIcon: _propTypes2.default.element,

  /**
   * When the `overflowMenu` prop is true, this will be used to render the `MenuTab` overflow menu.
   * This will be to render the icon to the right of the label.
   */
  overflowMenuIcon: _propTypes2.default.element,

  /**
   * When the `overflowMenu` prop is true, this will be used to render the `MenuTab` overflow menu.
   * This will be the text that displays as a tab.
   */
  overflowMenuLabel: _propTypes2.default.node.isRequired,

  /**
   * Boolean if the tabs are currently rendered on a mobile or tablet device. This is used to calculate
   * overflow/padding on the tabs.
   */
  mobile: _propTypes2.default.bool,
  defaultMedia: (0, _deprecated2.default)(_propTypes2.default.oneOf(['mobile', 'tablet', 'desktop']), 'Use `mobile` instead'),
  desktopMinWidth: (0, _deprecated2.default)(_propTypes2.default.number, 'Use `mobile` instead'),
  nextIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `nextIcon` prop instead'),
  nextIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `nextIcon` prop instead'),
  previousIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `previousIcon` prop instead'),
  previousIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `previousIcon` prop instead'),
  overflowMenuIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `overflowMenuIcon` prop instead'),
  overflowMenuIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `overflowMenuIcon` prop instead')
};
Tabs.defaultProps = {
  component: 'ul',
  defaultTabIndex: 0,
  nextIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'keyboard_arrow_right'
  ),
  previousIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'keyboard_arrow_left'
  ),
  overflowMenuLabel: 'More',
  overflowMenuIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'arrow_drop_down'
  )
};
exports.default = Tabs;
//# sourceMappingURL=Tabs.js.map