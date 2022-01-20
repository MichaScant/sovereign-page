'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var shared = require('../../../shared.js');
var DataTable = require('../../DataTable.scss.js');
var hooks = require('../../../../utilities/i18n/hooks.js');
var Icon = require('../../../Icon/Icon.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Cell({
  content,
  contentType,
  firstColumn,
  truncate,
  header,
  total,
  totalInFooter,
  sorted,
  sortable,
  sortDirection,
  verticalAlign = 'top',
  defaultSortDirection = 'ascending',
  onSort,
  colSpan
}) {
  const i18n = hooks.useI18n();
  const numeric = contentType === 'numeric';
  const className = css.classNames(DataTable['default'].Cell, DataTable['default'][`Cell-${css.variationName('verticalAlign', verticalAlign)}`], firstColumn && DataTable['default']['Cell-firstColumn'], firstColumn && truncate && DataTable['default']['Cell-truncated'], header && DataTable['default']['Cell-header'], total && DataTable['default']['Cell-total'], totalInFooter && DataTable['default']['Cell-total-footer'], numeric && DataTable['default']['Cell-numeric'], sortable && DataTable['default']['Cell-sortable'], sorted && DataTable['default']['Cell-sorted']);
  const headerClassName = css.classNames(header && DataTable['default'].Heading, header && contentType === 'text' && DataTable['default']['Heading-left']);
  const iconClassName = css.classNames(sortable && DataTable['default'].Icon);
  const direction = sorted && sortDirection ? sortDirection : defaultSortDirection;
  const source = direction === 'descending' ? polarisIcons.CaretDownMinor : polarisIcons.CaretUpMinor;
  const oppositeDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
  const sortAccessibilityLabel = i18n.translate('Polaris.DataTable.sortAccessibilityLabel', {
    direction: sorted ? oppositeDirection : direction
  });
  const iconMarkup = /*#__PURE__*/React__default['default'].createElement("span", {
    className: iconClassName
  }, /*#__PURE__*/React__default['default'].createElement(Icon.Icon, {
    source: source,
    accessibilityLabel: sortAccessibilityLabel
  }));
  const sortableHeadingContent = /*#__PURE__*/React__default['default'].createElement("button", {
    className: headerClassName,
    onClick: onSort
  }, iconMarkup, content);
  const columnHeadingContent = sortable ? sortableHeadingContent : content;
  const colSpanProp = colSpan && colSpan > 1 ? {
    colSpan
  } : {};
  const headingMarkup = header ? /*#__PURE__*/React__default['default'].createElement("th", Object.assign({}, shared.headerCell.props, colSpanProp, {
    className: className,
    scope: "col",
    "aria-sort": sortDirection
  }), columnHeadingContent) : /*#__PURE__*/React__default['default'].createElement("th", Object.assign({
    className: className,
    scope: "row"
  }, colSpanProp), content);
  const cellMarkup = header || firstColumn ? headingMarkup : /*#__PURE__*/React__default['default'].createElement("td", Object.assign({
    className: className
  }, colSpanProp), content);
  return cellMarkup;
}

exports.Cell = Cell;
