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

import { IconButton } from "@tiller-ds/core";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { DragZone, FileList, useFileUpload, File } from "@tiller-ds/upload";

import { useMockSender } from "../utils";

import mdx from "./DragZone.mdx";

export default {
  title: "Component Library/Upload/DragZone",
  component: DragZone,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9124%3A11857",
    },
    decorators: [withDesign],
  },
};

export const Simple = () => {
  const useFileUploadHook = useFileUpload();

  return (
    <DragZone
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
    />
  );
};

export const WithSubtitle = () => {
  const useFileUploadHook = useFileUpload();

  return (
    <DragZone
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
      subtitle={<Intl name="dragZoneSubtitle" />}
    />
  );
};

export const WithMultipleFiles = () => {
  const useFileUploadHook = useFileUpload();

  return (
    <DragZone
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      allowMultiple={true}
      title={<Intl name="dragZoneTitle" />}
    />
  );
};

const initialFiles: File[] = [
  { id: "1", name: "test1.pdf", status: "finished" },
  { id: "2", name: "test2.pdf", status: "finished" },
];

export const AndFileList = () => {
  const useFileUploadHook = useFileUpload(initialFiles);

  return (
    <div>
      <DragZone
        hook={useFileUploadHook}
        url={useMockSender.destination.url}
        send={useMockSender.send}
        allowMultiple={true}
        title={<Intl name="dragZoneTitle" />}
      />
      <FileList hook={useFileUploadHook}>
        {(file, helpers) => (
          <FileList.Header>
            <FileList.Header.Name>{file.name}</FileList.Header.Name>
            <FileList.Header.Action>
              <IconButton
                icon={<Icon type="trash" />}
                label={<Intl name="delete" />}
                onClick={() => {
                  return helpers.deleteFile(file);
                }}
              />
            </FileList.Header.Action>
          </FileList.Header>
        )}
      </FileList>
    </div>
  );
};

export const WithLabel = () => {
  const useFileUploadHook = useFileUpload();

  return (
    <DragZone
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
      label={<Intl name="label" />}
    />
  );
};

export const WithHelp = () => {
  const useFileUploadHook = useFileUpload();

  return (
    <DragZone
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
      help={<Intl name="help" />}
    />
  );
};

export const WithError = () => {
  const useFileUploadHook = useFileUpload();

  return (
    <DragZone
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
      error={<Intl name="error" />}
    />
  );
};

export const Disabled = () => {
  const useFileUploadHook = useFileUpload();

  return (
    <DragZone
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
      disabled={true}
    />
  );
};
