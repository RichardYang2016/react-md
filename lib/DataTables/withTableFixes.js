'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = withTableFixes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _fixedToShape = require('../Helpers/fixedToShape');

var _fixedToShape2 = _interopRequireDefault(_fixedToShape);

var _findTable = require('./findTable');

var _findTable2 = _interopRequireDefault(_findTable);

var _findFixedTo = require('./findFixedTo');

var _findFixedTo2 = _interopRequireDefault(_findFixedTo);

var _getDisplayName = require('../utils/StringUtils/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This is a utility HOC to fix the components that use the `Menu` component behind the scenes. This will
 * correctly add the `id` and `fixedTo` props if they are omitted from the child component's props.
 *
 * If the id prop is omitted, it will default to the `${rowId}-${cellIndex}-${suffix}` and when the
 * `fixedTo` prop is omitted, it will automatically set it to the responsive table wrapper so that
 * it will stay in viewport as expected.
 *
 * This component also attempts to find the `cellIndex` prop if it is not correctly cloned into the
 * component.
 *
 * @param {function|Class} ComposedComponent - the component to compose with the tooltip functionality.
 * @param {String} suffix - the id suffix to apply.
 * @return {Class} the ComposedComponent with some fixes applied.
 */
function withTableFixes(ComposedComponent, suffix) {
  var _class, _temp2;

  return _temp2 = _class = function (_PureComponent) {
    _inherits(TableFixesComponent, _PureComponent);

    function TableFixesComponent() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, TableFixesComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableFixesComponent.__proto__ || Object.getPrototypeOf(TableFixesComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = { cellIndex: undefined }, _this._fixedTo = null, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TableFixesComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _props = this.props,
            cellIndex = _props.cellIndex,
            fixedTo = _props.fixedTo,
            id = _props.id;

        var isIndexed = !!id || cellIndex === 0 || !!cellIndex;
        var isFixed = fixedTo === null || !!fixedTo;
        if (isIndexed && isFixed) {
          // all is good
          return;
        }

        var column = (0, _reactDom.findDOMNode)(this);
        var table = (0, _findTable2.default)(column);
        this._fixedTo = (0, _findFixedTo2.default)(table);

        // If a developer creates their own component to wrap the component that uses a menu, the cellIndex prop
        // might not be defined if they don't pass ...props
        if (!isIndexed) {
          var columns = [].slice.call(column.parentNode.querySelectorAll('th,td'));
          this.setState({ cellIndex: columns.indexOf(column) }); // eslint-disable-line react/no-did-mount-set-state
        } else if (this._fixedTo) {
          // need to apply the _fixedTo for the select field
          this.forceUpdate();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var rowId = this.context.rowId;

        var _props2 = this.props,
            propid = _props2.id,
            propFixedTo = _props2.fixedTo,
            propCellIndex = _props2.cellIndex,
            props = _objectWithoutProperties(_props2, ['id', 'fixedTo', 'cellIndex']);

        var id = this.props.id;

        var fixedTo = this._fixedTo === null || propFixedTo ? propFixedTo : this._fixedTo;
        var cellIndex = (0, _getField2.default)(this.props, this.state, 'cellIndex');
        if (!id) {
          id = rowId + '-' + cellIndex + '-' + suffix;
        }

        return _react2.default.createElement(ComposedComponent, _extends({}, props, { id: id, fixedTo: fixedTo }));
      }
    }]);

    return TableFixesComponent;
  }(_react.PureComponent), _class.Positions = ComposedComponent.Positions, _class.HorizontalAnchors = ComposedComponent.HorizontalAnchors, _class.VerticalAnchors = ComposedComponent.VerticalAnchors, _class.displayName = (0, _getDisplayName2.default)(ComposedComponent, 'TableFixes'), _class.propTypes = {
    id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    cellIndex: _propTypes2.default.number,
    fixedTo: _fixedToShape2.default
  }, _class.contextTypes = {
    rowId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
  }, _temp2;
}
//# sourceMappingURL=withTableFixes.js.map