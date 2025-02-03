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

import toPairs from "lodash/fp/toPairs";

import { useFormDebugDataContext } from "./FormDebugProvider";
import WidgetContainer from "./WidgetContainer";

type FormDebugItemProps = {
  name: string;

  form: unknown;
};

function FormDebug() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <WidgetContainer letter="S">
      <FormDebugContainer />
    </WidgetContainer>
  );
}

function FormDebugContainer() {
  const { forms } = useFormDebugDataContext();

  const items = toPairs(forms).map((value, key) => <FormDebugItem key={key} name={value[0]} form={value[1]} />);

  return <>{items}</>;
}

function FormDebugItem(props: FormDebugItemProps) {
  const { name, form } = props;

  return (
    <div className="max-w-3xl">
      <h4>{name}</h4>
      <pre className="whitespace-normal">{JSON.stringify(form)}</pre>
    </div>
  );
}

export default FormDebug;
