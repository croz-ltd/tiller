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

import { FormattedNumber } from "react-intl";

export type AmountProps = {
  /**
   * Defines the amount style for the desired number.
   * The component formats the look of the number accordingly.
   */
  amountStyle?: "currency" | "decimal" | "percent" | "unit" | undefined;

  /**
   * Data handed to the component in a valid string format or a number format.
   * Other props come from Intl.NumberFormatOptions (https://bit.ly/3yHqaPz)
   */
  children: number | string;

  /**
   * Changes the display of the currency by applying various representations of currency displays.
   * For example, 'usd' currency can be represented with '$', 'US dollars', or 'USD'.
   */
  currencyDisplay?: "symbol" | "code" | "name" | "narrowSymbol";
} & Omit<Intl.NumberFormatOptions, "localeMatcher" | "style" | "currencyDisplay">;

export default function Amount({ children, amountStyle = "currency", ...props }: AmountProps) {
  const value = typeof children === "string" ? window.Number(children) : children;

  if (!window.Number.isFinite(value)) {
    return null;
  }

  return <FormattedNumber value={value} style={amountStyle} {...props} />;
}
