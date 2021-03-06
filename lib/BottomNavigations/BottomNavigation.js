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

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _touches = require('../utils/EventUtils/touches');

var _Portal = require('../Helpers/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Paper = require('../Papers/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _BottomNav = require('./BottomNav');

var _BottomNav2 = _interopRequireDefault(_BottomNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `BottomNavigation` component is an alternative to the `NavigationDrawer` for handling navigation
 * only on mobile devices.
 */
var BottomNavigation = function (_PureComponent) {
  _inherits(BottomNavigation, _PureComponent);

  function BottomNavigation(props) {
    _classCallCheck(this, BottomNavigation);

    var _this = _possibleConstructorReturn(this, (BottomNavigation.__proto__ || Object.getPrototypeOf(BottomNavigation)).call(this, props));

    _initialiseProps.call(_this);

    var visible = typeof props.initiallyVisible === 'boolean' ? props.initiallyVisible : props.defaultVisible;
    _this.state = {
      visible: visible,
      portalVisible: visible
    };

    if (typeof props.activeIndex === 'undefined') {
      _this.state.activeIndex = props.defaultActiveIndex;
    }
    return _this;
  }

  _createClass(BottomNavigation, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.dynamic) {
        this._addTouchEvents();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var dynamic = nextProps.dynamic;

      if (this.props.dynamic === dynamic) {
        return;
      }

      if (dynamic) {
        this._addTouchEvents();
      } else {
        this._removeTouchEvents();
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.visible !== nextState.visible && nextProps.onVisibilityChange) {
        nextProps.onVisibilityChange(nextState.visible);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.dynamic) {
        this._removeTouchEvents();
      }

      if (this._timeout) {
        clearTimeout(this._timeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          visible = _state.visible,
          portalVisible = _state.portalVisible;

      var _props = this.props,
          className = _props.className,
          actions = _props.actions,
          colored = _props.colored,
          dynamic = _props.dynamic,
          lastChild = _props.lastChild,
          animate = _props.animate,
          portal = _props.portal,
          propLinks = _props.links,
          propActiveIndex = _props.activeIndex,
          propRenderNode = _props.renderNode,
          onNavChange = _props.onNavChange,
          onVisibilityChange = _props.onVisibilityChange,
          defaultVisible = _props.defaultVisible,
          defaultActiveIndex = _props.defaultActiveIndex,
          dynamicThreshold = _props.dynamicThreshold,
          transitionDuration = _props.transitionDuration,
          onChange = _props.onChange,
          initiallyVisible = _props.initiallyVisible,
          containerStyle = _props.containerStyle,
          containerClassName = _props.containerClassName,
          transitionName = _props.transitionName,
          transitionEnterTimeout = _props.transitionEnterTimeout,
          transitionLeaveTimeout = _props.transitionLeaveTimeout,
          props = _objectWithoutProperties(_props, ['className', 'actions', 'colored', 'dynamic', 'lastChild', 'animate', 'portal', 'links', 'activeIndex', 'renderNode', 'onNavChange', 'onVisibilityChange', 'defaultVisible', 'defaultActiveIndex', 'dynamicThreshold', 'transitionDuration', 'onChange', 'initiallyVisible', 'containerStyle', 'containerClassName', 'transitionName', 'transitionEnterTimeout', 'transitionLeaveTimeout']);

      var links = this.props.links;

      if (actions) {
        links = actions;
      }

      var fixed = links.length === 3;
      var activeIndex = (0, _getField2.default)(this.props, this.state, 'activeIndex');
      var renderNode = (0, _getField2.default)(this.props, this.context, 'renderNode');
      var navigation = _react2.default.createElement(
        _Paper2.default,
        _extends({}, props, {
          key: 'navigation',
          className: (0, _classnames2.default)('md-bottom-navigation', {
            'md-background--card': !colored,
            'md-background--primary': colored,
            'md-bottom-navigation--dynamic': dynamic,
            'md-bottom-navigation--dynamic-inactive': dynamic && !visible
          }, className),
          role: 'navigation'
        }),
        links.map(function (action, index) {
          return _react2.default.createElement(_BottomNav2.default, _extends({}, action, {
            animate: animate,
            key: action.key || index,
            index: index,
            onNavChange: _this2._handleNavChange,
            active: activeIndex === index,
            colored: colored,
            fixed: fixed
          }));
        })
      );

      if (!portal) {
        return portalVisible ? navigation : null;
      }

      return _react2.default.createElement(
        _Portal2.default,
        { renderNode: renderNode, visible: portalVisible, lastChild: lastChild },
        navigation
      );
    }
  }]);

  return BottomNavigation;
}(_react.PureComponent);

BottomNavigation.propTypes = {
  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply.
   */
  className: _propTypes2.default.string,

  /**
   * A list of objects to generate a bottom navigation link. There must be at least 3 and no more
   * than 5 links. A link gets rendered as the `AccessibleFakeButton` component, so any additional
   * props in the link's shape will be passed along.
   *
   * ```docgen
   * PropTypes.arrayOf(PropTypes.shape({
   *   label: PropTypes.node.isRequired,
   *   icon: PropTypes.element,
   *   component: PropTypes.oneOfType([
   *      PropTypes.func,
   *      PropTypes.string,
   *   ]),
   * }).isRequired
   * ```
   */
  links: function links(props, propName, component) {
    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    var _PropTypes$arrayOf;

    var links = props[propName] || props.actions;
    var len = links.length;

    if (len < 3) {
      return new Error('Only ' + len + ' `' + propName + '` were given to the ' + component + '. At least 3 are required.');
    } else if (len > 5) {
      return new Error(len + ' `' + propName + '` were given to the ' + component + '. No more than 5 may be given.');
    }

    return (_PropTypes$arrayOf = _propTypes2.default.arrayOf(_propTypes2.default.shape({
      label: _propTypes2.default.node.isRequired,
      icon: _propTypes2.default.element,
      iconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use `icon` instead'),
      iconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `icon` instead'),
      component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string])
    }))).isRequired.apply(_PropTypes$arrayOf, [props, propName, component].concat(args));
  },

  /**
   * Boolean if the bottom navigation should be colored with the primary color or whatever color
   * was a result of the `react-md-theme-bottom-navigations-colored` mixin.
   */
  colored: _propTypes2.default.bool,

  /**
   * Boolean if the bottom navigation should dynamically appear based on scrolling. When the user
   * scrolls the `dynamicThreshold` amount, this component will either disappear (scrolling down)
   * or appear (scrolling up).
   */
  dynamic: _propTypes2.default.bool,

  /**
   * The distance a user must scroll before the bottom navigation appears or disappears when it is `dynamic`.
   */
  dynamicThreshold: _propTypes2.default.number.isRequired,

  /**
   * An optional function to call when a link has been clicked. The callback will
   * include the new active index and the click event.
   *
   * ```js
   * onNavChange(newActiveIndex, event);
   * ```
   */
  onNavChange: _propTypes2.default.func,

  /**
   * An optional active index to use. This will make the component controlled and require the
   * `onNavChange` prop to be defined.
   */
  activeIndex: (0, _controlled2.default)(_propTypes2.default.number, 'onNavChange', 'defaultActiveIndex'),

  /**
   * The index for the link that is active by default.
   */
  defaultActiveIndex: _propTypes2.default.number.isRequired,

  /**
   * Boolean if the bottom navigation is visible by default. This *should* probably always
   * be true.
   */
  defaultVisible: _propTypes2.default.bool.isRequired,

  /**
   * The component to render the bottom navigation as.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

  /**
   * Boolean if the Portal's functionality of rendering in a separate react tree should be applied
   * to the bottom navigation.
   *
   * @see {@link Helpers/Portal}
   */
  portal: _propTypes2.default.bool,

  /**
   * Since the `BottomNavigation` component uses the `Portal` component, you can pass an optional
   * HTML Node to render in.
   */
  renderNode: _propTypes2.default.object,

  /**
   * Boolean if the bottom navigation should render as the last child in the `renderNode` or `body`
   * instead of as the first.
   */
  lastChild: _propTypes2.default.bool,

  /**
   * The transition duration for the dynamic bottom navigation to appear or disappear. This should
   * match the `$md-bottom-navigation-transition-time` variable.
   */
  transitionDuration: _propTypes2.default.number.isRequired,

  /**
   * An optional function to call when the visibility of the bottom navigation changes. The callback
   * will include the new visibility.
   *
   * ```js
   * onVisibilityChange(!visible);
   * ```
   */
  onVisibilityChange: _propTypes2.default.func,

  /**
   * Boolean if the label on a shifting navigation should animate in and out.
   */
  animate: _propTypes2.default.bool,

  onChange: (0, _deprecated2.default)(_propTypes2.default.func, 'Use `onNavChange` instead'),
  initiallyVisible: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `defaultVisible` instead'),
  initialActiveIndex: (0, _deprecated2.default)(_propTypes2.default.number, 'Use `defaultActiveIndex` instead'),
  containerStyle: (0, _deprecated2.default)(_propTypes2.default.object, 'Use `style` instead'),
  containerClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `className` instead'),
  transitionName: (0, _deprecated2.default)(_propTypes2.default.string, 'There is no CSSTransitionGroup used anymore'),
  transitionEnterTimeout: (0, _deprecated2.default)(_propTypes2.default.number, 'Use `transitionDuration` instead'),
  transitionLeaveTimeout: (0, _deprecated2.default)(_propTypes2.default.number, 'Use `transitionDuration` instead'),
  actions: (0, _deprecated2.default)(_propTypes2.default.array, 'Use `links` instead')
};
BottomNavigation.defaultProps = {
  animate: true,
  defaultActiveIndex: 0,
  component: 'footer',
  defaultVisible: true,
  transitionDuration: 300,
  portal: false,
  dynamicThreshold: 5
};
BottomNavigation.contextTypes = {
  renderNode: _propTypes2.default.object
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._addTouchEvents = function () {
    (0, _touches.addTouchEvent)(window, 'start', _this3._handleTouchStart);
    (0, _touches.addTouchEvent)(window, 'move', _this3._handleTouchMove);
    (0, _touches.addTouchEvent)(window, 'end', _this3._handleTouchEnd);
  };

  this._removeTouchEvents = function () {
    (0, _touches.removeTouchEvent)(window, 'start', _this3._handleTouchStart);
    (0, _touches.removeTouchEvent)(window, 'move', _this3._handleTouchMove);
    (0, _touches.removeTouchEvent)(window, 'end', _this3._handleTouchEnd);
  };

  this._animateIn = function () {
    if (_this3._timeout) {
      clearTimeout(_this3._timeout);
    }

    _this3._timeout = setTimeout(function () {
      _this3._timeout = null;
      _this3.setState({ visible: true });
    }, 17);

    _this3.setState({ portalVisible: true });
  };

  this._animateOut = function () {
    if (_this3._timeout) {
      clearTimeout(_this3._timeout);
    }

    _this3._timeout = setTimeout(function () {
      _this3._timeout = null;
      _this3.setState({ portalVisible: false });
    }, _this3.props.transitionDuration);

    _this3.setState({ visible: false });
  };

  this._handleTouchStart = function (e) {
    var pageY = e.changedTouches[0].pageY;


    _this3._pageY = pageY;
    _this3._scrolling = true;
  };

  this._handleTouchMove = function (e) {
    var visible = _this3.state.visible;

    if (!_this3._scrolling) {
      return;
    }

    var touchY = e.changedTouches[0].pageY;
    var dynamicThreshold = _this3.props.dynamicThreshold;

    var passedThreshold = Math.abs(_this3._pageY - touchY) >= dynamicThreshold;
    if (_this3._pageY > touchY && visible && passedThreshold) {
      _this3._pageY = touchY;
      _this3._animateOut();
    } else if (_this3._pageY < touchY && !visible && passedThreshold) {
      _this3._pageY = touchY;
      _this3._animateIn();
    }
  };

  this._handleTouchEnd = function () {
    _this3._scrolling = false;
  };

  this._handleNavChange = function (index, e) {
    if (_this3.props.onNavChange || _this3.props.onChange) {
      (_this3.props.onNavChange || _this3.props.onChange)(index, e);
    }

    if (typeof _this3.props.activeIndex === 'undefined') {
      _this3.setState({ activeIndex: index });
    }
  };
};

exports.default = BottomNavigation;
//# sourceMappingURL=BottomNavigation.js.map