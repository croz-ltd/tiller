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

import { useEffect } from "react";
import { useFormikContext } from "formik";

/**
 * A hook that enables scrolling of the viewport to the first form element in a Formik form with an error.
 *
 * The same functionality can be enabled directly through the `scrollToError` prop of `FormContainer` component.
 *
 * @returns {void}
 */
export default function useScrollToError(): void {
  const formik = useFormikContext();
  const submitting = formik?.isSubmitting;
  const errors = formik?.errors;

  useEffect(() => {
    if (errors) {
      const errorKeys = Object.keys(errors);
      const firstErrorField = errorKeys[0];
      const refElement = document.getElementsByName(firstErrorField)[0];
      const formInfo = findFormParent(refElement);
      if (formInfo) {
        const inputsWithErrors = extractInputsWithErrors(formInfo, errorKeys);
        const scrollToElement = document.getElementsByName(inputsWithErrors[0])[0];
        scrollToElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitting]);
}

function findFormParent(el: HTMLElement) {
  let parent = el?.parentElement;
  while (parent) {
    if (parent.tagName.toLowerCase() === "form") {
      return parent;
    }
    parent = parent?.parentElement;
  }
  return null;
}

function extractInputsWithErrors(formHTML: HTMLElement, errorKeys: string[]) {
  const inputsWithErrors: string[] = [];
  const inputElements = formHTML?.querySelectorAll("input[name], textarea[name]");

  inputElements?.forEach((input) => {
    const name = input.getAttribute("name");
    if (name && (errorKeys.includes(name) || (name.includes(" ") && includesDateRange(name, errorKeys)))) {
      inputsWithErrors.push(name);
    }
  });

  return inputsWithErrors;
}

function includesDateRange(name: string, errorKeys: string[]) {
  const [firstPart, secondPart] = name.split(" ");
  return errorKeys.includes(firstPart) || errorKeys.includes(secondPart);
}
