'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveMobileDrawerType;

var _DrawerTypes = require('./DrawerTypes');

var _DrawerTypes2 = _interopRequireDefault(_DrawerTypes);

var _isType = require('./isType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveMobileDrawerType(type, mobile) {
  if (!mobile && !((0, _isType.isPermanent)(type) && (0, _isType.isPersistent)(type))) {
    return type;
  } else if ((0, _isType.isPermanent)(type) || _DrawerTypes2.default.PERSISTENT === type) {
    return _DrawerTypes2.default.TEMPORARY;
  }

  return _DrawerTypes2.default.TEMPORARY_MINI;
}
//# sourceMappingURL=resolveMobileDrawerType.js.map