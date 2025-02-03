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
import ReactDOM from "react-dom";

type WidgetContainerProps = {
  letter: string;
  children: React.ReactNode;
};

type WidgetContentProps = {
  opened: boolean;
  children: React.ReactNode;
};

function WidgetContainer(props: WidgetContainerProps) {
  const opened = useKeyboardShortcut(props.letter);

  const content = React.useMemo(() => <WidgetContent opened={opened}>{props.children}</WidgetContent>, [opened, props.children]);

  return ReactDOM.createPortal(content, document.body);
}

function WidgetContent(props: WidgetContentProps) {
  if (!props.opened) {
    return null;
  }

  return <div className="fixed top-0 right-0 mt-1 mr-0 z-50 border border-red bg-white p-4">{props.children}</div>;
}

function useKeyboardShortcut(letter: string) {
  const [opened, setOpened] = React.useState(false);

  const handleEvent = React.useCallback(
    (event) => {
      if (event.key === letter && event.ctrlKey && event.shiftKey) {
        setOpened((current) => !current);
      }
    },
    [letter, setOpened],
  );

  React.useEffect(() => {
    window.document.addEventListener("keydown", handleEvent);

    return () => {
      window.document.removeEventListener("keydown", handleEvent);
    };
  }, [handleEvent, letter]);

  return opened;
}

export default WidgetContainer;
