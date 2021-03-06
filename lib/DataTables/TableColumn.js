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

var _themeColors = require('../utils/themeColors');

var _themeColors2 = _interopRequireDefault(_themeColors);

var _getCollapserStyles = require('../utils/getCollapserStyles');

var _getCollapserStyles2 = _interopRequireDefault(_getCollapserStyles);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _injectTooltip = require('../Tooltips/injectTooltip');

var _injectTooltip2 = _interopRequireDefault(_injectTooltip);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _getDeprecatedIcon = require('../FontIcons/getDeprecatedIcon');

var _getDeprecatedIcon2 = _interopRequireDefault(_getDeprecatedIcon);

var _IconSeparator = require('../Helpers/IconSeparator');

var _IconSeparator2 = _interopRequireDefault(_IconSeparator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CELL_SCOPE = {
  header: {
    scope: 'col'
  },
  noop: {}
};

/**
 * A column in a table. This is either the `th` or `td` component.
 */

var TableColumn = function (_PureComponent) {
  _inherits(TableColumn, _PureComponent);

  function TableColumn() {
    _classCallCheck(this, TableColumn);

    return _possibleConstructorReturn(this, (TableColumn.__proto__ || Object.getPrototypeOf(TableColumn)).apply(this, arguments));
  }

  _createClass(TableColumn, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          fixedStyle = _props.fixedStyle,
          fixedClassName = _props.fixedClassName,
          numeric = _props.numeric,
          header = _props.header,
          children = _props.children,
          sorted = _props.sorted,
          sortIcon = _props.sortIcon,
          tooltip = _props.tooltip,
          selectColumnHeader = _props.selectColumnHeader,
          adjusted = _props.adjusted,
          grow = _props.grow,
          sortIconBefore = _props.sortIconBefore,
          propPlain = _props.plain,
          propScope = _props.scope,
          cellIndex = _props.cellIndex,
          sortIconChildren = _props.sortIconChildren,
          sortIconClassName = _props.sortIconClassName,
          props = _objectWithoutProperties(_props, ['className', 'fixedStyle', 'fixedClassName', 'numeric', 'header', 'children', 'sorted', 'sortIcon', 'tooltip', 'selectColumnHeader', 'adjusted', 'grow', 'sortIconBefore', 'plain', 'scope', 'cellIndex', 'sortIconChildren', 'sortIconClassName']);

      var sortable = typeof sorted === 'boolean';
      var plain = (0, _getField2.default)(this.props, this.context, 'plain');
      var Component = header ? 'th' : 'td';
      var scope = (0, _getField2.default)(this.props, CELL_SCOPE[header ? 'header' : 'noop'], 'scope');

      var displayedChildren = children;
      var ariaSort = void 0;
      if (sortable) {
        ariaSort = sorted ? 'ascending' : 'descending';
        var icon = _react2.default.Children.only((0, _getDeprecatedIcon2.default)(sortIconClassName, sortIconChildren, sortIcon));
        displayedChildren = _react2.default.createElement(
          _IconSeparator2.default,
          { label: children, iconBefore: sortIconBefore },
          _react2.default.cloneElement(icon, { className: (0, _getCollapserStyles2.default)({ flipped: !sorted }, icon.props.className) })
        );
      }

      var fixedHeader = header && this.context.fixedHeader;
      var fixedFooter = this.context.footer && this.context.fixedFooter;
      var fixed = fixedHeader || fixedFooter;
      var baseClassNames = (0, _themeColors2.default)({ text: !header, hint: header }, {
        'md-table-column--relative': tooltip,
        'md-table-column--select-field': selectColumnHeader
      });

      var mergedClassNames = (0, _classnames2.default)(_defineProperty({
        'md-table-column--header': header,
        'md-table-column--data': !header && !plain,
        'md-table-column--plain': !header && plain,
        'md-table-column--adjusted': adjusted && !grow && !selectColumnHeader,
        'md-table-column--grow': grow,
        'md-table-column--sortable md-pointer--hover': sortable
      }, baseClassNames, !fixed), className);

      if (fixed) {
        displayedChildren = _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('md-table-column__fixed', {
              'md-table-column__fixed--header': fixedHeader,
              'md-table-column__fixed--footer': fixedFooter
            })
          },
          _react2.default.createElement(
            'div',
            {
              style: fixedStyle,
              className: (0, _classnames2.default)(baseClassNames, mergedClassNames, 'md-table-column__fixed--flex', {
                'md-table-column__fixed--flex-right': numeric
              }, fixedClassName)
            },
            tooltip,
            displayedChildren
          )
        );
      }

      return _react2.default.createElement(
        Component,
        _extends({
          'aria-sort': ariaSort
        }, props, {
          scope: scope,
          className: (0, _classnames2.default)('md-table-column', {
            'md-table-column--fixed': fixed,
            'md-text-left': !numeric && !fixed,
            'md-text-right': numeric && !fixed
          }, mergedClassNames)
        }),
        !fixedHeader && !fixedFooter && tooltip,
        displayedChildren
      );
    }
  }]);

  return TableColumn;
}(_react.PureComponent);

TableColumn.propTypes = {
  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * The optional className for the table column
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the surrounding div when the DataTable has been
   * set to include a fixed header or a fixed footer.
   */
  fixedStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the surrounding div when the DataTable has been
   * set to include a fixed header or a fixed footer.
   */
  fixedClassName: _propTypes2.default.string,

  /**
   * The children to display in the column.
   */
  children: _propTypes2.default.node,

  /**
   * Boolean if the column is currently sorted. If this prop is not `undefined`,
   * it will add the sort icon unto this column. You will also need to use the
   * `onClick` function to toggle the `sorted` prop as well as handling the sorting
   * of data.
   *
   * This value should really only be set in the `TableHeader` component.
   */
  sorted: _propTypes2.default.bool,

  /**
   * The icon to show when a column is sortable.
   */
  sortIcon: _propTypes2.default.element,

  /**
   * Boolean if the sortIcon should appear before the text in the column.
   */
  sortIconBefore: _propTypes2.default.bool,

  /**
   * A boolean if the column has numeric data. It will right-align the data.
   */
  numeric: _propTypes2.default.bool,

  /**
   * Boolean if the table column should gain the `.md-data-table--adjusted` class name. By default,
   * every column will gain this class name unless it is an `EditDialogColumn`, a `SelectFieldColumn`,
   * or the `grow` prop is enabled.
   */
  adjusted: _propTypes2.default.bool,

  /**
   * Boolean if the column should expand to fill any remaining width in the container. There should
   * really only be one column with the `grow` prop enabled. In addition, it should really only be
   * applied to one of the columns in the TableHeader.
   */
  grow: _propTypes2.default.bool,

  /**
   * Boolean if this column is the `th` for a column of `SelectFieldColumn`. This will apply
   * additional styling to the column to position with the select field.
   */
  selectColumnHeader: _propTypes2.default.bool,

  /**
   * Boolean if this is a `th` component. This value **should** be set
   * automatically for you if it is in the `TableHeader` component.
   */
  header: _propTypes2.default.bool.isRequired,

  /**
   * The optional tooltip to render on hover.
   */
  tooltipLabel: _propTypes2.default.node,

  /**
   * An optional delay to apply to the tooltip before it appears.
   */
  tooltipDelay: _propTypes2.default.number,

  /**
   * The position of the tooltip.
   */
  tooltipPosition: _propTypes2.default.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The injected tooltip.
   * @access private
   */
  tooltip: _propTypes2.default.node,

  /**
   * Boolean if the `TableColumn` should gain the `plain` styles. This means that the text
   * in the column can wrap and there is no height limit enforced with some additional padding.
   */
  plain: _propTypes2.default.bool,

  /**
   * An optional scope to apply to the table column. If omitted, the scope will be set to
   * `'col'` if inside of the `TableHeader` component. This is really only needed for
   * header columns.
   */
  scope: _propTypes2.default.oneOf(['row', 'col']),

  /**
   * This is injected by the `TableRow` component to help with generating ids
   * @access private
   */
  cellIndex: _propTypes2.default.number,
  sortIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `sortIcon` prop instead'),
  sortIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `sortIcon` prop instead')
};
TableColumn.defaultProps = {
  header: false,
  adjusted: true,
  sortIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'arrow_upward'
  ),
  sortIconBefore: true
};
TableColumn.contextTypes = {
  plain: _propTypes2.default.bool,
  footer: _propTypes2.default.bool,
  fixedHeader: _propTypes2.default.bool,
  fixedFooter: _propTypes2.default.bool
};
exports.default = (0, _injectTooltip2.default)(TableColumn);
//# sourceMappingURL=TableColumn.js.map