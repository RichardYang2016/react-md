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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DIFF_KEYS = ['className', 'align', 'position', 'size', 'offset', 'order', 'phoneSize', 'phoneOrder', 'phoneOffset', 'phoneHidden', 'tabletSize', 'tabletOrder', 'tabletOffset', 'tabletHidden', 'desktopSize', 'desktopOrder', 'desktopOffset', 'desktopHidden'];

var Cell = function (_PureComponent) {
    _inherits(Cell, _PureComponent);

    _createClass(Cell, null, [{
        key: 'getClassName',


        /**
         * A utility function to get the cell's className based on the Cell's props. This is
         * used behind the scenes to merge and create the className for the cell.
         *
         * ### Example:
         * ```js
         * <div className={Cell.getClassName()}>A simple cell</div>
         * <div className={Cell.getClassName({ size: 1 })}>A cell with size 1</div>
         * ```
         *
         * @param {Object=} props - This should be an object of the `Cell`'s props. It
         *    will extract the needed keys and generate the className.
         * @return {String} the full className to use for the cell
         */
        value: function getClassName() {
            var _bem;

            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var className = props.className,
                align = props.align,
                position = props.position,
                size = props.size,
                order = props.order,
                offset = props.offset,
                phoneSize = props.phoneSize,
                phoneOrder = props.phoneOrder,
                phoneOffset = props.phoneOffset,
                phoneHidden = props.phoneHidden,
                tabletSize = props.tabletSize,
                tabletOrder = props.tabletOrder,
                tabletOffset = props.tabletOffset,
                tabletHidden = props.tabletHidden,
                desktopSize = props.desktopSize,
                desktopOrder = props.desktopOrder,
                desktopOffset = props.desktopOffset,
                desktopHidden = props.desktopHidden;


            return (0, _bem3.default)('md-cell', (_bem = {}, _defineProperty(_bem, align, align), _defineProperty(_bem, position, position), _defineProperty(_bem, size, size), _defineProperty(_bem, 'order-' + order, order), _defineProperty(_bem, offset + '-offset', offset), _defineProperty(_bem, phoneSize + '-phone', phoneSize), _defineProperty(_bem, 'order-' + phoneOrder + '-phone', phoneOrder), _defineProperty(_bem, phoneOffset + '-phone-offset', phoneOffset), _defineProperty(_bem, 'phone-hidden', phoneHidden), _defineProperty(_bem, tabletSize + '-tablet', tabletSize), _defineProperty(_bem, 'order-' + tabletOrder + '-tablet', tabletOrder), _defineProperty(_bem, tabletOffset + '-tablet-offset', tabletOffset), _defineProperty(_bem, 'tablet-hidden', tabletHidden), _defineProperty(_bem, desktopSize + '-desktop', desktopSize), _defineProperty(_bem, 'order-' + desktopOrder + '-desktop', desktopOrder), _defineProperty(_bem, desktopOffset + '-desktop-offset', desktopOffset), _defineProperty(_bem, 'desktop-hidden', desktopHidden), _bem), className);
        }
    }]);

    function Cell(props) {
        _classCallCheck(this, Cell);

        var _this = _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this));

        _this.state = { className: Cell.getClassName(props) };
        return _this;
    }

    _createClass(Cell, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ className: Cell.getClassName(this.props) });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if (DIFF_KEYS.some(function (key) {
                return _this2.props[key] !== nextProps[key];
            })) {
                this.setState({ className: Cell.getClassName(nextProps) });
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
                align = _props.align,
                position = _props.position,
                size = _props.size,
                offset = _props.offset,
                order = _props.order,
                phoneSize = _props.phoneSize,
                phoneOrder = _props.phoneOrder,
                phoneOffset = _props.phoneOffset,
                phoneHidden = _props.phoneHidden,
                tabletSize = _props.tabletSize,
                tabletOrder = _props.tabletOrder,
                tabletOffset = _props.tabletOffset,
                tabletHidden = _props.tabletHidden,
                desktopSize = _props.desktopSize,
                desktopOrder = _props.desktopOrder,
                desktopOffset = _props.desktopOffset,
                desktopHidden = _props.desktopHidden,
                props = _objectWithoutProperties(_props, ['style', 'component', 'children', 'className', 'align', 'position', 'size', 'offset', 'order', 'phoneSize', 'phoneOrder', 'phoneOffset', 'phoneHidden', 'tabletSize', 'tabletOrder', 'tabletOffset', 'tabletHidden', 'desktopSize', 'desktopOrder', 'desktopOffset', 'desktopHidden']);

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

    return Cell;
}(_react.PureComponent);

Cell.propTypes = {
    /**
     * An optional style to apply to the Cell component. This will only be applied
     * if the `children` prop is not a callback function.
     *
     * @see {@link #children}
     */
    style: _propTypes2.default.object,

    /**
     * An optional className to apply to the Cell component. This will only be applied
     * if the `children` prop is not a callback function.
     *
     * @see {@link #children}
     */
    className: _propTypes2.default.string,

    /**
     * The component to render the Cell as. This should probably not be used as much
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
     * An optional cell alignment to apply. When the `Grid` is not `stacked`,
     * this will apply to vertical alignment within each "row" of the grid.
     *
     * Alignments:
     * - `top` - This will align to the top of the row
     * - `middle` - This will align to the middle of the row
     * - `bottom` - This will align to the bottom of the row
     * - `stretch` - This will make the cell stretch to fill all the available space
     *   in the row.
     *
     * @see {@link #position}
     */
    align: _propTypes2.default.oneOf(['top', 'middle', 'bottom', 'stretch']),

    /**
     * An optional cell position to apply. When the `Grid` is not `stacked`,
     * this will apply to horizontal alignment within each "row" of the grid.
     *
     * Positions:
     * - `center` - This will align the cell to be within the center of the row. This really
     *    just applies `margin-left: auto; margin-right: auto`.
     * - `right` - This will align the cell to the end of the row. This really just applies `margin-left: auto`.
     *
     * @see {@link #align}
     */
    position: _propTypes2.default.oneOf(['center', 'right']),

    /**
     * An optional size to apply to the cell. This sizing will be applied across all media sizes.
     * If the size is greater than the number of columns allowed for the media size, it will just
     * span the entire width.
     */
    size: _propTypes2.default.number,

    /**
     * An optional order to apply to the cell. This order will be applied across all media sizes.
     */
    order: _propTypes2.default.number,

    /**
     * An optional offset to apply to the cell. This will add spacing to the left of the cell.
     */
    offset: _propTypes2.default.number,

    /**
     * An optional size to apply to the cell only on phones.
     */
    phoneSize: _propTypes2.default.number,

    /**
     * An optional order to apply to the cell only on phones.
     */
    phoneOrder: _propTypes2.default.number,

    /**
     * An optional offset to apply to the cell only on phones.
     */
    phoneOffset: _propTypes2.default.number,

    /**
     * Boolean if the cell should be hidden on phones only.
     */
    phoneHidden: _propTypes2.default.bool,

    /**
     * An optional size to apply to the cell only on tablets.
     */
    tabletSize: _propTypes2.default.number,

    /**
     * An optional order to apply to the cell only on tablets.
     */
    tabletOrder: _propTypes2.default.number,

    /**
     * An optional offset to apply to the cell only on tablets.
     */
    tabletOffset: _propTypes2.default.number,

    /**
     * Boolean if the cell should be hidden on tablets only.
     */
    tabletHidden: _propTypes2.default.bool,

    /**
     * An optional size to apply to the cell only on desktops.
     */
    desktopSize: _propTypes2.default.number,

    /**
     * An optional order to apply to the cell only on desktops.
     */
    desktopOrder: _propTypes2.default.number,

    /**
     * An optional offset to apply to the cell only on desktops.
     */
    desktopOffset: _propTypes2.default.number,

    /**
     * Boolean if the cell should be hidden on desktops only.
     */
    desktopHidden: _propTypes2.default.bool
};
Cell.defaultProps = {
    component: 'div',
    phoneHidden: false,
    tabletHidden: false,
    desktopHidden: false
};
exports.default = Cell;
//# sourceMappingURL=Cell.js.map