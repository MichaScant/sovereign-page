import React, { useRef, useEffect } from 'react';
import styles from './SecondaryAction.scss.js';
import { Button } from '../../../Button/Button.js';

function SecondaryAction({
  children,
  onAction,
  getOffsetWidth,
  ...rest
}) {
  const secondaryActionsRef = useRef(null);
  useEffect(() => {
    var _secondaryActionsRef$;

    if (!getOffsetWidth || !secondaryActionsRef.current) return;
    getOffsetWidth((_secondaryActionsRef$ = secondaryActionsRef.current) === null || _secondaryActionsRef$ === void 0 ? void 0 : _secondaryActionsRef$.offsetWidth);
  }, [getOffsetWidth]);
  return /*#__PURE__*/React.createElement("span", {
    className: styles.SecondaryAction,
    ref: secondaryActionsRef
  }, /*#__PURE__*/React.createElement(Button, Object.assign({
    onClick: onAction
  }, rest), children));
}

export { SecondaryAction };
