import React from 'react';
import { MobileCancelMajor } from '@shopify/polaris-icons';
import styles from './CloseButton.scss.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Icon } from '../../../Icon/Icon.js';

function CloseButton({
  onClick
}) {
  const i18n = useI18n();
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: styles.CloseButton,
    "aria-label": i18n.translate('Polaris.Common.close')
  }, /*#__PURE__*/React.createElement(Icon, {
    source: MobileCancelMajor,
    color: "base"
  }));
}

export { CloseButton };
