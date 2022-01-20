'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../utilities/css.js');
var FooterHelp$1 = require('./FooterHelp.scss.js');
var Icon = require('../Icon/Icon.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function FooterHelp({
  children
}) {
  const className = css.classNames(FooterHelp$1['default'].FooterHelp);
  const iconProps = {
    source: polarisIcons.InfoMinor,
    color: 'highlight'
  };
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: className
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: FooterHelp$1['default'].Content
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: FooterHelp$1['default'].Icon
  }, /*#__PURE__*/React__default['default'].createElement(Icon.Icon, iconProps)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: FooterHelp$1['default'].Text
  }, children)));
}

exports.FooterHelp = FooterHelp;
