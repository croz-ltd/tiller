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

import { ComponentTokens } from "@tiller-ds/theme";

import { ButtonProps } from "./Button";
import StatusButton from "./StatusButton";

type Status = "idle" | "waiting" | "success" | "error";

type AsyncButtonProps = {
  /**
   * Defines a promise with a return value corresponding to the state of the button.
   * If the promise fails the status of the button changes to 'error'.
   * If the promise is successful the status of the button changes to 'success'.
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<unknown>;
} & Omit<ButtonProps, "onClick"> &
  StatusButtonTokensProps;

type StatusButtonTokensProps = {
  tokens?: ComponentTokens<"StatusButton">;
};

const RESET_STATUS_TIMEOUT = 1000;

export default function AsyncButton({ color, onClick, ...props }: AsyncButtonProps) {
  const [buttonStatus, setButtonStatus] = React.useState<Status>("idle");

  const reset = () => {
    setTimeout(() => {
      setButtonStatus("idle");
    }, RESET_STATUS_TIMEOUT);
  };

  const statusOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setButtonStatus("waiting");

    const promise = onClick(event);
    return promise
      .catch((onrejected) => {
        setButtonStatus("error");

        reset();

        return Promise.reject(onrejected);
      })
      .then((result) => {
        setButtonStatus("success");

        reset();

        return result;
      });
  };

  return <StatusButton {...props} status={buttonStatus} onClick={statusOnClick} />;
}
