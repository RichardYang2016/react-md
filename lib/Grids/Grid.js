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

var _bem2 = require('../utils/bem');

var _bem3 = _interopRequireDefault(_bem2);

var _isValued = require('../utils/isValued');

var _isValued2 = _interopRequireDefault(_isValued);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DIFF_KEYS = ['className', 'stacked', 'container', 'noSpacing', 'gutter', 'spacing'];

var Grid = function (_PureComponent) {
  _inherits(Grid, _PureComponent);

  _createClass(Grid, null, [{
    key: 'getClassName',


    /**
     * A utility function to get the grid's className based on the Grid's props. This is
     * used behind the scenes to merge and create the className for the grid.
     *
     * ### Example:
     * ```js
     * <div className={Grid.getClassName()}>A base grid</div>
     * <div className={Grid.getClassName({ stacked: true })}>A stacked Grid</div>
     * ```
     *
     * @param {Object=} props - This should be an object of the `Grid`'s props. It
     *    will extract the needed keys and generate the className.
     * @return {String} the full className to use for the grid
     */
    value: function getClassName() {
      var _bem;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var className = props.className,
          stacked = props.stacked,
          noSpacing = props.noSpacing,
          gutter = props.gutter,
          spacing = props.spacing,
          container = props.container;

      return (0, _bem3.default)('md-grid', (_bem = {
        'stacked': stacked,
        'no-spacing': noSpacing
      }, _defineProperty(_bem, gutter + '-' + spacing, (0, _isValued2.default)(gutter) && (0, _isValued2.default)(spacing)), _defineProperty(_bem, container, container), _bem), className);
    }
  }]);

  function Grid(props) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this));

    _this.state = { className: Grid.getClassName(props) };
    return _this;
  }

  _createClass(Grid, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ className: Grid.getClassName(this.props) });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (DIFF_KEYS.some(function (key) {
        return _this2.props[key] !== nextProps[key];
      })) {
        this.setState({ className: Grid.getClassName(nextProps) });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.state.className;

      var _props = this.props,
          style = _props.style,
          Component = _props.component,
          children = _props.children,
          propClassName = _props.className,
          container = _props.container,
          stacked = _props.stacked,
          noSpacing = _props.noSpacing,
          gutter = _props.gutter,
          spacing = _props.spacing,
          props = _objectWithoutProperties(_props, ['style', 'component', 'children', 'className', 'container', 'stacked', 'noSpacing', 'gutter', 'spacing']);

      if (typeof children === 'function') {
        return children({ style: style, className: className });
      }

      return _react2.default.createElement(
        Component,
        _extends({}, props, { style: style, className: className }),
        children
      );
    }
  }]);

  return Grid;
}(_react.PureComponent);

Grid.propTypes = {
  /**
   * An optional style to apply to the Grid component. This will only be applied
   * if the `children` prop is not a callback function.
   *
   * @see {@link #children}
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the Grid component. This will only be applied
   * if the `children` prop is not a callback function.
   *
   * @see {@link #children}
   */
  className: _propTypes2.default.string,

  /**
   * The component to render the Grid as. This should probably not be used as much
   * as the `children` callback function.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),

  /**
   * The children can either be renderable React elements or a callback function
   * that accepts the style and className props to apply so that the styles can
   * be manually added to whichever component.
   */
  children: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),

  /**
   * An optional container name to apply to the Grid. This should be the same name as provided
   * to the [react-md-make-grid-container](/components/grids?tab=2#mixin-react-md-make-grid-container) mixin.
   */
  container: _propTypes2.default.string,

  /**
   * Boolean if the grid should be placed vertically instead of horizontally.
   */
  stacked: _propTypes2.default.bool,

  /**
   * Boolean if all the gutters and spacing should be removed from the grid.
   */
  noSpacing: _propTypes2.default.bool,

  /**
   * When the [react-md-make-custom-grid](/components/grids?tab=2#mixin-react-md-make-custom-grid) mixin
   * is used, you can use the `gutter` and `spacing` props on the `Grid` to apply the correct className
   */
  gutter: _propTypes2.default.number,

  /**
   * When the [react-md-make-custom-grid](/components/grids?tab=2#mixin-react-md-make-custom-grid) mixin
   * is used, you can use the `gutter` and `spacing` props on the `Grid` to apply the correct className
   */
  spacing: _propTypes2.default.number
};
Grid.defaultProps = {
  component: 'div',
  stacked: false,
  noSpacing: false
};
exports.default = Grid;
//# sourceMappingURL=Grid.js.map