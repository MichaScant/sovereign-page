import React, { useState, Children, useRef, useCallback, useMemo } from 'react';
import styles from './Combobox.scss.js';
import { ComboboxTextFieldContext, ComboboxListboxContext, ComboboxListboxOptionContext } from '../../utilities/combobox/context.js';
import { TextField } from './components/TextField/TextField.js';
import { Popover } from '../Popover/Popover.js';

function Combobox({
  children,
  activator,
  allowMultiple,
  onScrolledToBottom,
  preferredPosition = 'below'
}) {
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState();
  const [textFieldLabelId, setTextFieldLabelId] = useState();
  const [listboxId, setListboxId] = useState();
  const [textFieldFocused, setTextFieldFocused] = useState(false);
  const shouldOpen = Boolean(!popoverActive && Children.count(children) > 0);
  const ref = useRef(null);
  const onOptionSelected = useCallback(() => {
    var _ref$current;

    if (!allowMultiple) {
      setPopoverActive(false);
      setActiveOptionId(undefined);
      return;
    }

    (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.forceUpdatePosition();
  }, [allowMultiple]);
  const handleClose = useCallback(() => {
    setPopoverActive(false);
    setActiveOptionId(undefined);
  }, []);
  const handleFocus = useCallback(() => {
    if (shouldOpen) {
      setPopoverActive(true);
    }
  }, [shouldOpen]);
  const handleChange = useCallback(() => {
    if (shouldOpen) {
      setPopoverActive(true);
    }
  }, [shouldOpen]);
  const handleBlur = useCallback(() => {
    if (popoverActive) {
      setPopoverActive(false);
      setActiveOptionId(undefined);
    }
  }, [popoverActive]);
  const textFieldContextValue = useMemo(() => ({
    activeOptionId,
    expanded: popoverActive,
    listboxId,
    setTextFieldFocused,
    setTextFieldLabelId,
    onTextFieldFocus: handleFocus,
    onTextFieldChange: handleChange,
    onTextFieldBlur: handleBlur
  }), [activeOptionId, popoverActive, listboxId, setTextFieldFocused, setTextFieldLabelId, handleFocus, handleChange, handleBlur]);
  const listboxOptionContextValue = useMemo(() => ({
    allowMultiple
  }), [allowMultiple]);
  const listboxContextValue = useMemo(() => ({
    setActiveOptionId,
    setListboxId,
    listboxId,
    textFieldLabelId,
    onOptionSelected,
    textFieldFocused,
    onKeyToBottom: onScrolledToBottom
  }), [setActiveOptionId, setListboxId, listboxId, textFieldLabelId, onOptionSelected, textFieldFocused, onScrolledToBottom]);
  return /*#__PURE__*/React.createElement(Popover, {
    ref: ref,
    active: popoverActive,
    onClose: handleClose,
    activator: /*#__PURE__*/React.createElement(ComboboxTextFieldContext.Provider, {
      value: textFieldContextValue
    }, activator),
    autofocusTarget: "none",
    preventFocusOnClose: true,
    fullWidth: true,
    preferInputActivator: false,
    preferredPosition: preferredPosition
  }, /*#__PURE__*/React.createElement(Popover.Pane, {
    onScrolledToBottom: onScrolledToBottom
  }, Children.count(children) > 0 ? /*#__PURE__*/React.createElement(ComboboxListboxContext.Provider, {
    value: listboxContextValue
  }, /*#__PURE__*/React.createElement(ComboboxListboxOptionContext.Provider, {
    value: listboxOptionContextValue
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Listbox
  }, children))) : null));
}
Combobox.TextField = TextField;

export { Combobox };
