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

var _contextTypes = require('./contextTypes');

var _contextTypes2 = _interopRequireDefault(_contextTypes);

var _headerContextTypes = require('./headerContextTypes');

var _headerContextTypes2 = _interopRequireDefault(_headerContextTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A `thead` component to use in the `DataTable` component. This
 * will automatically update the header row to check if it is selected
 * and inject a function to toggle all rows selected if the row is
 * uncontrolled. It will also automatically attempt to set the `TableColumn`
 * components to be the header type.
 */
var TableHeader = function (_Component) {
  _inherits(TableHeader, _Component);

  function TableHeader() {
    _classCallCheck(this, TableHeader);

    return _possibleConstructorReturn(this, (TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).apply(this, arguments));
  }

  _createClass(TableHeader, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return _extends({}, this.context, {
        header: true
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          children = _props.children,
          props = _objectWithoutProperties(_props, ['className', 'children']);

      var allSelected = this.context.allSelected;

      var header = _react2.default.Children.only(children);
      var selected = typeof header.props.selected === 'undefined' ? allSelected : header.props.selected;

      var row = _react2.default.cloneElement(header, { selected: selected });

      return _react2.default.createElement(
        'thead',
        _extends({}, props, { className: (0, _classnames2.default)('md-table-header', className) }),
        row
      );
    }
  }]);

  return TableHeader;
}(_react.Component);

TableHeader.contextTypes = _contextTypes2.default;
TableHeader.childContextTypes = _headerContextTypes2.default;
TableHeader.propTypes = {
  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the table header
   */
  className: _propTypes2.default.string,

  /**
   * This should be a single `TableRow` component. The `custom` validation will
   * warn you if there are more than one children given or none at all.
   */
  children: function children(props, propName, component) {
    try {
      _react2.default.Children.only(props.children);
      return null;
    } catch (e) {
      var amt = props.children ? props.children.length : 0;
      return new Error('There must only be one child in a \'' + component + '\', but ' + amt + ' were given.');
    }
  }
};
exports.default = TableHeader;
//# sourceMappingURL=TableHeader.js.map