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

var _SelectionControl = require('../SelectionControls/SelectionControl');

var _SelectionControl2 = _interopRequireDefault(_SelectionControl);

var _findTable = require('./findTable');

var _findTable2 = _interopRequireDefault(_findTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableCheckbox = function (_Component) {
  _inherits(TableCheckbox, _Component);

  function TableCheckbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TableCheckbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableCheckbox.__proto__ || Object.getPrototypeOf(TableCheckbox)).call.apply(_ref, [this].concat(args))), _this), _this._td = null, _this._header = false, _this._handleMount = function (td) {
      if (td) {
        var header = (0, _findTable2.default)(td).querySelector('thead');
        var index = td.parentNode.rowIndex - (header ? 1 : 0);

        if (td.parentNode.parentNode.tagName === 'TBODY') {
          _this.context.createCheckbox(index);
        }
        _this._td = td;
        _this._header = header;
      } else if (_this._td) {
        var _index = _this._td.parentNode.rowIndex;
        _this.context.removeCheckbox(_index - (_this._header ? 1 : 0));
        _this._td = null;
        _this._header = false;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TableCheckbox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          checked = _props.checked,
          index = _props.index,
          props = _objectWithoutProperties(_props, ['checked', 'index']);

      var _context = this.context,
          checkedIcon = _context.checkedIcon,
          uncheckedIcon = _context.uncheckedIcon,
          indeterminateIcon = _context.indeterminateIcon,
          indeterminate = _context.indeterminate,
          header = _context.header,
          footer = _context.footer,
          rowId = _context.rowId,
          baseName = _context.baseName,
          checkboxHeaderLabel = _context.checkboxHeaderLabel,
          checkboxLabelTemplate = _context.checkboxLabelTemplate;


      var Cell = header ? 'th' : 'td';
      var label = void 0;
      if (header) {
        label = checkboxHeaderLabel;
      } else if (typeof checkboxLabelTemplate === 'function') {
        label = checkboxLabelTemplate(index);
      } else {
        label = checkboxLabelTemplate.replace(/{{row}}/g, index);
      }

      var content = _react2.default.createElement(_SelectionControl2.default, _extends({}, props, {
        id: rowId,
        name: baseName + '-checkbox',
        type: 'checkbox',
        checked: checked,
        checkedCheckboxIcon: checkedIcon,
        uncheckedCheckboxIcon: header && indeterminate ? indeterminateIcon : uncheckedIcon,
        'aria-label': label
      }));
      var fixedHeader = header && this.context.fixedHeader;
      var fixedFooter = footer && this.context.fixedFooter;

      if (fixedHeader) {
        content = _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('md-table-column__fixed', {
              'md-table-column__fixed--header': fixedHeader,
              'md-table-column__fixed--footer': fixedFooter
            })
          },
          _react2.default.cloneElement(content, {
            className: (0, _classnames2.default)({
              'md-table-checkbox--header': header,
              'md-table-checkbox--footer': footer
            })
          })
        );
      }

      return _react2.default.createElement(
        Cell,
        {
          className: (0, _classnames2.default)('md-table-checkbox', {
            'md-table-column--fixed': fixedHeader
          }),
          scope: header ? 'col' : undefined,
          ref: this._handleMount
        },
        content
      );
    }
  }]);

  return TableCheckbox;
}(_react.Component);

TableCheckbox.propTypes = {
  index: _propTypes2.default.number,
  checked: _propTypes2.default.bool
};
TableCheckbox.contextTypes = {
  rowId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  baseName: _propTypes2.default.string.isRequired,
  indeterminate: _propTypes2.default.bool,
  checkedIcon: _propTypes2.default.element,
  uncheckedIcon: _propTypes2.default.element,
  indeterminateIcon: _propTypes2.default.element,
  checkboxHeaderLabel: _propTypes2.default.string.isRequired,
  checkboxLabelTemplate: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,
  createCheckbox: _propTypes2.default.func.isRequired,
  removeCheckbox: _propTypes2.default.func.isRequired,
  header: _propTypes2.default.bool,
  footer: _propTypes2.default.bool,
  fixedHeader: _propTypes2.default.bool.isRequired,
  fixedFooter: _propTypes2.default.bool.isRequired
};
exports.default = TableCheckbox;
//# sourceMappingURL=TableCheckbox.js.map