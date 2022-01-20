'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Image({
  sourceSet,
  source,
  crossOrigin,
  ...rest
}) {
  const finalSourceSet = sourceSet ? sourceSet.map(({
    source: subSource,
    descriptor
  }) => `${subSource} ${descriptor}`).join(',') : null;
  return finalSourceSet ?
  /*#__PURE__*/
  // eslint-disable-next-line jsx-a11y/alt-text
  React__default['default'].createElement("img", Object.assign({
    src: source,
    srcSet: finalSourceSet,
    crossOrigin: crossOrigin
  }, rest)) :
  /*#__PURE__*/
  // eslint-disable-next-line jsx-a11y/alt-text
  React__default['default'].createElement("img", Object.assign({
    src: source
  }, rest, {
    crossOrigin: crossOrigin
  }));
}

exports.Image = Image;
