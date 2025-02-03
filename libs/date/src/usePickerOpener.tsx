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

import * as React from "react";

export function usePickerOpener(
  isOpened: boolean,
  inputRef: React.RefObject<HTMLInputElement>,
  pickerRef: React.RefObject<HTMLDivElement>,
  onBlur?: () => void,
) {
  const [opened, setOpened] = React.useState<boolean>(isOpened);

  React.useEffect(() => {
    function listener(event: MouseEvent) {
      const { relatedTarget, target } = event;

      const isOutsideInput = inputRef.current && !inputRef.current?.contains((relatedTarget || target) as Element);
      const isOutsideTimePicker = pickerRef.current && !pickerRef.current?.contains((relatedTarget || target) as Element);

      if (opened && isOutsideInput && isOutsideTimePicker) {
        setOpened(false);
        if (onBlur) {
          onBlur();
        }
      }
    }

    window.addEventListener("mousedown", listener);
    return () => {
      window.removeEventListener("mousedown", listener);
    };
  }, [opened]);

  return { opened, setOpened };
}
