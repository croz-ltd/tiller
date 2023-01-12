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

import { useMockSender } from "../utils";
import { UploadButton, useFileUpload } from "@tiller-ds/upload";
import { setAuthenticationBearer } from "@tiller-ds/util";

import mdx from "./UploadButton.mdx";

export default {
  title: "Component Library/Upload/UploadButton",
  component: UploadButton,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8137%3A39203",
    },
    decorators: [withDesign],
  },
};

export const Success = () => {
  setAuthenticationBearer(useMockSender.destination.url, "newToken");
  const file = useFileUpload();

  return (
    <UploadButton hook={file} url={useMockSender.destination.url} send={useMockSender.send}>
      Upload
    </UploadButton>
  );
};

export const WithMultipleFilesUpload = () => {
  setAuthenticationBearer(useMockSender.destination.url, "newToken");
  const file = useFileUpload();

  return (
    <UploadButton hook={file} url={useMockSender.destination.url} send={useMockSender.send} allowMultiple={true}>
      Upload
    </UploadButton>
  );
};
