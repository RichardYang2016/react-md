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

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _headerContextTypes = require('./headerContextTypes');

var _headerContextTypes2 = _interopRequireDefault(_headerContextTypes);

var _rowContextTypes = require('./rowContextTypes');

var _rowContextTypes2 = _interopRequireDefault(_rowContextTypes);

var _TableCheckbox = require('./TableCheckbox');

var _TableCheckbox2 = _interopRequireDefault(_TableCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A component for displaying a row in a `DataTable`. This will
 * automatically add a `Checkbox` component to the row if it is not
 * a `plain` table.
 */
var TableRow = function (_Component) {
  _inherits(TableRow, _Component);

  function TableRow(props, context) {
    _classCallCheck(this, TableRow);

    var _this = _possibleConstructorReturn(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).call(this, props, context));

    _this._handleMouseOver = function (e) {
      if (_this.props.onMouseOver) {
        _this.props.onMouseOver(e);
      }

      if (_this.context.header) {
        return;
      }

      var target = e.target;
      while (target && target.parentNode) {
        if (target.classList && _this._ignoreHoverState(target.classList)) {
          _this.setState({ hover: false });
          return;
        }

        target = target.parentNode;
      }

      _this.setState({ hover: true });
    };

    _this._handleMouseLeave = function (e) {
      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(e);
      }

      if (_this.context.header) {
        return;
      }

      _this.setState({ hover: false });
    };

    _this._handleCheckboxClick = function (checked, e) {
      var rowIndex = _this._row.rowIndex;

      if (_this.props.onCheckboxClick) {
        _this.props.onCheckboxClick(rowIndex, checked, e);
      }

      _this.context.toggleSelectedRow(rowIndex, _this.context.header, e);
    };

    _this._setRow = function (row) {
      _this._row = row;
    };

    _this.state = { hover: false };
    return _this;
  }

  _createClass(TableRow, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _context = this.context,
          baseId = _context.baseId,
          context = _objectWithoutProperties(_context, ['baseId']);

      var id = baseId + '-' + (this._row ? this._row.rowIndex : null);
      return _extends({}, context, {
        rowId: context.header ? baseId + '-toggle-all' : id
      });
    }

    /**
     * Need to ignore adding the hover state if the mouse is over a menu/menu item
     * or the edit dialog is open.
     *
     * @param {Function} classList - the classList to use for checking cn
     * @return {Boolean} true if the hover state should be ignored for this classList
     */

  }, {
    key: '_ignoreHoverState',
    value: function _ignoreHoverState(classList) {
      return classList.contains('md-list--menu') || classList.contains('md-edit-dialog');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          children = _props.children,
          selected = _props.selected,
          selectable = _props.selectable,
          onCheckboxClick = _props.onCheckboxClick,
          autoAdjust = _props.autoAdjust,
          props = _objectWithoutProperties(_props, ['className', 'children', 'selected', 'selectable', 'onCheckboxClick', 'autoAdjust']);

      var hover = this.state.hover;


      var checkbox = void 0;
      if (typeof selectable !== 'undefined' ? selectable : !this.context.plain && this.context.selectableRows) {
        checkbox = _react2.default.createElement(_TableCheckbox2.default, {
          key: 'checkbox',
          checked: selected,
          onChange: this._handleCheckboxClick,
          index: this._row ? this._row.rowIndex : null
        });
      }

      var length = _react.Children.count(children) - 1;
      var columns = _react.Children.map(_react.Children.toArray(children), function (col, i) {
        var adjusted = col.props.adjusted;
        if (typeof adjusted === 'undefined') {
          adjusted = i === length ? false : undefined;
        }

        return (0, _react.cloneElement)(col, {
          cellIndex: i + (checkbox ? 1 : 0),
          header: (0, _getField2.default)(col.props, _this2.context, 'header'),
          adjusted: adjusted
        });
      });

      return _react2.default.createElement(
        'tr',
        _extends({}, props, {
          ref: this._setRow,
          className: (0, _classnames2.default)('md-table-row', className, {
            'md-table-row--hover': hover,
            'md-table-row--active': !this.context.header && selected
          }),
          onMouseOver: this._handleMouseOver,
          onMouseLeave: this._handleMouseLeave
        }),
        checkbox,
        columns
      );
    }
  }]);

  return TableRow;
}(_react.Component);

TableRow.propTypes = {
  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the row.
   */
  className: _propTypes2.default.string,

  /**
   * A single or list of `TableColumn` to display in the table.
   *
   * > The specs "require" at least 3 columns for a non-plain data table, but that isn't
   * strictly enforced here.
   */
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.arrayOf(_propTypes2.default.element)]).isRequired,

  /**
   * An optional onClick function to call when a row is clicked.
   */
  onClick: _propTypes2.default.func,

  /**
   * A function to call when the checkbox is clicked. This
   * function will will be called with `(rowIndex, checked, event)`.
   * The `TableBody` and `TableHeader` components will automatically
   * merge in a function to toggle the checkbox.
   */
  onCheckboxClick: _propTypes2.default.func,

  /**
   * An optional function to call onMouseOver.
   */
  onMouseOver: _propTypes2.default.func,

  /**
   * An optional function to call onMouseLeave.
   */
  onMouseLeave: _propTypes2.default.func,

  /**
   * Boolean if the row is currently selected. If this value will be
   * injected by the `TableHeader` or `TableBody` component.
   */
  selected: _propTypes2.default.bool,

  /**
   * Boolean if the current row is selectable. This value will take precedence over anything inherited
   * by the `DataTable`.
   */
  selectable: _propTypes2.default.bool,

  autoAdjust: (0, _deprecated2.default)(_propTypes2.default.bool, 'Manually specify `grow` on one of the columns instead')
};
TableRow.contextTypes = _headerContextTypes2.default;
TableRow.childContextTypes = _rowContextTypes2.default;
exports.default = TableRow;
//# sourceMappingURL=TableRow.js.map