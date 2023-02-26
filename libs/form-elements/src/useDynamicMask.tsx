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

import { useState, useEffect, RefObject, useCallback } from "react";

import { range } from "lodash";

import { defaultPlaceholderChar } from "./convertMaskToPlaceholder";

export default function useDynamicMask(
  ref: RefObject<HTMLInputElement>,
  value: string,
  originalMask: (string | RegExp)[],
): (string | RegExp)[] {
  const getAnyCharMask = useCallback(() => {
    const placeholderIndex = value?.split("").indexOf(defaultPlaceholderChar);
    return range(0, placeholderIndex !== -1 ? placeholderIndex : value.length).map(() => /./);
  }, [value]);

  const [dynamicMask, setDynamicMask] = useState<(string | RegExp)[]>(getAnyCharMask());

  const getDynamicMask = useCallback(() => {
    const anyCharArr = getAnyCharMask() as (string | RegExp)[];
    const isRefFocused = dynamicMask.every((value, index) => {
      if (anyCharArr[index] === undefined) {
        return false;
      }
      return value.toString() === anyCharArr[index].toString();
    });
    if (isRefFocused) {
      return dynamicMask;
    }
    return originalMask;
  }, [getAnyCharMask, dynamicMask, originalMask]);

  useEffect(() => {
    const handleFocusIn = () => {
      // Return original mask when the ref's element is focused
      setDynamicMask(originalMask);
    };
    const handleFocusOut = () => {
      // Change the mask when the ref's element is unfocused
      setDynamicMask(getAnyCharMask());
    };

    const refElement = ref ? ref.current : null;
    if (refElement) {
      refElement.addEventListener("focusin", handleFocusIn);
      refElement.addEventListener("focusout", handleFocusOut);
    }

    return () => {
      if (refElement) {
        refElement.removeEventListener("focusin", handleFocusIn);
        refElement.removeEventListener("focusout", handleFocusOut);
      }
    };
  }, [getAnyCharMask, originalMask, ref]);

  return getDynamicMask();
}
