'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSelectedText;
/** @module utils/getSelectedText */

/**
 * A utility function that gets the current selected text in the document. I think
 * that all the browsers I support have `window.getSelection`, but it falls back to
 * support others.
 *
 * @return {String} the current selection on the page
 */
function getSelectedText() {
  if (typeof window.getSelection !== 'undefined') {
    return window.getSelection().toString();
  } else if (typeof document.selection !== 'undefined' && document.selection.type === 'Text') {
    return document.selection.createRange().text;
  }

  return '';
}
//# sourceMappingURL=getSelectedText.js.map