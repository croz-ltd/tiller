/*
 *    Copyright 2025 CROZ d.o.o, the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import { CommonKeys as InternalCommonKeys, IntlContextType as InternalIntlContextType } from "./IntlProvider";

import {
  Messages as InternalMessages,
  Translations as InternalTranslations,
  Dictionary as InternalDictionary,
  LanguageTranslation as InternalLanguageTranslation,
} from "./IntlTypes";

export type Messages = InternalMessages;
export type Translations = InternalTranslations;
export type CommonKeys = InternalCommonKeys;
export type Dictionary = InternalDictionary;
export type LanguageTranslation = InternalLanguageTranslation;
export type IntlContextType = InternalIntlContextType;

export { default as Intl } from "./Intl";
export { default as IntlProvider, useIntl } from "./IntlProvider";
export { useIntlContext } from "./useIntlContext";
export { useLabel } from "./useLabel";
export { default as defaultIntlDictionary } from "./intlDictionary";
