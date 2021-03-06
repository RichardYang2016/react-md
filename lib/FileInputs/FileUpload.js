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

var _reactDom = require('react-dom');

var _FileInput = require('./FileInput');

var _FileInput2 = _interopRequireDefault(_FileInput);

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _omit = require('../utils/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `FileUpload` component is used to upload files locally This is a wrapper of the `FileInput` component
 * with some additional functionality so any props that are undocumented on `FileUpload` but are present
 * on `FileInput` are correctly provided. If you want to upload files to a server, use
 * [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
 * by attaching the `File`.
 *
 * Quick example:
 *
 * ```js
 * function upload(file) {
 *   fetch('/api/images', {
 *     method: 'POST',
 *     body: new FormData().append('file', file),
 *   });
 * }
 * ```
 *
 * An upload can be aborted by calling the `abort(file || fileName)` function. If
 * the file or fileName are omitted, it will *attempt* to abort the current
 * file that is uploading. Unreliable for multi-select.
 *
 * ```js
 * <FileUpload ref="upload" />
 * <Button raised onClick={() => this.refs.upload.abort()} label="Abort! Abort!" />
 * ```
 */
var FileUpload = function (_PureComponent) {
  _inherits(FileUpload, _PureComponent);

  function FileUpload() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FileUpload);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FileUpload.__proto__ || Object.getPrototypeOf(FileUpload)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.abort = function (file) {
      var fileName = file;
      if (!file) {
        // Attempt to remove first file added...
        fileName = Object.keys(_this.state)[0];
      } else if (typeof file.name === 'string') {
        fileName = file.name;
      }

      var reader = _this.state[fileName];
      if (reader) {
        reader.abort();
        (0, _reactDom.findDOMNode)(_this).querySelector('.md-file-input').value = '';

        _this.setState((0, _omit2.default)(_this.state, [fileName]));
      }
    }, _this._uploadFile = function (file) {
      var _this$props = _this.props,
          onAbort = _this$props.onAbort,
          onError = _this$props.onError,
          onLoad = _this$props.onLoad,
          onLoadStart = _this$props.onLoadStart,
          onLoadEnd = _this$props.onLoadEnd,
          onProgress = _this$props.onProgress,
          readAs = _this$props.readAs;
      var name = file.name,
          type = file.type;


      var fr = new FileReader();
      if (onError) {
        fr.onerror = function (e) {
          onError(file, e.target.error, e);
        };
      }

      if (onAbort) {
        fr.onabort = function (e) {
          onAbort(file, e);
        };
      }

      if (onLoadStart) {
        fr.onloadstart = function (e) {
          onLoadStart(file, e);
        };
      }

      if (onLoadEnd) {
        fr.onloadend = function (e) {
          onLoadEnd(file, e);
        };
      }

      fr.onload = function (e) {
        if (onLoad) {
          onLoad(file, e.target.result, e);
        }

        _this.setState((0, _omit2.default)(_this.state, [name]));
      };

      if (onProgress) {
        fr.onprogress = function (e) {
          if (e.lengthComputable) {
            onProgress(file, e.loaded / e.total * 100, e);
          }
        };
      }

      if (readAs) {
        if (typeof readAs === 'function') {
          readAs(type, file, fr);
        } else {
          fr['readAs' + readAs](file);
        }
      } else if (type.match(/image|video|audio|application\/pdf/) || name.match(/\.mkv$/)) {
        fr.readAsDataURL(file);
      } else if (type.match(/application\/json/)) {
        fr.readAsText(file);
      } else if (type.match(/application|model|multipart/) || name.match(/(w|e)ar$/)) {
        fr.readAsArrayBuffer(file);
      } else {
        fr.readAsText(file);
      }

      return fr;
    }, _this._handleUpload = function (fileList, e) {
      if (_this.props.onChange) {
        _this.props.onChange(fileList, e);
      }

      if (!fileList) {
        return;
      }
      var _this$props2 = _this.props,
          maxSize = _this$props2.maxSize,
          onSizeError = _this$props2.onSizeError;

      var files = Array.isArray(fileList) ? fileList : [fileList];

      var errorFiles = [];
      if (maxSize) {
        errorFiles = files.filter(function (file) {
          return file.size > maxSize;
        });
        files = files.filter(function (file) {
          return file.size <= maxSize;
        });
      }

      if (errorFiles.length) {
        onSizeError(errorFiles);
      }

      if (!files.length) {
        return;
      }

      var nextState = {};
      files.forEach(function (file) {
        var fileReader = _this._uploadFile(file);
        nextState[file.name] = fileReader;
      });

      _this.setState(nextState);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Attempts to abort the upload of a file. This function takes an optional `file` or `fileName`
   * as it's parameter. If the parameter is omitted, it attempts to abort the first file that was
   * added. If the `onAbort` function was given, it will be called as well.
   *
   * @param {Object|string} file - The file or the file name to use to find the
   *     correct `FileReader`.
   */


  _createClass(FileUpload, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          maxSize = _props.maxSize,
          readAs = _props.readAs,
          onLoad = _props.onLoad,
          onLoadStart = _props.onLoadStart,
          onLoadEnd = _props.onLoadEnd,
          onProgress = _props.onProgress,
          onAbort = _props.onAbort,
          onError = _props.onError,
          onSizeError = _props.onSizeError,
          props = _objectWithoutProperties(_props, ['maxSize', 'readAs', 'onLoad', 'onLoadStart', 'onLoadEnd', 'onProgress', 'onAbort', 'onError', 'onSizeError']);

      return _react2.default.createElement(_FileInput2.default, _extends({}, props, { onChange: this._handleUpload }));
    }
  }]);

  return FileUpload;
}(_react.PureComponent);

FileUpload.propTypes = {
  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply.
   */
  className: _propTypes2.default.string,

  /**
   * An optional style to apply to the label.
   */
  labelStyle: _propTypes2.default.object,

  /**
   * An optional className to apply to the label.
   */
  labelClassName: _propTypes2.default.string,

  /**
   * Boolean if the `FileInput` should be styled with the primary color.
   */
  primary: _propTypes2.default.bool,

  /**
   * Boolean if the `FileInput` should be styled with the secondary color.
   */
  secondary: _propTypes2.default.bool,

  /**
   * Boolean if the `FileInput` should be styled as a flat button instead of a
   * raised button.
   */
  flat: _propTypes2.default.bool,

  /**
   * This should be a comma separated list of Media Types that the `FileInput` can
   * accept. If this prop is left blank, any file will be accepted.
   *
   * The values can either be:
   * - A file extension
   * - audio/*
   * - video/*
   * - image/*
   * - any valid [IANA Media Type](http://www.iana.org/assignments/media-types/media-types.xhtml)
   */
  accept: _propTypes2.default.string,

  /**
   * Boolean if multiple files will be accepted.
   */
  multiple: _propTypes2.default.bool,

  /**
   * A label to display on the `FileInput`.
   */
  label: _propTypes2.default.node,

  /**
   * The icon children to use for the upload icon.
   */
  iconChildren: _propTypes2.default.node,

  /**
   * The icon className to use for the upload icon.
   */
  iconClassName: _propTypes2.default.string,

  /**
   * An optional max size for the file. If the file is greater than
   * this limit, the file will not be uploaded.
   */
  maxSize: _propTypes2.default.number,

  /**
   * A required function to call when the `maxSize` prop is set. It will
   * be given a list of files that were too big.
   */
  onSizeError: function onSizeError(props, propName, component) {
    for (var _len2 = arguments.length, others = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      others[_key2 - 3] = arguments[_key2];
    }

    if (typeof props.maxSize === 'number') {
      var _PropTypes$func;

      return (_PropTypes$func = _propTypes2.default.func).isRequired.apply(_PropTypes$func, [props, propName, component].concat(others));
    }

    return null;
  },

  /**
   * You can force the `FileReader` to read the file as a specific type
   * if you do not trust the *amazing* regex I have for choosing the correct
   * one.
   *
   * ```js
   * if(type.match(/image|video|audio/)) {
   *   fr.readAsDataURL(file);
   * } else if(type.match(/application|model|multipart/)) {
   *   fr.readAsArrayBuffer(file);
   * } else {
   *   fr.readAsText(file);
   * }
   * ```
   *
   * > `.yml` and `.js` both are considered `application`, so it definitely fails there.
   *
   * If this prop is a function, you will be given the file's type, the file object, and
   * the file reader. You will then need to call `fileReader.readAsYOUR_CORRECT_TYPE(file)`.
   */
  readAs: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['DataURL', 'ArrayBuffer', 'Text']), _propTypes2.default.func]),

  /**
   * An optional function to call when the `FileUpload` aborts. The current
   * file and the abort event are given. This might not be the most useful
   * function to use since you will need to manually call abort yourself anyways.
   */
  onAbort: _propTypes2.default.func,

  /**
   * An optional function to call when the `FileUpload` errors. The current
   * file, the error, and the error event are given.
   *
   * ```js
   * onError(file, event.target.error, event);
   * ```
   */
  onError: _propTypes2.default.func,

  /**
   * An optional function to call when the `FileUpload` loads. The current
   * file, the load result, and the load event are given.
   *
   * ```js
   * onLoad(file, event.target.result, event);
   * ```
   *
   * The load result will either be:
   * - a data URL
   * - a plain text string
   * - an array buffer
   *
   * depending on what type the file is.
   */
  onLoad: _propTypes2.default.func,

  /**
   * An optional function to call when the `FileUpload` starts loading. The current
   * file and the load start event are given.
   */
  onLoadStart: _propTypes2.default.func,

  /**
   * An optional function to call when the `FileUpload` finishes loading. The
   * current file and the load end event are given.
   */
  onLoadEnd: _propTypes2.default.func,

  /**
   * An optional function to call when the `FileUpload` progress. The current
   * file, upload progress, and the progress event are given. The progress
   * will be a number between 0 and 100 that has not been rounded.
   *
   * ```js
   * onProgress(file, progress, event);
   * ```
   */
  onProgress: _propTypes2.default.func,

  /**
   * Boolean if the same file is allowed to be uploaded multiple times. This will basically make the
   * `value` of the file input always blank.
   */
  allowDuplicates: _propTypes2.default.bool,

  /**
   * An optional function to call when a file selects or unselects a file.
   * This will be called before any local uploading occurs.
   *
   * ```js
   * onChange(file(s) || null, event);
   * ```
   */
  onChange: _propTypes2.default.func,
  value: (0, _deprecated2.default)(_propTypes2.default.string, 'There should\'t be a reason to set the value manually. Check out {@link #allowDuplicates} instead')
};
exports.default = FileUpload;
//# sourceMappingURL=FileUpload.js.map