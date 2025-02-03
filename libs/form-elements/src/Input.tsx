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

import React, { ForwardedRef } from "react";

import { cx, TokenProps, useTokens, ComponentTokens, useIcon } from "@tiller-ds/theme";

import Field from "./Field";

export type InputProps = {
  /**
   * Allows the clear button (x) to be shown when a value is present in the field.
   * Off by default.
   */
  allowClear?: boolean;

  /**
   * Custom add on displayed in the input field.
   */
  addOn?: React.ReactNode;

  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;

  /**
   * Determines whether the component is disabled.
   */
  disabled?: boolean;

  /**
   * Value passed through from validation indicating to display the error on the component.
   */
  error?: React.ReactNode;

  /**
   * Changes the styling of the component to appear as extendable on the bottom,
   * suitable for advancing your input component with a bottom display.
   * An arbitrary look of the extension is passed as this prop.
   */
  extend?: React.ReactNode;

  /**
   * The help text displayed below the input field (not exclusively text).
   */
  help?: React.ReactNode;

  /**
   * Custom add on displayed in the input field inline.
   */
  inlineLeadingAddOn?: React.ReactNode;

  /**
   * Custom add on icon displayed in the input field inline.
   */
  inlineLeadingIcon?: React.ReactNode;

  /**
   * Custom add on displayed in the input field after the text.
   */
  inlineTrailingAddOn?: React.ReactNode;

  /**
   * Custom add on icon displayed in the input field after the text.
   */
  inlineTrailingIcon?: React.ReactNode;

  /**
   * Optional ref property to pass onto the HTML input component.
   * @deprecated Will be removed in next major version, use `ref` instead
   */
  inputRef?: React.Ref<HTMLInputElement>;

  /**
   * Represents the label above the input field.
   */
  label?: React.ReactNode;

  /**
   * The accessor value for the input field component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Defines the behaviour of the component once the state resets.
   */
  onReset?: () => void;

  /**
   * Optional component displayed under the field component and above the help and error.
   * Useful for rendering arbitrary items under the component.
   */
  addonBelow?: React.ReactNode;

  /**
   * The placeholder displayed inside the input field.
   */
  placeholder?: string;

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * A unique identifier for testing purposes.
   * This identifier can be used in testing frameworks like Jest or Cypress to locate specific elements for testing.
   * It helps ensure that UI components are behaving as expected across different scenarios.
   * @type {string}
   * @example
   * // Usage:
   * <MyComponent data-testid="my-component" />
   * // In tests:
   * getByTestId('my-component');
   */
  "data-testid"?: string;

  /**
   * Tooltip icon and text (on icon hover) displayed on the right of the label.
   */
  tooltip?: React.ReactNode;

  /**
   * The value of the field sent on submit and/or retrieved on component render.
   */
  value?: string;

  /**
   * Custom icon for clearing input field
   */
  clearIcon?: React.ReactElement;

  /**
   * Custom icon for warning on input
   */
  warningIcon?: React.ReactElement;
} & Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onReset" | "ref"> &
  InputTokens;

export type InputIconProps = {
  icon: React.ReactNode;
  trailing?: boolean;
  inputId?: string;
} & TokenProps<"Input">;

export type InputAddOnProps = {
  addOn: React.ReactNode;
  className?: string;
} & TokenProps<"Input">;

export type InputInlineAddOnProps = {
  inline?: boolean;
  trailing?: boolean;
  children: React.ReactNode;
} & TokenProps<"Input">;

export type InputTokens = {
  tokens?: ComponentTokens<"Input">;
};

const Input = React.forwardRef(
  (
    {
      className,
      name,
      inputRef,
      label,
      tooltip,
      required,
      help,
      error,
      disabled,
      inlineLeadingIcon,
      inlineTrailingIcon,
      addOn,
      inlineLeadingAddOn,
      inlineTrailingAddOn,
      onReset,
      extend,
      allowClear = false,
      clearIcon,
      warningIcon,
      addonBelow,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const tokens = useTokens("Input", props.tokens);

    const inputClassName = cx(
      tokens.master,
      tokens.fontSize,
      tokens.textColor,
      tokens.lineHeight,
      { [tokens.padding.input]: !props?.id?.includes("downshift") },
      { [tokens.padding.autocomplete]: props?.id?.includes("downshift") },
      { [tokens.borderRadius]: !addOn },
      { [tokens.borderColor]: !extend && !error },
      { [tokens.boxShadow]: !extend && !error },
      { [tokens.withExtend]: extend },
      { [tokens.error.borderColor]: error && !extend },
      { [tokens.error.color]: error && !extend && !props?.id?.includes("downshift") },
      { [tokens.error.placeholder]: error && !extend },
      { [tokens.error.boxShadow]: error && !extend },
      { [tokens.addOn.master]: addOn },
      { [tokens.addOn.padding]: addOn },
      { [tokens.addOn.borderRadius]: addOn },
      { [tokens.inlineLeadingIcon]: inlineLeadingIcon },
      { [tokens.inlineLeadingAddOn]: inlineLeadingAddOn },
      { [tokens.inlineTrailingAddOn]: inlineTrailingAddOn },
      { [tokens.disabled]: disabled },
    );

    const extendedInputClassName = cx(
      tokens.borderColor,
      tokens.borderRadius,
      tokens.boxShadow,
      { [tokens.error.borderColor]: error },
      { [tokens.error.color]: error },
      { [tokens.error.placeholder]: error },
      { [tokens.error.boxShadow]: error },
      { [tokens.disabled]: disabled },
    );

    const inlineTrailingIconClass = cx({
      [tokens.Icon.master]: true,
      [tokens.Icon.color]: true,
    });

    const extendClassName = cx({
      [tokens.extend.master]: true,
      [tokens.extend.disabled]: disabled,
    });

    const inputContainerClassName = cx("relative", { flex: addOn }, tokens.container.base, {
      [tokens.container.withLabel]: label,
    });

    const inputClearClassName = cx(tokens.clear.base, tokens.clear.padding, tokens.clear.color, {
      [tokens.clear.disabled]: disabled || props.readOnly,
      [tokens.clear.clickableTrailing]: !disabled && !props.readOnly,
    });
    const finalClearIcon = useIcon("dismiss", clearIcon, { className: inputClearClassName, size: tokens.clear.size });
    const finalWarningIcon = useIcon("inputError", warningIcon, { className: tokens.error.Icon.color, size: 5 });

    const id = `input-${name}`;

    return (
      <Field
        id={id}
        label={label}
        tooltip={tooltip}
        required={required}
        help={help}
        error={error}
        containerClassName={className}
        fieldClassName={inputContainerClassName}
        addonBelow={addonBelow}
        {...props}
      >
        {addOn && <InputAddOn addOn={addOn} />}
        {inlineLeadingAddOn && <InputInlineAddOn inline={true}>{inlineLeadingAddOn}</InputInlineAddOn>}
        <div className={tokens.leadingAddOnContainer}>
          {inlineLeadingIcon && <InputIcon icon={<div className={tokens.Icon.color}>{inlineLeadingIcon}</div>} />}
        </div>
        <div className={extend ? extendedInputClassName : addOn ? "w-full" : undefined}>
          <input
            ref={inputRef || ref}
            name={name}
            id={id}
            data-testid={props["data-testid"] || id}
            disabled={disabled}
            className={inputClassName}
            {...props}
          />
          {extend && (
            <div className={extendClassName} tabIndex={0}>
              {extend}
            </div>
          )}
        </div>
        <div
          className={`${tokens.trailingAddOnContainer.master} ${
            extend ? tokens.trailingAddOnContainer.withExtend : tokens.trailingAddOnContainer.withoutExtend
          }`}
        >
          {error && <InputIcon icon={finalWarningIcon} inputId={props.id} trailing={true} />}
          {!disabled && !props.readOnly && props.value && allowClear && finalClearIcon && (
            <button type="button" onClick={onReset} data-testid={props["data-testid"] && `${props["data-testid"]}-clear`}>
              {finalClearIcon}
            </button>
          )}
          {inlineTrailingIcon && (
            <InputIcon icon={<div className={inlineTrailingIconClass}>{inlineTrailingIcon}</div>} trailing={true} />
          )}
          {inlineTrailingAddOn && (
            <InputInlineAddOn inline={true} trailing={true}>
              {inlineTrailingAddOn}
            </InputInlineAddOn>
          )}
        </div>
      </Field>
    );
  },
);

function InputIcon({ icon, trailing, inputId, ...props }: InputIconProps) {
  const tokens = useTokens("Input", props.tokens);

  const className = cx(
    tokens.Icon.Container.master,
    { [tokens.Icon.color]: !trailing },
    { [tokens.Icon.Container.leading]: !trailing },
    { [tokens.Icon.Container.trailing]: trailing && !inputId?.includes("downshift") },
  );
  return <div className={className}>{icon}</div>;
}

function InputAddOn({ addOn, className, ...props }: InputAddOnProps) {
  const tokens = useTokens("Input", props.tokens);
  const cn = className ? className : cx(tokens.addOn.container, tokens.addOn.color, tokens.addOn.fontSize, tokens.addOn.outline);
  return <span className={cn}>{addOn}</span>;
}

function InputInlineAddOn({ inline, trailing, children, ...props }: InputInlineAddOnProps) {
  const tokens = useTokens("Input", props.tokens);

  const className = cx(
    tokens.addOn.InlineAddOn.master,
    { [tokens.addOn.InlineAddOn.leading]: !trailing },
    { [tokens.addOn.InlineAddOn.trailing]: trailing },
  );

  const addOnClassName = cx(
    tokens.addOn.color,
    tokens.addOn.fontSize,
    { [tokens.addOn.inline]: inline },
    { [tokens.addOn.outline]: !inline },
  );

  return (
    <div className={className}>
      <InputAddOn addOn={children} className={addOnClassName} />
    </div>
  );
}

export default Input;
