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

import React from "react";

import { Form, FormikValues, FormikErrors, FormikTouched } from "formik";

import { FormContainer } from "@tiller-ds/formik-elements";

export type FormikDecoratorProps<T extends {}> = {
  showFieldValues?: boolean;
  initialValues?: FormikValues;
  initialErrors?: FormikErrors<T>;
  initialTouched?: FormikTouched<T>;
  validationSchema?: React.ReactNode;
  children?: React.ReactNode;
  scrollToError?: boolean;
};

export default function FormikDecorator<T extends {}>({
  initialValues = {},
  initialErrors = {},
  initialTouched = {},
  validationSchema,
  children,
  showFieldValues = true,
  scrollToError,
}: FormikDecoratorProps<T>) {
  return (
    <FormContainer
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
      initialErrors={initialErrors}
      initialTouched={initialTouched}
      scrollToError={scrollToError}
    >
      {({ values }) => {
        return (
          <Form>
            {children}
            {showFieldValues && (
              <div className="flex justify-center">
                <pre className="text-xs text-center p-4 whitespace-normal">{JSON.stringify(values)}</pre>
              </div>
            )}
          </Form>
        );
      }}
    </FormContainer>
  );
}
