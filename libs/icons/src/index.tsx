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

import "phosphor-icons/src/css/icons.css";

import { IconProps as InternalIconProps, IconType as InternalIconType, IconVariant as InternalIconVariant } from "./Icon";

export type IconProps = InternalIconProps;
export type IconType = InternalIconType;
export type IconVariant = InternalIconVariant;

export { default as Icon } from "./Icon";
export { default as iconTypes } from "./iconTypes";
export { default as iconConfig } from "./iconConfig";
export { InlineMailIcon, InlineArrowIcon, InlineNewMailIcon, BreadcrumbsSimple, BreadcrumbsSlash } from "./Icons";
export { default as LoadingIcon } from "./LoadingIcon";
