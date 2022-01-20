'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var css = require('../../utilities/css.js');
var withinFilterContext = require('../../utilities/within-filter-context.js');
var Badge$1 = require('./Badge.scss.js');
var hooks = require('../../utilities/i18n/hooks.js');
var VisuallyHidden = require('../VisuallyHidden/VisuallyHidden.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const PROGRESS_LABELS = {
  incomplete: 'incomplete',
  partiallyComplete: 'partiallyComplete',
  complete: 'complete'
};
const STATUS_LABELS = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  critical: 'critical',
  attention: 'attention',
  new: 'new'
};
const DEFAULT_SIZE = 'medium';
function Badge({
  children,
  status,
  progress,
  size = DEFAULT_SIZE,
  statusAndProgressLabelOverride
}) {
  const i18n = hooks.useI18n();
  const withinFilter = React.useContext(withinFilterContext.WithinFilterContext);
  const className = css.classNames(Badge$1['default'].Badge, status && Badge$1['default'][css.variationName('status', status)], progress && Badge$1['default'][css.variationName('progress', progress)], size && size !== DEFAULT_SIZE && Badge$1['default'][css.variationName('size', size)], withinFilter && Badge$1['default'].withinFilter);
  let progressLabel = '';

  switch (progress) {
    case PROGRESS_LABELS.incomplete:
      progressLabel = i18n.translate('Polaris.Badge.PROGRESS_LABELS.incomplete');
      break;

    case PROGRESS_LABELS.partiallyComplete:
      progressLabel = i18n.translate('Polaris.Badge.PROGRESS_LABELS.partiallyComplete');
      break;

    case PROGRESS_LABELS.complete:
      progressLabel = i18n.translate('Polaris.Badge.PROGRESS_LABELS.complete');
      break;
  }

  let statusLabel = '';

  switch (status) {
    case STATUS_LABELS.info:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.info');
      break;

    case STATUS_LABELS.success:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.success');
      break;

    case STATUS_LABELS.warning:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.warning');
      break;

    case STATUS_LABELS.critical:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.critical');
      break;

    case STATUS_LABELS.attention:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.attention');
      break;

    case STATUS_LABELS.new:
      statusLabel = i18n.translate('Polaris.Badge.STATUS_LABELS.new');
      break;
  }

  const accessibilityLabel = statusAndProgressLabelOverride ? statusAndProgressLabelOverride : i18n.translate('Polaris.Badge.progressAndStatus', {
    progressLabel,
    statusLabel
  });
  const hasAccessibilityLabel = progressLabel || statusLabel || statusAndProgressLabelOverride;
  let accessibilityMarkup = hasAccessibilityLabel && /*#__PURE__*/React__default['default'].createElement(VisuallyHidden.VisuallyHidden, null, accessibilityLabel);

  if (progressLabel) {
    accessibilityMarkup = /*#__PURE__*/React__default['default'].createElement("span", {
      className: Badge$1['default'].Pip
    }, accessibilityMarkup);
  }

  return /*#__PURE__*/React__default['default'].createElement("span", {
    className: className
  }, accessibilityMarkup, children);
}

exports.Badge = Badge;
