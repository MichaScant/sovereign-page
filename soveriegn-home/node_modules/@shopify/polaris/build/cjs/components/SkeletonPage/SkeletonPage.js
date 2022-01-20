'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var css = require('../../utilities/css.js');
var SkeletonPage$1 = require('./SkeletonPage.scss.js');
var SkeletonDisplayText = require('../SkeletonDisplayText/SkeletonDisplayText.js');
var SkeletonBodyText = require('../SkeletonBodyText/SkeletonBodyText.js');
var hooks = require('../../utilities/i18n/hooks.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function SkeletonPage({
  children,
  fullWidth,
  narrowWidth,
  primaryAction,
  secondaryActions,
  title = '',
  breadcrumbs
}) {
  const i18n = hooks.useI18n();

  if (process.env.NODE_ENV === 'development' && secondaryActions != null) {
    // eslint-disable-next-line no-console
    console.warn('The secondaryActions prop from SkeletonPage has been deprecated');
  }

  const className = css.classNames(SkeletonPage$1['default'].Page, fullWidth && SkeletonPage$1['default'].fullWidth, narrowWidth && SkeletonPage$1['default'].narrowWidth);
  const titleContent = title ? /*#__PURE__*/React__default['default'].createElement("h1", {
    className: SkeletonPage$1['default'].Title
  }, title) : /*#__PURE__*/React__default['default'].createElement("div", {
    className: SkeletonPage$1['default'].SkeletonTitle
  });
  const titleMarkup = /*#__PURE__*/React__default['default'].createElement("div", {
    className: SkeletonPage$1['default'].TitleWrapper
  }, titleContent);
  const primaryActionMarkup = primaryAction ? /*#__PURE__*/React__default['default'].createElement("div", {
    className: SkeletonPage$1['default'].PrimaryAction
  }, /*#__PURE__*/React__default['default'].createElement(SkeletonDisplayText.SkeletonDisplayText, {
    size: "large"
  })) : null;
  const secondaryActionsMarkup = React.useMemo(() => secondaryActions ? renderSecondaryActions(secondaryActions) : null, [secondaryActions]);
  const breadcrumbMarkup = breadcrumbs ? /*#__PURE__*/React__default['default'].createElement("div", {
    className: SkeletonPage$1['default'].BreadcrumbAction,
    style: {
      width: 60
    }
  }, /*#__PURE__*/React__default['default'].createElement(SkeletonBodyText.SkeletonBodyText, {
    lines: 1
  })) : null;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: className,
    role: "status",
    "aria-label": i18n.translate('Polaris.SkeletonPage.loadingLabel')
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: SkeletonPage$1['default'].Header
  }, breadcrumbMarkup, /*#__PURE__*/React__default['default'].createElement("div", {
    className: SkeletonPage$1['default'].TitleAndPrimaryAction
  }, titleMarkup, primaryActionMarkup), secondaryActionsMarkup), /*#__PURE__*/React__default['default'].createElement("div", {
    className: SkeletonPage$1['default'].Content
  }, children));
}

function renderSecondaryActions(actionCount) {
  const actions = [];

  for (let i = 0; i < actionCount; i++) {
    const width = Math.round(Math.random() * 40 + 60);
    actions.push( /*#__PURE__*/React__default['default'].createElement("div", {
      className: SkeletonPage$1['default'].Action,
      style: {
        width
      },
      key: i
    }, /*#__PURE__*/React__default['default'].createElement(SkeletonBodyText.SkeletonBodyText, {
      lines: 1
    })));
  }

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: SkeletonPage$1['default'].Actions
  }, actions);
}

exports.SkeletonPage = SkeletonPage;
