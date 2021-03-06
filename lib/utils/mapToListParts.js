'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = mapToListParts;

var _react = require('react');

var _Divider = require('../Dividers/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Subheader = require('../Subheaders/Subheader');

var _Subheader2 = _interopRequireDefault(_Subheader);

var _ListItem = require('../Lists/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /** @module utils/mapToListParts */

/**
 * A utility function to convert any "item" into a valid React element that is used
 * within the `List` component.
 *
 * Use cases:
 * - is a valid React element -> item returned unmodified
 * - `number` or `string` -> `ListItem` with the item as the `primaryText`
 * - an `object` with a key `divider: true` -> a `Divider` component with the remaining
 *    keys applied as props.
 * - an `object` with a key `subheader: true` -> a `Subheader` component with the remianing
 *    keys applied as props. This one technically requires the `primaryText` key to be defined.
 * - an `object` -> all keys passed into the `ListItem` component.
 *
 * Examples:
 * ```js
 * mapToListParts('Hello') == <ListItem primaryText="Hello" />
 * mapToListParts(100)     == <ListItem primaryText={100} />
 * mapToListParts({ primaryText: 'Item' }) == <ListItem primaryText="Item" />
 * mapToListParts({ divider: true }) == <Divider />
 * mapToListParts({ subheader: true, primaryText: 'Subheader' }) == <Subheader primaryText="Subheader" />
 * ```
 *
 * @param {string|number|Object} item - the item to convert
 * @param {number|string=} index - the current index in the array (if used in an array)
 * @return {Object} a React element
 */
function mapToListParts(item, index) {
  if (typeof item === 'string' || typeof item === 'number') {
    return (0, _react.createElement)(_ListItem2.default, { key: item, primaryText: item });
  } else if ((0, _react.isValidElement)(item)) {
    return item;
  }

  var divider = item.divider,
      subheader = item.subheader,
      nestedItems = item.nestedItems,
      remainingProps = _objectWithoutProperties(item, ['divider', 'subheader', 'nestedItems']);

  var component = void 0;
  if (divider) {
    component = _Divider2.default;
  } else if (subheader) {
    component = _Subheader2.default;
  } else {
    component = _ListItem2.default;
  }

  var props = _extends({}, remainingProps, { key: item.key || index });
  if (nestedItems) {
    props.nestedItems = nestedItems.map(mapToListParts);
  }

  return (0, _react.createElement)(component, props);
}
//# sourceMappingURL=mapToListParts.js.map