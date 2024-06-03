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

import { useSelect, UseSelectStateChangeTypes } from "downshift";
import Popover, { positionMatchWidth } from "@reach/popover";

import { Field } from "@tiller-ds/form-elements";
import { useLabel } from "@tiller-ds/intl";
import { ComponentTokens, cx, useIcon, useTokens } from "@tiller-ds/theme";

export type SelectProps<T> = {
  /**
   * Transforms the component into multiple selection of options.
   */
  allowMultiple?: boolean;

  /**
   * If getOptionLabel is not specified, the component defaults to this function.
   */
  children?: (item: T) => React.ReactNode;

  /**
   * Custom additional styling applied to the component.
   */
  className?: string;

  /**
   * Determines whether the component is disabled.
   */
  disabled?: boolean;

  /**
   * Determines when the error will display on the component (ex. meta.touched, meta.error, etc.).
   */
  error?: React.ReactNode;

  /**
   * Function that determines the output of selected values on field.
   * Default behaviour: shows label if one item is selected, otherwise outputs the number of selected items
   * Example: (items: Item[]) => <> {items.map((item, index) => (index === 0 ? "" : ", ") + item.name + " " + item.surname)} </>
   */
  getMultipleSelectedLabel?: (array: T[]) => React.ReactNode;

  /**
   * Function that determines how the component outputs the label of each item displayed on screen.
   * You can define pretty much any display of your items, the component will automatically adjust its width and height accordingly.
   * Example:(item: Item) => <>{item.name} {item.surname}</>
   */
  getOptionLabel?: (item: T) => React.ReactNode;

  /**
   * The help text displayed below the text input field.
   */
  help?: React.ReactNode;

  /**
   * Enables or disables the display of the clear button when a value is present in the select field, suitable for
   * use cases when it is required to always show some value inside the field (blank field is not a possible scenario).
   */
  hideClearButton?: boolean;

  /**
   * Function that determines which item(s) are disabled by checking the desired attributes for said item.
   * Example: (item: Item) => return item.name === "Pero"
   */
  isItemDisabled?: (item: T) => boolean;

  /**
   * Represents the label above the selection field.
   */
  label?: React.ReactNode;

  /**
   * Boolean value for defining whether the component is in the state of loading.
   */
  loading?: boolean;

  /**
   * The accessor value for the input field component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Customizable placeholder if no results are present.
   * Default value: "No results"
   */
  noResultsPlaceholder?: React.ReactNode;

  /**
   * Function that defines the behaviour of the component once the focus shifts away from the component.
   */
  onBlur?: () => void;

  /**
   * Function that handles the behaviour of the component once its state changes.
   */
  onChange: (item: T | T[] | undefined) => void;

  /**
   * Array of options handed to the component for selection.
   */
  options: T[];

  /**
   * The placeholder displayed inside the text input field.
   */
  placeholder?: React.ReactNode;

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * Function representing how the component handles the displayed array of items. Most often something similar to items.sort((a, b) => a.name.localeCompare(b.name))
   */
  sort?: (items: T[]) => T[];

  /**
   * Tooltip icon and text (on icon hover) displayed on the right of the label.
   */
  tooltip?: React.ReactNode;

  /**
   * The initial value(s) of the field.
   */
  value?: T | T[] | null;
} & SelectTokensProps;

type SelectTokensProps = {
  selectTokens?: ComponentTokens<"Select">;
  inputTokens?: ComponentTokens<"Input">;
};

function Select<T>({
  name,
  value,
  options,
  allowMultiple = false,
  getOptionLabel,
  isItemDisabled,
  getMultipleSelectedLabel,
  label,
  noResultsPlaceholder,
  placeholder,
  tooltip,
  required,
  help,
  error,
  loading = false,
  sort,
  hideClearButton,
  disabled,
  className,
  children,
  onChange,
  onBlur,
  ...props
}: SelectProps<T>) {
  const tokens = useTokens("Select", props.selectTokens);
  const inputTokens = useTokens("Input", props.inputTokens);
  const selectedIcon = useIcon("completed");
  const loadingIcon = useIcon("loading", undefined, { size: 4 });
  const warningIcon = useIcon("inputError", undefined, { className: inputTokens.error.Icon.color, size: 5 });
  const removeIcon = useIcon("dismiss", undefined, { size: 3 });

  const id = `input-${name}`;
  const isDisabled = disabled || loading;
  const hasOptions = options.length !== 0;

  const toggleRef = React.useRef<HTMLButtonElement>(null);
  //used only for form submit on enter
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemClickRef = React.useRef<any>(null);

  const selectionTypes: unknown[] = [
    useSelect.stateChangeTypes.MenuKeyDownEnter,
    useSelect.stateChangeTypes.MenuKeyDownSpaceButton,
    useSelect.stateChangeTypes.ItemClick,
  ];

  const [filteredOptions, setFilteredOptions] = React.useState<T[]>([]);

  React.useEffect(() => {
    setFilteredOptions(sort ? sort(options) : options);
  }, [options, sort]);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { getToggleButtonProps, getItemProps, getMenuProps, isOpen, highlightedIndex, reset } = useSelect<T>({
    items: filteredOptions,
    labelId: id,
    selectedItem: null,
    isOpen: isMenuOpen,
    onStateChange: (state) => {
      const { type, selectedItem } = state as { type: UseSelectStateChangeTypes; selectedItem?: T };

      if (selectedItem === itemClickRef.current) {
        itemClickRef.current = null;
        return;
      }

      if (type === useSelect.stateChangeTypes.ItemClick) {
        itemClickRef.current = selectedItem;
        setIsMenuOpen(allowMultiple);
      }

      if (selectionTypes.indexOf(type) !== -1 || type === useSelect.stateChangeTypes.FunctionReset) {
        if (allowMultiple) {
          const currentValue = value && Array.isArray(value) ? [...value] : [];

          if (selectedItem) {
            const index = currentValue.indexOf(selectedItem);

            if (index === -1) {
              currentValue.push(selectedItem);
            } else {
              currentValue.splice(index, 1);
            }

            onChange(currentValue);
          } else {
            onChange([]);
          }
        } else if (selectedItem) {
          onChange(selectedItem);
        }
      } else if (type === useSelect.stateChangeTypes.MenuBlur) {
        setIsMenuOpen(false);
        if (onBlur) {
          onBlur();
        }
        if (Array.isArray(value)) {
          let unselectedArray;
          if (sort) {
            unselectedArray = Array.of(...filteredOptions.filter((item) => !value.includes(item)));
            sort(unselectedArray);
            unselectedArray.unshift(...sort(value));
          } else {
            unselectedArray = Array.of(...options.filter((item) => !value.includes(item)));
            unselectedArray.unshift(...value);
          }

          setFilteredOptions(unselectedArray);
        }
      }
    },
  });

  const selectClassName = cx(
    { [tokens.Select.error]: error },
    { [tokens.Select.disabled]: isDisabled },
    { [tokens.Select.borderColor]: !error },
    { [tokens.Select.boxShadow]: !error },
    tokens.Select.master,
    tokens.Select.margin,
    tokens.Select.fontSize,
    tokens.Select.lineHeight,
    tokens.Select.padding,
    tokens.Select.borderRadius,
    tokens.Select.backgroundColor,
  );

  const listClassName = cx({ invisible: !isOpen }, tokens.List.master, tokens.List.borderRadius, tokens.List.boxShadow);

  const listInnerClassName = cx(
    tokens.List.inner.margin,
    tokens.List.inner.borderRadius,
    tokens.List.inner.backgroundColor,
    tokens.List.inner.boxShadow,
    tokens.List.inner.outline,
  );

  const clearClassName = cx(
    { [tokens.Clear.active]: !isDisabled },
    tokens.Clear.base.padding,
    tokens.Clear.base.margin,
    "flex align-center",
  );

  const activeClassName = (hovered: boolean) =>
    cx(tokens.Item.active.regular, { [tokens.Item.active.hovered]: hovered });

  const loadingInnerClassName = cx(tokens.Loading.inner.padding, tokens.Loading.inner.margin);

  const oldIsOpen = React.useRef<boolean>(isOpen);
  React.useEffect(() => {
    if (oldIsOpen.current && !isOpen) {
      toggleRef.current?.focus();
    }
    oldIsOpen.current = isOpen;
  }, [isOpen]);

  const defaultFn = (item: T) => (typeof item === "string" ? item : item["label"]);
  const defaultIsItemDisabledFn = () => false;
  const optionLabelFn = getOptionLabel || children || defaultFn;
  const isItemDisabledFn = isItemDisabled || defaultIsItemDisabledFn;

  const noResultsText = useLabel("selectNoResults", "No results");
  const placeholderElement = (
    <div className={tokens.placeholder}>
      {options.length !== 0 ? placeholder || <>&nbsp;</> : (noResultsPlaceholder || noResultsText) ?? <>&nbsp;</>}
    </div>
  );
  const singleOptionLabelFn = (singleValue?: T | null) =>
    singleValue ? optionLabelFn(singleValue) : placeholderElement;
  const selectedFn = (array: T[]) =>
    getMultipleSelectedLabel ? getMultipleSelectedLabel(array) : `${array.length} selected`;
  const arrayLabelFn = (array: T[]) => (array.length <= 1 ? singleOptionLabelFn(array[0]) : selectedFn(array));
  const valueLabel = Array.isArray(value) ? arrayLabelFn(value) : singleOptionLabelFn(value);

  const clear = (event: React.MouseEvent<unknown>) => {
    if (isDisabled) {
      return;
    }

    event.stopPropagation();

    onChange(undefined);
    reset();
  };

  const SelectItems = () => (
    <>
      {filteredOptions.map((option: T, index: number) => (
        <SelectItem key={index} index={index} option={option} />
      ))}
    </>
  );

  const SelectItem = ({ option, index }: { option: T; index: number }) => {
    let element = optionLabelFn(option);
    const isDisabled = isItemDisabledFn(option);
    const itemProps = !isDisabled && { ...getItemProps({ item: option, index }) };

    const itemClassName = (selected: boolean) =>
      cx(
        tokens.Item.base.master,
        tokens.Item.base.padding,
        tokens.Item.base.fontSize,
        tokens.Item.base.lineHeight,
        tokens.Item.base.color,
        { [tokens.Item.base.selected]: selected },
        { [tokens.Item.base.disabled]: isDisabled },
      );

    const selectedClassName = cx(tokens.Item.selected.master, tokens.Item.selected.color, tokens.Item.selected.size);

    const hovered = highlightedIndex === index;
    const selected = Array.isArray(value) && value.indexOf(option) !== -1;

    if (allowMultiple) {
      element = (
        <div className={tokens.Item.container}>
          <div className={tokens.Item.element}>{element}</div>
          <div className={selectedClassName}>{selected && selectedIcon}</div>
        </div>
      );
    }

    return (
      <div {...itemProps} className={hovered ? activeClassName(hovered && selected) : itemClassName(selected)}>
        {element}
      </div>
    );
  };

  return (
    <Field
      id={id}
      label={label}
      tooltip={tooltip}
      required={required}
      help={help}
      error={error}
      containerClassName={className}
    >
      <div className={tokens.container} ref={containerRef}>
        <button
          className={selectClassName}
          {...getToggleButtonProps({
            id: id,
            ref: toggleRef,
            disabled: isDisabled,
            onClick: () => setIsMenuOpen(!isMenuOpen),
          })}
          data-testid={id}
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
        >
          <div className={tokens.Button.container}>
            <div className={tokens.Button.value}>{valueLabel}</div>
            <input name={name} className={tokens.Button.input} ref={inputRef} tabIndex={-1} />
            <div className={tokens.Loading.container}>
              {loading && <div className={loadingInnerClassName}>{loadingIcon}</div>}
              {error && warningIcon}
              {!disabled && value && !hideClearButton && !error && (
                <button type="button" className={clearClassName} onClick={clear}>
                  {removeIcon}
                </button>
              )}
              <div className={value || error || loading ? tokens.Separator.container : undefined}>
                {(value || error || loading) && <div className={tokens.Separator.inner}>&nbsp;</div>}
              </div>
            </div>
          </div>
        </button>
        {hasOptions && (
          <Popover
            className="z-50"
            targetRef={toggleRef}
            position={positionMatchWidth}
            {...getMenuProps({ ref: inputRef }, { suppressRefError: true })}
          >
            {isOpen && (
              <div className={listClassName}>
                <div className={listInnerClassName}>
                  <div className={tokens.Items.container}>
                    <SelectItems />
                  </div>
                </div>
              </div>
            )}
          </Popover>
        )}
      </div>
    </Field>
  );
}

export default Select;
