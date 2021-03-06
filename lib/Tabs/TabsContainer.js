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

var _reactSwipeableViews = require('react-swipeable-views');

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _between = require('../utils/PropTypes/between');

var _between2 = _interopRequireDefault(_between);

var _ResizeObserver = require('../Helpers/ResizeObserver');

var _ResizeObserver2 = _interopRequireDefault(_ResizeObserver);

var _Paper = require('../Papers/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _TabPanel = require('./TabPanel');

var _TabPanel2 = _interopRequireDefault(_TabPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `TabsContainer` component is used when you want to have your `Tabs` connected with
 * the `SwipeableViews`. This component will traverse the children subtree and extract out
 * the `children` from each tab, and render them in a swipeable container. However,
 * since this is using the `React.Children` traversal, You will have to keep the `Tabs`
 * and `Tab` component as a direct descendent. You are unable to make a separate component
 * that encompasses the `Tab` component.
 *
 * ```js
 * // valid
 * <TabsContainer>
 *   <Tabs>
 *     <Tab />
 *   </Tabs>
 * </TabsContainer>
 *
 * // invalid
 * <TabsContainer>
 *   <Tabs>
 *     <MyCustomTab />
 *   </Tabs>
 * </TabsContainer>
 * ```
 *
 * This is because it seems you are unable to access the `MyCustomTab`'s child Tab props correctly.
 * You can however have the tab's children as a separate component if you wish.
 */
var TabsContainer = function (_PureComponent) {
  _inherits(TabsContainer, _PureComponent);

  function TabsContainer(props) {
    _classCallCheck(this, TabsContainer);

    var _this = _possibleConstructorReturn(this, (TabsContainer.__proto__ || Object.getPrototypeOf(TabsContainer)).call(this, props));

    _this._handleTabChange = function (index, tabId, tabControlsId, tabChildren, event) {
      if (_this.props.onTabChange) {
        _this.props.onTabChange(index, tabId, tabControlsId, tabChildren, event);
      }

      if (typeof _this.props.activeTabIndex === 'undefined') {
        _this.setState({ activeTabIndex: index });
      }
    };

    _this._handleSwipeChange = function (activeTabIndex) {
      _this._handleTabChange(activeTabIndex);
    };

    _this._setContainer = function (container) {
      _this._container = (0, _reactDom.findDOMNode)(container);
    };

    _this._resizePanel = function () {
      if (!_this._container) {
        return;
      }

      var activePanel = _this._container.querySelector('.md-tab-panel[aria-hidden=false]');
      if (activePanel && _this.state.panelHeight !== activePanel.scrollHeight) {
        _this.setState({ panelHeight: activePanel.scrollHeight });
      }
    };

    _this.state = {};
    if (typeof props.activeTabIndex === 'undefined') {
      _this.state.activeTabIndex = props.defaultTabIndex;
    }
    return _this;
  }

  _createClass(TabsContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._resizePanel();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var prevIndex = (0, _getField2.default)(prevProps, prevState, 'activeTabIndex');
      var currIndex = (0, _getField2.default)(this.props, this.state, 'activeTabIndex');

      if (prevIndex !== currIndex) {
        this._resizePanel();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var panelHeight = this.state.panelHeight;

      var _props = this.props,
          Component = _props.component,
          style = _props.style,
          className = _props.className,
          panelStyle = _props.panelStyle,
          panelClassName = _props.panelClassName,
          panelComponent = _props.panelComponent,
          headerStyle = _props.headerStyle,
          headerClassName = _props.headerClassName,
          slideStyle = _props.slideStyle,
          slideHeightProp = _props.slideHeightProp,
          swipeableViewsStyle = _props.swipeableViewsStyle,
          swipeableViewsClassName = _props.swipeableViewsClassName,
          headerComponent = _props.headerComponent,
          headerZDepth = _props.headerZDepth,
          children = _props.children,
          colored = _props.colored,
          fixed = _props.fixed,
          labelAndIcon = _props.labelAndIcon,
          swipeableViewsProps = _props.swipeableViewsProps,
          themed = _props.themed,
          propToolbar = _props.toolbar,
          propActiveTabeIndex = _props.activeTabIndex,
          onTabChange = _props.onTabChange,
          defaultTabIndex = _props.defaultTabIndex,
          props = _objectWithoutProperties(_props, ['component', 'style', 'className', 'panelStyle', 'panelClassName', 'panelComponent', 'headerStyle', 'headerClassName', 'slideStyle', 'slideHeightProp', 'swipeableViewsStyle', 'swipeableViewsClassName', 'headerComponent', 'headerZDepth', 'children', 'colored', 'fixed', 'labelAndIcon', 'swipeableViewsProps', 'themed', 'toolbar', 'activeTabIndex', 'onTabChange', 'defaultTabIndex']);

      var toolbar = this.props.toolbar;


      var activeTabIndex = (0, _getField2.default)(this.props, this.state, 'activeTabIndex');

      var tabsEl = _react.Children.only(children);
      var tabId = tabsEl.props.tabId;
      var content = _react.Children.map(tabsEl.props.children, function (tab, index) {
        if (!tab) {
          return tab;
        }

        return _react2.default.createElement(
          _TabPanel2.default,
          {
            id: tab.props.controlsId || tabId + '-panel-' + index,
            active: activeTabIndex === index,
            style: panelStyle,
            className: panelClassName,
            component: panelComponent,
            controlledById: tab.props.id || tabId + '-' + index
          },
          _react2.default.createElement(_ResizeObserver2.default, { watchHeight: true, onResize: _this2._resizePanel }),
          tab.props.children
        );
      });

      var childrenProps = _react.Children.only(children).props;
      var tabs = (0, _react.cloneElement)(children, {
        colored: typeof childrenProps.colored !== 'undefined' ? childrenProps.colored : colored,
        onTabChange: this._handleTabChange,
        activeTabIndex: activeTabIndex
      });

      var prominentToolbar = false;
      if (toolbar) {
        var toolbarProps = _react.Children.only(toolbar).props;
        toolbar = (0, _react.cloneElement)(toolbar, {
          component: toolbarProps.component || 'div',
          colored: typeof toolbarProps.colored !== 'undefined' ? childrenProps.colored : colored
        });

        prominentToolbar = toolbarProps.prominent || toolbarProps.prominentTitle;
      }

      var header = void 0;
      if (fixed) {
        header = _react2.default.createElement(
          _Paper2.default,
          {
            style: headerStyle,
            className: (0, _classnames2.default)('md-tabs-fixed-container', {
              'md-toolbar--themed': themed
            }, headerClassName),
            zDepth: headerZDepth,
            component: headerComponent
          },
          toolbar,
          tabs
        );
      }

      var baseSlideStyle = _defineProperty({}, slideHeightProp, panelHeight);

      return _react2.default.createElement(
        Component,
        _extends({
          style: style,
          className: (0, _classnames2.default)('md-tabs-container', className)
        }, props, {
          ref: this._setContainer
        }),
        header,
        header ? null : toolbar,
        header ? null : tabs,
        _react2.default.createElement(
          _reactSwipeableViews2.default,
          _extends({}, swipeableViewsProps, {
            style: swipeableViewsStyle,
            className: (0, _classnames2.default)('md-tabs-content', {
              'md-tabs-content--offset': !toolbar && !labelAndIcon && fixed,
              'md-tabs-content--offset-icon': !toolbar && fixed && labelAndIcon,
              'md-tabs-content--offset-toolbar': toolbar && fixed && !prominentToolbar && !labelAndIcon,
              'md-tabs-content--offset-toolbar-prominent': toolbar && fixed && prominentToolbar && !labelAndIcon,
              'md-tabs-content--offset-toolbar-icon': fixed && toolbar && labelAndIcon && !prominentToolbar,
              'md-tabs-content--offset-toolbar-prominent-icon': fixed && toolbar && labelAndIcon && prominentToolbar
            }, swipeableViewsClassName),
            slideStyle: _extends({}, baseSlideStyle, typeof slideStyle === 'function' ? slideStyle(baseSlideStyle, panelHeight) : slideStyle),
            index: activeTabIndex,
            onChangeIndex: this._handleSwipeChange
          }),
          content
        )
      );
    }
  }]);

  return TabsContainer;
}(_react.PureComponent);

TabsContainer.propTypes = {
  /**
   * An optional style to apply to the container.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the container.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to each `TabPanel` that gets generated. Each tab's children
   * will get wrapped in a `TabPanel` component.
   */
  panelStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to each each `TabPanel` that gets generated. Each tab's
   * children will get wrapped in a `TabPanel` component.
   */
  panelClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the header component when the tabs are fixed to the top of the page.
   * The optional toolbar and tabs get wrapped in a `Paper` component.
   */
  headerStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the header component when the tabs are fixed to the top of the page.
   * The optional toolbar and tabs get wrapped in a `Paper` component.
   */
  headerClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the `SwipeableViews`.
   *
   * @see https://github.com/oliviertassinari/react-swipeable-views#user-content-swipeableviews-
   */
  swipeableViewsStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the `SwipeableViews` container.
   */
  swipeableViewsClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to each slide component or a function that returns such style.
   *
   * Default style and height of slide component will be passed in the function.
   * The function should return a style that will be merged with default style, or `null`.
   *
   * @see https://github.com/oliviertassinari/react-swipeable-views#user-content-swipeableviews-
   */
  slideStyle: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),

  /**
   * The property that should be used to set height of a slide component.
   */
  slideHeightProp: _propTypes2.default.oneOf(['height', 'minHeight', 'maxHeight']),

  /**
   * This should be a `Tabs` component with children of `Tab`. This is used to figure out which
   * tab's content is currently visible.
   */
  children: _propTypes2.default.element.isRequired,

  /**
   * The component to render the container as.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

  /**
   * The component to render each `TabPanel` as.
   */
  panelComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),

  /**
   * An optional toolbar to render above the tabs.
   */
  toolbar: _propTypes2.default.element,

  /**
   * An optional active tab index to use. If this is defined, the component will be controlled
   * and require the `onTabChange` prop to be defined.
   */
  activeTabIndex: (0, _controlled2.default)(_propTypes2.default.number, 'onTabChange', 'defaultTabIndex'),

  /**
   * An optional function to call when a new tab is selected by swiping or clicking a tab. When
   * a new tab has been clicked, the callback will include the active tab index, the tab's `id`,
   * the tab's `controlsId`, the tab's `children`, and the click event.
   *
   * If the tab was changed by swiping, it will only contain the new active tab index.
   *
   * ```js
   * onTabChange(newActiveTabIndex, tabId, tabControlsId, tabChildren, event);
   * ```
   */
  onTabChange: _propTypes2.default.func,

  /**
   * The default tab index to use when the component is uncontrolled.
   */
  defaultTabIndex: _propTypes2.default.number.isRequired,

  /**
   * Boolean if the `toolbar` and `Tabs` should be cloned with `colored: true`.
   */
  colored: _propTypes2.default.bool,

  /**
   * Boolean if the `toolbar` should be applied with the theme color. This _really_ only
   * applies when you create a `fixed` tabs container.
   */
  themed: _propTypes2.default.bool,

  /**
   * Boolean if the tabs and the optional toolbar should be fixed to the top of the page.
   */
  fixed: _propTypes2.default.bool,

  /**
   * A boolean if a `fixed` `TabsContainer` has tabs with a label and an icon.
   */
  labelAndIcon: _propTypes2.default.bool,

  /**
   * An optional component to render the fixed tabs header as.
   */
  headerComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),

  /**
   * The zDepth for the fixed tabs header.
   */
  headerZDepth: (0, _between2.default)(_propTypes2.default.number, 0, 5),

  /**
   * Any additional props to apply to the SwipeableViews component. View the
   * [SwipeableViews API](https://github.com/oliviertassinari/react-swipeable-views#api)
   * for valid attributes.
   *
   * You will not be able to set the `style`, `className`, `slideStyle`, `index`,
   * or `onChangeIndex` props for the SwipeableViews.
   *
   * The styling and classnames can be updated with the other TabsContainer props.
   */
  swipeableViewsProps: _propTypes2.default.object
};
TabsContainer.defaultProps = {
  component: 'section',
  defaultTabIndex: 0,
  headerZDepth: 1,
  slideHeightProp: 'height'
};
exports.default = TabsContainer;
//# sourceMappingURL=TabsContainer.js.map