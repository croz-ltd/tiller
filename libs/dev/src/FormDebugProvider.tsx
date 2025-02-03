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

import { Draft, produce } from "immer";

import { createNamedContext } from "@tiller-ds/util";

type Form = unknown;
type Forms = Record<string, Form>;

type FormDebugProviderProps = {
  children?: React.ReactNode;
};
type FormDebugDataContext = {
  forms: Forms;
};

type FormDebugUpdateContext = {
  update: (key: string, values: Form) => void;
};

const defaultData = {
  forms: {},
};
const defaultUpdate = {
  update: () => {
    // default update is empty
  },
};

const FormDebugDataContext = createNamedContext<FormDebugDataContext>("FormDebugDataContext", defaultData);
const FormDebugUpdateContext = createNamedContext<FormDebugUpdateContext>("FormDebugUpdateContext", defaultUpdate);

function useFormDebugDataContext() {
  const context = React.useContext(FormDebugDataContext);

  if (!context) {
    throw new Error("useFormDebugDataContext must be used within a FormDebugProvider");
  }

  return context;
}

function useFormDebugUpdateContext() {
  return React.useContext(FormDebugUpdateContext);
}

function formsUpdater(key: string, value: Form) {
  return (draft: Draft<Forms>) => {
    if (value === null) {
      delete draft[key];
    } else {
      draft[key] = value;
    }
  };
}

function FormDebugProvider(props: FormDebugProviderProps) {
  const [forms, setForms] = React.useState<Forms>({});

  const update = React.useCallback(
    (key: string, value: Form) => {
      setForms((oldForms) => produce(oldForms, formsUpdater(key, value)));
    },
    [setForms],
  );

  const updateContext = React.useMemo(() => ({ update }), [update]);
  const dataContext = React.useMemo(() => ({ forms }), [forms]);

  return (
    <FormDebugUpdateContext.Provider value={updateContext}>
      <FormDebugDataContext.Provider value={dataContext}>{props.children}</FormDebugDataContext.Provider>
    </FormDebugUpdateContext.Provider>
  );
}

export { FormDebugProvider, useFormDebugDataContext, useFormDebugUpdateContext };
