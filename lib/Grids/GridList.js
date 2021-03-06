'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DIFF_KEYS = ['className', 'cellClassName', 'stacked', 'container', 'noSpacing', 'gutter', 'spacing', 'align', 'position', 'size', 'offset', 'order', 'phoneSize', 'phoneOrder', 'phoneOffset', 'phoneHidden', 'tabletSize', 'tabletOrder', 'tabletOffset', 'tabletHidden', 'desktopSize', 'desktopOrder', 'desktopOffset', 'desktopHidden'];

var GridList = function (_PureComponent) {
    _inherits(GridList, _PureComponent);

    _createClass(GridList, null, [{
        key: 'getClassNames',


        /**
         * A utility function to get the grid's className based on the `Grid`'s and `Cell`'s
         * props. This is * used behind the scenes to merge and create the className for the grid.
         *
         * ### Example:
         * ```js
         * const { className, cellClassName } = GridList.getClassNames();
         * const { className, cellClassName } = GridList.getClassNames({ size: 1, container: 'custom' });
         * ```
         *
         * @param {Object=} props - This should be an object of the `Grid`'s props. It
         *    will extract the needed keys and generate the classNames.
         * @return {Object} an object containing the `className` and `cellClassName` attributes.
         */
        value: function getClassNames() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var className = props.className,
                cellClassName = props.cellClassName,
                remaining = _objectWithoutProperties(props, ['className', 'cellClassName']);

            return {
                className: _Grid2.default.getClassName(_extends({ className: className }, remaining)),
                cellClassName: _Cell2.default.getClassName(_extends({ className: cellClassName }, remaining))
            };
        }
    }]);

    function GridList(props) {
        _classCallCheck(this, GridList);

        var _this = _possibleConstructorReturn(this, (GridList.__proto__ || Object.getPrototypeOf(GridList)).call(this));

        _this.state = GridList.getClassNames(props);
        return _this;
    }

    _createClass(GridList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState(GridList.getClassNames(this.props));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if (DIFF_KEYS.some(function (key) {
                return _this2.props[key] !== nextProps[key];
            })) {
                this.setState(GridList.getClassNames(nextProps));
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                className = _state.className,
                cellClassName = _state.cellClassName;

            var _props = this.props,
                style = _props.style,
                cellStyle = _props.cellStyle,
                Component = _props.component,
                children = _props.children,
                propClassName = _props.className,
                propCellClassName = _props.cellClassName,
                container = _props.container,
                noSpacing = _props.noSpacing,
                stacked = _props.stacked,
                gutter = _props.gutter,
                spacing = _props.spacing,
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
                props = _objectWithoutProperties(_props, ['style', 'cellStyle', 'component', 'children', 'className', 'cellClassName', 'container', 'noSpacing', 'stacked', 'gutter', 'spacing', 'align', 'position', 'size', 'offset', 'order', 'phoneSize', 'phoneOrder', 'phoneOffset', 'phoneHidden', 'tabletSize', 'tabletOrder', 'tabletOffset', 'tabletHidden', 'desktopSize', 'desktopOrder', 'desktopOffset', 'desktopHidden']);

            if (typeof children === 'function') {
                return children({ style: style, className: className, cellStyle: cellStyle, cellClassName: cellClassName });
            }

            return _react2.default.createElement(
                Component,
                _extends({}, props, { style: style, className: className }),
                _react2.default.Children.map(children, function (child) {
                    if (!child) {
                        return child;
                    }

                    var childStyle = child.props.style;
                    if (cellStyle) {
                        childStyle = childStyle ? _extends({}, cellStyle, childStyle) : cellStyle;
                    }

                    return _react2.default.cloneElement(child, {
                        style: childStyle,
                        className: (0, _classnames2.default)(child.props.className, cellClassName)
                    });
                })
            );
        }
    }]);

    return GridList;
}(_react.PureComponent);

GridList.propTypes = {
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
     * An optional style to apply to each child. This will only be applied
     * if the `children` prop is not a callback function.
     *
     * @see {@link #children}
     */
    cellStyle: _propTypes2.default.object,

    /**
     * An optional className to apply to each child. This will only be applied
     * if the `children` prop is not a callback function.
     *
     * @see {@link #children}
     */
    cellClassName: _propTypes2.default.string,

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
    spacing: _propTypes2.default.number,

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
GridList.defaultProps = {
    component: 'div',
    stacked: false,
    noSpacing: false,
    phoneHidden: false,
    tabletHidden: false,
    desktopHidden: false
};
exports.default = GridList;
//# sourceMappingURL=GridList.js.map