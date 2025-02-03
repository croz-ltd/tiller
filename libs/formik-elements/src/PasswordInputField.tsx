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

import React from "react";

import { IconButton } from "@tiller-ds/core";
import { useIcon, useTokens } from "@tiller-ds/theme";

import InputField, { InputFieldProps } from "./InputField";

type InputOnlyPropsUnion = "value" | "onChange" | "onBlur" | "error";

type PasswordInputFieldProps = {
  /**
   * The accessor value for the component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Represents the label above the input field (not exclusively text).
   */
  label?: React.ReactNode;

  /**
   * The help text displayed below the field.
   */
  help?: React.ReactNode;
} & Omit<InputFieldProps, InputOnlyPropsUnion>;

export default function PasswordInputField({ name, label, help = "Caps Lock is On.", ...props }: PasswordInputFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [capsLock, setCapsLock] = React.useState(false);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const tokens = useTokens("Input", props.tokens);
  const showPasswordIcon = useIcon("showPassword");
  const hidePasswordIcon = useIcon("hidePassword");

  const onKeyDown = (e) => {
    if (e.getModifierState("CapsLock")) {
      setCapsLock(true);
    } else {
      setCapsLock(false);
    }
  };

  return (
    <InputField
      key={name}
      name={name}
      inputRef={passwordInputRef}
      help={capsLock && help ? help : ""}
      type={showPassword ? "text" : "password"}
      inlineTrailingIcon={
        <IconButton
          icon={showPassword ? showPasswordIcon : hidePasswordIcon}
          className={tokens.Icon.clickableTrailing}
          onClick={() => {
            if (!props.disabled) {
              setShowPassword(!showPassword);
              passwordInputRef.current?.focus();
            }
          }}
          showTooltip={false}
        />
      }
      label={label}
      onKeyDown={onKeyDown}
      {...props}
      data-testid={name ?? props["data-testid"]}
    />
  );
}
