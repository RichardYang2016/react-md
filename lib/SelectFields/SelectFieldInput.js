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

var _CSSTransitionGroupTick = require('../constants/CSSTransitionGroupTick');

var _CSSTransitionGroupTick2 = _interopRequireDefault(_CSSTransitionGroupTick);

var _themeColors = require('../utils/themeColors');

var _themeColors2 = _interopRequireDefault(_themeColors);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _AccessibleFakeInkedButton = require('../Helpers/AccessibleFakeInkedButton');

var _AccessibleFakeInkedButton2 = _interopRequireDefault(_AccessibleFakeInkedButton);

var _IconSeparator = require('../Helpers/IconSeparator');

var _IconSeparator2 = _interopRequireDefault(_IconSeparator);

var _Paper = require('../Papers/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _TextFieldDivider = require('../TextFields/TextFieldDivider');

var _TextFieldDivider2 = _interopRequireDefault(_TextFieldDivider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectFieldInput = function (_PureComponent) {
  _inherits(SelectFieldInput, _PureComponent);

  function SelectFieldInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectFieldInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectFieldInput.__proto__ || Object.getPrototypeOf(SelectFieldInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = { transition: null }, _this._timeout = null, _this._transitionNewValue = function () {
      var _this$props = _this.props,
          transitionTime = _this$props.transitionTime,
          transitionName = _this$props.transitionName;

      if (_this._timeout) {
        clearTimeout(_this._timeout);
      }

      _this._timeout = setTimeout(function () {
        _this._timeout = setTimeout(function () {
          _this._timeout = null;
          _this.setState({ transition: null });
        }, transitionTime);

        _this.setState({ transition: _this.state.transition + ' ' + transitionName + '-enter-active' });
      }, _CSSTransitionGroupTick2.default);

      _this.setState({ transition: transitionName + '-enter' });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectFieldInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this._transitionNewValue();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          className = _props.className,
          name = _props.name,
          value = _props.value,
          label = _props.label,
          placeholder = _props.placeholder,
          active = _props.active,
          activeLabel = _props.activeLabel,
          error = _props.error,
          disabled = _props.disabled,
          required = _props.required,
          toolbar = _props.toolbar,
          below = _props.below,
          lineDirection = _props.lineDirection,
          dropdownIcon = _props.dropdownIcon,
          iconChildren = _props.iconChildren,
          iconClassName = _props.iconClassName,
          transitionName = _props.transitionName,
          transitionTime = _props.transitionTime,
          props = _objectWithoutProperties(_props, ['id', 'className', 'name', 'value', 'label', 'placeholder', 'active', 'activeLabel', 'error', 'disabled', 'required', 'toolbar', 'below', 'lineDirection', 'dropdownIcon', 'iconChildren', 'iconClassName', 'transitionName', 'transitionTime']);

      var transition = this.state.transition;


      var divider = void 0;
      if (!below && !toolbar) {
        divider = _react2.default.createElement(_TextFieldDivider2.default, {
          key: 'text-divider',
          active: active,
          error: error,
          lineDirection: lineDirection,
          className: 'md-divider--select-field'
        });
      }

      var visibleLabel = activeLabel;
      if (!activeLabel && activeLabel !== 0) {
        visibleLabel = (!label || active) && placeholder || '';
      }

      var labelActive = !!activeLabel || activeLabel === 0;

      var icon = dropdownIcon;
      if (iconClassName || iconChildren) {
        icon = _react2.default.createElement(
          _FontIcon2.default,
          { iconClassName: iconClassName },
          iconChildren
        );
      }
      icon = _react2.default.cloneElement(icon, { disabled: disabled });

      return _react2.default.createElement(
        _AccessibleFakeInkedButton2.default,
        _extends({}, props, {
          id: id + '-toggle',
          role: 'listbox',
          disabled: disabled,
          component: _Paper2.default,
          zDepth: below && active ? 1 : 0,
          inkDisabled: !below,
          className: (0, _classnames2.default)('md-select-field', (0, _themeColors2.default)({
            disabled: disabled,
            hint: !labelActive && placeholder,
            text: labelActive
          }), className)
        }),
        _react2.default.createElement(
          _IconSeparator2.default,
          {
            label: visibleLabel,
            labelClassName: transition,
            className: (0, _classnames2.default)('md-text-field', {
              'md-text-field--margin': !below && !label,
              'md-text-field--floating-margin': label,
              'md-text-field--toolbar': toolbar && !below,
              'md-select-field--text-field': !below,
              'md-select-field--btn': below
            })
          },
          icon
        ),
        divider,
        _react2.default.createElement('input', {
          key: 'value',
          type: 'hidden',
          id: id,
          name: name,
          value: value,
          required: required,
          disabled: disabled
        })
      );
    }
  }]);

  return SelectFieldInput;
}(_react.PureComponent);

SelectFieldInput.propTypes = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  disabled: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  label: _propTypes2.default.node,
  placeholder: _propTypes2.default.string,
  active: _propTypes2.default.bool,
  activeLabel: _propTypes2.default.node,
  below: _propTypes2.default.bool,
  error: _propTypes2.default.bool,
  toolbar: _propTypes2.default.bool,
  dropdownIcon: _propTypes2.default.element,
  iconClassName: _propTypes2.default.string,
  iconChildren: _propTypes2.default.node,
  transitionName: _propTypes2.default.string.isRequired,
  transitionTime: _propTypes2.default.number.isRequired,
  lineDirection: _TextFieldDivider2.default.propTypes.lineDirection
};
SelectFieldInput.defaultProps = {
  transitionName: 'md-drop',
  transitionTime: 300
};
exports.default = SelectFieldInput;
//# sourceMappingURL=SelectFieldInput.js.map