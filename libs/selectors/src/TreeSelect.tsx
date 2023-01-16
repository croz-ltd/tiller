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

import { useSelect } from "downshift";
import Popover, { positionMatchWidth } from "@reach/popover";

import { Field } from "@tiller-ds/form-elements";
import { ComponentTokens, cx, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";

export type TreeSelectProps<T> = {
  /**
   * Custom className given to the Field component which wraps this component.
   */
  className?: string;

  /**
   * Defines whether the component is disabled on render.
   */
  disabled?: boolean;

  /**
   * Passes the error to the Field component.
   */
  error?: React.ReactNode;

  /**
   * The help text displayed below the tree select field.
   */
  help?: React.ReactNode;

  /**
   * The label displayed above the tree select field.
   */
  label?: React.ReactNode;

  /**
   * The accessor value for the input field component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Options array handed over to the component (supports hierarchical ordering).
   */
  options: T[];

  /**
   * The placeholder displayed inside the field.
   */
  placeholder?: React.ReactNode;

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * The value of the field sent on submit and/or retrieved on component render.
   */
  value?: T | null;
} & OptionProps<T> &
  SelectTokensProps;

type SelectTokensProps = {
  tokens?: ComponentTokens<"Select">;
};

type TreeSelectOptionsProps<T> = {
  options: T[];
  closeMenu: () => void;
} & OptionProps<T>;

type TreeSelectOptionProps<T> = {
  option: T;
  closeMenu: () => void;
} & OptionProps<T> &
  TokenProps<"Select">;

type OptionProps<T> = {
  level?: number;
  getOptionLabel: (item: T) => React.ReactNode;
  getValueLabel?: (item: T) => React.ReactNode;
  getItems: (item: T) => T[];
  onChange: (item: T | undefined) => void;
};

const levelClasses = ["", "pl-2", "pl-4", "pl-6", "pl-8", "pl-10", "pl-12"];

export default function TreeSelect<T>({
  name,
  value,
  label,
  help,
  error,
  placeholder,
  disabled,
  options,
  getOptionLabel,
  getValueLabel,
  getItems,
  className,
  required,
  onChange: propsOnChange,
  ...props
}: TreeSelectProps<T>) {
  const tokens = useTokens("Select", props.tokens);

  const id = `input-${name}`;

  const toggleRef = React.useRef(null);
  //used only for form submit on enter
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const valueLabelFn = getValueLabel || getOptionLabel;
  const valueLabel = value ? valueLabelFn(value) : placeholder;

  const { getToggleButtonProps, getMenuProps, isOpen, reset, closeMenu } = useSelect<T>({
    items: options,
    labelId: id,
  });

  const selectClassName = cx(
    "block w-full text-left cursor-default",
    tokens.Select.master,
    tokens.Select.padding,
    tokens.Select.margin,
    tokens.Select.borderColor,
    tokens.Select.borderRadius,
    tokens.Select.backgroundColor,
    tokens.Select.boxShadow,
    tokens.Select.fontSize,
    tokens.Select.lineHeight,
    { [tokens.Select.error]: error },
    { [tokens.Select.disabled]: disabled }
  );

  const listClassName = cx(tokens.List.master, tokens.List.borderRadius, tokens.List.boxShadow, { invisible: !isOpen });

  const listInnerClassName = cx(
    tokens.List.inner.margin,
    tokens.List.inner.borderRadius,
    tokens.List.inner.backgroundColor,
    tokens.List.inner.boxShadow,
    tokens.List.inner.outline
  );

  const onChange = (item: T | undefined) => {
    if (disabled) return;
    inputRef.current?.focus();
    propsOnChange(item);
  };

  const clear = (event: React.MouseEvent<unknown>) => {
    event.stopPropagation();

    onChange(undefined);
    reset();
  };

  const closeIcon = useIcon("dismiss", undefined, { size: 3 });

  return (
    <Field required={required} id={id} label={label} help={help} error={error} containerClassName={className}>
      <input className={tokens.Select.input} ref={inputRef} />
      <div className="relative w-full" ref={containerRef}>
        <button
          className={selectClassName}
          type="button"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'" +
              " fill='none'%3e%3cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%239fa6b2' stroke-width='1.5'" +
              " stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e\")",
            backgroundSize: "1.5rem 1.5rem",
            backgroundPosition: "right 0.5rem center",
            backgroundRepeat: "no-repeat",
          }}
          {...getToggleButtonProps({ ref: toggleRef })}
        >
          <div className="flex items-center justify-between">
            <div className="flex-grow mr-3 flex-wrap">{valueLabel}</div>
            <div className="flex items-center flex-shrink-0 text-gray-400">
              <div className="p-2 -m-2 hover:text-gray-700 flex align-center" onClick={clear}>
                {closeIcon}
              </div>
              <div className="pl-2">
                <div className="border-r border-gray-200">&nbsp;</div>
              </div>
            </div>
          </div>
        </button>
        <Popover className="z-50" targetRef={toggleRef} position={positionMatchWidth}>
          {isOpen && !disabled && (
            <div className={listClassName} {...getMenuProps()}>
              <div className={listInnerClassName}>
                <div className="max-h-48 overflow-y-auto">
                  <TreeSelectOptions
                    options={options}
                    getOptionLabel={getOptionLabel}
                    getItems={getItems}
                    onChange={onChange}
                    closeMenu={closeMenu}
                  />
                </div>
              </div>
            </div>
          )}
        </Popover>
      </div>
    </Field>
  );
}

function TreeSelectOptions<T>({ options, ...props }: TreeSelectOptionsProps<T>) {
  return (
    <>
      {options.map((option, key) => (
        <TreeSelectOption key={key} {...props} option={option} />
      ))}
    </>
  );
}

function TreeSelectOption<T>({
  level = 0,
  option,
  getOptionLabel,
  getItems,
  onChange,
  closeMenu,
  ...props
}: TreeSelectOptionProps<T>) {
  const tokens = useTokens("Select", props.tokens);
  const [expanded, setExpanded] = React.useState(false);

  const childOptions = getItems(option);

  const onItemClick = () => {
    if (childOptions.length > 0) {
      setExpanded((current) => !current);
    } else {
      onChange(option);
      closeMenu();
    }
  };

  const iconProps = { className: "pr-2", size: 3 };
  const expanderOpenIcon = useIcon("expanderOpen", undefined, iconProps);
  const expanderCloseIcon = useIcon("expanderClose", undefined, iconProps);

  const icon = expanded ? expanderCloseIcon : expanderOpenIcon;

  const itemClassName = cx(
    tokens.Item.base.master,
    tokens.Item.base.padding,
    tokens.Item.base.fontSize,
    tokens.Item.base.lineHeight,
    tokens.Item.base.color,
    "cursor-default select-none"
  );

  const innerItemClassName = cx("flex items-center", levelClasses[level]);

  const labelClassName = cx({
    "pl-6": childOptions.length === 0,
    "pl-1": childOptions.length > 0,
  });

  return (
    <div>
      <div className={itemClassName} onClick={onItemClick}>
        <div className={levelClasses[level]}>
          <div className={innerItemClassName}>
            {childOptions.length > 0 && icon}
            <div className={labelClassName}>{getOptionLabel(option)}</div>
          </div>
        </div>
      </div>
      {expanded && childOptions.length > 0 && (
        <TreeSelectOptions
          level={level + 1}
          options={childOptions}
          getOptionLabel={getOptionLabel}
          getItems={getItems}
          onChange={onChange}
          closeMenu={closeMenu}
        />
      )}
    </div>
  );
}
