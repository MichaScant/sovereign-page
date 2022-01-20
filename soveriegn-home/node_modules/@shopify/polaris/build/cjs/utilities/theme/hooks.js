'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var errors = require('../errors.js');
var context = require('./context.js');

function useTheme() {
  const theme = React.useContext(context.ThemeContext);

  if (!theme) {
    throw new errors.MissingAppProviderError('No Theme was provided.');
  }

  return theme;
}

exports.useTheme = useTheme;
