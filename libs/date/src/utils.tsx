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

import * as dateFns from "date-fns";

import transformHourTo24HoursValue from "./transformHourTo24HoursValue";
import addLeadingZerosToDigit from "./addLeadingZerosToDigit";

const AM = "AM";
const PM = "PM";
const twelveHoursAddOn = [" ", /[AaPp]/, /[Mm]/];

/**
 * Get the date format in desired language or ISO format if no language is provided.
 *
 * Currently supported languages are Croatian ('hr') and English ('en').
 * @param   {string}  lang  Language of the wished format, excluding it returns the standard ISO format
 * @param   {boolean} time  Determines whether to include time value in the format
 * @return  {string}        Date format in desired language
 */
export const getDateFormatByLang = (lang?: string, time?: boolean) => {
  const timeValue = time ? " HH:mm" : "";
  if (!lang) {
    return `yyyy-MM-dd${timeValue ? "T" + timeValue : ""}`;
  }
  return lang === "hr" ? `dd. MM. yyyy.${timeValue}` : `MM/dd/yyyy${timeValue}`;
};

/**
 * Returns a Date object from a string or Date in desired language or ISO format if no language is provided.
 * If Date object is passed, it is returned as is.
 *
 * If no format is provided, the default ISO format 'yyyy-MM-dd' is inferred.
 *
 * @param   {string}    toFormat   Date to be formatted
 * @param   {string}    format     Format of the date (e.g. 'dd. MM. yyyy.' or 'MM/dd/yyyy')
 * @return  {Date | null}          Date object in desired language or null if the conversion is unsuccessful
 */
export const formatDate = (toFormat: string | null, format?: string) => {
  if (toFormat) {
    const convertedDate = dateFns.parse(toFormat, format || getDateFormatByLang(), new Date());
    if (isNaN(convertedDate.getDate())) {
      return null;
    }
    return convertedDate;
  }
  return null;
};

/**
 * Checks if the date is in the interval between minDate and/or maxDate.
 *
 * @param {Date | string | null}  value   Date to check if it is in interval
 * @param {Date}      minDate             Minimum date
 * @param {Date}      maxDate             Maximum date
 * @param {string}    lang                Language in which the date is formatted, excluding it implies the standard ISO format
 * @param {boolean} time                  Determines whether to include time value in the format
 * @return  {boolean}                     A true or false value indicating whether the date is in the interval
 */
export const checkDatesInterval = (
  value: Date | string | null,
  minDate?: Date,
  maxDate?: Date,
  lang?: string,
  time?: boolean,
) => {
  if (!time) {
    value instanceof Date && value?.setHours(0, 0, 0, 0);
    minDate?.setHours(0, 0, 0, 0);
    maxDate?.setHours(0, 0, 0, 0);
  }
  if ((!minDate && !maxDate) || !value) {
    return true;
  }
  const toFormat = value instanceof Date ? value : formatDate(value, getDateFormatByLang(lang, time));
  const dateTime = toFormat?.getTime() as number;
  if (minDate && !maxDate) {
    if (dateTime >= minDate?.getTime()) {
      return true;
    }
  }
  if (maxDate && !minDate) {
    if (dateTime <= maxDate?.getTime()) {
      return true;
    }
  }
  if (minDate && maxDate) {
    if (dateTime >= minDate?.getTime() && dateTime <= maxDate?.getTime()) {
      return true;
    }
  }
  return false;
};

/**
 * Converts a value from 12-hour format 'hh:mm AM' or 'hh:mm PM' (not case-sensitive)
 * to 24-hour format 'hh:mm'.
 *
 * @param   {string}  value   Value to be converted (in string format)
 * @return  {string}          Value in 24-hour format (in string format)
 */
export const convertTwelveHoursTimeTo24Hours = (value: string) => {
  const amPm = value.split(" ")[1].toUpperCase();
  const hours = addLeadingZerosToDigit(
    transformHourTo24HoursValue(parseInt(value.split(":")[0]), amPm === "PM" ? PM : AM),
  );
  const minutes = value.split(" ")[0].split(":")[1];
  if (amPm === "PM" || amPm === "AM") {
    return `${hours}:${minutes}`;
  } else {
    return value;
  }
};

/**
 * Represents Tiller's date mask for handing over to the Masked Input component.
 * The mask has checks for month and day values of the date.
 *
 * Value example: 'mm/dd/yyyy'
 *
 * @param {string}    value               Date value for which the mask is created
 * @param {string}    dateFormat          Date format (if not provided, the default format inferred from 'lang' is used)
 * @param {string}    lang                Language for which the mask is created
 * @return  {(string | RegExp)[]}         Returns an array of strings and regular expressions that represent the mask
 */
export const dateMask = (value: string, dateFormat?: string, lang?: string) => {
  return getMaskFromFormat(value, dateFormat || getDateFormatByLang(lang));
};

/**
 * Represents Tiller's date range mask for handing over to the Masked Input component.
 * The mask has checks for month and day values of the date.
 *
 * Value example: 'mm/dd/yyyy - mm/dd/yyyy'
 *
 * @param {string | null}  value          Date value for which the mask is created
 * @param {string}         dateFormat     Date format (if not provided, the default format inferred from 'lang' is used)
 * @param {string}         lang           Language for which the mask is created
 * @return  {(string | RegExp)[]}         Returns an array of strings and regular expressions that represent the mask
 */
export const dateRangeMask = (value: string | null, dateFormat?: string, lang?: string) => {
  const startingDate = value?.split(" - ")[0] as string;
  const endingDate = value?.split(" - ")[1] as string;
  const rangeMask = [" ", "-", " "];

  return [
    ...getMaskFromFormat(startingDate, dateFormat || getDateFormatByLang(lang)),
    ...rangeMask,
    ...getMaskFromFormat(endingDate, dateFormat || getDateFormatByLang(lang)),
  ];
};

/**
 * Represents Tiller's date time mask for handing over to the Masked Input component.
 * The mask has checks for month and day values of the date.
 *
 * Value example: 'mm/dd/yyyy hh:mm'
 *
 * @param {string | null}  value          Date value for which the mask is created
 * @param {string}         dateFormat     Date format (if not provided, the default format inferred from 'lang' is used)
 * @param {string}         lang           Language for which the mask is created
 * @param {boolean}        twelveHours    Determines whether the time is in 12-hour format
 * @return  {(string | RegExp)[]}         Returns an array of strings and regular expressions that represent the mask
 */
export const dateTimeMask = (value: string, dateFormat?: string, lang?: string, twelveHours?: boolean) => {
  const timeAddOn = " HH:mm"; // HH must be uppercase!

  return getMaskFromFormat(value, dateFormat ? dateFormat + timeAddOn : getDateFormatByLang(lang, true), twelveHours);
};

/**
 * Represents Tiller's time mask for handing over to the Masked Input component.
 *
 * The mask has checks for month and day values of the date and supports 'hh:mm' and 'hh:mm AM/PM' formats.
 *
 * @param {string | null}  value          Date value for which the mask is created
 * @param {boolean}        twelveHours    Determines whether the time is in 12-hour format
 * @return  {(string | RegExp)[]}         Returns an array of strings and regular expressions that represent the mask
 */
export const timeMask = (value: string, twelveHours?: boolean) => {
  return getMaskFromFormat(value, "HH:mm", twelveHours);
};

export const getMaskFromFormat = (value: string, format: string, twelveHours?: boolean): (string | RegExp)[] => {
  const monthPosition = format.indexOf("MM");
  const dayPosition = format.indexOf("dd");
  const hourPosition = format.indexOf("HH");
  const minutePosition = format.indexOf("mm");

  const generatedMask: (string | RegExp)[] = [];
  format.split("").forEach((char, index) => {
    if (char === "M") {
      if (monthPosition !== index) {
        generatedMask.push(determineMonthInput(value, index - 1));
      } else {
        generatedMask.push(/[0-1]/);
      }
    } else if (char === "d") {
      if (dayPosition !== index) {
        generatedMask.push(determineDayInput(value, index - 1));
      } else {
        generatedMask.push(/[0-3]/);
      }
    } else if (char === "y" && dayPosition !== index) {
      generatedMask.push(/\d/);
    } else if (isNotLetter(char)) {
      generatedMask.push(char);
    }
    if (char === "H") {
      if (hourPosition !== index) {
        generatedMask.push(determineHourInput(value, twelveHours || false, index - 1));
      } else {
        generatedMask.push(twelveHours ? /[0-1]/ : /[0-2]/);
      }
    } else if (char === "m") {
      if (minutePosition !== index) {
        generatedMask.push(/[0-9]/);
      } else {
        generatedMask.push(/[0-5]/);
      }
    }
  });
  if (twelveHours) {
    generatedMask.push(...twelveHoursAddOn);
  }

  return generatedMask;
};

function isNotLetter(char: string): boolean {
  return !/[a-zA-Z]/.test(char);
}

export const determineMonthInput = (value: string | null, position: number) => {
  if (value && value.length > 0) {
    if (value[position] === "0") {
      return /[1-9]/;
    }
  }

  return /[0-2]/;
};

export const determineDayInput = (value: string | null, position: number) => {
  if (value && value.length > 0) {
    if (value[position] === "3") {
      return /[0-1]/;
    }
    if (value[position] === "0") {
      return /[1-9]/;
    }
  }

  return /[0-9]/;
};

export const determineHourInput = (value: string | null, twelveHours: boolean, position: number) => {
  if (value && value.length > 0) {
    if (value[position] === "2") {
      return /[0-3]/;
    }
    if (twelveHours && value[position] === "1") {
      return /[0-2]/;
    }
  }

  return /[0-9]/;
};
