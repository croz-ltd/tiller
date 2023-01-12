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

export type DisplayType = "LARGE_MOBILE" | "SMALL_MOBILE" | "DESKTOP";

export default function useViewport(smallMobileBreakpoint = 320, largeMobileBreakpoint = 768) {
  const [displayType, setDisplayType] = React.useState<DisplayType>("DESKTOP");

  const handleResize: ResizeObserverCallback = (entries) => {
    if (entries[0].contentRect.width >= smallMobileBreakpoint && entries[0].contentRect.width < largeMobileBreakpoint) {
      setDisplayType("LARGE_MOBILE");
    } else if (entries[0].contentRect.width < smallMobileBreakpoint) {
      setDisplayType("SMALL_MOBILE");
    } else {
      setDisplayType("DESKTOP");
    }
  };
  const resizeObserver = React.useRef<ResizeObserver | null>(null);

  React.useEffect(() => {
    resizeObserver.current = new ResizeObserver(handleResize);
    resizeObserver.current.observe(document.body);
  }, []);

  return displayType;
}
