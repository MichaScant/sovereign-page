import React, { useContext, useMemo, useEffect } from 'react';
import DefaultThemeColors from '@shopify/polaris-tokens/dist-modern/theme/base.json';
import { ThemeContext } from '../../utilities/theme/context.js';
import { buildCustomProperties, buildThemeContext, toString } from '../../utilities/theme/utils.js';
import { Tokens } from '../../utilities/theme/tokens.js';

function ThemeProvider({
  theme: themeConfig = {},
  alwaysRenderCustomProperties = false,
  children
}) {
  const parentContext = useContext(ThemeContext);
  const isParentThemeProvider = parentContext === undefined;
  const parentColorScheme = parentContext && parentContext.colorScheme && parentContext.colorScheme;
  const parentColors = parentContext && parentContext.colors && parentContext.colors;
  const [customProperties, theme] = useMemo(() => {
    const {
      colors,
      colorScheme,
      ...rest
    } = themeConfig;
    const processedThemeConfig = { ...rest,
      ...{
        colorScheme: getColorScheme(colorScheme, parentColorScheme)
      },
      colors: { ...(isParentThemeProvider && DefaultThemeColors),
        ...(parentColors != null && parentColors),
        ...colors
      }
    };
    const customProperties = buildCustomProperties(processedThemeConfig, Tokens);
    const theme = buildThemeContext(processedThemeConfig, customProperties);
    return [customProperties, theme];
  }, [isParentThemeProvider, parentColorScheme, parentColors, themeConfig]); // We want these values to be empty string instead of `undefined` when not set.
  // Otherwise, setting a style property to `undefined` does not remove it from the DOM.

  const backgroundColor = customProperties['--p-background'] || '';
  const color = customProperties['--p-text'] || '';
  useEffect(() => {
    if (isParentThemeProvider) {
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.color = color;
    }
  }, [backgroundColor, color, isParentThemeProvider]);
  let style;

  if (isParentThemeProvider) {
    style = customProperties;
  } else if (alwaysRenderCustomProperties || !isParentThemeProvider && parentContext.cssCustomProperties !== toString(customProperties)) {
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

  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: theme
  }, /*#__PURE__*/React.createElement("div", {
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

export { ThemeProvider };
