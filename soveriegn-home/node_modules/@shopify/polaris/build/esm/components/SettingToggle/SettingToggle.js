import React from 'react';
import { buttonFrom } from '../Button/utils.js';
import { Card } from '../Card/Card.js';
import { SettingAction } from '../SettingAction/SettingAction.js';

function SettingToggle({
  enabled,
  action,
  children
}) {
  const actionMarkup = action ? buttonFrom(action, {
    primary: !enabled
  }) : null;
  return /*#__PURE__*/React.createElement(Card, {
    sectioned: true
  }, /*#__PURE__*/React.createElement(SettingAction, {
    action: actionMarkup
  }, children));
}

export { SettingToggle };
