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

var _keyCodes = require('../constants/keyCodes');

var _getField = require('../utils/getField');

var _getField2 = _interopRequireDefault(_getField);

var _themeColors = require('../utils/themeColors');

var _themeColors2 = _interopRequireDefault(_themeColors);

var _viewport = require('../utils/Positioning/viewport');

var _viewport2 = _interopRequireDefault(_viewport);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _anchorShape = require('../Helpers/anchorShape');

var _anchorShape2 = _interopRequireDefault(_anchorShape);

var _fixedToShape = require('../Helpers/fixedToShape');

var _fixedToShape2 = _interopRequireDefault(_fixedToShape);

var _positionShape = require('../Helpers/positionShape');

var _positionShape2 = _interopRequireDefault(_positionShape);

var _Layover = require('../Helpers/Layover');

var _Layover2 = _interopRequireDefault(_Layover);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _getDeprecatedIcon = require('../FontIcons/getDeprecatedIcon');

var _getDeprecatedIcon2 = _interopRequireDefault(_getDeprecatedIcon);

var _TextField = require('../TextFields/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _TableColumn = require('./TableColumn');

var _TableColumn2 = _interopRequireDefault(_TableColumn);

var _EditDialog = require('./EditDialog');

var _EditDialog2 = _interopRequireDefault(_EditDialog);

var _findTable = require('./findTable');

var _findTable2 = _interopRequireDefault(_findTable);

var _findFixedTo = require('./findFixedTo');

var _findFixedTo2 = _interopRequireDefault(_findFixedTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `EditDialogColumn` is used when there should be used when a table column's value
 * can be changed. It can either be displayed as a dialog or inline.
 *
 * All props that are not documented but provided will be passed on to the `TextField`
 * component.
 */
var EditDialogColumn = function (_PureComponent) {
    _inherits(EditDialogColumn, _PureComponent);

    function EditDialogColumn(props) {
        _classCallCheck(this, EditDialogColumn);

        var _this = _possibleConstructorReturn(this, (EditDialogColumn.__proto__ || Object.getPrototypeOf(EditDialogColumn)).call(this, props));

        _initialiseProps.call(_this);

        _this.state = {
            visible: props.defaultVisible,
            value: props.defaultValue,
            cancelValue: props.defaultValue,
            actions: _this._makeActions(props),
            cellIndex: undefined
        };
        return _this;
    }

    _createClass(EditDialogColumn, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._column = (0, _reactDom.findDOMNode)(this);
            this._table = (0, _findTable2.default)(this._column);
            this._fixedTo = (0, _findFixedTo2.default)(this._table);

            // If a developer creates their own component to wrap the EditDialogColumn, the cellIndex prop
            // might not be defined if they don't pass ...props
            var cellIndex = this.props.cellIndex;

            if (!cellIndex && cellIndex !== 0) {
                var columns = [].slice.call(this._column.parentNode.querySelectorAll('th,td'));
                this.setState({ cellIndex: columns.indexOf(this._column) }); // eslint-disable-line react/no-did-mount-set-state
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _props = this.props,
                okLabel = _props.okLabel,
                okPrimary = _props.okPrimary,
                okSecondary = _props.okSecondary,
                okProps = _props.okProps,
                cancelLabel = _props.cancelLabel,
                cancelPrimary = _props.cancelPrimary,
                cancelSecondary = _props.cancelSecondary,
                cancelProps = _props.cancelProps;


            if (okLabel !== nextProps.okLabel || okPrimary !== nextProps.okPrimary || okSecondary !== nextProps.okSecondary || cancelLabel !== nextProps.cancelLabel || cancelPrimary !== nextProps.cancelPrimary || cancelSecondary !== nextProps.cancelSecondary || okProps !== nextProps.okProps || cancelProps !== nextProps.cancelProps) {
                this.setState({ actions: this._makeActions(nextProps) });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var rowId = this.context.rowId;

            var _props2 = this.props,
                style = _props2.style,
                className = _props2.className,
                layoverStyle = _props2.layoverStyle,
                layoverClassName = _props2.layoverClassName,
                dialogStyle = _props2.dialogStyle,
                dialogClassName = _props2.dialogClassName,
                dialogContentStyle = _props2.dialogContentStyle,
                dialogContentClassName = _props2.dialogContentClassName,
                dialogZDepth = _props2.dialogZDepth,
                textFieldStyle = _props2.textFieldStyle,
                textFieldClassName = _props2.textFieldClassName,
                inputClassName = _props2.inputClassName,
                large = _props2.large,
                title = _props2.title,
                inline = _props2.inline,
                inlineIcon = _props2.inlineIcon,
                maxLength = _props2.maxLength,
                label = _props2.label,
                placeholder = _props2.placeholder,
                header = _props2.header,
                anchor = _props2.anchor,
                belowAnchor = _props2.belowAnchor,
                fixedTo = _props2.fixedTo,
                animationPosition = _props2.animationPosition,
                xThreshold = _props2.xThreshold,
                yThreshold = _props2.yThreshold,
                centered = _props2.centered,
                sameWidth = _props2.sameWidth,
                repositionOnScroll = _props2.repositionOnScroll,
                repositionOnResize = _props2.repositionOnResize,
                transitionName = _props2.transitionName,
                transitionEnterTimeout = _props2.transitionEnterTimeout,
                transitionLeaveTimeout = _props2.transitionLeaveTimeout,
                tooltipLabel = _props2.tooltipLabel,
                tooltipDelay = _props2.tooltipDelay,
                tooltipPosition = _props2.tooltipPosition,
                onClick = _props2.onClick,
                onMouseDown = _props2.onMouseDown,
                onMouseUp = _props2.onMouseUp,
                onTouchStart = _props2.onTouchStart,
                onTouchEnd = _props2.onTouchEnd,
                onMouseEnter = _props2.onMouseEnter,
                onMouseOver = _props2.onMouseOver,
                onMouseLeave = _props2.onMouseLeave,
                onTouchMove = _props2.onTouchMove,
                simplifiedDialog = _props2.simplifiedDialog,
                minLeft = _props2.minLeft,
                minRight = _props2.minRight,
                minBottom = _props2.minBottom,
                noIcon = _props2.noIcon,
                inlineIconChildren = _props2.inlineIconChildren,
                inlineIconClassName = _props2.inlineIconClassName,
                propId = _props2.id,
                propDialogId = _props2.dialogId,
                propCellIndex = _props2.cellIndex,
                onOkClick = _props2.onOkClick,
                okLabel = _props2.okLabel,
                okPrimary = _props2.okPrimary,
                okSecondary = _props2.okSecondary,
                okProps = _props2.okProps,
                onCancelClick = _props2.onCancelClick,
                cancelLabel = _props2.cancelLabel,
                cancelPrimary = _props2.cancelPrimary,
                cancelSecondary = _props2.cancelSecondary,
                cancelProps = _props2.cancelProps,
                okOnOutsideClick = _props2.okOnOutsideClick,
                defaultValue = _props2.defaultValue,
                adjusted = _props2.adjusted,
                scrollIntoView = _props2.scrollIntoView,
                scrollIntoViewPadding = _props2.scrollIntoViewPadding,
                defaultVisible = _props2.defaultVisible,
                visibleOnFocus = _props2.visibleOnFocus,
                scrollThreshold = _props2.scrollThreshold,
                enforceMinWidth = _props2.enforceMinWidth,
                transitionDuration = _props2.transitionDuration,
                props = _objectWithoutProperties(_props2, ['style', 'className', 'layoverStyle', 'layoverClassName', 'dialogStyle', 'dialogClassName', 'dialogContentStyle', 'dialogContentClassName', 'dialogZDepth', 'textFieldStyle', 'textFieldClassName', 'inputClassName', 'large', 'title', 'inline', 'inlineIcon', 'maxLength', 'label', 'placeholder', 'header', 'anchor', 'belowAnchor', 'fixedTo', 'animationPosition', 'xThreshold', 'yThreshold', 'centered', 'sameWidth', 'repositionOnScroll', 'repositionOnResize', 'transitionName', 'transitionEnterTimeout', 'transitionLeaveTimeout', 'tooltipLabel', 'tooltipDelay', 'tooltipPosition', 'onClick', 'onMouseDown', 'onMouseUp', 'onTouchStart', 'onTouchEnd', 'onMouseEnter', 'onMouseOver', 'onMouseLeave', 'onTouchMove', 'simplifiedDialog', 'minLeft', 'minRight', 'minBottom', 'noIcon', 'inlineIconChildren', 'inlineIconClassName', 'id', 'dialogId', 'cellIndex', 'onOkClick', 'okLabel', 'okPrimary', 'okSecondary', 'okProps', 'onCancelClick', 'cancelLabel', 'cancelPrimary', 'cancelSecondary', 'cancelProps', 'okOnOutsideClick', 'defaultValue', 'adjusted', 'scrollIntoView', 'scrollIntoViewPadding', 'defaultVisible', 'visibleOnFocus', 'scrollThreshold', 'enforceMinWidth', 'transitionDuration']);

            var _state = this.state,
                visible = _state.visible,
                actions = _state.actions;

            var value = (0, _getField2.default)(this.props, this.state, 'value');
            var cellIndex = (0, _getField2.default)(this.props, this.state, 'cellIndex');

            var _props3 = this.props,
                id = _props3.id,
                dialogId = _props3.dialogId;

            if (!dialogId) {
                dialogId = (id || rowId + '-' + cellIndex) + '-edit-dialog';
            }

            if (!id) {
                id = dialogId + '-field';
            }

            var inlineEditIcon = void 0;
            if (inline && !noIcon) {
                var icon = (0, _getDeprecatedIcon2.default)(inlineIconClassName, inlineIconChildren, inlineIcon);
                if (icon) {
                    inlineEditIcon = _react2.default.cloneElement(icon, { key: 'edit-icon' });
                }
            }

            var numeric = props.type === 'number';
            var field = _react2.default.createElement(_TextField2.default, _extends({}, props, {
                ref: this._setField,
                style: textFieldStyle,
                className: (0, _classnames2.default)({ 'md-edit-dialog__blocked-field': inline }, textFieldClassName),
                inputClassName: (0, _classnames2.default)({
                    'md-edit-dialog__header': header && inline,
                    'md-text-right': numeric
                }, (0, _themeColors2.default)({ hint: header && inline }), inputClassName),
                id: id,
                label: label,
                placeholder: placeholder,
                value: value,
                onFocus: this._handleFocus,
                onChange: this._handleChange,
                onKeyDown: this._handleKeyDown,
                block: inline,
                maxLength: visible ? maxLength : null,
                rightIcon: inlineEditIcon
            }));

            var children = void 0;
            if (inline) {
                children = field;
            } else {
                var dialogLabel = value || value === 0 ? value : placeholder || label;
                children = _react2.default.createElement(
                    _EditDialog2.default,
                    {
                        style: layoverStyle,
                        className: layoverClassName,
                        dialogStyle: dialogStyle,
                        dialogClassName: dialogClassName,
                        dialogContentStyle: dialogContentStyle,
                        dialogContentClassName: dialogContentClassName,
                        id: dialogId,
                        textFieldId: id,
                        visible: visible,
                        onOpen: this._handleOpen,
                        onClose: this._handleClose,
                        label: dialogLabel,
                        actions: actions,
                        large: large,
                        title: title,
                        header: header,
                        placeholder: dialogLabel === placeholder || dialogLabel === label,
                        simplified: simplifiedDialog,
                        anchor: anchor,
                        belowAnchor: belowAnchor,
                        animationPosition: animationPosition,
                        xThreshold: xThreshold,
                        yThreshold: yThreshold,
                        centered: centered,
                        sameWidth: sameWidth,
                        minLeft: minLeft,
                        minRight: minRight,
                        minBottom: minBottom,
                        fixedTo: typeof fixedTo !== 'undefined' ? fixedTo : this._fixedTo,
                        dialogZDepth: dialogZDepth,
                        repositionOnScroll: repositionOnScroll,
                        repositionOnResize: repositionOnResize,
                        transitionName: transitionName,
                        transitionEnterTimeout: transitionEnterTimeout,
                        transitionLeaveTimeout: transitionLeaveTimeout
                    },
                    field
                );
            }

            return _react2.default.createElement(
                _TableColumn2.default,
                {
                    style: style,
                    numeric: numeric,
                    className: (0, _classnames2.default)('md-edit-dialog-column', className),
                    header: header,
                    adjusted: false,
                    tooltipLabel: tooltipLabel,
                    tooltipDelay: tooltipDelay,
                    tooltipPosition: tooltipPosition,
                    onClick: onClick,
                    onMouseDown: onMouseDown,
                    onMouseUp: onMouseUp,
                    onTouchStart: onTouchStart,
                    onTouchMove: onTouchMove,
                    onMouseEnter: onMouseEnter,
                    onMouseOver: onMouseOver,
                    onMouseLeave: onMouseLeave,
                    onTouchEnd: onTouchEnd
                },
                children
            );
        }
    }]);

    return EditDialogColumn;
}(_react.PureComponent);

EditDialogColumn.VerticalAnchors = _Layover2.default.VerticalAnchors;
EditDialogColumn.HorizontalAnchors = _Layover2.default.HorizontalAnchors;
EditDialogColumn.Positions = _Layover2.default.Positions;
EditDialogColumn.propTypes = {
    /**
     * An optional id to use for the text field in the column. If this is omitted,
     * the id will be `${dialogId}-field`.
     *
     * @see {@link #dialogId}
     */
    id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

    /**
     * An optional id to use for the dialog that appears in the column. If this is omitted,
     * the id will be `${rowId}-${cellIndex}-edit-dialog-field`.
     */
    dialogId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

    /**
     * The optional style to apply to the edit dialog's column.
     */
    style: _propTypes2.default.object,

    /**
     * The optional className to apply to the edit dialog's column.
     */
    className: _propTypes2.default.string,

    /**
     * An optional style to apply to the dialog's surrounding `Layover` component.
     */
    layoverStyle: _propTypes2.default.object,

    /**
     * An optional className to the dialog's surrounding `Layover` component.
     */
    layoverClassName: _propTypes2.default.string,

    /**
     * The optional style to apply to the edit dialog.
     */
    dialogStyle: _propTypes2.default.object,

    /**
     * The optional className to apply to the edit dialog.
     */
    dialogClassName: _propTypes2.default.string,

    /**
     * An optional style to apply to the dialog's content area. This is the area
     * that holds the text field.
     */
    dialogContentStyle: _propTypes2.default.object,

    /**
     * An optional class name to apply to the dialog's content area. This is the area
     * that holds the text field.
     */
    dialogContentClassName: _propTypes2.default.string,

    /**
     * The zDepth to apply to the dialog when not inline.
     *
     * @see {@link Papers/Paper#zDepth}
     */
    dialogZDepth: _propTypes2.default.number.isRequired,

    /**
     * An optional style to apply to the text field.
     */
    textFieldStyle: _propTypes2.default.object,

    /**
     * An optional class name to apply to the text field.
     */
    textFieldClassName: _propTypes2.default.string,

    /**
     * An optional style to apply to the text field's input.
     */
    inputStyle: _propTypes2.default.object,

    /**
     * An optional class name to apply to the text field's input.
     */
    inputClassName: _propTypes2.default.string,

    /**
     * Boolean if the edit dialog is currently disabled.
     */
    disabled: _propTypes2.default.bool,

    /**
     * Boolean if the text field should be editable inline instead of in a dialog.
     *
     * @see {@link #inlineIcon}
     */
    inline: _propTypes2.default.bool,

    /**
     * An optional icon to set for the inline edit dialog column. Setting this prop to null
     * will not render an icon.
     */
    inlineIcon: _propTypes2.default.element,

    /**
     * The default value to use for the text field.
     */
    defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,

    /**
     * A value to use for the edit dialog text field. This will make the component controlled
     * so you will need to provide an `onChange` function.
     */
    value: (0, _controlled2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]), 'onChange', 'defaultValue'),

    /**
     * An optional function to call when the text field's value has changed. This is required
     * if the `value` prop has been defined.
     *
     * @see {@link TextFields/TextField#onChange}
     */
    onChange: _propTypes2.default.func,

    /**
     * An optional function to call when the text field gains focus.
     */
    onFocus: _propTypes2.default.func,

    /**
     * An optional function to call when the keydown event is triggered on the text field.
     */
    onKeyDown: _propTypes2.default.func,

    /**
     * An optional label for the text field. When displaying an `inline` edit dialog column,
     * the `placeholder` prop should be used instead. This is because the text field changes
     * to the `block` type when `inline`.
     *
     * @see {@link #inline}
     * @see {@link #placeholder}
     * @see {@link TextFields/TextField#block}
     */
    label: _propTypes2.default.node,

    /**
     * An optional placeholder for the text field.
     */
    placeholder: _propTypes2.default.string,

    /**
     * Boolean if the edit dialog should become a large dialog. When the dialog is large,
     * the `title` prop is required.
     *
     * A large dialog has a Title followed by the text field, and then a cancel and ok action
     * buttons below.
     */
    large: _propTypes2.default.bool,

    /**
     * The title to use for the large edit dialog. This prop is required if the `large` prop
     * is enabled.
     */
    title: _propTypes2.default.node,

    /**
     * An optional `maxLength` to apply to the text field.
     *
     * @see {@link TextFields/TextField#maxLength}
     */
    maxLength: _propTypes2.default.number,

    /**
     * An optional function to call when the "Ok" button has been clicked, the user presses enter
     * on * the text field or when the `okOnOutsideClick` prop has been enabled and the user clicks
     * somewhere on the page.
     *
     * The callback will include the current value and the click or keypress event.
     * ```js
     * onOkClick(value, event)
     * ```
     *
     * @see {@link #large}
     */
    onOkClick: _propTypes2.default.func,

    /**
     * The label to use for the "Ok" button in large dialogs.
     *
     * @see {@link #large}
     */
    okLabel: _propTypes2.default.node.isRequired,

    /**
     * Boolean if the "Ok" button in large dialogs should be styled with the primary color.
     * To get a `default` styled button, set both `okPrimary` and `okSecondary` (or omit `okSecondary`)
     * to `false`.
     *
     * @see {@link #large}
     * @see {@link #okSecondary}
     */
    okPrimary: _propTypes2.default.bool,

    /**
     * Boolean if the "Ok" button in large dialogs should be styled with the secondary color.
     *
     * @see {@link #large}
     * @see {@link #okPrimary}
     */
    okSecondary: _propTypes2.default.bool,

    /**
     * Any additional props to apply to the "Ok" button. This will override any of the other
     * button props.
     *
     * @see {@link #okLabel}
     * @see {@link #okPrimary}
     * @see {@link #okSecondary}
     */
    okProps: _propTypes2.default.object,

    /**
     * An optional function to call when the "Cancel" button has been clicked in large edit dialogs.
     * The callback will include the text field's value before any edits occurred and the click event.
     *
     * ```js
     * onCancelClick(previousValue, event)
     * ```
     *
     * @see {@link #large}
     */
    onCancelClick: _propTypes2.default.func,

    /**
     * The label to give to the "Cancel" button in large edit dialogs.
     *
     * @see {@link #large}
     */
    cancelLabel: _propTypes2.default.node.isRequired,

    /**
     * Boolean if the "Cancel" button in large dialogs should be styled with the primary color.
     * To get a `default` styled button, set both `cancelPrimary` and `cancelSecondary` (or
     * omit `cancelSecondary`) to `false`.
     *
     * @see {@link #large}
     * @see {@link #cancelSecondary}
     */
    cancelPrimary: _propTypes2.default.bool,

    /**
     * Boolean if the "Cancel" button in large dialogs should be styled with the secondary color.
     *
     * @see {@link #large}
     * @see {@link #cancelPrimary}
     */
    cancelSecondary: _propTypes2.default.bool,

    /**
     * Any additional props to apply to the "Cancel" button. This will override any of the other
     * button props.
     *
     * @see {@link #cancelLabel}
     * @see {@link #cancelPrimary}
     * @see {@link #cancelSecondary}
     */
    cancelProps: _propTypes2.default.object,

    /**
     * Boolean if the action for clicking somewhere on on the page while the dialog is open
     * saves the changes or cancels to the previous value before opening the dialog.
     *
     * @see {@link #onOkClick}
     * @see {@link #onCancelClick}
     */
    okOnOutsideClick: _propTypes2.default.bool,

    /**
     * An optional function to call when a user clicks out of the text field.
     */
    onOutsideClick: _propTypes2.default.func,

    /**
     * Boolean if the edit dialog should be closed if the user clicks somewhere else on the page
     * while the dialog is open.
     */
    closeOnOutsideClick: _propTypes2.default.bool,

    /**
     * Boolean if the Edit Dialog should be visible by default. This only applies when the `inline` prop
     * is not enabled.
     */
    defaultVisible: _propTypes2.default.bool,

    /**
     * Boolean if the edit dialog should automatically open when the text field is focused for non-inline
     * dialogs. This is enabled by default for backwards compatibility.
     */
    visibleOnFocus: _propTypes2.default.bool,

    /**
     * The type for the text field in the edit dialog.
     *
     * @see {@link TextFields/TextField#type}
     */
    type: _propTypes2.default.string,

    /**
     * This is how the dialog gets "anchored" to the table column.
     *
     * @see {@link Helpers/Layover#anchor}
     */
    anchor: _anchorShape2.default,

    /**
     * This is the anchor to use when the `position` is set to `Autocomplete.Positions.BELOW`.
     *
     * @see {@link Helpers/Layover#belowAnchor}
     */
    belowAnchor: _anchorShape2.default,

    /**
     * This is the animation position to use for the dialog.
     *
     * @see {@link Helpers/Layover#animationPosition}
     */
    animationPosition: _positionShape2.default,

    /**
     * This is how the dialog should be fixed within the table. When this is omitted, it will
     * automatically use the responsive table as the fixture so that the dialog will close/adjust itself
     * to the scrolling of the table.
     *
     * @see {@link Helpers/Layover#fixedTo}
     */
    fixedTo: _fixedToShape2.default,

    /**
     * @see {@link Helpers/Layover#xThreshold}
     */
    xThreshold: _propTypes2.default.number,

    /**
     * @see {@link Helpers/Layover#yThreshold}
     */
    yThreshold: _propTypes2.default.number,

    /**
     * @see {@link Helpers/Layover#centered}
     */
    centered: _propTypes2.default.bool,

    /**
     * @see {@link Helpers/Layover#sameWidth}
     */
    sameWidth: _propTypes2.default.bool,

    /**
     * @see {@link Helpers/Layover#transitionName}
     */
    transitionName: _propTypes2.default.string,

    /**
     * @see {@link Helpers/Layover#transitionEnterTimeout}
     */
    transitionEnterTimeout: _propTypes2.default.number,

    /**
     * @see {@link Helpers/Layover#transitionLeaveTimeout}
     */
    transitionLeaveTimeout: _propTypes2.default.number,

    /**
     * The optional tooltip to render on hover.
     */
    tooltipLabel: _propTypes2.default.node,

    /**
     * An optional delay to apply to the tooltip before it appears.
     */
    tooltipDelay: _propTypes2.default.number,

    /**
     * The position of the tooltip.
     */
    tooltipPosition: _propTypes2.default.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * Boolean if the menu should automatically try to reposition itself to stay within
     * the viewport when the `fixedTo` element scrolls.
     *
     * @see {@link Helpers/Layover#repositionOnScroll}
     */
    repositionOnScroll: _propTypes2.default.bool,

    /**
     * Boolean if the menu should automatically try to reposition itself to stay within
     * the viewport when the window resizes.
     *
     * @see {@link Helpers/Layover#repositionOnResize}
     */
    repositionOnResize: _propTypes2.default.bool,

    /**
     * Boolean if the dialog logic should be simplified without any viewport logic and position
     * based on the relative position of the menu. This will most like require some additional
     * styles applied to the dialog.
     *
     * @see {@link Helpers/Layover#simplified}
     */
    simplifiedDialog: _propTypes2.default.bool,

    /**
     * @see {@link Helpers/Layover#minLeft}
     */
    minLeft: _Layover2.default.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minRight}
     */
    minRight: _Layover2.default.propTypes.minLeft,

    /**
     * @see {@link Helpers/Layover#minBottom}
     */
    minBottom: _Layover2.default.propTypes.minBottom,

    /**
     * Boolean if the edit dialog should attempt to scroll into view if the full
     * dialog can not be displayed in the viewport when it was toggled open.
     *
     * @see {@link #scrollIntoViewPadding}
     */
    scrollIntoView: _propTypes2.default.bool,

    /**
     * The amount of padding that should be applied when the cell is scrolled into view.
     * This will be applied to the left of the cell.
     */
    scrollIntoViewPadding: _propTypes2.default.number,

    /**
     * An optional function to call when the `click` event is triggered in the column.
     */
    onClick: _propTypes2.default.func,

    /**
     * An optional function to call when the `mousedown` event is triggered in the column.
     */
    onMouseDown: _propTypes2.default.func,

    /**
     * An optional function to call when the `mouseup` event is triggered in the column.
     */
    onMouseUp: _propTypes2.default.func,

    /**
     * An optional function to call when the `touchstart` event is triggered in the column.
     */
    onTouchStart: _propTypes2.default.func,

    /**
     * An optional function to call when the `touchend` event is triggered in the column.
     */
    onTouchEnd: _propTypes2.default.func,

    /**
     * An optional function to call when the `mouseenter` event is triggered in the column.
     */
    onMouseEnter: _propTypes2.default.func,

    /**
     * An optional function to call when the `mouseover` event is triggered in the column.
     */
    onMouseOver: _propTypes2.default.func,

    /**
     * An optional function to call when the `mouseleave` event is triggered in the column.
     */
    onMouseLeave: _propTypes2.default.func,

    /**
     * An optional function to call when the `touchmove` event is triggered in the column.
     */
    onTouchMove: _propTypes2.default.func,

    /**
     * This is injected by the `TableRow` component.
     * @access private
     */
    header: _propTypes2.default.bool,

    /**
     * This is injected by the `TableRow` component and used to help generate the unique id for the text
     * field.
     *
     * @access private
     */
    cellIndex: _propTypes2.default.number,

    /**
     * @access private
     */
    adjusted: _propTypes2.default.bool,

    inlineIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use the `inlineIcon` prop instead'),
    inlineIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use the `inlineIcon` prop instead'),
    noIcon: (0, _deprecated2.default)(_propTypes2.default.bool, 'Set the `inlineIcon` prop to `null` instead'),
    enforceMinWidth: (0, _deprecated2.default)(_propTypes2.default.bool, 'The min width will always be enforced based on the `$md-edit-dialog-min-width` Sass variable'),
    scrollThreshold: (0, _deprecated2.default)(_propTypes2.default.number, 'Use `xThreshold` and `yThreshold` instead'),
    transitionDuration: (0, _deprecated2.default)(_propTypes2.default.number, 'use `transitionEnterTimeout` and `transitionLeaveTimeout` instead')
};
EditDialogColumn.defaultProps = {
    type: 'text',
    defaultValue: '',
    okOnOutsideClick: true,
    inlineIcon: _react2.default.createElement(
        _FontIcon2.default,
        null,
        'edit'
    ),
    okLabel: 'Save',
    okPrimary: true,
    cancelLabel: 'Cancel',
    cancelPrimary: true,
    animationPosition: EditDialogColumn.Positions.BELOW,
    dialogZDepth: 1,
    repositionOnScroll: true,
    repositionOnResize: false,
    scrollIntoView: true,
    scrollIntoViewPadding: 16,
    minLeft: 0,
    minRight: 0,
    minBottom: 0,
    visibleOnFocus: true,
    defaultVisible: false
};
EditDialogColumn.contextTypes = {
    rowId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this._setField = function (field) {
        _this2._field = field;
    };

    this._makeActions = function (props) {
        var okLabel = props.okLabel,
            okPrimary = props.okPrimary,
            okSecondary = props.okSecondary,
            okProps = props.okProps,
            cancelLabel = props.cancelLabel,
            cancelPrimary = props.cancelPrimary,
            cancelSecondary = props.cancelSecondary,
            cancelProps = props.cancelProps;


        return [_extends({
            key: 'cancel',
            children: cancelLabel,
            primary: cancelPrimary && !cancelSecondary,
            secondary: cancelSecondary
        }, cancelProps, {
            onClick: _this2._handleCancel
        }), _extends({
            key: 'ok',
            children: okLabel,
            primary: okPrimary && !okSecondary,
            secondary: okSecondary
        }, okProps, {
            onClick: _this2._handleOk
        })];
    };

    this._handleOpen = function (e) {
        if (_this2._skipNextOpen) {
            _this2._skipNextOpen = false;
        } else if (_this2.props.visibleOnFocus || !e || e.type !== 'focus') {
            var _props4 = _this2.props,
                scrollIntoView = _props4.scrollIntoView,
                scrollIntoViewPadding = _props4.scrollIntoViewPadding;

            if (scrollIntoView) {
                var vp = (0, _viewport2.default)(_this2._column);
                if (vp !== true && _this2._table && _this2._column && !_this2.props.inline) {
                    _this2._table.scrollLeft = _this2._column.offsetLeft - scrollIntoViewPadding;
                }
            }

            _this2.setState({ visible: true, cancelValue: (0, _getField2.default)(_this2.props, _this2.state, 'value') });
        }
    };

    this._handleClose = function (e) {
        var _props5 = _this2.props,
            onOutsideClick = _props5.onOutsideClick,
            okOnOutsideClick = _props5.okOnOutsideClick;

        if (onOutsideClick) {
            onOutsideClick(e);
        }

        if (okOnOutsideClick) {
            _this2._handleOk(e);
        } else {
            _this2._handleCancel(e);
        }
    };

    this._handleChange = function (value, e) {
        if (_this2.props.onChange) {
            _this2.props.onChange(value, e);
        }

        if (typeof _this2.props.value === 'undefined') {
            _this2.setState({ value: value });
        }
    };

    this._handleFocus = function (e) {
        if (_this2.props.onFocus) {
            _this2.props.onFocus(e);
        }

        if (_this2.props.inline) {
            _this2.setState({ cancelValue: e.target.value });
        }
    };

    this._handleKeyDown = function (e) {
        var _props6 = _this2.props,
            onKeyDown = _props6.onKeyDown,
            okOnOutsideClick = _props6.okOnOutsideClick,
            large = _props6.large;

        if (onKeyDown) {
            onKeyDown(e);
        }

        var key = e.which || e.keyCode;
        if (key === _keyCodes.ENTER) {
            _this2._handleOk(e);
        } else if (key === _keyCodes.ESC) {
            _this2._handleCancel(e);
        } else if (key === _keyCodes.TAB && !large) {
            // infinitely opens otherwise...
            _this2._skipNextOpen = e.shiftKey;

            if (okOnOutsideClick) {
                _this2._handleOk(e);
            } else {
                _this2._handleCancel(e);
            }
        }
    };

    this._handleOk = function (e) {
        if (_this2.props.onOkClick) {
            _this2.props.onOkClick((0, _getField2.default)(_this2.props, _this2.state, 'value'), e);
        }

        _this2.setState({ visible: false });
    };

    this._handleCancel = function (e) {
        var value = _this2.state.cancelValue;
        if (_this2.props.onCancelClick) {
            _this2.props.onCancelClick(value, e);
        }

        var state = { visible: false };
        if (typeof _this2.props.value === 'undefined') {
            state.value = value;
        }

        _this2.setState(state);
    };
};

exports.default = EditDialogColumn;
//# sourceMappingURL=EditDialogColumn.js.map