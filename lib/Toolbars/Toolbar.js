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

var _invalidIf = require('../utils/PropTypes/invalidIf');

var _invalidIf2 = _interopRequireDefault(_invalidIf);

var _between = require('../utils/PropTypes/between');

var _between2 = _interopRequireDefault(_between);

var _Paper = require('../Papers/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _ToolbarTitle = require('./ToolbarTitle');

var _ToolbarTitle2 = _interopRequireDefault(_ToolbarTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = function (_PureComponent) {
  _inherits(Toolbar, _PureComponent);

  function Toolbar() {
    _classCallCheck(this, Toolbar);

    return _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).apply(this, arguments));
  }

  _createClass(Toolbar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          className = _props.className,
          component = _props.component,
          titleStyle = _props.titleStyle,
          titleClassName = _props.titleClassName,
          prominentTitle = _props.prominentTitle,
          themed = _props.themed,
          singleColor = _props.singleColor,
          actions = _props.actions,
          fixed = _props.fixed,
          children = _props.children,
          inset = _props.inset,
          titleId = _props.titleId,
          propNav = _props.nav,
          propTitle = _props.title,
          propTitleMenu = _props.titleMenu,
          propZDepth = _props.zDepth,
          propColored = _props.colored,
          propProminent = _props.prominent,
          containerStyle = _props.containerStyle,
          containerClassName = _props.containerClassName,
          actionLeft = _props.actionLeft,
          actionsRight = _props.actionsRight,
          primary = _props.primary,
          secondary = _props.secondary,
          props = _objectWithoutProperties(_props, ['style', 'className', 'component', 'titleStyle', 'titleClassName', 'prominentTitle', 'themed', 'singleColor', 'actions', 'fixed', 'children', 'inset', 'titleId', 'nav', 'title', 'titleMenu', 'zDepth', 'colored', 'prominent', 'containerStyle', 'containerClassName', 'actionLeft', 'actionsRight', 'primary', 'secondary']);

      var _props2 = this.props,
          colored = _props2.colored,
          title = _props2.title,
          titleMenu = _props2.titleMenu,
          nav = _props2.nav,
          prominent = _props2.prominent,
          zDepth = _props2.zDepth;


      colored = colored || primary || secondary;
      prominent = prominent || prominentTitle;

      title = _react2.default.createElement(_ToolbarTitle2.default, {
        key: 'title',
        style: titleStyle,
        className: titleClassName,
        prominent: prominentTitle,
        offset: prominentTitle,
        id: typeof titleId === 'undefined' && props.id ? props.id + '-title' : titleId,
        title: title
      });

      if (nav || actionLeft) {
        var navEl = _react.Children.only(nav || actionLeft);
        nav = (0, _react.cloneElement)(nav, {
          className: (0, _classnames2.default)('md-btn--toolbar md-toolbar--action-left', navEl.props.className)
        });
      }

      var rightActions = void 0;
      if (actions || actionsRight) {
        rightActions = _react.Children.map(_react.Children.toArray(actions || actionsRight), function (action) {
          return (0, _react.cloneElement)(action, {
            className: (0, _classnames2.default)('md-btn--toolbar', action.props.className)
          });
        });

        rightActions = _react2.default.createElement(
          'div',
          { key: 'actions', className: 'md-cell--right md-toolbar--action-right' },
          rightActions
        );
      }

      if (titleMenu) {
        titleMenu = _react.Children.only(titleMenu);
        titleMenu = (0, _react.cloneElement)(titleMenu, {
          className: (0, _classnames2.default)('md-title md-title--toolbar md-select-field--toolbar', {
            'md-title--toolbar-offset': prominentTitle,
            'md-title--toolbar-prominent': prominentTitle
          }, titleMenu.props.className),
          position: titleMenu.props.position || 'tl',
          toolbar: true
        });
      }

      if (typeof zDepth !== 'number') {
        zDepth = fixed ? 2 : 0;
      }

      return _react2.default.createElement(
        _Paper2.default,
        _extends({}, props, {
          component: component,
          zDepth: zDepth,
          style: style,
          className: (0, _classnames2.default)('md-toolbar', {
            'md-background--primary': colored,
            'md-toolbar--themed': themed,
            'md-toolbar--text-white': singleColor && colored,
            'md-toolbar--prominent': prominent,
            'md-toolbar--fixed': fixed,
            'md-toolbar--inset': inset
          }, className)
        }),
        nav,
        title,
        titleMenu,
        children,
        rightActions
      );
    }
  }]);

  return Toolbar;
}(_react.PureComponent);

Toolbar.propTypes = {
  /**
   * An optional id to provide to the toolbar. If this is specified and the `titleId` is not, the title
   * will gain an id of `${id}-title`. This will not be applied to the `titleMenu`.
   *
   * @see {@link #titleId}
   */
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional style to apply to the toolbar.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the toolbar,
   */
  className: _propTypes2.default.string,

  /*
   * An optional style to apply to the `h2` surrounding the `title` prop.
   */
  titleStyle: _propTypes2.default.object,

  /*
   * An optional className to apply to the `h2` surrounding the `title` prop.
   */
  titleClassName: _propTypes2.default.string,

  /**
   * Boolean if the toolbar should more prominent. This will double the height of the toolbar.
   */
  prominent: _propTypes2.default.bool,

  /**
   * Boolean if the toolbar's title should be more prominent. This will move the title to the
   * second line of the toolbar. This only works when the `prominent` prop is true as well.
   */
  prominentTitle: _propTypes2.default.bool,

  /**
   * The current title of the page to show in the toolbar. It is invalid to specify both a
   * `title` and a `titleMenu`. Only one should be given.
   */
  title: (0, _invalidIf2.default)(_propTypes2.default.node, 'titleMenu'),

  /**
   * An optional id to give the main title in the toolbar. This will not be applied to the
   * `titleMenu`.
   */
  titleId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional title menu to display instead of the title. This should be a `SelectField` component.
   * It is cloned with some additional props, so if the `SelectField` is separated into a separate
   * component, the following props must be passed to get the correct styling: `className`, `block`,
   * `paddedBlock`, `position`.
   */
  titleMenu: _propTypes2.default.element,

  /**
   * This prop is used for rendering an optional navigation button to the left of the `title`
   * or the `titleMenu` component. This needs to be an icon `Button` because some additional props
   * are cloned into it.
   */
  nav: _propTypes2.default.element,

  /**
   * Any additional actions to display to the right of the title. This should be a list or a single
   * `Button` to display. The buttons get cloned with an additional className for toolbar styling.
   */
  actions: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.arrayOf(_propTypes2.default.element)]),

  /**
   * Any children to display in the toolbar. This will be displayed between the optional title and
   * actions.
   */
  children: _propTypes2.default.node,

  /**
   * Boolean if the toolbar should be fixed to the top of the page. This will add some additional box shadow.
   */
  fixed: _propTypes2.default.bool,

  /**
   * Boolean if the nav, actions, and title should share the same color. For a `colored` or dark `themed`
   * toolbar, they will all be colored white. For a transparent or light `themed` toolbar, the colors will
   * be the `rgba(0, 0, 0, .87)`. Setting this to false will only style the title to the specific color
   * stated above.
   */
  singleColor: _propTypes2.default.bool,

  /**
   * Boolean if the toolbar should be colored based off the current theme. This will either style the background
   * to be fairly white, or fairly black. You can not specify both `themed` and `colored`.
   */
  themed: _propTypes2.default.bool,

  /**
   * Boolean if the toolbar should be colored with the `$md-primary-color`.
   */
  colored: (0, _invalidIf2.default)(_propTypes2.default.bool, 'themed'),

  /**
   * The component to render the toolbar as.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

  /**
   * Boolean if the toolbar is inset in the page. This will just add some margin around
   * it.
   */
  inset: _propTypes2.default.bool,

  /**
   * An optional zDepth to enforce for the toolbar. This should be a number between 0 and 5.
   * If this is omitted, the toolbar will gain a zDepth of 2 when `fixed`.
   */
  zDepth: (0, _between2.default)(_propTypes2.default.number, 0, 5),
  containerStyle: (0, _deprecated2.default)(_propTypes2.default.object, 'The `container` no longer exists in the `Toolbar`. Use the `style` prop instead'),
  containerClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'The `container` no longer exists in the `Toolbar`. Use the `className` prop instead'),
  primary: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use the `colored` prop instead'),
  secondary: (0, _deprecated2.default)(_propTypes2.default.bool, 'Toolbars can no longer be themed to the secondary color. Use the `colored` prop instead'),
  actionLeft: (0, _deprecated2.default)(_propTypes2.default.element, 'Use the `nav` prop instead'),
  actionsRight: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `menu` prop and/or the `actions` prop instead')
};
Toolbar.defaultProps = {
  singleColor: true,
  component: 'header'
};
exports.default = Toolbar;
//# sourceMappingURL=Toolbar.js.map