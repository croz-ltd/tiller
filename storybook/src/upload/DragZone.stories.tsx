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
import { DragZone, FileList, useFileUpload, File, DragZoneLoader } from "@tiller-ds/upload";

import { beautifySource, useMockSender } from "../utils";

import mdx from "./DragZone.mdx";

export default {
  title: "Component Library/Upload/DragZone",
  component: DragZone,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "DragZone"),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9124%3A11857",
    },
    decorators: [withDesign],
  },
};

export const Simple = () => {
  // incl-code
  const useFileUploadHook = useFileUpload([], true);

  return (
    <>
      <DragZone
        hook={useFileUploadHook}
        url={useMockSender.destination.url}
        send={useMockSender.send}
        title={<Intl name="dragZoneTitle" />}
      />
      Uploaded: {useFileUploadHook.uploadedFiles.map((file) => file.originalFileName).join(", ") || "None"}
    </>
  );
};

export const WithSpinnerOnly = () => {
  // incl-code
  // hook initialization
  const useFileUploadHook = useFileUpload([], true);

  return (
    <>
      <DragZone
        hook={useFileUploadHook}
        url={useMockSender.destination.url}
        send={useMockSender.send}
        title={<Intl name="dragZoneTitle" />}
        loader={() => <DragZoneLoader percentage={false} />}
      />
      Uploaded: {useFileUploadHook.uploadedFiles.map((file) => file.originalFileName).join(", ") || "None"}
    </>
  );
};

export const WithPercentageOnly = () => {
  // incl-code
  const useFileUploadHook = useFileUpload([], true);

  return (
    <>
      <DragZone
        hook={useFileUploadHook}
        url={useMockSender.destination.url}
        send={useMockSender.send}
        title={<Intl name="dragZoneTitle" />}
        loader={(uploadPercentage) => <DragZoneLoader spinner={false} uploadPercentage={uploadPercentage} />}
      />
      Uploaded: {useFileUploadHook.uploadedFiles.map((file) => file.originalFileName).join(", ") || "None"}
    </>
  );
};

export const WithNoLoader = () => {
  // incl-code
  const useFileUploadHook = useFileUpload([], true);

  return (
    <>
      <DragZone
        hook={useFileUploadHook}
        url={useMockSender.destination.url}
        send={useMockSender.send}
        title={<Intl name="dragZoneTitle" />}
        loader={null}
      />
      Uploaded: {useFileUploadHook.uploadedFiles.map((file) => file.originalFileName).join(", ") || "None"}
    </>
  );
};

export const WithSubtitle = () => {
  // incl-code
  const useFileUploadHook = useFileUpload([], true);

  return (
    <>
      <DragZone
        hook={useFileUploadHook}
        url={useMockSender.destination.url}
        send={useMockSender.send}
        title={<Intl name="dragZoneTitle" />}
      />
      Uploaded: {useFileUploadHook.uploadedFiles.map((file) => file.originalFileName).join(", ") || "None"}
    </>
  );
};

export const WithMultipleFiles = () => {
  // incl-code
  const useFileUploadHook = useFileUpload([], true);

  return (
    <>
      <DragZone
        hook={useFileUploadHook}
        url={useMockSender.destination.url}
        send={useMockSender.send}
        title={<Intl name="dragZoneTitle" />}
        allowMultiple={true}
      />
      Uploaded: {useFileUploadHook.uploadedFiles.map((file) => file.originalFileName).join(", ") || "None"}
    </>
  );
};

export const WithFileList = () => {
  // incl-code
  const initialFiles: File[] = [
    { id: "1", name: "test1.pdf", status: "finished" },
    { id: "2", name: "test2.pdf", status: "finished" },
  ];

  const useFileUploadHook = useFileUpload(initialFiles, true);

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

export const WithFileListAndCustomLoader = () => {
  // incl-code
  // files list
  const initialFiles: File[] = [
    { id: "1", name: "test1.pdf", status: "finished" },
    { id: "2", name: "test2.pdf", status: "finished" },
  ];

  // hook initialization
  const useFileUploadHook = useFileUpload(initialFiles, true);

  return (
    <div>
      <DragZone
        hook={useFileUploadHook}
        url={useMockSender.destination.url}
        send={useMockSender.send}
        allowMultiple={true}
        title={<Intl name="dragZoneTitle" />}
        loader={(percentage) => (
          <span className="animate-pulse text-body-light h-7 my-px ">Uploading... {percentage}%</span>
        )}
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
  // incl-code
  const useFileUploadHook = useFileUpload([], true);

  return (
    <>
      <DragZone
        hook={useFileUploadHook}
        url={useMockSender.destination.url}
        send={useMockSender.send}
        title={<Intl name="dragZoneTitle" />}
        label={<Intl name="label" />}
      />
      Uploaded: {useFileUploadHook.uploadedFiles.map((file) => file.originalFileName).join(", ") || "None"}
    </>
  );
};

export const WithHelp = () => {
  // incl-code
  const useFileUploadHook = useFileUpload([], true);

  return (
    <>
      <DragZone
        hook={useFileUploadHook}
        url={useMockSender.destination.url}
        send={useMockSender.send}
        title={<Intl name="dragZoneTitle" />}
        help={<Intl name="help" />}
      />
      Uploaded: {useFileUploadHook.uploadedFiles.map((file) => file.originalFileName).join(", ") || "None"}
    </>
  );
};

export const WithError = () => {
  // incl-code
  const useFileUploadHook = useFileUpload([], true);

  return (
    <>
      <DragZone
        hook={useFileUploadHook}
        url={useMockSender.destination.url}
        send={useMockSender.send}
        title={<Intl name="dragZoneTitle" />}
        error={<Intl name="error" />}
      />
      Uploaded: {useFileUploadHook.uploadedFiles.map((file) => file.originalFileName).join(", ") || "None"}
    </>
  );
};

export const Disabled = () => {
  // incl-code
  const useFileUploadHook = useFileUpload([], true);

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

export const WithManualFileTracking = () => {
  // incl-code
  // hook initialization
  const fileUploadHookValue = useFileUpload();
  const [uploadedFileIds, setUploadedFileIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    fileUploadHookValue.onUpdateCallback((added, removed) => {
      setUploadedFileIds((oldFileIds) => {
        let newFileIds = [...oldFileIds];
        if (added !== undefined) {
          if (typeof added === "string") {
            newFileIds.push(added);
          }
        }
        if (removed !== undefined) {
          newFileIds = newFileIds.filter((id) => id !== removed);
        }
        // update internal file id list with correct updated list
        fileUploadHookValue.onUploadedFileIds(newFileIds);
        return newFileIds;
      });
    });
  }, []);

  return (
    <>
      <DragZone
        hook={fileUploadHookValue}
        url={useMockSender.destination.url}
        send={useMockSender.send}
        title={<Intl name="dragZoneTitle" />}
        allowMultiple={true}
      />
      Uploaded ids: {uploadedFileIds.join(", ") || "None"}
    </>
  );
};
