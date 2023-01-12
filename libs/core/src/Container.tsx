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

import { ComponentTokens, useTokens } from "@tiller-ds/theme";

export type ContainerProps = {
  /**
   * Content wrapped in a container.
   */
  children: React.ReactNode;

  /**
   * Defines the look of the container by determining the padding, margins and width
   * for inner and outer container of the component.
   */
  variant?: "max" | "fullWidth" | "constrainedPadded" | "fullWidthContainer" | "narrowConstrained";
} & ContainerTokensProps;

type ContainerTokensProps = {
  tokens?: ComponentTokens<"Container">;
};

export default function Container({ variant = "max", children, ...props }: ContainerProps) {
  const tokens = useTokens("Container", props.tokens);

  return (
    <div className={tokens.variant[variant].outerContainer}>
      <div className={tokens.variant[variant].innerContainer}>{children}</div>
    </div>
  );
}
