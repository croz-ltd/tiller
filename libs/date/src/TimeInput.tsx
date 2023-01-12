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

import Popover, { positionMatchWidth } from "@reach/popover";

import { IconButton } from "@tiller-ds/core";
import { Input, InputProps } from "@tiller-ds/form-elements";
import { ComponentTokens, cx, useIcon, useTokens } from "@tiller-ds/theme";

import TimePicker, { ClockType, TimePickerProps } from "./TimePicker";

import addLeadingZerosToDigit from "./addLeadingZerosToDigit";
import formatTime from "./formatTime";
import getTimeZoneOffset from "./getTimeZoneOffset";
import { usePickerOpener } from "./usePickerOpener";

const AM = "AM";
const MIDNIGHT = 0;
const NOON = 12;
const PM = "PM";

export type TimeInputProps = {
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
   * On by default. If true, the popover for choosing a time is set to always have the same optimal width (370px),
   * meaning it won't stretch with the field component. Only applies to desktop displays.
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
  onChange: (value: string) => void;

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * The value of the field sent on submit and/or retrieved on component render (in Date format).
   */
  value: string;

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

export default function TimeInput({
  className,
  type,
  value,
  withTimeZone,
  onBlur,
  onChange,
  fixedPopoverWidth = true,
  allowClear = true,
  ...props
}: TimeInputProps & TimeInputTokens) {
  const isTwelveHours = type === "use12Hours";
  const timeInputTokens = useTokens("TimeInput", props.timeInputTokens);
  const inputTokens = useTokens("Input", props.inputTokens);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const timePickerRef = React.useRef<HTMLDivElement>(null);
  const { opened, setOpened } = usePickerOpener(false, inputRef, timePickerRef, onBlur);

  const onOpen = () => {
    if (props.disabled || props.readOnly) return;

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

          onChange(`${date}T${hour}:${minute}${hourOffset}:${minuteOffset}`);
        } else {
          const date = new Date();
          const [hourOffset, minuteOffset] = getTimeZoneOffset(date);

          onChange(`${hour}:${minute}${hourOffset}:${minuteOffset}`);
        }
      } else {
        if (value.includes("T")) {
          const date = value.split("T")[0];
          onChange(`${date}T${hour}:${minute}`);
        } else {
          onChange(`${hour}:${minute}`);
        }
      }
    } else {
      onChange(`${hour}:${minute}`);
    }

    if (!opened && value !== "") {
      inputRef.current?.focus();
    }
  };

  const timePickerValue = React.useMemo(() => {
    let calculatedHour = 0;
    let calculatedMinute = 0;
    let calculatedClockType: ClockType = "";

    if (value === "" || value === undefined) return { hour: null, minute: null, type: calculatedClockType };

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
      const [formattedHour, formatterMinute] = formatTime(value);
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

  const formatHourMinuteValue = () => {
    let formattedHourMinute = "";

    if (value) {
      formattedHourMinute = `${addLeadingZerosToDigit(
        timePickerValue.hour === null ? MIDNIGHT : timePickerValue.hour
      )}:${addLeadingZerosToDigit(timePickerValue.minute === null ? MIDNIGHT : timePickerValue.minute)}`;

      if (isTwelveHours) {
        formattedHourMinute = `${formattedHourMinute} ${timePickerValue.type}`;
      }
    }

    return formattedHourMinute;
  };

  const finalTimeIcon = useIcon("time", undefined, { className: inputTokens.Icon.clickableTrailing });

  return (
    <div className={cx(timeInputTokens.container, className)}>
      <Input
        value={formatHourMinuteValue()}
        {...props}
        name={props.name}
        allowClear={allowClear}
        onClick={onOpen}
        onBlur={() => ({})}
        onChange={() => onChange}
        inlineTrailingIcon={<IconButton icon={finalTimeIcon} onClick={onOpen} aria-disabled={props.disabled} />}
        autoComplete="off"
        inputRef={inputRef}
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
          />
        )}
      </Popover>
    </div>
  );
}
