/// <reference types="react" />
declare type StatusDeprecated = 'attention';
declare type Status = 'success' | 'info' | 'critical' | 'warning' | 'new' | StatusDeprecated;
declare type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
declare type Size = 'small' | 'medium';
export interface BadgeProps {
    /** The content to display inside the badge. */
    children?: string;
    /** Colors and labels the badge with the given status. */
    status?: Status;
    /** Render a pip showing the progress of a given task. */
    progress?: Progress;
    /**
     * Medium or small size.
     * @default 'medium'
     */
    size?: Size;
    /** Pass a custom accessibilityLabel */
    statusAndProgressLabelOverride?: string;
}
export declare function Badge({ children, status, progress, size, statusAndProgressLabelOverride, }: BadgeProps): JSX.Element;
export {};
