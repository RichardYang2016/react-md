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

var _oneRequired = require('../utils/PropTypes/oneRequired');

var _oneRequired2 = _interopRequireDefault(_oneRequired);

var _AccessibleFakeInkedButton = require('../Helpers/AccessibleFakeInkedButton');

var _AccessibleFakeInkedButton2 = _interopRequireDefault(_AccessibleFakeInkedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `Tab` component is used for rendering a single tab in the `Tabs` component.
 * It can optionally have either a `label`, an `icon` or both.
 */
var Tab = function (_PureComponent) {
  _inherits(Tab, _PureComponent);

  function Tab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = function (e) {
      if (_this.props.onClick) {
        _this.props.onClick(_this.props.index, _this.props.id, _this.props.controlsId, _this.props.children, e);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tab, [{
    key: 'render',
    value: function render() {
      var _cn;

      var _props = this.props,
          id = _props.id,
          controlsId = _props.controlsId,
          className = _props.className,
          activeClassName = _props.activeClassName,
          inactiveClassName = _props.inactiveClassName,
          active = _props.active,
          propIcon = _props.icon,
          propLabel = _props.label,
          index = _props.index,
          props = _objectWithoutProperties(_props, ['id', 'controlsId', 'className', 'activeClassName', 'inactiveClassName', 'active', 'icon', 'label', 'index']);

      var _props2 = this.props,
          icon = _props2.icon,
          label = _props2.label;

      if (icon) {
        var iconEl = _react.Children.only(icon);
        icon = (0, _react.cloneElement)(icon, {
          className: (0, _classnames2.default)('md-icon--tab', iconEl.props.className)
        });
      }

      if ((0, _react.isValidElement)(label)) {
        var labelEl = _react.Children.only(label);
        label = (0, _react.cloneElement)(label, {
          className: (0, _classnames2.default)('md-tab-label', labelEl.props.className)
        });
      } else {
        label = _react2.default.createElement(
          'div',
          { className: 'md-tab-label' },
          label
        );
      }
      return _react2.default.createElement(
        _AccessibleFakeInkedButton2.default,
        _extends({}, props, {
          id: id,
          role: 'tab',
          onClick: this._handleClick,
          className: (0, _classnames2.default)('md-tab', (_cn = {
            'md-tab--icon': label && icon
          }, _defineProperty(_cn, activeClassName, activeClassName && active), _defineProperty(_cn, inactiveClassName, inactiveClassName && !active), _cn), className),
          'aria-controls': controlsId,
          'aria-selected': active
        }),
        icon,
        label
      );
    }
  }]);

  return Tab;
}(_react.PureComponent);

Tab.propTypes = {
  /**
   * An id for the tab. This is required for a11y. If you use the `Tabs` component, this
   * will automatically be generated for you and injected into this component.
   */
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An id for a `TabPanel` that holds the children from this tab. This is required for a11y.
   * If you use the `Tabs` component, this will automatically be generated for you and injected
   * into this component.
   */
  controlsId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply.
   */
  className: _propTypes2.default.string,

  /**
   * The className to use when the tab is currently active. The default className does
   * not actually apply any styles.
   *
   * @see {@link Tabs/Tabs#activeTabClassName}
   */
  activeClassName: _propTypes2.default.string,

  /**
   * The className to use when the tab is not active. By default, this will set inactive
   * tabs' color to `$md-white-base`. This works great if the tabs are placed on a
   * colored toolbar but fails when the tabs are not colored or on a white background.
   * In these cases, it is recommended to change this value to `md-text--secondary`
   * or some other class name.
   *
   * @see {@link Tabs/Tabs#inactiveTabClassName}
   */
  inactiveClassName: _propTypes2.default.string,

  /**
   * The component to render as.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

  /**
   * Any children to display once the tab has been selected.
   */
  children: _propTypes2.default.node,

  /**
   * An optional icon to display in the tab. This can either be used alone, or it
   * will be placed above the `label` if both are given.
   */
  icon: _propTypes2.default.element,

  /**
   * An optional label to display in the tab. This can either be used alone, or it
   * will be placed below the `icon` if both are given.
   */
  label: (0, _oneRequired2.default)(_propTypes2.default.node, 'icon'),

  /**
   * An optional function to call when the tab is clicked. The callback includes this tab's index,
   * id, controlsId, children, and finally click event. All the additional parameters are included
   * if you are not using the `TabsContainer` component. The `id` and `controlsId` are mainly passed
   * for accessibility.
   *
   * ```js
   * onClick(index, id, controlsId, children, event);
   * ```
   */
  onClick: _propTypes2.default.func,

  /**
   * Boolean if the tab is currently active. If you use the `Tabs` component, this is automatically
   * injected.
   */
  active: _propTypes2.default.bool,

  /**
   * Tab's index. If you use the `Tabs` component, this is automatically injected.
   */
  index: _propTypes2.default.number
};
Tab.defaultProps = {
  component: 'li',
  activeClassName: 'md-tab--active',
  inactiveClassName: 'md-tab--inactive'
};
exports.default = Tab;
//# sourceMappingURL=Tab.js.map