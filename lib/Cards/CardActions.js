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

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _CardExpander = require('./CardExpander');

var _CardExpander2 = _interopRequireDefault(_CardExpander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `CardActions` component is used for adding actions on your card.
 * The actions should be `FlatButton`s or `IconButton`s.
 *
 * This component can act as a `CardExpander`.
 */
var CardActions = function (_Component) {
  _inherits(CardActions, _Component);

  function CardActions() {
    _classCallCheck(this, CardActions);

    return _possibleConstructorReturn(this, (CardActions.__proto__ || Object.getPrototypeOf(CardActions)).apply(this, arguments));
  }

  _createClass(CardActions, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          children = _props.children,
          isExpander = _props.isExpander,
          expander = _props.expander,
          centered = _props.centered,
          stacked = _props.stacked,
          props = _objectWithoutProperties(_props, ['className', 'children', 'isExpander', 'expander', 'centered', 'stacked']);

      return _react2.default.createElement(
        'section',
        _extends({}, props, {
          className: (0, _classnames2.default)('md-dialog-footer--card', {
            'md-dialog-footer--inline': !stacked,
            'md-dialog-footer--stacked': stacked,
            'md-dialog-footer--card-centered': centered
          }, className)
        }),
        children,
        isExpander || expander && _react2.default.createElement(_CardExpander2.default, null)
      );
    }
  }]);

  return CardActions;
}(_react.Component);

CardActions.propTypes = {
  /**
   * Boolean if this component should act as an expander and inject the
   * `CardExpander`.
   */
  expander: _propTypes2.default.bool,

  /**
   * An optional className to apply to the actions container.
   */
  className: _propTypes2.default.string,

  /**
   * An actions to display.
   */
  children: _propTypes2.default.node,

  /**
   * Boolean if the actions should be centered.
   */
  centered: _propTypes2.default.bool,

  /**
   * Boolean if the actions should be stacked.
   */
  stacked: _propTypes2.default.bool,

  isExpander: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use `expander` instead')
};
exports.default = CardActions;
//# sourceMappingURL=CardActions.js.map