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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _keyCodes = require('../constants/keyCodes');

var _captureNextEvent = require('../utils/EventUtils/captureNextEvent');

var _captureNextEvent2 = _interopRequireDefault(_captureNextEvent);

var _getBtnStyles = require('../Buttons/getBtnStyles');

var _getBtnStyles2 = _interopRequireDefault(_getBtnStyles);

var _FontIcon = require('../FontIcons/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _IconSeparator = require('../Helpers/IconSeparator');

var _IconSeparator2 = _interopRequireDefault(_IconSeparator);

var _AccessibleFakeInkedButton = require('../Helpers/AccessibleFakeInkedButton');

var _AccessibleFakeInkedButton2 = _interopRequireDefault(_AccessibleFakeInkedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `FileInput` component is used as simple styling for the `<input type="file" />`.
 * It will style the input as a raised button by default.
 */
var FileInput = function (_PureComponent) {
  _inherits(FileInput, _PureComponent);

  function FileInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FileInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FileInput.__proto__ || Object.getPrototypeOf(FileInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = { hover: false, pressed: false }, _this._handleChange = function (e) {
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          onChange = _this$props.onChange;
      var files = e.target.files;

      if (onChange) {
        if (!multiple) {
          onChange(files[0] || null, e);
        } else {
          onChange(Array.prototype.slice.call(files), e);
        }
      }
    }, _this._blur = function () {
      if (_this.props.disabled) {
        return;
      }

      if (_this._timeout) {
        _this._attemptedBlur = true;
      } else {
        _this.setState({ pressed: false });
      }
    }, _this._handleMouseUp = function (e) {
      if (_this.props.onMouseUp) {
        _this.props.onMouseUp(e);
      }

      _this._blur();
    }, _this._handleMouseDown = function (e) {
      if (_this.props.onMouseDown) {
        _this.props.onMouseDown(e);
      }

      if (!_this.props.disabled) {
        _this.setState({ pressed: true });
      }
    }, _this._handleTouchStart = function (e) {
      if (_this.props.onTouchStart) {
        _this.props.onTouchStart(e);
      }

      if (!_this.props.disabled) {
        _this.setState({ pressed: true });
      }
    }, _this._handleTouchEnd = function (e) {
      if (_this.props.onTouchEnd) {
        _this.props.onTouchEnd(e);
      }

      _this._blur();
      (0, _captureNextEvent2.default)('mouseover');
    }, _this._handleKeyUp = function (e) {
      if (_this.props.onKeyUp) {
        _this.props.onKeyUp(e);
      }

      if ((e.which || e.keyCode) === _keyCodes.TAB) {
        window.addEventListener('click', _this._blur);
        _this.setState({ pressed: true });
      }
    }, _this._handleKeyDown = function (e) {
      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(e);
      }

      var key = e.which || e.keyCode;

      if (key === _keyCodes.TAB) {
        window.removeEventListener('click', _this._blur);
        _this.setState({ pressed: false });
      } else if (key === _keyCodes.SPACE || key === _keyCodes.ENTER) {
        e.preventDefault();
        e.target.click();
      }
    }, _this._handleMouseOver = function (e) {
      if (_this.props.onMouseOver) {
        _this.props.onMouseOver(e);
      }

      if (!_this.props.disabled) {
        _this.setState({ hover: true });
      }
    }, _this._handleMouseLeave = function (e) {
      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(e);
      }

      if (!_this.props.disabled) {
        _this.setState({ hover: false });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FileInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.disabled && !nextProps.disabled && this.state.hover) {
        this.setState({ hover: false });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var _this2 = this;

      // I honestly don't remember why this was implemented, but it was copied from the Button
      // component
      if (!this.state.pressed && nextState.pressed) {
        this._timeout = setTimeout(function () {
          _this2._timeout = null;
          if (_this2._attemptedBlur) {
            _this2._attemptedBlur = false;

            _this2.setState({ pressed: false });
          }
        }, 450);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }

      window.removeEventListener('click', this._blur);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          hover = _state.hover,
          pressed = _state.pressed;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          labelStyle = _props.labelStyle,
          labelClassName = _props.labelClassName,
          label = _props.label,
          primary = _props.primary,
          secondary = _props.secondary,
          flat = _props.flat,
          id = _props.id,
          name = _props.name,
          iconBefore = _props.iconBefore,
          disabled = _props.disabled,
          accept = _props.accept,
          multiple = _props.multiple,
          swapTheming = _props.swapTheming,
          allowDuplicates = _props.allowDuplicates,
          iconChildren = _props.iconChildren,
          iconClassName = _props.iconClassName,
          propIcon = _props.icon,
          onChange = _props.onChange,
          onKeyUp = _props.onKeyUp,
          onKeyDown = _props.onKeyDown,
          onMouseUp = _props.onMouseUp,
          onMouseDown = _props.onMouseDown,
          onMouseOver = _props.onMouseOver,
          onMouseLeave = _props.onMouseLeave,
          onTouchStart = _props.onTouchStart,
          onTouchEnd = _props.onTouchEnd,
          propValue = _props.value,
          props = _objectWithoutProperties(_props, ['style', 'className', 'labelStyle', 'labelClassName', 'label', 'primary', 'secondary', 'flat', 'id', 'name', 'iconBefore', 'disabled', 'accept', 'multiple', 'swapTheming', 'allowDuplicates', 'iconChildren', 'iconClassName', 'icon', 'onChange', 'onKeyUp', 'onKeyDown', 'onMouseUp', 'onMouseDown', 'onMouseOver', 'onMouseLeave', 'onTouchStart', 'onTouchEnd', 'value']);

      var icon = this.props.icon;

      if (iconClassName || iconChildren) {
        icon = _react2.default.createElement(
          _FontIcon2.default,
          { iconClassName: iconClassName },
          iconChildren
        );
      }

      var labelChildren = label;
      if (icon) {
        icon = _react2.default.cloneElement(icon, { inherit: true });
        labelChildren = _react2.default.createElement(
          _IconSeparator2.default,
          { label: label, iconBefore: iconBefore },
          icon
        );
      }

      var value = void 0;
      if (allowDuplicates) {
        value = '';
      }

      return _react2.default.createElement(
        'div',
        _extends({}, props, {
          style: style,
          className: (0, _classnames2.default)('md-inline-block md-file-input-container', className)
        }),
        _react2.default.createElement(
          _AccessibleFakeInkedButton2.default,
          {
            component: 'label',
            htmlFor: id,
            disabled: disabled,
            onTouchStart: this._handleTouchStart,
            onTouchEnd: this._handleTouchEnd,
            onMouseDown: this._handleMouseDown,
            onMouseUp: this._handleMouseUp,
            onKeyDown: this._handleKeyDown,
            onKeyUp: this._handleKeyUp,
            onMouseOver: this._handleMouseOver,
            onMouseLeave: this._handleMouseLeave,
            style: labelStyle,
            className: (0, _getBtnStyles2.default)({
              flat: flat,
              raised: !flat,
              disabled: disabled,
              primary: primary,
              secondary: secondary,
              hover: hover,
              swapTheming: swapTheming,
              pressed: pressed
            }, labelClassName)
          },
          labelChildren
        ),
        _react2.default.createElement('input', {
          id: id,
          name: name,
          accept: accept,
          type: 'file',
          multiple: multiple,
          disabled: disabled,
          'aria-hidden': 'true',
          className: 'md-file-input',
          onChange: this._handleChange,
          value: value,
          tabIndex: -1
        })
      );
    }
  }]);

  return FileInput;
}(_react.PureComponent);

FileInput.propTypes = {
  /**
   * The id for the text field. This is required for a11y and to get the `input type="file"` to
   * open.
   */
  id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),

  /**
   * An optional name to provide to the input.
   */
  name: _propTypes2.default.string,

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
   * Boolean if the theming should be swapped from text to background or vice-versa.
   *
   * @see {@link Buttons/Button#swapTheming}
   */
  swapTheming: _propTypes2.default.bool,

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
   *
   * > NOTE: IE does not enforce this.
   */
  accept: _propTypes2.default.string,

  /**
   * Boolean if the same file is allowed to be uploaded multiple times. This will basically make the
   * `value` of the file input always blank.
   */
  allowDuplicates: _propTypes2.default.bool,

  /**
   * Boolean if multiple files will be accepted.
   */
  multiple: _propTypes2.default.bool,

  /**
   * A label to display on the `FileInput`. This will be used with the `AccessibleFakeInkedButton` component to
   * create a `<label>` for the `<input type="file">`.
   */
  label: _propTypes2.default.node,

  /**
   * Boolean if the icons should appear before the label.
   */
  iconBefore: _propTypes2.default.bool,

  /**
   * An optional icon to display with the file download. This can be a `FontIcon` or an `SVGIcon`.
   */
  icon: _propTypes2.default.element,

  /**
   * A function to call when the value of the input changes. This will
   * be triggered when the user selects a new file or cancels the new file selection.
   *
   * This function will be given the new [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList)
   * as an array and the change event. If this is not a multiple file input, only the
   * newly selected File will be given instead of a list of one file. Since this is an
   * `input` tag, the user will not be able to select the same file multiple times unless
   * you manually clear the input's value.
   *
   * > NOTE: If the user hits cancel, null will be given for a single file input.
   *
   * ```js
   * onChange(files, e);
   * ```
   */
  onChange: _propTypes2.default.func,

  /**
   * Boolean if the `FileInput` is currently disabled.
   */
  disabled: _propTypes2.default.bool,

  /**
   * An optional function to call when they keyup event is triggered on the file input's label.
   */
  onKeyUp: _propTypes2.default.func,

  /**
   * An optional function to call when they keydown event is triggered on the file input's label.
   */
  onKeyDown: _propTypes2.default.func,

  /**
   * An optional function to call when they mouseup event is triggered on the file input's label.
   */
  onMouseUp: _propTypes2.default.func,

  /**
   * An optional function to call when they mousedown event is triggered on the file input's label.
   */
  onMouseDown: _propTypes2.default.func,

  /**
   * An optional function to call when they mouseover event is triggered on the file input's label.
   */
  onMouseOver: _propTypes2.default.func,

  /**
   * An optional function to call when they mouseleave event is triggered on the file input's label.
   */
  onMouseLeave: _propTypes2.default.func,

  /**
   * An optional function to call when they touchend event is triggered on the file input's label.
   */
  onTouchEnd: _propTypes2.default.func,

  /**
   * An optional function to call when they touchstart event is triggered on the file input's label.
   */
  onTouchStart: _propTypes2.default.func,

  iconChildren: (0, _deprecated2.default)(_propTypes2.default.node, 'Use `icon` instead'),
  iconClassName: (0, _deprecated2.default)(_propTypes2.default.string, 'Use `icon` instead'),
  value: (0, _deprecated2.default)(_propTypes2.default.string, 'There should\'t be a reason to set the value manually. Check out {@link #allowDuplicates} instead')
};
FileInput.defaultProps = {
  label: 'Select a file',
  icon: _react2.default.createElement(
    _FontIcon2.default,
    null,
    'file_upload'
  ),
  allowDuplicates: false
};
exports.default = FileInput;
//# sourceMappingURL=FileInput.js.map