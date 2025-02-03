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

import { IconButton } from "@tiller-ds/core";
import { cx, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";
import { createNamedContext } from "@tiller-ds/util";

import { UseFileUpload, File } from "./useFileUpload";

export type FileListProps<T extends File> = {
  /**
   * Object return from {@link useFileUpload} hook, used internally for correct behaviour of the file
   * upload
   */
  hook: UseFileUpload<T>;

  /**
   * Children as render prop
   * @param file single file in the table
   * @param helpers helper functions for file manipulation
   */
  children?: (file: T, helpers: Helpers<T>) => React.ReactNode;

  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;

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

export type FileListNameProps = {
  children?: React.ReactNode;
  fileIcon?: React.ReactElement;
  className?: string;
  "data-testid"?: string;
} & TokenProps<"FileList">;

export type FileListActionsProps = {
  /**
   * Used in case of redirect, for example, file content url
   */
  to?: string;

  children?: React.ReactNode;

  /**
   * Handler for click action
   */
  onClick?: React.MouseEventHandler<HTMLElement>;

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
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  TokenProps<"FileList">;

export type Helpers<T extends File> = {
  /**
   * Method for deleting a file
   * @param selectedFile
   */
  deleteFile: (selectedFile: T) => void;
};

type FileContext = {
  isExpanded?: boolean;
  onExpanderToggle?: (toggleValue: boolean) => void;
};

type FileContextProviderProps = {
  children: React.ReactNode;
};

const FileContext = createNamedContext<FileContext>("FileContext", { isExpanded: undefined });

function FileContextProvider({ children }: FileContextProviderProps) {
  const [isExpanded, setIsExpanded] = React.useState<boolean | undefined>(false);

  const onExpanderToggle = (toggleValue: boolean) => {
    setIsExpanded(toggleValue);
  };

  return <FileContext.Provider value={{ isExpanded, onExpanderToggle }}>{children}</FileContext.Provider>;
}

export type FileHeaderProps = {
  /**
   * Should a file list be expandable (with possibility to hide list) or not
   */
  expandable?: boolean;

  children: React.ReactNode;

  openExpanderIcon?: React.ReactElement;
  closeExpanderIcon?: React.ReactElement;

  /**
   * Custom additional styling applied to the component.
   */
  className?: string;
  "data-testid"?: string;
} & TokenProps<"FileList">;

export type FileBodyProps = {
  children: React.ReactNode;
  "data-testid"?: string;
};

function FileHeader({ expandable = false, children, className, ...props }: FileHeaderProps) {
  const tokens = useTokens("FileList", props.tokens);
  const { isExpanded, onExpanderToggle } = React.useContext(FileContext);

  const containerClassName = cx(
    className,
    tokens.container.master,
    tokens.container.borderWidth,
    tokens.container.borderColor,
    tokens.container.borderRadius,
    tokens.container.padding,
    tokens.container.fontSize,
    tokens.container.lineHeight,
  );

  const toggleExpander = () => {
    if (isExpanded !== undefined && onExpanderToggle) {
      onExpanderToggle(!isExpanded);
    }
  };

  const openExpanderIcon = useIcon("openExpander", props.openExpanderIcon, { size: 3 });
  const closeExpanderIcon = useIcon("closeExpander", props.closeExpanderIcon, { size: 3 });

  return (
    <div className={containerClassName} data-testid={props["data-testid"]}>
      {children}
      {expandable ? (
        <IconButton
          icon={isExpanded ? closeExpanderIcon : openExpanderIcon}
          className="ml-2"
          onClick={toggleExpander}
          data-testid={props["data-testid"] && `${props["data-testid"]}-expander`}
          showTooltip={false}
        />
      ) : (
        <div className="ml-2 w-5 h-5" />
      )}
    </div>
  );
}

function FileBody({ children, ...props }: FileBodyProps) {
  const { isExpanded } = React.useContext(FileContext);

  if (isExpanded === false) {
    return null;
  }

  return <div data-testid={props["data-testid"]}>{children}</div>;
}

function FileListName({ children, className, fileIcon, ...props }: FileListNameProps) {
  const tokens = useTokens("FileList", props.tokens);

  const iconClassName = cx(tokens.icon.color, tokens.icon.margin);
  const finalFileIcon = useIcon("file", fileIcon, { className: iconClassName });

  const containerClassName = cx(className, "w-0 flex-1 flex items-center");

  const fileListNameClassName = cx(tokens.fileName.textColor, tokens.fileName.fontSize);

  return (
    <div className={containerClassName} data-testid={props["data-testid"]}>
      {finalFileIcon}
      <span className={fileListNameClassName}>{children}</span>
    </div>
  );
}

function FileListAction({ to, children, className, ...props }: FileListActionsProps) {
  const tokens = useTokens("FileList", props.tokens);

  const actionsClassName = cx(tokens.actions.master, tokens.actions.fontSize, tokens.actions.color);

  const containerClassName = cx(className, "ml-4 flex-shrink-0 space-x-2");

  return (
    <div className={containerClassName}>
      <a href={to} className={actionsClassName} {...props} data-testid={props["data-testid"]}>
        {children}
      </a>
    </div>
  );
}

export function FileList<T extends File>({ hook, children, className, ...props }: FileListProps<T>) {
  const helpers = {
    deleteFile: (selectedFile: T) => {
      hook.onDeletedFiles(selectedFile);
    },
  };

  const files = hook.uploadedFiles.map((file) => {
    return (
      <FileContextProvider>
        <li
          key={file.id}
          className=""
          data-testid={props["data-testid"] && `${props["data-testid"]}-${file.name || file.originalFileName}`}
        >
          {children ? children(file, helpers) : null}
        </li>
      </FileContextProvider>
    );
  });

  return (
    <ul className={className} data-testid={props["data-testid"]}>
      {files}
    </ul>
  );
}

FileHeader.Name = FileListName;
FileHeader.Action = FileListAction;
FileList.Header = FileHeader;
FileList.Body = FileBody;

export default FileList;
