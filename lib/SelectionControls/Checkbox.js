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

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _controlled = require('../utils/PropTypes/controlled');

var _controlled2 = _interopRequireDefault(_controlled);

var _getDeprecatedIcon = require('../FontIcons/getDeprecatedIcon');

var _getDeprecatedIcon2 = _interopRequireDefault(_getDeprecatedIcon);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _SelectionControl = require('./SelectionControl');

var _SelectionControl2 = _interopRequireDefault(_SelectionControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `Checkbox` component is used for the selection of multiple options from a set.
 */
var Checkbox = function (_PureComponent) {
    _inherits(Checkbox, _PureComponent);

    function Checkbox() {
        _classCallCheck(this, Checkbox);

        return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
    }

    _createClass(Checkbox, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                checkedIcon = _props.checkedIcon,
                uncheckedIcon = _props.uncheckedIcon,
                checkedIconChildren = _props.checkedIconChildren,
                checkedIconClassName = _props.checkedIconClassName,
                uncheckedIconChildren = _props.uncheckedIconChildren,
                uncheckedIconClassName = _props.uncheckedIconClassName,
                props = _objectWithoutProperties(_props, ['checkedIcon', 'uncheckedIcon', 'checkedIconChildren', 'checkedIconClassName', 'uncheckedIconChildren', 'uncheckedIconClassName']);

            var checked = (0, _getDeprecatedIcon2.default)(checkedIconClassName, checkedIconChildren, checkedIcon);
            var unchecked = (0, _getDeprecatedIcon2.default)(uncheckedIconClassName, uncheckedIconChildren, uncheckedIcon);

            return _react2.default.createElement(_SelectionControl2.default, _extends({
                type: 'checkbox',
                checkedCheckboxIcon: checked,
                uncheckedCheckboxIcon: unchecked,
                __superSecreteProp: true
            }, props));
        }
    }]);

    return Checkbox;
}(_react.PureComponent);

Checkbox.propTypes = {
    /**
     * An id to use with the checkbox. This is used for accessibility and so that the label
     * triggers the checkbox toggle.
     */
    id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),

    /**
     * An optional style to apply to the checkbox's container.
     */
    style: _propTypes2.default.object,

    /**
     * An optional className to apply to the checkbox's container.
     */
    className: _propTypes2.default.string,

    /**
     * A label to display with the checkbox. This is required for accessibility and triggering
     * the toggle.
     */
    label: _propTypes2.default.node,

    /**
     * Boolean if the label should appear before the checkbox icon.
     */
    labelBefore: _propTypes2.default.bool,

    /**
     * A name to use for the `Checkbox`. This is required for accessibility. If the checkbox is
     * part of a group, it is recommended to make this a string ending in `[]` so that the
     * value can be found from `document.querySelector('input[name="someName[]"]').value`.
     */
    name: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

    /**
     * Boolean if the `Checkbox` is disabled.
     */
    disabled: _propTypes2.default.bool,

    /**
     * An optional function to call when the `checked` state of the `Checkbox` changes.
     * The callback will include the new checked state and the changeEvent.
     *
     * ```js
     * onChange(changeEvent.target.checked, changeEvent);
     * ```
     */
    onChange: _propTypes2.default.func,

    /**
     * An optional value for the `Checkbox`. It is recommended to use a value though.
     */
    value: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.string]),

    /**
     * Boolean if the `Checkbox` is checked by default.
     */
    defaultChecked: _propTypes2.default.bool,

    /**
     * A boolean if the `Checkbox` is currently checked. This will required the `onChange` prop
     * to be defined.
     */
    checked: (0, _controlled2.default)(_propTypes2.default.bool, 'onChange', 'defaultChecked'),

    /**
     * Boolean if the `Checkbox` should be displayed inline.
     */
    inline: _propTypes2.default.bool,

    /**
     * The icon to display when the checkbox is checked.
     */
    checkedIcon: _propTypes2.default.node,

    /**
     * The icon to display when the checkbox is unchecked.
     */
    uncheckedIcon: _propTypes2.default.node,

    checkedIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use `checkedIcon` instead'),
    checkedIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `checkedIcon` instead'),
    uncheckedIconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use `uncheckedIcon` instead'),
    uncheckedIconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `uncheckedIcon` instead')
};
Checkbox.defaultProps = {
    checkedIcon: _react2.default.createElement(
        _FontIcon2.default,
        null,
        'check_box'
    ),
    uncheckedIcon: _react2.default.createElement(
        _FontIcon2.default,
        null,
        'check_box_outline_blank'
    )
};
exports.default = Checkbox;
//# sourceMappingURL=Checkbox.js.map