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

import { UploadButtonField } from "@tiller-ds/formik-elements";
import { useFileUpload } from "@tiller-ds/upload";

import { FormikDecorator, useMockSender } from "../utils";

import mdx from "./UploadButtonField.mdx";

const name = "test";
const nameWithError = "nameWithError";
const nameWithValue = "nameWithValue";

const initialValues = {
  [nameWithValue]: "test",
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/UploadButtonField",
  component: UploadButtonField,
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
  decorators: [
    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => (
      <FormikDecorator initialValues={initialValues} initialErrors={initialErrors} initialTouched={initialTouched}>
        {storyFn()}
      </FormikDecorator>
    ),
  ],
};

export const Example = () => {
  const file = useFileUpload();
  return (
    <UploadButtonField hook={file} name={name} url={useMockSender.destination.url} send={useMockSender.send}>
      Upload
    </UploadButtonField>
  );
};
