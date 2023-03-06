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

import { IntlContext as ReactIntlContext, IntlProvider as ReactIntlProvider, IntlShape } from "react-intl";

import { createNamedContext } from "@tiller-ds/util";

import intlDictionary from "./intlDictionary";
import { Dictionary } from "./IntlTypes";
import { IntlUtil } from "./IntlUtil";

export type CommonKeys = {
  required?: string;
  autocompleteNoTags?: string;
  autocompleteAddTag?: string;
  autocompleteNoResults?: string;
  selectNoResults?: string;
  paginationDefault?: string;
};

type IntlProviderProps = {
  /**
   * Defines an arbitrary language for your dictionary. Must be consistent with your structured data for translations
   * and messages.
   */
  lang: string;

  /**
   * Receives a dictionary object which contains two objects - messages and translations.
   */
  dictionary?: Dictionary;

  /**
   * Similar to dictionary prop, but serves as a function which generally receives your dictionary as a return value.
   */
  loadDictionary?: ((lang: string) => Promise<Dictionary>) | undefined;

  /**
   * Since this component serves as a wrapper, it is recommended to wrap your entire website's content
   * (which uses text or has this component as its prerequisite) inside this component.
   */
  children: React.ReactNode;

  /**
   * Configuration for label keys used internally in Tiller (like 'Required'). Override these if you cannot use default keys provided by Tiller.
   */
  keyConfig?: CommonKeys;
};

type IntlProviderWrapperProps = {
  intl: IntlValue;
  children: React.ReactNode;
};

type IntlValue = {
  lang: string;
  dictionary: Dictionary;
  intlUtil: IntlUtil;
  changeLang: (lang: string) => void;
  commonKeys: CommonKeys;
};

export type IntlContextType = IntlValue & {
  intl: IntlShape;
};

export const IntlContext = createNamedContext<IntlContextType>("IntlContext");

export function useIntl(
  language: string,
  dict: Dictionary | undefined = intlDictionary,
  loadDictionary: ((lang: string) => Promise<Dictionary>) | undefined,
  keyConfig: CommonKeys = {
    required: "required",
    autocompleteNoTags: "autocomplete.noTags",
    autocompleteAddTag: "autocomplete.addTag",
    autocompleteNoResults: "autocomplete.noResults",
    selectNoResults: "select.noResults",
    paginationDefault: "pagination.default",
  },
): IntlValue {
  const [lang, setLang] = React.useState<string>(language);
  const [dictionary, setDictionary] = React.useState<Dictionary>(dict || ({} as Dictionary));

  const changeLang = React.useCallback(
    async (newLang: string) => {
      setLang(newLang);
      if (loadDictionary) {
        const response = await loadDictionary(newLang);
        if (keyConfig) {
          setDictionary({
            ...response,
            translations: { [newLang]: response.translations },
            messages: { ...response.messages },
          });
        } else {
          setDictionary({ ...response, translations: { [newLang]: response.translations } });
        }
      }
    },
    [loadDictionary],
  );

  React.useEffect(() => {
    if (dict) {
      setDictionary(dict);
    }
  }, [dict]);

  React.useEffect(() => {
    changeLang(language);
  }, [language, changeLang]);

  return React.useMemo(
    () => ({
      lang,
      changeLang,
      dictionary,
      intlUtil: new IntlUtil(dictionary, lang),
      commonKeys: keyConfig,
    }),
    [lang, dictionary, changeLang],
  );
}

function IntlProviderWrapper({ children, intl }: IntlProviderWrapperProps) {
  const context = React.useContext(ReactIntlContext);
  const value = React.useMemo(() => ({ ...intl, intl: context }), [intl, context]);

  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
}

export default function IntlProvider({ children, lang, dictionary, loadDictionary, keyConfig }: IntlProviderProps) {
  const intl = useIntl(lang, dictionary, loadDictionary, keyConfig);

  return (
    <>
      <ReactIntlProvider locale={lang}>
        <IntlProviderWrapper intl={intl}>{children}</IntlProviderWrapper>
      </ReactIntlProvider>
    </>
  );
}
