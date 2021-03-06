'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _handleWindowClickListeners = require('../utils/EventUtils/handleWindowClickListeners');

var _handleWindowClickListeners2 = _interopRequireDefault(_handleWindowClickListeners);

var _getSelectedTextPosition = require('../utils/Positioning/getSelectedTextPosition');

var _getSelectedTextPosition2 = _interopRequireDefault(_getSelectedTextPosition);

var _getScroll = require('../utils/Positioning/getScroll');

var _getScroll2 = _interopRequireDefault(_getScroll);

var _viewport = require('../utils/Positioning/viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _isOutOfBounds = require('../utils/Positioning/isOutOfBounds');

var _isOutOfBounds2 = _interopRequireDefault(_isOutOfBounds);

var _anchorShape = require('./anchorShape');

var _anchorShape2 = _interopRequireDefault(_anchorShape);

var _fixedToShape = require('./fixedToShape');

var _fixedToShape2 = _interopRequireDefault(_fixedToShape);

var _positionShape = require('./positionShape');

var _positionShape2 = _interopRequireDefault(_positionShape);

var _HorizontalAnchors = require('./HorizontalAnchors');

var _HorizontalAnchors2 = _interopRequireDefault(_HorizontalAnchors);

var _VerticalAnchors = require('./VerticalAnchors');

var _VerticalAnchors2 = _interopRequireDefault(_VerticalAnchors);

var _Positions = require('./Positions');

var _Positions2 = _interopRequireDefault(_Positions);

var _ResizeObserver = require('./ResizeObserver');

var _ResizeObserver2 = _interopRequireDefault(_ResizeObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Layover component is used to keep a component fixed to another component
 * while the page is scrolling or a container is scrolling. When the fixed component
 * is considered out of view, it will be closed.
 *
 * > NOTE: Don't look at source code. Plz.
 */
var Layover = function (_PureComponent) {
  _inherits(Layover, _PureComponent);

  function Layover(props) {
    _classCallCheck(this, Layover);

    var _this = _possibleConstructorReturn(this, (Layover.__proto__ || Object.getPrototypeOf(Layover)).call(this));

    _initialiseProps.call(_this);

    var child = _react2.default.Children.only(props.children);
    _this.state = {
      below: false,
      right: false,
      styles: child.props.style
    };

    _this._lastXFix = null;
    _this._lastYFix = null;
    _this._initialX = null;
    _this._initialY = null;
    _this._initialTop = null;
    _this._initialLeft = null;
    _this._child = null;
    _this._toggle = null;
    return _this;
  }

  _createClass(Layover, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (process.env.NODE_ENV === 'development') {
        window.addEventListener('load', function () {
          _this2._setContainer(_this2._container);
        });
      }

      var _props = this.props,
          visible = _props.visible,
          fixedTo = _props.fixedTo,
          sameWidth = _props.sameWidth,
          centered = _props.centered,
          simplified = _props.simplified;

      var anchor = this._getAnchor(this.props);
      if (visible) {
        (0, _handleWindowClickListeners2.default)(this._handleOutsideClick, true);

        // Don't worry about any of the other logic for a "simple" layover
        if (simplified) {
          return;
        }

        var rect = this._contextRect || this._toggle.getBoundingClientRect();
        if (this._dialog) {
          this._manageFixedToListener(this._dialog, true);
        } else if (!this._inFixed) {
          this._manageFixedToListener(fixedTo, true);
        }

        this._init(fixedTo, anchor, sameWidth, centered, rect);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var fixedTo = nextProps.fixedTo,
          visible = nextProps.visible,
          children = nextProps.children,
          sameWidth = nextProps.sameWidth,
          centered = nextProps.centered,
          simplified = nextProps.simplified;

      if (simplified) {
        if (this.props.simplified !== simplified) {
          this._reset();
        }
        return;
      }

      var anchor = this._getAnchor(nextProps);
      var visibileDiff = visible !== this.props.visible;
      var childStyle = _react2.default.Children.only(children).props.style;

      if (visibileDiff) {
        if (!visible) {
          this._reset();
        } else {
          // Initialize the layover logic
          var rect = this._contextRect || this._toggle.getBoundingClientRect();
          if (this._dialog) {
            this._manageFixedToListener(this._dialog, true);
          } else if (!this._inFixed) {
            this._manageFixedToListener(fixedTo, true);
          }

          this._init(fixedTo, anchor, sameWidth, centered, rect);
        }
      } else if (fixedTo !== this.props.fixedTo && visible) {
        // swap the fixedTo listeners
        this._manageFixedToListener(this.props.fixedTo, false);
        this._manageFixedToListener(fixedTo, true);
      } else if (childStyle !== _react2.default.Children.only(this.props.children).props.style) {
        // Re-merge styles... This is only required if all the others fail since all the other
        // logic always merges styles with the children styles
        this.setState({ styles: _extends({}, this.state.styles, childStyle) });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      var _props2 = this.props,
          visible = _props2.visible,
          closeOnOutsideClick = _props2.closeOnOutsideClick;

      var enabled = visible && closeOnOutsideClick;
      var prevEnabled = prevProps.visible && prevProps.closeOnOutsideClick;
      if (enabled !== prevEnabled) {
        if (this._clickTimeout) {
          clearTimeout(this._clickTimeout);
          this._clickTimeout = null;
        }

        // This is really an arbitrary timeout time, but firefox needs to have a timeout
        // so the context menu doesn't close automatically due to an "outside click" being
        // triggered
        this._clickTimeout = setTimeout(function () {
          _this3._clickTimeout = null;
          (0, _handleWindowClickListeners2.default)(_this3._handleOutsideClick, enabled);
        }, enabled ? 300 : 0);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._clickTimeout) {
        clearTimeout(this._clickTimeout);
        this._clickTimeout = null;
      }
      (0, _handleWindowClickListeners2.default)(this._handleOutsideClick, false);

      if (!this.props.simplified) {
        this._manageFixedToListener(this.props.fixedTo, false);
        this._manageWindowResizeListener(false);
      }
    }
  }, {
    key: '_getAnchor',
    value: function _getAnchor(_ref) {
      var anchor = _ref.anchor,
          belowAnchor = _ref.belowAnchor,
          animationPosition = _ref.animationPosition;

      return animationPosition === Layover.Positions.BELOW && belowAnchor || anchor;
    }

    /**
     * Whew. Ok. So since the fixedTo prop can either be two elements or a single item,
     * this utility function is used to add/remove the scrolling event listeners for
     * this prop.
     *
     * When the fixedTo prop has a horizontal and/or vertical attribute, the `window`
     * will be the fallback option. If both the horizontal and vertical attributes are
     * defined, the `window` still needs to have a scroll listener to make sure it
     * doesn't go off screen.
     */


    /**
     * This is just a simple utility function to merge the existing state styles,
     * any new styles, and the children's styles (with most precedence).
     */


    /**
     * This initializes the popover with the default styles, and the initial bookkeeping
     * variables to update while it is open.
     */


    /**
     * Attempts to fix the child by setting it's location ONLY for the entire
     * page viewport. I didn't bother attempting to fix it for additional fixedTo
     * stuff.
     */


    /**
     * When the child is initially mounted, it will update the styles for centering
     * the element (if enabled) and then attempt to fix any viewport issues.
     */


    /**
     * This is the meat of the stuff. Do lots of viewport / container checks to make sure
     * the element should still be visible. If it is still visible, it will update its
     * x and y position for the new scroll position.
     */


    /**
     * Attempts to fix a viewport problem by swapping the positioning. This only does
     * vertical switching right now.
     *
     * @param {Object} vp - The result of the viewport function
     * @return {boolean} true if the fix was able to be done and successful.
     */

  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          className = _props3.className,
          block = _props3.block,
          toggle = _props3.toggle,
          visible = _props3.visible,
          children = _props3.children,
          fullWidth = _props3.fullWidth,
          animationPosition = _props3.animationPosition,
          simplified = _props3.simplified,
          fillViewportWidth = _props3.fillViewportWidth,
          fillViewportHeight = _props3.fillViewportHeight,
          anchor = _props3.anchor,
          belowAnchor = _props3.belowAnchor,
          onClose = _props3.onClose,
          repositionOnScroll = _props3.repositionOnScroll,
          repositionOnResize = _props3.repositionOnResize,
          sameWidth = _props3.sameWidth,
          centered = _props3.centered,
          fixedTo = _props3.fixedTo,
          toggleQuery = _props3.toggleQuery,
          yThreshold = _props3.yThreshold,
          xThreshold = _props3.xThreshold,
          onContextMenu = _props3.onContextMenu,
          preventContextMenu = _props3.preventContextMenu,
          closeOnOutsideClick = _props3.closeOnOutsideClick,
          minLeft = _props3.minLeft,
          minRight = _props3.minRight,
          minBottom = _props3.minBottom,
          props = _objectWithoutProperties(_props3, ['className', 'block', 'toggle', 'visible', 'children', 'fullWidth', 'animationPosition', 'simplified', 'fillViewportWidth', 'fillViewportHeight', 'anchor', 'belowAnchor', 'onClose', 'repositionOnScroll', 'repositionOnResize', 'sameWidth', 'centered', 'fixedTo', 'toggleQuery', 'yThreshold', 'xThreshold', 'onContextMenu', 'preventContextMenu', 'closeOnOutsideClick', 'minLeft', 'minRight', 'minBottom']);

      var child = void 0;
      var childId = void 0;
      if (visible) {
        child = _react2.default.Children.only(children);
        if (child.props.id) {
          childId = child.props.id;
        } else if (props.id) {
          childId = props.id + '-layover';
        }

        child = _react2.default.cloneElement(children, {
          ref: this._fixateChild,
          id: childId,
          style: simplified ? child.props.style : this.state.styles,
          className: (0, _classnames2.default)('md-layover-child md-layover-child--' + animationPosition, {
            'md-layover-child--simplified': simplified
          }, child.props.className)
        });
      }

      var observer = null;
      if (!simplified && !fillViewportWidth && !fillViewportHeight) {
        observer = _react2.default.createElement(_ResizeObserver2.default, {
          watchWidth: !fillViewportWidth,
          watchHeight: !fillViewportHeight,
          target: this._child,
          onResize: this._handleResize
        });
      }

      return _react2.default.createElement(
        _CSSTransitionGroup2.default,
        _extends({}, props, {
          className: (0, _classnames2.default)('md-layover', {
            'md-layover--simplified': simplified,
            'md-inline-block': !block && !fullWidth,
            'md-full-width': fullWidth
          }, className),
          ref: this._setContainer,
          'aria-haspopup': true,
          'aria-owns': childId,
          'aria-expanded': visible,
          transitionEnter: props.transitionEnterTimeout !== 0,
          transitionLeave: props.transitionLeaveTimeout !== 0,
          onContextMenu: this._handleContextMenu
        }),
        observer,
        toggle,
        child
      );
    }
  }]);

  return Layover;
}(_react.PureComponent);

Layover.HorizontalAnchors = _HorizontalAnchors2.default;
Layover.VerticalAnchors = _VerticalAnchors2.default;
Layover.Positions = _Positions2.default;
Layover.propTypes = {
  /**
   * A id to give the layover itself. This is generally recommended for accessibility. If the
   * child does not have an id, the child will automatically be updated to be `${id}-layover`.
   */
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional style to apply to the layover.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the layover.
   */
  className: _propTypes2.default.string,

  /**
   * Boolean if the layover's child is currently visible.
   */
  visible: _propTypes2.default.bool.isRequired,

  /**
   * This should either be a single element or two elements that the layover recalculates
   * its fixed position when scrolling for horizontal and vertical.
   *
   * When it is a single element, it will recalculate for both horizontal and vertical
   * scrolling. Otherwise, you can specify the element for horizontal scrolling and a
   * separate element for vertical scrolling. If one is omitted, it will default to `window`.
   *
   * If the component is no longer considered to be in view after scrolling, the `onClose`
   * prop will be called.
   */
  fixedTo: _fixedToShape2.default.isRequired,

  /**
   * The renderable item that causes the Layover to become visible. This _should_
   * most likely be an `element` or `arrayOf(element)`, but anything is allowed.
   */
  toggle: _propTypes2.default.node,

  /**
   * Since the `toggle` prop can be anything, I need a way to be able to find an
   * element to base all the calculations on. This can either be a string that
   * gets passed to `layover.querySelector`, a DOM Element, or a function that
   * returns a DOM Element.
   */
  toggleQuery: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object, _propTypes2.default.string]).isRequired,

  /**
   * A single child that should be fixed to the toggle element.
   */
  children: _propTypes2.default.element.isRequired,

  /**
   * Boolean if the Layover should be displayed as a block instead of as an inline block.
   */
  block: _propTypes2.default.bool,

  /**
   * Boolean if the `children` should be centered horizontally and vertically while keeping
   * its height in mind as well. This is *only* valid if both the x and y `anchor` targets
   * are `CENTER`.
   */
  centered: _propTypes2.default.bool,

  /**
   * Boolean if the layover should gain the `md-full-width` class name.
   */
  fullWidth: _propTypes2.default.bool,

  /**
   * Boolean if the width of the children should be updated automatically to be the width
   * of the toggle element.
   */
  sameWidth: _propTypes2.default.bool,

  /**
   * The minimum value the `left` style can be for the child component. This is really just used
   * to make sure it doesn't scroll off the left of the page. It can also be used to make
   * full screen layovers on devices when when the `fillViewportWidth` prop is enabled.
   *
   * This can either be a number of pixels or a string for percentages. If this value is a string
   * **it will always be used over the calculated values** so it is preferred to use a number.
   *
   * @see {@link #minRight}
   * @see {@link #fillViewportWidth}
   */
  minLeft: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,

  /**
   * The minimum value the `right` style can be for the child component. This is really just used
   * to make sure it doesn't scroll off the right of the page when the `fillViewportWidth` prop is
   * enabled.
   *
   * This can either be a number of pixels or a string for percentages. If this value is a string
   * **it will always be used over the calculated values** so it is preferred to use a number.
   *
   * @see {@link #minLeft}
   * @see {@link #fillViewportWidth}
   */
  minRight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,

  /**
   * The minimum value that can be used for the `bottom` prop when the `fillViewportHeight` prop is enabled.
   * It is generally recommended to keep this value at `0` to keep it stretched to the bottom of the viewport
   * or setting it to a small positive number to add some padding.
   *
   * This can either be a number of pixels or a string for percentages. If this value is a string
   * **it will always be used over the calculated values** so it is preferred to use a number.
   *
   * @see {@link #fillViewportHeight}
   */
  minBottom: _propTypes2.default.number.isRequired,

  /**
   * Boolean if the layover should make the child fill the entire viewport's width. This will just
   * style the child element with:
   *
   * ```js
   * childStyle = {
   *   left: this.props.minLeft,
   *   right: this.props.minRight,
   * };
   * ```
   *
   * If you add any additional constraints such as `width` or `max-width`, it will not span the entire viewport's
   * width. This prop should generally really only be used on mobile devices. Using this prop along with
   * `fillViewportHeight` for Autocompletes can create great Android mobile searches. See the `fillViewportHeight`
   * for more information about why it is *only Android*.
   *
   * @see {@link #minLeft}
   * @see {@link #minRight}
   * @see {@link #fillViewportHeight}
   */
  fillViewportWidth: _propTypes2.default.bool,

  /**
   * Boolean if the layover should fill the height of the viewport from the current calculated `top`. This will just
   * style the child element with:
   *
   * ```js
   * childStyle = {
   *   top: currentCalculatedTop,
   *   bottom: this.props.minBottom,
   *   maxHeight: 'none',
   * };
   * ```
   *
   * This is *super* nice on Android devices since it will allow you to create nice toolbar search autocompletes
   * in your app and the list of items will grow until it reaches the soft keyboard. It isn't as nice on iOS since
   * iOS does not subtract the soft keyboard from the viewport's size so the list will still extend to the bottom
   * of the page.
   *
   * @see {@link #minBottom}
   * @see {@link #fillViewportWidth}
   */
  fillViewportHeight: _propTypes2.default.bool,

  /**
   * A function used to hide the visibility of the children when the children are no longer
   * visible or an element outside of the layover is clicked.
   */
  onClose: _propTypes2.default.func.isRequired,

  /**
   * The component to render the Layover as.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,

  /**
   * The transition name to use for the children appearing/disappearing.
   */
  transitionName: _propTypes2.default.string.isRequired,

  /**
   * The transition duration for the enter animation. The animation can be disabled by setting
   * this value to 0.
   */
  transitionEnterTimeout: _propTypes2.default.number.isRequired,

  /**
   * The transition duration for the leave animation. The animation can be disabled by setting
   * this value to 0.
   */
  transitionLeaveTimeout: _propTypes2.default.number.isRequired,

  /**
   * This is a threshold that is used to calculate if the `children` is still in
   * view by applying this multiplier to the `children`'s width.
   */
  xThreshold: _propTypes2.default.number.isRequired,

  /**
   * This is a threshold that is used to calculate if the `children` is still in
   * view by applying this multiplier to the `toggle`'s height.
   */
  yThreshold: _propTypes2.default.number.isRequired,

  /**
   * Boolean if the `children` should be hidden when an element outside
   * of the `Layout` component has been clicked.
   */
  closeOnOutsideClick: _propTypes2.default.bool.isRequired,

  /**
   * This is how the children get "anchored" to the `toggle` element and how the
   * auto-fix attempts will be made. Right now, the auto fixes will only be handled
   * on viewport boundaries instead of `fixedTo` boundaries. It was too hard for
   * first attempt.
   *
   * The general behavior will be that an equal-opposite of an anchor will be chosen
   * when that direction is out of viewport. So for example, the children are out
   * of viewport for the right of the screen, and the `anchor.x` value is
   * `Layover.HorizontalPositions.RIGHT`, the children will be swapped to be the `LEFT`
   * of the `toggle` component now.
   *
   * So a full list:
   * - `LEFT` / `RIGHT`
   * - `INNER_LEFT` / `INNER_RIGHT`
   * - `TOP` / `BOTTOM`
   *
   * The `CENTER` and `OVERLAP` positions can not be automatically adjusted.
   *
   * > To be safe, you should use the enum values for the `x` and `y` values.
   * @see {@link #VerticalAnchors}
   * @see {@link #HorizontalAnchors}
   */
  anchor: _anchorShape2.default.isRequired,

  /**
   * This is how the children get "anchored" when the `animationPositions` is set to `Layover.Positions.BELOW`.
   * Set this to `null` to continue using the base `anchor` prop instead of switching to this anchor.
   *
   * @see {@link #anchor}
   */
  belowAnchor: _anchorShape2.default,

  /**
   * This is the position that the children should animate from. It directly ties into
   * the `$md-layover-child-positions` Sass variable.
   */
  animationPosition: _positionShape2.default.isRequired,

  /**
   * If you would like the layover to interact as a context menu, provide this prop. It will
   * make the children appear relative to the context menu origin automatically.
   *
   * @see {@link #preventContextMenu}
   */
  onContextMenu: _propTypes2.default.func,

  /**
   * Boolean if the default behavior of the context menu should be prevented when using the
   * `onContextMenu` prop.
   *
   * @see {@link #onContextMenu}
   */
  preventContextMenu: _propTypes2.default.bool,

  /**
   * Boolean if the layover should attempt to automatically adjust the position of the element to
   * keep it within the viewport. If this value is set to `false`, the `onClose` prop will be called
   * instead.
   */
  repositionOnScroll: _propTypes2.default.bool,

  /**
   * Boolean if the layover should attempt to automatically adjust the position of the element to
   * keep it within the viewport. If this value is set to `false`, the `onClose` prop will be called
   * instead.
   */
  repositionOnResize: _propTypes2.default.bool,

  /**
   * Boolean if the layover should become "simplified". This basically disables all the logic for
   * keeping the child within the viewport and allows you to manage all the positioning via CSS.
   *
   * When this is enabled, it updates the `Layover` to have `position: relative` while the child will
   * have `position: absolute` which will allow for simple `top`, `right`, `bottom`, and/or `left` CSS
   * to position as wanted.
   *
   * This is really only helpful in cases where the layover can't calculate things correctly due to
   * being in fixed containers somewhere in the page or some other weird stuff. Hopefully this won't
   * really need to be used much.
   */
  simplified: _propTypes2.default.bool
};
Layover.defaultProps = {
  anchor: {
    x: Layover.HorizontalAnchors.INNER_LEFT,
    y: Layover.VerticalAnchors.OVERLAP
  },
  belowAnchor: {
    x: Layover.HorizontalAnchors.CENTER,
    y: Layover.VerticalAnchors.BOTTOM
  },
  animationPosition: Layover.Positions.BELOW,
  repositionOnScroll: true,
  repositionOnResize: false,
  component: 'div',
  fixedTo: typeof window !== 'undefined' ? window : {},
  toggleQuery: '.md-text-field-container,button,*[role="button"],*[role="listbox"]',
  transitionName: 'md-layover',
  transitionEnterTimeout: 200,
  transitionLeaveTimeout: 200,
  yThreshold: 0.38,
  xThreshold: 0.38,
  closeOnOutsideClick: true,
  preventContextMenu: true,
  simplified: false,
  minLeft: 0,
  minRight: 0,
  minBottom: 0,
  fillViewportWidth: false,
  fillViewportHeight: false
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this._isCenteredDialog = function () {
    return _this4._dialog && _this4._dialog.classList.contains('md-dialog--centered');
  };

  this._createStyles = function (anchor, centered, child, rect) {
    var x = anchor.x,
        y = anchor.y;
    var offsetWidth = child.offsetWidth,
        offsetHeight = child.offsetHeight;


    var left = void 0;
    var top = void 0;
    if (x === _HorizontalAnchors2.default.CENTER) {
      left = rect.left + rect.width / 2 - offsetWidth / 2;
    } else if (x === _HorizontalAnchors2.default.INNER_RIGHT) {
      left = rect.right - offsetWidth;
    } else if (x === _HorizontalAnchors2.default.LEFT) {
      left = rect.left - offsetWidth;
    } else if (x === _HorizontalAnchors2.default.RIGHT) {
      left = rect.right;
    }

    if (centered && x === _HorizontalAnchors2.default.CENTER && y === _VerticalAnchors2.default.CENTER) {
      top = rect.top - offsetHeight / 2 + rect.height / 2;
    } else if (y === _VerticalAnchors2.default.TOP) {
      top = rect.top - offsetHeight;
    } else if (y === _VerticalAnchors2.default.CENTER) {
      top = rect.top + rect.height / 2;
    } else if (y === _VerticalAnchors2.default.BOTTOM) {
      top = rect.bottom;
    }

    if (_this4._isCenteredDialog()) {
      var dialogRect = _this4._dialog.getBoundingClientRect();
      left -= dialogRect.left;
      top -= dialogRect.top;
    }

    var style = {};
    if (top) {
      style.top = top;
    }

    if (left) {
      style.left = left;
    }

    return style;
  };

  this._manageFixedToListener = function (fixedTo, add) {
    var listener = (add ? 'add' : 'remove') + 'EventListener';
    if (fixedTo !== window && (fixedTo.x || fixedTo.y)) {
      var x = fixedTo.x,
          y = fixedTo.y;

      if (x) {
        x[listener]('scroll', _this4._handleScroll);
      } else {
        window[listener]('scroll', _this4._handleScroll);
      }

      if (y) {
        y[listener]('scroll', _this4._handleScroll);
      } else if (!x) {
        // Only add the window event listener once
        window[listener]('scroll', _this4._handleScroll);
      }

      if (y && y !== window && x && x !== window) {
        window[listener]('scroll', _this4._handleScroll);
      }
    } else {
      fixedTo[listener]('scroll', _this4._handleScroll);

      if (fixedTo !== window) {
        window[listener]('scroll', _this4._handleScroll);
      }
    }
  };

  this._manageWindowResizeListener = function (enabled) {
    if (_this4._windowResizeTimeout) {
      clearTimeout(_this4._windowResizeTimeout);
      _this4._windowResizeTimeout = null;
    }

    if (enabled) {
      // add a 2 second delay before watching resize events since Android soft keyboards trigger a resize event.
      _this4._windowResizeTimeout = setTimeout(function () {
        _this4._windowResizeTimeout = null;
        window.addEventListener('resize', _this4._handleWindowResize);
      }, 2000);
    } else {
      window.removeEventListener('resize', _this4._handleWindowResize);
    }
  };

  this._mergeStyles = function (style) {
    var _props4 = _this4.props,
        minLeft = _props4.minLeft,
        minRight = _props4.minRight,
        minBottom = _props4.minBottom,
        fillViewportWidth = _props4.fillViewportWidth,
        fillViewportHeight = _props4.fillViewportHeight;

    if (fillViewportWidth) {
      style.left = minLeft;
      style.right = minRight;
    } else {
      if (style.left) {
        style.left = Math.max(minLeft, style.left);
      }

      if (style.right) {
        style.right = Math.max(minRight, style.right);
      }
    }

    if (fillViewportHeight) {
      style.bottom = minBottom;
      style.maxHeight = 'none';
    } else {
      // These styles are only created when filling the viewport height, so clear
      // them out again
      style.bottom = null;
      style.maxHeight = null;
    }

    return _extends({}, _this4.state.styles, style, _react2.default.Children.only(_this4.props.children).props.style);
  };

  this._init = function (fixedTo, anchor, sameWidth, centered, rect) {
    if (_this4._child) {
      // The init function can be called again if the user quickly toggles the layover. If that
      // is the case, we want the styles that were set after the _positionChild _attemptFix.
      return;
    }

    var height = rect.height,
        width = rect.width;
    var top = rect.top,
        left = rect.left,
        right = rect.right;

    var x = void 0;
    var y = void 0;
    if (_this4._dialog) {
      var scroll = (0, _getScroll2.default)(_this4._dialog);
      x = scroll.x;
      y = scroll.y;

      if (_this4._isCenteredDialog()) {
        var dialogRect = _this4._dialog.getBoundingClientRect();
        left -= dialogRect.left;
        top -= dialogRect.top;
        right -= dialogRect.right;
      }
    } else if (fixedTo !== window && (fixedTo.y || fixedTo.x)) {
      x = (0, _getScroll2.default)(fixedTo.x || window).x;
      y = (0, _getScroll2.default)(fixedTo.y || window).y;
    } else {
      var _scroll = (0, _getScroll2.default)(fixedTo);
      x = _scroll.x;
      y = _scroll.y;
    }

    _this4._initialX = x;
    _this4._initialY = y;
    _this4._initialLeft = left;
    _this4._initialTop = top;

    if (anchor.x === _HorizontalAnchors2.default.INNER_RIGHT) {
      _this4._initialLeft = left + width;
    } else if (anchor.x === _HorizontalAnchors2.default.RIGHT) {
      _this4._initialLeft = right;
    }

    if (!centered) {
      _this4._lastYFix = anchor.y === _VerticalAnchors2.default.TOP ? 'bottom' : 'top';
    } else {
      // Centered is not fixable
      _this4._lastYFix = null;
    }
    if (anchor.x === _HorizontalAnchors2.default.LEFT || anchor.x === _HorizontalAnchors2.default.INNER_LEFT) {
      _this4._lastXFix = 'right';
    } else if (anchor.x === _HorizontalAnchors2.default.RIGHT || anchor.x === _HorizontalAnchors2.default.INNER_RIGHT) {
      _this4._lastXFix = 'left';
    } else {
      // Can't fix others
      _this4._lastXFix = null;
    }

    if (anchor.y === _VerticalAnchors2.default.BOTTOM) {
      _this4._initialTop = top + height;
    }

    if (fixedTo !== window && !fixedTo.y && !fixedTo.x) {
      var _scroll2 = (0, _getScroll2.default)(window);
      _this4._initialWinX = _scroll2.x;
      _this4._initialWinY = _scroll2.y;
    }

    var styles = _this4._mergeStyles({
      left: _this4._initialLeft,
      top: _this4._initialTop,
      transformOrigin: undefined,
      width: sameWidth ? width : undefined
    });

    _this4.setState({ styles: styles });
  };

  this._reset = function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this4.props,
        fixedTo = _ref2.fixedTo;

    // Reset all the bookkeeping variables for a fresh start on re-visible
    _this4._lastXFix = null;
    _this4._lastYFix = null;
    _this4._initialX = null;
    _this4._initialY = null;
    _this4._initialTop = null;
    _this4._initialLeft = null;

    if (!_this4._inFixed) {
      if (_this4._dialog) {
        _this4._manageFixedToListener(_this4._dialog, false);
      }

      _this4._manageFixedToListener(fixedTo, false);
    }
  };

  this._setContainer = function (container) {
    _this4._container = (0, _reactDom.findDOMNode)(container);
    _this4._toggle = null;
    if (!_this4._container) {
      return;
    }

    var _props5 = _this4.props,
        toggleQuery = _props5.toggleQuery,
        onContextMenu = _props5.onContextMenu;

    if (typeof toggleQuery === 'function') {
      _this4._toggle = toggleQuery();
    } else if (typeof toggleQuery === 'string') {
      _this4._toggle = _this4._container.querySelector(toggleQuery);
    } else {
      _this4._toggle = toggleQuery;
    }

    if (!_this4._toggle && !onContextMenu && process.env.NODE_ENV !== 'production') {
      var error = new Error('Unable to find a toggle component with the provided `toggleQuery` and `toggle` element. \n' + ('`toggleQuery`: `' + toggleQuery + '`'));
      error.toggleQuery = toggleQuery;
      error.toggle = _this4.props.toggle;

      throw error;
    }

    var node = _this4._container;
    while (node) {
      var fixed = window.getComputedStyle(node).position === 'fixed';
      if (fixed && node.className.match(/md-dialog--(full-page|centered)/)) {
        _this4._dialog = node;
        return;
      } else if (fixed && !node.classList.contains('md-layover-child')) {
        _this4._inFixed = true;
        return;
      }

      node = node.offsetParent;
    }
  };

  this._initialFix = function () {
    // Need to make a clone that disables any transitions to calculate positioning stuff
    var clone = _this4._child.cloneNode(true);
    clone.style.webkitTransform = 'none';
    clone.style.transfrom = 'none';
    clone.style.webkitTransition = 'none';
    clone.style.transition = 'none';

    _this4._child.parentNode.appendChild(clone);
    var vp = (0, _viewport2.default)(clone);
    var childHeight = clone.offsetHeight,
        childWidth = clone.offsetWidth;

    _this4._child.parentNode.removeChild(clone);

    if (vp === true || !_this4._toggle || !_this4._child) {
      return;
    }

    var _getAnchor2 = _this4._getAnchor(_this4.props),
        x = _getAnchor2.x,
        y = _getAnchor2.y;

    var toggleHeight = void 0;
    var toggleWidth = void 0;
    if (_this4._contextRect) {
      toggleHeight = _this4._contextRect.height;
      toggleWidth = _this4._contextRect.width;
    } else {
      toggleHeight = _this4._toggle.offsetHeight;
      toggleWidth = _this4._toggle.offsetWidth;
    }

    var addToTop = 0;
    var addToLeft = 0;

    // Android devices will never get this far because they consider the keyboard as part
    // of the viewport, iOS will and cause it to be a giant negative number. *sigh*
    // Prevent any additional vertical positioning for iOS
    if (!_this4.props.fillViewportHeight && (!vp.top || !vp.bottom)) {
      var multiplier = vp.top ? -1 : 1;
      if (!vp.bottom && y === _VerticalAnchors2.default.OVERLAP) {
        addToTop += toggleHeight;
      } else if (y === _VerticalAnchors2.default.TOP || y === _VerticalAnchors2.default.BOTTOM) {
        addToTop += multiplier * toggleHeight;
      }

      addToTop += multiplier * childHeight;

      _this4._lastYFix = vp.top ? 'bottom' : 'top';
    }

    if (!_this4.props.fillViewportWidth && x !== _HorizontalAnchors2.default.CENTER && (!vp.left || !vp.right)) {
      if (!vp.left && x === _HorizontalAnchors2.default.LEFT) {
        addToLeft += toggleWidth + childWidth;
        _this4._lastXFix = 'left';
      } else if (!vp.left && x === _HorizontalAnchors2.default.INNER_LEFT) {
        addToLeft += toggleWidth;
        _this4._lastXFix = 'left';
      } else if (!vp.right && x === _HorizontalAnchors2.default.RIGHT) {
        addToLeft -= toggleWidth + childWidth;
        _this4._lastXFix = 'right';
      } else if (!vp.right && x === _HorizontalAnchors2.default.INNER_RIGHT) {
        addToLeft -= toggleWidth;
        _this4._lastXFix = 'right';
      }
    }

    if (addToTop !== 0 || addToLeft !== 0) {
      _this4._initialTop += addToTop;
      _this4._initialLeft += addToLeft;

      _this4.setState({ styles: _this4._mergeStyles({ top: _this4._initialTop, left: _this4._initialLeft }) });
    }
  };

  this._fixateChild = function (child) {
    _this4._child = (0, _reactDom.findDOMNode)(child);

    if (_this4._child !== null) {
      _this4._childComponent = _react2.default.Children.only(_this4.props.children);

      // If child also has a ref callback, simulate the same thing
      if (typeof _this4._childComponent.ref === 'function') {
        _this4._childComponent.ref(child);
      }

      if (_this4.props.simplified || !_this4._child || !_this4._toggle && !_this4._contextRect) {
        return;
      }

      if (_this4._dialog && _this4._dialog.classList.contains('md-dialog--centered')) {
        return;
      }

      _this4._manageWindowResizeListener(true);
      _this4._positionChild();
    } else if (_this4._childComponent && typeof _this4._childComponent.ref === 'function') {
      _this4._childComponent.ref(child);
    }
  };

  this._positionChild = function () {
    var centered = _this4.props.centered;

    var anchor = _this4._getAnchor(_this4.props);
    var rect = _this4._contextRect || _this4._toggle.getBoundingClientRect();
    _this4._height = rect.height;
    _this4._width = rect.width;
    var styles = _this4._createStyles(anchor, centered, _this4._child, rect);
    if (styles.top || styles.left) {
      _this4._initialLeft = styles.left || _this4._initialLeft;
      _this4._initialTop = styles.top || _this4._initialTop;
      _this4.setState({ styles: _this4._mergeStyles(styles) }, _this4._initialFix);
    } else {
      _this4._initialFix();
    }
  };

  this._handleResize = function () {
    if (_this4.props.visible) {
      _this4._positionChild();
    }
  };

  this._handleScroll = function (e) {
    if (!_this4.props.repositionOnScroll) {
      _this4._manageFixedToListener(_this4.props.fixedTo, false);
      _this4.props.onClose(e);
    }

    if (!_this4._ticking) {
      requestAnimationFrame(function () {
        return _this4._handleTick(e);
      });
    }

    _this4._ticking = true;
  };

  this._handleTick = function (e) {
    var _props6 = _this4.props,
        fixedTo = _props6.fixedTo,
        xThreshold = _props6.xThreshold,
        yThreshold = _props6.yThreshold;

    var vp = (0, _viewport2.default)(_this4._child);
    if (vp !== true && vp.left && vp.right) {
      var fixed = !_this4._contextRect && _this4._attemptFix(vp);
      if (!fixed) {
        _this4.props.onClose(e);
        _this4._ticking = false;
      }

      return;
    } else if ((0, _isOutOfBounds2.default)(fixedTo, _this4._child, _this4._toggle, yThreshold, xThreshold)) {
      _this4.props.onClose(e);
      _this4._ticking = false;
      return;
    }

    var x = void 0;
    var y = void 0;
    if (_this4._dialog) {
      var scroll = (0, _getScroll2.default)(_this4._dialog);
      x = scroll.x;
      y = scroll.y;
    } else if (fixedTo !== window && (fixedTo.x || fixedTo.y)) {
      x = (0, _getScroll2.default)(fixedTo.x || window).x;
      y = (0, _getScroll2.default)(fixedTo.y || window).y;
    } else {
      var _scroll3 = (0, _getScroll2.default)(fixedTo);
      x = _scroll3.x;
      y = _scroll3.y;
    }

    var winX = void 0;
    var winY = void 0;
    // When using the additional fixedTo stuff, need to also keep track of the entire
    // window's scrolling..
    if (fixedTo !== window && !fixedTo.x && !fixedTo.y) {
      var _scroll4 = (0, _getScroll2.default)(window);
      winX = _scroll4.x;
      winY = _scroll4.y;
    }

    var styles = _this4.state.styles;
    var left = styles.left,
        top = styles.top;

    if (_this4._initialX !== x) {
      left = _this4._initialX - x + _this4._initialLeft;
    }

    if (winX && _this4._initialWinX !== winX) {
      left = _this4._initialWinX - winX + _this4._initialX;
    }

    if (_this4._initialY !== y) {
      top = _this4._initialY - y + _this4._initialTop;
    }

    if (winY && _this4._initialWinY !== winY) {
      top = _this4._initialWinY - winY + _this4._initialTop + (_this4._initialY - y);
    }

    if (styles.top !== top || styles.left !== left) {
      _this4.setState({ styles: _this4._mergeStyles({ left: left, top: top }) }, function () {
        _this4._ticking = false;
      });
    } else {
      _this4._ticking = false;
    }
  };

  this._handleOutsideClick = function (e) {
    if (_this4._contextRect && _this4._child && !_this4._child.contains(e.target) || _this4._container && !_this4._container.contains(e.target)) {
      _this4.props.onClose(e);
    }
  };

  this._handleWindowResize = function (e) {
    var _props7 = _this4.props,
        onClose = _props7.onClose,
        repositionOnResize = _props7.repositionOnResize;

    if (repositionOnResize) {
      _this4._handleResize();
    } else {
      onClose(e);
      _this4._manageWindowResizeListener(false);
    }
  };

  this._attemptFix = function (vp) {
    var _getAnchor3 = _this4._getAnchor(_this4.props),
        x = _getAnchor3.x,
        y = _getAnchor3.y;

    var centered = x === _HorizontalAnchors2.default.CENTER && y === _VerticalAnchors2.default.CENTER && _this4.props.centered;
    if (centered || _this4._lastYFix === 'top' && !vp.top || _this4._lastYFix === 'bottom' && !vp.bottom) {
      return false;
    }

    var toggleTop = _this4._toggle.getBoundingClientRect().top;
    var toggleHeight = _this4._toggle.offsetHeight;
    var childHeight = _this4._child.offsetHeight;

    // Can;t fix if the child can't fit on the page based on the toggle's position

    if (toggleTop + toggleHeight + childHeight > window.innerHeight) {
      return false;
    }

    var _child$getBoundingCli = _this4._child.getBoundingClientRect(),
        top = _child$getBoundingCli.top;

    var newTop = _this4._initialTop;
    var addToTop = childHeight * (vp.top ? -1 : 1);
    if (y === _VerticalAnchors2.default.OVERLAP) {
      addToTop += (vp.top ? 1 : -1) * toggleHeight;
    } else if (y === _VerticalAnchors2.default.TOP || y === _VerticalAnchors2.default.BOTTOM) {
      addToTop += (_this4._lastYFix === 'top' ? -1 : 1) * toggleHeight;
    }

    if (addToTop !== 0) {
      newTop = top + addToTop;
      _this4._lastYFix = vp.top ? 'bottom' : 'top';
    }

    if (newTop !== _this4._initialTop) {
      _this4._initialTop = newTop;
      var fixedTo = _this4.props.fixedTo;

      var scrollEl = fixedTo;
      if (fixedTo !== window && (fixedTo.y || fixedTo.x)) {
        scrollEl = fixedTo.y || window;
      }

      _this4._initialY = (0, _getScroll2.default)(scrollEl).y;

      _this4.setState({ styles: _this4._mergeStyles({ top: _this4._initialTop }) }, function () {
        _this4._ticking = false;
      });
      return true;
    }

    return false;
  };

  this._handleContextMenu = function (e) {
    var anchor = _this4._getAnchor(_this4.props);
    var _props8 = _this4.props,
        onContextMenu = _props8.onContextMenu,
        preventContextMenu = _props8.preventContextMenu,
        fixedTo = _props8.fixedTo,
        sameWidth = _props8.sameWidth,
        centered = _props8.centered,
        visible = _props8.visible;

    if (!onContextMenu) {
      return;
    }

    _this4._contextRect = (0, _getSelectedTextPosition2.default)(e);
    if (preventContextMenu && (!_this4._child || !_this4._child.contains(e.target))) {
      e.preventDefault();
    }

    onContextMenu(e);
    if (visible) {
      _this4._init(fixedTo, anchor, sameWidth, centered, _this4._contextRect);
    }
  };
};

exports.default = Layover;
//# sourceMappingURL=Layover.js.map