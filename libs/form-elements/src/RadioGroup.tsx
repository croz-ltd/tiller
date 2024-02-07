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

import { ComponentTokens, cx, TokenProps, useTokens } from "@tiller-ds/theme";

import FieldGroup, { FieldGroupItemProps, FieldGroupProps } from "./FieldGroup";

type Value = string | boolean | null;

type RadioColor = "primary" | "secondary" | "tertiary" | "info" | "danger" | "warning" | "success" | "white";

export type RadioGroupProps = {
  /**
   * Radio Group content (most frequently 'RadioGroup.Item').
   */
  children: React.ReactNode;

  /**
   * Custom additional styling applied to the component.
   */
  className?: string;

  /**
   * Value passed through from validation indicating to display the error on the component.
   */
  error?: string | React.ReactNode;

  /**
   * The accessor value for the input field component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Function that handles the behaviour of the component once its state changes.
   */
  onChange: (value: Value) => void;

  /**
   * Defines the behaviour of the component once the focus shifts away from the component.
   */
  onBlur?: () => void;

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * The value of the field sent on submit and/or retrieved on component render. The type of this prop should
   * coincide with the names of your fields. For example, if you have fields 'yes' and 'no', this prop could
   * look like this: {{yes: false, no: false}}
   */
  value: Value;
} & FieldGroupProps &
  RadioGroupTokensProps;

type RadioGroupTokensProps = {
  tokens?: ComponentTokens<"RadioGroup">;
};

export type RadioGroupItemProps = {
  /**
   * The color of the radio button (RadioColor type).
   */
  color?: RadioColor;

  disabled?: boolean;
  value: string;
} & Omit<FieldGroupItemProps, "id" | "children"> &
  TokenProps<"RadioGroup">;

type RadioGroupContext = {
  name: string;

  checked: Value;

  onChange: (value: string) => () => void;

  onBlur?: () => void;
};

const RadioGroupContext = React.createContext<RadioGroupContext>({
  name: "",

  checked: null,

  onChange: () => () => null,

  onBlur: () => null,
});

function RadioGroup({ name, children, value, className = "", onChange, onBlur, ...props }: RadioGroupProps) {
  const tokens = useTokens("RadioGroup", props.tokens);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const contextOnChange = (itemValue: string) => () => {
    inputRef.current?.focus();
    onChange(itemValue);
  };

  return (
    <FieldGroup {...props} className={className}>
      <RadioGroupContext.Provider value={{ name, checked: value, onChange: contextOnChange, onBlur }}>
        {children}
        <input className={tokens.input} ref={inputRef} />
      </RadioGroupContext.Provider>
    </FieldGroup>
  );
}

function RadioGroupItem({ value, disabled, color = "primary", ...props }: RadioGroupItemProps) {
  const tokens = useTokens("RadioGroup", props.tokens);
  const { name, checked, onChange, onBlur } = React.useContext(RadioGroupContext);

  const radioGroupItemInputClassName = cx(
    [tokens.master],
    [tokens.transition],
    [tokens.base.size],
    [tokens.base.borderColor],
    [tokens.base.borderRadius],
    [tokens.base.boxShadow],
    [tokens.base.backgroundColor],
    [tokens.base.color[color]],
  );

  const fieldGroupItemClassName = cx({ [tokens.Item.disabled]: disabled });

  const id = `${name}-${value}`;
  return (
    <FieldGroup.Item id={id} {...props} className={fieldGroupItemClassName}>
      <input
        id={id}
        name={name}
        type="radio"
        className={radioGroupItemInputClassName}
        value={value}
        checked={value === checked}
        onChange={onChange(value)}
        onBlur={onBlur}
        disabled={disabled}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e")`,
        }}
      />
    </FieldGroup.Item>
  );
}

RadioGroup.Item = RadioGroupItem;
export default RadioGroup;
