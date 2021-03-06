'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setTouchEvent = setTouchEvent;
exports.addTouchEvent = addTouchEvent;
exports.removeTouchEvent = removeTouchEvent;
// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
var supportsPassive = void 0;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('test', null, opts);
} catch (e) {
  supportsPassive = false;
}

/**
 * A helper function for manually setting touch events on elements with the passive
 * option (when it is supported).
 *
 * @param {boolean} add - Boolean if the event listener should be added or removed.
 * @param {HTMLElement} el - The element to add the listener to.
 * @param {String} type - the event type to set. This should be 'start', 'move', or 'end'
 * @param {function} callback - The event listener callback function.
 * @param {Object=} options - any additional options to apply.
 */
function setTouchEvent(add, el, eventType, callback, options) {
  return el[(add ? 'add' : 'remove') + 'EventListener']('touch' + eventType, callback, supportsPassive ? _extends({ passive: true }, options) : false);
}

/**
 * A helper function for manually adding touch events on elements with the passive
 * option (when it is supported).
 *
 * @param {HTMLElement} el - The element to add the listener to.
 * @param {String} type - the event type to set. This should be 'start', 'move', or 'end'
 * @param {function} callback - The event listener callback function.
 * @param {Object=} options - any additional options to apply.
 */
function addTouchEvent(el, type, callback, options) {
  return setTouchEvent(true, el, type, callback, options);
}

/**
 * A helper function for manually removing touch events on elements with the passive
 * option (when it is supported).
 *
 * @param {HTMLElement} el - The element to add the listener to.
 * @param {String} type - the event type to set. This should be 'start', 'move', or 'end'
 * @param {function} callback - The event listener callback function.
 * @param {Object=} options - any additional options to apply.
 */
function removeTouchEvent(el, type, callback, options) {
  return setTouchEvent(false, el, type, callback, options);
}
//# sourceMappingURL=touches.js.map