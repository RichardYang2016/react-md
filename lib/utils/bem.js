'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** @module utils/bem */


exports.default = bem;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A utility function to apply BEM class names to an element.
 *
 * ### Examples:
 * ```js
 * bem('class') === 'class'
 * bem('block', 'element') === 'block__element'
 * bem('block', 'element', 'sub-element') === 'block__element__sub-element'
 * bem('block', { 'mod-1': true, 'mod-2': false }) === 'block block--mod-1'
 * bem('block', 'element', { 'mod-1': false, 'mod-2': true }) === 'block__element block__element--mod-2'
 * bem('block', 'element', {
 *   'mod-1': false,
 *   'mod-2': true,
 * }, 'other', 'class-names') === 'block__element block__element--mod-2 other class-names'
 * ```
 *
 * @param {...String} blocks - 1 to many blocks to use. These names will be joined
 *    with underscores.
 * @param {Object=} modifiers - Any conditional modifiers to apply to the blocks. Each
 *    key in this object will be applied as a `--suffix` to the blocks ONLY when
 *    their value is true-ish.
 * @param {...String} others - Any additional class names to apply.
 * @return {String} the bem-formatted className string.
 */
function bem() {
  var base = [];
  var modifiers = null;
  var remaining = -1;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.some(function (arg, i) {
    if (arg) {
      var type = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);
      if (type === 'number' || type === 'string') {
        base.push(arg);
      } else if (type === 'object') {
        modifiers = arg;
        remaining = i + 1;
      }
    }
    return modifiers;
  });

  var element = base.join('__');
  if (modifiers) {
    modifiers = Object.keys(modifiers).reduce(function (obj, key) {
      obj[element + '--' + key] = modifiers[key];
      return obj;
    }, {});
  }
  var classes = remaining > -1 ? args.slice(remaining) : null;
  return (0, _classnames2.default)(element, modifiers, classes).trim();
}
//# sourceMappingURL=bem.js.map