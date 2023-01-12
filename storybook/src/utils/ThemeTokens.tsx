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
import { defaultThemeConfig, ThemeComponentType } from "@tiller-ds/theme";

interface ThemeTokenProps {
  component: ThemeComponentType;
}

function ThemeTokenAttribute({keyName, value}: {keyName: string, value: any}) {
  if (typeof value === 'string' || value instanceof String) {
    return (
      <p>
        <span>{keyName}</span>: "<span className="text-danger">{value}</span>",
      </p>
    );
  } else {
    return (
      <p>
        <span>{keyName}</span>: {"{"}
        <div className="pl-4">{Object.keys(value).map((key, i) => <ThemeTokenAttribute key={i} keyName={key} value={value[key]} />)}</div>
        {"},"}
      </p>
    );
  }
}

export default function ThemeTokens({ component }: ThemeTokenProps) {
  const tokenDefinition = defaultThemeConfig.component[component];
  return (
    <div className="border rounded-md p-6">
      <pre className="text-[13px]">
        <ThemeTokenAttribute keyName={component} value={tokenDefinition}/>
      </pre>
    </div>
  );
}
