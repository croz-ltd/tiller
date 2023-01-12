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

import { ComponentTokens, useIcon, useTokens } from "@tiller-ds/theme";

import Button, { ButtonProps } from "./Button";

type Status = "idle" | "waiting" | "error" | "success";
export type StatusButtonProps = {
  /**
   * Defines a status of the button.
   */
  status?: Status;
} & ButtonProps &
  StatusButtonTokensProps;

type StatusButtonTokensProps = {
  tokens?: ComponentTokens<"StatusButton">;
};

export default function StatusButton({ status, ...props }: StatusButtonProps) {
  const tokens = useTokens("StatusButton", props.tokens);
  const size = props.size || "md";

  const iconProps = { size: tokens.icon.size[size] };
  const loadingIcon = useIcon("loading", undefined, iconProps);
  const successIcon = useIcon("completed", undefined, iconProps);
  const warningIcon = useIcon("warning", undefined, iconProps);

  if (status === "waiting") {
    return <Button {...props} leadingIcon={loadingIcon} />;
  } else if (status === "success") {
    return <Button {...props} leadingIcon={successIcon} color="success" />;
  } else if (status === "error") {
    return <Button {...props} leadingIcon={warningIcon} color="danger" />;
  } else {
    return <Button {...props} />;
  }
}
