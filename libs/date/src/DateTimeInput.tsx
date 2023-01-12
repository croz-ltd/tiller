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

import { useIntl } from "react-intl";
import { OnDatesChangeProps, START_DATE, useDatepicker } from "@datepicker-react/hooks";
import Popover, { positionMatchWidth } from "@reach/popover";

import { Input, InputProps } from "@tiller-ds/form-elements";
import { cx, useTokens, ComponentTokens, useIcon } from "@tiller-ds/theme";

import DatePicker from "./DatePicker";
import TimePicker, { ClockType, TimePickerProps } from "./TimePicker";

import addLeadingZerosToDigit from "./addLeadingZerosToDigit";
import { usePickerOpener } from "./usePickerOpener";
import { IconButton } from "@tiller-ds/core";

const AM = "AM";
const MIDNIGHT = 0;
const NOON = 12;
const PM = "PM";

export type DateTimeInputProps = {
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
   * The help text displayed below the date time input field.
   */
  help?: React.ReactNode;

  /**
   * Represents the label above the date time input field.
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
  onChange: (value: Date) => void;

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * The value of the field sent on submit and/or retrieved on component render (in Date format).
   */
  value: Date | null;

  /**
   * Enables or disables the display of a time zone.
   */
  withTimeZone?: boolean;
} & Omit<InputProps, "onChange" | "value" | "onClick"> &
  Pick<TimePickerProps, "type">;

type DateTimeInputTokens = {
  dateTimeInputTokens?: ComponentTokens<"DateTimeInput">;
  dateTimePickerTokens?: ComponentTokens<"DateTimePicker">;
  timeInputTokens?: ComponentTokens<"TimeInput">;
  inputTokens?: ComponentTokens<"Input">;
};

export default function DateTimeInput({
  className,
  type,
  value,
  withTimeZone,
  onBlur,
  onChange,
  minDate,
  maxDate,
  fixedPopoverWidth = true,
  allowClear = true,
  ...props
}: DateTimeInputProps & DateTimeInputTokens) {
  const intl = useIntl();

  const dateTimePickerTokens = useTokens("DateTimePicker", props.dateTimePickerTokens);
  const dateTimeInputTokens = useTokens("DateTimeInput", props.dateTimeInputTokens);
  const timeInputTokens = useTokens("TimeInput", props.timeInputTokens);
  const inputTokens = useTokens("Input", props.inputTokens);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const timePickerRef = React.useRef<HTMLDivElement>(null);
  const datePickerRef = React.useRef<HTMLDivElement>(null);
  const dateTimePickerRef = React.useRef<HTMLDivElement>(null);

  const [isDatePicker, setIsDatePicker] = React.useState<boolean>(true);
  const { opened, setOpened } = usePickerOpener(false, inputRef, dateTimePickerRef, onBlur);

  const isTwelveHours = type === "use12Hours";

  const dateTabClasses = cx(dateTimePickerTokens.tab, { [dateTimeInputTokens.borderBottomWidth]: isDatePicker });

  const timeTabClasses = cx(dateTimePickerTokens.tab, { [dateTimeInputTokens.borderBottomWidth]: !isDatePicker });

  const timeTabIconClasses = cx(
    inputTokens.Icon.clickableTrailing,
    { [dateTimeInputTokens.Icon.color]: !isDatePicker },
    { "text-gray-400": isDatePicker }
  );

  const dateTabIconClasses = cx(
    inputTokens.Icon.clickableTrailing,
    { [dateTimeInputTokens.Icon.color]: isDatePicker },
    { "text-gray-400": !isDatePicker }
  );

  const onOpen = () => {
    if (props.disabled || props.readOnly) return;

    if (
      value &&
      datePicker.activeMonths.some((active) => active.month !== value.getMonth() || active.year !== value.getFullYear())
    ) {
      datePicker.onDateFocus(value || minDate || (null as unknown as Date));
    }
    if (!value) {
      datePicker.onDateFocus(minDate || (null as unknown as Date));
    }

    setOpened(true);
    openSelectedPicker("date");
    inputRef.current?.focus();
  };

  const onDateChange = (data: OnDatesChangeProps) => {
    const currentHours = value ? value.getHours() : 0;
    const currentMinutes = value ? value.getMinutes() : 0;
    const selectedDate = data.startDate ? data.startDate : new Date();

    if (selectedDate !== value && selectedDate !== minDate) {
      onChange(createNewDate(selectedDate, currentHours, currentMinutes));
      openSelectedPicker("time");
    }
  };

  const onTimeChange = (hourValue: number | null, minuteValue: number | null) => {
    const nonNullHour = hourValue === null ? MIDNIGHT : hourValue;
    onChange(createNewDate(value ? value : new Date(), nonNullHour, minuteValue ? minuteValue : 0));
  };

  const openSelectedPicker = (selectedTab: string) => {
    if (selectedTab === "date" && !isDatePicker) setIsDatePicker(true);
    if (selectedTab === "time" && isDatePicker) setIsDatePicker(false);
  };

  const datePicker = useDatepicker({
    startDate: value || minDate || null,
    endDate: null,
    focusedInput: START_DATE,
    minBookingDate: minDate,
    maxBookingDate: maxDate,
    numberOfMonths: 1,
    onDatesChange: onDateChange,
  });

  const timePicker = React.useMemo(() => {
    let calculatedClockType: ClockType = "";
    let calculatedHour = 0;
    let calculatedMinute = 0;

    if (value) {
      calculatedHour = value.getHours();
      calculatedMinute = value.getMinutes();
    } else {
      return { hour: null, minute: null, type: calculatedClockType };
    }

    if (isTwelveHours) {
      if (calculatedHour >= NOON) {
        calculatedClockType = PM;
        calculatedHour = calculatedHour > NOON ? calculatedHour - NOON : calculatedHour;
      } else {
        calculatedClockType = AM;
        calculatedHour = calculatedHour === MIDNIGHT ? NOON : calculatedHour;
      }
    }

    return {
      hour: calculatedHour,
      minute: calculatedMinute,
      type: calculatedClockType,
    };
  }, [withTimeZone, value]);

  let formattedValue = value
    ? `${intl.formatDate(value)} ${addLeadingZerosToDigit(value.getHours())}:${addLeadingZerosToDigit(
        value.getMinutes()
      )}`
    : "";

  if (isTwelveHours) {
    formattedValue = `${formattedValue} ${timePicker.type}`;
  }

  const mobile = (window.innerWidth < 768) as boolean;

  const finalDateIconInput = useIcon("date", undefined, { className: inputTokens.Icon.clickableTrailing });
  const finalDateIconPopup = useIcon("date", undefined, { className: dateTabIconClasses });
  const finalTimeIconPopup = useIcon("time", undefined, { className: timeTabIconClasses });

  return (
    <div className={cx(timeInputTokens.container, className)}>
      <Input
        value={formattedValue}
        {...props}
        name={props.name}
        allowClear={allowClear}
        onClick={onOpen}
        onFocus={onOpen}
        onBlur={() => ({})}
        onChange={() => ({})}
        inlineTrailingIcon={<IconButton icon={finalDateIconInput} onClick={onOpen} showTooltip={false} />}
        autoComplete="off"
        inputRef={inputRef}
      />
      <Popover className="z-50" targetRef={inputRef} position={positionMatchWidth}>
        {opened && (
          <div
            className={dateTimePickerTokens.container}
            style={{
              minWidth: mobile ? undefined : "370px",
              maxWidth: fixedPopoverWidth ? (mobile ? undefined : "370px") : undefined,
            }}
            ref={dateTimePickerRef}
          >
            <div className={dateTimePickerTokens.tabsContainer}>
              <div className={dateTabClasses} onClick={() => openSelectedPicker("date")}>
                {finalDateIconPopup}
              </div>
              <div className={timeTabClasses} onClick={() => openSelectedPicker("time")}>
                {finalTimeIconPopup}
              </div>
            </div>
            <div>
              {isDatePicker && (
                <DatePicker
                  datePicker={datePicker}
                  datePickerRef={datePickerRef}
                  focusedDate={value}
                  isDateRange={false}
                  minYear={minDate?.getFullYear()}
                  maxYear={maxDate?.getFullYear()}
                  className={dateTimeInputTokens.borderRadius}
                  fixedWidth={fixedPopoverWidth}
                />
              )}
              {!isDatePicker && (
                <TimePicker
                  onChange={onTimeChange}
                  value={timePicker}
                  timePickerRef={timePickerRef}
                  className={dateTimeInputTokens.borderRadius}
                  type={type}
                />
              )}
            </div>
          </div>
        )}
      </Popover>
    </div>
  );
}

function createNewDate(dateValue: Date, hourValue: number, minuteValue: number) {
  const dayValue = dateValue.getDate();
  const monthValue = dateValue.getMonth();
  const yearValue = dateValue.getFullYear();

  return new Date(yearValue, monthValue, dayValue, hourValue, minuteValue);
}
