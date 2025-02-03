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

import { Breadcrumbs, IconButton, Typography } from "@tiller-ds/core";
import { Icon, IconType, LoadingIcon } from "@tiller-ds/icons";

import { DataTable } from "./index";

type File = {
  id: string | number;
  name?: string;
  type?: string;
};

type ChildrenProps<T extends File> = {
  /**
   * An array of file objects representing the files in the current directory.
   */
  currentFiles: T[];
  /**
   * An array of directory objects representing the current path from the root directory.
   */
  currentPath: T[];
  /**
   * A function that is called when a file is clicked.
   *
   * @param file - The clicked file object.
   */
  handleItemClick: (file: T) => void;
  /**
   * A function that is called to navigate back to the previous directory.
   */
  goBack: () => void;
  /**
   * A function that is called to navigate to a specific directory in the current path.
   *
   * @param index - The index of the directory in the `currentPath` array.
   */
  goToDirectory: (index: number) => void;
  /**
   * A boolean indicating whether the file browser is currently fetching data.
   */
  pending: boolean;
  /**
   * A boolean that controls whether to display breadcrumbs for navigation.
   *
   * @default true
   */
  breadcrumbs?: boolean;
  /**
   * A boolean that controls whether to display file icons next to file names.
   *
   * @default true
   */
  icons?: boolean;
  /**
   * A boolean that controls whether to display a loading indicator when fetching files.
   *
   * @default true
   */
  loading?: boolean;

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

  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;
};

type ChildrenFunction<T extends File> = (props: ChildrenProps<T>) => React.ReactNode;

type FileBrowserProps<T extends File> = {
  /**
   * The root directory which contains the files you want to display initially.
   */
  rootDirectory: T;
  /**
   * Fetches the list of files from a directory asynchronously.
   * @param {T} directory - The directory from which to fetch files.
   * @param {T[]} [currentPath] - The current path of the directory (excluding the `directory` parameter), for context purposes (optional).
   * @returns {Promise<T[]>} A promise that resolves to an array of files in the directory.
   */
  fetchDirectory: (directory: T, currentPath?: T[]) => Promise<T[]>;
  children?: ChildrenFunction<T>;

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

export function FileBrowser<T extends File>(props: FileBrowserProps<T>): JSX.Element {
  const { rootDirectory, fetchDirectory, children } = props;
  const [currentPath, setCurrentPath] = React.useState<T[]>([]);
  const [currentFiles, setCurrentFiles] = React.useState<T[]>([]);
  const [pending, setPending] = React.useState<boolean>(false);

  React.useEffect(() => {
    setPending(true);
    fetchDirectory(rootDirectory, currentPath)
      .then((files) => {
        setCurrentFiles(files);
        setCurrentPath([rootDirectory]);
      })
      .finally(() => {
        setPending(false);
      });
  }, [rootDirectory, fetchDirectory]);

  const handleItemClick = async (file: T) => {
    setPending(true);
    fetchDirectory(file, currentPath)
      .then((newFiles) => {
        setCurrentPath([...currentPath, file]);
        setCurrentFiles(newFiles);
      })
      .finally(() => {
        setPending(false);
      });
  };

  const goBack = async () => {
    if (currentPath.length > 1) {
      setPending(true);
      const newPath = currentPath.slice(0, -1);
      setCurrentPath(newPath);
      const previousDirectory = newPath[newPath.length - 1];
      fetchDirectory(previousDirectory, currentPath)
        .then((previousFiles) => {
          setCurrentFiles(previousFiles);
        })
        .finally(() => {
          setPending(false);
        });
    }
  };

  const goToDirectory = async (index: number) => {
    if (index > 0) {
      setPending(true);
      const newPath = currentPath.slice(0, index);
      setCurrentPath(newPath);
      const previousDirectory = newPath[newPath.length - 1];
      fetchDirectory(previousDirectory, currentPath)
        .then((previousFiles) => {
          setCurrentFiles(previousFiles);
        })
        .finally(() => {
          setPending(false);
        });
    }
  };

  return (
    <div data-testid={props["data-testid"]} className={props.className}>
      {children ? (
        children({
          currentFiles,
          currentPath,
          handleItemClick,
          goBack,
          goToDirectory,
          pending,
          icons: true,
          breadcrumbs: true,
          loading: true,
        })
      ) : (
        <FileBrowserTable
          currentFiles={currentFiles}
          currentPath={currentPath}
          handleItemClick={handleItemClick}
          goBack={goBack}
          goToDirectory={goToDirectory}
          pending={pending}
          icons={true}
          breadcrumbs={true}
          loading={true}
          data-testid={props["data-testid"] && `${props["data-testid"]}-table`}
        />
      )}
    </div>
  );
}

function FileBrowserTable<T extends File>({
  currentPath,
  currentFiles,
  pending,
  goBack,
  goToDirectory,
  handleItemClick,
  breadcrumbs = true,
  icons = true,
  loading = true,
  ...props
}: ChildrenProps<T>) {
  return (
    <div className={props.className}>
      {breadcrumbs && (
        <div className="flex flex-row h-10">
          <Breadcrumbs
            tokens={{ container: { backgroundColor: "bg-transparent" } }}
            data-testid={props["data-testid"] && `${props["data-testid"]}-breadcrumbs`}
          >
            {currentPath.map((folder, index) => (
              <button
                onClick={index !== currentPath.length - 1 ? () => goToDirectory(index + 1) : undefined}
                data-testid={props["data-testid"] && `${props["data-testid"]}-breadcrumbs-${index}`}
              >
                <Breadcrumbs.Breadcrumb>{folder.name}</Breadcrumbs.Breadcrumb>
              </button>
            ))}
          </Breadcrumbs>
          {currentPath.length > 1 && !pending && (
            <IconButton
              icon={<Icon type="caret-up" className="pt-1 px-1 text-body-light hover:text-body duration-150 ease-in-out" />}
              onClick={goBack}
              showTooltip={false}
              className="ml-2"
              data-testid={props["data-testid"] && `${props["data-testid"]}-folder-up`}
            />
          )}
        </div>
      )}
      <DataTable
        data={pending ? [] : currentFiles}
        onClick={(file) => file.type === "directory" && handleItemClick(file)}
        emptyState={
          loading ? (
            <div className="flex items-center justify-center my-10">
              <LoadingIcon />
            </div>
          ) : undefined
        }
        data-testid={props["data-testid"] && `${props["data-testid"]}-table`}
      >
        <DataTable.Column header="Name" id="name" canSort={false}>
          {(file: File) => (icons ? <DisplayFileIconAndName file={file} /> : <Typography>{file.name}</Typography>)}
        </DataTable.Column>
        <DataTable.Column header="Type" id="type" canSort={false}>
          {(file: File) => (file.type ? <Typography>{file.type}</Typography> : <Typography>-</Typography>)}
        </DataTable.Column>
      </DataTable>
    </div>
  );
}

type DisplayFileIconAndNameProps = {
  file: File;
};

const fileIconMappings: Record<string, IconType> = {
  txt: "file-text",
  docx: "microsoft-word-logo",
  pdf: "file-pdf",
  mp3: "file-audio",
  jpg: "file-jpg",
};

function DisplayFileIconAndName({ file }: DisplayFileIconAndNameProps) {
  if (file.type) {
    const fileType = file.type.toLowerCase();
    const iconType = fileIconMappings[fileType] || "folder-notch";

    return (
      <div className="flex items-center space-x-1">
        <Icon type={iconType} />
        <Typography>{file.name}</Typography>
      </div>
    );
  } else {
    return <Typography>{file.name}</Typography>;
  }
}

FileBrowser.Table = FileBrowserTable;

export default FileBrowser;
