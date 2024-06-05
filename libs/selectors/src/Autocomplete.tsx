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

import { useCombobox, UseComboboxStateChangeTypes } from "downshift";

import Popover, { positionMatchWidth } from "@reach/popover";

import { Badge } from "@tiller-ds/core";
import { Input } from "@tiller-ds/form-elements";
import { useLabel } from "@tiller-ds/intl";
import { ComponentTokens, cx, useIcon, useTokens } from "@tiller-ds/theme";

export type AutocompleteProps<T extends {}> = {
  /**
   * Transforms the component into multiple selection of options.
   * Enabling this automatically sets the maxItems prop to the content length.
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
   * Value passed through from validation indicating to display the error on the component.
   */
  error?: React.ReactNode;
  /**
   * Function that defines filtering of the options on the frontend.
   * Needs to be enabled if an array is given to the component via options prop instead of an async fetch!
   * Useful for seamless filtering without loading animations, since all the work is done on frontend.
   * Set as a function that compares each option from the dataset with the user's input.
   *
   * @example
   * filter = {(name: string, option) => option.name.toLowerCase().includes(name.toLowerCase())}
   */
  filter?: (query: string, item: T) => boolean;
  /**
   * Function for determining the look of the offered custom item when typing inside the component.
   *
   * Gives the component **ability to add custom items** and show them in the popup display.
   * Return value of this prop also determines the shape of the item handed over by _onAddCustomItem_ prop.
   *
   * When adding custom items, the color of added items will be the secondary color from your config.
   *
   * **Note**: Persisting custom options inside the component is not possible if _onAddCustomItem_ prop is not used alongside this one.
   *
   * @component
   * @example adding a prefix to tags
   * getCustomItem = {(tag: string) => ("#" + tag)}
   *
   * @component
   * @example working with complex types
   * getCustomItem = {(tag: string) => {
   *                 const name = tag.split(" ")[0];
   *                 const surname = tag.split(" ")[1];
   *                 const item: Item = {
   *                   name: name,
   *                   surname: surname ?? "",
   *                   username: surname
   *                     ? tag[0].toLowerCase() + surname.toLowerCase()
   *                     : tag[0].toLowerCase() ?? "",
   *                 };
   *                 return item;
   *               }}
   */
  getCustomItem?: (item: string) => T;
  /**
   * Function that determines the output of selected values on field.
   * Return value is string(!) as opposed to React.ReactNode on SelectField.
   * Default behaviour: shows number of selected items if the number is larger than 1.
   *
   * @example with values
   * getMultipleSelectedLabel = {(items: Item[]) => (items.map(item => `${item.name} ${item.surname}`).join(", "))}
   *
   * @example with number of values
   * getMultipleSelectedLabel = {(items: Item[]) => (`${items.length} values selected`)}
   */
  getMultipleSelectedLabel?: (array: T[]) => string;
  /**
   * Function determining how the item will be displayed in the dropdown menu (not exclusively text).
   *
   * If you wish to have the same display in the menu as the display in the field then this prop is not required,
   * 'itemToString' is sufficient. Define this prop only if you wish to have a complex display in the menu.
   *
   * Defining this prop removes bolding of the matched text in the menu since the component always
   * uses this prop to show the items in the menu (you can use this prop instead of 'itemToString' if
   * 'allowMultiple' is not enabled, otherwise you must use it alongside 'itemToString').
   *
   * **Note**: this prop is not compatible with 'tags' prop because tags variant requires 'itemToString' prop to display items in a badge.
   *
   * @example
   * getOptionLabel = {(item: Item) => {(
   *     <div className="flex items-center justify-between flex-wrap">
   *       <div>
   *         {item.name} {item.surname}
   *       </div>
   *       <div className="flex-shrink-0 text-sm leading-5 text-gray-500">@{item.username}</div>
   *     </div>
   *   )}
   */
  getOptionLabel?: (item: T) => React.ReactNode;
  /**
   * Function describing what property of the object the component will treat as a value. Required because
   * comparison between objects requires a unique value (typically id) to properly compare two objects
   * from different arrays.
   *
   * @example
   * getOptionValue = {(item: Item) => item.id}
   */
  getOptionValue?: (item: T) => unknown;
  /**
   * The help text displayed below the text input field.
   */
  help?: React.ReactNode;
  /**
   * Function determining what property of an item (selected from a dropdown list) is shown in the menu and
   * what property of an item is shown when the item is chosen (if 'allowMultiple' is disabled).
   * If you wish to show a more complex display of an item in the menu, use 'getOptionLabel' instead or alongside this prop
   * (depending on the 'allowMultiple' prop).
   *
   * **Note**: this prop is required when 'allowMultiple' is not enabled (because it's required to
   * set the value of the input field on item selection) and when 'tags' prop is enabled (in order to display the item in a badge).
   *
   * @example
   * itemToString = {(item: Item) => `${item.name} ${item.surname}`}
   */
  itemToString?: (item: T) => string;
  /**
   * Represents the label above the text input field.
   */
  label?: React.ReactNode;
  /**
   * Determines the maximum number of displayed options displayed as a dropdown list when the component is clicked.
   * For displaying all content, set this value to the length of the content array.
   *
   * When multiple selection is enabled, this value is automatically set to the content length for ease of use.
   */
  maxItems?: number;
  /**
   * The accessor value for the input field component (for validation, fetching, etc.).
   */
  name: string;
  /**
   * Enables the possibility of persisting custom items inside the component by allowing you to execute the desired action
   * (e.g. call to backend or setting state) once a new custom item has been added.
   *
   * The item handed over by this function has the shape of the item returned by _getCustomItem_ prop.
   *
   * Without defining the logic for persistence here new custom items only stay inside the component until they are unselected.
   *
   * **Note**: this prop should be used alongside the _getCustomItem_ prop.
   */
  onAddCustomItem?: (item: T) => void;

  /**
   * **DEPRECATED.**
   *
   * Replaced with _onAddCustomItem_ (which is more flexible), but still usable for tags.
   *
   * **Do not** use alongside _onAddCustomItem_.
   */
  onAddCustomTag?: (item: T) => void;
  /**
   * Defines the behaviour of the component once the focus shifts away from the component.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * Function that handles the behaviour of the component once its state changes.
   */
  onChange: (item: T | T[] | undefined) => void;
  /**
   * Defines the behaviour of the component once the state resets.
   */
  onReset?: () => void;
  /**
   * For fetching an array of options from backend (async) or by passing an array of options.
   *
   * **Important**: if passing an array the filter prop must also be defined, otherwise filtering while typing will not work.
   */
  options: ((query: string) => Promise<T[]>) | T[];
  /**
   * The placeholder displayed inside the text input field.
   */
  placeholder?: string;
  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;
  /**
   * Function representing how the component handles the displayed array of items.
   * Turned off by default because of generic types, but recommended to use for intuitiveness.
   *
   * When working with tags the badges displayed below the field are not sorted.
   *
   * @example
   * sort = {(items: Item[]) => items.sort((a, b) => a.name.localeCompare(b.name))}
   */
  sort?: (items: T[]) => T[];

  /**
   * A unique identifier for testing purposes, equivalent to the 'data-testid' attribute.
   * This identifier can be used in testing frameworks like Jest or Cypress to locate specific elements for testing.
   * It helps ensure that UI components are behaving as expected across different scenarios.
   * @type {string}
   * @example
   * // Usage:
   * <MyComponent testId="my-component" />
   * // In tests:
   * getByTestId('my-component');
   */
  testId?: string;

  /**
   * Tooltip icon and text (on icon hover) displayed on the right of the label.
   */
  tooltip?: React.ReactNode;

  /**
   * Toggle for transforming the field into a multiselect field with tags.
   *
   * **Note**: Requires 'allowMultiple' and 'itemToString' (for displaying text inside the tag) props in order to work.
   */
  tags?: boolean;

  /**
   * Enables the contained variant for the tags by placing the tags inside the field component itself
   * to give it a contained look and feel.
   */
  tagsContained?: boolean;

  /**
   * The value(s) of the field sent on submit and/or retrieved on component render.
   */
  value?: T | T[] | null;

  /**
   * Function or a string that determines how the input value should be transformed when the user types into the input field.
   * In case it's a function, it will be called every time the input value changes. The function can then modify the value as needed and return the modified value.
   */
  valueTransform?: "uppercase" | "lowercase" | "capitalize" | ((value: string) => string);
} & AutocompleteTokensProps;

type AutocompleteTokensProps = {
  autocompleteTokens?: ComponentTokens<"Autocomplete">;
  selectTokens?: ComponentTokens<"Select">;
};

function Autocomplete<T extends {}>({
  name,
  value,
  options,
  itemToString = (item: T) => item.toString(),
  getOptionLabel,
  getOptionValue,
  label,
  placeholder,
  help,
  tooltip,
  filter,
  required,
  allowMultiple = false,
  getMultipleSelectedLabel,
  error,
  maxItems = 4,
  sort,
  tags,
  tagsContained,
  getCustomItem,
  onAddCustomItem = () => null,
  onAddCustomTag = () => null,
  onReset,
  onBlur,
  disabled,
  className,
  children,
  onChange,
  valueTransform,
  ...props
}: AutocompleteProps<T>) {
  const autocompleteTokens = useTokens("Autocomplete", props.autocompleteTokens);
  const selectTokens = useTokens("Select", props.selectTokens);
  const selectedIcon = useIcon("completed", undefined);
  const loadingIcon = useIcon("loading", undefined, { size: 3 });
  const searchIcon = useIcon("search", undefined, { size: 4 });
  const openExpanderIcon = useIcon("openExpander", undefined, { size: 3 });
  const closeExpanderIcon = useIcon("closeExpander", undefined, { size: 3 });
  const removeIcon = useIcon("dismiss", undefined, { size: 3 });

  const mounted = React.useRef(false);
  const toggleRef = React.useRef<HTMLInputElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const menuRef = React.useRef<HTMLElement>(null);

  const [loading, setLoading] = React.useState(false);

  const [customOptions, setCustomOptions] = React.useState<T[]>([]);
  const [filteredOptions, setFilteredOptions] = React.useState<T[]>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<T[]>(Array.isArray(value) && allowMultiple ? value : []);

  const id = `input-${name}`;

  const validateUsage = () =>
    ((Array.isArray(value) && allowMultiple) || (!Array.isArray(value) && !allowMultiple) || value === undefined) &&
    ((Array.isArray(options) && filter) || (!Array.isArray(options) && !filter)) &&
    ((tags && allowMultiple) || !tags);

  const validateValue = () =>
    (Array.isArray(value) && allowMultiple && value.length !== 0 && selectedOptions.length > 0) ||
    (!Array.isArray(value) && value);

  const arrayIncludes = (options: T[], option: T) =>
    getOptionValue
      ? (options.some((selectedOption) => getOptionValue(selectedOption) === getOptionValue(option)) as boolean)
      : options.includes(option);

  const selectedFn = (array: T[]) => (getMultipleSelectedLabel ? getMultipleSelectedLabel(array) : undefined);
  const defaultFn = (item: T | string) => (typeof item === "string" ? item : item["label"]);
  const optionLabelFn = getOptionLabel || children || defaultFn;

  const selectedPlaceholder = `${selectedOptions.length} selected`;
  const placeholderLabel =
    selectedFn(selectedOptions) ||
    (validateUsage() ? (selectedOptions.length > 0 ? selectedPlaceholder : undefined) : false);

  const safeItemToString = (value: T | null | undefined) => (value ? itemToString(value) : "");
  const initialInputValue = !Array.isArray(value) && !allowMultiple ? safeItemToString(value) : "";

  const selectionTypes: unknown[] = [
    useCombobox.stateChangeTypes.InputBlur,
    useCombobox.stateChangeTypes.InputKeyDownEnter,
    useCombobox.stateChangeTypes.ItemClick,
    useCombobox.stateChangeTypes.FunctionReset,
    useCombobox.stateChangeTypes.InputKeyDownArrowUp,
  ];
  const {
    getInputProps,
    getItemProps,
    getMenuProps,
    getComboboxProps,
    highlightedIndex,
    setHighlightedIndex,
    toggleMenu,
    isOpen,
    reset,
    inputValue,
    setInputValue,
  } = useCombobox<T>({
    items: filteredOptions,
    labelId: id,
    itemToString: safeItemToString,
    initialInputValue,
    onStateChange: (state) => {
      const { type, selectedItem } = state as { type: UseComboboxStateChangeTypes; selectedItem?: T };

      if (type === useCombobox.stateChangeTypes.FunctionToggleMenu && !allowMultiple) {
        setHighlightedIndex(-1);
      }

      if (type === useCombobox.stateChangeTypes.InputChange) {
        isEmpty.current = !state.inputValue;
        if (allowMultiple) {
          setHighlightedIndex(0);
        }
      }

      if (type === useCombobox.stateChangeTypes.InputKeyDownArrowUp) {
        if (highlightedIndex === 0 && !allowMultiple) {
          setHighlightedIndex(-1);
        } else if (highlightedIndex === -1 && !allowMultiple) {
          setHighlightedIndex(-1);
        } else if (highlightedIndex === -1 && allowMultiple) {
          setHighlightedIndex(filteredOptions.length - 1);
        }
      }

      if (
        type === useCombobox.stateChangeTypes.InputKeyDownArrowDown &&
        !allowMultiple &&
        highlightedIndex === maxItems - 1
      ) {
        setHighlightedIndex(0);
      }

      if (selectionTypes.indexOf(type) !== -1 && !allowMultiple) {
        if (selectedItem !== undefined && selectedItem !== null) {
          onChange(selectedItem);
          if (getCustomItem && !customOptions.includes(selectedItem)) {
            setCustomOptions([...customOptions, selectedItem]);
            onAddCustomItem(selectedItem);
            if (tags) onAddCustomTag(selectedItem);
          }
        } else {
          const stringOptions = filteredOptions.map((option) => safeItemToString(option).toLowerCase());
          if (stringOptions.includes(inputValue.toLowerCase())) {
            const foundItem = filteredOptions[stringOptions.indexOf(inputValue.toLowerCase())];
            onChange(foundItem);
            setInputValue(safeItemToString(foundItem));
          } else {
            onChange(undefined);
          }
        }
      }
    },
  });

  const onDefinedBlur = () => {
    mounted.current = false;
    if (!value && !allowMultiple) {
      setInputValue("");
    }
    if (allowMultiple) {
      setInputValue("");
    }
    setLoading(false);
  };

  const isEmpty = React.useRef(!!initialInputValue);

  const noResultsText = useLabel("autocompleteNoResults", "No results for:");
  const addTagText = useLabel("autocompleteAddTag", "Add tag:");
  const addItemText = useLabel("autocompleteAddItem", "Add item:");
  const noTagsText = useLabel("autocompleteNoTags", "No tags selected");

  const noResultsPlaceholderContent = inputValue?.length > 0 ? `${noResultsText} ${inputValue}` : null;
  const hasContent = filteredOptions.length > 0 || (noResultsPlaceholderContent && !loading);
  const highlightedOption = filteredOptions[highlightedIndex];

  const fetchOptions = async (options: T[], inputValue: string) => {
    if (filter) {
      return options.filter((item: T) => {
        return filter(inputValue, item);
      });
    }
    return [] as T[];
  };

  const mockPromise = async (callback: Promise<T[]>) => {
    const [result] = await Promise.all([
      callback,
      new Promise((resolve) => {
        resolve();
      }),
    ]);
    return result as T[];
  };

  const loadOptions = (inputValue: string) => {
    let finalOptions: (query: string) => Promise<T[]> = () => Promise.resolve([] as T[]);
    if (!Array.isArray(options)) {
      finalOptions = options;
    } else if (Array.isArray(options) && filter) {
      finalOptions = (inputValue) => mockPromise(fetchOptions(options, inputValue));
    }
    return finalOptions(inputValue);
  };

  React.useEffect(() => {
    if (isOpen) {
      let cancelled = false;
      if (options) {
        setLoading(true);
        loadOptions(inputValue)
          .then((response) => {
            const uniqueResponse = Array.from(new Set(response));
            if (!cancelled) {
              setLoading(false);
              if (mounted.current && !tags && !inputValue) {
                setFilteredOptions(selectedToTop(uniqueResponse, selectedOptions));
              } else if (inputValue) {
                if (getCustomItem) {
                  setFilteredOptions(
                    tags
                      ? getDifference([...uniqueResponse, ...Array.of(getCustomItem(inputValue))], selectedOptions)
                      : [...uniqueResponse, ...Array.of(getCustomItem(inputValue))],
                  );
                } else {
                  setFilteredOptions(uniqueResponse);
                }
              } else if (tags && mounted.current) {
                setFilteredOptions(removeSelected(uniqueResponse));
              } else {
                setFilteredOptions(selectedToTop(uniqueResponse, selectedOptions));
              }
            }
          })
          .then(() => {
            if (mounted.current) {
              mounted.current = false;
            }
          });

        return () => {
          cancelled = true;
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, inputValue, sort, isOpen, tags, getCustomItem]);

  const lastValue = React.useRef<T | T[] | null | undefined>();
  React.useEffect(() => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions(value);
      }
    } else if (value) {
      setInputValue(safeItemToString(value));
    }

    if (!value && lastValue.current) {
      reset();
      setInputValue("");
      if (allowMultiple) {
        setSelectedOptions([]);
      }
    }

    lastValue.current = value;
  }, [value, reset]);

  React.useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.focus();
    }
    if (!isOpen) {
      onDefinedBlur();
    }
  }, [isOpen]);

  const lastSelectedOptions = React.useRef<T[]>();
  React.useEffect(() => {
    if (allowMultiple && selectedOptions.length > 0) {
      onChange(selectedOptions);
    }
    if (lastSelectedOptions.current?.length === 1 && selectedOptions.length === 0) {
      onChange(selectedOptions);
    }
    lastSelectedOptions.current = selectedOptions;
  }, [selectedOptions]);

  const listClassName = cx(
    {
      invisible: !isOpen,
    },
    autocompleteTokens.List.base.master,
    autocompleteTokens.List.base.borderRadius,
    autocompleteTokens.List.base.boxShadow,
    autocompleteTokens.List.base.outline,
  );

  const listInnerClassName = cx(
    autocompleteTokens.List.inner.margin,
    autocompleteTokens.List.inner.borderRadius,
    autocompleteTokens.List.inner.backgroundColor,
    autocompleteTokens.List.inner.boxShadow,
    autocompleteTokens.List.inner.outline,
  );

  const loadingClassName = cx(
    {
      invisible: !loading,
    },
    autocompleteTokens.Loading.overlay.master,
    autocompleteTokens.Loading.overlay.backgroundColor,
    autocompleteTokens.Loading.overlay.opacity,
  );

  const selectItemClassName = cx(
    selectTokens.Item.base.master,
    selectTokens.Item.base.padding,
    selectTokens.Item.base.fontSize,
    selectTokens.Item.base.lineHeight,
    selectTokens.Item.base.color,
  );

  const itemClassName = (bold: boolean, selected: boolean, custom: boolean) =>
    cx(
      autocompleteTokens.Item.base.regular,
      { [autocompleteTokens.Item.base.selected]: selected && !custom },
      { [autocompleteTokens.Item.base.selectedCustom]: selected && custom },
      { [autocompleteTokens.Item.accentuated]: bold },
    );

  const activeClassName = (bold: boolean, selected: boolean, hovered: boolean, custom: boolean) =>
    cx(
      autocompleteTokens.Item.active.regular,
      { [autocompleteTokens.Item.active.selected]: selected },
      { [autocompleteTokens.Item.active.hovered]: selected && hovered && !custom },
      { [autocompleteTokens.Item.active.hoveredCustom]: selected && hovered && custom },
      { [autocompleteTokens.Item.accentuated]: bold },
    );

  const clearClassName = cx(
    { [autocompleteTokens.Clear.active]: !disabled },
    autocompleteTokens.Clear.base.padding,
    autocompleteTokens.Clear.base.margin,
    "flex align-center",
  );

  const selectClassName = cx(
    autocompleteTokens.Select.base,
    { [autocompleteTokens.Select.active]: !disabled },
    { "pt-2.5": tags && tagsContained && !value },
  );

  const loadingInnerClassName = cx(
    autocompleteTokens.Loading.inner.padding,
    autocompleteTokens.Loading.inner.margin,
    "bg-white",
  );

  const tagPlaceholderClassName = cx(
    autocompleteTokens.tagPlaceholder.master,
    autocompleteTokens.tagPlaceholder.fontSize,
    autocompleteTokens.tagPlaceholder.textColor,
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    const nativeEvent = event.nativeEvent as any;
    if (loading && (event.key === "Enter" || event.key === "ArrowUp" || event.key === "ArrowDown")) {
      // Prevent Downshift's default behavior.
      nativeEvent.preventDownshiftDefault = true;
    }

    if (allowMultiple && event.key === "Enter" && highlightedOption !== undefined) {
      nativeEvent.preventDownshiftDefault = true;
      checkItem(
        -1,
        inputValue.length > 0 &&
          getCustomItem &&
          getDifference(filteredOptions, Array.of(getCustomItem(inputValue))).length === 0,
      );
    }
  };

  const onItemClick = (event: React.MouseEvent, index: number, customItem?: boolean) => {
    event.nativeEvent.preventDefault();
    checkItem(index, customItem);
  };

  const removeSelected = (array: T[]) => {
    let removeSelected;
    if (getOptionValue) {
      removeSelected = array.filter((option) => !arrayIncludes(selectedOptions, option));
    } else {
      removeSelected = array.filter((option) => !selectedOptions.includes(option));
    }
    return sort ? sort(removeSelected) : removeSelected;
  };

  const reorderOptions = () => {
    if (tags && Array.isArray(options)) {
      setFilteredOptions(removeSelected(options));
    } else if (Array.isArray(options)) {
      setFilteredOptions(selectedToTop(options, selectedOptions));
    } else {
      setFilteredOptions(selectedToTop(filteredOptions, selectedOptions));
    }
  };

  const checkItem = (index: number, customItem?: boolean) => {
    const selectedOption = filteredOptions[index] || highlightedOption;
    if (allowMultiple && (highlightedOption || index > -1)) {
      if (getOptionValue) {
        if (arrayIncludes(selectedOptions, selectedOption)) {
          const filteredOptions = selectedOptions.filter(
            (option) => !(getOptionValue(option) === getOptionValue(selectedOption)),
          );
          setSelectedOptions(filteredOptions);
        } else {
          if (customItem) {
            setCustomOptions([...customOptions, selectedOption]);
            onAddCustomItem(selectedOption);
            if (tags) onAddCustomTag(selectedOption);
          }
          setSelectedOptions([...selectedOptions, selectedOption]);
        }
      } else if (selectedOptions.includes(selectedOption)) {
        const filteredOptions = selectedOptions.filter((option) => !(option === selectedOption));
        setSelectedOptions(filteredOptions);
      } else {
        if (customItem) {
          setCustomOptions([...customOptions, selectedOption]);
          onAddCustomItem(selectedOption);
          if (tags) onAddCustomTag(selectedOption);
        }
        setSelectedOptions([...selectedOptions, selectedOption]);
      }
      if (customItem) {
        mounted.current = true;
        reorderOptions();
        setInputValue("");
      }
    }
  };

  const getDifference = (array1: T[], array2: T[]) => {
    if (getOptionValue) {
      return array1.filter((object1) => {
        return !array2.some((object2) => {
          return getOptionValue(object1) === getOptionValue(object2);
        });
      });
    } else {
      return array1.filter((item) => !array2.includes(item));
    }
  };

  const selectedToTop = (array: T[], selected: T[]) => {
    const unselectedArray = getDifference(array, selected);
    if (sort) {
      sort(unselectedArray);
      unselectedArray.unshift(...sort(selected));
    } else {
      unselectedArray.unshift(...selected);
    }
    return unselectedArray as T[];
  };

  const focusInput = () => {
    if (toggleRef.current && !tagsContained) {
      toggleRef.current?.focus();
    }
    if (inputRef.current && tagsContained) {
      inputRef.current?.focus();
    }
  };

  const onClick = () => {
    reorderOptions();
    mounted.current = true;
    toggleMenu();
    focusInput();
  };

  const clear = (event: React.MouseEvent<unknown>) => {
    if (disabled) {
      return;
    }
    if (onReset) {
      onReset();
    }

    event.stopPropagation();

    if (allowMultiple) {
      setSelectedOptions([]);
    }
    reset();
    setInputValue("");
    focusInput();
  };

  const SelectItems = () => {
    const lastIndex = allowMultiple ? filteredOptions.length : maxItems;
    if (getCustomItem) {
      return (
        <>
          {filteredOptions
            .slice(0, lastIndex === 0 && getCustomItem ? 1 : lastIndex)
            .map((option, index) =>
              !inputValue || index !== filteredOptions.length - 1 ? (
                <SelectItem key={index} index={index} option={option} />
              ) : (
                inputValue &&
                !arrayIncludes(filteredOptions.slice(0, filteredOptions.length - 1), getCustomItem(inputValue)) && (
                  <SelectItem key={index} custom={true} option={getCustomItem(inputValue)} index={index} />
                )
              ),
            )}
        </>
      );
    }
    return (
      <>
        {filteredOptions.slice(0, lastIndex).map((option, index) => (
          <SelectItem key={index} index={index} option={option} />
        ))}
      </>
    );
  };

  const SelectItem = ({ option, index, custom }: { option: T; index: number; custom?: boolean }) => {
    const label = safeItemToString(option);
    const checkFirstChar = label.toLowerCase()[0] === inputValue?.toLowerCase()[0];
    const checkFirstWord = label.split(" ")[0].toLowerCase().includes(inputValue.split(" ")[0].toLowerCase());
    const boldAll = (inputValue && !(checkFirstChar && checkFirstWord)) as boolean;
    const complexSelectedClassName = cx(
      autocompleteTokens.Item.complex.selected.master,
      autocompleteTokens.Item.complex.selected.color,
      autocompleteTokens.Item.complex.selected.size,
    );

    const selected = getOptionValue
      ? (arrayIncludes(selectedOptions, option) as boolean)
      : selectedOptions.includes(option);
    const hovered = highlightedIndex === index;

    const customContains = customOptions.includes(option);
    const selectedIconClassName = !customContains ? "text-primary" : "text-secondary";
    const finalSelectedIcon = React.cloneElement(selectedIcon, { className: selectedIconClassName });

    const contentWrapper = (children: React.ReactNode, tag?: boolean) => {
      return (
        <div
          {...getItemProps({
            item: option,
            index,
            onClickCapture: (event) => onItemClick(event, index, tag),
            onMouseDownCapture: (event) => onItemClick(event, index, tag),
          })}
          className={
            highlightedIndex === index
              ? activeClassName(!getOptionLabel ? !tag && boldAll : false, selected, hovered, customContains)
              : itemClassName(!getOptionLabel ? !tag && boldAll : false, selected, customContains)
          }
        >
          {children}
        </div>
      );
    };
    if ((selected || inputValue) && !getOptionLabel) {
      return (
        <>
          {!custom
            ? contentWrapper(
                <>
                  <div className="truncate w-10/12">
                    {label.substring(0, inputValue?.length)}
                    <span className={`${inputValue && checkFirstChar && checkFirstWord && "font-bold"}`}>
                      {label.substring(inputValue?.length)}
                    </span>
                  </div>
                  {allowMultiple && selected && finalSelectedIcon}
                </>,
              )
            : getCustomItem &&
              contentWrapper(
                <>
                  {`${tags ? addTagText : addItemText} `}
                  {tags ? (
                    <Badge color="secondary" dot={true} small={true}>
                      {safeItemToString(getCustomItem(inputValue))}
                    </Badge>
                  ) : (
                    <span className="font-bold">{safeItemToString(getCustomItem(inputValue))}</span>
                  )}
                </>,
                true,
              )}
        </>
      );
    } else
      return (
        <>
          {contentWrapper(
            <div className={autocompleteTokens.Item.complex.container}>
              <div className={autocompleteTokens.Item.complex.element}>
                {getOptionLabel ? optionLabelFn(option) : safeItemToString(option)}
              </div>
              {allowMultiple && <div className={complexSelectedClassName}>{selected && finalSelectedIcon}</div>}
            </div>,
          )}
        </>
      );
  };

  const content =
    filteredOptions.length === 0 && !loading ? (
      <div className={selectItemClassName}>{noResultsPlaceholderContent}</div>
    ) : (
      <>
        <SelectItems />
        <hr className="mx-4" />
        {!allowMultiple && maxItems < filteredOptions.length && (
          <span className="block px-4 py-2 text-sm font-semibold text-gray-400">...</span>
        )}
      </>
    );

  const tagsDisplay = (
    <div
      className={`flex flex-wrap ${tagsContained ? "p-1" : selectedOptions.length > 0 && "pt-1"} z-50 rounded-md`}
      ref={tagsContained ? toggleRef : undefined}
    >
      {allowMultiple && selectedOptions.length > 0
        ? (sort && !isOpen ? sort(selectedOptions) : selectedOptions).map((v, key) => (
            <Badge
              key={key}
              dot={true}
              color={!arrayIncludes(customOptions, v) ? "primary" : "secondary"}
              onRemoveButtonClick={() => {
                const filtered = selectedOptions.filter((toFilter) => {
                  if (getOptionValue) {
                    const checkEquality = getOptionValue(toFilter) !== getOptionValue(v);
                    if (!checkEquality) filteredOptions.push(v);
                    return checkEquality;
                  } else {
                    const checkEquality = toFilter !== v;
                    if (!checkEquality) filteredOptions.push(v);
                    return checkEquality;
                  }
                });
                setSelectedOptions(filtered);
              }}
              className="m-1"
            >
              {safeItemToString(v)}
            </Badge>
          ))
        : tagsContained && <div className={tagPlaceholderClassName}>{noTagsText}</div>}
    </div>
  );

  return (
    <>
      <Input
        className={className}
        id={id}
        testId={props.testId || id}
        label={label}
        tooltip={tooltip}
        help={help}
        required={required}
        error={error}
        name={allowMultiple ? undefined : name}
        disabled={validateUsage() ? disabled : true}
        placeholder={
          placeholderLabel ? placeholderLabel : validateUsage() ? placeholder : "Props misused. See docs for more info."
        }
        inlineTrailingIcon={
          <div className={autocompleteTokens.Loading.container}>
            {loading && <div className={loadingInnerClassName}>{loadingIcon}</div>}
            {!disabled && validateUsage() && validateValue() && (
              <div className={clearClassName} onClick={clear}>
                {removeIcon}
              </div>
            )}
            {validateUsage() && (
              <div className="flex space-x-1 items-center">
                <div className={value || error ? autocompleteTokens.Separator.container : undefined}>
                  {(validateValue() || error) && <div className={autocompleteTokens.Separator.inner}>&nbsp;</div>}
                </div>
                <div className={selectClassName} onClick={!disabled ? onClick : undefined}>
                  {!allowMultiple ? searchIcon : isOpen ? closeExpanderIcon : openExpanderIcon}
                </div>
              </div>
            )}
          </div>
        }
        extend={tags && tagsContained && tagsDisplay}
        addonBelow={tags && !tagsContained && tagsDisplay}
        {...getInputProps({
          id: id,
          ref: !tagsContained ? toggleRef : inputRef,
          refKey: "inputRef",
          value: highlightedOption && !allowMultiple ? safeItemToString(highlightedOption) : inputValue,
          onBlur: onBlur ? onBlur : undefined,
          onKeyDown,
          onClick,
          onInput: (event) => {
            const input = event.target as HTMLInputElement;
            let transformedValue = input.value;
            if (typeof valueTransform === "function") {
              transformedValue = valueTransform(transformedValue);
            } else if (valueTransform === "uppercase") {
              transformedValue = transformedValue.toUpperCase();
            } else if (valueTransform === "lowercase") {
              transformedValue = transformedValue.toLowerCase();
            } else if (valueTransform === "capitalize") {
              transformedValue = transformedValue.charAt(0).toUpperCase() + transformedValue.slice(1);
            }
            input.value = transformedValue;
          },
        })}
        {...getComboboxProps({}, { suppressRefError: true })}
      />
      {allowMultiple && <input className="absolute w-0 h-0" name={name} />}
      <Popover
        className="z-50"
        targetRef={toggleRef}
        position={positionMatchWidth}
        {...getMenuProps({ ref: menuRef }, { suppressRefError: true })}
      >
        {isOpen && hasContent && (
          <div className={listClassName}>
            <div className={listInnerClassName}>
              <div className={autocompleteTokens.Container.outer}>
                <div className={autocompleteTokens.Container.inner}>
                  <div>{content}</div>
                  <div className={loadingClassName}>&nbsp;</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Popover>
    </>
  );
}

export default Autocomplete;
