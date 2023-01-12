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

export default function getTimeZoneOffset(date: Date) {
  const offsetType = date.toString().includes("-") ? "-" : "+";
  const hourOffsetStartIndex = 0;
  const hourOffsetEndIndex = 3;
  const minuteOffsetEndIndex = 5;

  const offsetIndex = date.toString().indexOf(offsetType);
  const offsetValue = date.toString().substring(offsetIndex, offsetIndex + minuteOffsetEndIndex);

  const hourOffset = offsetValue.substring(hourOffsetStartIndex, hourOffsetEndIndex);
  const minuteOffset = offsetValue.substring(hourOffsetEndIndex, minuteOffsetEndIndex);

  return [hourOffset, minuteOffset];
}
