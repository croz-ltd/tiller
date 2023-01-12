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

import classNames from "classnames";

import { ClassValue } from "classnames/types";

const prefixes = ["w", "h"];

export default function cx(...args: ClassValue[]) {
  const classes = classNames(args)
    .split(/\s+/)
    .reverse();

  const used: string[] = [];
  const result: string[] = [];

  for (const className of classes) {
    const index = className.lastIndexOf("-");

    if (index === -1) {
      result.push(className);
      continue;
    }

    const prefix = className.substring(0, index);

    if (prefixes.indexOf(prefix) === -1 || used.indexOf(prefix) === -1) {
      result.push(className);
      used.push(prefix);
    }
  }

  return [...result].reverse().join(" ");
}
