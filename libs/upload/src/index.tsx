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

import { DragZoneProps as InternalDragZoneProps } from "./DragZone";
import { UploadButtonProps as InternalUploadButtonProps } from "./UploadButton";
import { Destination as InternalDestination } from "./UploadyWrapper";
import { File as InternalFile } from "./useFileUpload";

export type DragZoneProps<T extends File> = InternalDragZoneProps<T>;
export type UploadButtonProps<T extends File> = InternalUploadButtonProps<T>;
export type Destination = InternalDestination;
export type File = InternalFile;

export { default as useFileUpload } from "./useFileUpload";

export { default as DragZone, DragZoneLoader } from "./DragZone";
export { default as FileList } from "./FileList";
export { default as UploadButton } from "./UploadButton";
