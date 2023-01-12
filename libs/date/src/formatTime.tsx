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

export default function formatTime(value: string) {
  if (value) {
    if (value.includes("T")) {
      const dateTime = value.split("T");
      const time = dateTime[1].split(":");

      return [Number(time[0]), Number(time[1])];
    } else if (value.includes(":")) {
      const time = value.split(":");

      return [Number(time[0]), Number(time[1])];
    } else {
      return [0, 0];
    }
  }

  return [0, 0];
}
