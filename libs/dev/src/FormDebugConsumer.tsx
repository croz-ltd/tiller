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

import { useFormikContext } from "formik";

import { useFormDebugUpdateContext } from "./FormDebugProvider";

// good enough randomness for our use-case
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function FormDebugConsumer() {
  const formKeyRef = React.useRef<string>("");

  const { update } = useFormDebugUpdateContext();
  const { initialValues, values } = useFormikContext();

  React.useEffect(() => {
    formKeyRef.current = uuidv4();

    update(formKeyRef.current, initialValues);

    return () => {
      update(formKeyRef.current, null);
    };
  }, [formKeyRef, initialValues, update]);

  React.useEffect(() => {
    requestAnimationFrame(() => {
      update(formKeyRef.current, values);
    });
  }, [formKeyRef, update, values]);

  return null;
}

export default React.memo(FormDebugConsumer, () => true);
