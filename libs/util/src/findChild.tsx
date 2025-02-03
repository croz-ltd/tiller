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

export default function findChild(type: string, children: React.ReactNode) {
  const childrenArray = React.Children.toArray(children);

  return childrenArray.flatMap((x) => (React.isValidElement(x) ? [x] : [])).find((child) => child.props.type === type);
}

export function findChildByType(component: React.ElementType, children: React.ReactNode) {
  return React.Children.toArray(children).find((child) => React.isValidElement(child) && child.type === component);
}
