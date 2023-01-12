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

// from https://gist.github.com/adamwathan/3b9f3ad1a285a2d1b482769aeb862467

import React, { useContext, useEffect, useRef } from "react";

import { CSSTransition as ReactCSSTransition } from "react-transition-group";

type TransitionContextProps = {
  parent: {
    show: boolean;
    isInitialRender: boolean;
    appear?: boolean;
  };
};

const TransitionContext = React.createContext<Partial<TransitionContextProps>>({
  parent: {
    show: false,
    isInitialRender: true,
  },
});

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

interface TransitionProps {
  show: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  appear?: boolean;
  children: React.ReactNode;
}

type CSSTransitionProps = TransitionProps;

function CSSTransition({
  show,
  enter = "",
  enterFrom = "",
  enterTo = "",
  leave = "",
  leaveFrom = "",
  leaveTo = "",
  appear,
  children,
}: CSSTransitionProps) {
  const enterClasses = enter.split(" ").filter((s) => s.length);
  const enterFromClasses = enterFrom.split(" ").filter((s) => s.length);
  const enterToClasses = enterTo.split(" ").filter((s) => s.length);
  const leaveClasses = leave.split(" ").filter((s) => s.length);
  const leaveFromClasses = leaveFrom.split(" ").filter((s) => s.length);
  const leaveToClasses = leaveTo.split(" ").filter((s) => s.length);

  function addClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.add(...classes);
  }

  function removeClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.remove(...classes);
  }

  return (
    <ReactCSSTransition
      appear={appear}
      unmountOnExit
      in={show}
      addEndListener={(node, done) => {
        node.addEventListener("transitionend", done, false);
      }}
      onEnter={(node) => {
        addClasses(node, [...enterClasses, ...enterFromClasses]);
      }}
      onEntering={(node) => {
        removeClasses(node, enterFromClasses);
        addClasses(node, enterToClasses);
      }}
      onEntered={(node) => {
        removeClasses(node, [...enterToClasses, ...enterClasses]);
      }}
      onExit={(node) => {
        addClasses(node, [...leaveClasses, ...leaveFromClasses]);
      }}
      onExiting={(node) => {
        removeClasses(node, leaveFromClasses);
        addClasses(node, leaveToClasses);
      }}
      onExited={(node) => {
        removeClasses(node, [...leaveToClasses, ...leaveClasses]);
      }}
    >
      {children}
    </ReactCSSTransition>
  );
}

function Transition({ show, appear, ...rest }: TransitionProps) {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return (
      <CSSTransition
        appear={parent ? parent.appear || !parent.isInitialRender : false}
        show={parent?.show ? parent.show : false}
        {...rest}
      />
    );
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
}

export default Transition;
