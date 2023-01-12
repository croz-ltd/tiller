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

const MIDNIGHT = 0;
const NOON = 12;
const PM = "PM";

export default function transformHourTo24HoursValue(hour: number, clockType: string) {
  let transformedHour: number = hour;
  if (clockType === PM) {
    transformedHour = transformedHour < NOON ? transformedHour + NOON : transformedHour;
  } else {
    transformedHour = transformedHour === NOON ? MIDNIGHT : hour;
  }

  return transformedHour;
}
