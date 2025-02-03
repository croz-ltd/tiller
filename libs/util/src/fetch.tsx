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

import { Draft, produce } from "immer";

type Subscriber = (state: State) => void;

type Waiting = {
  readonly request: Request;
  readonly resolve: (response: Response) => void;
};

type Active = {
  readonly url: string;
  readonly startTime: number;
  readonly finishTime: number;
};

type History = Active;

export type RequestBuilderHelper = (request: Request) => void;

export type State = {
  readonly paused: boolean;
  readonly latency: number;
  readonly waiting: ReadonlyArray<Waiting>;
  readonly active: ReadonlyArray<Active>;
  readonly history: ReadonlyArray<History>;
  readonly subscribers: ReadonlyArray<Subscriber>;
  readonly currentTokens: Record<string, string>;
  readonly requestBuilderHelpers: RequestBuilderHelper[];
};

const DEVELOPMENT = "development";
const MAX_HISTORY_SIZE = 5;

let state: State = {
  paused: false,
  latency: 500,
  waiting: [],
  active: [],
  history: [],
  subscribers: [],
  currentTokens: {},
  requestBuilderHelpers: [] as RequestBuilderHelper[],
};

export function setAuthenticationBearer(key: string, newToken: string) {
  state = produce(state, (draft: Draft<State>) => {
    draft.currentTokens[key] = newToken;
  });
}

export function addRequestBuilderHelper(requestBuilderHelper: RequestBuilderHelper) {
  state = produce(state, (draft: Draft<State>) => {
    draft.requestBuilderHelpers.push(requestBuilderHelper);
  });
}

export function removeRequestBuilderHelper(requestBuilderHelper: RequestBuilderHelper) {
  state = produce(state, (draft: Draft<State>) => {
    const index = draft.requestBuilderHelpers.indexOf(requestBuilderHelper);
    if (index !== -1) {
      draft.requestBuilderHelpers.splice(index, 1);
    }
  });
}

export function fetch(info: RequestInfo, init?: RequestInit): Promise<Response> {
  const request = new Request(info, init);
  state.requestBuilderHelpers.forEach((builder: RequestBuilderHelper) => builder(request));

  if (process.env.NODE_ENV !== DEVELOPMENT) {
    return window.fetch(request);
  }

  return new Promise<Response>((resolve) => {
    state = produce(state, (draft) => {
      draft.waiting.push({ request, resolve });
    });

    if (state.paused) {
      broadcastChange();
    } else {
      runAllInWaiting();
    }
  });
}

function runAllInWaiting() {
  state.waiting.forEach(startRequest);

  state = produce(state, (draft: Draft<State>) => {
    draft.waiting = [];
  });

  broadcastChange();
}

function startRequest(waitingItem: Waiting) {
  const responsePromise = window.fetch(waitingItem.request);
  const url = waitingItem.request.url;

  const startTime = new Date().getTime();
  const finishTime = startTime + state.latency;

  const active: Active = { url, startTime, finishTime };

  state = produce(state, (draft: Draft<State>) => {
    draft.active.push(active);
  });

  responsePromise.then((response) => {
    const currentTime = new Date().getTime();

    if (currentTime >= finishTime) {
      finishRequest(waitingItem, active, response);
    } else {
      setTimeout(() => {
        finishRequest(waitingItem, active, response);
      }, finishTime - currentTime);
    }
  });
}

function finishRequest(waitingItem: Waiting, activeItem: Active, response: Response) {
  waitingItem.resolve(response);

  state = produce(state, (draft: Draft<State>) => {
    draft.active.splice(
      draft.active.findIndex((value) => value === activeItem),
      1,
    );

    draft.history.push(activeItem);

    if (draft.history.length > MAX_HISTORY_SIZE) {
      draft.history.splice(0, 1);
    }
  });

  broadcastChange();
}

function destroySubscriber(index: number) {
  state = produce(state, (draft: Draft<State>) => {
    draft.subscribers.splice(index, 1);
  });
}

function broadcastChange() {
  state.subscribers.forEach((subscriber) => subscriber(state));
}

function togglePause() {
  state = produce(state, (draft: Draft<State>) => {
    draft.paused = !draft.paused;
  });

  if (!state.paused) {
    runAllInWaiting();
  } else {
    broadcastChange();
  }
}

function updateLatency(latency: number) {
  state = produce(state, (draft: Draft<State>) => {
    draft.latency = latency;
  });

  broadcastChange();
}

function startPaused(index: number) {
  startRequest(state.waiting[index]);

  state = produce(state, (draft: Draft<State>) => {
    draft.waiting.splice(index, 1);
  });

  broadcastChange();
}

function subscribe(callback: Subscriber): () => void {
  const index = state.subscribers.length;

  state = produce(state, (draft: Draft<State>) => {
    draft.subscribers.push(callback);
  });

  callback(state);

  return () => destroySubscriber(index);
}

export const __internal = { state, togglePause, updateLatency, startPaused, subscribe };
