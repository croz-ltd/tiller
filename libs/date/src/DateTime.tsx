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

import { FormattedDate } from "react-intl";

export type DateProps = {
  /**
   * Data handed to the component in a valid date format.
   * Other props come from Intl.DateTimeFormatOptions (https://bit.ly/3urm8s5)
   */
  children: Date;
} & Intl.DateTimeFormatOptions;

export default function DateTime({ children, ...props }: DateProps) {
  return (
    <FormattedDate
      value={children}
      day="numeric"
      month="numeric"
      year="numeric"
      hour="numeric"
      minute="numeric"
      second="numeric"
      {...props}
    />
  );
}
