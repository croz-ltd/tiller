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
    return `yyyy-MM-dd${timeValue}`;
  }
  return lang === "hr" ? `dd. MM. yyyy.${timeValue}` : `MM/dd/yyyy${timeValue}`;
};

/**
 * Returns a Date object from a string or Date in desired language or ISO format if no language is provided.
 * If Date object is passed, it is returned as is.
 *
 * Currently supported languages: Croatian ('hr') and English ('en').
 * @param   {string}    toFormat   Date to be formatted
 * @param   {string}    lang       Language of the wished format, excluding it returns the standard ISO format
 * @param   {boolean}   time       Determines whether to include time value in the format
 * @return  {Date | null}          Date object in desired language or null if the conversion is unsuccessful
 */
export const formatDate = (toFormat: string | null, lang?: string, time?: boolean) => {
  if (toFormat) {
    const convertedDate = dateFns.parse(toFormat, getDateFormatByLang(lang, time), new Date());
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
  const toFormat = value instanceof Date ? value : formatDate(value, lang, time);
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
  const minutes = value.split(" ")[0].split(":")[1];
  const amPm = value.split(" ")[1].toUpperCase();
  const hours = transformHourTo24HoursValue(parseInt(value.split(":")[0]), amPm === "PM" ? PM : AM);
  if (amPm === "PM" || amPm === "AM") {
    return `${hours}:${minutes}`;
  } else {
    return value;
  }
};

/**
 * Represents Tiller's date mask for handing over to the Masked Input component.
 * The mask has checks for month and day values of the date and supports English ('mm/dd/yyyy')
 * and Croatian ('dd. mm. yyyy.') formats.
 * @param {string | null}  value          Date value for which the mask is created
 * @param {string}    lang                Language for which the mask is created
 * @return  {(string | RegExp)[]}         Returns an array of strings and regular expressions that represent the mask
 */
export const dateMask = (value: string | null, lang: string) => {
  const enMask = [
    /[0,1]/,
    determineMonthInput("en", value),
    "/",
    /[0-3]/,
    determineDayInput("en", value),
    "/",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  const hrMask = [
    /[0-3]/,
    determineDayInput("hr", value),
    ".",
    " ",
    /[0,1]/,
    determineMonthInput("hr", value),
    ".",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ".",
  ];

  if (lang === "hr") {
    return hrMask;
  }
  return enMask;
};

/**
 * Represents Tiller's date range mask for handing over to the Masked Input component.
 * The mask has checks for month and day values of the date and supports English ('mm/dd/yyyy - mm/dd/yyyy')
 * and Croatian ('dd. mm. yyyy. - dd. mm. yyyy.') formats.
 * @param {string | null}  value          Date value for which the mask is created
 * @param {string}    lang                Language for which the mask is created
 * @return  {(string | RegExp)[]}         Returns an array of strings and regular expressions that represent the mask
 */
export const dateRangeMask = (value: string | null, lang: string) => {
  const startingDate = value?.split(" - ")[0] as string;
  const endingDate = value?.split(" - ")[1] as string;

  return [...dateMask(startingDate, lang), " ", "-", " ", ...dateMask(endingDate, lang)];
};

/**
 * Represents Tiller's date time mask for handing over to the Masked Input component.
 * The mask has checks for month and day values of the date and supports English
 * ('mm/dd/yyyy hh:mm' or 'mm/dd/yyyy hh:mm AM/PM') and Croatian ('dd. mm. yyyy. hh:mm') formats.
 * @param {string | null}  value          Date value for which the mask is created
 * @param {string}         lang           Language for which the mask is created
 * @param {boolean}        twelveHours    Determines whether the time is in 12-hour format
 * @return  {(string | RegExp)[]}         Returns an array of strings and regular expressions that represent the mask
 */
export const dateTimeMask = (value: string | null, lang: string, twelveHours: boolean) => {
  const enMask = [
    /[0,1]/,
    determineMonthInput("en", value),
    "/",
    /[0-3]/,
    determineDayInput("en", value),
    "/",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    twelveHours ? /[0-1]/ : /[0-2]/,
    determineHourInput("en", value, twelveHours, false),
    ":",
    /[0-5]/,
    /[0-9]/,
  ];

  const hrMask = [
    /[0-3]/,
    determineDayInput("hr", value),
    ".",
    " ",
    /[0,1]/,
    determineMonthInput("hr", value),
    ".",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ".",
    " ",
    /[0-2]/,
    determineHourInput("hr", value, false, false),
    ":",
    /[0-5]/,
    /[0-9]/,
  ];

  if (lang === "hr") {
    return twelveHours ? [...hrMask, ...twelveHoursAddOn] : hrMask;
  }
  return twelveHours ? [...enMask, ...twelveHoursAddOn] : enMask;
};

/**
 * Represents Tiller's time mask for handing over to the Masked Input component.
 * The mask has checks for month and day values of the date and supports 'hh:mm' and 'hh:mm AM/PM' formats.
 * @param {string | null}  value          Date value for which the mask is created
 * @param {boolean}        twelveHours    Determines whether the time is in 12-hour format
 * @return  {(string | RegExp)[]}         Returns an array of strings and regular expressions that represent the mask
 */
export const timeMask = (value: string | null, twelveHours?: boolean) => {
  const mask = [
    twelveHours ? /[0-1]/ : /\d/,
    determineHourInput("hr", value, twelveHours || false, true),
    ":",
    /[0-5]/,
    /[0-9]/,
  ];

  return twelveHours ? [...mask, ...twelveHoursAddOn] : mask;
};

export const determineMonthInput = (lang: "hr" | "en", value: string | null) => {
  const position = lang === "hr" ? 4 : 0;
  if (value && value.length > 0) {
    if (value[position] === "0") {
      return /[1-9]/;
    }
  }
  return /[0-2]/;
};

export const determineDayInput = (lang: "hr" | "en", value: string | null) => {
  const position = lang === "hr" ? 0 : 3;
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

export const determineHourInput = (
  lang: "hr" | "en",
  value: string | null,
  twelveHours: boolean,
  timeOnly: boolean,
) => {
  let position;
  if (timeOnly) {
    position = 0;
  } else {
    position = lang === "hr" ? 14 : 11;
  }
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
