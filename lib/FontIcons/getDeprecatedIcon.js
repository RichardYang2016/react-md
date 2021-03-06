'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDeprecatedIcon;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDeprecatedIcon(className, children, icon) {
  if (className || children) {
    return _react2.default.createElement(
      _FontIcon2.default,
      { iconClassName: className },
      children
    );
  }

  return icon;
}
//# sourceMappingURL=getDeprecatedIcon.js.map