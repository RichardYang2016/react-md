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

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _between = require('../utils/PropTypes/between');

var _between2 = _interopRequireDefault(_between);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * There are 3 different types of linear progress bars: `Determinate`,
 * `Indeterminate`, and `Query Indeterminate`.
 *
 * A `Determinate` linear progress bar should be used when you can keep track of the
 * progress and have a percentage complete you can work with. An example would be
 * uploading/downloading a file.
 *
 * An `Indeterminate` linear progress bar should be used when you can not keep track
 * of the progress yourself. An example might be waiting for an API call to complete.
 *
 * A `Query Indeterminate` linear progress bar is used when you are combining
 * `Indeterminate` and `Determinate`. A Linear Progress component can be displayed
 * as a query indeterminate progress bar by adding the prop `query={true}` to the
 * component. Until a progress value is given, it will display the query linear
 * progress animation. Afterwards, it will start the determinate animation of where
 * you manually keep updating the value of the progress.
 */
var LinearProgress = function (_PureComponent) {
  _inherits(LinearProgress, _PureComponent);

  function LinearProgress() {
    _classCallCheck(this, LinearProgress);

    return _possibleConstructorReturn(this, (LinearProgress.__proto__ || Object.getPrototypeOf(LinearProgress)).apply(this, arguments));
  }

  _createClass(LinearProgress, [{
    key: 'render',

    /* eslint-disable max-len */
    value: function render() {
      var _props = this.props,
          className = _props.className,
          progressClassName = _props.progressClassName,
          progressStyle = _props.progressStyle,
          value = _props.value,
          query = _props.query,
          centered = _props.centered,
          props = _objectWithoutProperties(_props, ['className', 'progressClassName', 'progressStyle', 'value', 'query', 'centered']);

      var isDeterminate = typeof value === 'number';

      var accessibilityProps = {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100
      };

      var style = void 0;
      if (isDeterminate) {
        style = { width: value + '%' };
        accessibilityProps['aria-valuenow'] = value;
      }
      if (progressStyle) {
        style = Object.assign(style || {}, typeof progressStyle === 'function' ? progressStyle(value, this) : progressStyle);
      }

      return _react2.default.createElement(
        'div',
        _extends({}, props, {
          className: (0, _classnames2.default)('md-progress md-progress--linear', { 'md-block-centered': centered }, className)
        }),
        _react2.default.createElement('div', _extends({}, accessibilityProps, {
          style: style,
          className: (0, _classnames2.default)('md-progress--linear-active', {
            'md-progress--linear-query': query,
            'md-progress--linear-determinate': isDeterminate,
            'md-progress--linear-indeterminate': !isDeterminate
          }, typeof progressClassName === 'function' ? progressClassName(value, this) : progressClassName)
        }))
      );
    }
  }]);

  return LinearProgress;
}(_react.PureComponent);

LinearProgress.propTypes = {
  /**
   * The `id` prop is required for accessibility concerns.
   * [Progress Bar Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role)
   *
   * > If the progressbar is describing the loading progress of a particular region of a page, the author
   * __SHOULD__ use aria-describedby to point to the status, and set the aria-busy attribute to true on the
   * region until it is finished loading. It is not possible for the user to alter the value of a progressbar
   * because it is always readonly.
   */
  id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),

  /* eslint-enable max-len */
  /**
   * An optional className to apply to the linear progress container.
   */
  className: _propTypes2.default.string,

  /**
   * An optional className to apply to the progress bar element.
   *
   * If a function is specified it will be called to get necessary className.
   * Current progress value and reference to the component will be passed into the function.
   */
  progressClassName: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),

  /**
   * An optional style to apply to the progress bar element.
   *
   * If a function is specified it will be called to get necessary style.
   * Current progress value and reference to the component will be passed into the function.
   */
  progressStyle: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]),

  /**
   * The current value of the progress. If this value is defined, it will
   * be converted to a determinate circular progress. The progress will not
   * advance unless this value changes.
   *
   * This value should also be a number between 0 and 100.
   */
  value: (0, _between2.default)(_propTypes2.default.number, 0, 100),

  /**
   * Boolean if this should be a query indeterminate progress bar.
   */
  query: _propTypes2.default.bool,

  /**
   * Boolean if the Linear Progress should be centered. This
   * will only work if the `max-width` style is set.
   */
  centered: _propTypes2.default.bool
};
LinearProgress.defaultProps = {
  query: false
};
exports.default = LinearProgress;
//# sourceMappingURL=LinearProgress.js.map