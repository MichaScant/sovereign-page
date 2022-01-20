'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useIsomorphicLayoutEffect = require('../../utilities/use-isomorphic-layout-effect.js');

function KeypressListener({
  keyCode,
  handler,
  keyEvent = 'keyup'
}) {
  const tracked = React.useRef({
    handler,
    keyCode
  });
  useIsomorphicLayoutEffect.useIsomorphicLayoutEffect(() => {
    tracked.current = {
      handler,
      keyCode
    };
  }, [handler, keyCode]);
  const handleKeyEvent = React.useCallback(event => {
    const {
      handler,
      keyCode
    } = tracked.current;

    if (event.keyCode === keyCode) {
      handler(event);
    }
  }, []);
  React.useEffect(() => {
    document.addEventListener(keyEvent, handleKeyEvent);
    return () => {
      document.removeEventListener(keyEvent, handleKeyEvent);
    };
  }, [keyEvent, handleKeyEvent]);
  return null;
}

exports.KeypressListener = KeypressListener;
