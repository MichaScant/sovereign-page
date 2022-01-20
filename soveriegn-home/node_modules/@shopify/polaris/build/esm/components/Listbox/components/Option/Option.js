import React, { memo, useContext, useRef, useCallback } from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from './Option.scss.js';
import { useListbox } from '../../../../utilities/listbox/hooks.js';
import { MappedActionContext } from '../../../../utilities/autocomplete/context.js';
import { useSection } from '../Section/hooks.js';
import { listboxWithinSectionDataSelector } from '../Section/selectors.js';
import { TextOption } from '../TextOption/TextOption.js';
import { useUniqueId } from '../../../../utilities/unique-id/hooks.js';
import { UnstyledLink } from '../../../UnstyledLink/UnstyledLink.js';

const Option = /*#__PURE__*/memo(function Option({
  value,
  children,
  selected,
  disabled = false,
  accessibilityLabel,
  divider
}) {
  const {
    onOptionSelect
  } = useListbox();
  const {
    role,
    url,
    external,
    onAction,
    destructive
  } = useContext(MappedActionContext);
  const listItemRef = useRef(null);
  const domId = useUniqueId('ListboxOption');
  const sectionId = useSection();
  const isWithinSection = Boolean(sectionId);
  const handleOptionClick = useCallback(evt => {
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

  const content = typeof children === 'string' ? /*#__PURE__*/React.createElement(TextOption, {
    selected: selected,
    disabled: disabled
  }, children) : children;
  const sectionAttributes = {
    [listboxWithinSectionDataSelector.attribute]: isWithinSection
  };
  const legacyRoleSupport = role || 'option';
  const contentMarkup = url ? /*#__PURE__*/React.createElement(UnstyledLink, {
    url: url,
    external: external
  }, content) : content;
  return /*#__PURE__*/React.createElement("li", Object.assign({}, sectionAttributes, {
    "data-within-section": isWithinSection,
    "data-listbox-option-value": value,
    "data-listbox-option-destructive": destructive,
    className: classNames(styles.Option, divider && styles.divider),
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

export { Option };
