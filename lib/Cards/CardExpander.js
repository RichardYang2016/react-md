'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _contextTypes = require('./contextTypes');

var _contextTypes2 = _interopRequireDefault(_contextTypes);

var _Button = require('../Buttons/Button');

var _Button2 = _interopRequireDefault(_Button);

var _getCollapserStyles = require('../utils/getCollapserStyles');

var _getCollapserStyles2 = _interopRequireDefault(_getCollapserStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The CardExpander component is just a simple `IconButton` that
 * gets generated through the `Card`'s `contextTypes`. Props are not used
 * at all.
 *
 * Any component below a component that has this component inject into it
 * and has the prop `expandable={true}` will be toggleable when this is clicked.
 *
 * You can manually inject the `CardExpander` component yourself if you want to
 * use a component that is not a `CardActions` or a `CardTitle`.
 */
var CardExpander = function (_Component) {
  _inherits(CardExpander, _Component);

  function CardExpander() {
    _classCallCheck(this, CardExpander);

    return _possibleConstructorReturn(this, (CardExpander.__proto__ || Object.getPrototypeOf(CardExpander)).apply(this, arguments));
  }

  _createClass(CardExpander, [{
    key: 'render',
    value: function render() {
      var _context = this.context,
          expanded = _context.expanded,
          onExpandClick = _context.onExpandClick,
          icon = _context.icon,
          tooltipPosition = _context.tooltipPosition,
          tooltipLabel = _context.tooltipLabel,
          tooltipDelay = _context.tooltipDelay;


      return _react2.default.createElement(_Button2.default, {
        icon: true,
        className: (0, _getCollapserStyles2.default)({ flipped: expanded }, 'md-collapser--card'),
        onClick: onExpandClick,
        tooltipLabel: tooltipLabel,
        tooltipDelay: tooltipDelay,
        tooltipPosition: tooltipPosition,
        iconEl: icon
      });
    }
  }]);

  return CardExpander;
}(_react.Component);

CardExpander.contextTypes = _contextTypes2.default;
exports.default = CardExpander;
//# sourceMappingURL=CardExpander.js.map