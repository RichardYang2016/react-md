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

var _Button = require('../Buttons/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A button used to close the persistent navigation drawer. The button will
 * be generated based on the `NavigationDrawer`'s `contextTypes`.
 *
 * This component is really only used if you are using a `persistent` drawer and you
 * manually created the `drawerHeader` for the `NavigationDrawer`.
 */
var CloseButton = function (_PureComponent) {
  _inherits(CloseButton, _PureComponent);

  function CloseButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CloseButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CloseButton.__proto__ || Object.getPrototypeOf(CloseButton)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = function (e) {
      if (_this.props.onClick) {
        _this.props.onClick(e);
      }

      if (_this.context.onCloseClick) {
        _this.context.onCloseClick(e);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CloseButton, [{
    key: 'render',
    value: function render() {
      var closeIcon = this.context.closeIcon;


      return _react2.default.createElement(_Button2.default, _extends({}, this.props, {
        icon: true,
        key: 'close',
        onClick: this._handleClick,
        iconEl: closeIcon
      }));
    }
  }]);

  return CloseButton;
}(_react.PureComponent);

CloseButton.propTypes = {
  /**
   * An optional className to apply.
   */
  className: _propTypes2.default.string,

  /**
   * An optional additional function to call when the `click` event is triggered.
   */
  onClick: _propTypes2.default.func
};
CloseButton.contextTypes = {
  closeIcon: _propTypes2.default.element,
  onCloseClick: _propTypes2.default.func
};
exports.default = CloseButton;
//# sourceMappingURL=CloseButton.js.map