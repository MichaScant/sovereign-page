import React from 'react';
import { InfoMinor } from '@shopify/polaris-icons';
import { classNames } from '../../utilities/css.js';
import styles from './FooterHelp.scss.js';
import { Icon } from '../Icon/Icon.js';

function FooterHelp({
  children
}) {
  const className = classNames(styles.FooterHelp);
  const iconProps = {
    source: InfoMinor,
    color: 'highlight'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Content
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Icon
  }, /*#__PURE__*/React.createElement(Icon, iconProps)), /*#__PURE__*/React.createElement("div", {
    className: styles.Text
  }, children)));
}

export { FooterHelp };
