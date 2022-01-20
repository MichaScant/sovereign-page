'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var distModern = require('@shopify/polaris-tokens/dist-modern');
var base = require('@shopify/polaris-tokens/dist-modern/configs/base');

function buildCustomPropertiesNoMemo(themeConfig, tokens) {
  const {
    colors = {},
    colorScheme,
    config,
    frameOffset = '0px'
  } = themeConfig;
  const mergedConfig = distModern.mergeConfigs(base.config, config || {});
  return customPropertyTransformer({ ...distModern.colorFactory(colors, colorScheme, mergedConfig),
    ...tokens,
    frameOffset
  });
}
function buildThemeContext(themeConfig, cssCustomProperties) {
  const {
    logo,
    colors = {},
    colorScheme
  } = themeConfig;
  return {
    logo,
    cssCustomProperties: toString(cssCustomProperties),
    colors,
    colorScheme
  };
}
function toString(obj) {
  if (obj) {
    return Object.entries(obj).map(pair => pair.join(':')).join(';');
  } else {
    return '';
  }
}

function customPropertyTransformer(properties) {
  return Object.entries(properties).reduce((transformed, [key, value]) => ({ ...transformed,
    [toCssCustomPropertySyntax(key)]: value
  }), {});
}

function toCssCustomPropertySyntax(camelCase) {
  return `--p-${camelCase.replace(/([A-Z0-9])/g, '-$1').toLowerCase()}`;
} // eslint-disable-next-line @typescript-eslint/ban-types

function memoize(fnToMemoize) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify([fnToMemoize.name, args]);

    if (cache.get(key) === undefined) {
      cache.set(key, fnToMemoize(...args));
    }

    return cache.get(key);
  };
}

const buildCustomProperties = memoize(buildCustomPropertiesNoMemo);

exports.buildCustomProperties = buildCustomProperties;
exports.buildCustomPropertiesNoMemo = buildCustomPropertiesNoMemo;
exports.buildThemeContext = buildThemeContext;
exports.toCssCustomPropertySyntax = toCssCustomPropertySyntax;
exports.toString = toString;
