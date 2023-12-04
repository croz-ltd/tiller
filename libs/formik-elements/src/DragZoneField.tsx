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

import { DragZone, DragZoneProps, File } from "@tiller-ds/upload";

export type DragZoneFieldProps<T extends File> = {
  /**
   * The accessor value for the component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Controls whether the file upload is restricted to a single file.
   * If set to true, only one file can be uploaded at a time.
   * @default false
   */
  singleFileUpload?: boolean;
} & DragZoneProps<T>;

export default function DragZoneField<T extends File>({ name, ...props }: DragZoneFieldProps<T>) {
  const [field, , helpers] = useField(name);
  const fieldValue = React.useRef<string[]>();

  React.useEffect(() => {
    props.hook.onUploadedFileIds(field.value);
    fieldValue.current = field.value;
  }, [field.value]);

  React.useEffect(() => {
    props.hook.onUpdateCallback((added, deleted) => {
      if (added) {
        const addedFiles = Array.isArray(added) ? added : [added];
        const updatedFiles = props.singleFileUpload ? addedFiles : [...(fieldValue.current || []), ...addedFiles];
        helpers.setValue(updatedFiles);
      } else if (deleted) {
        helpers.setValue(
          (fieldValue.current || []).filter((id) => (Array.isArray(deleted) ? !deleted.includes(id) : id !== deleted))
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <DragZone hook={props.hook} url={props.url} {...props} />;
}
