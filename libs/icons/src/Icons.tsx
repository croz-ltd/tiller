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

import { cx, TokenProps, useTokens } from "@tiller-ds/theme";

type Direction = "north" | "east" | "south" | "west";
type InlineArrowIconProps = {
  direction?: Direction;
  className?: string;
};

type InlineNewMailIconProps = {
  className?: string;
};

export function InlineMailIcon({ ...props }: TokenProps<"Icon">) {
  const tokens = useTokens("Icon", props.tokens);

  return (
    <svg className={tokens.InlineMail} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function InlineQuestionMarkIcon({ ...props }: TokenProps<"Icon">) {
  const tokens = useTokens("Icon", props.tokens);

  return (
    <svg className={tokens.InlineQuestionMark} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function InlineArrowIcon({ direction = "east", className = "" }: InlineArrowIconProps) {
  const svgClassName = cx({
    [className]: true,
    "h-5 w-5 transform": true,
    "rotate-90": direction === "south",
    "rotate-180": direction === "west",
    "-rotate-90": direction === "north",
  });

  return (
    <svg className={svgClassName} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function InlineNewMailIcon({ className = "" }: InlineNewMailIconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function BreadcrumbsSimple({ ...props }: TokenProps<"Breadcrumbs">) {
  const tokens = useTokens("Breadcrumbs", props.tokens);

  return (
    <svg
      className="flex-shrink-0 h-4 text-gray-500"
      viewBox="0 0 24 44"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill={tokens.iconColor}
    >
      <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
    </svg>
  );
}

export function BreadcrumbsSlash({ ...props }: TokenProps<"Breadcrumbs">) {
  const tokens = useTokens("Breadcrumbs", props.tokens);

  return (
    <svg
      className="flex-shrink-0 h-5 w-5 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={tokens.iconColor}
    >
      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
    </svg>
  );
}
