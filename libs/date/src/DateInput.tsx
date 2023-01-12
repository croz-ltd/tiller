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

import { useDatepicker, START_DATE, OnDatesChangeProps } from "@datepicker-react/hooks";
import { useIntl } from "react-intl";
import Popover, { positionMatchWidth, positionRight } from "@reach/popover";

import { IconButton } from "@tiller-ds/core";
import { Input, InputProps } from "@tiller-ds/form-elements";
import { TokenProps, useIcon, useTokens } from "@tiller-ds/theme";

import DatePicker from "./DatePicker";
import { usePickerOpener } from "./usePickerOpener";

export type DateInputProps = {
  /**
   * Allows the clear button (x) to be shown when a value is present in the field.
   * On by default.
   */
  allowClear?: boolean;

  /**
   * Custom class name for the container.
   */
  className?: string;

  /**
   * Enables or disables the component's functionality.
   */
  disabled?: boolean;

  /**
   * Value passed through from validation indicating to display the error on the component.
   */
  error?: React.ReactNode;

  /**
   * On by default. If true, the popover for choosing a date is set to always have the same optimal width (370px),
   * meaning it won't stretch with the field component. Only applies to desktop displays.
   */
  fixedPopoverWidth?: boolean;

  /**
   * The help text displayed below the date input field.
   */
  help?: React.ReactNode;

  /**
   * Represents the label above the date input field.
   */
  label?: React.ReactNode;

  /**
   * Maximum possible date enabled for selection.
   */
  maxDate?: Date;

  /**
   * Minimum possible date enabled for selection.
   */
  minDate?: Date;

  /**
   * The accessor value for the input field component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Defines the behaviour of the component once the focus shifts away from the component.
   */
  onBlur?: () => void;

  /**
   * Function that handles the behaviour of the component once its state changes.
   */
  onChange: (value: Date | null) => void;

  /**
   * The placeholder displayed inside the date input field.
   */
  placeholder?: string;

  /**
   * Position of the popover for choosing the date range. Convenient for situations where the
   * popover would pass through the end of the screen on a certain position.
   * If set to 'left', the popover starts from the left side of the components and stretches to the right.
   * If set to 'right', the popover starts from the right side of the components and stretches to the left.
   * Defaults to 'left'.
   */
  popoverPosition?: "left" | "right";

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * The value of the field sent on submit and/or retrieved on component render (in Date format 'yyyy-MM-dd').
   */
  value: Date | null;
} & Omit<InputProps, "onBlur" | "onChange" | "value"> &
  Omit<Intl.DateTimeFormatOptions, "localeMatcher" | "weekday" | "year" | "month" | "day">;

type DateInputInputProps = {
  /**
   * Event handler which enables you to call a function and trigger an action when a user clicks an input.
   */
  onClick: () => void;
  /**
   * InputRef stores a reference to input.
   */
  inputRef: React.Ref<HTMLInputElement>;
  /**
   * It uses react-intl formatDate method and returns the string representation of the formatted date.
   */
  focusedDate: Date | null;

  /**
   * Custom icon instead of the trailing calendar one.
   */
  dateIcon?: React.ReactElement;
} & DateInputProps &
  TokenProps<"Input">;

export default function DateInput({
  allowClear = true,
  className,
  value,
  minDate,
  maxDate,
  onBlur,
  fixedPopoverWidth = true,
  popoverPosition = "left",
  ...props
}: DateInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const datePickerRef = React.useRef<HTMLDivElement>(null);

  const onDatesChange = (data: OnDatesChangeProps) => {
    inputRef.current?.focus();
    props.onChange(data.startDate);
    setOpened(false);
  };

  const datePicker = useDatepicker({
    startDate: value || minDate || null,
    endDate: null,
    focusedInput: START_DATE,
    minBookingDate: minDate,
    maxBookingDate: maxDate,
    numberOfMonths: 1,
    onDatesChange,
  });
  const checkActiveMonthsValidity =
    datePicker.activeMonths[0].month === value?.getMonth() && datePicker.activeMonths[0].year === value?.getFullYear();

  const { opened, setOpened } = usePickerOpener(false, inputRef, datePickerRef, onBlur);

  const onOpen = () => {
    if (props.disabled || props.readOnly) {
      return;
    }
    if (!checkActiveMonthsValidity) {
      datePicker.onDateFocus(value || minDate || (null as unknown as Date));
    }
    setOpened(true);
    inputRef.current?.focus();
  };

  return (
    <div className={className}>
      <DateInputInput
        {...props}
        inputRef={inputRef}
        onClick={onOpen}
        onFocus={onOpen}
        focusedDate={value}
        allowClear={allowClear}
        onBlur={onBlur ? onBlur : undefined}
        value={value}
      />
      <Popover
        className="z-50"
        targetRef={inputRef}
        position={popoverPosition === "left" ? positionMatchWidth : positionRight}
      >
        {opened && (
          <DatePicker
            datePicker={datePicker}
            datePickerRef={datePickerRef}
            focusedDate={value}
            minYear={minDate?.getFullYear()}
            maxYear={maxDate?.getFullYear()}
            isDateRange={false}
            fixedWidth={fixedPopoverWidth}
          />
        )}
      </Popover>
    </div>
  );
}

function DateInputInput({
  onClick,
  onChange,
  focusedDate,
  required,
  allowClear = true,
  dateIcon,
  ...props
}: DateInputInputProps) {
  const intl = useIntl();
  const tokens = useTokens("Input", props.tokens);
  const finalDateIcon = useIcon("date", dateIcon, { className: tokens.Icon.clickableTrailing });

  return (
    <Input
      {...props}
      value={focusedDate ? intl.formatDate(focusedDate) : ""}
      name={props.name}
      onClick={onClick}
      onBlur={() => ({})}
      allowClear={allowClear}
      required={required}
      inlineTrailingIcon={<IconButton icon={finalDateIcon} onClick={onClick} showTooltip={false} />}
      autoComplete="off"
    />
  );
}
