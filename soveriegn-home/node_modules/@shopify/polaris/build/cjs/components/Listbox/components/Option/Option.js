'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var css = require('../../../../utilities/css.js');
var Option$1 = require('./Option.scss.js');
var hooks = require('../../../../utilities/listbox/hooks.js');
var context = require('../../../../utilities/autocomplete/context.js');
var hooks$2 = require('../Section/hooks.js');
var selectors = require('../Section/selectors.js');
var TextOption = require('../TextOption/TextOption.js');
var hooks$1 = require('../../../../utilities/unique-id/hooks.js');
var UnstyledLink = require('../../../UnstyledLink/UnstyledLink.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const Option = /*#__PURE__*/React.memo(function Option({
  value,
  children,
  selected,
  disabled = false,
  accessibilityLabel,
  divider
}) {
  const {
    onOptionSelect
  } = hooks.useListbox();
  const {
    role,
    url,
    external,
    onAction,
    destructive
  } = React.useContext(context.MappedActionContext);
  const listItemRef = React.useRef(null);
  const domId = hooks$1.useUniqueId('ListboxOption');
  const sectionId = hooks$2.useSection();
  const isWithinSection = Boolean(sectionId);
  const handleOptionClick = React.useCallback(evt => {
    evt.preventDefault();
    onAction && onAction();

    if (listItemRef.current && !onAction) {
      onOptionSelect({
        domId,
        value,
        element: listItemRef.current,
        disabled
      });
    }
  }, [domId, onOptionSelect, value, disabled, onAction]); // prevents lost of focus on Textfield

  const handleMouseDown = evt => {
    evt.preventDefault();
  };

  const content = typeof children === 'string' ? /*#__PURE__*/React__default['default'].createElement(TextOption.TextOption, {
    selected: selected,
    disabled: disabled
  }, children) : children;
  const sectionAttributes = {
    [selectors.listboxWithinSectionDataSelector.attribute]: isWithinSection
  };
  const legacyRoleSupport = role || 'option';
  const contentMarkup = url ? /*#__PURE__*/React__default['default'].createElement(UnstyledLink.UnstyledLink, {
    url: url,
    external: external
  }, content) : content;
  return /*#__PURE__*/React__default['default'].createElement("li", Object.assign({}, sectionAttributes, {
    "data-within-section": isWithinSection,
    "data-listbox-option-value": value,
    "data-listbox-option-destructive": destructive,
    className: css.classNames(Option$1['default'].Option, divider && Option$1['default'].divider),
    id: domId,
    ref: listItemRef,
    tabIndex: -1,
    onMouseDown: handleMouseDown,
    "aria-disabled": disabled,
    onClick: disabled ? undefined : handleOptionClick,
    role: legacyRoleSupport,
    "aria-label": accessibilityLabel,
    "aria-selected": selected,
    "data-listbox-option": true
  }), contentMarkup);
});

exports.Option = Option;
