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

import { useTokens } from "@tiller-ds/theme";
import { __internal } from "@tiller-ds/util";

import WidgetContainer from "./WidgetContainer";

type FetchDebugContentProps = {
  state: typeof __internal.state;
};

type FetchDebugRequestProps = {
  index: number;
  url: string;
  onClick?: (index: number) => void;
  startTime?: number;
  finishTime?: number;
};

const SECOND = 1000;
const PERCENTAGE_MULTIPLIER = 100;

function FetchDebug() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <WidgetContainer letter="F">
      <FetchDebugContainer />
    </WidgetContainer>
  );
}

function FetchDebugContainer() {
  const [state, setState] = React.useState(__internal.state);

  React.useEffect(() => {
    return __internal.subscribe(setState);
  }, [setState]);

  return <FetchDebugContent state={state} />;
}

export function FetchDebugContent({ state }: FetchDebugContentProps) {
  const latency = state.latency > SECOND ? `${state.latency / SECOND} seconds` : `${state.latency} milliseconds`;

  const updateLatency = React.useCallback((event) => {
    __internal.updateLatency(parseInt(event.target.value, 10));
  }, []);

  return (
    <div className="w-96">
      <div>
        <strong>Paused:</strong>{" "}
        <input type="checkbox" value={state.paused ? "true" : "false"} onChange={__internal.togglePause} />
      </div>

      <div>
        <strong>Latency:</strong> {latency}
      </div>

      <div>
        <input className="w-full" type="range" min="0" max="3000" value={state.latency} step="250" onChange={updateLatency} />
      </div>

      <div>
        <h4>Waiting</h4>

        {state.waiting.map((item, index) => (
          <FetchDebugRequest key={index} index={index} url={item.request.url} onClick={__internal.togglePause} />
        ))}
      </div>

      <div>
        <h4>Active</h4>

        {state.active.map((item, index) => (
          <FetchDebugRequest key={index} index={index} {...item} />
        ))}
      </div>

      <div>
        <h4>History</h4>

        {state.history.map((item, index) => (
          <FetchDebugRequest key={index} index={index} {...item} />
        ))}
      </div>
    </div>
  );
}

function FetchDebugRequest(props: FetchDebugRequestProps) {
  const [progress, setProgress] = React.useState(0);
  const tokens = useTokens("FetchDebugRequest");

  const updateProgress = React.useCallback(() => {
    setProgress(calculateProgress(props.startTime, props.finishTime));
  }, [props.startTime, props.finishTime]);

  const onClick = React.useCallback(() => {
    if (props.onClick) {
      props.onClick(props.index);
    }
  }, [props]);

  useAnimationFrame(updateProgress);

  return (
    <div className="relative" onClick={onClick}>
      <div className={`top-0 left-0 w-full relative ${tokens.backgroundColor}`} style={{ width: `${progress}%` }}>
        &nbsp;
      </div>
      <div className="top-0 left-0 w-full absolute text-black">{props.url}</div>
    </div>
  );
}

function calculateProgress(startTime?: number, finishTime?: number): number {
  const currentTime = new Date().getTime();

  let progress = 0;
  if (finishTime != null && startTime != null) {
    if (currentTime >= finishTime) {
      progress = 1;
    } else if (currentTime > startTime) {
      progress = (currentTime - startTime) / (finishTime - startTime);
    } else {
      // currentTime is before startTime (which should be impossible)
    }
  }

  return Math.round(progress * PERCENTAGE_MULTIPLIER);
}

type Callback = () => void;
function useAnimationFrame(callback: Callback | null) {
  const callbackRef = React.useRef(callback);
  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const loop = React.useCallback(() => {
    if (callbackRef.current != null) {
      frameRef.current = requestAnimationFrame(loop);
      callbackRef.current();
    }
  }, []);

  const frameRef = React.useRef(0);
  React.useLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [loop]);

  return () => {
    callbackRef.current = null;
  };
}

export default FetchDebug;
