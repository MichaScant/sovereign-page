'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const Breakpoints = {
  navigationBarCollapsed: '768px',
  stackedContent: '1043px'
};
const noWindowMatches = {
  media: '',
  addListener: noop,
  removeListener: noop,
  matches: false,
  onchange: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: _ => true
};

function noop() {}

function navigationBarCollapsed() {
  return typeof window === 'undefined' ? noWindowMatches : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
}
function stackedContent() {
  return typeof window === 'undefined' ? noWindowMatches : window.matchMedia(`(max-width: ${Breakpoints.stackedContent})`);
}

exports.navigationBarCollapsed = navigationBarCollapsed;
exports.stackedContent = stackedContent;
