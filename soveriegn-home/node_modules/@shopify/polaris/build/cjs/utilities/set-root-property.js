'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function setRootProperty(name, value, node) {
  if (document == null) {
    return;
  }

  const styleNode = node && node instanceof HTMLElement ? node : document.documentElement;
  styleNode && styleNode.style.setProperty(name, value);
}

exports.setRootProperty = setRootProperty;
