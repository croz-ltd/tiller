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

import * as React from "react";

import { Popover, positionMatchWidth } from "@reach/popover";

import { IconButton } from "@tiller-ds/core";
import { defaultPlaceholderChar, InputProps, MaskedInput } from "@tiller-ds/form-elements";
import { ComponentTokens, cx, useIcon, useTokens } from "@tiller-ds/theme";

import TimePicker, { ClockType, TimePickerProps } from "./TimePicker";

import addLeadingZerosToDigit from "./addLeadingZerosToDigit";
import formatTime from "./formatTime";
import getTimeZoneOffset from "./getTimeZoneOffset";
import { usePickerOpener } from "./usePickerOpener";
import { convertTwelveHoursTimeTo24Hours, timeMask } from "./utils";
import { tillerTwMerge } from "@tiller-ds/util";

const AM = "AM";
const MIDNIGHT = 0;
const NOON = 12;
const PM = "PM";

export type TimeInputProps = {
  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;

  /**
   * Enables automatic closing of the popover once a date is manually typed in.
   * Off by default.
   */
  closeAfterEntry?: boolean;

  /**
   * Enables or disables the component's functionality.
   */
  disabled?: boolean;

  /**
   * When enabled, the date mask changes on (un)focusing of the input element.
   *
   * When the input element is focused, the date mask is shown.
   *
   * When the input element is unfocused, the mask is shortened to exclude the placeholder characters.
   *
   * **ON** by default.
   */
  dynamicMask?: boolean;

  /**
   * Value passed through from validation indicating to display the error on the component.
   */
  error?: React.ReactNode;

  /**
   * If true, the popover for choosing a time is set to always have the same optimal width (370px),
   * meaning it won't stretch with the field component. Only applies to desktop displays.
   *
   * On by default.
   */
  fixedPopoverWidth?: boolean;

  /**
   * The help text displayed below the date time input field.
   */
  help?: React.ReactNode;

  /**
   * Represents the label above the time input field.
   */
  label?: React.ReactNode;

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
  onChange: (value: string | null) => void;

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * Show or hide the mask for time value when no value is present in the field.
   */
  showMaskOnEmpty?: boolean;
  /**
   * The value of the field sent on submit and/or retrieved on component render (in Date format).
   */
  value: string | null;

  /**
   * Enables or disables the display of a time zone.
   */
  withTimeZone?: boolean;
} & Omit<InputProps, "onChange" | "value" | "onClick"> &
  Pick<TimePickerProps, "type"> &
  TimeInputTokens;

type TimeInputTokens = {
  timeInputTokens?: ComponentTokens<"TimeInput">;
  inputTokens?: ComponentTokens<"Input">;
};

export type TimePickerValue = { hour: null; minute: null; type: "" } | { hour: number; minute: number; type: ClockType };

export default function TimeInput({
  className,
  type,
  value,
  withTimeZone,
  onBlur,
  fixedPopoverWidth = true,
  allowClear = true,
  closeAfterEntry,
  dynamicMask = true,
  showMaskOnEmpty,
  ...props
}: TimeInputProps & TimeInputTokens) {
  const isTwelveHours = type === "use12Hours";
  const timeInputTokens = useTokens("TimeInput", props.timeInputTokens);
  const inputTokens = useTokens("Input", props.inputTokens);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const timePickerRef = React.useRef<HTMLDivElement>(null);
  const { opened, setOpened } = usePickerOpener(false, inputRef, timePickerRef, onBlur);
  const [showTimePickerMinutes, setShowTimePickerMinutes] = React.useState(false);

  const onOpen = () => {
    if (props.disabled || props.readOnly) return;

    setShowTimePickerMinutes(false);
    setOpened(true);
    inputRef.current?.focus();
  };

  const onTimeChange = (hourValue: number | null, minuteValue: number | null) => {
    const hour = addLeadingZerosToDigit(hourValue);
    const minute = addLeadingZerosToDigit(minuteValue);

    if (value) {
      if (withTimeZone) {
        if (value.includes("T")) {
          const date = value.split("T")[0];
          const dateTime = new Date(`${date} ${hour}:${minute}`);
          const [hourOffset, minuteOffset] = getTimeZoneOffset(dateTime);

          props.onChange(`${date}T${hour}:${minute}${hourOffset}:${minuteOffset}`);
        } else {
          const date = new Date();
          const [hourOffset, minuteOffset] = getTimeZoneOffset(date);

          props.onChange(`${hour}:${minute}${hourOffset}:${minuteOffset}`);
        }
      } else {
        if (value.includes("T")) {
          const date = value.split("T")[0];
          props.onChange(`${date}T${hour}:${minute}`);
        } else {
          props.onChange(`${hour}:${minute}`);
        }
      }
    } else {
      props.onChange(`${hour}:${minute}`);
    }

    if (!opened && value !== "") {
      inputRef.current?.focus();
    }
  };

  const timePickerValue: TimePickerValue = React.useMemo(() => {
    let calculatedHour = 0;
    let calculatedMinute = 0;
    let calculatedClockType: ClockType = "";

    if (value === "" || value === undefined || value === null) {
      return { hour: null, minute: null, type: calculatedClockType };
    }

    if (withTimeZone) {
      if (value) {
        if (value.includes("T")) {
          const date = new Date(value);

          calculatedHour = date.getHours();
          calculatedMinute = date.getMinutes();
        } else {
          const currentDate = new Date();
          const currentDateTime = `${currentDate.getMonth()} ${currentDate.getDate()} ${currentDate.getFullYear()}, ${value}`;

          const zonedDateTime = new Date(currentDateTime);
          calculatedHour = zonedDateTime.getHours();
          calculatedMinute = zonedDateTime.getMinutes();
        }
      }
    } else {
      const [formattedHour, formatterMinute] = formatTime(value as string);
      calculatedHour = formattedHour;
      calculatedMinute = formatterMinute;
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

    return { hour: calculatedHour, minute: calculatedMinute, type: calculatedClockType };
  }, [withTimeZone, value, isTwelveHours]);

  const [typedValue, setTypedValue] = React.useState<string>(
    value
      ? `${addLeadingZerosToDigit(timePickerValue.hour)}:${addLeadingZerosToDigit(timePickerValue.minute)}${
          timePickerValue.type ? " " + timePickerValue.type : ""
        }`
      : "",
  );

  const formatHourMinuteValue = (value: string) => {
    let formattedHourMinute = "";

    if (value && !formatTime(value).includes(NaN)) {
      formattedHourMinute = `${addLeadingZerosToDigit(
        timePickerValue.hour === null ? MIDNIGHT : timePickerValue.hour,
      )}:${addLeadingZerosToDigit(timePickerValue.minute === null ? MIDNIGHT : timePickerValue.minute)}`;

      if (isTwelveHours) {
        formattedHourMinute = `${formattedHourMinute} ${timePickerValue.type}`;
      }
      return formattedHourMinute;
    }

    return value;
  };

  const dateIconClassName = cx({ [inputTokens.Icon.clickableTrailing]: !(props.disabled || props.readOnly) });
  const finalTimeIcon = useIcon("time", undefined, { className: dateIconClassName });

  const onChange = (value: string) => {
    const timeValue = isTwelveHours ? value.split(" ")[0].concat(" " + value.split(" ")[1]) : value;

    let convertedValue: string = value;
    if (isTwelveHours && convertedValue.length > 0 && !timeValue.includes(defaultPlaceholderChar)) {
      convertedValue = convertTwelveHoursTimeTo24Hours(timeValue);
    }

    if (convertedValue.length > 0 && !formatTime(convertedValue).includes(NaN)) {
      if (closeAfterEntry) {
        setOpened(false);
      }
      props.onChange(convertedValue);
    } else {
      props.onChange(null);
      setTypedValue(value);
    }

    if (!timeValue.split(":")[0].includes(defaultPlaceholderChar)) {
      setShowTimePickerMinutes(true);
    } else {
      setShowTimePickerMinutes(false);
    }
  };

  const onReset = () => {
    if (props.onReset) {
      props.onReset();
    }
    inputRef.current?.focus();
    setTypedValue("");
    setOpened(false);
  };

  const getPlaceholder = () => {
    if (props.placeholder !== undefined) {
      return props.placeholder;
    }
    if (showMaskOnEmpty) {
      return undefined;
    }

    return `hh:mm${isTwelveHours ? " AM/PM" : ""}`;
  };

  return (
    <div className={tillerTwMerge(cx(timeInputTokens.container, className))}>
      <MaskedInput
        {...props}
        inputRef={inputRef}
        mask={timeMask(typedValue, isTwelveHours)}
        dynamic={dynamicMask}
        showMask={showMaskOnEmpty}
        keepCharPositions={true}
        placeholder={getPlaceholder()}
        value={formatHourMinuteValue(value || typedValue)}
        name={props.name}
        onClick={onOpen}
        onChange={(e) => onChange(e.target.value)}
        onReset={onReset}
        allowClear={allowClear}
        inlineTrailingIcon={<IconButton disabled={props.disabled} icon={finalTimeIcon} onClick={onOpen} showTooltip={false} />}
        tokens={{ textColor: !value ? "text-body-light" : undefined }}
        autoComplete="off"
      />
      <Popover className="z-50" targetRef={inputRef} position={positionMatchWidth}>
        {opened && (
          <TimePicker
            type={type}
            onChange={onTimeChange}
            value={timePickerValue}
            timePickerRef={timePickerRef}
            className="mt-2 rounded-lg"
            fixedWidth={fixedPopoverWidth}
            showMinutes={showTimePickerMinutes}
          />
        )}
      </Popover>
    </div>
  );
}
