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

var _addSuffix = require('../utils/StringUtils/addSuffix');

var _addSuffix2 = _interopRequireDefault(_addSuffix);

var _isValued = require('../utils/isValued');

var _isValued2 = _interopRequireDefault(_isValued);

var _FloatingLabel = require('../TextFields/FloatingLabel');

var _FloatingLabel2 = _interopRequireDefault(_FloatingLabel);

var _TextFieldMessage = require('../TextFields/TextFieldMessage');

var _TextFieldMessage2 = _interopRequireDefault(_TextFieldMessage);

var _SelectFieldInput = require('./SelectFieldInput');

var _SelectFieldInput2 = _interopRequireDefault(_SelectFieldInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectFieldToggle = function (_PureComponent) {
  _inherits(SelectFieldToggle, _PureComponent);

  function SelectFieldToggle() {
    _classCallCheck(this, SelectFieldToggle);

    return _possibleConstructorReturn(this, (SelectFieldToggle.__proto__ || Object.getPrototypeOf(SelectFieldToggle)).apply(this, arguments));
  }

  _createClass(SelectFieldToggle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          style = _props.style,
          className = _props.className,
          inputStyle = _props.inputStyle,
          inputClassName = _props.inputClassName,
          required = _props.required,
          disabled = _props.disabled,
          active = _props.active,
          error = _props.error,
          errorText = _props.errorText,
          helpText = _props.helpText,
          helpOnFocus = _props.helpOnFocus,
          visible = _props.visible,
          activeLabel = _props.activeLabel,
          propLabel = _props.label,
          propPlaceholder = _props.placeholder,
          props = _objectWithoutProperties(_props, ['id', 'style', 'className', 'inputStyle', 'inputClassName', 'required', 'disabled', 'active', 'error', 'errorText', 'helpText', 'helpOnFocus', 'visible', 'activeLabel', 'label', 'placeholder']);

      var _props2 = this.props,
          label = _props2.label,
          placeholder = _props2.placeholder;

      if (required) {
        if (label) {
          label = (0, _addSuffix2.default)(label, '*');
        }

        if (placeholder && !label) {
          placeholder = (0, _addSuffix2.default)(placeholder, '*');
        }
      }

      return _react2.default.createElement(
        'div',
        { style: style, className: (0, _classnames2.default)('md-select-field__toggle', className) },
        _react2.default.createElement(_FloatingLabel2.default, {
          label: label,
          htmlFor: id,
          active: active || visible,
          error: error,
          floating: (0, _isValued2.default)(activeLabel) || active || visible,
          disabled: disabled
        }),
        _react2.default.createElement(_SelectFieldInput2.default, _extends({}, props, {
          id: id,
          style: inputStyle,
          className: inputClassName,
          label: label,
          placeholder: placeholder,
          activeLabel: activeLabel,
          active: active,
          error: error,
          disabled: disabled
        })),
        _react2.default.createElement(_TextFieldMessage2.default, {
          active: active || visible,
          error: error,
          errorText: errorText,
          helpText: helpText,
          helpOnFocus: helpOnFocus,
          leftIcon: false,
          rightIcon: false
        })
      );
    }
  }]);

  return SelectFieldToggle;
}(_react.PureComponent);

SelectFieldToggle.propTypes = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  inputStyle: _propTypes2.default.object,
  inputClassName: _propTypes2.default.string,
  activeLabel: _propTypes2.default.node,
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  required: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  active: _propTypes2.default.bool,
  error: _propTypes2.default.bool,
  errorText: _propTypes2.default.node,
  helpText: _propTypes2.default.node,
  helpOnFocus: _propTypes2.default.bool,
  below: _propTypes2.default.bool,
  visible: _propTypes2.default.bool
};
exports.default = SelectFieldToggle;
//# sourceMappingURL=SelectFieldToggle.js.map