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

import { findIndex } from "lodash";

import { ComponentTokens, cx, useIcon, useTokens } from "@tiller-ds/theme";
import { createNamedContext, tillerTwMerge } from "@tiller-ds/util";

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
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;

  /**
   * Custom step separator shown between steps.
   */
  separator?: React.ReactNode;

  /**
   * A unique identifier for testing purposes.
   * This identifier can be used in testing frameworks like Jest or Cypress to locate specific elements for testing.
   * It helps ensure that UI components are behaving as expected across different scenarios.
   * @type {string}
   * @example
   * // Usage:
   * <MyComponent data-testid="my-component" />
   * // In tests:
   * getByTestId('my-component');
   */
  "data-testid"?: string;
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
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;

  /**
   * Icon used when step is completed.
   */
  completedIcon?: React.ReactElement;

  /**
   * A unique identifier for testing purposes.
   * This identifier can be used in testing frameworks like Jest or Cypress to locate specific elements for testing.
   * It helps ensure that UI components are behaving as expected across different scenarios.
   * @type {string}
   * @example
   * // Usage:
   * <MyComponent data-testid="my-component" />
   * // In tests:
   * getByTestId('my-component');
   */
  "data-testid"?: string;
} & ProgressBarTokensProps;

type StepContext = {
  activeStepIndex: number;
  index: number;
  startingIndex: number;
  endingIndex: number;
  completed: boolean;
  separator: React.ReactNode;
  testId?: string;
};

const StepContext = createNamedContext<StepContext>("StepContext", {
  activeStepIndex: -1,
  index: -1,
  startingIndex: -1,
  endingIndex: -1,
  completed: false,
  separator: undefined,
});

function ProgressBar({ startingIndex = 0, completed = false, children, className, separator, ...props }: ProgressBarProps) {
  const tokens = useTokens("ProgressBar", props.tokens);

  const containerClassName = cx(
    tokens.container.master,
    tokens.container.borderWidth,
    tokens.container.borderColor,
    tokens.container.borderRadius,
    tokens.container.overflow,
  );

  const activeStepIndex = findIndex(React.Children.toArray(children), (child) =>
    React.isValidElement(child) ? child.props.active : false,
  );

  const endingIndex = React.Children.toArray(children).length - 1;

  const childrenWithIndex = React.Children.map(children, (child, index) => (
    <StepContext.Provider
      value={{
        activeStepIndex,
        index,
        startingIndex,
        endingIndex,
        completed,
        separator,
        testId: props["data-testid"] && `${props["data-testid"]}-${startingIndex + index}`,
      }}
    >
      {child}
    </StepContext.Provider>
  ));

  return (
    <nav data-testid={props["data-testid"]}>
      <ul className={tillerTwMerge(containerClassName, className)}>{childrenWithIndex}</ul>
    </nav>
  );
}

export function Step({ active, children, className, ...props }: StepProps) {
  const tokens = useTokens("ProgressBar", props.tokens);
  const { activeStepIndex, index, startingIndex, endingIndex, completed, separator, testId } = React.useContext(StepContext);

  const before = index < activeStepIndex;
  const after = index > activeStepIndex;
  const isLastStep = index === endingIndex;

  const indexIconDivClassName = cx(
    tokens.indexIcon.master,
    tokens.indexIcon.borderRadius,
    { [tokens.indexIcon.backgroundColor]: before || completed },
    { [tokens.indexIcon.borderWidth]: (active || after) && !completed },
    { [tokens.indexIcon.borderColor]: active },
    { [tokens.indexIcon.afterBorderColor]: after },
  );

  const textIndexClassName = cx(
    tokens.textIndex.master,
    tokens.textIndex.fontSize,
    tokens.textIndex.fontWeight,
    tokens.textIndex.lineHeight,
    { [tokens.textIndex.color]: active && !completed },
    { [tokens.textIndex.beforeTextColor]: before || completed },
    { [tokens.textIndex.afterTextColor]: after },
  );

  const stepContainerClassName = cx(
    tokens.Step.stepContainer.master,
    tokens.Step.stepContainer.padding,
    tokens.Step.stepContainer.margin,
  );

  const finalCompletedIcon = useIcon("completed", props.completedIcon, {
    size: tokens.icon.size,
    className: tokens.icon.color,
  });

  const content = before || completed ? finalCompletedIcon : <p className={textIndexClassName}>{index + startingIndex}</p>;

  const stepSeparator = separator ?? <DefaultSeparator />;

  return (
    <li className={tillerTwMerge(tokens.Step.master, className)} data-testid={props["data-testid"] ?? testId}>
      <div className={tokens.Step.innerContainer}>
        <div className={stepContainerClassName}>
          <div className={indexIconDivClassName}>{content}</div>
          <p className={textIndexClassName}>{children}</p>
        </div>
        {!isLastStep && stepSeparator}
      </div>
    </li>
  );
}

function DefaultSeparator({ ...props }) {
  const tokens = useTokens("ProgressBar", props.tokens);
  const rightArrowClassName = cx(tokens.DefaultSeparator.rightArrow.master, tokens.DefaultSeparator.rightArrow.color);

  return (
    <div className={tokens.DefaultSeparator.master}>
      <svg className={rightArrowClassName} viewBox="0 0 2 72" fill="none" preserveAspectRatio="none">
        <line x1="0.833328" y1="72" x2="0.833325" y2="2.18557e-08" stroke="#D2D6DC" />
      </svg>
    </div>
  );
}

ProgressBar.Step = Step;
export default ProgressBar;
