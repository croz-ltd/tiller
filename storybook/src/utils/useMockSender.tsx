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

import createMockSender, { getMockSenderEnhancer } from "@rpldy/mock-sender";

import { Destination } from "@tiller-ds/upload";
import { UploaderType } from "@rpldy/uploader";
import { Trigger } from "@rpldy/shared";
import { SendMethod } from "@rpldy/sender";

const mockSenderEnhancer = getMockSenderEnhancer({ delay: 1000 });

const mockFileResponse = {
  id: "50",
  name: "mockedFile.txt",
  status: "finished",
};

const mockSender = createMockSender({ response: mockFileResponse }).send;

const header: Record<string, string> = { Authentication: "dummy-token" };

const mockRequest: Destination = {
  url: "http://dummy-server.comm/foo/bar",
  headers: header,
};

type MockDestinationType = {
  enhancer: (uploader: UploaderType, trigger: Trigger<any>) => UploaderType;
  listeners: { "FILE-FINALIZE": () => void };
  destination: Destination;
  send: SendMethod;
};

export const mockDestination = () =>
  ({
    destination: mockRequest,
    enhancer: mockSenderEnhancer,
    send: mockSender,
    listeners: {
      "FILE-FINALIZE": () => {
        mockFileResponse.id = (parseInt(mockFileResponse.id) + 1).toString();
      },
    },
  } as MockDestinationType);

export default mockDestination();
