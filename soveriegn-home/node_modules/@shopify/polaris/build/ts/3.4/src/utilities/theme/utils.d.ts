import { Theme, ProcessedThemeConfig } from './types';
interface CustomPropertiesObject {
    [key: string]: string;
}
export declare function buildCustomPropertiesNoMemo(themeConfig: ProcessedThemeConfig, tokens?: {
    [key: string]: string;
}): CustomPropertiesObject;
export declare function buildThemeContext(themeConfig: ProcessedThemeConfig, cssCustomProperties?: CustomPropertiesObject): Theme;
export declare function toString(obj?: CustomPropertiesObject): string;
export declare function toCssCustomPropertySyntax(camelCase: string): string;
export declare const buildCustomProperties: (...args: any[]) => any;
export {};
