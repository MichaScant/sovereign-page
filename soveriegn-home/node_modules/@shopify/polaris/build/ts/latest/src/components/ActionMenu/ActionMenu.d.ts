/// <reference types="react" />
import type { MenuActionDescriptor, MenuGroupDescriptor } from '../../types';
export interface ActionMenuProps {
    /** Collection of page-level secondary actions */
    actions?: MenuActionDescriptor[];
    /** Collection of page-level action groups */
    groups?: MenuGroupDescriptor[];
    /** Roll up all actions into a Popover > ActionList */
    rollup?: boolean;
    /** Label for rolled up actions activator */
    rollupActionsLabel?: string;
}
export declare function ActionMenu({ actions, groups, rollup, rollupActionsLabel, }: ActionMenuProps): JSX.Element | null;
export declare function hasGroupsWithActions(groups?: ActionMenuProps['groups']): boolean;
