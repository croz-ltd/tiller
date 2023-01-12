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

function createNamedContext<T>(name: string, initialValue: T): React.Context<T>;
function createNamedContext<T>(name: string): React.Context<T | undefined>;

function createNamedContext<T>(name: string, initialValue: T | undefined = undefined): React.Context<T | undefined> {
  const context = React.createContext<T | undefined>(initialValue);

  context.displayName = name;

  return context;
}

export default createNamedContext;
