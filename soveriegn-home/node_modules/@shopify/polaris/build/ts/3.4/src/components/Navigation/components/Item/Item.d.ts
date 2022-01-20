import { ReactNode } from 'react';
import { IconProps } from '../../../Icon';
interface ItemURLDetails {
    url?: string;
    matches?: boolean;
    exactMatch?: boolean;
    matchPaths?: string[];
    excludePaths?: string[];
    external?: boolean;
}
export interface SubNavigationItem extends ItemURLDetails {
    url: string;
    label: string;
    disabled?: boolean;
    new?: boolean;
    onClick?(): void;
}
interface SecondaryAction {
    url: string;
    accessibilityLabel: string;
    icon: IconProps['source'];
    onClick?(): void;
}
export interface ItemProps extends ItemURLDetails {
    icon?: IconProps['source'];
    badge?: ReactNode;
    label: string;
    disabled?: boolean;
    accessibilityLabel?: string;
    selected?: boolean;
    exactMatch?: boolean;
    new?: boolean;
    subNavigationItems?: SubNavigationItem[];
    secondaryAction?: SecondaryAction;
    onClick?(): void;
}
export declare function Item({ url, icon, label, subNavigationItems, secondaryAction, disabled, onClick, accessibilityLabel, selected: selectedOverride, badge, new: isNew, matches, exactMatch, matchPaths, excludePaths, external, }: ItemProps): JSX.Element;
export declare function isNavigationItemActive(navigationItem: ItemProps, currentPath: string): boolean | undefined;
export {};
