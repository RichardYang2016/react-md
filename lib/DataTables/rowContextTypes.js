'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _headerContextTypes = require('./headerContextTypes');

var _headerContextTypes2 = _interopRequireDefault(_headerContextTypes);

var _omit = require('../utils/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rowContextTypes = (0, _omit2.default)(_extends({}, _headerContextTypes2.default, {
  rowId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
}), ['baseId']);

exports.default = rowContextTypes;
//# sourceMappingURL=rowContextTypes.js.map