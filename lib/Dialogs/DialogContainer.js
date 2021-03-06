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

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _keyCodes = require('../constants/keyCodes');

var _CSSTransitionGroupTick = require('../constants/CSSTransitionGroupTick');

var _CSSTransitionGroupTick2 = _interopRequireDefault(_CSSTransitionGroupTick);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _toggleScroll = require('../utils/toggleScroll');

var _toggleScroll2 = _interopRequireDefault(_toggleScroll);

var _oneRequiredForA11y = require('../utils/PropTypes/oneRequiredForA11y');

var _oneRequiredForA11y2 = _interopRequireDefault(_oneRequiredForA11y);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Portal = require('../Helpers/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `DialogContainer` component is used for dynamically creating the `Dialog` with
 * transitions.
 */
var DialogContainer = function (_PureComponent) {
  _inherits(DialogContainer, _PureComponent);

  function DialogContainer(props) {
    _classCallCheck(this, DialogContainer);

    var _this = _possibleConstructorReturn(this, (DialogContainer.__proto__ || Object.getPrototypeOf(DialogContainer)).call(this, props));

    _initialiseProps.call(_this);

    var visible = typeof props.isOpen !== 'undefined' ? props.isOpen : props.visible;
    var dialogVisible = visible && !props.defaultVisibleTransitionable;

    _this.state = {
      active: visible && !props.fullPage,
      portalVisible: visible,
      dialogVisible: dialogVisible
    };
    return _this;
  }
  /* eslint-disable max-len */


  _createClass(DialogContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.isOpen && !this.props.visible) {
        return;
      }

      this._mountDialog(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var visible = typeof nextProps.isOpen !== 'undefined' ? nextProps.isOpen : nextProps.visible;
      if (this.props.isOpen === visible || this.props.visible === visible) {
        return;
      }

      var el = (0, _getField2.default)(this.props, this.context, 'renderNode') || window;
      var pageX = el.scrollX,
          pageY = el.scrollY;

      if (typeof el.scrollTop !== 'undefined' && typeof el.scrollLeft !== 'undefined') {
        pageX = el.scrollLeft;
        pageY = el.scrollTop;
      } else if (typeof el.scrollY !== 'undefined' && typeof el.scrollX !== 'undefined') {
        pageX = el.scrollX;
        pageY = el.scrollY;
      }

      this._pageX = pageX;
      this._pageY = pageY;

      if (this._inTimeout) {
        clearTimeout(this._inTimeout);
        this._inTimeout = null;
      }

      if (visible) {
        this._activeElement = document.activeElement;
        this._mountPortal(nextProps);
      } else {
        this.setState({ dialogVisible: false, active: false });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props,
          visible = _props.visible,
          closeOnEsc = _props.closeOnEsc,
          modal = _props.modal;

      var escapable = !modal && closeOnEsc;
      var prevEscapable = !prevProps.modal && prevProps.closeOnEsc;

      // Only going to support visible here since it was not implemented before.
      if (visible === prevProps.visible && escapable === prevEscapable) {
        return;
      }

      var add = false;
      var remove = false;

      if (escapable !== prevEscapable) {
        add = visible && escapable;
        remove = !visible || prevEscapable && !escapable;
      } else if (escapable) {
        add = visible;
        remove = !visible;
      }

      if (add) {
        window.addEventListener('keydown', this._handleEscClose);
      } else if (remove) {
        window.removeEventListener('keydown', this._handleEscClose);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.isOpen || this.props.visible) {
        (0, _toggleScroll2.default)(false);
      }

      if (this.props.visible && this.props.closeOnEsc && !this.props.modal) {
        window.removeEventListener('keydown', this._handleEscClose);
      }

      if (this._inTimeout) {
        clearTimeout(this._inTimeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          active = _state.active,
          dialogVisible = _state.dialogVisible,
          portalVisible = _state.portalVisible;

      var _props2 = this.props,
          style = _props2.style,
          className = _props2.className,
          dialogStyle = _props2.dialogStyle,
          dialogClassName = _props2.dialogClassName,
          modal = _props2.modal,
          fullPage = _props2.fullPage,
          component = _props2.component,
          transitionEnterTimeout = _props2.transitionEnterTimeout,
          transitionLeaveTimeout = _props2.transitionLeaveTimeout,
          lastChild = _props2.lastChild,
          portal = _props2.portal,
          propVisible = _props2.visible,
          propRenderNode = _props2.renderNode,
          closeOnEsc = _props2.closeOnEsc,
          onShow = _props2.onShow,
          onHide = _props2.onHide,
          disableScrollLocking = _props2.disableScrollLocking,
          defaultVisibleTransitionable = _props2.defaultVisibleTransitionable,
          close = _props2.close,
          isOpen = _props2.isOpen,
          actionLeft = _props2.actionLeft,
          actionRight = _props2.actionRight,
          transitionName = _props2.transitionName,
          transitionEnter = _props2.transitionEnter,
          transitionLeave = _props2.transitionLeave,
          props = _objectWithoutProperties(_props2, ['style', 'className', 'dialogStyle', 'dialogClassName', 'modal', 'fullPage', 'component', 'transitionEnterTimeout', 'transitionLeaveTimeout', 'lastChild', 'portal', 'visible', 'renderNode', 'closeOnEsc', 'onShow', 'onHide', 'disableScrollLocking', 'defaultVisibleTransitionable', 'close', 'isOpen', 'actionLeft', 'actionRight', 'transitionName', 'transitionEnter', 'transitionLeave']);

      var renderNode = (0, _getField2.default)(this.props, this.context, 'renderNode');
      var dialog = _react2.default.createElement(_Dialog2.default, _extends({
        key: 'dialog',
        style: dialogStyle,
        className: (0, _classnames2.default)('md-background--card', dialogClassName),
        ref: this._handleDialogMounting,
        centered: !fullPage,
        fullPage: fullPage
      }, props, {
        containerX: this._pageX,
        containerY: this._pageY,
        onLeave: this._unmountPortal
      }));

      var container = _react2.default.createElement(
        _CSSTransitionGroup2.default,
        {
          component: component,
          ref: this._setContainer,
          style: style,
          className: (0, _classnames2.default)('md-dialog-container', {
            'md-overlay': !fullPage,
            'md-overlay--active': !fullPage && active && propVisible,
            'md-pointer--hover': !fullPage && !modal && propVisible
          }, className),
          transitionName: 'md-dialog--' + (fullPage ? 'full-page' : 'centered'),
          transitionEnterTimeout: transitionEnterTimeout,
          transitionLeaveTimeout: transitionLeaveTimeout,
          tabIndex: -1,
          onClick: this._handleClick
        },
        dialogVisible ? dialog : null
      );

      if (!portal) {
        return portalVisible ? container : null;
      }

      return _react2.default.createElement(
        _Portal2.default,
        { visible: portalVisible, renderNode: renderNode, lastChild: lastChild },
        container
      );
    }
  }]);

  return DialogContainer;
}(_react.PureComponent);

DialogContainer.propTypes = {
  /**
   * An id to use for the `Dialog` once it has been opened. This is used for the
   * [dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_dialog_role).
   * This is used to generate an `id` for the `title` prop when it has been defined.
   */
  id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),
  /* eslint-enable max-len */

  /**
   * An optional accessibility prop to use when the `Dialog` is opened. This should be an id
   * pointing to some text that describes the content of the dialog. For accessibility
   * reasons, one of the following props must be defined:
   * - `title`
   * - `aria-describedby`
   * - `aria-labelledby`
   * - `aria-label`
   *
   * An example usage:
   *
   * ```js
   * <Dialog id="accessible-example" visible aria-describedby="accessible-content">
   *   <p id="accessible-content">This is some content that describes the dialog.</p>
   * </Dialog>
   * ```
   */
  'aria-describedby': (0, _oneRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]), 'title', 'aria-labelledby', 'aria-label'),

  /**
   * An optional accessibility prop to use when the `title` prop is not given. This should be
   * an id pointing to a `h` tag that labels the dialog.
   *
   * An example usage:
   *
   * ```js
   * <Dialog visible id="accessible-example" aria-labelledby="accessible-dialog-label">
   *   <h2 id="accessible-dialog-label">Some Accessible Dialog</h2>
   * </Dialog>
   * ```
   */
  'aria-labelledby': _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional accessibility prop to use when the `title` and `aria-labelledby` props are
   * not defined. This should be a string that describes what is in the `Dialog`.
   *
   * An example usage:
   *
   * ```js
   * <Dialog visible id="accessible-example" aria-label="Some Accessible Dialog">
   *   <p>Lorem Ipsum</p>
   * </Dialog>
   * ```
   */
  'aria-label': _propTypes2.default.string,

  /**
   * An optional style to apply to the dialog's container.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the dialog's container.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the dialog itself when the `visible` prop is `true`.
   */
  dialogStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the dialog itself when the `visible` prop is `true`.
   */
  dialogClassName: _propTypes2.default.string,

  /**
   * An optional styke to apply to the title.
   */
  titleStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the title.
   */
  titleClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the footer. This is used when the `actions`
   * prop is defined.
   */
  footerStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the footer. This is used when the `actions`
   * prop is defined.
   */
  footerClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the dialog's content.
   */
  contentStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the dialog's content.
   */
  contentClassName: _propTypes2.default.string,

  /**
   * The component to render the dialog's container in.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

  /**
   * The component to render the dialog's content in.
   */
  contentComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

  /**
   * The content to display in the dialog once open.
   */
  children: _propTypes2.default.node,

  /**
   * A single action or a list of actions to display in the dialog. This can either be a list
   * of `FlatButton` props or `<Button flat {...props} />` elements.
   */
  actions: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object]))]),

  /**
   * Boolean if the `Dialog` is current visible.
   */
  visible: _propTypes2.default.bool.isRequired,

  /**
   * An optional function to call when the `visible` prop is changed from `false` to `true`.
   */
  onShow: _propTypes2.default.func,

  /**
   * A function to call that will close the dialog. This is required when the `modal` and `fullPage`
   * props are not `true`.
   */
  onHide: function onHide(props, propName) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var validator = _propTypes2.default.func;
    if (!props.modal && !props.fullPage) {
      validator = validator.isRequired;
    }

    return validator.apply(undefined, [props, propName].concat(args));
  },

  /**
   * Boolean if the dialog should behave like a modal. This means that the dialog can only
   * be closed by clicking on an action instead of also clicking on the overlay.
   */
  modal: _propTypes2.default.bool,

  /**
   * Boolean if the dialog should be displayed as a full page dialog.
   */
  fullPage: function fullPage(props, propName, componentName) {
    for (var _len2 = arguments.length, args = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      args[_key2 - 3] = arguments[_key2];
    }

    var componentNameSafe = componentName || '<<anonymous>>';
    var err = _propTypes2.default.bool.apply(_propTypes2.default, [props, propName, componentName].concat(args));

    if (!err && props[propName] && typeof props.title !== 'undefined') {
      err = new Error('You provided a `title` ' + location + ' to the `' + componentNameSafe + '` when `fullPage` ' + 'has been set to true. A title for a full page dialog should be rendered as a child instead.');
    }

    return err;
  },

  /**
   * An optional pageX location to use when rendering a full page dialog. This is used to set the location
   * the dialog should appear from.
   */
  pageX: _propTypes2.default.number,

  /**
   * An optional pageY location to use when rendering a full page dialog. This is used to set the location
   * the dialog should appear from.
   */
  pageY: _propTypes2.default.number,

  /**
   * @see {@link Helpers/FocusContainer#additionalFocusKeys}
   */
  additionalFocusKeys: _Dialog2.default.propTypes.additionalFocusKeys,

  /**
   * @see {@link Helpers/FocusContainer#initialFocus}
   */
  initialFocus: _Dialog2.default.propTypes.initialFocus,

  /**
   * @see {@link Helpers/FocusContainer#focusOnMount}
   */
  focusOnMount: _Dialog2.default.propTypes.focusOnMount,

  /**
   * @see {@link Helpers/FocusContainer#containFocus}
   */
  containFocus: _Dialog2.default.propTypes.containFocus,

  /**
   * The transition enter timeout for the dialog.
   */
  transitionEnterTimeout: _propTypes2.default.number.isRequired,

  /**
   * The transition leave timeout for the dialog.
   */
  transitionLeaveTimeout: _propTypes2.default.number.isRequired,

  /**
   * Boolean if the dialog should be closable by pressing the escape key.
   * This will always be considered `false` of the `modal` props is `true`.
   */
  closeOnEsc: _propTypes2.default.bool,

  /**
   * Boolean if the Portal's functionality of rendering in a separate react tree should be applied
   * to the dialog.
   *
   * @see {@link Helpers/Portal}
   */
  portal: _propTypes2.default.bool,

  /**
   * Since the `Dialog` uses the `Portal` component, you can pass an optional HTML Node to render
   * the dialog in instead of the `document.body`.
   */
  renderNode: _propTypes2.default.object,

  /**
   * Boolean if the dialog should be rendered as the last child in the `renderNode` or `body` instead
   * of as the first.
   */
  lastChild: _propTypes2.default.bool,

  /**
   * An optional title for the dialog.
   */
  title: _propTypes2.default.node,

  /**
   * Boolean if the dialog should animate into view if it is constructed with `visible` enabled.
   *
   * This basically means that if the `Dialog` has `visible` enabled on initial page load, does it animate?
   * In some cases, it can also mean if the `Dialog` is added to the render tree with `visible` enabled,
   * does it animate?
   */
  defaultVisibleTransitionable: _propTypes2.default.bool,

  /**
   * Boolean if the Dialog should no longer try to prevent the parent container from scrolling while visible.
   * In most cases, this will attempt to prevent the main window scrolling. If this dialog is nested in another
   * dialog, it will attempt to prevent the parent dialog from scrolling.
   */
  disableScrollLocking: _propTypes2.default.bool,

  /**
   * Boolean if the dialog should automatically try to determine if the content
   * should be padded. It will be padded if the dialog does not contain a `List`.
   */
  autopadContent: _propTypes2.default.bool,

  /**
   * Boolean if the dialog content's size should automatically be resized to overflow
   * correctly when there is a lot of content. This will calculate and apply some `maxHeight`
   * to the `contentStyle`.
   */
  autosizeContent: _propTypes2.default.bool,

  /**
   * An optional height to apply to the dialog. This is used if it is easier to just apply height/width
   * with for specific dialogs instead of in CSS.
   *
   * **This prop should not be used if the `fullPage` prop is enabled.**
   *
   * @see {@link #fullPage}
   * @see {@link #width}
   */
  height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional width to apply to the dialog. This is used if it is easier to just apply height/width
   * with for specific dialogs instead of in CSS.
   *
   * **This prop should not be used if the `fullPage` prop is enabled.**
   *
   * @see {@link #fullPage}
   * @see {@link #height}
   */
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * Boolean if the actions should be stacked on top of each other. If this value is `undefined`, it will
   * automatically attempt to guess if the items should be stacked.
   */
  stackedActions: _propTypes2.default.bool,

  isOpen: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `visible` instead'),
  transitionName: (0, _deprecated2.default)(_propTypes2.default.string, 'The transition name will be managed by the component'),
  transitionEnter: (0, _deprecated2.default)(_propTypes2.default.bool, 'The transition will always be enforced'),
  transitionLeave: (0, _deprecated2.default)(_propTypes2.default.bool, 'The transition will always be enforced'),
  actionLeft: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `fullPage` prop instead'),
  actionRight: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `fullPage` prop instead'),
  close: (0, _deprecated2.default)(_propTypes2.default.func, 'Use `onHide` instead')
};
DialogContainer.defaultProps = {
  autopadContent: true,
  autosizeContent: true,
  component: 'span',
  closeOnEsc: true,
  contentComponent: 'section',
  focusOnMount: true,
  transitionEnterTimeout: 300,
  transitionLeaveTimeout: 300,
  defaultVisibleTransitionable: false
};
DialogContainer.contextTypes = {
  renderNode: _propTypes2.default.object
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._setContainer = function (container) {
    if (container !== null) {
      _this2._container = (0, _reactDom.findDOMNode)(container);
    }
  };

  this._handleEscClose = function (e) {
    if ((e.which || e.keyCode) === _keyCodes.ESC) {
      (_this2.props.onHide || _this2.props.close)(e);
    }
  };

  this._mountPortal = function (props) {
    _this2._mountDialog(props);
    _this2.setState({ portalVisible: true });
  };

  this._mountDialog = function (props) {
    var fullPage = props.fullPage,
        onShow = props.onShow;

    _this2._inTimeout = setTimeout(function () {
      _this2._inTimeout = fullPage ? null : setTimeout(function () {
        _this2._inTimeout = null;
        _this2.setState({ active: true });
      }, _CSSTransitionGroupTick2.default);
      _this2.setState({ dialogVisible: true }, onShow);
    }, _CSSTransitionGroupTick2.default);
  };

  this._unmountPortal = function () {
    _this2.setState({ portalVisible: false });
  };

  this._handleClick = function (e) {
    var visible = typeof _this2.props.isOpen !== 'undefined' ? _this2.props.isOpen : _this2.props.visible;
    if (_this2.props.modal || !visible || e.target !== _this2._container) {
      return;
    }

    (_this2.props.onHide || _this2.props.close)(e);
  };

  this._handleDialogMounting = function (dialog) {
    var disableScrollLocking = _this2.props.disableScrollLocking;

    if (dialog === null) {
      if (_this2._activeElement) {
        _this2._activeElement.focus();
      }

      if (!disableScrollLocking) {
        (0, _toggleScroll2.default)(false, _this2.scrollEl);
      }

      _this2._activeElement = null;
    } else {
      var container = document.getElementById(_this2.props.id);
      if (!container || disableScrollLocking) {
        return;
      }

      var el = (0, _getField2.default)(_this2.props, _this2.context, 'renderNode');
      var node = container.parentNode;
      while (node && node.classList && !el) {
        if (node.classList.contains('md-dialog')) {
          el = node;
        }

        node = node.parentNode;
      }

      _this2.scrollEl = el;
      (0, _toggleScroll2.default)(true, el);
    }
  };
};

exports.default = DialogContainer;
//# sourceMappingURL=DialogContainer.js.map