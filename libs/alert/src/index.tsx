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

import { UseModal as InternalUseModal } from "./Modal";

export type UseModal<T> = InternalUseModal<T>;
export type { NotificationProps } from "./NotificationProvider";
export type { NotificationPosition } from "./NotificationPositionType";
export type { AlertProps } from "./Alert";
export type { ModalProps } from "./Modal";
export type { NotificationProps as InternalNotificationProps } from "./Notification";
export type { NotificationContainerProps } from "./NotificationContainer";

export { default as Alert } from "./Alert";
export { default as Modal, useModal } from "./Modal";
export { default as Notification } from "./Notification";
export { default as NotificationContainer } from "./NotificationContainer";
export { default as NotificationProvider, useNotificationContext } from "./NotificationProvider";
