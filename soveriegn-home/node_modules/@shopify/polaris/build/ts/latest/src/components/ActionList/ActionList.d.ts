/// <reference types="react" />
import { ActionListItemDescriptor, ActionListSection } from '../../types';
export interface ActionListProps {
    /** Collection of actions for list */
    items?: readonly ActionListItemDescriptor[];
    /** Collection of sectioned action items */
    sections?: readonly ActionListSection[];
    /** Defines a specific role attribute for each action in the list */
    actionRole?: 'menuitem' | string;
    /** Callback when any item is clicked or keypressed */
    onActionAnyItem?: ActionListItemDescriptor['onAction'];
}
export declare function ActionList({ items, sections, actionRole, onActionAnyItem, }: ActionListProps): JSX.Element;
