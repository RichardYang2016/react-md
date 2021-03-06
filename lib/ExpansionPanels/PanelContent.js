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

var _DialogFooter = require('../Dialogs/DialogFooter');

var _DialogFooter2 = _interopRequireDefault(_DialogFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `PanelContent` component is for displaying the expanded content
 * for an `ExpansionPanel`. It will display any children in a `md-panel-content`
 * container followed by a `Divider` and the `PanelControls` .
 */
var PanelContent = function (_PureComponent) {
  _inherits(PanelContent, _PureComponent);

  function PanelContent() {
    _classCallCheck(this, PanelContent);

    return _possibleConstructorReturn(this, (PanelContent.__proto__ || Object.getPrototypeOf(PanelContent)).apply(this, arguments));
  }

  _createClass(PanelContent, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          footerStyle = _props.footerStyle,
          footerClassName = _props.footerClassName,
          contentStyle = _props.contentStyle,
          className = _props.className,
          children = _props.children,
          onSave = _props.onSave,
          onCancel = _props.onCancel,
          saveProps = _props.saveProps,
          saveType = _props.saveType,
          saveLabel = _props.saveLabel,
          savePrimary = _props.savePrimary,
          saveSecondary = _props.saveSecondary,
          cancelProps = _props.cancelProps,
          cancelType = _props.cancelType,
          cancelLabel = _props.cancelLabel,
          cancelPrimary = _props.cancelPrimary,
          cancelSecondary = _props.cancelSecondary,
          footer = _props.footer,
          footerChildren = _props.footerChildren;


      var actions = [_extends({
        type: cancelType,
        label: cancelLabel,
        primary: cancelPrimary,
        secondary: cancelSecondary
      }, cancelProps, {
        onClick: onCancel
      }), _extends({
        type: saveType,
        label: saveLabel,
        primary: savePrimary,
        secondary: saveSecondary
      }, saveProps, {
        onClick: onSave
      })];

      var actionFooter = null;
      if (typeof footer === 'undefined') {
        actionFooter = _react2.default.createElement(
          _DialogFooter2.default,
          {
            actions: actions,
            style: footerStyle,
            className: (0, _classnames2.default)('md-divider-border md-divider-border--top', footerClassName)
          },
          footerChildren
        );
      } else if (footer !== null) {
        actionFooter = footer;
      }

      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('md-panel-content', className), style: contentStyle },
          children
        ),
        actionFooter
      );
    }
  }]);

  return PanelContent;
}(_react.PureComponent);

PanelContent.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  footerStyle: _propTypes2.default.object,
  footerClassName: _propTypes2.default.string,
  contentStyle: _propTypes2.default.object,
  children: _propTypes2.default.node,
  onSave: _propTypes2.default.func.isRequired,
  onCancel: _propTypes2.default.func.isRequired,
  saveProps: _propTypes2.default.object,
  saveType: _propTypes2.default.string,
  saveLabel: _propTypes2.default.node.isRequired,
  savePrimary: _propTypes2.default.bool,
  saveSecondary: _propTypes2.default.bool,
  cancelProps: _propTypes2.default.object,
  cancelType: _propTypes2.default.string,
  cancelLabel: _propTypes2.default.node.isRequired,
  cancelPrimary: _propTypes2.default.bool,
  cancelSecondary: _propTypes2.default.bool,
  footer: _propTypes2.default.node,
  footerChildren: _propTypes2.default.node
};
exports.default = PanelContent;
//# sourceMappingURL=PanelContent.js.map