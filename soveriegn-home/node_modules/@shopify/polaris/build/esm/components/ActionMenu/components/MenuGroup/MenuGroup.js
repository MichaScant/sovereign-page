import React, { useCallback } from 'react';
import styles from './MenuGroup.scss.js';
import { SecondaryAction } from '../SecondaryAction/SecondaryAction.js';
import { Popover } from '../../../Popover/Popover.js';
import { ActionList } from '../../../ActionList/ActionList.js';

function MenuGroup({
  accessibilityLabel,
  active,
  actions,
  details,
  title,
  icon,
  onClose,
  onOpen,
  getOffsetWidth
}) {
  const handleClose = useCallback(() => {
    onClose(title);
  }, [onClose, title]);
  const handleOpen = useCallback(() => {
    onOpen(title);
  }, [onOpen, title]);
  const handleOffsetWidth = useCallback(width => {
    if (!getOffsetWidth) return;
    getOffsetWidth(width);
  }, [getOffsetWidth]);
  const popoverActivator = /*#__PURE__*/React.createElement(SecondaryAction, {
    disclosure: true,
    icon: icon,
    accessibilityLabel: accessibilityLabel,
    onClick: handleOpen,
    getOffsetWidth: handleOffsetWidth
  }, title);
  return /*#__PURE__*/React.createElement(Popover, {
    active: Boolean(active),
    activator: popoverActivator,
    preferredAlignment: "left",
    onClose: handleClose,
    hideOnPrint: true
  }, /*#__PURE__*/React.createElement(ActionList, {
    items: actions,
    onActionAnyItem: handleClose
  }), details && /*#__PURE__*/React.createElement("div", {
    className: styles.Details
  }, details));
}

export { MenuGroup };
