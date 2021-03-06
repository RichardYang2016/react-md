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

var _themeColors = require('../utils/themeColors');

var _themeColors2 = _interopRequireDefault(_themeColors);

var _AccessibleFakeButton = require('../Helpers/AccessibleFakeButton');

var _AccessibleFakeButton2 = _interopRequireDefault(_AccessibleFakeButton);

var _Layover = require('../Helpers/Layover');

var _Layover2 = _interopRequireDefault(_Layover);

var _Dialog = require('../Dialogs/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditDialog = function (_PureComponent) {
  _inherits(EditDialog, _PureComponent);

  function EditDialog() {
    _classCallCheck(this, EditDialog);

    return _possibleConstructorReturn(this, (EditDialog.__proto__ || Object.getPrototypeOf(EditDialog)).apply(this, arguments));
  }

  _createClass(EditDialog, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          dialogStyle = _props.dialogStyle,
          dialogClassName = _props.dialogClassName,
          dialogContentStyle = _props.dialogContentStyle,
          dialogContentClassName = _props.dialogContentClassName,
          textFieldId = _props.textFieldId,
          visible = _props.visible,
          header = _props.header,
          onOpen = _props.onOpen,
          children = _props.children,
          label = _props.label,
          title = _props.title,
          large = _props.large,
          actions = _props.actions,
          placeholder = _props.placeholder,
          dialogZDepth = _props.dialogZDepth,
          props = _objectWithoutProperties(_props, ['id', 'dialogStyle', 'dialogClassName', 'dialogContentStyle', 'dialogContentClassName', 'textFieldId', 'visible', 'header', 'onOpen', 'children', 'label', 'title', 'large', 'actions', 'placeholder', 'dialogZDepth']);

      var field = _react2.default.createElement(
        _AccessibleFakeButton2.default,
        {
          className: (0, _classnames2.default)('md-edit-dialog__label', {
            'md-edit-dialog__header': header
          }, (0, _themeColors2.default)({ hint: placeholder || header })),
          noFocusOutline: visible,
          onClick: onOpen,
          onFocus: onOpen
        },
        label
      );

      return _react2.default.createElement(
        _Layover2.default,
        _extends({}, props, {
          id: id + '-layover',
          toggle: field,
          visible: visible,
          block: true,
          belowAnchor: null
        }),
        _react2.default.createElement(
          _Dialog2.default,
          {
            id: id,
            'aria-labelledby': !large ? textFieldId : undefined,
            style: dialogStyle,
            className: (0, _classnames2.default)('md-edit-dialog', (0, _themeColors2.default)({ background: true, themeText: false }), dialogClassName),
            contentStyle: dialogContentStyle,
            contentClassName: (0, _classnames2.default)('md-edit-dialog__content', dialogContentClassName),
            title: large ? title : null,
            focusOnMount: true,
            containFocus: !!large,
            paddedContent: false,
            actions: large ? actions : null,
            zDepth: dialogZDepth
          },
          children
        )
      );
    }
  }]);

  return EditDialog;
}(_react.PureComponent);

EditDialog.propTypes = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  textFieldId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  dialogStyle: _propTypes2.default.object,
  dialogClassName: _propTypes2.default.string,
  dialogContentStyle: _propTypes2.default.object,
  dialogContentClassName: _propTypes2.default.string,
  children: _propTypes2.default.node,
  onOpen: _propTypes2.default.func.isRequired,
  onClose: _propTypes2.default.func.isRequired,
  visible: _propTypes2.default.bool.isRequired,
  label: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  placeholder: _propTypes2.default.bool,
  title: _propTypes2.default.node,
  large: _propTypes2.default.bool,
  actions: _Dialog2.default.propTypes.actions,
  dialogZDepth: _propTypes2.default.number,
  header: _propTypes2.default.bool
};
exports.default = EditDialog;
//# sourceMappingURL=EditDialog.js.map