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

import { useField, useFormikContext } from "formik";
import { isEqual } from "lodash";

import { TreeSelect, TreeSelectProps } from "@tiller-ds/selectors";
import useShouldValidate from "./useShouldValidate";
import useFormikBypass from "./useFormikBypass";

type TreeSelectOnlyPropsUnion = "value" | "onChange" | "onBlur" | "error";

export type TreeSelectFieldProps<T> = {
  /**
   * The accessor value for the component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Function describing what property of the object the component will treat as a value.
   */
  getOptionValue?: (item: T) => unknown;
} & Omit<TreeSelectProps<T>, TreeSelectOnlyPropsUnion>;

function find<T>(value: T, arr: T[]) {
  return arr.findIndex((item) => isEqual(item, value));
}

export default function TreeSelectField<T>({
  name,
  options,
  getItems,
  getOptionValue,
  ...props
}: TreeSelectFieldProps<T>) {
  const [field, meta, helpers] = useField(name);
  const shouldValidate = useShouldValidate();
  const initialError = useFormikBypass(name);

  const tree = React.useMemo(() => traverseTree(options, getItems), [options, getItems]);

  const optionsToValues = React.useMemo(() => {
    if (getOptionValue) {
      //@ts-ignore
      return tree.map(getOptionValue);
    } else {
      return tree;
    }
  }, [tree, getOptionValue]);

  const valueFn = (option: T) => optionsToValues[find(option, tree)];

  const optionFn = (value: unknown) => tree[find(value, optionsToValues)];

  const value = field.value && optionFn(field.value);

  const onChange = (item: T | undefined) => {
    helpers.setTouched(true, shouldValidate);
    helpers.setValue(item && valueFn(item), shouldValidate);
    initialError.current = undefined;
  };

  return (
    <TreeSelect
      name={name}
      options={options}
      getItems={getItems}
      {...props}
      {...field}
      value={value}
      onChange={onChange}
      error={meta.touched && (initialError.current ? initialError.current : meta.error)}
    />
  );
}

function traverseTree<T>(items: T[], getItems: (item: T) => T[]): T[] {
  return items.flatMap((item) => {
    const children = getItems(item);

    return children.length === 0 ? [item] : traverseTree(children, getItems);
  });
}
