'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _HorizontalAnchors = require('./HorizontalAnchors');

var _HorizontalAnchors2 = _interopRequireDefault(_HorizontalAnchors);

var _VerticalAnchors = require('./VerticalAnchors');

var _VerticalAnchors2 = _interopRequireDefault(_VerticalAnchors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _propTypes2.default.shape({
  x: _propTypes2.default.oneOf([_HorizontalAnchors2.default.LEFT, _HorizontalAnchors2.default.INNER_LEFT, _HorizontalAnchors2.default.CENTER, _HorizontalAnchors2.default.RIGHT, _HorizontalAnchors2.default.INNER_RIGHT]).isRequired,
  y: _propTypes2.default.oneOf([_VerticalAnchors2.default.TOP, _VerticalAnchors2.default.CENTER, _VerticalAnchors2.default.OVERLAP, _VerticalAnchors2.default.BOTTOM]).isRequired
});
//# sourceMappingURL=anchorShape.js.map