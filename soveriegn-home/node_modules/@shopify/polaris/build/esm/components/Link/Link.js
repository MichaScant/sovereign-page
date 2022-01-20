import React from 'react';
import { ExternalSmallMinor } from '@shopify/polaris-icons';
import { BannerContext } from '../../utilities/banner-context.js';
import { classNames } from '../../utilities/css.js';
import styles from './Link.scss.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { Icon } from '../Icon/Icon.js';
import { UnstyledLink } from '../UnstyledLink/UnstyledLink.js';

function Link({
  url,
  children,
  onClick,
  external,
  id,
  monochrome,
  removeUnderline,
  accessibilityLabel
}) {
  const i18n = useI18n();
  let childrenMarkup = children;

  if (external && typeof children === 'string') {
    const iconLabel = i18n.translate('Polaris.Common.newWindowAccessibilityHint');
    childrenMarkup = /*#__PURE__*/React.createElement(React.Fragment, null, children, /*#__PURE__*/React.createElement("span", {
      className: styles.IconLockup
    }, /*#__PURE__*/React.createElement("span", {
      className: styles.IconLayout
    }, /*#__PURE__*/React.createElement(Icon, {
      accessibilityLabel: iconLabel,
      source: ExternalSmallMinor
    }))));
  }

  return /*#__PURE__*/React.createElement(BannerContext.Consumer, null, BannerContext => {
    const shouldBeMonochrome = monochrome || BannerContext;
    const className = classNames(styles.Link, shouldBeMonochrome && styles.monochrome, removeUnderline && styles.removeUnderline);
    return url ? /*#__PURE__*/React.createElement(UnstyledLink, {
      onClick: onClick,
      className: className,
      url: url,
      external: external,
      id: id,
      "aria-label": accessibilityLabel
    }, childrenMarkup) : /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onClick,
      className: className,
      id: id,
      "aria-label": accessibilityLabel
    }, childrenMarkup);
  });
}

export { Link };
