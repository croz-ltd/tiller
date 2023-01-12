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

import { withDesign } from "storybook-addon-designs";

import { Icon } from "@tiller-ds/icons";
import { File, FileList, useFileUpload } from "@tiller-ds/upload";

import mdx from "./FileList.mdx";

export default {
  title: "Component Library/Upload/File list",
  component: FileList,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=11036%3A14395",
    },
    decorators: [withDesign],
  },
};

const defaultFiles: File[] = [
  { id: "1", name: "File 1", status: "finished" },
  { id: "2", name: "File 2", status: "finished" },
  { id: "3", name: "File 3", status: "finished" },
];

const versionFiles: File[] = [
  { id: "1", name: "Version 3", status: "finished" },
  { id: "2", name: "Version 2", status: "finished" },
  { id: "3", name: "Version 1", status: "finished" },
];

export const Simple = () => {
  const useFiles = useFileUpload(defaultFiles);

  return (
    <FileList hook={useFiles}>
      {(file) => (
        <FileList.Header>
          <FileList.Header.Name>{file.name}</FileList.Header.Name>
        </FileList.Header>
      )}
    </FileList>
  );
};

export const WithActions = () => {
  const useFiles = useFileUpload(defaultFiles);
  const useVersionFiles = useFileUpload(versionFiles);

  return (
    <FileList hook={useFiles}>
      {(file, helpers) => (
        <>
          <FileList.Header expandable={file.id === "1"}>
            <FileList.Header.Name>{file.name}</FileList.Header.Name>
            <FileList.Header.Action to={`/${file.id}/download`}>Download</FileList.Header.Action>
            <FileList.Header.Action>
              <span
                onClick={() => {
                  return helpers.deleteFile(file);
                }}
              >
                Delete
              </span>
            </FileList.Header.Action>
            <FileList.Header.Action>
              <Icon
                type="pencil"
                onClick={() => {
                  return helpers.deleteFile(file);
                }}
              />
            </FileList.Header.Action>
          </FileList.Header>
          <FileList.Body>
            <div className="pl-8 py-4">
              <p className="py-2">Version history:</p>
              <FileList hook={useVersionFiles}>
                {(file, helpers) => (
                  <FileList.Header>
                    <FileList.Header.Name>{file.name}</FileList.Header.Name>
                    <FileList.Header.Action to={`/${file.id}/download`}>Download</FileList.Header.Action>
                  </FileList.Header>
                )}
              </FileList>
            </div>
          </FileList.Body>
        </>
      )}
    </FileList>
  );
};

export const WithActionInNewTab = () => {
  const useFiles = useFileUpload(defaultFiles);

  return (
    <FileList hook={useFiles}>
      {(file) => (
        <FileList.Header>
          <FileList.Header.Name>{file.name}</FileList.Header.Name>
          <FileList.Header.Action to={`/${file.id}/download`} target="_blank">
            Download
          </FileList.Header.Action>
        </FileList.Header>
      )}
    </FileList>
  );
};
