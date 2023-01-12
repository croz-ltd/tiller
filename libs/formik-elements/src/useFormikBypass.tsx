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

import * as React from "react";
import { useField, useFormikContext } from "formik";

export default function useFormikBypass(name: string) {
  const formik = useFormikContext();
  const [, meta, helpers] = useField(name);
  const initialError = React.useRef(meta.initialError);

  React.useEffect(() => {
    if (formik.submitCount > 0) {
      helpers.setTouched(true);
      initialError.current = meta.initialError;
    }
  }, [formik.isSubmitting]);

  return initialError;
}
