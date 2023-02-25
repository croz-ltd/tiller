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

/**
 * Represents Tiller's dynamic mask hook for handing over to the Masked Input component.
 * The mask is dynamic because it changes when the input element is focused and unfocused.
 * When the input element is focused, the original mask is shown, and when the input element is unfocused,
 * the mask is shortened to exclude the placeholder characters.
 * @param {RefObject<HTMLInputElement>} ref           Reference to the input element for which the mask is created
 * @param {string}                      value         Value of the field for which the mask is created
 * @param {(string | RegExp)[]}         originalMask  Original mask for the field (shown when the field is focused)
 * @return  {(string | RegExp)[]}                     Returns an array of strings and regular expressions that represent a dynamic mask
 * @component
 * @example
 * const dynamicMask = useDynamicMask(ref, value, originalMask)
 * return (
 *   <MaskedInput
 *       {...props}
 *       value={value}
 *       inputRef={ref}
 *       mask={dynamicMask} />
 * )
 */
export default function useDynamicMask(
  ref: RefObject<HTMLInputElement>,
  value: string,
  originalMask: (string | RegExp)[],
): (string | RegExp)[] {
  const getAnyCharMask = useCallback(() => {
    const placeholderIndex = value?.split("").indexOf("_");
    return range(0, placeholderIndex !== -1 ? placeholderIndex : value.length).map(() => /./);
  }, [value]);

  const [mask, setMask] = useState<(string | RegExp)[]>(getAnyCharMask());

  useEffect(() => {
    const handleFocusIn = () => {
      // Return original mask when the ref's element is focused
      setMask(originalMask);
    };
    const handleFocusOut = () => {
      // Change the mask when the ref's element is unfocused
      setMask(getAnyCharMask());
    };

    const refElement = ref.current;
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
  }, [getAnyCharMask, originalMask, ref, value]);

  return mask;
}
