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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This is an accessibility only component that should be used in the `NavigationDrawer`
 * component. It allows keyboard users to quickly jump to the main content.
 *
 * This component relies on the `contextTypes` of the `NavigationDrawer` to work. If this is going
 * to be used outside of that component, you will need to specify an `id` and `label` contextType
 * to pass to this component.
 */
var JumpToContentLink = function (_PureComponent) {
  _inherits(JumpToContentLink, _PureComponent);

  function JumpToContentLink() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, JumpToContentLink);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JumpToContentLink.__proto__ || Object.getPrototypeOf(JumpToContentLink)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = function (e) {
      if (_this.props.onClick) {
        _this.props.onClick(e);
      }

      document.getElementById(_this.context.id).focus();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(JumpToContentLink, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          props = _objectWithoutProperties(_props, ['className']);

      var _context = this.context,
          id = _context.id,
          label = _context.label;

      return _react2.default.createElement(
        'a',
        _extends({}, props, {
          id: 'jump-to-' + id,
          href: '#' + id,
          onClick: this._handleClick,
          className: (0, _classnames2.default)('md-content-jump', className)
        }),
        label
      );
    }
  }]);

  return JumpToContentLink;
}(_react.PureComponent);

JumpToContentLink.propTypes = {
  /**
   * An optional className to apply.
   */
  className: _propTypes2.default.string,

  /**
   * An optional function to call when the linked is clicked.
   */
  onClick: _propTypes2.default.func
};
JumpToContentLink.contextTypes = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  label: _propTypes2.default.node.isRequired
};
exports.default = JumpToContentLink;
//# sourceMappingURL=JumpToContentLink.js.map