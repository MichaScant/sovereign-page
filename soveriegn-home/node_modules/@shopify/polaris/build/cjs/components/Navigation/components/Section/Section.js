'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../../../utilities/css.js');
var breakpoints = require('../../../../utilities/breakpoints.js');
var useToggle = require('../../../../utilities/use-toggle.js');
var Navigation = require('../../Navigation.scss.js');
var Item = require('../Item/Item.js');
var Icon = require('../../../Icon/Icon.js');
var hooks = require('../../../../utilities/unique-id/hooks.js');
var Collapsible = require('../../../Collapsible/Collapsible.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Section({
  title,
  fill,
  action,
  items,
  rollup,
  separator
}) {
  const {
    value: expanded,
    toggle: toggleExpanded,
    setFalse: setExpandedFalse
  } = useToggle.useToggle(false);
  const animationFrame = React.useRef(null);

  const handleClick = (onClick, hasSubNavItems) => {
    return () => {
      if (onClick) {
        onClick();
      }

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      if (!hasSubNavItems || !breakpoints.navigationBarCollapsed().matches) {
        animationFrame.current = requestAnimationFrame(setExpandedFalse);
      }
    };
  };

  React.useEffect(() => {
    return () => {
      animationFrame.current && cancelAnimationFrame(animationFrame.current);
    };
  });
  const className = css.classNames(Navigation['default'].Section, separator && Navigation['default']['Section-withSeparator'], fill && Navigation['default']['Section-fill']);
  const actionMarkup = action && /*#__PURE__*/React__default['default'].createElement("button", {
    type: "button",
    className: Navigation['default'].Action,
    "aria-label": action.accessibilityLabel,
    onClick: action.onClick
  }, /*#__PURE__*/React__default['default'].createElement(Icon.Icon, {
    source: action.icon
  }));
  const sectionHeadingMarkup = title && /*#__PURE__*/React__default['default'].createElement("li", {
    className: Navigation['default'].SectionHeading
  }, /*#__PURE__*/React__default['default'].createElement("span", {
    className: Navigation['default'].Text
  }, title), actionMarkup);
  const itemsMarkup = items.map(item => {
    const {
      onClick,
      label,
      subNavigationItems,
      ...rest
    } = item;
    const hasSubNavItems = subNavigationItems != null && subNavigationItems.length > 0;
    return /*#__PURE__*/React__default['default'].createElement(Item.Item, Object.assign({
      key: label
    }, rest, {
      label: label,
      subNavigationItems: subNavigationItems,
      onClick: handleClick(onClick, hasSubNavItems)
    }));
  });
  const toggleClassName = css.classNames(Navigation['default'].Item, Navigation['default'].RollupToggle);
  const ariaLabel = rollup && (expanded ? rollup.hide : rollup.view);
  const toggleRollup = rollup && items.length > rollup.after && /*#__PURE__*/React__default['default'].createElement("div", {
    className: Navigation['default'].ListItem,
    key: "List Item"
  }, /*#__PURE__*/React__default['default'].createElement("button", {
    type: "button",
    className: toggleClassName,
    onClick: toggleExpanded,
    "aria-label": ariaLabel
  }, /*#__PURE__*/React__default['default'].createElement("span", {
    className: Navigation['default'].Icon
  }, /*#__PURE__*/React__default['default'].createElement(Icon.Icon, {
    source: polarisIcons.HorizontalDotsMinor
  }))));
  const activeItemIndex = items.findIndex(item => {
    if (!rollup) {
      return false;
    }

    return rollup.activePath === item.url || item.url && rollup.activePath.startsWith(item.url) || (item.subNavigationItems ? item.subNavigationItems.some(({
      url: itemUrl
    }) => rollup.activePath.startsWith(itemUrl)) : false);
  });
  const sectionItems = rollup ? itemsMarkup.slice(0, rollup.after) : itemsMarkup;
  const additionalItems = rollup ? itemsMarkup.slice(rollup.after) : [];

  if (rollup && activeItemIndex !== -1 && activeItemIndex > rollup.after - 1) {
    sectionItems.push(...additionalItems.splice(activeItemIndex - rollup.after, 1));
  }

  const additionalItemsId = hooks.useUniqueId('AdditionalItems');
  const activeItemsMarkup = rollup && additionalItems.length > 0 && /*#__PURE__*/React__default['default'].createElement("li", {
    className: Navigation['default'].RollupSection
  }, /*#__PURE__*/React__default['default'].createElement(Collapsible.Collapsible, {
    id: additionalItemsId,
    open: expanded
  }, /*#__PURE__*/React__default['default'].createElement("ul", {
    className: Navigation['default'].List
  }, additionalItems)), toggleRollup);
  return /*#__PURE__*/React__default['default'].createElement("ul", {
    className: className
  }, sectionHeadingMarkup, sectionItems, activeItemsMarkup);
}

exports.Section = Section;
