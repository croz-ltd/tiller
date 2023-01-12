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

import _ from "lodash";

import { Button } from "@tiller-ds/core";
import { Input } from "@tiller-ds/form-elements";
import { cx, TokenProps, useTokens } from "@tiller-ds/theme";

import transformHourTo24HoursValue from "./transformHourTo24HoursValue";

const AM = "AM";
const CLOCK_DIGIT_ANGLE = 30;
const DEFAULT_12HOUR_CLOCK_RADIUS = 80;
const DEFAULT_24HOUR_CLOCK_RADIUS = 60;
const FULL_CIRCLE_ANGLE = 360;
const HOUR_DEGREE = 30;
const MAX_MINUTES = 60;
const MIDNIGHT = 0;
const MIDNIGT_24HOURS = 24;
const MINUTES_STEP = 5;
const MINUTE_DEGREE = 6;
const MIN_MINUTES = 0;
const NOON = 12;
const ONE_HOUR = 1;
const PM = "PM";
const STRAIGHT_ANGLE = 180;
const THIRTEEN_HOURS = 13;

const TWELVE_HOURS = [NOON, ..._.range(ONE_HOUR, NOON)];
const TWENTYFOUR_HOURS = [MIDNIGHT, ..._.range(THIRTEEN_HOURS, MIDNIGT_24HOURS)];
const MINUTES = _.range(MIN_MINUTES, MAX_MINUTES);

export type ClockType = "AM" | "PM" | "";

type Time = {
  hour: number | null;
  minute: number | null;
  type: ClockType;
};

type DigitsContainerProps = {
  digits: number[];
  translate: number;
  value: number | null;
  isTwelveHours: boolean;
} & TokenProps<"TimePicker">;

type HandProps = {
  rotate: number;
  use24HoursHand: boolean;
} & TokenProps<"TimePicker">;

export type TimePickerProps = {
  className?: string;
  fixedWidth?: boolean;
  onChange: (hour: number | null, minute: number | null) => void;
  timePickerRef: React.Ref<HTMLDivElement>;
  type?: "use12Hours" | "use24Hours";
  value: Time;
} & TokenProps<"TimePicker">;

export default function TimePicker({
  type = "use24Hours",
  onChange,
  value,
  timePickerRef,
  className = "",
  fixedWidth,
  ...props
}: TimePickerProps) {
  const tokens = useTokens("TimePicker", props.tokens);
  const containerClasses = cx(className, tokens.container);

  const filteredMinutes = MINUTES.filter((x) => x % MINUTES_STEP === 0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const twentyFourHoursContainerRef = React.useRef<HTMLDivElement>(null);

  const use12Hours = type === "use12Hours";

  const [use24HourHand, setUse24HourHand] = React.useState(false);
  const [hourAngle, setHourAngle] = React.useState(0);
  const [minuteAngle, setMinuteAngle] = React.useState(0);
  const [viewHours, setViewHours] = React.useState<boolean>(true);
  const [mouseDown, setMouseDown] = React.useState(false);
  const [hourInput, setHourInput] = React.useState<string>();
  const [minuteInput, setMinuteInput] = React.useState<string>();

  React.useEffect(() => {
    const hourValue = value.hour === null ? MIDNIGHT : value.hour;
    const minuteValue = value.minute === null ? MIDNIGHT : value.minute;

    setUse24HourHand((hourValue > NOON || hourValue === MIDNIGHT) && !use12Hours);
    setHourAngle(hourValue * HOUR_DEGREE);
    setMinuteAngle(minuteValue * MINUTE_DEGREE);

    setHourInput(hourValue.toString());
    setMinuteInput(minuteValue.toString());
  }, [value, mouseDown, use12Hours]);

  const onTimeChange = (hourValue: number | null, minuteValue: number | null, clockTypeValue: ClockType) => {
    const nonNullHour = hourValue === null ? MIDNIGHT : hourValue;
    const hour = use12Hours ? transformHourTo24HoursValue(nonNullHour, clockTypeValue) : nonNullHour;
    const minute = minuteValue === null ? MIDNIGHT : minuteValue;

    onChange(hour, minute);
  };

  const onChangeIfChanged = (hour: number | null, minute: number | null) => {
    if ((value.hour !== hour || value.minute !== minute) && mouseDown) {
      onTimeChange(hour, minute, value.type);
    }
  };

  const moveHand = (event: React.MouseEvent<HTMLDivElement>) => {
    const containerWidth = containerRef.current?.clientWidth;
    const clockRadius = containerWidth ? containerWidth / 2 : DEFAULT_12HOUR_CLOCK_RADIUS;

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const twentyFourHourContainerWidth = twentyFourHoursContainerRef.current?.clientWidth;
    const twentyFourHourClockRadius = twentyFourHourContainerWidth
      ? twentyFourHourContainerWidth / 2
      : DEFAULT_24HOUR_CLOCK_RADIUS;

    const transformedX = offsetX - clockRadius;
    const transformedY = offsetY - clockRadius;
    const distance = Math.sqrt(Math.pow(transformedX, 2) + Math.pow(transformedY, 2));

    if (distance <= clockRadius) {
      const angle =
        (-(Math.atan2(transformedX, transformedY) * STRAIGHT_ANGLE) / Math.PI + STRAIGHT_ANGLE) % FULL_CIRCLE_ANGLE;

      if (viewHours) {
        const hourIndex = Math.round(angle / HOUR_DEGREE);

        if (distance <= twentyFourHourClockRadius && !use12Hours) {
          const hour = TWENTYFOUR_HOURS[hourIndex % TWENTYFOUR_HOURS.length];
          onChangeIfChanged(hour, value.minute);
        } else {
          const hour = TWELVE_HOURS[hourIndex % TWELVE_HOURS.length];
          onChangeIfChanged(hour, value.minute);
        }
      } else {
        const minute = MINUTES[Math.round(angle / MINUTE_DEGREE) % MINUTES.length];
        onChangeIfChanged(value.hour ?? 0, minute);
      }
    }
  };

  const onMouseDown = () => setMouseDown(true);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDown) moveHand(event);
  };

  const onMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(false);
    setViewHours(false);
    moveHand(event);
  };

  const onHourInputClick = () => {
    setViewHours(true);
  };

  const onHourInputChange = (hourValue: string) => {
    if (hourValue !== "") onTimeChange(Number(hourValue), value.minute, value.type);

    setHourInput(hourValue);
  };

  const onMinuteInputClick = () => {
    setViewHours(false);
  };

  const onMinuteInputChange = (minuteValue: string) => {
    if (minuteValue !== "") onTimeChange(value.hour, Number(minuteValue), value.type);

    setMinuteInput(minuteValue);
  };

  const onButtonClick = (hourType: ClockType) => {
    onTimeChange(value.hour, value.minute, hourType);
  };

  const clockContainer = cx(tokens.clockContainer.master, tokens.clockContainer.backgroundColor);

  const mobile = (window.innerWidth < 768) as boolean;

  return (
    <div
      className={containerClasses}
      style={{
        minWidth: mobile ? undefined : "370px",
        maxWidth: fixedWidth ? (mobile ? undefined : "370px") : undefined,
      }}
      ref={timePickerRef}
    >
      <div className={tokens.innerContainer}>
        <div className={tokens.pickerHeaderContainer}>
          <Input
            name="hourInput"
            type="number"
            min={use12Hours ? ONE_HOUR : MIDNIGHT}
            max={use12Hours ? NOON : MIDNIGT_24HOURS - 1}
            className={tokens.digitInput}
            value={hourInput}
            onChange={(e) => onHourInputChange(e.target.value)}
            onClick={onHourInputClick}
          />
          <div>:</div>
          <Input
            name="minuteInput"
            type="number"
            min={0}
            max={59}
            className={tokens.digitInput}
            value={minuteInput}
            onChange={(e) => onMinuteInputChange(e.target.value)}
            onClick={onMinuteInputClick}
          />
        </div>
        {use12Hours && (
          <div>
            <div className={tokens.clockButtonsContainer}>
              <Button
                onClick={() => onButtonClick(AM)}
                type="button"
                variant={value.type === AM ? "filled" : "outlined"}
              >
                AM
              </Button>
              <Button
                onClick={() => onButtonClick(PM)}
                type="button"
                variant={value.type === PM ? "filled" : "outlined"}
              >
                PM
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className={tokens.pickerBodyContainer}>
        <div
          className={clockContainer}
          style={{
            height: "220px",
            width: "220px",
            borderRadius: "110px",
            cursor: mouseDown ? "all-scroll" : "default",
          }}
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          <div className={tokens.twentyFourHoursClockContainer}>
            {viewHours && !use12Hours && (
              <div className={tokens.twentyFourHoursClock} ref={twentyFourHoursContainerRef} />
            )}
            <Hand rotate={viewHours ? hourAngle : minuteAngle} use24HoursHand={use24HourHand && viewHours} />
            {viewHours && !use12Hours && (
              <DigitsContainer digits={TWENTYFOUR_HOURS} translate={-60} value={value.hour} isTwelveHours={false} />
            )}
          </div>
          {viewHours && (
            <DigitsContainer digits={TWELVE_HOURS} translate={-90} value={value.hour} isTwelveHours={use12Hours} />
          )}
          {!viewHours && (
            <DigitsContainer digits={filteredMinutes} translate={-90} value={value.minute} isTwelveHours={use12Hours} />
          )}
        </div>
      </div>
    </div>
  );
}

function Hand({ rotate, use24HoursHand, ...props }: HandProps) {
  const tokens = useTokens("TimePicker", props.tokens);

  const handlineContainer = cx(tokens.handline.master, tokens.handline.backgroundColor);

  return (
    <div
      className={tokens.handContainer}
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        className={handlineContainer}
        style={{
          height: "10px",
          width: "10px",
          borderRadius: "5px",
        }}
      />
      <div
        className={handlineContainer}
        style={{
          height: !use24HoursHand ? "100px" : "50px",
          width: "4px",
          transform: !use24HoursHand ? "translate(0, -50px)" : "translate(0, -25px)",
        }}
      />
      <div
        className={handlineContainer}
        style={{
          height: "30px",
          width: "30px",
          borderRadius: "15px",
          transform: !use24HoursHand ? "translate(0, -90px)" : "translate(0, -60px)",
        }}
      />
      {rotate % CLOCK_DIGIT_ANGLE !== 0 && (
        <div
          className={tokens.smallHandPointer}
          style={{
            height: "8px",
            width: "8px",
            borderRadius: "4px",
            transform: !use24HoursHand ? "translate(0, -90px)" : "translate(0, -60px)",
          }}
        />
      )}
    </div>
  );
}

function DigitsContainer({ digits, translate, value, isTwelveHours, ...props }: DigitsContainerProps) {
  const tokens = useTokens("TimePicker", props.tokens);
  const padLength = 2;
  const digitValue = value === null ? (isTwelveHours ? NOON : MIDNIGHT) : value;

  const digitTextColor = (digit: number) => {
    if (digitValue === digit || (isTwelveHours && digitValue - NOON === digit)) return "white";
    return "black";
  };

  return (
    <div className={tokens.clockDigitsContainer}>
      {digits.map((digit, index) => (
        <div
          key={digit}
          className={tokens.clockDigits}
          style={{
            transform: `rotate(${index * CLOCK_DIGIT_ANGLE}deg) translate(0, ${translate}px) rotate(${-(
              index * CLOCK_DIGIT_ANGLE
            )}deg)`,
            color: digitTextColor(digit),
          }}
        >
          {_.padStart(digit.toString(), padLength, "0")}
        </div>
      ))}
    </div>
  );
}
