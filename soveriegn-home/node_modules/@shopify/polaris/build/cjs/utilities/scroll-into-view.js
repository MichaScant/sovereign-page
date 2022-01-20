'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function scrollIntoView(element, container) {
  requestAnimationFrame(() => {
    if (element) {
      const offset = element.offsetTop - container.scrollTop;
      container.scrollBy({
        top: offset
      });
    }
  });
}

exports.scrollIntoView = scrollIntoView;
