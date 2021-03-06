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

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _oneRequiredForA11y = require('../utils/PropTypes/oneRequiredForA11y');

var _oneRequiredForA11y2 = _interopRequireDefault(_oneRequiredForA11y);

var _FocusContainer = require('../Helpers/FocusContainer');

var _FocusContainer2 = _interopRequireDefault(_FocusContainer);

var _ResizeObserver = require('../Helpers/ResizeObserver');

var _ResizeObserver2 = _interopRequireDefault(_ResizeObserver);

var _Paper = require('../Papers/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _DialogTitle = require('./DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _DialogFooter = require('./DialogFooter');

var _DialogFooter2 = _interopRequireDefault(_DialogFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DIFF_KEYS = ['style', 'height', 'width', 'contentStyle'];

/**
 * The `Dialog` is just a static component for creating dialogs. Dialogs
 * seemed like they could be used outside of the `DialogContainer` component,
 * so it was exposed as well. In *most* cases, you will still want to use
 * the `DialogContainer` component.
 */

var Dialog = function (_PureComponent) {
  _inherits(Dialog, _PureComponent);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this));

    _initialiseProps.call(_this);

    var height = props.height,
        width = props.width;

    var styles = props.style;
    if (height || width) {
      styles = styles || {};
      styles = _extends({ height: height, width: width }, styles);
    }

    _this.state = {
      styles: styles,
      contentStyles: props.contentStyle,
      contentPadded: false
    };
    return _this;
  }

  _createClass(Dialog, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { renderNode: this._renderNode };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          pageX = _props.pageX,
          pageY = _props.pageY;

      if (!pageX || !pageY) {
        return;
      }

      this.setState({ styles: this._getStyles(this.props) });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.onOpen) {
        this.props.onOpen();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (DIFF_KEYS.some(function (key) {
        return nextProps[key] !== _this2.props[key];
      })) {
        this.setState({
          styles: this._getStyles(nextProps),
          contentStyles: _extends({}, this.state.contentStyles, nextProps.contentStyle)
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.onLeave) {
        this.props.onLeave();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          contentPadded = _state.contentPadded,
          styles = _state.styles,
          contentStyles = _state.contentStyles;

      var _props2 = this.props,
          id = _props2.id,
          className = _props2.className,
          titleStyle = _props2.titleStyle,
          titleClassName = _props2.titleClassName,
          footerStyle = _props2.footerStyle,
          footerClassName = _props2.footerClassName,
          contentClassName = _props2.contentClassName,
          title = _props2.title,
          Content = _props2.contentComponent,
          contentProps = _props2.contentProps,
          actions = _props2.actions,
          children = _props2.children,
          fullPage = _props2.fullPage,
          centered = _props2.centered,
          autopadContent = _props2.autopadContent,
          paddedContent = _props2.paddedContent,
          autosizeContent = _props2.autosizeContent,
          stackedActions = _props2.stackedActions,
          style = _props2.style,
          contentStyle = _props2.contentStyle,
          pageX = _props2.pageX,
          pageY = _props2.pageY,
          containerX = _props2.containerX,
          containerY = _props2.containerY,
          onOpen = _props2.onOpen,
          onLeave = _props2.onLeave,
          height = _props2.height,
          width = _props2.width,
          props = _objectWithoutProperties(_props2, ['id', 'className', 'titleStyle', 'titleClassName', 'footerStyle', 'footerClassName', 'contentClassName', 'title', 'contentComponent', 'contentProps', 'actions', 'children', 'fullPage', 'centered', 'autopadContent', 'paddedContent', 'autosizeContent', 'stackedActions', 'style', 'contentStyle', 'pageX', 'pageY', 'containerX', 'containerY', 'onOpen', 'onLeave', 'height', 'width']);

      var labelledBy = this.props['aria-labelledby'];

      var titleId = id + '-title';
      if (!labelledBy && title) {
        labelledBy = titleId;
      }

      var padDefined = typeof paddedContent !== 'undefined';
      var dialogChildren = fullPage ? children : [_react2.default.createElement(
        _DialogTitle2.default,
        {
          key: 'title',
          id: titleId,
          style: titleStyle,
          className: titleClassName
        },
        title
      ), _react2.default.createElement(
        Content,
        _extends({
          ref: !padDefined && autopadContent ? this._setContent : null,
          key: 'content'
        }, contentProps, {
          style: contentStyles,
          className: (0, _classnames2.default)('md-dialog-content', {
            'md-dialog-content--padded': padDefined ? paddedContent : contentPadded
          }, contentClassName)
        }),
        autosizeContent ? _react2.default.createElement(_ResizeObserver2.default, { watchHeight: true, watchWidth: true, onResize: this._handleContentResize }) : null,
        children
      ), _react2.default.createElement(_DialogFooter2.default, {
        key: 'footer',
        style: footerStyle,
        className: footerClassName,
        actions: actions,
        stacked: stackedActions
      })];

      return _react2.default.createElement(
        _Paper2.default,
        _extends({}, props, {
          id: id,
          component: _FocusContainer2.default,
          ref: this._setRenderNode,
          style: styles,
          className: (0, _classnames2.default)('md-dialog', {
            'md-dialog--full-page': fullPage,
            'md-dialog--centered': centered
          }, className),
          role: 'dialog',
          'aria-labelledby': labelledBy
        }),
        dialogChildren
      );
    }
  }]);

  return Dialog;
}(_react.PureComponent);

Dialog.propTypes = {
  /**
   * @see {@link Dialogs/DialogContainer#id}
   */
  id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

  /**
   * @see {@link Dialogs/DialogContainer#aria-describedby}
   */
  'aria-describedby': (0, _oneRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]), 'title', 'aria-labelledby', 'aria-label'),

  /**
   * @see {@link Dialogs/DialogContainer#aria-labelledby}
   */
  'aria-labelledby': _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * @see {@link Dialogs/DialogContainer#aria-label}
   */
  'aria-label': _propTypes2.default.string,

  /**
   * An optional style to apply to the dialog.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the dialog.
   */
  className: _propTypes2.default.string,

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
   * The component to render the content as. This is helpful if you would like to use
   * the CSSTransitionGroup. This really just saves a tiny bit of markup.
   *
   * ```js
   * <Dialog
   *   contentComponent={CSSTransitionGroup}
   *   contentProps={{
   *     transitionName: 'md-cross-fade',
   *     transitionLeave: false,
   *     transitionEnterTimeout: 150,
   *   }}
   * >
   *   {dynamicContent}
   * </Dialog>
   * ```
   */
  contentComponent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,

  /**
   * Any additional props to pass to the content component.
   */
  contentProps: _propTypes2.default.object,

  /**
   * An optional title to display in the dialog.
   */
  title: _propTypes2.default.node,

  /**
   * Any children to display in the content of the dialog.
   */
  children: _propTypes2.default.node,

  /**
   * A single action or a list of actions to display in the dialog. This can either be a list
   * of `FlatButton` props or `<Button flat {...props} />` elements.
   */
  actions: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object, _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.object]))]),

  /**
   * @see {@link Helpers/FocusContainer#additionalFocusKeys}
   */
  additionalFocusKeys: _FocusContainer2.default.propTypes.additionalFocusKeys,

  /**
   * @see {@link Helpers/FocusContainer#initialFocus}
   */
  initialFocus: _FocusContainer2.default.propTypes.initialFocus,

  /**
   * @see {@link Helpers/FocusContainer#focusOnMount}
   */
  focusOnMount: _FocusContainer2.default.propTypes.focusOnMount,

  /**
   * @see {@link Helpers/FocusContainer#containFocus}
   */
  containFocus: _FocusContainer2.default.propTypes.containFocus,

  /**
   * An optional x coordinate on the page that caused a full page dialog
   * to be created. This is really just used for a `transformOrigin` style.
   */
  pageX: _propTypes2.default.number,

  /**
   * An optional y coordinate on the page that caused a full page dialog
   * to be created. This is really just used for a `transformOrigin` style.
   */
  pageY: _propTypes2.default.number,

  /**
   * An optional x scroll position of the container holding the dialog. This
   * is really just used for a `transformOrigin` style on full page dialogs.
   */
  containerX: _propTypes2.default.number,

  /**
   * An optional y scroll position of the container holding the dialog. This
   * is really just used for a `transformOrigin` style on full page dialogs.
   */
  containerY: _propTypes2.default.number,

  /**
   * Boolean if the dialog should be rendered as a full page dialog.
   */
  fullPage: _propTypes2.default.bool,

  /**
   * The zDepth to use for the dialog.
   */
  zDepth: _propTypes2.default.number.isRequired,

  /**
   * An optional function to call when the dialog has been opened. This is
   * really just used for the `DialogContainer`.
   */
  onOpen: _propTypes2.default.func,

  /**
   * An optional function to call when the dialog has been closed. This is
   * really just used for the `DialogContainer`.
   */
  onLeave: _propTypes2.default.func,

  /**
   * Boolean if the dialog should be centered in the page.
   */
  centered: _propTypes2.default.bool,

  /**
   * Boolean if the content should be padded. This will take precedence
   * over the `autopadContent` prop. So if this is defined, that value
   * will be used instead of any thing that was was calculated in this
   * component.
   *
   * @see {@link #autopadContent}
   */
  paddedContent: _propTypes2.default.bool,

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
  stackedActions: _propTypes2.default.bool
};
Dialog.defaultProps = {
  autopadContent: true,
  autosizeContent: true,
  contentComponent: 'section',
  zDepth: 5
};
Dialog.childContextTypes = {
  renderNode: _propTypes2.default.object
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._getStyles = function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this3.props,
        pageX = _ref.pageX,
        containerX = _ref.containerX,
        pageY = _ref.pageY,
        containerY = _ref.containerY,
        height = _ref.height,
        width = _ref.width,
        style = _ref.style;

    return _extends({
      height: typeof height !== 'undefined' ? height : null,
      width: typeof width !== 'undefined' ? width : null,
      transformOrigin: pageX || pageY ? pageX - containerX + 'px ' + (pageY - containerY) + 'px' : null
    }, style);
  };

  this._setRenderNode = function (dialog) {
    _this3._renderNode = (0, _reactDom.findDOMNode)(dialog);
  };

  this._setContent = function (content) {
    if (content !== null) {
      _this3._content = (0, _reactDom.findDOMNode)(content);
      var contentPadded = _this3._content.querySelectorAll('.md-list').length === 0;

      _this3.setState({ contentPadded: contentPadded });
    }
  };

  this._handleContentResize = function (_ref2) {
    var scrollHeight = _ref2.scrollHeight,
        content = _ref2.el;

    var maxHeight = content.style.maxHeight;
    var dialog = content.parentNode;
    content.style.maxHeight = 'none';
    var title = _this3.props.title ? dialog.querySelector('.md-title--dialog') : null;
    var footer = _this3.props.actions ? dialog.querySelector('.md-dialog-footer') : null;

    var totalHeight = dialog.offsetHeight - (title ? title.offsetHeight : 0) - (footer ? footer.offsetHeight : 0);
    content.style.maxHeight = maxHeight;
    var equalHeight = totalHeight === scrollHeight;
    if (equalHeight) {
      var currentHeight = _this3.state.contentStyles && _this3.state.contentStyles.maxHeight || null;
      if (currentHeight && currentHeight !== scrollHeight) {
        _this3.setState({ contentStyles: _this3.props.contentStyle });
      }
    } else {
      _this3.setState({ contentStyles: _extends({ maxHeight: totalHeight }, _this3.props.contentStyle) });
    }
  };
};

exports.default = Dialog;
//# sourceMappingURL=Dialog.js.map