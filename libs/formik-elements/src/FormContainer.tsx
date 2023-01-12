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

import { Formik, FormikConfig, FormikHelpers } from "formik";

import { createNamedContext, ValidationError } from "@tiller-ds/util";

type FormikProps<V = any> = {
  validateAfterSubmit?: boolean;
};

export type Status = "idle" | "waiting" | "error" | "success";
type FormContainerState =
  | {
      status: "validation";
      errors: object;
    }
  | { status: Status };

type FormContainerContext = FormContainerState & FormikProps;

const initialContext = { status: "idle" } as FormContainerState;

const FormContainerContext = createNamedContext<FormContainerContext>("FormContainerContext", initialContext);

type Action = { type: "submit" } | { type: "error" } | { type: "success" } | { type: "validation"; errors: object };

function formReducer(state: FormContainerState, action: Action): FormContainerContext {
  switch (action.type) {
    case "submit":
      return { ...state, status: "waiting" };
    case "error":
      return { ...state, status: "error" };
    case "success":
      return { ...state, status: "success" };
    case "validation":
      return { ...state, status: "validation", errors: action.errors };
  }
}

export default function FormContainer<Values, ExtraProps>({
  onSubmit: originalOnSubmit,
  validateAfterSubmit,
  initialErrors,
  enableReinitialize = true,
  ...rest
}: FormikConfig<Values> & ExtraProps & FormikProps) {
  const [state, dispatch] = React.useReducer(formReducer, initialContext);

  const onSubmit = async (values: Values, formikHelpers: FormikHelpers<Values>) => {
    dispatch({ type: "submit" });

    try {
      await originalOnSubmit(values, formikHelpers);
      dispatch({ type: "success" });
    } catch (e) {
      if (e instanceof ValidationError) {
        dispatch({ type: "validation", errors: e.errors });
      } else {
        dispatch({ type: "error" });
      }
    }
  };

  const formikErrors = state.status === "validation" ? state.errors : initialErrors;
  const value = React.useMemo(() => ({ ...state, validateAfterSubmit }), [state, validateAfterSubmit]);

  return (
    <FormContainerContext.Provider value={value}>
      <Formik {...rest} onSubmit={onSubmit} enableReinitialize={enableReinitialize} initialErrors={formikErrors} />
    </FormContainerContext.Provider>
  );
}

export function useFormContainerContext() {
  return React.useContext(FormContainerContext);
}
