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

import Checkbox, { CheckboxProps } from "./Checkbox";
import FieldGroup, { FieldGroupItemProps, FieldGroupProps } from "./FieldGroup";

type Value = Record<string, boolean>;

export type CheckboxGroupProps = {
  /**
   * Checkbox Group content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Custom additional styling applied to the component.
   */
  className?: string;

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
  CheckboxGroupTokensProps;

type CheckboxGroupTokensProps = {
  tokens?: ComponentTokens<"CheckboxGroup">;
};

export type CheckboxGroupItemProps = {
  /**
   * A string representing the value of the checkbox. This is not displayed on the client-side, but on the server this is the value given to the data submitted with the checkbox's name.
   */
  value: string;
} & Omit<FieldGroupItemProps, "id" | "children"> &
  CheckboxProps;

type CheckboxGroupContext = {
  name: string;

  checked: Value;

  onChange: (value: string) => () => void;

  onBlur?: () => void;
};

const CheckboxGroupContext = React.createContext<CheckboxGroupContext>({
  name: "",

  checked: {},

  onChange: () => () => null,

  onBlur: () => null,
});

function CheckboxGroup({ name, children, value, className = "", onChange, onBlur, ...props }: CheckboxGroupProps) {
  const tokens = useTokens("CheckboxGroup", props.tokens);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const contextOnChange = (itemValue: string) => () => {
    onChange({
      ...value,
      [itemValue]: !value[itemValue],
    });
  };

  return (
    <FieldGroup className={className} {...props}>
      <CheckboxGroupContext.Provider value={{ name, checked: value, onChange: contextOnChange, onBlur }}>
        {children}
        <input className={tokens.input} ref={inputRef} />
      </CheckboxGroupContext.Provider>
    </FieldGroup>
  );
}

function CheckboxGroupItem({ value, color, disabled, ...props }: CheckboxGroupItemProps) {
  const { name, checked, onChange, onBlur } = React.useContext(CheckboxGroupContext);

  const id = `${name}-${value}`;
  return (
    <FieldGroup.Item {...props} id={id} disabled={disabled}>
      <Checkbox
        id={id}
        name={name}
        value={value}
        color={color}
        checked={Object.values(checked)[Object.keys(checked).indexOf(value)]}
        onChange={onChange(value)}
        onBlur={onBlur}
        disabled={disabled}
      />
    </FieldGroup.Item>
  );
}

CheckboxGroup.Item = CheckboxGroupItem;
export default CheckboxGroup;
