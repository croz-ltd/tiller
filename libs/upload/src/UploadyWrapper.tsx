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

import { SendMethod } from "@rpldy/sender";
import { UploaderEnhancer } from "@rpldy/uploader";
import Uploady from "@rpldy/uploady";

export type UploadyWrapperProps = {
  /**
   * Url on the backend which is called for saving files
   */
  url: string;

  /**
   * Additional arguments for the backend call, including headers, request parameters, http method and files
   * parameter name
   */
  destinationOptions?: Omit<Destination, "url">;

  /**
   * Enhancers used by Uploady to upgrade the upload usage.
   * {@see} {@link https://react-uploady.org/docs/getting-started/concepts/#enhancer}
   */
  enhancer?: UploaderEnhancer;

  /**
   * Method that defines how the files are sent to the backend. By default, sends files with XHR request.
   * {@see} {@link https://react-uploady.org/docs/getting-started/concepts/#sender}
   */
  send?: SendMethod;

  /**
   * Map of listeners for the Uploady events.
   * Check list of possible events {@link https://react-uploady.org/docs/api/constants/#uploaderEvents here}
   */
  listeners?: React.ComponentProps<typeof Uploady>["listeners"];

  /**
   * Whether will user be able to upload multiple files at once
   */
  allowMultiple?: boolean;

  /**
   * `withCredentials` flag on fetch requests for uploading
   */
  withCredentials?: boolean

  /**
   * UploadWrapper content
   */
  children?: JSX.Element[] | JSX.Element;
};

export type Destination = {
  url: string;
  filesParamName?: string;
  params?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  method?: string;
};

export default function UploadyWrapper({
  url,
  send,
  allowMultiple = false,
  listeners,
  enhancer,
  destinationOptions,
  withCredentials,
  children,
}: UploadyWrapperProps) {
  const authorizedDestination: Destination = {
    url: url,
    ...(destinationOptions ?? {}),
  };

  return (
    <Uploady
      destination={authorizedDestination}
      send={send}
      multiple={allowMultiple}
      listeners={listeners}
      withCredentials={withCredentials}
      enhancer={enhancer}
    >
      {children}
    </Uploady>
  );
}
