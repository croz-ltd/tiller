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

import { useIntlContext } from "./useIntlContext";
import { IntlRender, IntlParams } from "./IntlTypes";

interface IntlProps {
  /**
   * Content of the Intl component (of type 'Record').
   */
  children?: IntlRender;

  /**
   * The accessor value for communicating with external translation services or
   * local dictionary files.
   */
  name: string;

  /**
   * Parameters to render instead of content wrapped with '{' and '}' in the dictionary
   * or in external services.
   */
  params?: IntlParams;
}

export default function Intl({ name, params, children }: IntlProps) {
  const { lang, dictionary, intlUtil } = useIntlContext();

  if (!dictionary?.translations?.[lang]?.[name] && !dictionary?.messages?.[name]) {
    return <>{name}</>;
  }

  return (
    <>
      {intlUtil.translate({ name, params, render: children }).map((it, i) => (
        <React.Fragment key={i}>{it}</React.Fragment>
      ))}
    </>
  );
}
