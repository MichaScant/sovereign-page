import React, { useMemo } from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './SkeletonPage.scss.js';
import { SkeletonDisplayText } from '../SkeletonDisplayText/SkeletonDisplayText.js';
import { SkeletonBodyText } from '../SkeletonBodyText/SkeletonBodyText.js';
import { useI18n } from '../../utilities/i18n/hooks.js';

function SkeletonPage({
  children,
  fullWidth,
  narrowWidth,
  primaryAction,
  secondaryActions,
  title = '',
  breadcrumbs
}) {
  const i18n = useI18n();

  if (process.env.NODE_ENV === 'development' && secondaryActions != null) {
    // eslint-disable-next-line no-console
    console.warn('The secondaryActions prop from SkeletonPage has been deprecated');
  }

  const className = classNames(styles.Page, fullWidth && styles.fullWidth, narrowWidth && styles.narrowWidth);
  const titleContent = title ? /*#__PURE__*/React.createElement("h1", {
    className: styles.Title
  }, title) : /*#__PURE__*/React.createElement("div", {
    className: styles.SkeletonTitle
  });
  const titleMarkup = /*#__PURE__*/React.createElement("div", {
    className: styles.TitleWrapper
  }, titleContent);
  const primaryActionMarkup = primaryAction ? /*#__PURE__*/React.createElement("div", {
    className: styles.PrimaryAction
  }, /*#__PURE__*/React.createElement(SkeletonDisplayText, {
    size: "large"
  })) : null;
  const secondaryActionsMarkup = useMemo(() => secondaryActions ? renderSecondaryActions(secondaryActions) : null, [secondaryActions]);
  const breadcrumbMarkup = breadcrumbs ? /*#__PURE__*/React.createElement("div", {
    className: styles.BreadcrumbAction,
    style: {
      width: 60
    }
  }, /*#__PURE__*/React.createElement(SkeletonBodyText, {
    lines: 1
  })) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    role: "status",
    "aria-label": i18n.translate('Polaris.SkeletonPage.loadingLabel')
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Header
  }, breadcrumbMarkup, /*#__PURE__*/React.createElement("div", {
    className: styles.TitleAndPrimaryAction
  }, titleMarkup, primaryActionMarkup), secondaryActionsMarkup), /*#__PURE__*/React.createElement("div", {
    className: styles.Content
  }, children));
}

function renderSecondaryActions(actionCount) {
  const actions = [];

  for (let i = 0; i < actionCount; i++) {
    const width = Math.round(Math.random() * 40 + 60);
    actions.push( /*#__PURE__*/React.createElement("div", {
      className: styles.Action,
      style: {
        width
      },
      key: i
    }, /*#__PURE__*/React.createElement(SkeletonBodyText, {
      lines: 1
    })));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.Actions
  }, actions);
}

export { SkeletonPage };
