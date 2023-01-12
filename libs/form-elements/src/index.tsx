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

import { CheckboxProps as InternalCheckboxProps } from "./Checkbox";
import {
  CheckboxGroupItemProps as InternalCheckboxGroupItemProps,
  CheckboxGroupProps as InternalCheckboxGroupProps,
} from "./CheckboxGroup";
import { FieldProps as InternalFieldProps } from "./Field";
import { InputProps as InternalInputProps } from "./Input";
import { MaskedInputProps as InternalMaskedInputProps } from "./MaskedInput";
import { NumberInputProps as InternalNumberInputProps } from "./NumberInput";
import {
  RadioGroupItemProps as InternalRadioGroupItemProps,
  RadioGroupProps as InternalRadioGroupProps,
} from "./RadioGroup";
import { SliderProps as InternalSliderProps } from "./Slider";
import { TextareaProps as InternalTextareaProps } from "./Textarea";
import { ToggleProps as InternalToggleProps } from "./Toggle";

export type CheckboxProps = InternalCheckboxProps;
export type CheckboxGroupItemProps = InternalCheckboxGroupItemProps;
export type CheckboxGroupProps = InternalCheckboxGroupProps;
export type FieldProps = InternalFieldProps;
export type InputProps = InternalInputProps;
export type MaskedInputProps = InternalMaskedInputProps;
export type NumberInputProps = InternalNumberInputProps;
export type RadioGroupItemProps = InternalRadioGroupItemProps;
export type RadioGroupProps = InternalRadioGroupProps;
export type SliderProps = InternalSliderProps;
export type TextareaProps = InternalTextareaProps;
export type ToggleProps = InternalToggleProps;

export { default as Checkbox } from "./Checkbox";
export { default as CheckboxGroup } from "./CheckboxGroup";
export { default as Field, FieldLabel } from "./Field";
export { default as FieldGroup } from "./FieldGroup";
export { default as FormLayout } from "./FormLayout";
export { default as Input } from "./Input";
export { default as Label } from "./Label";
export { default as MaskedInput } from "./MaskedInput";
export { default as NumberInput } from "./NumberInput";
export { default as RadioGroup } from "./RadioGroup";
export { default as Slider } from "./Slider";
export { default as Textarea } from "./Textarea";
export { default as Toggle } from "./Toggle";
export { getThousandSeparator } from "./getThousandSeparator";
export { getDecimalSeparator } from "./getDecimalSeparator";
