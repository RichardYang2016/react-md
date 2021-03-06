'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findTable;
/**
 * Attempts fo find the base table component from an element in the table.
 * This will either be the wrapper for responsive data tables, or the table element.
 *
 * @param {Object} el - The element to traverse from
 * @param {Object} the table or null.
 */
function findTable(el) {
  var table = void 0;
  var node = el;
  while (node && node.parentNode) {
    if (node.classList) {
      if (node.classList.contains('md-data-table')) {
        table = node;
      } else if (node.classList.contains('md-data-table--responsive')) {
        return node;
      } else if (node.classList.contains('md-data-table__scroll-wrapper')) {
        // fixed-wrapper then responsive
        return node.parentNode.parentNode;
      } else if (table) {
        return table;
      }
    }

    node = node.parentNode;
  }

  return null;
}
//# sourceMappingURL=findTable.js.map