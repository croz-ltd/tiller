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

import * as dateFns from "date-fns";
import { FormattedDate } from "react-intl";

import { useIntlContext } from "@tiller-ds/intl";

import { formatDate } from "./utils";

export type DateProps = {
  /**
   * Data handed to the component in a valid date format.
   *
   * If using the component **with** IntlProvider you don't need to pass _format_ and _formatTo_ props, the
   * format will be inferred from the locale.
   *
   * If using the component **without** IntlProvider, you must also pass _format_ and _formatTo_ props.
   *
   * Other props come from Intl.DateTimeFormatOptions (https://bit.ly/3urm8s5)
   */
  children: string;

  /**
   * Format of the passed date (e.g. 'dd. MM. yyyy.' or 'MM/dd/yyyy').
   *
   * Pass it if you wish to manually convert the date (without the help of Intl).
   */
  formatFrom?: string;

  /**
   * Format of formatted date (e.g. 'dd. MM. yyyy.' or 'MM/dd/yyyy').
   */
  formatTo?: string;
} & Intl.DateTimeFormatOptions;

export default function Date({ children, formatFrom, formatTo, ...props }: DateProps) {
  const intl = useIntlContext();

  if (!intl && !formatFrom && !formatTo) {
    throw new Error(
      "You must pass format and formatTo props if you are using the Date component without IntlProvider.",
    );
  }

  if (formatFrom && formatTo) {
    return <>{dateFns.format(formatDate(children, formatFrom) as Date, formatTo)}</>;
  }

  return <FormattedDate value={children} {...props} />;
}
