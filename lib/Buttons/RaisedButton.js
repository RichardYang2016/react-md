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

var _componentDeprecated = require('../utils/PropTypes/componentDeprecated');

var _componentDeprecated2 = _interopRequireDefault(_componentDeprecated);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RaisedButton = function (_PureComponent) {
  _inherits(RaisedButton, _PureComponent);

  function RaisedButton() {
    _classCallCheck(this, RaisedButton);

    return _possibleConstructorReturn(this, (RaisedButton.__proto__ || Object.getPrototypeOf(RaisedButton)).apply(this, arguments));
  }

  _createClass(RaisedButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Button2.default, _extends({}, this.props, { raised: true }));
    }
  }]);

  return RaisedButton;
}(_react.PureComponent);

RaisedButton.propTypes = {
  /**
   * The label to display in the button.
   */
  label: _propTypes2.default.node.isRequired,

  /**
   * An optional className to apply to the button.
   */
  className: _propTypes2.default.string,

  /**
   * Boolean if the icon should be displayed before the label.
   */
  iconBefore: _propTypes2.default.bool,

  /**
   * A `FontIcon` to display in the button. It can be placed before
   * or after the label.
   */
  children: _propTypes2.default.node,

  /**
   * The button type.
   */
  type: _propTypes2.default.string,

  /**
   * Boolean if the button should be styled with the primary color.
   */
  primary: _propTypes2.default.bool,

  /**
   * Boolean if the button should be styled with the secondary color.
   */
  secondary: _propTypes2.default.bool,

  /**
   * Boolean if the button is disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * An optional href to convert the button into a link button.
   */
  href: _propTypes2.default.string,

  /**
   * An optional function to call when the button is clicked.
   */
  onClick: _propTypes2.default.func,

  deprecated: (0, _componentDeprecated2.default)('The behavior of the `RaisedButton` can be achieved with the `Button` component ' + 'without the additional bundle size. Switch to the `Button` component and add a ' + 'prop `raised`.')
};
RaisedButton.defaultProps = {
  type: 'button',
  iconBefore: true
};
exports.default = RaisedButton;
//# sourceMappingURL=RaisedButton.js.map