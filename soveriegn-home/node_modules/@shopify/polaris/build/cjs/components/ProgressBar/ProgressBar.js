'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var css = require('../../utilities/css.js');
var ProgressBar$1 = require('./ProgressBar.scss.js');
var hooks = require('../../utilities/i18n/hooks.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ProgressBar({
  progress = 0,
  size = 'medium',
  color = 'highlight',
  animated = true
}) {
  const i18n = hooks.useI18n();
  const className = css.classNames(ProgressBar$1['default'].ProgressBar, size && ProgressBar$1['default'][css.variationName('size', size)], color && ProgressBar$1['default'][css.variationName('color', color)]);
  const warningMessage = i18n.translate(progress < 0 ? 'Polaris.ProgressBar.negativeWarningMessage' : 'Polaris.ProgressBar.exceedWarningMessage', {
    progress
  });
  const parsedProgress = parseProgress(progress, warningMessage);
  /* eslint-disable @shopify/jsx-no-hardcoded-content */

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: className
  }, /*#__PURE__*/React__default['default'].createElement("progress", {
    className: ProgressBar$1['default'].Progress,
    value: parsedProgress,
    max: "100"
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: css.classNames(ProgressBar$1['default'].Indicator, animated && ProgressBar$1['default'].Animated),
    style: {
      width: `${parsedProgress}%`
    }
  }, /*#__PURE__*/React__default['default'].createElement("span", {
    className: ProgressBar$1['default'].Label
  }, parsedProgress, "%")))
  /* eslint-enable @shopify/jsx-no-hardcoded-content */
  ;
}

function parseProgress(progress, warningMessage) {
  let progressWidth;

  if (progress < 0) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(warningMessage);
    }

    progressWidth = 0;
  } else if (progress > 100) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(warningMessage);
    }

    progressWidth = 100;
  } else {
    progressWidth = progress;
  }

  return progressWidth;
}

exports.ProgressBar = ProgressBar;
