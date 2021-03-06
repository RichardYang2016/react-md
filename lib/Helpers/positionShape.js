'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Positions = require('./Positions');

var _Positions2 = _interopRequireDefault(_Positions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _propTypes2.default.oneOfType([_propTypes2.default.oneOf([_Positions2.default.TOP_LEFT, _Positions2.default.TOP_RIGHT, _Positions2.default.BOTTOM_LEFT, _Positions2.default.BOTTOM_RIGHT, _Positions2.default.BELOW]), _propTypes2.default.string]);
//# sourceMappingURL=positionShape.js.map