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

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _ResizeObserver = require('../Helpers/ResizeObserver');

var _ResizeObserver2 = _interopRequireDefault(_ResizeObserver);

var _SelectField = require('../SelectFields/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _Button = require('../Buttons/Button');

var _Button2 = _interopRequireDefault(_Button);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _getDeprecatedIcon = require('../FontIcons/getDeprecatedIcon');

var _getDeprecatedIcon2 = _interopRequireDefault(_getDeprecatedIcon);

var _findTable = require('./findTable');

var _findTable2 = _interopRequireDefault(_findTable);

var _TableFooter = require('./TableFooter');

var _TableFooter2 = _interopRequireDefault(_TableFooter);

var _TableColumn = require('./TableColumn');

var _TableColumn2 = _interopRequireDefault(_TableColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `TablePagination` component is used to generate the table footer that helps
 * pagination through a large dataset by limiting the number of rows per page.
 * The pagination will always be placed persistently at the bottom of the table
 * so that when a user scrolls to the right, they will always be able to use the
 * pagination.
 */
var TablePagination = function (_PureComponent) {
  _inherits(TablePagination, _PureComponent);

  function TablePagination(props, context) {
    _classCallCheck(this, TablePagination);

    var _this = _possibleConstructorReturn(this, (TablePagination.__proto__ || Object.getPrototypeOf(TablePagination)).call(this, props, context));

    _initialiseProps.call(_this);

    var controlledPage = typeof props.page !== 'undefined';
    var controlledRowsPerPage = typeof props.rowsPerPage !== 'undefined';
    var rowsPerPage = controlledRowsPerPage ? props.rowsPerPage : props.defaultRowsPerPage;
    var page = controlledPage ? props.page : props.defaultPage;
    _this.state = {
      start: (page - 1) * rowsPerPage,
      controlsMarginLeft: 0
    };

    if (!controlledPage) {
      _this.state.page = page;
    }

    if (!controlledRowsPerPage) {
      _this.state.rowsPerPage = props.defaultRowsPerPage;
    }

    _this._table = null;
    _this._ticking = false;
    return _this;
  }

  _createClass(TablePagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          rowsPerPage = _props.rowsPerPage,
          page = _props.page;

      if (page !== nextProps.page || rowsPerPage !== nextProps.rowsPerPage) {
        var rpp = (0, _getField2.default)(nextProps, this.state, 'rowsPerPage');
        var p = (0, _getField2.default)(nextProps, this.state, 'page');

        this.setState({ start: (p - 1) * rpp });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          controlsMarginLeft = _state.controlsMarginLeft,
          start = _state.start;

      var _props2 = this.props,
          className = _props2.className,
          selectFieldStyle = _props2.selectFieldStyle,
          selectFieldClassName = _props2.selectFieldClassName,
          selectFieldInputStyle = _props2.selectFieldInputStyle,
          selectFieldInputClassName = _props2.selectFieldInputClassName,
          rows = _props2.rows,
          rowsPerPageLabel = _props2.rowsPerPageLabel,
          rowsPerPageItems = _props2.rowsPerPageItems,
          incrementIcon = _props2.incrementIcon,
          decrementIcon = _props2.decrementIcon,
          simplifiedMenu = _props2.simplifiedMenu,
          incrementIconChildren = _props2.incrementIconChildren,
          incrementIconClassName = _props2.incrementIconClassName,
          decrementIconChildren = _props2.decrementIconChildren,
          decrementIconClassName = _props2.decrementIconClassName,
          propId = _props2.id,
          propIncrementId = _props2.incrementId,
          propDecrementId = _props2.decrementId,
          onPagination = _props2.onPagination,
          propRowsPerPage = _props2.rowsPerPage,
          propPage = _props2.page,
          defaultPage = _props2.defaultPage,
          defaultRowsPerPage = _props2.defaultRowsPerPage,
          props = _objectWithoutProperties(_props2, ['className', 'selectFieldStyle', 'selectFieldClassName', 'selectFieldInputStyle', 'selectFieldInputClassName', 'rows', 'rowsPerPageLabel', 'rowsPerPageItems', 'incrementIcon', 'decrementIcon', 'simplifiedMenu', 'incrementIconChildren', 'incrementIconClassName', 'decrementIconChildren', 'decrementIconClassName', 'id', 'incrementId', 'decrementId', 'onPagination', 'rowsPerPage', 'page', 'defaultPage', 'defaultRowsPerPage']);

      var baseId = this.context.baseId;

      var rowsPerPage = (0, _getField2.default)(this.props, this.state, 'rowsPerPage');
      var _props3 = this.props,
          id = _props3.id,
          incrementId = _props3.incrementId,
          decrementId = _props3.decrementId;

      if (!id) {
        id = baseId + '-pagination';
      }

      if (!incrementId) {
        incrementId = id + '-increment-btn';
      }

      if (!decrementId) {
        decrementId = id + '-decrement-btn';
      }

      var pagination = start + 1 + '-' + Math.min(rows, start + rowsPerPage) + ' of ' + rows;
      return _react2.default.createElement(
        _TableFooter2.default,
        _extends({}, props, { className: (0, _classnames2.default)('md-table-footer--pagination', className) }),
        _react2.default.createElement(_ResizeObserver2.default, { watchWidth: true, component: 'tr', onResize: this._throttledPosition }),
        _react2.default.createElement(_ResizeObserver2.default, { watchWidth: true, component: 'tr', target: this._table, onResize: this._throttledPosition }),
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            _TableColumn2.default,
            { colSpan: '100%' },
            _react2.default.createElement(
              'div',
              {
                ref: this._setControls,
                className: 'md-table-pagination md-table-pagination--controls md-text',
                style: { marginLeft: controlsMarginLeft }
              },
              _react2.default.createElement(
                'span',
                { className: 'md-table-pagination__label' },
                rowsPerPageLabel
              ),
              _react2.default.createElement(_SelectField2.default, {
                id: id,
                menuItems: rowsPerPageItems,
                position: _SelectField2.default.Positions.BELOW,
                style: selectFieldStyle,
                className: selectFieldClassName,
                inputStyle: selectFieldInputStyle,
                inputClassName: (0, _classnames2.default)('md-select-field--pagination', selectFieldInputClassName),
                value: rowsPerPage,
                onChange: this._setRowsPerPage,
                simplifiedMenu: simplifiedMenu
              }),
              _react2.default.createElement(
                'span',
                { className: 'md-table-pagination--label' },
                pagination
              ),
              _react2.default.createElement(_Button2.default, {
                id: decrementId,
                icon: true,
                onClick: this._decrement,
                disabled: start === 0,
                iconEl: (0, _getDeprecatedIcon2.default)(decrementIconClassName, decrementIconChildren, decrementIcon)
              }),
              _react2.default.createElement(_Button2.default, {
                id: incrementId,
                icon: true,
                onClick: this._increment,
                disabled: start + rowsPerPage >= rows,
                iconEl: (0, _getDeprecatedIcon2.default)(incrementIconClassName, incrementIconChildren, incrementIcon)
              })
            ),
            _react2.default.createElement('div', { className: 'md-table-pagination' })
          )
        )
      );
    }
  }]);

  return TablePagination;
}(_react.PureComponent);

TablePagination.propTypes = {
  /**
   * An optional id to provide to the select field. If this is omitted, it will be
   * the `DataTable`'s `baseId` with '-pagination'.
   *
   * @see {@link DataTables/DataTable#baseId}
   */
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional id to provide to the increment icon button. If this is omitted, it will be
   * the `id` with '-increment-btn'.
   *
   * @see {@link #id}
   */
  incrementId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional id to provide to the decrement icon button. If this is omitted, it will be
   * the `id` with '-decrement-btn'.
   *
   * @see {@link #id}
   */
  decrementId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  /**
   * An optional style to apply to the `tfoot` tag.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the `tfoot` tag.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the select field.
   *
   * @see {@link SelectFields/SelectField#style}
   */
  selectFieldStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the select field.
   *
   * @see {@link SelectFields/SelectField#className}
   */
  selectFieldClassName: _propTypes2.default.string,

  /**
   * An optional style to apply to the select field's input.
   *
   * @see {@link SelectFields/SelectField#inputStyle}
   */
  selectFieldInputStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the select field's input.
   *
   * @see {@link SelectFields/SelectField#inputClassName}
   */
  selectFieldInputClassName: _propTypes2.default.string,

  /**
   * Boolean if the select field should use the simplified menu logic.
   *
   * @see {@link Helpers/Layover#simplified}
   */
  simplifiedMenu: _propTypes2.default.bool,

  /**
   * A function to call when a user clicks the increment or decrement pagination
   * icon button. This function will be given the new start index and the number
   * or rows per page as well as the current page.
   *
   * ```js
   * onPagination(newStart, rowsPerPage, currentPage);
   * ```
   */
  onPagination: _propTypes2.default.func.isRequired,

  /**
   * The current value for the select field holding the number of rows per page.
   */
  rowsPerPage: _propTypes2.default.number,

  /**
   * The current page for the pagination. This will make the component controlled, so the only way to get pagination
   * is making sure you are updating this prop after the `onPagination` callback is called.
   *
   * Pages start from 1 instead of 0.
   */
  page: _propTypes2.default.number,

  /**
   * The default page to start from for the pagination. Pages start from 1 instead of 0.
   */
  defaultPage: _propTypes2.default.number.isRequired,

  /**
   * The default number of rows per page to display. This will be the value for the
   * `SelectField`.
   */
  defaultRowsPerPage: _propTypes2.default.number.isRequired,

  /**
   * The label to use for the rows per page `SelectField`.
   */
  rowsPerPageLabel: _propTypes2.default.node.isRequired,

  /**
   * A list of numbers for the amount of rows per page to display at a time.
   * This will be rendered into the `SelectField`.
   */
  rowsPerPageItems: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,

  /**
   * The total number of rows that can be displayed. This is the unfiltered/non-subset
   * number of rows. This is used to help calculate the increment/decrement values to
   * display and determine if the user can increment/decrement again.
   */
  rows: _propTypes2.default.number.isRequired,

  /**
   * The icon to use for the increment icon button.
   */
  incrementIcon: _propTypes2.default.element,

  /**
   * The icon to use for the decrement icon button.
   */
  decrementIcon: _propTypes2.default.element,

  incrementIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `incrementIcon` prop instead'),
  incrementIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `incrementIcon` prop instead'),
  decrementIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `decrementIcon` prop instead'),
  decrementIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `decrementIcon` prop instead')
};
TablePagination.contextTypes = {
  baseId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  fixedFooter: _propTypes2.default.bool
};
TablePagination.defaultProps = {
  defaultPage: 1,
  defaultRowsPerPage: 10,
  rowsPerPageLabel: 'Rows per page:',
  rowsPerPageItems: [10, 20, 30, 40, 50, 100],
  incrementIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'keyboard_arrow_right'
  ),
  decrementIcon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'keyboard_arrow_left'
  ),
  simplifiedMenu: false
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._setControls = function (controls) {
    _this2._controls = controls;
    _this2._table = (0, _findTable2.default)(controls);

    if (_this2._table && _this2.context.fixedFooter) {
      _this2._table.addEventListener('scroll', _this2._throttledPosition);
    }
  };

  this._position = function () {
    if (_this2._table) {
      var fixedFooter = _this2.context.fixedFooter;
      var _table = _this2._table,
          offsetWidth = _table.offsetWidth,
          scrollLeft = _table.scrollLeft;


      var controlsMarginLeft = offsetWidth - _this2._controls.offsetWidth;
      if (fixedFooter) {
        controlsMarginLeft += scrollLeft;
      }

      _this2.setState({
        controlsMarginLeft: Math.max(24, controlsMarginLeft)
      });
    }
  };

  this._throttledPosition = function () {
    if (!_this2._ticking) {
      requestAnimationFrame(function () {
        _this2._ticking = false;
        _this2._position();
      });
    }

    _this2._ticking = true;
  };

  this._increment = function () {
    var _props4 = _this2.props,
        rows = _props4.rows,
        onPagination = _props4.onPagination;
    var start = _this2.state.start;

    var rowsPerPage = (0, _getField2.default)(_this2.props, _this2.state, 'rowsPerPage');
    var page = (0, _getField2.default)(_this2.props, _this2.state, 'page');

    // Only correct multiple of rows per page
    var max = rows - rows % rowsPerPage;

    var newStart = Math.min(start + rowsPerPage, max);
    var nextPage = page + 1;

    onPagination(newStart, rowsPerPage, nextPage);
    if (typeof _this2.props.page === 'undefined') {
      _this2.setState({ start: newStart, page: nextPage });
    }
  };

  this._decrement = function () {
    var start = _this2.state.start;

    var page = (0, _getField2.default)(_this2.props, _this2.state, 'page');
    var rowsPerPage = (0, _getField2.default)(_this2.props, _this2.state, 'rowsPerPage');
    var newStart = Math.max(0, start - rowsPerPage);
    var nextPage = page - 1;

    _this2.props.onPagination(newStart, rowsPerPage, nextPage);
    if (typeof _this2.props.page === 'undefined') {
      _this2.setState({ start: newStart, page: nextPage });
    }
  };

  this._setRowsPerPage = function (rowsPerPage) {
    var page = 1;
    var newStart = 0;
    _this2.props.onPagination(newStart, rowsPerPage, page);
    var nextState = void 0;
    if (typeof _this2.props.rowsPerPage === 'undefined') {
      nextState = { rowsPerPage: rowsPerPage };
    }

    if (typeof _this2.props.page === 'undefined') {
      nextState = nextState || {};
      nextState.start = newStart;
    }

    if (nextState) {
      _this2.setState(nextState);
    }
  };
};

exports.default = TablePagination;
//# sourceMappingURL=TablePagination.js.map