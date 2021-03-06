'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  checkedIcon: _propTypes2.default.element,
  uncheckedIcon: _propTypes2.default.element,
  indeterminateIcon: _propTypes2.default.element,
  indeterminate: _propTypes2.default.bool,
  plain: _propTypes2.default.bool,
  selectableRows: _propTypes2.default.bool.isRequired,
  allSelected: _propTypes2.default.bool.isRequired,
  selectedRows: _propTypes2.default.arrayOf(_propTypes2.default.bool).isRequired,
  createCheckbox: _propTypes2.default.func.isRequired,
  removeCheckbox: _propTypes2.default.func.isRequired,
  toggleSelectedRow: _propTypes2.default.func.isRequired,
  baseId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  baseName: _propTypes2.default.string,
  checkboxHeaderLabel: _propTypes2.default.string.isRequired,
  checkboxLabelTemplate: _propTypes2.default.string.isRequired,
  fixedHeader: _propTypes2.default.bool.isRequired,
  fixedFooter: _propTypes2.default.bool.isRequired
};
//# sourceMappingURL=contextTypes.js.map