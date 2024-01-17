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
import { DragZoneField } from "@tiller-ds/formik-elements";
import { Intl } from "@tiller-ds/intl";
import { FileList, useFileUpload } from "@tiller-ds/upload";
import { Icon } from "@tiller-ds/icons";

import { UPLOADER_EVENTS } from "@rpldy/uploader";
import { BatchItem } from "@rpldy/shared";

import { beautifySource, FormikDecorator, useMockSender } from "../utils";

import mdx from "./DragZoneField.mdx";

const name = "dragzonefield";
const nameWithError = "nameWithError";

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/DragZoneField",
  component: DragZoneField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "DragZoneField"),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9124%3A11857",
    },
  },
  decorators: [
    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => (
      <FormikDecorator initialErrors={initialErrors} initialTouched={initialTouched}>
        {storyFn()}
      </FormikDecorator>
    ),
    withDesign,
  ],
};

export const Simple = () => {
  // incl-code
  // hook initialization
  const useFileUploadHook = useFileUpload();

  return (
    <DragZoneField
      name={name}
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
    />
  );
};

export const WithSubtitle = () => {
  // incl-code
  // hook initialization
  const useFileUploadHook = useFileUpload();

  return (
    <DragZoneField
      name={name}
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
      subtitle={<Intl name="dragZoneSubtitle" />}
    />
  );
};

export const WithMultipleFiles = () => {
  // incl-code
  // hook initialization
  const useFileUploadHook = useFileUpload();

  return (
    <DragZoneField
      name={name}
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      allowMultiple={true}
      title={<Intl name="dragZoneTitle" />}
    />
  );
};

export const WithFileList = () => {
  // incl-code
  // hook initialization
  const useFileUploadHook = useFileUpload();

  return (
    <div>
      <DragZoneField
        name={name}
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

export const WithSingleFileUpload = () => {
  // incl-code
  // hook initialization
  const useFileUploadHook = useFileUpload();

  return (
    <DragZoneField
      name={name}
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
      singleFileUpload={true}
    />
  );
};

export const WithLabel = () => {
  // incl-code
  // hook initialization
  const useFileUploadHook = useFileUpload();

  return (
    <DragZoneField
      name={name}
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
      label={<Intl name="label" />}
    />
  );
};

export const WithHelp = () => {
  // incl-code
  // hook initialization
  const useFileUploadHook = useFileUpload();

  return (
    <DragZoneField
      name={name}
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
      help={<Intl name="help" />}
    />
  );
};

export const WithError = () => {
  // incl-code
  // hook initialization
  const useFileUploadHook = useFileUpload();

  return (
    <DragZoneField
      name={nameWithError}
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
      error={<Intl name="error" />}
    />
  );
};

export const Disabled = () => {
  // incl-code
  // hook initialization
  const useFileUploadHook = useFileUpload();

  return (
    <DragZoneField
      name={name}
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
      disabled={true}
    />
  );
};

export const WithSizeLimit = () => {
  // incl-code
  // hook initialization
  const useFileUploadHook = useFileUpload();

  const listeners = {
    [UPLOADER_EVENTS.ITEM_START]: (item: BatchItem) => {
      if (item.file.size > 2000000) {
        // send notification / add error
        return false;
      }
    },
  };

  return (
    <DragZoneField
      name={name}
      hook={useFileUploadHook}
      url={useMockSender.destination.url}
      send={useMockSender.send}
      title={<Intl name="dragZoneTitle" />}
      listeners={listeners}
    />
  );
};
