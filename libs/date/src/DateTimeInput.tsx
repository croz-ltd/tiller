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

import * as dateFns from "date-fns";

import { OnDatesChangeProps, START_DATE, useDatepicker } from "@datepicker-react/hooks";
import Popover, { positionMatchWidth } from "@reach/popover";

import { IconButton } from "@tiller-ds/core";
import { defaultPlaceholderChar, InputProps, MaskedInput } from "@tiller-ds/form-elements";
import { useIntlContext } from "@tiller-ds/intl";
import { cx, useTokens, ComponentTokens, useIcon } from "@tiller-ds/theme";

import addLeadingZerosToDigit from "./addLeadingZerosToDigit";
import DatePicker from "./DatePicker";
import TimePicker, { ClockType, TimePickerProps } from "./TimePicker";
import { usePickerOpener } from "./usePickerOpener";
import {
  checkDatesInterval,
  convertTwelveHoursTimeTo24Hours,
  formatDate,
  getDateFormatByLang,
  getMaskFromFormat,
} from "./utils";

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
   * Enables automatic closing of the popover once a date is manually typed in.
   * Off by default.
   */
  closeAfterEntry?: boolean;

  /**
   * Enables or disables the component's functionality.
   */
  disabled?: boolean;

  /**
   * The format of the date mask. E.g. 'yyyy-MM-dd' or 'dd/MM/yyyy'.
   */
  dateFormat?: string;

  /**
   * When enabled, the date time mask changes on (un)focusing of the input element.
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
   * If true, the popover for choosing a date is set to always have the same optimal width (370px),
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
   * If true, the current date is highlighted in the date picker for easier navigation.
   *
   * Off by default.
   */
  highlightToday?: boolean;

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
  onChange: (value: Date | null) => void;

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * Show or hide the desired mask for date-time value when no value is present in the field.
   */
  showMaskOnEmpty?: boolean;

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
  minDate,
  maxDate,
  fixedPopoverWidth = true,
  allowClear = true,
  closeAfterEntry,
  dynamicMask = true,
  showMaskOnEmpty,
  dateFormat,
  highlightToday,
  ...props
}: DateTimeInputProps & DateTimeInputTokens) {
  const { lang } = useIntlContext();

  const dateTimePickerTokens = useTokens("DateTimePicker", props.dateTimePickerTokens);
  const dateTimeInputTokens = useTokens("DateTimeInput", props.dateTimeInputTokens);
  const timeInputTokens = useTokens("TimeInput", props.timeInputTokens);
  const inputTokens = useTokens("Input", props.inputTokens);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const timePickerRef = React.useRef<HTMLDivElement>(null);
  const datePickerRef = React.useRef<HTMLDivElement>(null);
  const dateTimePickerRef = React.useRef<HTMLDivElement>(null);

  const [isDatePicker, setIsDatePicker] = React.useState<boolean>(true);
  const [showTimePickerMinutes, setShowTimePickerMinutes] = React.useState(false);

  const { opened, setOpened } = usePickerOpener(false, inputRef, dateTimePickerRef, onBlur);

  const isTwelveHours = type === "use12Hours";

  const dateTabClasses = cx(dateTimePickerTokens.tab, { [dateTimeInputTokens.borderBottomWidth]: isDatePicker });

  const timeTabClasses = cx(dateTimePickerTokens.tab, { [dateTimeInputTokens.borderBottomWidth]: !isDatePicker });

  const timeTabIconClasses = cx(
    { [inputTokens.Icon.clickableTrailing]: isDatePicker },
    { [dateTimeInputTokens.Icon.color]: !isDatePicker },
    { "text-gray-400": isDatePicker },
  );

  const dateTabIconClasses = cx(
    { [inputTokens.Icon.clickableTrailing]: !isDatePicker },
    { [dateTimeInputTokens.Icon.color]: isDatePicker },
    { "text-gray-400": !isDatePicker },
  );

  const onOpen = () => {
    if (props.disabled || props.readOnly) return;

    if (
      value &&
      datePicker.activeMonths.some((active) => active.month !== value.getMonth() || active.year !== value.getFullYear())
    ) {
      datePicker.onDateFocus(value || minDate || (null as unknown as Date));
    }

    if (!opened) {
      setOpened(true);
      setShowTimePickerMinutes(false);
      openSelectedPicker("date");
    }
    inputRef.current?.focus();
  };

  const onDateChange = (data: OnDatesChangeProps) => {
    const currentHours = value ? value.getHours() : 0;
    const currentMinutes = value ? value.getMinutes() : 0;
    const selectedDate = data.startDate ? data.startDate : new Date();

    if (selectedDate !== value && selectedDate !== minDate) {
      const newDate = createNewDate(selectedDate, currentHours, currentMinutes);
      props.onChange(newDate);
      setTypedValue(formatValue(newDate));
      setShowTimePickerMinutes(false);
      openSelectedPicker("time");
    }
  };

  const onTimeChange = (hourValue: number | null, minuteValue: number | null) => {
    const nonNullHour = hourValue === null ? MIDNIGHT : hourValue;
    props.onChange(createNewDate(value ? value : new Date(), nonNullHour, minuteValue ? minuteValue : 0));
  };

  const openSelectedPicker = (selectedTab: string) => {
    if (selectedTab === "date" && !isDatePicker) setIsDatePicker(true);
    if (selectedTab === "time" && isDatePicker) setIsDatePicker(false);
  };

  const datePicker = useDatepicker({
    initialVisibleMonth: value || minDate || new Date(),
    startDate: value || null,
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

  const formattedDateFormat = dateFormat?.replace(/m/g, "M");
  const finalDateFormat = formattedDateFormat || getDateFormatByLang(lang);
  const timeAddOn = " HH:mm"; // HH must be uppercase!

  const formatValue = (value: Date) => {
    return `${dateFns.format(value, finalDateFormat)} ${addLeadingZerosToDigit(
      isTwelveHours ? timePicker.hour : value.getHours(),
    )}:${addLeadingZerosToDigit(isTwelveHours ? timePicker.minute : value.getMinutes())}${
      isTwelveHours ? " " + timePicker.type : ""
    }`;
  };

  const formattedValue = value ? formatValue(value) : "";
  const [typedValue, setTypedValue] = React.useState<string>(formattedValue);

  const mobile = (window.innerWidth < 768) as boolean;

  const dateIconClassName = cx({ [inputTokens.Icon.clickableTrailing]: !(props.disabled || props.readOnly) });
  const finalDateIconInput = useIcon("date", undefined, { className: dateIconClassName });
  const finalDateIconPopup = useIcon("date", undefined, { className: dateTabIconClasses });
  const finalTimeIconPopup = useIcon("time", undefined, { className: timeTabIconClasses });

  const onChange = (value: string) => {
    const dateValue = lang === "hr" ? value.split(" ").slice(0, 3).join(" ") : value.split(" ")[0];
    const timeValue =
      lang === "en"
        ? isTwelveHours && value
          ? value.split(" ")[1].concat(" " + value.split(" ")[2])
          : value.split(" ")[1]
        : value.split(" ")[3];

    let convertedValue: Date | string = value;
    if (value && isTwelveHours && !timeValue.includes(defaultPlaceholderChar)) {
      convertedValue = `${value.split(" ")[0]} ${convertTwelveHoursTimeTo24Hours(timeValue)}`;
    }

    const dateExists = formatDate(dateValue, finalDateFormat);
    if (!dateExists || checkDatesInterval(dateExists, minDate, maxDate, lang)) {
      if (dateExists) {
        openSelectedPicker("time");
      } else if (!isDatePicker) {
        openSelectedPicker("date");
      }

      convertedValue = formatDate(
        convertedValue,
        dateFormat ? formattedDateFormat + timeAddOn : getDateFormatByLang(lang, true),
      ) as Date;
      if (convertedValue && checkDatesInterval(convertedValue, minDate, maxDate, lang, true)) {
        if (closeAfterEntry) {
          setOpened(false);
        }
        props.onChange(createNewDate(convertedValue, convertedValue.getHours(), convertedValue.getMinutes()));
        datePicker.onDateFocus(convertedValue);
      } else {
        props.onChange(null);
        setTypedValue(value);
      }
    }

    if (dateExists && !timeValue.split(":")[0].includes(defaultPlaceholderChar)) {
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
    if (dateFormat) {
      return `${dateFormat} hh:mm${isTwelveHours ? " AM/PM" : ""}`;
    }
    if (showMaskOnEmpty) {
      return undefined;
    }

    const defaultDateFormat = getDateFormatByLang(lang, true).toLowerCase();
    return `${defaultDateFormat}${isTwelveHours ? " AM/PM" : ""}`;
  };

  const getDateTimeMask = () => {
    return [
      ...getMaskFromFormat(
        typedValue,
        dateFormat ? formattedDateFormat + timeAddOn : getDateFormatByLang(lang, true),
        isTwelveHours,
      ),
    ];
  };

  return (
    <div className={cx(timeInputTokens.container, className)}>
      <MaskedInput
        {...props}
        inputRef={inputRef}
        mask={getDateTimeMask()}
        dynamic={dynamicMask}
        showMask={showMaskOnEmpty}
        keepCharPositions={true}
        placeholder={getPlaceholder()}
        value={formattedValue || typedValue}
        name={props.name}
        onClick={onOpen}
        onFocus={onOpen}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        onReset={onReset}
        allowClear={allowClear}
        inlineTrailingIcon={
          <IconButton
            disabled={props.disabled || props.readOnly}
            icon={finalDateIconInput}
            onClick={onOpen}
            showTooltip={false}
          />
        }
        autoComplete="off"
        tokens={{ textColor: !value ? "text-body-light" : undefined }}
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
                  focusedDate={value || null}
                  isDateRange={false}
                  minYear={minDate?.getFullYear()}
                  maxYear={maxDate?.getFullYear()}
                  className={dateTimeInputTokens.borderRadius}
                  fixedWidth={fixedPopoverWidth}
                  highlightToday={highlightToday}
                />
              )}
              {!isDatePicker && (
                <TimePicker
                  onChange={onTimeChange}
                  value={timePicker}
                  timePickerRef={timePickerRef}
                  className={dateTimeInputTokens.borderRadius}
                  type={type}
                  showMinutes={showTimePickerMinutes}
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
