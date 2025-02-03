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

import { withDesign } from "storybook-addon-designs";

import { Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { AsyncButton, Card } from "@tiller-ds/core";
import { InputField } from "@tiller-ds/formik-elements";

import mdx from "./AsyncButton.mdx";
import { beautifySource } from "../utils";

export default {
  title: "Component Library/Core/AsyncButton",
  component: AsyncButton,
  parameters: {
    docs: {
      page: mdx,
      transformSource: beautifySource,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8137%3A39203",
    },
    decorators: [withDesign],
  },
};

export const Success = () => {
  // incl-code
  const successOnClick = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
  };

  return <AsyncButton onClick={successOnClick}> Success </AsyncButton>;
};

export const Error = () => {
  // incl-code
  const errorOnClick = () => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(), 2000);
    });
  };

  return <AsyncButton onClick={errorOnClick}> Error </AsyncButton>;
};

export const FormExample = () => {
  // incl-code
  const validationSchema = Yup.object({
    test: Yup.string().required("Some text is required for the button to have a success state."),
  });

  const validateOnClick = (values: FormikValues) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(validationSchema.validate(values)), 2000);
    });
  };

  return (
    <Card>
      <Card.Body>
        <Formik initialValues={{ test: "" }} validationSchema={validationSchema} onSubmit={console.log}>
          {({ handleSubmit, handleReset, values }) => (
            <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-4">
              <InputField required={true} name="test" label="Test" help="Enter some text to see how async button behaves." />
              <AsyncButton onClick={() => validateOnClick(values)} type="submit">
                Submit
              </AsyncButton>
            </form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

const HideControls = {
  onClick: { control: { disable: true } },
  color: { control: { disable: true } },
  children: { control: { disable: true } },
  variant: { control: { disable: true } },
  size: { control: { disable: true } },
  hidden: { control: { disable: true } },
  id: { control: { disable: true } },
  className: { control: { disable: true } },
  leadingIcon: { control: { disable: true } },
  trailingIcon: { control: { disable: true } },
  menu: { control: { disable: true } },
};

Success.argTypes = HideControls;
Error.argTypes = HideControls;
FormExample.argTypes = HideControls;
