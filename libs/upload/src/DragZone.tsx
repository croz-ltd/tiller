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

import React from "react";

import { UploadyContext, useItemFinishListener, useItemStartListener } from "@rpldy/uploady";
import UploadDropZone from "@rpldy/upload-drop-zone";

import { Field, FieldProps } from "@tiller-ds/form-elements";
import { ComponentTokens, cx, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";

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
  uploadIcon?: React.ReactElement;
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
   * Custom additional styling applied to the component.
   */
  className?: string;
};

type CustomUploadDropZoneProps = {
  disabled?: boolean;
  onClick?: () => void;
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  uploadActive?: boolean;
  uploadIcon?: React.ReactElement;
  className?: string;
} & TokenProps<"DragZone">;

export default function DragZone<T extends File>({
  allowMultiple = false,
  disabled = false,
  mapUploadResponse = defaultUploadResponseMapper as (item: BatchItem, originalFileName: string) => T,
  hook,
  send,
  enhancer,
  destinationOptions,
  subtitle,
  title,
  url,
  uploadIcon,
  className,
  ...props
}: DragZoneProps<T>) {
  const tokens = useTokens("DragZone", props.tokens);
  const onDragOverClassName = "opacity-50";

  return (
    <Field {...props}>
      {!disabled ? (
        <UploadyWrapper
          url={url}
          send={send}
          enhancer={enhancer}
          destinationOptions={destinationOptions}
          allowMultiple={allowMultiple}
        >
          <UploadDropZone className={tokens.uploadyDropZone} onDragOverClassName={onDragOverClassName}>
            <CustomUploadDropZoneContainer
              hook={hook}
              title={title}
              subtitle={subtitle}
              mapUploadResponse={mapUploadResponse}
              uploadIcon={uploadIcon}
              className={className}
            />
          </UploadDropZone>
        </UploadyWrapper>
      ) : (
        <CustomUploadDropZone disabled={disabled} uploadActive={false} title={title} subtitle={subtitle} />
      )}
    </Field>
  );
}

function CustomUploadDropZoneContainer<T extends File>({ hook, ...props }: CustomUploadDropZoneContainerProps<T>) {
  const uploady = React.useContext(UploadyContext);
  const [originalFileName, setOriginalFileName] = React.useState<string>("");
  const [uploadActive, setUploadActive] = React.useState<boolean>(false);

  const onClick = React.useCallback(async () => {
    uploady.showFileUpload();
  }, [uploady]);

  useItemStartListener((item) => {
    setOriginalFileName(item.file.name);
  });

  useItemFinishListener((item) => {
    const file: T = props.mapUploadResponse(item, originalFileName);
    setUploadActive(true);
    hook?.onUploadedFiles(file);
  });

  React.useEffect(() => {
    if (hook?.uploadedFiles.length === 0) setUploadActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hook.uploadedFiles]);

  return <CustomUploadDropZone onClick={onClick} uploadActive={uploadActive} {...props} />;
}

function CustomUploadDropZone({
  title,
  subtitle,
  disabled = false,
  uploadActive,
  onClick,
  uploadIcon,
  className,
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
    tokens.customUploadDropZoneTitle.color
  );

  const customUploadDropZoneSubtitleClassName = cx(
    tokens.customUploadDropZoneSubtitle.fontSize,
    tokens.customUploadDropZoneSubtitle.color
  );

  const uploadZoneIcon = useIcon("file", uploadIcon, { size: tokens.iconSize, className: `mx-auto ${tokens.iconColor}`})

  return (
    <div className={customUploadDropZoneContainerClassName} onClick={onClick}>
      <div className={tokens.customUploadDropZoneDescriptionContainer}>
        {uploadZoneIcon}
        <div className={customUploadDropZoneTitleClassName}>
          <label>{title}</label>
        </div>
        <p className={customUploadDropZoneSubtitleClassName}>{subtitle}</p>
      </div>
    </div>
  );
}
