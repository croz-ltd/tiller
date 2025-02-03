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
  dismiss: (props: Partial<IconProps>) => <Icon {...props} type="x" />,
  breadcrumbs: (props: Partial<IconProps>) => <Icon {...props} type="caret-right" />,
  openExpander: (props: Partial<IconProps>) => <Icon {...props} type="caret-down" />,
  closeExpander: (props: Partial<IconProps>) => <Icon {...props} type="caret-up" />,
  paginatorPrevious: (props: Partial<IconProps>) => <Icon {...props} type="caret-left" />,
  paginatorNext: (props: Partial<IconProps>) => <Icon {...props} type="caret-right" />,
  completed: (props: Partial<IconProps>) => <Icon {...props} type="check" variant={props.variant ?? "bold"} />,
  sortDesc: (props: Partial<IconProps>) => <Icon {...props} type="caret-down" variant={props.variant ?? "bold"} />,
  sortAsc: (props: Partial<IconProps>) => <Icon {...props} type="caret-up" variant={props.variant ?? "bold"} />,
  date: (props: Partial<IconProps>) => <Icon {...props} type="calendar-blank" variant={props.variant ?? "fill"} />,
  time: (props: Partial<IconProps>) => <Icon {...props} type="clock" variant={props.variant ?? "fill"} />,
  inputError: (props: Partial<IconProps>) => <Icon {...props} type="warning-circle" variant={props.variant ?? "fill"} />,
  showPassword: (props: Partial<IconProps>) => <Icon {...props} type="eye" variant={props.variant ?? "fill"} />,
  hidePassword: (props: Partial<IconProps>) => <Icon {...props} type="eye-slash" variant={props.variant ?? "fill"} />,
  menu: (props: Partial<IconProps>) => <Icon {...props} type="list" />,
  search: (props: Partial<IconProps>) => <Icon {...props} type="magnifying-glass" />,
  upload: (props: Partial<IconProps>) => <Icon {...props} type="paperclip" />,
  file: (props: Partial<IconProps>) => <Icon {...props} type="paperclip" />,
  loading: (props: Partial<IconProps>) => <LoadingIcon {...props} />,
  undo: (props: Partial<IconProps>) => <Icon {...props} type="arrow-counter-clockwise" />,
  redo: (props: Partial<IconProps>) => <Icon {...props} type="arrow-clockwise" />,
  listBullets: (props: Partial<IconProps>) => <Icon {...props} type="list-bullets" />,
  listNumbers: (props: Partial<IconProps>) => <Icon {...props} type="list-numbers" />,
  textItalic: (props: Partial<IconProps>) => <Icon {...props} type="text-italic" />,
  textBolder: (props: Partial<IconProps>) => <Icon {...props} type="text-bolder" />,
  textUnderline: (props: Partial<IconProps>) => <Icon {...props} type="text-underline" />,
  textStrikethrough: (props: Partial<IconProps>) => <Icon {...props} type="text-strikethrough" />,
  textIndent: (props: Partial<IconProps>) => <Icon {...props} type="text-indent" />,
  textOutdent: (props: Partial<IconProps>) => <Icon {...props} type="text-outdent" />,
  textAlignLeft: (props: Partial<IconProps>) => <Icon {...props} type="text-align-left" />,
  textAlignCenter: (props: Partial<IconProps>) => <Icon {...props} type="text-align-center" />,
  textAlignRight: (props: Partial<IconProps>) => <Icon {...props} type="text-align-right" />,
  textAlignJustify: (props: Partial<IconProps>) => <Icon {...props} type="text-align-justify" />,
  table: (props: Partial<IconProps>) => <Icon {...props} type="table" />,
  link: (props: Partial<IconProps>) => <Icon {...props} type="link-simple-break" />,
  linkBreak: (props: Partial<IconProps>) => <Icon {...props} type="link" />,
  success: (props: Partial<IconProps>) => <Icon {...props} type="check-circle" variant={props.variant ?? "fill"} />,
  info: (props: Partial<IconProps>) => <Icon {...props} type="info" variant={props.variant ?? "fill"} />,
  danger: (props: Partial<IconProps>) => <Icon {...props} type="x-circle" variant={props.variant ?? "fill"} />,
  warning: (props: Partial<IconProps>) => <Icon {...props} type="warning-circle" variant={props.variant ?? "fill"} />,
};
export default iconConfig;
