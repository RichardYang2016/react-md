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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function validateAspectRatio(props, propName, component) {
  var _PropTypes$string;

  var value = props[propName];

  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var err = (_PropTypes$string = _propTypes2.default.string).isRequired.apply(_PropTypes$string, [props, propName, component].concat(args));
  if (!err && value.split('-').length !== 2) {
    err = new Error('Your provided an `' + propName + '` prop to the ' + component + ' that is not a valid ' + ('aspect ratio `' + value + '`. This should be in the form of \'{width}-{height}\'.'));
  }

  return err;
}

/**
 * The `Media` component is used to display images, iframes, ...media. Who'da thunk?
 */

var Media = function (_PureComponent) {
  _inherits(Media, _PureComponent);

  function Media() {
    _classCallCheck(this, Media);

    return _possibleConstructorReturn(this, (Media.__proto__ || Object.getPrototypeOf(Media)).apply(this, arguments));
  }

  _createClass(Media, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          Component = _props.component,
          className = _props.className,
          children = _props.children,
          forceAspect = _props.forceAspect,
          aspectRatio = _props.aspectRatio,
          expandable = _props.expandable,
          props = _objectWithoutProperties(_props, ['component', 'className', 'children', 'forceAspect', 'aspectRatio', 'expandable']);

      return _react2.default.createElement(
        Component,
        _extends({}, props, {
          className: (0, _classnames2.default)('md-media', _defineProperty({}, 'md-media--' + aspectRatio, forceAspect), className)
        }),
        children
      );
    }
  }]);

  return Media;
}(_react.PureComponent);

Media.propTypes = {
  /**
   * An optional className to apply to the card media component.
   */
  className: _propTypes2.default.string,

  /**
   * Any media to display.
   */
  children: _propTypes2.default.node,

  /**
   * Boolean if the aspect ratio should be forced.
   */
  forceAspect: _propTypes2.default.bool,

  /**
   * The aspect ratio to use.
   */
  aspectRatio: validateAspectRatio,

  /**
   * Boolean if this component should be expandable when there is a `CardExpander`
   * above it in the `Card`.
   */
  expandable: _propTypes2.default.bool,

  /**
   * The component to render the card media as.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired
};
Media.defaultProps = {
  forceAspect: true,
  aspectRatio: '16-9',
  component: 'section'
};
exports.default = Media;
//# sourceMappingURL=Media.js.map