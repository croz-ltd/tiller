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

type PlaceholderProps = {
  className: string;
};

export default function Placeholder({ className }: PlaceholderProps) {
  return (
    <svg
      className={`border-2 border-dashed border-gray-300 rounded bg-white w-full ${className} text-gray-200`}
      preserveAspectRatio="none"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 200 200"
    >
      <path vectorEffect="non-scaling-stroke" strokeWidth="2" d="M0 0l200 200M0 200L200 0" />
    </svg>
  );
}
