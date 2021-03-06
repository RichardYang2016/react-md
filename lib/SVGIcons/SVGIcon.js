'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _deprecated = require('react-prop-types/lib/deprecated');

var _deprecated2 = _interopRequireDefault(_deprecated);

var _themeColors = require('../utils/themeColors');

var _themeColors2 = _interopRequireDefault(_themeColors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `SVGIcon` component is used for rendering inline SVG icons or sprite-mapped SVGs
 * as an icon.
 */
var SVGIcon = function (_PureComponent) {
  _inherits(SVGIcon, _PureComponent);

  function SVGIcon(props) {
    _classCallCheck(this, SVGIcon);

    var _this = _possibleConstructorReturn(this, (SVGIcon.__proto__ || Object.getPrototypeOf(SVGIcon)).call(this));

    _this._getIds = function (_ref) {
      var use = _ref.use,
          labels = _ref['aria-labelledby'],
          title = _ref.title,
          desc = _ref.desc;

      var titleId = null;
      var descId = null;
      var labelledBy = null;
      if (title || desc) {
        if (use) {
          var baseId = use.replace(/.*#/, '');
          titleId = baseId + '-title';
          descId = baseId + '-desc';

          if (title) {
            labelledBy = baseId + '-title';
          }

          if (desc) {
            labelledBy = '' + (labelledBy ? labelledBy + ' ' : '') + descId;
          }
        } else if (labels) {
          var _labels$split = labels.split(' ');

          var _labels$split2 = _slicedToArray(_labels$split, 2);

          titleId = _labels$split2[0];
          descId = _labels$split2[1];
        }
      }

      return { titleId: titleId, descId: descId, labelledBy: labelledBy };
    };

    _this._mergeStyles = function (_ref2) {
      var style = _ref2.style,
          size = _ref2.size;

      if (style && size) {
        return _extends({ height: size, width: size }, style);
      } else if (style) {
        return style;
      } else if (size) {
        return { height: size, width: size };
      }

      return undefined;
    };

    _this.state = _extends({
      styles: _this._mergeStyles(props)
    }, _this._getIds(props));
    return _this;
  }

  _createClass(SVGIcon, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          style = _props.style,
          size = _props.size,
          use = _props.use,
          title = _props.title,
          desc = _props.desc,
          labels = _props['aria-labelledby'];

      var nextState = void 0;
      if (style !== nextProps.style || size !== nextProps.size) {
        nextState = { styles: this._mergeStyles(nextProps) };
      }

      if (title !== nextProps.title || desc !== nextProps.desc || (nextProps.title || nextProps.desc) && (use !== nextProps.use || labels !== nextProps['aria-labelledby'])) {
        nextState = _extends({}, nextState, this._getIds(nextProps));
      }

      if (nextState) {
        this.setState(nextState);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          styles = _state.styles,
          titleId = _state.titleId,
          descId = _state.descId,
          labelledBy = _state.labelledBy;

      var _props2 = this.props,
          className = _props2.className,
          disabled = _props2.disabled,
          use = _props2.use,
          primary = _props2.primary,
          secondary = _props2.secondary,
          error = _props2.error,
          inherit = _props2.inherit,
          titleAttr = _props2.titleAttr,
          ariaLabelledBy = _props2['aria-labelledby'],
          size = _props2.size,
          propTitle = _props2.title,
          propDesc = _props2.desc,
          propStyle = _props2.style,
          propChildren = _props2.children,
          props = _objectWithoutProperties(_props2, ['className', 'disabled', 'use', 'primary', 'secondary', 'error', 'inherit', 'titleAttr', 'aria-labelledby', 'size', 'title', 'desc', 'style', 'children']);

      var _props3 = this.props,
          children = _props3.children,
          title = _props3.title,
          desc = _props3.desc;

      if (!children && use) {
        children = _react2.default.createElement('use', { xlinkHref: use });
      }

      if (title) {
        title = _react2.default.createElement(
          'title',
          { id: titleId },
          title
        );
      }

      if (desc) {
        desc = _react2.default.createElement(
          'desc',
          { id: descId },
          desc
        );
      }

      return _react2.default.createElement(
        'svg',
        _extends({}, props, {
          title: titleAttr,
          'aria-labelledby': ariaLabelledBy || labelledBy,
          style: styles,
          className: (0, _classnames2.default)('md-icon', (0, _themeColors2.default)({
            disabled: disabled,
            error: error,
            inherit: inherit,
            primary: primary,
            secondary: secondary
          }, className))
        }),
        title,
        desc,
        children
      );
    }
  }]);

  return SVGIcon;
}(_react.PureComponent);

SVGIcon.propTypes = {
  /**
   * An optional style to apply.
   */
  style: _propTypes2.default.object,

  /**
   * An optional className to apply.
   */
  className: _propTypes2.default.string,

  /**
   * Boolean if the primary theme color should be applied.
   */
  primary: _propTypes2.default.bool,

  /**
   * Boolean if the secondary theme color should be applied.
   */
  secondary: _propTypes2.default.bool,

  /**
   * Boolean if the icon is considered disabled and should inherit the
   * disabled color.
   */
  disabled: _propTypes2.default.bool,

  /**
   * Boolean if the icon is considered errored and should inherit the error color.
   */
  error: _propTypes2.default.bool,

  /**
   * Boolean if the color of the icon should be inherited by parent elements.
   */
  inherit: _propTypes2.default.bool,

  /**
   * The role to apply to the SVG. When using icons, it is generally recommended to leave it as the default
   * `img` so that it is insured as a graphic.
   */
  role: _propTypes2.default.oneOf(['img', 'presentation']),

  /**
   * This prop is the title attribute to provide to the `<svg>` element itself. This should be used when you
   * are using a spritesheet that has defined `<title>` with each SVG symbol.
   */
  titleAttr: _propTypes2.default.string,

  /**
   * An optional list of ids to use to label the SVG icon with. This is helpful to add when you use the `title`
   * and `desc` props as this is used to create ids for those two props. This is super beneficial to screen readers.
   *
   * When this is defined, it is a space-delimited string of ids to provide to the title and desc (in order). If
   * this is omitted and the `use` prop is defined, it will take everything after the `#` sign and append `-title` and
   * `-desc` as a fallback. Check out the examples for more information about this.
   *
   * @see {@link #title}
   * @see {@link #desc}
   */
  'aria-labelledby': _propTypes2.default.string,

  /**
   * An optional title to give to your SVG icon. This is generally recommended for accessibility when not using
   * the `use` prop, or your spritemap does not contain `<title>` and `<desc>.
   *
   * @see {@link #aria-labelledby}
   */
  title: _propTypes2.default.string,

  /**
   * An optional description to give to your SVG icon. This is generally recommended for accessibility when not using
   * the `use` prop, or your spritemap does not contain `<title>` and `<desc>.
   *
   * @see {@link #aria-labelledby}
   */
  desc: _propTypes2.default.string,

  /**
   * This should be a link to a part of an SVG spritemap. So normally one of the following:
   * - `'#some-custom-svg'`
   * - `'/images/spritemap.svg#some-custom-svg'`
   *
   * This prop **should not** be used with the `children` prop as only one will be rendered.
   *
   * > NOTE: IE **does not support** external SVGs. Please see the demo for more details.
   */
  use: _propTypes2.default.string,

  /**
   * Any `<svg>` children to render to create your icon. This can not be used with the `use` prop.
   */
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.arrayOf(_propTypes2.default.element), _propTypes2.default.node]),

  /**
   * Boolean if the SVG should gain the `focusable` attribute. This is disabled by default since IE11
   * and Edge actually default this to true and keyboard's will tab focus all SVGs.
   */
  focusable: _propTypes2.default.string,

  /**
   * An optional size to apply to the SVG. This can be used to set both the
   * `height` and `width` simultaneously. This will be provided as inline styles
   * since the `height` and `width` are normally controlled by CSS, and CSS has
   * higher precedence than the `height`/`width` attributes.
   */
  size: _propTypes2.default.number,

  /**
   * The `height` prop should not be used since the `height` and `width` are controlled by CSS and the CSS
   * has a higher precedence than inline attributes. If you want to set the `height`, it should be done via
   * CSS or the `size` prop.
   *
   * @see {@link #size}
   */
  height: (0, _deprecated2.default)(_propTypes2.default.number, 'Use the `size` prop instead'),

  /**
   * The `width` prop should not be used since the `height` and `width` are controlled by CSS and the CSS
   * has a higher precedence than inline attributes. If you want to set the `height`, it should be done via
   * CSS or the `size` prop.
   *
   * @see {@link #size}
   */
  width: (0, _deprecated2.default)(_propTypes2.default.number, 'Use the `size` prop instead'),

  /**
   * The viewBox attribute allows you to specify that a given set of graphics stretch to
   * fit a particular container element.
   *
   * The value of the viewBox attribute is a list of four numbers min-x, min-y, width and
   * height, separated by white space and/or a comma, which specify a rectangle in user
   * space which should be mapped to the bounds of the viewport established by the given
   * element, taking into account attribute preserveAspectRatio.
   *
   * Negative values for width or height are not permitted and a value of zero disables
   * rendering of the element.An optional viewbox for the SVG.
   *
   * For example, if the SVG element is 250 (width) by 200 (height) and you provide
   * `viewBox="0 0 25 20"`, the coordinates inside the SVG will go from the top left corner
   * (0, 0) to the bottom right (25, 20) and each unit will be worth `10px`.
   */
  viewBox: _propTypes2.default.string,

  /**
   * An optional xmlns string to provide. The `use` prop will not work without this prop
   * defined.
   */
  xmlns: _propTypes2.default.string
};
SVGIcon.defaultProps = {
  role: 'img',
  focusable: 'false',
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24'
};
exports.default = SVGIcon;
//# sourceMappingURL=SVGIcon.js.map