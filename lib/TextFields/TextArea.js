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

var _ResizeObserver = require('../Helpers/ResizeObserver');

var _ResizeObserver2 = _interopRequireDefault(_ResizeObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `TextArea` component is used to allow a dynamic height for the
 * `textarea`. The height will keep on changing until the maxRows prop
 * is met or infinitely if it does not exist, or is 0.
 */
var TextArea = function (_PureComponent) {
  _inherits(TextArea, _PureComponent);

  function TextArea() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextArea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call.apply(_ref, [this].concat(args))), _this), _this.state = { height: null }, _this.getField = function () {
      return _this._field;
    }, _this.getValue = function () {
      return _this._field.value;
    }, _this.focus = function () {
      _this._field.focus();
    }, _this.blur = function () {
      _this._field.blur();
    }, _this._calcRowHeight = function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props,
          rows = _ref2.rows;

      if (!_this._field) {
        return 19;
      }

      var height = _this._field.style.height;
      _this._field.style.height = 'auto';
      var rowHeight = _this._field.offsetHeight / rows;
      _this._field.style.height = height;
      return rowHeight;
    }, _this._setMask = function (mask) {
      _this._mask = mask;
    }, _this._setField = function (field) {
      _this._field = field;
    }, _this._handleResize = function () {
      _this._rowHeight = _this._calcRowHeight();
      _this._syncHeightWithMask();
    }, _this._syncHeightWithMask = function (value) {
      // The mask is always null in snapshot teseting
      if (!_this._mask) {
        return;
      }

      if (value !== undefined) {
        _this._mask.value = value;
      }

      var height = _this._mask.scrollHeight;
      if (height === undefined) {
        return;
      }

      var _this$props = _this.props,
          rows = _this$props.rows,
          maxRows = _this$props.maxRows;

      if (maxRows && maxRows > 0) {
        height = Math.min(height, _this._rowHeight * maxRows);
      }

      height = Math.max(_this._rowHeight * rows, height);
      _this.setState({ height: height });
    }, _this._handleChange = function (e) {
      _this._syncHeightWithMask(e.target.value, e);

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextArea, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._rowHeight = this._calcRowHeight();
      this._syncHeightWithMask();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.rows !== nextProps.rows) {
        this._rowHeight = this._calcRowHeight(nextProps);
      }

      if (this.props.value !== nextProps.value || this.props.maxRows !== nextProps.maxRows) {
        this._syncHeightWithMask(nextProps.value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var height = this.state.height;

      var _props = this.props,
          style = _props.style,
          defaultValue = _props.defaultValue,
          value = _props.value,
          className = _props.className,
          label = _props.label,
          block = _props.block,
          maxRows = _props.maxRows,
          onChange = _props.onChange,
          props = _objectWithoutProperties(_props, ['style', 'defaultValue', 'value', 'className', 'label', 'block', 'maxRows', 'onChange']);

      return _react2.default.createElement(
        'div',
        {
          style: { height: height && height + 5 },
          className: (0, _classnames2.default)('md-text-field-multiline-container', {
            'md-text-field--margin': !label && !block,
            'md-text-field--floating-margin': label && !block
          })
        },
        _react2.default.createElement(_ResizeObserver2.default, { watchWidth: true, onResize: this._handleResize }),
        _react2.default.createElement('textarea', {
          ref: this._setMask,
          className: (0, _classnames2.default)(className, 'md-text-field--multiline-mask'),
          readOnly: true,
          rows: props.rows,
          tabIndex: -1,
          style: style,
          defaultValue: defaultValue,
          'aria-hidden': true,
          value: value
        }),
        _react2.default.createElement('textarea', _extends({}, props, {
          ref: this._setField,
          style: Object.assign({}, style, { height: height }),
          className: className,
          defaultValue: defaultValue,
          value: value,
          onChange: this._handleChange
        }))
      );
    }
  }]);

  return TextArea;
}(_react.PureComponent);

TextArea.propTypes = {
  id: _propTypes2.default.string,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  rows: _propTypes2.default.number.isRequired,
  maxRows: _propTypes2.default.number,
  onChange: _propTypes2.default.func,
  defaultValue: _propTypes2.default.string,
  floatingLabel: _propTypes2.default.bool,
  value: _propTypes2.default.string,
  block: _propTypes2.default.bool,
  label: _propTypes2.default.node
};
exports.default = TextArea;
//# sourceMappingURL=TextArea.js.map