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

type FileBrowserProps<T> = {
  /**
   * The root directory which contains the files you want to display initially.
   */
  rootDirectory: T;
  /**
   * Function which fetches the list of files from a directory.
   */
  fetchDirectory: (directory: T) => Promise<T[]>;
  children: (
    currentFiles: T[],
    breadcrumbs: T[],
    handleItemClick: (file: T) => void,
    goBack: () => void,
    pending: boolean,
  ) => React.ReactNode;
};

export default function FileBrowser<T extends object>(props: FileBrowserProps<T>): JSX.Element {
  const { rootDirectory, fetchDirectory, children } = props;
  const [currentPath, setCurrentPath] = React.useState<T[]>([]);
  const [currentFiles, setCurrentFiles] = React.useState<T[]>([]);
  const [pending, setPending] = React.useState<boolean>(false);

  React.useEffect(() => {
    setPending(true);
    fetchDirectory(rootDirectory)
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
    fetchDirectory(file)
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
      fetchDirectory(previousDirectory)
        .then((previousFiles) => {
          setCurrentFiles(previousFiles);
        })
        .finally(() => {
          setPending(false);
        });
    }
  };

  return <>{children(currentFiles, currentPath, handleItemClick, goBack, pending)}</>;
}
