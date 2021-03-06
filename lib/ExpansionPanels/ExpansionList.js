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

var _keyCodes = require('../constants/keyCodes');

var _handleWindowClickListeners = require('../utils/EventUtils/handleWindowClickListeners');

var _handleWindowClickListeners2 = _interopRequireDefault(_handleWindowClickListeners);

var _ResizeObserver = require('../Helpers/ResizeObserver');

var _ResizeObserver2 = _interopRequireDefault(_ResizeObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `ExpansionList` component is a wrapper for the `ExpansionPanel` that helps
 * determine which `ExpansionPanel` currently has tab focus and adjusts the column
 * sizes in the header of the `ExpansionPanel`.
 *
 * The `ExpansionList` and `ExpansionPanel` components should have probably been
 * implemented as a `table` instead of a `ul || ol` since it is more column based,
 * but it would complicate the API to have dynamic row generation for the expanded
 * panels. The expanded panels _might_ not follow the same column widths as their labels
 * so a singular row with a div for expanded content might not work correctly.
 */
var ExpansionList = function (_PureComponent) {
  _inherits(ExpansionList, _PureComponent);

  function ExpansionList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ExpansionList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExpansionList.__proto__ || Object.getPrototypeOf(ExpansionList)).call.apply(_ref, [this].concat(args))), _this), _this.state = { columnWidths: [], focusedIndex: -1, overflown: false }, _this._setContainer = function (container) {
      if (container !== null) {
        _this._container = (0, _reactDom.findDOMNode)(container);
        window.addEventListener('keyup', _this._determineTabFocus);

        _this._width = _this._container.offsetWidth;
        _this._calcColumnWidths();
      }
    }, _this._determineTabFocus = function (e) {
      if ((e.which || e.keyCode) === _keyCodes.TAB) {
        var panels = Array.prototype.slice.call((0, _reactDom.findDOMNode)(_this).querySelectorAll('.md-panel-header'));
        _this.setState({ focusedIndex: panels.indexOf(e.target) });
      }
    }, _this._removeFocus = function () {
      _this.setState({ focusedIndex: -1 });
    }, _this._isOverflown = function (widths) {
      if (!_this._container) {
        return false;
      }

      var panel = _this._container.querySelector('.md-panel-header');
      if (!panel) {
        return false;
      }

      var collapser = _this._container.querySelector('.md-expansion-panel__collapser');
      var collapserWidth = collapser ? collapser.offsetWidth : 0;
      var styles = window.getComputedStyle(panel);
      var maxWidth = panel.offsetWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight) - collapserWidth;

      var totalWidth = widths.reduce(function (total, w) {
        return total + w;
      }, 0);
      return totalWidth > maxWidth;
    }, _this._getColumnWidths = function () {
      if (!_this._container) {
        return _this.state.columnWidths;
      }

      return [].slice.call(_this._container.querySelectorAll('.md-panel-header')).reduce(function (maxes, row) {
        var columns = row.querySelectorAll('.md-panel-column');
        for (var i = 0; i < columns.length; i++) {
          var col = columns[i];
          // Need to reset the widths if it has already been calculated to get a more accurate measurement.
          var _col$style = col.style,
              width = _col$style.width,
              minWidth = _col$style.minWidth;

          col.style.width = 'auto';
          col.style.minWidth = 'auto';

          // Only need to include the offsetWidth of the column because the child will really
          // determine the width of the column. Since it has already been defined at this point,
          // no additional work needs to be done.
          maxes[i] = Math.max(col.offsetWidth, maxes[i] || 0);
          col.style.width = width;
          col.style.minWidth = minWidth;
        }

        return maxes;
      }, [0]);
    }, _this._calcColumnWidths = function () {
      var columnWidths = _this.state.columnWidths;

      var nextWidths = _this._getColumnWidths();
      var overflown = _this._isOverflown(nextWidths);
      if (_this.state.overflown !== overflown || columnWidths.length !== nextWidths.length || nextWidths.some(function (w, i) {
        return w !== columnWidths[i];
      })) {
        _this.setState({ columnWidths: nextWidths, overflown: overflown });
      }
    }, _this._handleResize = function (_ref2) {
      var width = _ref2.width;
      var recalculateThreshold = _this.props.recalculateThreshold;

      if (_this._width !== width && Math.abs(width - _this._width) >= recalculateThreshold) {
        _this._width = width;
        _this._calcColumnWidths();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ExpansionList, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var animateContent = this.props.animateContent;

      return { animateContent: animateContent };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.children !== nextProps.children) {
        this._calcColumnWidths();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var focusedIndex = this.state.focusedIndex;

      if (prevState.focusedIndex === focusedIndex || prevState.focusedIndex > -1 && focusedIndex > -1) {
        return;
      }

      (0, _handleWindowClickListeners2.default)(this._removeFocus, this.state.focusedIndex !== -1);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.state.focusedIndex === -1) {
        (0, _handleWindowClickListeners2.default)(this._removeFocus, false);
      }

      window.removeEventListener('keyup', this._determineTabFocus);
    }

    /**
     * Since this should really be rendered as a table, need to calculate the max width for each _column_
     * on the panel's header and apply that as a min width for the other panels.
     */

  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          columnWidths = _state.columnWidths,
          focusedIndex = _state.focusedIndex,
          overflown = _state.overflown;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          Component = _props.component,
          animateContent = _props.animateContent,
          recalculateThreshold = _props.recalculateThreshold,
          props = _objectWithoutProperties(_props, ['children', 'className', 'component', 'animateContent', 'recalculateThreshold']);

      var panels = _react.Children.map(children, function (child, i) {
        return (0, _react.cloneElement)(child, {
          key: child.key || i,
          overflown: overflown,
          columnWidths: columnWidths,
          focused: focusedIndex === i
        });
      });
      return _react2.default.createElement(
        Component,
        _extends({}, props, {
          ref: this._setContainer,
          className: (0, _classnames2.default)('md-expansion-panel-list', className)
        }),
        _react2.default.createElement(_ResizeObserver2.default, { watchWidth: true, onResize: this._handleResize }),
        panels
      );
    }
  }]);

  return ExpansionList;
}(_react.PureComponent);

ExpansionList.propTypes = {
  /**
   * An optional style object to apply to the list.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply to the list.
   */
  className: _propTypes2.default.string,

  /**
   * The children should be a list or singular `ExpansionPanel` component
   * to render with some additional props injected.
   */
  children: _propTypes2.default.node,

  /**
   * The component to render the list as.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired,

  /**
   * Boolean if all the expansion panels in the list should animate when their content's visibility
   * changes. This is just a quicker way to disable all animations instead of having to toggle it off
   * on each panel.
   *
   * > The default value is really `true` since it gets passed down to the `Collapse` component.
   */
  animateContent: _propTypes2.default.bool,

  /**
   * The threshold that should be used for when the list should recalculate the positioning of all
   * the columns. This will only compare the difference between updates.
   * So if the size changes from 80 -> 120 -> 160 -> 140. It will only update on the third resize (160)
   */
  recalculateThreshold: _propTypes2.default.number.isRequired
};
ExpansionList.defaultProps = {
  component: 'ul',
  recalculateThreshold: 80
};
ExpansionList.childContextTypes = {
  animateContent: _propTypes2.default.bool
};
exports.default = ExpansionList;
//# sourceMappingURL=ExpansionList.js.map