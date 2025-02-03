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
import { BatchItem } from "@rpldy/shared";

type FileStatus = "added" | "uploading" | "cancelled" | "finished" | "error" | "aborted";

export type UseFileUpload<T extends File> = {
  /**
   * List of currently uploaded files. Dependent of the {@link uploadedFileIds} list-
   */
  uploadedFiles: Array<T>;

  /**
   * List of the ids of uploaded files. Needs to be updated for the change in {@link uploadedFiles} to be visible
   */
  uploadedFileIds: Array<string>;

  /**
   * Called internally when Uploady completes file upload. Should not be used in external API
   * @param file file that was uploaded
   */
  onUploadedFiles: (file: T) => void;

  /**
   * Should be called with updated list of current file ids in any case that list is changed
   * @param fileId
   */
  onUploadedFileIds: (fileId: string[] | null) => void;

  /**
   * Should be called in case of the action of deleting a specific file
   *
   * @param file
   */
  onDeletedFiles: (file: T | T[]) => void;

  /**
   * Callback is called whenever there is update in the file list
   *
   * @param callback function to be called on file list change (upload or delete)
   */
  onUpdateCallback: (callback: Callback) => void;

  /**
   * Used if you do not want to manage your ids manually. Call to add uploaded file to the file list.
   *
   * @param id id of the file to be added
   */
  addUploadedFileId: (id: string) => void;

  /**
   * Used if you do not want to manage your ids manually. Call to remove uploaded file to the file list.
   *
   * @param id id of the file to be removed
   */
  removeUploadedFileIds: (id: string | string[]) => void;
};

export type File = {
  /**
   * Unique identificator of the file
   */
  id: string;

  /**
   * Current name of the file
   */
  name: string;

  /**
   * Original file name at the time of the upload
   */
  originalFileName?: string;

  /**
   * Status of the file upload
   */
  status: FileStatus;

  /**
   * History of versions of the file
   */
  versions?: Array<Omit<File, "status">>;
};

/**
 * Default mapper for backend response, maps to {@link File} type
 * @param item item that was uploaded
 * @param originalFileName original file name in the time of the upload
 */
export function defaultUploadResponseMapper(item: BatchItem, originalFileName: string): File {
  return {
    id: item.uploadResponse.data.id,
    originalFileName: originalFileName,
    name: item.uploadResponse.data.name,
    status: item.state,
    versions: [],
  } as File;
}

type Callback = (added?: string | string[], deleted?: string | string[]) => void;

/**
 * Hook that works with uploady and tracks the current file list. Can be used with manual or with automatic tracking of
 * the uploaded files
 * @param files initial uploaded files
 * @param autoTrack should the hook automatically track uploaded files, default is false
 */
export default function useFileUpload<T extends File>(
  files: Array<Omit<T, "status">> = [],
  autoTrack: boolean = false,
): UseFileUpload<T> {
  const [uploadedFiles, setUploadedFiles] = React.useState<T[]>([]);
  const [uploadedFileIds, setUploadedFileIds] = React.useState<string[]>([]);

  const [updateCallback, setUpdateCallback] = React.useState<Callback | null>(null);

  const addUploadedFileId = React.useCallback((id: string | null) => {
    if (id !== null) {
      setUploadedFileIds((previousFileIds) => [...previousFileIds, id]);
    }
  }, []);

  const removeUploadedFileIds = React.useCallback((ids: string | string[] | null) => {
    if (ids !== null) {
      setUploadedFileIds((previousFileIds) =>
        previousFileIds.filter((id) => (Array.isArray(ids) ? !ids.includes(id) : id !== ids)),
      );
    }
  }, []);

  const onUploadedFiles = React.useCallback(
    (item: T) => {
      setUploadedFiles((uploadedFiles) => [...uploadedFiles, item]);
      if (autoTrack) {
        addUploadedFileId(item.id);
      } else {
        updateCallback?.(item.id, undefined);
      }
    },
    [updateCallback],
  );

  // Add initial files on mount
  React.useEffect(() => {
    setUploadedFiles(files.map((file) => ({ ...file, status: "finished" } as T)));
    setUploadedFileIds(files.map((file) => file.id));
  }, []);

  const onDeletedFiles = React.useCallback(
    (item: File | File[]) => {
      const ids = Array.isArray(item) ? item.map((file) => file.id) : item.id;
      if (autoTrack) {
        removeUploadedFileIds(ids);
      } else {
        updateCallback?.(undefined, ids);
      }
    },
    [updateCallback],
  );

  const onUploadedFileIds = React.useCallback((fileIds: string[] | null) => {
    setUploadedFileIds(fileIds || []);
  }, []);

  const onUpdateCallback = (callback: Callback) => {
    setUpdateCallback(() => callback);
  };

  const uploadedFilesFinal = React.useMemo(
    () => uploadedFiles.filter((file) => uploadedFileIds.includes(file.id)),
    [uploadedFiles, uploadedFileIds],
  );

  return {
    uploadedFiles: uploadedFilesFinal,
    uploadedFileIds,
    onUploadedFiles,
    onUploadedFileIds,
    onDeletedFiles,
    onUpdateCallback,
    addUploadedFileId,
    removeUploadedFileIds,
  };
}
