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

import { useField } from "formik";

import { UploadButton, UploadButtonProps, File } from "@tiller-ds/upload";

export type UploadButtonFieldProps<T extends File> = {
  /**
   * The accessor value for the component (for validation, fetching, etc.).
   */
  name: string;
} & UploadButtonProps<T>;

export default function UploadButtonField<T extends File>({ name, ...props }: UploadButtonFieldProps<T>) {
  const [field, , helpers] = useField<string[]>(name);
  const fieldValue = React.useRef<string[]>();

  React.useEffect(() => {
    props.hook.onUploadedFileIds(field.value);
    fieldValue.current = field.value;
  }, [field.value]);

  React.useEffect(() => {
    props.hook.onUpdateCallback((added, deleted) => {
      if (added) {
        helpers.setValue([...(fieldValue.current || []), ...(Array.isArray(added) ? added : [added])]);
      } else if (deleted) {
        helpers.setValue(
          (fieldValue.current || []).filter((id) => (Array.isArray(deleted) ? deleted.includes(id) : id !== deleted))
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UploadButton hook={props.hook} url={props.url} {...props}>
      {props.children}
    </UploadButton>
  );
}
