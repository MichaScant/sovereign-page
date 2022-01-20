import React from 'react';
import styles from './PageActions.scss.js';
import { buttonsFrom } from '../Button/utils.js';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.js';
import { Stack } from '../Stack/Stack.js';

function PageActions({
  primaryAction,
  secondaryActions
}) {
  const primaryActionMarkup = primaryAction ? buttonsFrom(primaryAction, {
    primary: true
  }) : null;
  const secondaryActionsMarkup = secondaryActions ? /*#__PURE__*/React.createElement(ButtonGroup, null, buttonsFrom(secondaryActions)) : null;
  const distribution = secondaryActionsMarkup ? 'equalSpacing' : 'trailing';
  return /*#__PURE__*/React.createElement("div", {
    className: styles.PageActions
  }, /*#__PURE__*/React.createElement(Stack, {
    distribution: distribution,
    spacing: "tight"
  }, secondaryActionsMarkup, primaryActionMarkup));
}

export { PageActions };
