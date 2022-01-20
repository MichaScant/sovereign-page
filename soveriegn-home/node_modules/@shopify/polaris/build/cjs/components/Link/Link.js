'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var bannerContext = require('../../utilities/banner-context.js');
var css = require('../../utilities/css.js');
var Link$1 = require('./Link.scss.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Icon = require('../Icon/Icon.js');
var UnstyledLink = require('../UnstyledLink/UnstyledLink.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Link({
  url,
  children,
  onClick,
  external,
  id,
  monochrome,
  removeUnderline,
  accessibilityLabel
}) {
  const i18n = hooks.useI18n();
  let childrenMarkup = children;

  if (external && typeof children === 'string') {
    const iconLabel = i18n.translate('Polaris.Common.newWindowAccessibilityHint');
    childrenMarkup = /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, children, /*#__PURE__*/React__default['default'].createElement("span", {
      className: Link$1['default'].IconLockup
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: Link$1['default'].IconLayout
    }, /*#__PURE__*/React__default['default'].createElement(Icon.Icon, {
      accessibilityLabel: iconLabel,
      source: polarisIcons.ExternalSmallMinor
    }))));
  }

  return /*#__PURE__*/React__default['default'].createElement(bannerContext.BannerContext.Consumer, null, BannerContext => {
    const shouldBeMonochrome = monochrome || BannerContext;
    const className = css.classNames(Link$1['default'].Link, shouldBeMonochrome && Link$1['default'].monochrome, removeUnderline && Link$1['default'].removeUnderline);
    return url ? /*#__PURE__*/React__default['default'].createElement(UnstyledLink.UnstyledLink, {
      onClick: onClick,
      className: className,
      url: url,
      external: external,
      id: id,
      "aria-label": accessibilityLabel
    }, childrenMarkup) : /*#__PURE__*/React__default['default'].createElement("button", {
      type: "button",
      onClick: onClick,
      className: className,
      id: id,
      "aria-label": accessibilityLabel
    }, childrenMarkup);
  });
}

exports.Link = Link;
