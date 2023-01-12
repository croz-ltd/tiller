import * as React from "react";

export type LanguageTranslation = string | LanguageTranslations | { paramOrder: string[] };
type LanguageTranslations = { [key: string]: LanguageTranslation };
export type Translations = Record<string, LanguageTranslations>;
export type Messages = Record<string, string>;
export type Dictionary = { messages: Messages; translations: Translations };
export type IntlParams = Record<string, number | string | React.ReactNode>;
export type IntlRender = Record<string, (value: number | string | React.ReactNode) => React.ReactNode>;
