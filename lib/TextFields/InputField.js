'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _themeColors = require('../utils/themeColors');

var _themeColors2 = _interopRequireDefault(_themeColors);

var _TextArea = require('./TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This component either renders a base `input` tag or the `TextArea` component.
 */
var InputField = function (_PureComponent) {
  _inherits(InputField, _PureComponent);

  function InputField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InputField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputField.__proto__ || Object.getPrototypeOf(InputField)).call.apply(_ref, [this].concat(args))), _this), _this.getField = function () {
      // eslint-disable-line arrow-body-style
      return typeof _this.props.rows === 'undefined' ? _this._field : _this._field.getField();
    }, _this.getValue = function () {
      if (typeof _this.props.rows === 'undefined') {
        return _this._field.value;
      }

      return _this._field.getValue();
    }, _this.focus = function () {
      _this._field.focus();
    }, _this.blur = function () {
      _this._field.blur();
    }, _this._setField = function (field) {
      _this._field = field;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InputField, [{
    key: 'render',
    value: function render() {
      var _cn;

      var _props = this.props,
          className = _props.className,
          rows = _props.rows,
          label = _props.label,
          customSize = _props.customSize,
          fullWidth = _props.fullWidth,
          type = _props.type,
          passwordVisible = _props.passwordVisible,
          block = _props.block,
          inlineIndicator = _props.inlineIndicator,
          maxRows = _props.maxRows,
          props = _objectWithoutProperties(_props, ['className', 'rows', 'label', 'customSize', 'fullWidth', 'type', 'passwordVisible', 'block', 'inlineIndicator', 'maxRows']);

      var multiline = typeof rows !== 'undefined';
      var Component = multiline ? _TextArea2.default : 'input';
      if (!multiline) {
        props.type = passwordVisible ? 'text' : type;
      } else {
        props.label = label;
        props.block = block;
        props.maxRows = maxRows;
      }

      return (0, _react.createElement)(Component, _extends({}, props, {
        rows: rows,
        ref: this._setField,
        className: (0, _classnames2.default)('md-text-field', (_cn = {
          'md-text-field--inline-indicator': inlineIndicator || !multiline && type === 'password',
          'md-text-field--multiline': multiline,
          'md-text-field--margin': !block && !multiline && !label,
          'md-text-field--floating-margin': !block && !multiline && label
        }, _defineProperty(_cn, 'md-text-field--' + customSize, customSize), _defineProperty(_cn, 'md-full-width', fullWidth), _cn), (0, _themeColors2.default)({ disabled: props.disabled, text: !props.disabled }, className))
      }));
    }
  }]);

  return InputField;
}(_react.PureComponent);

InputField.propTypes = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  type: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  block: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  rows: _propTypes2.default.number,
  maxRows: _propTypes2.default.number,
  label: _propTypes2.default.node,
  fullWidth: _propTypes2.default.bool,
  customSize: _propTypes2.default.string,
  passwordVisible: _propTypes2.default.bool,
  inlineIndicator: _propTypes2.default.bool
};
exports.default = InputField;
//# sourceMappingURL=InputField.js.map