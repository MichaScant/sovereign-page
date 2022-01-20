'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var DefaultThemeColors = require('@shopify/polaris-tokens/dist-modern/theme/base.json');
var context = require('../../utilities/theme/context.js');
var utils = require('../../utilities/theme/utils.js');
var tokens = require('../../utilities/theme/tokens.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var DefaultThemeColors__default = /*#__PURE__*/_interopDefaultLegacy(DefaultThemeColors);

function ThemeProvider({
  theme: themeConfig = {},
  alwaysRenderCustomProperties = false,
  children
}) {
  const parentContext = React.useContext(context.ThemeContext);
  const isParentThemeProvider = parentContext === undefined;
  const parentColorScheme = parentContext && parentContext.colorScheme && parentContext.colorScheme;
  const parentColors = parentContext && parentContext.colors && parentContext.colors;
  const [customProperties, theme] = React.useMemo(() => {
    const {
      colors,
      colorScheme,
      ...rest
    } = themeConfig;
    const processedThemeConfig = { ...rest,
      ...{
        colorScheme: getColorScheme(colorScheme, parentColorScheme)
      },
      colors: { ...(isParentThemeProvider && DefaultThemeColors__default['default']),
        ...(parentColors != null && parentColors),
        ...colors
      }
    };
    const customProperties = utils.buildCustomProperties(processedThemeConfig, tokens.Tokens);
    const theme = utils.buildThemeContext(processedThemeConfig, customProperties);
    return [customProperties, theme];
  }, [isParentThemeProvider, parentColorScheme, parentColors, themeConfig]); // We want these values to be empty string instead of `undefined` when not set.
  // Otherwise, setting a style property to `undefined` does not remove it from the DOM.

  const backgroundColor = customProperties['--p-background'] || '';
  const color = customProperties['--p-text'] || '';
  React.useEffect(() => {
    if (isParentThemeProvider) {
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.color = color;
    }
  }, [backgroundColor, color, isParentThemeProvider]);
  let style;

  if (isParentThemeProvider) {
    style = customProperties;
  } else if (alwaysRenderCustomProperties || !isParentThemeProvider && parentContext.cssCustomProperties !== utils.toString(customProperties)) {
    style = { ...customProperties,
      ...{
        color
      }
    };
  } else {
    style = {
      color
    };
  }

  return /*#__PURE__*/React__default['default'].createElement(context.ThemeContext.Provider, {
    value: theme
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    style: style
  }, children));
}

function getColorScheme(colorScheme, parentColorScheme) {
  if (colorScheme == null) {
    return parentColorScheme || 'light';
  } else if (colorScheme === 'inverse') {
    return parentColorScheme === 'dark' || parentColorScheme === undefined ? 'light' : 'dark';
  } else {
    return colorScheme;
  }
}

exports.ThemeProvider = ThemeProvider;
