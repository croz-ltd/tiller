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

import React, { useEffect, useState } from "react";

import { UploadyContext, useItemProgressListener, useItemFinishListener, useItemStartListener } from "@rpldy/uploady";
import UploadDropZone from "@rpldy/upload-drop-zone";

import { Field, FieldProps } from "@tiller-ds/form-elements";
import { LoadingIcon } from "@tiller-ds/icons";
import { ComponentTokens, cx, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";
import { usePrevious } from "@tiller-ds/util";

import UploadyWrapper, { UploadyWrapperProps } from "./UploadyWrapper";

import { UseFileUpload, File, defaultUploadResponseMapper } from "./useFileUpload";
import { BatchItem } from "@rpldy/shared";

export type DragZoneProps<T extends File> = {
  /**
   * Whether will user be able to upload multiple files at once
   */
  allowMultiple?: boolean;

  /**
   * Is the DragZone disabled
   */
  disabled?: boolean;

  /**
   * Object return from {@link useFileUpload} hook, used internally for correct behaviour of the file
   * upload
   */
  hook: UseFileUpload<T>;

  /**
   * Subtitle text in the drag window
   */
  subtitle?: React.ReactNode;

  /**
   * Title text in the drag window
   */
  title: React.ReactNode;

  /**
   * Custom mapper for the backend response, used when a subclass of {@link File} is used to extend uploaded file data
   * @param item file that is uploaded
   * @param originalFileName original file name of the file (in case if the backend does a rename)
   */
  mapUploadResponse?: (item: BatchItem, originalFileName: string) => T;

  /**
   * Custom additional styling applied to the component.
   */
  className?: string;

  /**
   * Defines the behaviour of the component once the state resets.
   */
  onReset?: () => void;

  /**
   * Function fired when the component is clicked.
   */
  onClick?: () => void;
  /**
   * Custom upload icon that overrides the default icon.
   */
  uploadIcon?: React.ReactElement;
  /**
   * Enables loading via a custom loader.
   *
   * If set to `null` no loader will be displayed on file upload.
   *
   * @param   {number}  uploadPercentage  Percentage retrieved from the loader on file upload.
   */
  loader?: ((uploadPercentage: number) => React.ReactNode) | null;

  /**
   * Time in milliseconds of how long will dropzone component wait until loader element is shown.
   * Useful when uploading small files which will cause flicker of the loader element.
   * Doesn't adjust uploading percentages for the additional delay time, so UX behaviour needs to be additionally checked.
   */
  preLoadDelay?: number;

  /**
   * Time in milliseconds of how long loader element will be shown after uploading is finished.
   * Useful when uploading small files which will cause flicker of the loader element.
   * Doesn't adjust uploading percentages for the additional delay time, so UX behaviour needs to be additionally checked.
   */
  postLoadDelay?: number;

  /**
   * A unique identifier for testing purposes.
   * This identifier can be used in testing frameworks like Jest or Cypress to locate specific elements for testing.
   * It helps ensure that UI components are behaving as expected across different scenarios.
   * @type {string}
   * @example
   * // Usage:
   * <MyComponent data-testid="my-component" />
   * // In tests:
   * getByTestId('my-component');
   */
  "data-testid"?: string;
} & Omit<UploadyWrapperProps, "children"> &
  Omit<FieldProps, "children"> &
  DragZoneTokensProps;

type DragZoneTokensProps = {
  tokens?: ComponentTokens<"DragZone">;
};

type CustomUploadDropZoneContainerProps<T extends File> = {
  /**
   * @see {@link DragZoneProps#hook}
   */
  hook: UseFileUpload<T>;

  /**
   * @see {@link DragZoneProps#mapUploadResponse}
   */
  mapUploadResponse: (item: BatchItem, originalFileName: string) => T;

  /**
   * @see {@link DragZoneProps#subtitle}
   */
  subtitle?: React.ReactNode;

  /**
   * @see {@link DragZoneProps#title}
   */
  title?: React.ReactNode;

  /**
   * @see {@link DragZoneProps#uploadIcon}
   */
  uploadIcon?: React.ReactElement;

  /**
   * `withCredentials` flag on fetch requests for uploading
   */
  withCredentials?: boolean;

  /**
   * Custom additional styling applied to the component.
   */
  className?: string;
  /**
   * Enables loading via a custom loader.
   *
   * If set to `null` no loader will be displayed on file upload.
   *
   * @param   {number}  uploadPercentage  Percentage retrieved from the loader on file upload.
   */
  loader?: ((uploadPercentage: number) => React.ReactNode) | null;

  /**
   * @see {@link DragZoneProps#preLoadDelay}
   */
  preLoadDelay?: number;

  /**
   * @see {@link DragZoneProps#postLoadDelay}
   */
  postLoadDelay?: number;

  /**
   * A unique identifier for testing purposes.
   * This identifier can be used in testing frameworks like Jest or Cypress to locate specific elements for testing.
   * It helps ensure that UI components are behaving as expected across different scenarios.
   * @type {string}
   * @example
   * // Usage:
   * <MyComponent data-testid="my-component" />
   * // In tests:
   * getByTestId('my-component');
   */
  "data-testid"?: string;
};

type CustomUploadDropZoneProps = {
  disabled?: boolean;
  onClick?: () => void;
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  uploadActive?: boolean;
  uploadIcon?: React.ReactElement;
  className?: string;
  uploadPercentage?: number;
  loader?: ((uploadPercentage: number) => React.ReactNode) | null;
  preLoadDelay?: number;
  postLoadDelay?: number;
  "data-testid"?: string;
} & TokenProps<"DragZone">;

export default function DragZone<T extends File>({
  allowMultiple = false,
  disabled = false,
  mapUploadResponse = defaultUploadResponseMapper as (item: BatchItem, originalFileName: string) => T,
  hook,
  send,
  enhancer,
  destinationOptions,
  listeners,
  subtitle,
  title,
  url,
  uploadIcon,
  withCredentials,
  className,
  loader = (uploadPercentage: number) => <DragZoneLoader uploadPercentage={uploadPercentage} />,
  preLoadDelay = 0,
  postLoadDelay = 0,
  ...props
}: DragZoneProps<T>) {
  const tokens = useTokens("DragZone", props.tokens);
  const onDragOverClassName = "opacity-50";

  return (
    <Field {...props} data-testid={props["data-testid"] && `${props["data-testid"]}-wrapper`}>
      {!disabled ? (
        <UploadyWrapper
          url={url}
          send={send}
          enhancer={enhancer}
          listeners={listeners}
          destinationOptions={destinationOptions}
          allowMultiple={allowMultiple}
          withCredentials={withCredentials}
        >
          <UploadDropZone className={tokens.uploadyDropZone} onDragOverClassName={onDragOverClassName}>
            <CustomUploadDropZoneContainer
              hook={hook}
              title={title}
              subtitle={subtitle}
              mapUploadResponse={mapUploadResponse}
              uploadIcon={uploadIcon}
              className={className}
              loader={loader}
              preLoadDelay={preLoadDelay}
              postLoadDelay={postLoadDelay}
              data-testid={props["data-testid"]}
            />
          </UploadDropZone>
        </UploadyWrapper>
      ) : (
        <CustomUploadDropZone disabled={disabled} uploadActive={false} title={title} subtitle={subtitle} />
      )}
    </Field>
  );
}

function CustomUploadDropZoneContainer<T extends File>({
  hook,
  loader,
  ...props
}: CustomUploadDropZoneContainerProps<T>) {
  const uploady = React.useContext(UploadyContext);
  const [originalFileName, setOriginalFileName] = React.useState<string>("");
  const [uploadActive, setUploadActive] = React.useState<boolean>(false);
  const [uploadPercentage, setUploadPercentage] = React.useState<number>(0);

  const onClick = React.useCallback(async () => {
    uploady.showFileUpload();
  }, [uploady]);

  useItemStartListener((item) => {
    setUploadActive(true);
    setUploadPercentage(0);
    setOriginalFileName(item.file.name);
  });

  useItemProgressListener((item) => {
    setUploadPercentage(item.completed);
  });

  useItemFinishListener((item) => {
    const file: T = props.mapUploadResponse(item, originalFileName);
    hook?.onUploadedFiles(file);
    setUploadActive(false);
  });

  return (
    <CustomUploadDropZone
      onClick={onClick}
      uploadActive={uploadActive}
      uploadPercentage={uploadPercentage}
      loader={loader}
      {...props}
    />
  );
}

function CustomUploadDropZone({
  title,
  subtitle,
  disabled = false,
  uploadActive,
  onClick,
  uploadIcon,
  className,
  loader,
  uploadPercentage,
  preLoadDelay,
  postLoadDelay,
  ...props
}: CustomUploadDropZoneProps) {
  const tokens = useTokens("DragZone", props.tokens);

  const customUploadDropZoneContainerClassName = cx(
    className,
    tokens.customUploadDropZoneContainer.master,
    tokens.customUploadDropZoneContainer.margin,
    tokens.customUploadDropZoneContainer.padding,
    tokens.customUploadDropZoneContainer.borderWidth,
    tokens.customUploadDropZoneContainer.borderStyle,
    tokens.customUploadDropZoneContainer.borderRadius,
    { "opacity-75 cursor-default": disabled },
    { [tokens.customUploadDropZoneContainer.borderColor]: !uploadActive },
    { [tokens.customUploadDropZoneContainer.borderDarkColor]: uploadActive },
  );

  const customUploadDropZoneTitleClassName = cx(
    tokens.customUploadDropZoneTitle.master,
    tokens.customUploadDropZoneTitle.fontSize,
    tokens.customUploadDropZoneTitle.fontWeight,
    tokens.customUploadDropZoneTitle.color,
  );

  const customUploadDropZoneSubtitleClassName = cx(
    tokens.customUploadDropZoneSubtitle.fontSize,
    tokens.customUploadDropZoneSubtitle.color,
  );

  const uploadZoneIcon = useIcon("file", uploadIcon, {
    size: tokens.iconSize,
    className: `mx-auto ${tokens.iconColor}`,
  });

  const [preLoadDelayPassed, setPreLoadDelayPassed] = useState(false);
  const [postUploadPeriodActive, setPostUploadPeriodActive] = useState(false);

  const prevUploadActive = usePrevious(uploadActive);

  useEffect(() => {
    if (uploadActive) {
      setPreLoadDelayPassed(false);
      setTimeout(() => {
        setPreLoadDelayPassed(true);
      }, preLoadDelay);
    } else if (prevUploadActive && !uploadActive) {
      setPostUploadPeriodActive(true);
      setTimeout(() => {
        setPostUploadPeriodActive(false);
      }, postLoadDelay);
    }
  }, [uploadActive, preLoadDelay, postLoadDelay, prevUploadActive]);

  const showLoader = loader && ((preLoadDelayPassed && uploadActive) || postUploadPeriodActive);

  return (
    <div className={customUploadDropZoneContainerClassName} onClick={onClick} data-testid={props["data-testid"]}>
      <div className={tokens.customUploadDropZoneDescriptionContainer}>
        {showLoader && loader && uploadPercentage ? loader(uploadPercentage) : uploadZoneIcon}
        <label className={customUploadDropZoneTitleClassName}>{title}</label>
        <p className={customUploadDropZoneSubtitleClassName}>{subtitle}</p>
      </div>
    </div>
  );
}

type DragZoneLoaderProps = {
  uploadPercentage?: number;
  spinner?: boolean;
  percentage?: boolean;
} & TokenProps<"DragZone">;

export function DragZoneLoader({ uploadPercentage, spinner = true, percentage = true, ...props }: DragZoneLoaderProps) {
  const tokens = useTokens("DragZone", props.tokens);

  if (!spinner && !percentage) {
    console.warn(
      "DragZoneLoader is not configured to show spinner and/or percentage. " +
        "At least one of these props needs to be enabled in order for the component to display something.",
    );
  }

  const loaderClassName = cx(tokens.loader.master, `h-${tokens.iconSize}`);

  return (
    <div className={loaderClassName}>
      {spinner && <LoadingIcon size={tokens.iconSize} />}
      {percentage && <span className={tokens.loader.percentage}>{uploadPercentage}%</span>}
    </div>
  );
}
