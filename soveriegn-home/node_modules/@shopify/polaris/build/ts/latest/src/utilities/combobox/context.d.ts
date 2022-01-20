/// <reference types="react" />
export interface ComboboxTextFieldType {
    activeOptionId?: string;
    listboxId?: string;
    expanded?: boolean;
    setTextFieldLabelId?(id: string): void;
    setTextFieldFocused?(value: boolean): void;
    onTextFieldFocus?(): void;
    onTextFieldBlur?(): void;
    onTextFieldChange?(): void;
}
export interface ComboboxListboxType {
    textFieldLabelId?: string;
    textFieldFocused?: boolean;
    setActiveOptionId?(id: string): void;
    setListboxId?(id: string): void;
    listboxId?: string;
    onOptionSelected?(): void;
    onKeyToBottom?(): void;
}
export interface ComboboxListboxOptionType {
    allowMultiple?: boolean;
}
export declare const ComboboxTextFieldContext: import("react").Context<ComboboxTextFieldType | undefined>;
export declare const ComboboxListboxContext: import("react").Context<ComboboxListboxType>;
export declare const ComboboxListboxOptionContext: import("react").Context<ComboboxListboxOptionType>;
