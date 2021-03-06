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

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSTransitionGroupTick = require('../constants/CSSTransitionGroupTick');

var _CSSTransitionGroupTick2 = _interopRequireDefault(_CSSTransitionGroupTick);

var _oneRequired = require('../utils/PropTypes/oneRequired');

var _oneRequired2 = _interopRequireDefault(_oneRequired);

var _invalidIf = require('../utils/PropTypes/invalidIf');

var _invalidIf2 = _interopRequireDefault(_invalidIf);

var _CardTitleBlock = require('../Cards/CardTitleBlock');

var _CardTitleBlock2 = _interopRequireDefault(_CardTitleBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `TableCardHeader` is used when contextual actions should appear when
 * a user selects a row.
 */
var TableCardHeader = function (_PureComponent) {
  _inherits(TableCardHeader, _PureComponent);

  function TableCardHeader(props) {
    _classCallCheck(this, TableCardHeader);

    var _this = _possibleConstructorReturn(this, (TableCardHeader.__proto__ || Object.getPrototypeOf(TableCardHeader)).call(this, props));

    _this.state = { animating: false };
    return _this;
  }

  _createClass(TableCardHeader, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var visible = this.props.visible;
      var nVisible = nextProps.visible,
          transitionEnterTimeout = nextProps.transitionEnterTimeout,
          transitionLeaveTimeout = nextProps.transitionLeaveTimeout;

      var timeout = !nVisible ? transitionLeaveTimeout : transitionEnterTimeout;
      if (visible !== nVisible) {
        if (this._timeout) {
          clearTimeout(this._timeout);
        }

        this._timeout = setTimeout(function () {
          _this2._timeout = setTimeout(function () {
            _this2._timeout = null;
            _this2.setState({ animating: false });
          }, timeout);
        }, _CSSTransitionGroupTick2.default);

        if (!this.state.animating) {
          this.setState({ animating: true });
        }
      }
    }
  }, {
    key: '_cloneCellRight',
    value: function _cloneCellRight(noAdjust, children) {
      if (noAdjust || !children) {
        return children;
      }

      return _react.Children.map(_react.Children.toArray(children), function (child, i) {
        if (i === 0) {
          return (0, _react.cloneElement)(child, { className: (0, _classnames2.default)('md-cell--right', child.props.className) });
        }

        return child;
      });
    }
  }, {
    key: '_cloneLeftChildren',
    value: function _cloneLeftChildren(noClone, children) {
      if (noClone || !children) {
        return children;
      }

      return _react.Children.map(_react.Children.toArray(children), function (child) {
        return (0, _react.cloneElement)(child, {
          className: (0, _classnames2.default)('md-btn--dialog', child.props.className)
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var animating = this.state.animating;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          title = _props.title,
          titleId = _props.titleId,
          actions = _props.actions,
          contextualTitleId = _props.contextualTitleId,
          contextualChildren = _props.contextualChildren,
          noActionsAdjust = _props.noActionsAdjust,
          noChildrenAdjust = _props.noChildrenAdjust,
          noLeftChildrenClone = _props.noLeftChildrenClone,
          visible = _props.visible,
          propChildren = _props.children,
          propLeftChildren = _props.leftChildren,
          propContextualTitle = _props.contextualTitle,
          props = _objectWithoutProperties(_props, ['style', 'className', 'title', 'titleId', 'actions', 'contextualTitleId', 'contextualChildren', 'noActionsAdjust', 'noChildrenAdjust', 'noLeftChildrenClone', 'visible', 'children', 'leftChildren', 'contextualTitle']);

      var _props2 = this.props,
          children = _props2.children,
          leftChildren = _props2.leftChildren,
          contextualTitle = _props2.contextualTitle;

      children = this._cloneCellRight(noChildrenAdjust, children);
      leftChildren = this._cloneLeftChildren(noLeftChildrenClone, leftChildren);

      if (title) {
        children = _react2.default.createElement(
          'div',
          { className: 'md-card-title', key: 'main-title' },
          _react2.default.createElement(_CardTitleBlock2.default, { id: titleId, title: title }),
          children
        );
      } else if (leftChildren) {
        leftChildren = _react.Children.toArray(leftChildren);

        if (children) {
          children = leftChildren.concat(_react.Children.toArray(children));
        } else {
          children = leftChildren;
        }
      }

      if (contextualTitle) {
        contextualTitle = _react2.default.createElement(
          'h2',
          {
            id: contextualTitleId,
            className: 'md-card-title--title md-card-title--title-contextual',
            tabIndex: contextualTitleId ? -1 : null
          },
          contextualTitle
        );
      }

      var contextualHeader = _react2.default.createElement(
        'div',
        { key: 'contextual-header', className: 'md-card-title md-card-title--contextual' },
        contextualTitle,
        contextualChildren,
        this._cloneCellRight(noActionsAdjust, actions)
      );

      var mergedStyles = style;
      if (animating) {
        mergedStyles = Object.assign({}, style, { overflow: 'hidden' });
      }

      return _react2.default.createElement(
        _CSSTransitionGroup2.default,
        _extends({}, props, {
          style: mergedStyles,
          className: (0, _classnames2.default)('md-table-card-header', {
            'md-table-card-header--no-title': !title
          }, className)
        }),
        children,
        visible ? contextualHeader : null
      );
    }
  }]);

  return TableCardHeader;
}(_react.PureComponent);

TableCardHeader.propTypes = {
  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply.
   */
  className: _propTypes2.default.string,

  /**
   * The component to render as.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

  /**
   * The transition name to use when the contextual header appears.
   */
  transitionName: _propTypes2.default.string.isRequired,

  /**
   * The transition time to use when the contextual header appears.
   */
  transitionEnterTimeout: _propTypes2.default.number.isRequired,

  /**
   * The transition time to use when the contextual header disappears.
   */
  transitionLeaveTimeout: _propTypes2.default.number.isRequired,

  /**
   * An optional title to display. It is invalid to have both `title` and `leftChildren`
   * defined as only one will be used.
   */
  title: (0, _oneRequired2.default)(_propTypes2.default.node, 'leftChildren', 'children'),

  /**
   * An optional id to provide to the title.
   */
  titleId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional title to display in the contextual header. This will get wrapped in an `h2`
   * tag and additional styles applied.
   */
  contextualTitle: _propTypes2.default.node,

  /**
   * An optional id to provide to the contextual title.
   */
  contextualTitleId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * Any additional children to display in the contextual header. This will be displayed after
   * the optional `contextualTile` and before the `actions`.
   */
  contextualChildren: _propTypes2.default.node,

  /**
   * An optional button or list of buttons to display instead of a title.
   */
  leftChildren: (0, _invalidIf2.default)(_propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.arrayOf(_propTypes2.default.element)]), 'title'),

  /**
   * An additional children to display after the `title` or `leftChildren` prop.
   * This is _normally_ a list of icon button or menu button.
   */
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.arrayOf(_propTypes2.default.element)]),

  /**
   * An optional button/menu button or a list of button/menu button to display in the
   * contextual header once the user has selected a row or multiple rows.
   */
  actions: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.arrayOf(_propTypes2.default.element)]),

  /**
   * Boolean if the `actions` prop should not have each element cloned with additional
   * class names.
   */
  noActionsAdjust: _propTypes2.default.bool,

  /**
   * Boolean if the `children` prop should not have each element cloned with additional
   * class names.
   */
  noChildrenAdjust: _propTypes2.default.bool,

  /**
   * Boolean if the `leftChildren` prop should not have each element cloned with additional
   * class names.
   */
  noLeftChildrenClone: _propTypes2.default.bool,

  /**
   * Boolean if the contextual header is currently visible.
   */
  visible: _propTypes2.default.bool.isRequired
};
TableCardHeader.defaultProps = {
  component: 'header',
  transitionName: 'md-drop-down',
  transitionEnterTimeout: 150,
  transitionLeaveTimeout: 150
};
exports.default = TableCardHeader;
//# sourceMappingURL=TableCardHeader.js.map