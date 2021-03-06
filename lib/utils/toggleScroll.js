'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleScroll;

var _getPagePosition = require('./Positioning/getPagePosition');

var _getPagePosition2 = _interopRequireDefault(_getPagePosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A utility function for toggling the overflow visibility on an element. This will either target
 * the given `selector`, or the `body` tag to set a `className`.
 *
 * If the `visible` param is `undefined`, the className will be toggled.
 * If the `visible` param is `true`, the className will be added.
 * If the `visible` param is `false`, the className will be removed.
 *
 *
 * > This depends on the `classList` attribute on elements.
 *
 * @param {bool=} visible - An optional boolean to determine how the `className` will be applied.
 * @param {string|Object=} selector - An optional query selector string to use to select an element.
 * @param {string=} className - The className to apply. Defaults to 'md-overflow-hidden'
 */
function toggleScroll(scrollable, selector) {
  var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'md-no-scroll';

  var queryable = !selector || typeof selector === 'string';
  var el = void 0;
  if (queryable) {
    el = selector ? document.querySelector(selector) : document.querySelector('html');
  } else {
    el = selector;
  }

  if (!el) {
    return;
  }

  if (typeof scrollable === 'undefined') {
    scrollable = !el.classList.contains(className);
  }

  if (scrollable && !el.classList.contains(className)) {
    el.style.top = '-' + (queryable ? (0, _getPagePosition2.default)('y') : el.scrollTop) + 'px';
    el.classList.add(className);
  } else if (!scrollable && el.classList.contains(className)) {
    var scrollTop = Math.abs(parseInt(el.style.top, 10));
    el.classList.remove(className);
    el.style.top = null;

    if (!selector) {
      window.scrollTo(0, scrollTop);
    } else {
      el.scrollTop = scrollTop;
    }
  }
} /** @module utils/toggleScroll */
//# sourceMappingURL=toggleScroll.js.map