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

import { useDatepicker, START_DATE, OnDatesChangeProps, FocusedInput, END_DATE } from "@datepicker-react/hooks";

import Popover, { positionMatchWidth, positionRight } from "@reach/popover";
import { useIntl } from "react-intl";

import { Input, InputProps } from "@tiller-ds/form-elements";
import { ComponentTokens, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";

import DatePicker from "./DatePicker";
import { IconButton } from "@tiller-ds/core";

type DateTimeFormatOptionsOnly = "localeMatcher" | "weekday" | "year" | "month" | "day";

export type DateRangeInputProps = {
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
   * Forces a set end date for the component.
   */
  end?: Date | null;

  /**
   * Value passed through from validation indicating to display the error on the component.
   */
  error?: React.ReactNode;

  /**
   * On by default. If true, the popover for choosing a date is set to always have the same optimal width (500px),
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
   * Function that handles the behaviour of the component once its state changes.
   */
  onChange: (start: Date | null, end: Date | null) => void;

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
   * Forces a set start date for the component.
   */
  start?: Date | null;
} & Omit<InputProps, "onChange" | "value"> &
  Omit<Intl.DateTimeFormatOptions, DateTimeFormatOptionsOnly> &
  DateInputTokensProps;

type DateInputTokensProps = {
  tokens?: ComponentTokens<"DateInput">;
};

type DateRangeInputInputProps = {
  onClick: () => void;

  inputRef: React.Ref<HTMLInputElement>;

  value: string | null;
} & Omit<DateRangeInputProps, "start" | "end"> &
  TokenProps<"DateInput">;

type datePickerState = {
  startDate: Date | null;
  endDate: Date | null;
  focusedInput: FocusedInput;
};

export default function DateRangeInput({
  className,
  name = "daterange",
  start,
  end,
  minDate,
  maxDate,
  fixedPopoverWidth = true,
  popoverPosition = "left",
  allowClear,
  ...props
}: DateRangeInputProps) {
  const [datePickerState, setDatePickerState] = React.useState<datePickerState>({
    startDate: null,
    endDate: null,
    focusedInput: start && !end ? END_DATE : START_DATE,
  });

  const onDatesChange = (data: OnDatesChangeProps) => {
    if (data.startDate && !data.endDate) {
      setDatePickerState({ startDate: data.startDate, endDate: data.endDate, focusedInput: data.focusedInput });
      props.onChange(data.startDate, data.endDate);
    } else if (data.focusedInput) {
      setDatePickerState({ startDate: data.startDate, endDate: null, focusedInput: END_DATE });
      props.onChange(data.startDate, null);
    }

    if (!data.focusedInput) {
      setDatePickerState({ startDate: null, endDate: null, focusedInput: START_DATE });
      props.onChange(data.startDate, data.endDate);
      setOpened(false);
    }
  };

  const datePicker = useDatepicker({
    startDate: start ?? datePickerState.startDate,
    endDate: end ?? datePickerState.endDate,
    focusedInput: datePickerState.focusedInput,
    minBookingDate: minDate,
    maxBookingDate: maxDate,
    numberOfMonths: 2,
    onDatesChange,
  });
  const checkActiveMonthsValidity =
    (datePicker.activeMonths[0].month === start?.getMonth() &&
      datePicker.activeMonths[0].year === start?.getFullYear()) ||
    (datePicker.activeMonths[1].month === end?.getMonth() && datePicker.activeMonths[1].year === end?.getFullYear());

  const [opened, setOpened] = React.useState(false);

  React.useEffect(() => {
    if (start && end && !checkActiveMonthsValidity) {
      setDatePickerState({ startDate: start, endDate: end, focusedInput: null });
    } else if (start && !end && !checkActiveMonthsValidity) {
      setDatePickerState({ startDate: start, endDate: null, focusedInput: END_DATE });
    } else if (!start && !end) {
      setDatePickerState({ startDate: null, endDate: null, focusedInput: START_DATE });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end]);

  const onOpen = () => {
    if (props.disabled || props.readOnly) {
      return;
    }
    if (!checkActiveMonthsValidity) {
      datePicker.onDateFocus(start || minDate || (null as unknown as Date));
    }
    setOpened(true);
    inputRef.current?.focus();
  };
  const inputRef = React.useRef<HTMLInputElement>(null);
  const datePickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function listener(event: MouseEvent) {
      const { relatedTarget, target } = event;

      const isOutsideInput = inputRef.current && !inputRef.current?.contains((relatedTarget || target) as Element);
      const isOutsideDatePicker =
        datePickerRef.current && !datePickerRef.current?.contains((relatedTarget || target) as Element);

      if (opened && isOutsideInput && isOutsideDatePicker) {
        setOpened(false);
      }
    }

    window.addEventListener("mousedown", listener);
    return () => {
      window.removeEventListener("mousedown", listener);
    };
  }, [opened]);

  return (
    <div className={className}>
      <DateRangeInputInput
        {...props}
        name={name}
        inputRef={inputRef}
        onClick={onOpen}
        onFocus={onOpen}
        allowClear={allowClear}
        value={formatValue(start, end)}
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
            focusedDate={start as Date}
            minYear={minDate?.getFullYear()}
            maxYear={maxDate?.getFullYear()}
            isDateRange={true}
            fixedWidth={fixedPopoverWidth}
          />
        )}
      </Popover>
    </div>
  );
}

function DateRangeInputInput({ onClick, onChange, value, allowClear, ...props }: DateRangeInputInputProps) {
  const tokens = useTokens("DateInput", props.tokens);
  const finalDateIcon = useIcon("date", undefined, { className: tokens.DatePicker.range.iconColor });

  return (
    <Input
      {...props}
      allowClear={allowClear}
      value={value ?? ""}
      onClick={onClick}
      inlineTrailingIcon={<IconButton icon={finalDateIcon} onClick={onClick} showTooltip={false} />}
    />
  );
}

function formatValue(start: Date | null | undefined, end: Date | null | undefined) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const intl = useIntl();

  let value = "";
  if (start != null) {
    value = `${intl.formatDate(start)} -`;
  }

  if (end != null) {
    const formattedEndDate = intl.formatDate(end);
    value = value === `` ? `${value}- ${formattedEndDate}` : `${value}${formattedEndDate}`;
  }
  return value;
}
