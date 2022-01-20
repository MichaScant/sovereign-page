import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import { wrapWithComponent } from '../../../../utilities/components.js';
import styles from '../../Popover.scss.js';
import { Section } from '../Section/Section.js';
import { Scrollable } from '../../../Scrollable/Scrollable.js';

function Pane({
  fixed,
  sectioned,
  children,
  onScrolledToBottom
}) {
  const className = classNames(styles.Pane, fixed && styles['Pane-fixed']);
  const content = sectioned ? wrapWithComponent(children, Section, {}) : children;
  return fixed ? /*#__PURE__*/React.createElement("div", {
    className: className
  }, content) : /*#__PURE__*/React.createElement(Scrollable, {
    shadow: true,
    className: className,
    onScrolledToBottom: onScrolledToBottom
  }, content);
}

export { Pane };
