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

const emptyArray: (string | RegExp)[] = [];
export const defaultPlaceholderChar = "_";

export function convertMaskToPlaceholder(mask = emptyArray, placeholderChar = defaultPlaceholderChar) {
  if (!isArray(mask)) {
    throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");
  }

  if (mask.indexOf(placeholderChar) !== -1) {
    throw new Error(
      "Placeholder character must not be used as part of the mask. Please specify a character " +
        "that is not present in your mask as your placeholder character.\n\n" +
        `The placeholder character that was received is: ${JSON.stringify(placeholderChar)}\n\n` +
        `The mask that was received is: ${JSON.stringify(mask)}`,
    );
  }

  return mask
    .map((char: any) => {
      return char instanceof RegExp ? placeholderChar : char;
    })
    .join("");
}

export function isArray(value: any) {
  return (Array.isArray && Array.isArray(value)) || value instanceof Array;
}
