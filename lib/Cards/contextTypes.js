'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  onExpandClick: _propTypes2.default.func,
  expanded: _propTypes2.default.bool,
  icon: _propTypes2.default.element,
  tooltipPosition: _propTypes2.default.oneOf(['top', 'right', 'bottom', 'left']),
  tooltipLabel: _propTypes2.default.node,
  tooltipDelay: _propTypes2.default.number
};
//# sourceMappingURL=contextTypes.js.map