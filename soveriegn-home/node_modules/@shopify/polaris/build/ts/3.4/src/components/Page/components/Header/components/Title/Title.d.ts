import React from 'react';
import { AvatarProps } from '../../../../../Avatar';
import { ThumbnailProps } from '../../../../../Thumbnail';
export interface TitleProps {
    /** Page title, in large type */
    title?: string;
    /** Page subtitle, in regular type*/
    subtitle?: string;
    /** Important and non-interactive status information shown immediately after the title. */
    titleMetadata?: React.ReactNode;
    /** @deprecated thumbnail that precedes the title */
    thumbnail?: React.ReactElement<AvatarProps | ThumbnailProps> | React.SFC<React.SVGProps<SVGSVGElement>>;
    /** Removes spacing between title and subtitle */
    compactTitle?: boolean;
}
export declare function Title({ title, subtitle, titleMetadata, thumbnail, compactTitle, }: TitleProps): JSX.Element;
