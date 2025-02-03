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

import { cx, TokenProps, useTokens } from "@tiller-ds/theme";
import { tillerTwMerge } from "@tiller-ds/util";

type LabelProps = {
  id?: string;

  className?: string;

  children: React.ReactNode;
} & TokenProps<"Label">;

export default function Label({ id, className, children, ...props }: LabelProps) {
  const tokens = useTokens("Label", props.tokens);

  const hasLabel = React.Children.count(children) > 0;
  const labelClassName = cx(
    { [tokens.fontSize]: hasLabel },
    { [tokens.color]: hasLabel },
    { [tokens.empty]: !hasLabel },
    { block: hasLabel },
  );

  return (
    <label htmlFor={id} className={tillerTwMerge(labelClassName, className)}>
      {children}
    </label>
  );
}
