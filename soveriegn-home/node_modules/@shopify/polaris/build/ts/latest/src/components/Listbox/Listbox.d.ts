import React, { ReactNode } from 'react';
export interface ListboxProps {
    /** Inner content of the listbox */
    children: ReactNode;
    /** Explicitly enable keyboard control */
    enableKeyboardControl?: boolean;
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string;
    /** Callback when an option is selected */
    onSelect?(value: string): void;
}
export declare type ArrowKeys = 'up' | 'down';
export declare const scrollable: {
    props: {
        'data-polaris-scrollable': boolean;
    };
    selector: string;
};
export declare function Listbox({ children, enableKeyboardControl, accessibilityLabel, onSelect, }: ListboxProps): JSX.Element;
export declare namespace Listbox {
    var Option: React.NamedExoticComponent<import("./components").OptionProps>;
    var TextOption: React.NamedExoticComponent<import("./components/TextOption/TextOption").TextOptionProps>;
    var Loading: React.NamedExoticComponent<import("./components/Loading/Loading").LoadingProps>;
    var Section: typeof import("./components").Section;
    var Header: typeof import("./components").Header;
    var Action: typeof import("./components").Action;
}
