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

import { IconConfig, IconProps } from "@tiller-ds/theme";
import Icon from "./Icon";
import LoadingIcon from "./LoadingIcon";

const iconConfig: IconConfig = {
  dismiss: (props: Partial<IconProps>) => <Icon type="x" variant="bold" {...props} />,
  breadcrumbs: (props: Partial<IconProps>) => <Icon type="caret-right" {...props} />,
  expanderOpen: (props: Partial<IconProps>) => <Icon type="caret-down" {...props} />,
  expanderClose: (props: Partial<IconProps>) => <Icon type="caret-up" {...props} />,
  paginatorPrevious: (props: Partial<IconProps>) => <Icon type="caret-left" {...props} />,
  paginatorNext: (props: Partial<IconProps>) => <Icon type="caret-right" {...props} />,
  completed: (props: Partial<IconProps>) => <Icon type="check" variant="bold" {...props} />,
  warning: (props: Partial<IconProps>) => <Icon type="warning" variant="fill" {...props} />,
  sortDesc: (props: Partial<IconProps>) => <Icon type="caret-down" variant="bold" {...props} />,
  sortAsc: (props: Partial<IconProps>) => <Icon type="caret-up" variant="bold" {...props} />,
  date: (props: Partial<IconProps>) => <Icon type="calendar-blank" variant="fill" {...props} />,
  time: (props: Partial<IconProps>) => <Icon type="clock" variant="fill" {...props} />,
  inputError: (props: Partial<IconProps>) => <Icon type="warning-circle" variant="fill" {...props} />,
  showPassword: (props: Partial<IconProps>) => <Icon type="eye" variant="fill" {...props} />,
  hidePassword: (props: Partial<IconProps>) => <Icon type="eye-slash" variant="fill" {...props} />,
  menu: (props: Partial<IconProps>) => <Icon type="list" {...props} />,
  search: (props: Partial<IconProps>) => <Icon type="magnifying-glass" {...props} />,
  upload: (props: Partial<IconProps>) => <Icon type="paperclip" {...props} />,
  file: (props: Partial<IconProps>) => <Icon type="paperclip" {...props} />,
  loading: (props: Partial<IconProps>) => <LoadingIcon {...props} />,
  undo: (props: Partial<IconProps>) => <Icon type="arrow-counter-clockwise" {...props} />,
  redo: (props: Partial<IconProps>) => <Icon type="arrow-clockwise" {...props} />,
  listBullets: (props: Partial<IconProps>) => <Icon type="list-bullets" {...props} />,
  listNumbers: (props: Partial<IconProps>) => <Icon type="list-numbers" {...props} />,
  textItalic: (props: Partial<IconProps>) => <Icon type="text-italic" {...props} />,
  textBolder: (props: Partial<IconProps>) => <Icon type="text-bolder" {...props} />,
  textUnderline: (props: Partial<IconProps>) => <Icon type="text-underline" {...props} />,
  textStrikethrough: (props: Partial<IconProps>) => <Icon type="text-strikethrough" {...props} />,
  textIndent: (props: Partial<IconProps>) => <Icon type="text-indent" {...props} />,
  textOutdent: (props: Partial<IconProps>) => <Icon type="text-outdent" {...props} />,
  textAlignLeft: (props: Partial<IconProps>) => <Icon type="text-align-left" {...props} />,
  textAlignCenter: (props: Partial<IconProps>) => <Icon type="text-align-center" {...props} />,
  textAlignRight: (props: Partial<IconProps>) => <Icon type="text-align-right" {...props} />,
  textAlignJustify: (props: Partial<IconProps>) => <Icon type="text-align-justify" {...props} />,
  table: (props: Partial<IconProps>) => <Icon type="table" {...props} />,
  link: (props: Partial<IconProps>) => <Icon type="link-simple-break" {...props} />,
  linkBreak: (props: Partial<IconProps>) => <Icon type="link" {...props} />,
};
export default iconConfig;
