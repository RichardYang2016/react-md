'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isReact16 = typeof _reactDom.createPortal === 'function';

/**
 * Creates a "Portal" for the children to be rendered in. Basically it will render the
 * children only when the `visible` prop is `true`. When it is visible, a new `component`
 * will be rendered as the first child in the body with the children inside.
 *
 * Unlike all the other components, `style` will not be applied for the `Portal`.
 */

var Portal = function (_PureComponent) {
  _inherits(Portal, _PureComponent);

  function Portal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Portal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Portal.__proto__ || Object.getPrototypeOf(Portal)).call.apply(_ref, [this].concat(args))), _this), _this._container = null, _this._portal = null, _this._applyStyles = function (props) {
      if (props.className) {
        _this._container.className = props.className;
      }
    }, _this._renderPortal = function (props) {
      if (!_this._container) {
        _this._container = document.createElement(props.component);

        _this._applyStyles(props);
        var node = props.renderNode || document.body;
        if (props.lastChild) {
          node.appendChild(_this._container);
        } else {
          node.insertBefore(_this._container, node.firstChild);
        }
      } else {
        _this._applyStyles(props);
      }

      if (!isReact16) {
        _this._portal = (0, _reactDom.unstable_renderSubtreeIntoContainer)(_this, props.children, _this._container);
      }
    }, _this._removePortal = function () {
      if (_this.props.onClose) {
        _this.props.onClose();
      }

      if (_this._container) {
        if (!isReact16) {
          (0, _reactDom.unmountComponentAtNode)(_this._container);
        }

        (_this.props.renderNode || document.body).removeChild(_this._container);
      }

      _this._portal = null;
      _this._container = null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.visible) {
        this._renderPortal(this.props);

        if (isReact16) {
          // Need to update after the renderPortal created the DOM element.
          this.forceUpdate();
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var visible = nextProps.visible,
          onOpen = nextProps.onOpen;

      if (this.props.visible === visible) {
        if (visible && !isReact16) {
          // Need to just re-render the subtree
          this._renderPortal(nextProps);
        }

        return;
      }

      if (visible) {
        if (onOpen) {
          onOpen();
        }

        this._renderPortal(nextProps);
      } else {
        this._removePortal();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.visible && this.props.onClose) {
        this.props.onClose();
      }
      this._removePortal();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          Component = _props.component,
          className = _props.className,
          children = _props.children,
          visible = _props.visible;

      // When doing server side rendering, actually render the component as a direct child of its parent.
      // Once it has been rendered and working client side, it will be removed correctly.

      if (typeof window === 'undefined' && visible) {
        return _react2.default.createElement(
          Component,
          { className: className },
          children
        );
      } else if (isReact16 && visible && this._container && typeof window !== 'undefined') {
        return (0, _reactDom.createPortal)(children, this._container);
      }

      return null;
    }
  }]);

  return Portal;
}(_react.PureComponent);

Portal.propTypes = {
  /**
   * An optional className to apply to the newly created `component` when visible.
   */
  className: _propTypes2.default.string,

  /**
   * Boolean if the children are visible.
   */
  visible: _propTypes2.default.bool.isRequired,

  /**
   * The children to render when visible.
   */
  children: _propTypes2.default.element,

  /**
   * The component to render as. This should be a valid DOM element.
   */
  component: _propTypes2.default.string.isRequired,

  /**
   * An optional function to call when the portal is opened.
   */
  onOpen: _propTypes2.default.func,

  /**
   * An optional function to call when the portal is closed
   */
  onClose: _propTypes2.default.func,

  /**
   * An optional DOM Node to render the portal into. The default is to render as
   * the first child in the `body`.
   */
  renderNode: _propTypes2.default.object,

  /**
   * Boolean if the portal should render the children as the last child of the `renderNode`
   * or `body` instead of the first.
   */
  lastChild: _propTypes2.default.bool
};
Portal.defaultProps = {
  component: 'span'
};
exports.default = Portal;
//# sourceMappingURL=Portal.js.map