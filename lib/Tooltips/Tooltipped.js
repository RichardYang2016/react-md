'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Tooltipped;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TooltipContainer = require('./TooltipContainer');

var _TooltipContainer2 = _interopRequireDefault(_TooltipContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Adds a tooltip for a component/element given as the only child.
 *
 * The component should render its children, or the tooltip will not be shown.
 * Also the component should be positioned by `className` or `style`
 * (CSS property `position` should have value `relative`, `absolute` or `fixed`),
 * or the tooltip can appear incorrectly.
 * Use `setPosition={true}` to automatically add `position: 'relative'` to the `style` of the wrapped component.
 *
 * Besides of `children` and `setPosition` all props set for `Tooltipped` component are passed through
 * to `TooltipContainer` that is added as a child of the wrapped component and controls the tooltip.
 *
 * ```js
 * <Tooltipped
 *   label="Tooltip for text"
 *   position="left"
 *   delay={1000}
 * >
 *   <span style={{position: 'absolute', top: '10px', left: '70%'}}>
 *     Some text
 *     <div>Another line of text</div>
 *   </span>
 * </Tooltipped>
 * ```
 *
 * ```js
 * <Tooltipped
 *   setPosition={true}
 *   label="Avatar's tooltip"
 *   position="top"
 * >
 *   <span style={{marginLeft: '30px'}}>
 *       <Avatar random>T</Avatar>
 *   </span>
 * </Tooltipped>
 * ```
 */
function Tooltipped(_ref) {
  var children = _ref.children,
      setPosition = _ref.setPosition,
      props = _objectWithoutProperties(_ref, ['children', 'setPosition']);

  var target = _react2.default.Children.only(children);
  var targetProps = target.props;

  if (props.label) {
    var clonedProps = targetProps;
    if (setPosition) {
      clonedProps = _extends({}, clonedProps, {
        style: _extends({}, clonedProps.style, { position: 'relative' })
      });
    }

    target = _react2.default.cloneElement(target, clonedProps, [targetProps.children, _react2.default.createElement(_TooltipContainer2.default, _extends({ key: 'tooltipContainer' }, props))]);
  }

  return target;
}

Tooltipped.displayName = 'Tooltipped';

Tooltipped.propTypes = {
  /**
   * A component/element the tooltip should be linked to.
   */
  children: _propTypes2.default.element.isRequired,
  /**
   * Tooltip's content.
   */
  label: _propTypes2.default.node,
  /**
   * Whether `position: relative` should be added to the `style` property of the wrapped component.
   */
  setPosition: _propTypes2.default.bool
};
//# sourceMappingURL=Tooltipped.js.map