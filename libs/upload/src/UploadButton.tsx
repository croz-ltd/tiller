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

import { isObject } from "lodash";
import { UploadyContext, useItemErrorListener, useItemFinishListener, useItemStartListener } from "@rpldy/uploady";

import { Button, ButtonProps } from "@tiller-ds/core";
import { ComponentTokens, useIcon, useTokens } from "@tiller-ds/theme";

import UploadyWrapper, { UploadyWrapperProps } from "./UploadyWrapper";
import { UseFileUpload, File, defaultUploadResponseMapper } from "./useFileUpload";
import { BatchItem } from "@rpldy/shared";

type Status = "idle" | "waiting" | "error" | "success";

export type UploadButtonProps<T extends File> = {
  /**
   * Url on the backend which is called for saving files
   */
  url: string;

  /**
   * Object return from {@link useFileUpload} hook, used internally for correct behaviour of the file
   * upload
   */
  hook: UseFileUpload<T>;

  /**
   * The color of the component.
   */
  color?:
    | "primary"
    | "success"
    | "secondary"
    | "tertiary"
    | "info"
    | "danger"
    | "warning"
    | "red"
    | "orange"
    | "pink"
    | "blue"
    | "indigo"
    | "purple"
    | "yellow"
    | "green"
    | "teal"
    | "gray"
    | undefined;

  /**
   * Whether will user be able to upload multiple files at once
   */
  allowMultiple?: boolean;

  /**
   * Is the UploadButton disabled
   */
  disabled?: boolean;

  /**
   * Function which fired in case item upload failed.
   */
  onError?: (message: string) => void;
  /**
   * Custom mapper for the backend response, used when a subclass of {@link File} is used to extend uploaded file data
   * @param item file that is uploaded
   * @param originalFileName original file name of the file (in case if the backend does a rename)
   */
  mapUploadResponse?: (item: BatchItem, originalFileName: string) => T;

  /**
   * `withCredentials` flag on fetch requests for uploading
   */
  withCredentials?: boolean;

  /**
   * UploadButton content
   */
  children?: React.ReactNode;
} & Omit<UploadyWrapperProps, "children"> &
  Omit<ButtonProps, "onClick"> &
  StatusButtonTokensProps;

type CustomUploadButtonProps<T extends File> = {
  /**
   * Determines whether the component is disabled.
   */
  disabled?: boolean;

  /**
   * Tracks which files are currently in the file list. Details are described in DragZone Docs.
   */
  hook: UseFileUpload<T>;

  /**
   * The color of the component.
   */
  color?:
    | "primary"
    | "success"
    | "secondary"
    | "tertiary"
    | "info"
    | "danger"
    | "warning"
    | "red"
    | "orange"
    | "pink"
    | "blue"
    | "indigo"
    | "purple"
    | "yellow"
    | "green"
    | "teal"
    | "gray"
    | undefined;

  /**
   * UploadButton content (not exclusively text).
   */
  children?: React.ReactNode;

  /**
   * Function which fired in case item upload failed.
   */
  onError?: (message: string) => void;

  /**
   * Custom mapper for the backend response, used when a subclass of {@link File} is used to extend uploaded file data
   * @param item file that is uploaded
   * @param originalFileName original file name of the file (in case if the backend does a rename)
   */
  mapUploadResponse: (item: BatchItem, originalFileName: string) => T;
} & Omit<ButtonProps, "onClick"> &
  StatusButtonTokensProps;

type StatusButtonTokensProps = {
  tokens?: ComponentTokens<"StatusButton">;
};

export default function UploadButton<T extends File>({
  color,
  url,
  send,
  enhancer,
  destinationOptions,
  allowMultiple = false,
  mapUploadResponse = defaultUploadResponseMapper as (item: BatchItem, originalFileName: string) => T,
  withCredentials,
  listeners,
  ...props
}: UploadButtonProps<T>) {
  return (
    <UploadyWrapper
      url={url}
      send={send}
      enhancer={enhancer}
      destinationOptions={destinationOptions}
      allowMultiple={allowMultiple}
      withCredentials={withCredentials}
      listeners={listeners}
    >
      <CustomUploadButton color={color} mapUploadResponse={mapUploadResponse} {...props} />
    </UploadyWrapper>
  );
}

function CustomUploadButton<T extends File>({ children, hook, color, disabled, onError, ...props }: CustomUploadButtonProps<T>) {
  const tokens = useTokens("StatusButton", props.tokens);
  const size = props.size || "md";
  const [status, setStatus] = React.useState<Status>("idle");
  const [originalFileName, setOriginalFileName] = React.useState<string>("");
  const uploady = React.useContext(UploadyContext);

  const onClick = React.useCallback(async () => {
    uploady.showFileUpload();
  }, [uploady]);

  useItemStartListener((item) => {
    setOriginalFileName(item.file.name);
    setStatus("waiting");
  });

  useItemErrorListener((item) => {
    if (onError && isObject(item.uploadResponse.data)) {
      onError(item.uploadResponse.data.intl || item.uploadResponse.data.message || "");
    }
    setStatus("error");
  });

  useItemFinishListener((item) => {
    setStatus("success");
    const file: T = props.mapUploadResponse(item, originalFileName);
    hook?.onUploadedFiles(file);
  });

  React.useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const checkIcon = useIcon("completed", undefined, { size: tokens.icon.size[size] });
  const warningIcon = useIcon("warning", undefined, { size: tokens.icon.size[size] });
  const loadingIcon = useIcon("loading", undefined, { size: tokens.icon.size[size] });

  if (status === "waiting") {
    const buttonColor = color || "primary";
    return (
      <Button {...props} color={buttonColor} leadingIcon={loadingIcon} onClick={onClick} disabled={disabled}>
        {" "}
        {children}
      </Button>
    );
  } else if (status === "success") {
    const buttonColor = color || "success";
    return (
      <Button {...props} leadingIcon={checkIcon} color={buttonColor} onClick={onClick} disabled={disabled}>
        {" "}
        {children}
      </Button>
    );
  } else if (status === "error") {
    const buttonColor = color || "danger";
    return (
      <Button {...props} leadingIcon={warningIcon} color={buttonColor} onClick={onClick} disabled={disabled}>
        {" "}
        {children}
      </Button>
    );
  } else {
    const buttonColor = color || "primary";
    return (
      <Button {...props} color={buttonColor} onClick={onClick} disabled={disabled}>
        {" "}
        {children}
      </Button>
    );
  }
}
