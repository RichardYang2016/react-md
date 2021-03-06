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

var _CardTitle = require('./CardTitle');

var _CardTitle2 = _interopRequireDefault(_CardTitle);

var _CardActions = require('./CardActions');

var _CardActions2 = _interopRequireDefault(_CardActions);

var _Button = require('../Buttons/Button');

var _Button2 = _interopRequireDefault(_Button);

var _componentDeprecated = require('../utils/PropTypes/componentDeprecated');

var _componentDeprecated2 = _interopRequireDefault(_componentDeprecated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `CardActionOverlay` component is a simple wrapper for generating an overlay
 * for the `CardMedia` component by having a `CardTitle` and an array of props
 * for generating `FlatButton` for the `CardActions` component.
 */
var CardActionOverlay = function (_PureComponent) {
  _inherits(CardActionOverlay, _PureComponent);

  function CardActionOverlay() {
    _classCallCheck(this, CardActionOverlay);

    return _possibleConstructorReturn(this, (CardActionOverlay.__proto__ || Object.getPrototypeOf(CardActionOverlay)).apply(this, arguments));
  }

  _createClass(CardActionOverlay, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          actions = _props.actions,
          titleProps = _objectWithoutProperties(_props, ['actions']);

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(_CardTitle2.default, titleProps),
        _react2.default.createElement(
          _CardActions2.default,
          null,
          actions.map(function (actionProps, i) {
            return _react2.default.createElement(_Button2.default, _extends({ flat: true, key: i }, actionProps));
          })
        )
      );
    }
  }]);

  return CardActionOverlay;
}(_react.PureComponent);

CardActionOverlay.propTypes = {
  /**
   * The title to use.
   */
  title: _propTypes2.default.node,

  /**
   * The optional subtitle to use.
   */
  subtitle: _propTypes2.default.node,

  /**
   * An array of flat button props.
   */
  actions: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.node.isRequired
  })),

  /**
   * Any children to display in the `CardTitle` component.
   */
  children: _propTypes2.default.node,
  deprecated: (0, _componentDeprecated2.default)('It is not a worthwhile component since the same thing can be accomplished with the `MediaOverlay` component.')
};
exports.default = CardActionOverlay;
//# sourceMappingURL=CardActionOverlay.js.map