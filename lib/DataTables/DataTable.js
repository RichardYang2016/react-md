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

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _requiredForA11yIfNot = require('../utils/PropTypes/requiredForA11yIfNot');

var _requiredForA11yIfNot2 = _interopRequireDefault(_requiredForA11yIfNot);

var _invalidIf = require('../utils/PropTypes/invalidIf');

var _invalidIf2 = _interopRequireDefault(_invalidIf);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _getDeprecatedIcon = require('../FontIcons/getDeprecatedIcon');

var _getDeprecatedIcon2 = _interopRequireDefault(_getDeprecatedIcon);

var _contextTypes = require('./contextTypes');

var _contextTypes2 = _interopRequireDefault(_contextTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `DataTable` component is used to manage the state of all rows.
 * This can either be a __plain__ table or a __data__ table.
 *
 * A __data__ table will include checkboxes on each row while a __plain__ table
 * will not.
 */
var DataTable = function (_PureComponent) {
  _inherits(DataTable, _PureComponent);

  function DataTable(props) {
    _classCallCheck(this, DataTable);

    var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this));

    _initialiseProps.call(_this);

    var rows = props.defaultSelectedRows;
    _this.state = {
      header: false,
      indeterminate: props.indeterminate ? false : undefined,
      allSelected: _this._allSelected(rows),
      selectedRows: rows
    };

    _this._removed = 0;
    _this._initial = true;
    return _this;
  }

  _createClass(DataTable, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _props = this.props,
          checkedIcon = _props.checkedIcon,
          uncheckedIcon = _props.uncheckedIcon,
          indeterminateIcon = _props.indeterminateIcon,
          plain = _props.plain,
          baseId = _props.baseId,
          selectableRows = _props.selectableRows,
          checkboxHeaderLabel = _props.checkboxHeaderLabel,
          checkboxLabelTemplate = _props.checkboxLabelTemplate,
          fixedHeader = _props.fixedHeader,
          fixedFooter = _props.fixedFooter,
          checkedIconChildren = _props.checkedIconChildren,
          checkedIconClassName = _props.checkedIconClassName,
          uncheckedIconChildren = _props.uncheckedIconChildren,
          uncheckedIconClassName = _props.uncheckedIconClassName,
          indeterminateIconChildren = _props.indeterminateIconChildren,
          indeterminateIconClassName = _props.indeterminateIconClassName;


      return {
        checkedIcon: (0, _getDeprecatedIcon2.default)(checkedIconClassName, checkedIconChildren, checkedIcon),
        uncheckedIcon: (0, _getDeprecatedIcon2.default)(uncheckedIconClassName, uncheckedIconChildren, uncheckedIcon),
        indeterminateIcon: (0, _getDeprecatedIcon2.default)(indeterminateIconClassName, indeterminateIconChildren, indeterminateIcon),
        indeterminate: this.state.indeterminate,
        plain: plain,
        allSelected: this.state.allSelected,
        selectedRows: this.state.selectedRows,
        toggleSelectedRow: this._toggleSelectedRow,
        createCheckbox: this._createCheckbox,
        removeCheckbox: this._removeCheckbox,
        baseId: baseId,
        baseName: baseId + '-control',
        selectableRows: selectableRows,
        checkboxHeaderLabel: checkboxHeaderLabel,
        checkboxLabelTemplate: checkboxLabelTemplate,
        fixedHeader: fixedHeader,
        fixedFooter: fixedFooter
      };
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._removed = 0;
      this._initial = false;
    }
  }, {
    key: '_allSelected',
    value: function _allSelected(rows) {
      var all = rows.length !== 0;
      rows.some(function (checked) {
        if (!checked) {
          all = false;
        }

        return !all;
      });

      return all;
    }
  }, {
    key: 'render',
    value: function render() {
      var _cn;

      var _props2 = this.props,
          style = _props2.style,
          className = _props2.className,
          tableStyle = _props2.tableStyle,
          tableClassName = _props2.tableClassName,
          fixedWrapperStyle = _props2.fixedWrapperStyle,
          fixedWrapperClassName = _props2.fixedWrapperClassName,
          fixedScrollWrapperStyle = _props2.fixedScrollWrapperStyle,
          fixedScrollWrapperClassName = _props2.fixedScrollWrapperClassName,
          children = _props2.children,
          plain = _props2.plain,
          responsive = _props2.responsive,
          fixedHeader = _props2.fixedHeader,
          fixedFooter = _props2.fixedFooter,
          fixedDividers = _props2.fixedDividers,
          fixedHeight = _props2.fixedHeight,
          fixedWidth = _props2.fixedWidth,
          headerHeight = _props2.headerHeight,
          footerHeight = _props2.footerHeight,
          fullWidth = _props2.fullWidth,
          indeterminate = _props2.indeterminate,
          indeterminateIcon = _props2.indeterminateIcon,
          checkedIcon = _props2.checkedIcon,
          uncheckedIcon = _props2.uncheckedIcon,
          defaultSelectedRows = _props2.defaultSelectedRows,
          baseId = _props2.baseId,
          onRowToggle = _props2.onRowToggle,
          selectableRows = _props2.selectableRows,
          checkboxHeaderLabel = _props2.checkboxHeaderLabel,
          checkboxLabelTemplate = _props2.checkboxLabelTemplate,
          checkedIconChildren = _props2.checkedIconChildren,
          checkedIconClassName = _props2.checkedIconClassName,
          uncheckedIconChildren = _props2.uncheckedIconChildren,
          uncheckedIconClassName = _props2.uncheckedIconClassName,
          indeterminateIconChildren = _props2.indeterminateIconChildren,
          indeterminateIconClassName = _props2.indeterminateIconClassName,
          props = _objectWithoutProperties(_props2, ['style', 'className', 'tableStyle', 'tableClassName', 'fixedWrapperStyle', 'fixedWrapperClassName', 'fixedScrollWrapperStyle', 'fixedScrollWrapperClassName', 'children', 'plain', 'responsive', 'fixedHeader', 'fixedFooter', 'fixedDividers', 'fixedHeight', 'fixedWidth', 'headerHeight', 'footerHeight', 'fullWidth', 'indeterminate', 'indeterminateIcon', 'checkedIcon', 'uncheckedIcon', 'defaultSelectedRows', 'baseId', 'onRowToggle', 'selectableRows', 'checkboxHeaderLabel', 'checkboxLabelTemplate', 'checkedIconChildren', 'checkedIconClassName', 'uncheckedIconChildren', 'uncheckedIconClassName', 'indeterminateIconChildren', 'indeterminateIconClassName']);

      var table = _react2.default.createElement(
        'table',
        _extends({}, props, {
          ref: this._setTable,
          style: responsive ? tableStyle : style,
          className: (0, _classnames2.default)('md-data-table', (_cn = {
            'md-data-table--plain': plain,
            'md-data-table--full-width': fullWidth
          }, _defineProperty(_cn, className, !responsive && className), _defineProperty(_cn, tableClassName, responsive && tableClassName), _cn))
        }),
        children
      );

      if (!responsive) {
        return table;
      }

      var content = table;
      if (fixedHeader || fixedFooter) {
        var height = fixedHeight;
        if (fixedHeight) {
          if (fixedHeader) {
            height -= headerHeight;
          }

          if (fixedFooter) {
            height -= footerHeight;
          }
        }

        var borderTop = fixedHeader;
        var borderBot = fixedFooter;
        if (typeof fixedDividers === 'boolean') {
          borderTop = borderTop && fixedDividers;
          borderBot = borderBot && fixedDividers;
        } else {
          borderTop = borderTop && (typeof fixedDividers.header === 'undefined' || fixedDividers.header);
          borderBot = borderBot && (typeof fixedDividers.footer === 'undefined' || fixedDividers.footer);
        }

        content = _react2.default.createElement(
          'div',
          {
            style: fixedWrapperStyle,
            className: (0, _classnames2.default)('md-data-table__fixed-wrapper', {
              'md-data-table__fixed-wrapper--header': fixedHeader,
              'md-data-table__fixed-wrapper--footer': fixedFooter
            }, fixedWrapperClassName)
          },
          _react2.default.createElement(
            'div',
            {
              style: _extends({ height: height }, fixedScrollWrapperStyle),
              className: (0, _classnames2.default)('md-data-table__scroll-wrapper', {
                'md-divider-border': fixedDividers,
                'md-divider-border--top': borderTop,
                'md-divider-border--bottom': borderBot
              }, fixedScrollWrapperClassName)
            },
            table
          )
        );
      }

      return _react2.default.createElement(
        'div',
        {
          style: _extends({ width: fixedWidth }, style),
          className: (0, _classnames2.default)('md-data-table--responsive', {
            'md-data-table--fixed': fixedHeader || fixedFooter
          }, className)
        },
        content
      );
    }
  }]);

  return DataTable;
}(_react.PureComponent);

DataTable.propTypes = {
  /**
   * A base id to use for every checkbox or `EditDialogColumn` in the data table. This is
   * required for a11y if the data table is not plain. It is recommended to always provide
   * this prop if you are using any of the advanced table components to auto-generate unique
   * ids for each element.
   *
   * @see {@link DataTables/EditDialogColumn}
   * @see {@link DataTables/SelectFieldColumn}
   * @see {@link DataTables/DropdownMenuColumn}
   * @see {@link DataTables/MenuButtonColumn}
   * @see {@link DataTables/TablePagination}
   */
  baseId: (0, _requiredForA11yIfNot2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]), 'plain'),

  /**
   * Optional style to apply to the table. If the table is `responsive`, this will be applied to the surrounding `div`
   * instead of the table itself. Use the `tableStyle` in this case.
   *
   * @see {@link #tableStyle}
   * @see {@link #responsive}
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the table. If the table is `responsive`, this will be applied to the
   * surrounding `div` instead of the table itself. Use the `tableClassName` in this case.
   *
   * @see {@link #tableClassName}
   * @see {@link #responsive}
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the `table` itself when the `responsive` prop is enabled. If the table is not
   * `responsive`, use the `style` prop.
   *
   * @see {@link #style}
   * @see {@link #responsive}
   */
  tableStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the `table` itself when the `responsive` prop is enabled. If the table is not
   * `responsive`, use the `className` prop.
   *
   * @see {@link #className}
   * @see {@link #responsive}
   */
  tableClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the fixed table wrapper that appears when there is a fixed
   * header or a fixed footer.
   *
   * @see {@link #fixedHeader}
   * @see {@link #fixedFooter}
   * @see {@link #fixedWrapperClassName}
   * @see {@link #fixedScrollWrapperStyle}
   * @see {@link #fixedScrollWrapperClassName}
   */
  fixedWrapperStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the fixed table wrapper that appears when there is a fixed
   * header or a fixed footer.
   *
   * @see {@link #fixedHeader}
   * @see {@link #fixedFooter}
   * @see {@link #fixedWrapperStyle}
   * @see {@link #fixedScrollWrapperStyle}
   * @see {@link #fixedScrollWrapperClassName}
   */
  fixedWrapperClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the fixed table wrapper's scroll container that appears when there is a fixed
   * header or a fixed footer.
   *
   * @see {@link #fixedHeader}
   * @see {@link #fixedFooter}
   * @see {@link #fixedWrapperStyle}
   * @see {@link #fixedWrapperClassName}
   * @see {@link #fixedScrollWrapperStyle}
   */
  fixedScrollWrapperStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the fixed table wrapper's scroll container that appears when there is a fixed
   * header or a fixed footer.
   *
   * @see {@link #fixedHeader}
   * @see {@link #fixedFooter}
   * @see {@link #fixedWrapperStyle}
   * @see {@link #fixedWrapperClassName}
   * @see {@link #fixedScrollWrapperStyle}
   */
  fixedScrollWrapperClassName: _propTypes2.default.string,

  /**
   * The table contents to display. This *should* be a list of `TableHeader` and `TableBody`
   * components.
   */
  children: _propTypes2.default.node.isRequired,

  /**
   * An optional array of booleans denoting if a row is selected.
   * This is an associative array so the index must match the row
   * number in the `TableBody` component.
   */
  defaultSelectedRows: _propTypes2.default.arrayOf(_propTypes2.default.bool).isRequired,

  /**
   * Boolean if the table is responsive. This will wrap the table in a container
   * that allows scrolling to the right if overflow exists.
   */
  responsive: _propTypes2.default.bool.isRequired,

  /**
   * Boolean if this table should not include the checkboxes on each row.
   * This really means that the entire table is unselectable and you wish
   * to display as a normal table.
   */
  plain: _propTypes2.default.bool,

  /**
   * The checked checkbox icon to display when a row is selected. This really defaults
   * to the `checkedCheckboxIcon` prop from the `SelectionControl`.
   *
   * @see {@link SelectionControls/SelectionControl#checkedCheckboxIcon}
   */
  checkedIcon: _propTypes2.default.element,

  /**
   * The unchecked checkbox icon to display when a row is selected. This really defaults
   * to the `uncheckedCheckboxIcon` prop from the `SelectionControl`.
   *
   * @see {@link SelectionControls/SelectionControl#uncheckedCheckboxIcon}
   */
  uncheckedIcon: _propTypes2.default.element,

  /**
   * An optional function to call when a non-plain data table has a row toggled. The callback
   * will include:
   * - the row id
   * - boolean if the row is now checked
   * - the total count of rows selected
   * - the change event
   *
   * All rows will be toggled on or off when the row id is 0 and a `thead` exists in the table.
   */
  onRowToggle: (0, _invalidIf2.default)(_propTypes2.default.func, 'plain'),

  /**
   * Boolean if the `DataTable` should inject checkboxes at the start of each row.
   */
  selectableRows: _propTypes2.default.bool,

  /**
   * Boolean if the checkboxes in the table should also include an _indeterminate_ state.
   * It will use the `indeterminateIconChildren` and `indeterminateIconClassName` when at least
   * 1 row has been checked, but not all rows.
   */
  indeterminate: _propTypes2.default.bool,

  /**
   * An optional icon to display when the selected state is indeterminate.
   *
   * @see {@link #indeterminate}
   */
  indeterminateIcon: _propTypes2.default.element,

  /**
   * This is the aria-label to apply to the checkbox in the table's header. This
   * is just used for accessibility since the checkboxes have no visible label.
   */
  checkboxHeaderLabel: _propTypes2.default.string.isRequired,

  /**
   * This is the aria-label to apply to a checkbox in the table's body. This can either
   * be a constant string that will replace `{{row}}` with the current row index, or
   * a function that takes the row index and returns a string.
   *
   * ```js
   * checkboxLabelTemplate={rowIndex => `Toggle row ${row}`}
   * ```
   */
  checkboxLabelTemplate: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,

  /**
   * Boolean if the table should include a fixed header. This will allow the `TableHeader` component
   * to stay fixed to the top of the table while the `TableBody` scrolls horizontally.
   *
   * @see {@link #fixedFooter}
   * @see [react-md-make-fixed-table](/components/data-tables?tab=2#mixin-react-md-make-fixed-table)
   */
  fixedHeader: _propTypes2.default.bool,

  /**
   * Boolean if the table should include a fixed footer. This will allow the `TableFooter` component
   * to stay fixed to the bottom of the table while the `TableBody` scrolls horizontally.
   *
   * @see {@link #fixedHeader}
   * @see [react-md-make-fixed-table](/components/data-tables?tab=2#mixin-react-md-make-fixed-table)
   */
  fixedFooter: _propTypes2.default.bool,

  /**
   * Either a boolean or a shape of booleans for if a divider should appear at the top or bottom of the table
   * when there is a fixed header/footer. By default, this will automatically create dividers.
   *
   * @see {@link #fixedHeader}
   * @see {@link #fixedFooter}
   */
  fixedDividers: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.shape({
    header: _propTypes2.default.bool,
    footer: _propTypes2.default.bool
  })]),

  /**
   * An optional height to set for a table with a fixed header and/or a fixed footer. It is recommended to use
   * the related `react-md-make-fixed-table` mixin instead.
   *
   * @see {@link #headerHeight}
   * @see {@link #footerHeight}
   */
  fixedHeight: _propTypes2.default.number,

  /**
   * An optional width to set for a table with a fixed header and/or a fixed footer. It is recommended to use
   * the related `react-md-make-fixed-table` mixin instead.
   */
  fixedWidth: _propTypes2.default.number,

  /**
   * This is the height of the table's header columns. This should be equal to the `md-data-table-header-height`
   * variable.
   *
   * @see [md-data-table-header-height](/components/data-tables?tab=2#variable-md-data-table-header-height)
   * @see {@link #fixedHeight}
   */
  headerHeight: _propTypes2.default.number.isRequired,

  /**
   * This is the height of the table's header columns. This should be equal to the `md-data-table-header-height`
   * variable.
   *
   * @see [md-data-table-column-height](/components/data-tables?tab=2#variable-md-data-table-column-height)
   * @see {@link #fixedHeight}
   */
  footerHeight: _propTypes2.default.number.isRequired,

  /**
   * Boolean if the `<table>` element should always span the entire width of its container.
   */
  fullWidth: _propTypes2.default.bool,

  indeterminateIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `indeterminateIcon` prop instead'),
  indeterminateIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `indeterminateIcon` prop instead'),
  checkedIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `checkedIcon` prop instead'),
  checkedIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `checkedIcon` prop instead'),
  uncheckedIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `uncheckedIcon` prop instead'),
  uncheckedIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `uncheckedIcon` prop instead')
};
DataTable.defaultProps = {
  indeterminateIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'indeterminate_check_box'
  ),
  defaultSelectedRows: [],
  responsive: true,
  selectableRows: true,
  checkboxHeaderLabel: 'Toggle All Rows',
  checkboxLabelTemplate: 'Toggle row {{row}}',
  fixedHeader: false,
  fixedFooter: false,
  fixedDividers: true,
  headerHeight: 56,
  footerHeight: 48,
  fullWidth: true
};
DataTable.childContextTypes = _contextTypes2.default;

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._setTable = function (table) {
    _this2._table = table;
  };

  this._createCheckbox = function (index) {
    _this2.setState(function (state, props) {
      var selectedRows = state.selectedRows.slice();
      // Only use the default selected rows prop on first mount. If other changes occur after,
      // default to false.
      var selected = _this2._initial && props.defaultSelectedRows[index] || false;
      selectedRows.splice(index, 0, selected);
      return { selectedRows: selectedRows, allSelected: _this2._allSelected(selectedRows) };
    });
  };

  this._removeCheckbox = function (index) {
    _this2.setState(function (state) {
      // When multiple checkboxes are removed in a render cycle, they are removed in list order.
      // So to keep the index correct while removing, need to keep subtract the provided index by
      // the current number of removed elements. This value gets reset to 0 after a finished cycle.
      var selectedRows = state.selectedRows.slice();

      // This is really ugly. React 16 doesn't need to track all this while React 15 does
      if (_react2.default.version && _react2.default.version.match(/^16\./)) {
        selectedRows.splice(index, 1);
      } else {
        selectedRows.splice(index - _this2._removed, 1);
        _this2._removed += 1;
      }
      return { selectedRows: selectedRows, allSelected: _this2._allSelected(selectedRows) };
    });
  };

  this._toggleSelectedRow = function (row, header, e) {
    var selectedRows = void 0;
    var allSelected = _this2.state.allSelected;
    var selectedCount = 0;
    var i = _this2._table && _this2._table.querySelector('.md-table-header') ? row - 1 : row;
    var checked = e.target.checked;

    if (header) {
      selectedRows = _this2.state.selectedRows.map(function () {
        return checked;
      });
      allSelected = checked;
      selectedCount = !checked ? 0 : selectedRows.length;
    } else {
      selectedRows = _this2.state.selectedRows.slice();
      selectedRows[i] = !selectedRows[i];
      selectedCount = selectedRows.filter(function (b) {
        return b;
      }).length;
      allSelected = selectedCount === selectedRows.length;
    }

    if (_this2.props.onRowToggle) {
      _this2.props.onRowToggle(row, checked, selectedCount, e);
    }

    var indeterminate = _this2.props.indeterminate && !allSelected && selectedCount > 0;

    _this2.setState({ selectedRows: selectedRows, allSelected: allSelected, indeterminate: indeterminate });
  };
};

exports.default = DataTable;
//# sourceMappingURL=DataTable.js.map