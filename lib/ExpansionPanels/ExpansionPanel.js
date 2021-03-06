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

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _themeColors = require('../utils/themeColors');

var _themeColors2 = _interopRequireDefault(_themeColors);

var _getCollapserStyles = require('../utils/getCollapserStyles');

var _getCollapserStyles2 = _interopRequireDefault(_getCollapserStyles);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _Paper = require('../Papers/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _AccessibleFakeButton = require('../Helpers/AccessibleFakeButton');

var _AccessibleFakeButton2 = _interopRequireDefault(_AccessibleFakeButton);

var _Collapse = require('../Helpers/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _getDeprecatedIcon = require('../FontIcons/getDeprecatedIcon');

var _getDeprecatedIcon2 = _interopRequireDefault(_getDeprecatedIcon);

var _PanelContent = require('./PanelContent');

var _PanelContent2 = _interopRequireDefault(_PanelContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LABEL_FONT_SIZE = 15;
var LINE_HEIGHT = 1.42857;
var SINGLE_LINE_HEIGHT = LABEL_FONT_SIZE * LINE_HEIGHT;

/**
 * The `ExpansionPanel` component needs to be used with the `ExpansionList`
 * component. The only reason is that the `ExpansionPanel` should really
 * be rendered as a table, but it was a bit hard to have a single component
 * dynamically rendering another row when expanded. It couldn't be in the
 * same row since the expanded content might not have the same columns.
 */

var ExpansionPanel = function (_PureComponent) {
  _inherits(ExpansionPanel, _PureComponent);

  function ExpansionPanel(props, context) {
    _classCallCheck(this, ExpansionPanel);

    var _this = _possibleConstructorReturn(this, (ExpansionPanel.__proto__ || Object.getPrototypeOf(ExpansionPanel)).call(this, props, context));

    _this._determineIfTwoLine = function () {
      var twoLine = false;
      Array.prototype.slice.call((0, _reactDom.findDOMNode)(_this).querySelectorAll('.md-panel-column')).some(function (el) {
        return twoLine = el.offsetHeight > SINGLE_LINE_HEIGHT;
      });

      _this.setState({ twoLine: twoLine });
    };

    _this._handleClick = function () {
      var expanded = !_this._isExpanded(_this.props, _this.state);
      if (_this.props.onExpandToggle) {
        _this.props.onExpandToggle(expanded);
      }

      if (typeof _this.props.expanded === 'undefined') {
        _this.setState({ expanded: expanded });
      }
    };

    _this._handleSave = function (e) {
      var _this$props = _this.props,
          onSave = _this$props.onSave,
          onExpandToggle = _this$props.onExpandToggle,
          closeOnSave = _this$props.closeOnSave;

      if (onSave) {
        onSave(e);
      }

      if (closeOnSave) {
        if (onExpandToggle) {
          onExpandToggle(false);
        }

        if (typeof _this.props.expanded === 'undefined') {
          _this.setState({ expanded: false });
        }
      }
    };

    _this._handleCancel = function (e) {
      var _this$props2 = _this.props,
          onCancel = _this$props2.onCancel,
          onExpandToggle = _this$props2.onExpandToggle,
          closeOnCancel = _this$props2.closeOnCancel;

      if (onCancel) {
        onCancel(e);
      }

      if (closeOnCancel) {
        if (onExpandToggle) {
          onExpandToggle(false);
        }

        if (typeof _this.props.expanded === 'undefined') {
          _this.setState({ expanded: false });
        }
      }
    };

    _this.state = {
      received: false,
      twoLine: false
    };

    if (typeof props.expanded === 'undefined') {
      _this.state.expanded = props.defaultExpanded;
    }
    return _this;
  }

  _createClass(ExpansionPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._determineIfTwoLine();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (process.env.NODE_ENV === 'development' && !this.state.received) {
        if (nextProps.columnWidths.length === 0) {
          // Hopefully a nice warning about fixing the missing props injected from ExpansionList
          /* eslint-disable no-console */
          console.error('The `ExpansionPanel` component expects the `columnWidths` prop to be injected from the ' + '`ExpansionList` component. It could be missing because:' + '\n - you have a wrapper component with extra functionality' + '\n - the `ExpansionPanel` is not a direct child of the `ExpansionList` component' + '\n\nYou can fix this by making sure to pass `this.props.focused` and `this.props.columnWidths` ' + 'within your wrapper component and making the `ExpansionPanel` a direct child of `ExpansionList`.');
        }

        this.setState({ received: true });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.label === prevProps.label && this.props.secondaryLabel === prevProps.secondaryLabel) {
        return;
      }

      this._determineIfTwoLine();
    }
  }, {
    key: '_isExpanded',
    value: function _isExpanded(props, state) {
      return typeof props.expanded === 'undefined' ? state.expanded : props.expanded;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          label = _props.label,
          secondaryLabel = _props.secondaryLabel,
          expandedSecondaryLabel = _props.expandedSecondaryLabel,
          children = _props.children,
          focused = _props.focused,
          columnWidths = _props.columnWidths,
          saveType = _props.saveType,
          saveLabel = _props.saveLabel,
          savePrimary = _props.savePrimary,
          saveSecondary = _props.saveSecondary,
          saveProps = _props.saveProps,
          cancelType = _props.cancelType,
          cancelLabel = _props.cancelLabel,
          cancelPrimary = _props.cancelPrimary,
          cancelSecondary = _props.cancelSecondary,
          cancelProps = _props.cancelProps,
          headerStyle = _props.headerStyle,
          headerClassName = _props.headerClassName,
          contentStyle = _props.contentStyle,
          contentClassName = _props.contentClassName,
          tabIndex = _props.tabIndex,
          overflown = _props.overflown,
          footer = _props.footer,
          footerChildren = _props.footerChildren,
          footerStyle = _props.footerStyle,
          footerClassName = _props.footerClassName,
          expandIconChildren = _props.expandIconChildren,
          expandIconClassName = _props.expandIconClassName,
          propAnimateContent = _props.animateContent,
          propExpanded = _props.expanded,
          propExpanderIcon = _props.expanderIcon,
          defaultExpanded = _props.defaultExpanded,
          closeOnSave = _props.closeOnSave,
          closeOnCancel = _props.closeOnCancel,
          onSave = _props.onSave,
          onCancel = _props.onCancel,
          onExpandToggle = _props.onExpandToggle,
          props = _objectWithoutProperties(_props, ['className', 'label', 'secondaryLabel', 'expandedSecondaryLabel', 'children', 'focused', 'columnWidths', 'saveType', 'saveLabel', 'savePrimary', 'saveSecondary', 'saveProps', 'cancelType', 'cancelLabel', 'cancelPrimary', 'cancelSecondary', 'cancelProps', 'headerStyle', 'headerClassName', 'contentStyle', 'contentClassName', 'tabIndex', 'overflown', 'footer', 'footerChildren', 'footerStyle', 'footerClassName', 'expandIconChildren', 'expandIconClassName', 'animateContent', 'expanded', 'expanderIcon', 'defaultExpanded', 'closeOnSave', 'closeOnCancel', 'onSave', 'onCancel', 'onExpandToggle']);

      var twoLine = this.state.twoLine;

      var expanded = this._isExpanded(this.props, this.state);
      var animateContent = (0, _getField2.default)(this.props, this.context, 'animateContent');

      var columns = _react.Children.map(expanded && expandedSecondaryLabel || secondaryLabel, function (panelLabel, i) {
        return _react2.default.createElement(
          'div',
          {
            style: _defineProperty({}, '' + (overflown ? 'width' : 'minWidth'), columnWidths[i + 1]),
            className: (0, _classnames2.default)('md-panel-column', {
              'md-panel-column--overflown': overflown
            }, (0, _themeColors2.default)({ text: true }))
          },
          panelLabel
        );
      });

      if (!Array.isArray(columns)) {
        columns = [columns];
      }

      columns.unshift(_react2.default.createElement(
        'div',
        {
          key: 'main-label',
          style: { minWidth: columnWidths[0] },
          className: (0, _classnames2.default)('md-panel-column', (0, _themeColors2.default)({ text: true }))
        },
        label
      ));

      var expanderIcon = (0, _getDeprecatedIcon2.default)(expandIconClassName, expandIconChildren, this.props.expanderIcon);
      expanderIcon = _react2.default.Children.only(expanderIcon);
      expanderIcon = _react2.default.cloneElement(expanderIcon, {
        className: (0, _getCollapserStyles2.default)({
          flipped: expanded
        }, 'md-expansion-panel__collapser md-cell--right', expanderIcon.props.className)
      });

      return _react2.default.createElement(
        _Paper2.default,
        _extends({}, props, {
          className: (0, _classnames2.default)('md-expansion-panel', {
            'md-expansion-panel--expanded': expanded
          }, className),
          'aria-expanded': expanded
        }),
        _react2.default.createElement(
          _AccessibleFakeButton2.default,
          {
            onClick: this._handleClick,
            style: headerStyle,
            className: (0, _classnames2.default)('md-panel-header', {
              'md-panel-header--expanded': expanded || twoLine,
              'md-panel-header--focused': focused
            }, headerClassName),
            tabIndex: tabIndex
          },
          columns,
          expanderIcon
        ),
        _react2.default.createElement(
          _Collapse2.default,
          { collapsed: !expanded, animate: animateContent },
          _react2.default.createElement(
            _PanelContent2.default,
            {
              style: contentStyle,
              className: contentClassName,
              footerStyle: footerStyle,
              footerClassName: footerClassName,
              onSave: this._handleSave,
              onCancel: this._handleCancel,
              saveType: saveType,
              saveLabel: saveLabel,
              savePrimary: savePrimary,
              saveSecondary: saveSecondary,
              saveProps: saveProps,
              cancelType: cancelType,
              cancelLabel: cancelLabel,
              cancelPrimary: cancelPrimary,
              cancelSecondary: cancelSecondary,
              cancelProps: cancelProps,
              footer: footer,
              footerChildren: footerChildren
            },
            children
          )
        )
      );
    }
  }]);

  return ExpansionPanel;
}(_react.PureComponent);

ExpansionPanel.propTypes = {
  /**
   * An optional style to apply to the panel.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the panel.
   */
  className: _propTypes2.default.string,

  /**
   * An options style to apply to the panel's header content. This is the
   * section that toggles the children to be visible and label columns.
   */
  headerStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the panel's header content. This is the
   * section that toggles the children to be visible and label columns.
   */
  headerClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the element surrounding the children when expanded.
   */
  contentStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the element surrounding the children when expanded.
   */
  contentClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the footer when the `footer` prop is `undefined`.
   *
   * @see {@link #footer}
   */
  footerStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the footer when the `footer` prop is `undefined`.
   *
   * @see {@link #footer}
   */
  footerClassName: _propTypes2.default.string,

  /**
   * The main label to display in the unexpanded panel.
   */
  label: _propTypes2.default.node.isRequired,

  /**
   * Any additional columns to display after the main label. If this is a `list`
   * instead of a singular item, they will each be formatted as a column.
   */
  secondaryLabel: _propTypes2.default.node,

  /**
   * Any additional columns to display after the main label when the panel is
   * expanded. If this is omitted, the default `secondaryLabel` will be displayed
   * instead.
   */
  expandedSecondaryLabel: _propTypes2.default.node,

  /**
   * The component to render the panel as.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,

  /**
   * The content to display once the panel is toggled open.
   */
  children: _propTypes2.default.node,

  /**
   * A boolean if the panel is currently expanded. This will force the component
   * to be controlled and require's the `onExpandToggle` function to be defined.
   */
  expanded: (0, _controlled2.default)(_propTypes2.default.bool, 'onExpandToggle', 'defaultExpanded'),

  /**
   * Boolean if an uncontrolled panel should be expanded by default.
   */
  defaultExpanded: _propTypes2.default.bool.isRequired,

  /**
   * The icon to display for expanding the expansion panel.
   */
  expanderIcon: _propTypes2.default.element,

  /**
   * Boolean if the `ExpansionPanel` is currently tab focused. This is injected
   * and managed by the `ExpansionList` component. Do not set yourself.
   */
  focused: _propTypes2.default.bool.isRequired,

  /**
   * A list of min-widths to apply to each column in the panel header. This is injected
   * and managed by the `ExpansionList` component. Do not set yourself.
   */
  columnWidths: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,

  /**
   * Boolean if the panel has too much content so that it overflowns. This is injected
   * and managed by the `ExpansionList` component. Do not set yourself.
   *
   * When this is active, it will truncate all columns except for the main label and the
   * toggle icon.
   */
  overflown: _propTypes2.default.bool,

  /**
   * A function to call when the expansion panel's expanded state is toggled.
   * The callback for this function will include the new expanded state.
   *
   * `onExpandToggle(expanded)`
   */
  onExpandToggle: _propTypes2.default.func,

  /**
   * An optional function to call when the Save button is clicked on the expanded panel.
   */
  onSave: _propTypes2.default.func,

  /**
   * An optional function to call when the Cancel button is clicked on the expanded panel.
   */
  onCancel: _propTypes2.default.func,

  /**
   * Boolean if the panel should close when the Save button is clicked.
   */
  closeOnSave: _propTypes2.default.bool,

  /**
   * Boolean if the panel should close when the Cancel button is clicked.
   */
  closeOnCancel: _propTypes2.default.bool,

  /**
   * An optional button type to apply to the Save button. This will get
   * passed to the `FlatButton`.
   */
  saveType: _propTypes2.default.oneOf(['button', 'submit', 'reset']),

  /**
   * The label for the Save button.
   */
  saveLabel: _propTypes2.default.node.isRequired,

  /**
   * Boolean if the Save button should be styled with the primary color.
   */
  savePrimary: _propTypes2.default.bool,

  /**
   * Boolean if the Save button should be styled with the secondary color,
   */
  saveSecondary: _propTypes2.default.bool,

  /**
   * Any additional props to provide/override for the save button in the
   * footer of the panel.
   */
  saveProps: _propTypes2.default.object,

  /**
   * An optional button type to apply to the Cancel button. This will get
   * passed to the `FlatButton`.
   */
  cancelType: _propTypes2.default.oneOf(['button', 'submit', 'reset']),

  /**
   * The label for the Cancel button.
   */
  cancelLabel: _propTypes2.default.node.isRequired,

  /**
   * Boolean if the Cancel button should be styled with the primary color,
   */
  cancelPrimary: _propTypes2.default.bool,

  /**
   * Boolean if the Cancel button should be styled with the secondary color,
   */
  cancelSecondary: _propTypes2.default.bool,

  /**
   * Any additional props to provide/override for the cancel button in the
   * footer of the panel.
   */
  cancelProps: _propTypes2.default.object,

  /**
   * The tab index for the panel's header. This allows keyboard navigation.
   */
  tabIndex: _propTypes2.default.number.isRequired,

  /**
   * Boolean if the panel's content should animate when the content's visibility changes. This
   * can also be toggled from the `ExpansionList` component if all `ExpansionPanel` in the list
   * should not animate. This only affects the height transition.
   *
   * > The default value is really `true` since it gets passed down to the `Collapse` component.
   */
  animateContent: _propTypes2.default.bool,

  /**
   * This prop controls the footer for the expansion panel. If this prop is `undefined`, it will
   * go with the default behavior of generating the save and cancel buttons with the save and cancel
   * props.
   *
   * If this value is `null`, there will be no footer created.
   *
   * Finally, if this prop is defined as any renderable item, it will be displayed in place of the
   * footer.
   *
   * @see {@link #footerChildren}
   */
  footer: _propTypes2.default.node,

  /**
   * Any additional children that should be displayed in the footer of the panel. These children
   * will be placed after the action buttons.
   */
  footerChildren: _propTypes2.default.node,
  expandIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `expanderIcon` instead'),
  expandIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `expanderIcon` instead')
};
ExpansionPanel.defaultProps = {
  defaultExpanded: false,
  expanderIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'keyboard_arrow_down'
  ),
  component: 'li',
  saveLabel: 'Save',
  cancelLabel: 'Cancel',
  savePrimary: true,
  tabIndex: 0,
  closeOnSave: true,
  closeOnCancel: true,
  focused: false,
  columnWidths: []
};
ExpansionPanel.contextTypes = {
  animateContent: _propTypes2.default.bool
};
exports.default = ExpansionPanel;
//# sourceMappingURL=ExpansionPanel.js.map