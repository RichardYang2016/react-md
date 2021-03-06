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

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _fixedToShape = require('../Helpers/fixedToShape');

var _fixedToShape2 = _interopRequireDefault(_fixedToShape);

var _Subheaders = require('../Subheaders');

var _Subheaders2 = _interopRequireDefault(_Subheaders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Lists present multiple line items vertically as a single continuous element.
 */
var List = function (_PureComponent) {
  _inherits(List, _PureComponent);

  function List() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, List);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = List.__proto__ || Object.getPrototypeOf(List)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(List, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _context = this.context,
          listLevel = _context.listLevel,
          context = _objectWithoutProperties(_context, ['listLevel']);

      var cascadingFixedTo = (0, _getField2.default)(this.state, this.context, 'cascadingFixedTo');
      return _extends({}, context, {
        cascadingFixedTo: cascadingFixedTo,
        listLevel: typeof listLevel === 'undefined' ? 1 : listLevel + 1
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.context.cascadingMenu) {
        var list = (0, _reactDom.findDOMNode)(this);
        if (list.offsetHeight < list.scrollHeight) {
          var cascadingFixedTo = { y: (0, _reactDom.findDOMNode)(this) };
          this.setState({ cascadingFixedTo: cascadingFixedTo }); // eslint-disable-line react/no-did-mount-set-state
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _cn;

      var _props = this.props,
          className = _props.className,
          ordered = _props.ordered,
          children = _props.children,
          subheader = _props.subheader,
          inline = _props.inline,
          primarySubheader = _props.primarySubheader,
          props = _objectWithoutProperties(_props, ['className', 'ordered', 'children', 'subheader', 'inline', 'primarySubheader']);

      var _context2 = this.context,
          cascadingMenu = _context2.cascadingMenu,
          cascadingZDepth = _context2.cascadingZDepth,
          listLevel = _context2.listLevel;


      var subheaderEl = void 0;
      if (subheader) {
        subheaderEl = _react2.default.createElement(_Subheaders2.default, { key: 'subheader', primaryText: subheader, primary: primarySubheader });
      }

      var Component = ordered ? 'ol' : 'ul';
      return _react2.default.createElement(
        Component,
        _extends({}, props, {
          className: (0, _classnames2.default)('md-list', (_cn = {
            'md-list--inline': inline,
            'md-list--menu-cascading': cascadingMenu
          }, _defineProperty(_cn, 'md-paper md-paper--' + cascadingZDepth, cascadingZDepth && cascadingMenu && listLevel > 0), _defineProperty(_cn, 'md-list--nested-' + listLevel, listLevel && !cascadingMenu), _cn), className)
        }),
        subheaderEl,
        children
      );
    }
  }]);

  return List;
}(_react.PureComponent);

List.propTypes = {
  /**
   * An optional style to apply to the list.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the list.
   */
  className: _propTypes2.default.string,

  /**
   * Boolean if this should be an ordered list (`<ol>`) component. Otherwise, it will
   * be rendered as `<ul>`.
   */
  ordered: _propTypes2.default.bool,

  /**
   * This *should* be a list of `ListItem`, `ListItemControl`, `Divider`, or
   * `Subheader`.
   */
  children: _propTypes2.default.node,

  /**
   * Boolean if the list should appear horizontally instead of vertically.
   */
  inline: _propTypes2.default.bool,
  subheader: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `Subheader` component as a child instead'),
  primarySubheader: (0, _deprecated2.default)(_propTypes2.default.bool, 'Use the `Subheader` component as a child instead')
};
List.childContextTypes = {
  listLevel: _propTypes2.default.number,
  cascadingMenu: _propTypes2.default.bool,
  cascadingFixedTo: _fixedToShape2.default,
  cascadingZDepth: _propTypes2.default.number
};
List.contextTypes = {
  listLevel: _propTypes2.default.number,
  cascadingMenu: _propTypes2.default.bool,
  cascadingFixedTo: _fixedToShape2.default,
  cascadingZDepth: _propTypes2.default.number
};
exports.default = List;
//# sourceMappingURL=List.js.map