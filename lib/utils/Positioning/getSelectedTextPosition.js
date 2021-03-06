'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSelectedTextPosition;

var _getSelectedText = require('../getSelectedText');

var _getSelectedText2 = _interopRequireDefault(_getSelectedText);

var _getTextWidth = require('./getTextWidth');

var _getTextWidth2 = _interopRequireDefault(_getTextWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module utils/Positoning/getSelectedTextPosition */
var ZERO_WIDTH_CHARACTER = '\u200B';

/**
 * A utility function to attempt to get the current highlighted text position.
 *
 * When a context menu is opened, this function attempts to find the bounding client rect
 * for the highlighted text. However, if the text is in the text field, some weird stuff
 * happens and it is unable to get it correctly.
 */
function getSelectedTextPosition(e) {
  var height = void 0;
  var target = e.target,
      clientX = e.clientX,
      clientY = e.clientY;

  var text = (0, _getSelectedText2.default)();
  var width = Math.round((0, _getTextWidth2.default)(text, target) || 0);
  if (!text || target.classList.contains('md-text-field')) {
    height = parseInt(window.getComputedStyle(target).fontSize, 10);
    return {
      width: width,
      height: height,
      left: clientX - width,
      top: clientY
    };
  }

  // All browsers I am supporting have window.getSelection, but better safe than sorry
  if (window.getSelection) {
    var selection = window.getSelection();
    if (selection.rangeCount) {
      var range = selection.getRangeAt(0).cloneRange();
      var rect = null;
      if (range.getClientRects) {
        var rects = range.getClientRects();
        if (rects.length > 0) {
          rect = rects[0];
        }
      }

      if (!rect) {
        var span = document.createElement('span');
        span.appendChild(document.createTextNode(ZERO_WIDTH_CHARACTER));
        range.insertNode(span);
        rect = span.getBoundingClientRect();

        var spanParent = span.parentNode;
        spanParent.removeChild(span);
        spanParent.normalize();
      }

      return rect;
    }
  }

  return null;
}
//# sourceMappingURL=getSelectedTextPosition.js.map