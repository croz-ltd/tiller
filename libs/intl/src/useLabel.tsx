/*
 *    Copyright 2023 CROZ d.o.o, the original author or authors.
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

import * as React from "react";

import defaultDictionary from "./intlDictionary";
import { CommonKeys } from "./IntlProvider";
import { useIntlContext } from "./useIntlContext";

export function useLabel(name: keyof CommonKeys, fallbackValue: string): string {
  const intlContext = useIntlContext();

  if (intlContext) {
    const { lang, dictionary, commonKeys } = intlContext;
    const key = commonKeys[name] || name;

    if (!dictionary?.translations?.[lang]?.[key] && !dictionary?.messages?.[key]) {
      return defaultDictionary.translations?.[lang]?.[key] || defaultDictionary.messages[name];
    }

    return (dictionary?.translations?.[lang]?.[key] || dictionary?.messages?.[key]) as string;
  }

  return fallbackValue;
}
