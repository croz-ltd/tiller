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

import { findIndex } from "lodash";

import { ComponentTokens, cx, useIcon, useTokens } from "@tiller-ds/theme";
import { createNamedContext } from "@tiller-ds/util";

export type ProgressBarProps = {
  /**
   * Content inside the progress bar, most often its subcomponent 'ProgressBar.Step'.
   */
  children: React.ReactNode;

  /**
   * Sets the progress bar status as completed (checks all steps)
   */
  completed?: boolean;

  /**
   * Shown number on the first progress bar step.
   */
  startingIndex?: number;

  /**
   * Custom additional class name for the main container.
   */
  className?: string;
} & ProgressBarTokensProps;

type ProgressBarTokensProps = {
  tokens?: ComponentTokens<"ProgressBar">;
};

type StepProps = {
  /**
   * Sets the current step as active (checks all previous steps and highlights the current step as active).
   * If the 'completed' prop is set to true, this value has no effect on the look of the component.
   */
  active?: boolean;

  /**
   * Progress Bar Step content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Icon used when step is completed.
   */
  completedIcon?: React.ReactElement;
} & ProgressBarTokensProps;

type StepContext = {
  activeStepIndex: number;
  index: number;
  startingIndex: number;
  endingIndex: number;
  completed: boolean;
};

const StepContext = createNamedContext<StepContext>("StepContext", {
  activeStepIndex: -1,
  index: -1,
  startingIndex: -1,
  endingIndex: -1,
  completed: false,
});

function ProgressBar({ startingIndex = 0, completed = false, children, className, ...props }: ProgressBarProps) {
  const tokens = useTokens("ProgressBar", props.tokens);

  const containerClassName = cx(
    tokens.container.master,
    tokens.container.borderWidth,
    tokens.container.borderColor,
    tokens.container.borderRadius,
    "overflow-x-auto scrollbar",
    className
  );

  const activeStepIndex = findIndex(React.Children.toArray(children), (child) =>
    React.isValidElement(child) ? child.props.active : false
  );

  const endingIndex = React.Children.toArray(children).length - 1;

  const childrenWithIndex = React.Children.map(children, (child, index) => (
    <StepContext.Provider value={{ activeStepIndex, index, startingIndex, endingIndex, completed }}>
      {child}
    </StepContext.Provider>
  ));

  return (
    <nav>
      <ul className={containerClassName}>{childrenWithIndex}</ul>
    </nav>
  );
}

export function Step({ active, children, ...props }: StepProps) {
  const tokens = useTokens("ProgressBar", props.tokens);
  const { activeStepIndex, index, startingIndex, endingIndex, completed } = React.useContext(StepContext);

  const before = index < activeStepIndex;
  const after = index > activeStepIndex;
  const isLastStep = index === endingIndex;

  const indexIconDivClassName = cx(
    tokens.indexIcon.master,
    { [tokens.indexIcon.backgroundColor]: before || completed },
    { [tokens.indexIcon.borderWidth]: (active || after) && !completed },
    { [tokens.indexIcon.borderColor]: active },
    { [tokens.indexIcon.afterBorderColor]: after }
  );

  const textIndexClassName = cx(
    tokens.textIndex.master,
    { [tokens.textIndex.color]: active && !completed },
    { [tokens.textIndex.beforeTextColor]: before || completed },
    { [tokens.textIndex.afterTextColor]: after }
  );

  const stepContainerClassName = cx(
    tokens.stepContainer.master,
    tokens.stepContainer.padding,
    tokens.stepContainer.margin,
    tokens.stepContainer.fontSize,
    tokens.stepContainer.fontWeight,
    tokens.stepContainer.lineHeight
  );

  const finalCompletedIcon = useIcon("completed", props.completedIcon, {
    size: tokens.icon.size,
    className: tokens.icon.color,
  });

  const content =
    before || completed ? finalCompletedIcon : <p className={textIndexClassName}>{index + startingIndex}</p>;

  return (
    <li className="relative md:flex-1 md:flex">
      <div className="group flex items-center">
        <div className={stepContainerClassName}>
          <div className={indexIconDivClassName}>{content}</div>
          <p className={textIndexClassName}>{children}</p>
        </div>
        {!isLastStep && <RightArrow />}
      </div>
    </li>
  );
}

function RightArrow({ ...props }) {
  const tokens = useTokens("ProgressBar", props.tokens);
  return (
    <div className="hidden md:block absolute top-0 right-0 h-full w-1">
      <svg
        className={`h-full w-1 ${tokens.rightArrow.color}`}
        viewBox="0 0 2 72"
        fill="none"
        preserveAspectRatio="none"
      >
        <line x1="0.833328" y1="72" x2="0.833325" y2="2.18557e-08" stroke="#D2D6DC" />
      </svg>
    </div>
  );
}

ProgressBar.Step = Step;
export default ProgressBar;
