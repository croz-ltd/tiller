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

import * as React from "react";

import * as dateFns from "date-fns";
import { FormattedDate } from "react-intl";

import { useIntlContext } from "@tiller-ds/intl";

export type DateProps = {
  /**
   * Data handed to the component in a valid date format.
   *
   * If using the component **with** IntlProvider you don't need to pass the _format_ prop, the
   * format will be inferred from the locale.
   *
   * If using the component **without** IntlProvider, you must also pass the _format_ prop.
   *
   * Other props come from Intl.DateTimeFormatOptions (https://bit.ly/3urm8s5)
   */
  children: Date;

  /**
   * Format of formatted date (e.g. 'dd. MM. yyyy.' or 'MM/dd/yyyy').
   *
   * If used, the component will format the date in this format, regardless of the locale inferred from IntlProvider (if it exists).
   */
  format?: string;
} & Intl.DateTimeFormatOptions;

export default function Date({ children, format, ...props }: DateProps) {
  const intl = useIntlContext();

  if (!intl && !format) {
    throw new Error("You must pass the format prop if you are using the Date component without IntlProvider.");
  }

  if (format) {
    return <>{dateFns.format(children, format)}</>;
  }

  return <FormattedDate value={children} {...props} />;
}
