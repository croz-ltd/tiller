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

import { clamp, isArray, isFinite, isNil, range, reduce, reverse } from "lodash";

import { ComponentTokens, cx, TokenProps, useTokens } from "@tiller-ds/theme";

import Field from "./Field";

export type SliderProps = {
  /**
   * Name attribute of the hidden input element.
   */
  name: string;

  /**
   * Specifies the minimum allowed value of the slider. Should not be equal to prop "to".
   */
  from: number;

  /**
   * Specifies the maximum allowed value of the slider. Should not be equal to prop "from".
   */
  to: number;

  /**
   * Specifies the size of each movement of the slider.
   */
  step: number;

  /**
   * Specifies the value of the slider.
   */
  value?: number | number[];

  /**
   * Specifies the label above the slider (not exclusively text).
   */
  label?: React.ReactNode;

  /**
   * The help text displayed below the slider.
   */
  help?: React.ReactNode;

  /**
   * Value passed through from validation indicating to display the error on the component.
   */
  error?: React.ReactNode;

  /**
   * If multiple values are passed, they are both sliding at the same time.
   */
  stacked?: boolean;

  /**
   * Function that determines how the component outputs the step label of the slider.
   * Example: (value) => (value % 60 === 0 ? value / 60 : null)
   */
  getOptionLabel: (value: number) => number | string | null;

  /**
   * Function that handles the behaviour of the component once its state changes.
   */
  onChange?: (value: number) => void;

  /**
   * Custom additional styling applied to the component.
   */
  className?: string | string[];

  /**
   * Custom styling for marker(s).
   */
  markerClassName?: string | string[];
} & SliderTokens;

type SliderTokens = {
  sliderTokens?: ComponentTokens<"Slider">;
  fieldTokens?: ComponentTokens<"Field">;
};

type SliderValuesProps = {
  from: number;
  to: number;
  value: number | number[];
  stacked?: boolean;
  markerClassName?: string | string[];
} & TokenProps<"Slider">;

type SliderValueProps = {
  valuePercentage: number;
  className: string;
} & TokenProps<"Slider">;

type MarkerValueProps = SliderValueProps;

function useSliderEvents(
  ref: React.RefObject<HTMLDivElement>,
  from: number,
  to: number,
  step: number,
  onChange?: (value: number) => void,
) {
  const [active, setActive] = React.useState(false);

  const changeValue = (event: MouseEvent) => {
    const position = ref.current?.getBoundingClientRect();
    const percentage = (event.pageX - (position?.left || 0)) / (position?.width || 1);
    const value = Math.round((clamp(percentage, 0, 1) * (to - from)) / step) * step;

    onChange?.(value);
  };

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setActive(true);

    changeValue(event.nativeEvent);
  };

  React.useEffect(() => {
    function onMouseUp(event: MouseEvent) {
      setActive(false);

      changeValue(event);
    }

    function onMouseMove(event: MouseEvent) {
      if (active) {
        changeValue(event);
      }
    }

    if (active) {
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [active, from, to, step, onChange]);

  return { onMouseDown };
}

export default function Slider({ from, to, step, value, getOptionLabel, onChange, className, ...props }: SliderProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const tokens = useTokens("Slider", props.sliderTokens);
  const events = useSliderEvents(ref, from, to, step, onChange);

  const markers = range(from, to + 1, step).map((value) => {
    const markerLabel = getOptionLabel(value);

    const containerClassName = cx("relative", tokens.Marker.container);

    const markerClassName = cx(
      "absolute",
      tokens.Marker.master,
      tokens.Marker.backgroundColor,
      { [tokens.Marker.markerLabel]: markerLabel !== null },
      { [tokens.Marker.markerNoLabel]: markerLabel === null },
    );

    const textClassName = cx("absolute transform -translate-x-1/2", tokens.Marker.text);

    return (
      <div className={containerClassName}>
        <div className={textClassName}>{markerLabel}</div>
        <div className={markerClassName} style={{ borderWidth: "thin" }}>
          &nbsp;
        </div>
      </div>
    );
  });

  const baseClassName = cx("w-full absolute", tokens.base, tokens.backgroundColor, className);

  const outerClassName = cx("w-full relative select-none", tokens.outerContainer);

  const innerClassName = cx("w-full absolute bottom-0", tokens.innerContainer);

  return (
    <Field {...props}>
      <div className={outerClassName}>
        <div className="w-full absolute flex flex-row justify-between">{markers}</div>
        <div ref={ref} className={innerClassName} {...events}>
          <div className="w-full relative">
            <div className={baseClassName}>&nbsp;</div>
            {!isNil(value) && <SliderValues value={value} from={from} to={to} {...props} />}
          </div>
        </div>
      </div>
    </Field>
  );
}

function SliderValues({
  from,
  to,
  value,
  markerClassName: initialMarkerClassName,
  stacked = false,
  ...props
}: SliderValuesProps) {
  const tokens = useTokens("Slider", props.tokens);
  const themedInitialMarkerClassName = initialMarkerClassName || tokens.Value.colors;

  const markerClassName = isArray(themedInitialMarkerClassName)
    ? themedInitialMarkerClassName
    : [themedInitialMarkerClassName];

  if (isArray(value)) {
    const stackedValues = stacked ? stackValues(value) : [...value];
    reverse(stackedValues);

    const sliderValues = stackedValues.map(
      (inner, key) =>
        isFinite(inner) && (
          <SliderValue
            key={key}
            valuePercentage={clamp(inner / (to - from), 0, 1)}
            className={markerClassName[stackedValues.length - key - 1]}
          />
        ),
    );

    const markerValues = stackedValues.map(
      (inner, key) =>
        isFinite(inner) && (
          <MarkerValue
            key={key}
            valuePercentage={clamp(inner / (to - from), 0, 1)}
            className={markerClassName[stackedValues.length - key - 1]}
          />
        ),
    );

    return (
      <>
        {sliderValues}
        {markerValues}
      </>
    );
  }

  return (
    <>
      <SliderValue valuePercentage={clamp(value / (to - from), 0, 1)} className={markerClassName[0]} />
      <MarkerValue valuePercentage={clamp(value / (to - from), 0, 1)} className={markerClassName[0]} />
    </>
  );
}

function SliderValue({ valuePercentage, className, ...props }: SliderValueProps) {
  const tokens = useTokens("Slider", props.tokens);

  const style = {
    width: `${valuePercentage * 100}%`,
  };

  const containerClassName = cx(className, "absolute", tokens.Value.base);

  return (
    <div className={containerClassName} style={style}>
      &nbsp;
    </div>
  );
}

function MarkerValue({ valuePercentage, className, ...props }: MarkerValueProps) {
  const tokens = useTokens("Slider", props.tokens);

  const style = {
    width: `${valuePercentage * 100}%`,
  };

  const outerClassName = cx("relative", tokens.Value.outer);

  const innerClassName = cx(className, "absolute right-0", tokens.Value.inner);

  return (
    <div className="absolute" style={style}>
      <div className={outerClassName}>
        <div className={innerClassName}>&nbsp;</div>
      </div>
    </div>
  );
}

function stackValues(values: number[]) {
  if (values.length === 0) {
    return values;
  }

  const [first, ...rest] = values;

  return reduce(rest, (acc, current) => [...acc, acc[acc.length - 1] + (current || 0)], [first || 0]);
}
