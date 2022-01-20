import React, { useMemo, useEffect, useCallback } from 'react';
import { useComboboxTextField } from '../../../../utilities/combobox/hooks.js';
import { TextField as TextField$1 } from '../../../TextField/TextField.js';
import { useUniqueId } from '../../../../utilities/unique-id/hooks.js';
import { labelID } from '../../../Label/Label.js';

function TextField({
  value,
  id: idProp,
  onFocus,
  onBlur,
  onChange,
  ...rest
}) {
  const comboboxTextFieldContext = useComboboxTextField();
  const {
    activeOptionId,
    listboxId,
    expanded,
    setTextFieldFocused,
    setTextFieldLabelId,
    onTextFieldFocus,
    onTextFieldChange,
    onTextFieldBlur
  } = comboboxTextFieldContext;
  const uniqueId = useUniqueId('ComboboxTextField');
  const textFieldId = useMemo(() => idProp || uniqueId, [uniqueId, idProp]);
  const labelId = useMemo(() => labelID(idProp || uniqueId), [uniqueId, idProp]);
  useEffect(() => {
    if (setTextFieldLabelId) setTextFieldLabelId(labelId);
  }, [labelId, setTextFieldLabelId]);
  const handleFocus = useCallback(() => {
    if (onFocus) onFocus();
    if (onTextFieldFocus) onTextFieldFocus();
    if (setTextFieldFocused) setTextFieldFocused(true);
  }, [onFocus, onTextFieldFocus, setTextFieldFocused]);
  const handleBlur = useCallback(() => {
    if (onBlur) onBlur();
    if (onTextFieldBlur) onTextFieldBlur();
    if (setTextFieldFocused) setTextFieldFocused(false);
  }, [onBlur, onTextFieldBlur, setTextFieldFocused]);
  const handleChange = useCallback((value, id) => {
    if (onChange) onChange(value, id);
    if (onTextFieldChange) onTextFieldChange();
  }, [onChange, onTextFieldChange]);
  return /*#__PURE__*/React.createElement(TextField$1, Object.assign({}, rest, {
    value: value,
    id: textFieldId,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    ariaAutocomplete: "list",
    "aria-haspopup": "listbox",
    ariaActiveDescendant: activeOptionId,
    ariaControls: listboxId,
    role: "combobox",
    ariaExpanded: expanded
  }));
}

export { TextField };
