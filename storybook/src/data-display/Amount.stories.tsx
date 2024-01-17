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

import { withDesign } from "storybook-addon-designs";

import { Amount } from "@tiller-ds/data-display";
import { useIntlContext } from "@tiller-ds/intl";

import mdx from "./Amount.mdx";
import { beautifySource } from "../utils";

export default {
  title: "Component Library/Data-display/Amount",
  component: Amount,
  parameters: {
    docs: {
      page: mdx,
      transformSource: (source) => beautifySource(source, "Amount"),
    },
    decorators: [withDesign],
  },
};

export const AmountWithCurrency = () => (
  <Amount amountStyle="currency" currency="hrk">
    12
  </Amount>
);
export const WithDecimal = () => <Amount amountStyle="decimal">1452</Amount>;
export const WithPercent = () => <Amount amountStyle="percent">0.03</Amount>;
export const WithUnit = () => <Amount amountStyle="unit">12</Amount>;
export const WithZero = () => <Amount currency="hrk">0</Amount>;
export const WithLessThanThousand = () => <Amount currency="hrk">123</Amount>;
export const WithLessThanMillion = () => <Amount currency="hrk">34500</Amount>;
export const WithMoreThanMillion = () => <Amount currency="hrk">34500000 </Amount>;
export const WithMinOneFractionDigit = () => (
  <Amount currency="hrk" minimumFractionDigits={1}>
    3
  </Amount>
);
export const WithMinTwoFractionDigits = () => (
  <Amount currency="hrk" minimumFractionDigits={2}>
    3.1
  </Amount>
);
export const WithMinThreeFractionDigits = () => (
  <Amount currency="hrk" minimumFractionDigits={3}>
    3.1
  </Amount>
);
export const WithMaxTwoFractionDigits = () => (
  <Amount currency="hrk" maximumFractionDigits={2}>
    3.1234
  </Amount>
);

export const WithTranslation = () => {
  // incl-code
  //requires IntlProvider wrapper!
  const intlContext = useIntlContext();
  const price = 1000.12;

  return <span>{intlContext?.intl.formatNumber(price, { style: "currency" })}</span>;
};
