'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `ResizeObserver` component is a component hook for the
 * [ResizeObserver](http://rawgit.com/WICG/ResizeObserver/master/index.html)
 * using the [resize-observer-polyfill](https://github.com/que-etc/resize-observer-polyfill)
 * for browsers that don't support it yet.
 *
 * This component displays an empty `span` with `aria-hidden` to allow access to the DOM. By
 * default it will attempt to watch changes on its parent component, but it can be configured
 * to watch any element by using the `target` prop.
 */
var ResizeObserver = function (_PureComponent) {
  _inherits(ResizeObserver, _PureComponent);

  function ResizeObserver() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ResizeObserver);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResizeObserver.__proto__ || Object.getPrototypeOf(ResizeObserver)).call.apply(_ref, [this].concat(args))), _this), _this._container = null, _this._target = null, _this._observer = null, _this._height = null, _this._width = null, _this._scrollHeight = null, _this._scrollWidth = null, _this._measure = function (entries) {
      if (!_this._observer || !_this._target) {
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var entry = _step.value;

          if (!entry) {
            return;
          }

          var _entry$contentRect = entry.contentRect,
              height = _entry$contentRect.height,
              width = _entry$contentRect.width;
          var _entry$target = entry.target,
              scrollHeight = _entry$target.scrollHeight,
              scrollWidth = _entry$target.scrollWidth;

          if (_this._isHeightChange(height, scrollHeight) || _this._isWidthChange(width, scrollWidth)) {
            _this._height = height;
            _this._width = width;
            _this._scrollHeight = scrollHeight;
            _this._scrollWidth = scrollWidth;
            _this.props.onResize({ height: height, width: width, scrollHeight: scrollHeight, scrollWidth: scrollWidth, el: entry.target });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }, _this._isHeightChange = function (height, scrollHeight) {
      return _this.props.watchHeight && (height !== _this._height || scrollHeight !== _this._scrollHeight);
    }, _this._isWidthChange = function (width, scrollWidth) {
      return _this.props.watchWidth && (width !== _this._width || scrollWidth !== _this._scrollWidth);
    }, _this._handleRef = function (container) {
      if (container) {
        _this._container = container;
        _this._target = _this._getTarget(container, _this.props.target);
        _this._observer = new _resizeObserverPolyfill2.default(_this._measure);

        if (_this._target) {
          _this._observer.observe(_this._target);
        }
      } else {
        if (_this._observer) {
          _this._observer.disconnect();
        }

        _this._container = null;
        _this._target = null;
        _this._observer = null;
        _this._height = null;
        _this._width = null;
        _this._scrollHeight = null;
        _this._scrollWidth = null;
      }

      if (_this.props.elRef) {
        _this.props.elRef(_this._target);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ResizeObserver, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var target = this.props.target;

      var nextTarget = nextProps.target;
      if (target === nextTarget) {
        return;
      } else if (nextTarget) {
        if (this._target) {
          this._observer.unobserve(this._target);
        }
        this._target = this._getTarget(this._container, nextTarget);
        this._observer.observe(this._target);
      }
    }
  }, {
    key: '_getTarget',
    value: function _getTarget(container, target) {
      if (target === null || target && typeof target !== 'string') {
        return target;
      }

      var t = null;
      if (target) {
        t = document.getElementById(target) || document.querySelector(target);
      } else {
        t = container.parentNode;
      }

      if (!t) {
        throw new Error('An HTMLDOMNode is required as the `ResizeObserver`\'s watch target but none were provided/found. ' + ('Please update the target prop to find a valid node since the provided target is invalid. `' + target + '`.'));
      }

      return t;
    }
  }, {
    key: 'render',
    value: function render() {
      var Component = this.props.component;

      return _react2.default.createElement(Component, { ref: this._handleRef, 'aria-hidden': true });
    }
  }]);

  return ResizeObserver;
}(_react.PureComponent);

ResizeObserver.propTypes = {
  /**
   * Boolean if the height should be watched for the resize target.
   */
  watchHeight: _propTypes2.default.bool,

  /**
   * Boolean if the width should be watched for the resize target.
   */
  watchWidth: _propTypes2.default.bool,

  /**
   * An optional target that should be used for detecting resize events. This can either
   * be a HTMLDOMNode or a string to use with `document.getElementById` or `document.querySelector`.
   *
   * If this prop is not provided and not null, it will default to the parent node of this component.
   * If the provided `target={null}`, the observer will not begin until the `target` is `undefined` or
   * it has been correctly passed a target string or object.
   */
  target: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),

  /**
   * The component to be rendered as. This should normally just be the default `span`, but there are cases
   * where the component should be switched to something else for valid html.
   */
  component: _propTypes2.default.string,

  /**
   * A function to call when the height or width has been changed and that attribute is being watched.
   * The callback will include the current height, width, scrollHeight and scrollWidth of the target.
   *
   * ```js
   * onResize({
   *   height: nextHeight,
   *   width: nextWidth,
   *   scrollHeight: nextScrollHeight,
   *   scrollWidth: nextScrollWidth,
   *   el: resizeTarget,
   * });
   * ```
   */
  onResize: _propTypes2.default.func.isRequired,

  /**
   * An optional ref callback that will include the `target` or the parent node of the resize observer. Just
   * like other refs, this will provide null when it unmounts.
   *
   * This is really only helpful if you'd like the DOM node for a parent Component without needing to use
   * `ReactDOM.findDOMNode(this)`.
   */
  elRef: _propTypes2.default.func
};
ResizeObserver.defaultProps = {
  watchHeight: false,
  watchWidth: false,
  component: 'span'
};
exports.default = ResizeObserver;
//# sourceMappingURL=ResizeObserver.js.map