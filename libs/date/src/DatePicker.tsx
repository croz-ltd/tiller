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

import { useDatepicker, useDay, useMonth, UseMonthProps } from "@datepicker-react/hooks";
import { useIntl } from "react-intl";

import { cx, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";

type DatePickerProps = {
  className?: string;
  datePicker: ReturnType<typeof useDatepicker>;
  datePickerRef: React.Ref<HTMLDivElement>;
  fixedWidth?: boolean;
  focusedDate: Date | null;
  isDateRange: boolean;
  maxYear?: number;
  minYear?: number;
  highlightToday?: boolean;
};

type MonthPickerProps = {
  goToPreviousMonths: () => void;
  goToNextMonths: () => void;
} & UseMonthProps;

type MonthPickerLabelsProps = {
  month: number;
  year: number;
} & TokenProps<"DateInput">;

type DatePickerYearProps = {
  selectedYear: number;
  currentYear: number;
} & TokenProps<"DateInput">;

type YearsPickerProps = {
  years: number[];
  currentYear: number;
} & TokenProps<"DateInput">;

type DatePickerDayProps = {
  date: Date;
  dayLabel: string;
} & TokenProps<"DateInput">;

type DaysPickerProps = {
  weekdayLabels: string[];
  days: (number | { dayLabel: string; date: Date })[];
} & TokenProps<"DateInput">;

type DatePickerContainerProps = {
  fixedWidth?: boolean;
  className?: string;
} & TokenProps<"DateInput">;

type NavigationButtonProps = {
  onClick: () => void;
  icon?: React.ReactElement;
  hiddenText?: string;
} & TokenProps<"DateInput">;

const MAX_PICKING_YEARS = 35;
const SET_START_YEAR = 10;

type ActiveMonth = {
  year: number;
  month: number;
};

type DatePickerContext = {
  datePicker: ReturnType<typeof useDatepicker>;
  datePickerRef: React.Ref<HTMLDivElement>;
  dayPicker: boolean;
  onDayPickerToggle: (toggleValue: boolean) => void;
  minYear?: number;
  maxYear?: number;
  activeMonth: ActiveMonth;
  onActiveMonthToggle: (value: ActiveMonth) => void;
  isDateRange: boolean;
  startDate: Date | null;
  highlightToday?: boolean;
};

type DatePickerContextProps = {
  datePicker: ReturnType<typeof useDatepicker>;
  datePickerRef: React.Ref<HTMLDivElement>;
  minYear?: number;
  maxYear?: number;
  startDate: Date | null;
  isDateRange: boolean;
  children: React.ReactNode;
  highlightToday?: boolean;
};

const DatePickerContext = React.createContext<DatePickerContext | null>(null);

function useDatePickerContext() {
  const context = React.useContext(DatePickerContext);

  if (!context) {
    throw new Error("useDatePickerContext must be used within a DatePicker.Provider");
  }

  return context;
}

function usePickerIcons(props: TokenProps<"DateInput">) {
  const tokens = useTokens("DateInput", props.tokens);

  const iconProps = { size: tokens.DatePicker.Month.icon.size, className: tokens.DatePicker.Month.icon.color };
  const previousIcon = useIcon("paginatorPrevious", undefined, iconProps);
  const nextIcon = useIcon("paginatorNext", undefined, iconProps);
  const expanderIcon = useIcon("openExpander", undefined, iconProps);

  return { previousIcon, nextIcon, expanderIcon };
}

function DatePickerContextProvider({
  datePicker,
  datePickerRef,
  minYear,
  maxYear,
  startDate,
  isDateRange,
  children,
  highlightToday,
}: DatePickerContextProps) {
  const [dayPicker, setDayPicker] = React.useState<boolean>(true);
  const [activeMonth, setActiveMonth] = React.useState<ActiveMonth>({ month: 0, year: 0 });

  const onDayPickerToggle = (toggleValue: boolean) => {
    setDayPicker(toggleValue);
  };

  const onActiveMonthToggle = (value: ActiveMonth) => {
    setActiveMonth(value);
  };

  return (
    <DatePickerContext.Provider
      value={{
        datePicker,
        datePickerRef,
        dayPicker,
        onDayPickerToggle,
        minYear,
        maxYear,
        startDate,
        activeMonth,
        onActiveMonthToggle,
        isDateRange,
        highlightToday,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
}

export default function DatePicker({
  datePicker,
  datePickerRef,
  fixedWidth,
  focusedDate,
  minYear,
  maxYear,
  isDateRange,
  className,
  highlightToday,
}: DatePickerProps) {
  return (
    <DatePickerContextProvider
      datePicker={datePicker}
      datePickerRef={datePickerRef}
      startDate={focusedDate}
      minYear={minYear}
      maxYear={maxYear}
      isDateRange={isDateRange}
      highlightToday={highlightToday}
    >
      {!isDateRange && <DatePickerContainer className={className} fixedWidth={fixedWidth} />}
      {isDateRange && <DateRangePickerContainer className={className} fixedWidth={fixedWidth} />}
    </DatePickerContextProvider>
  );
}

function DatePickerContainer({ className = "", fixedWidth, ...props }: DatePickerContainerProps) {
  const tokens = useTokens("DateInput", props.tokens);
  const { dayPicker, datePickerRef } = useDatePickerContext();

  const containerClassName = cx(
    tokens.DatePicker.base.master,
    tokens.DatePicker.base.backgroundColor,
    tokens.DatePicker.base.padding,
    className,
  );

  const mobile = (window.innerWidth < 768) as boolean;

  return (
    <div
      className={containerClassName}
      style={{
        minWidth: mobile ? undefined : "370px",
        maxWidth: fixedWidth ? (mobile ? undefined : "370px") : undefined,
      }}
      ref={datePickerRef}
    >
      {dayPicker && <DatePickerMonthContainer />}
      {!dayPicker && <YearsPickerContainer />}
    </div>
  );
}

function DateRangePickerContainer({ className = "", fixedWidth, ...props }: DatePickerContainerProps) {
  const tokens = useTokens("DateInput", props.tokens);
  const { dayPicker, datePickerRef } = useDatePickerContext();

  const rangeClassName = cx(
    tokens.DatePicker.range.master,
    tokens.DatePicker.range.backgroundColor,
    tokens.DatePicker.range.margin,
    tokens.DatePicker.range.borderRadius,
    tokens.DatePicker.range.padding,
    className,
  );

  const mobile = (window.innerWidth < 768) as boolean;

  return (
    <div
      className={rangeClassName}
      style={{
        minWidth: mobile ? undefined : "600px",
        maxWidth: fixedWidth ? (mobile ? undefined : "600px") : undefined,
      }}
      ref={datePickerRef}
    >
      {dayPicker && <DateRangeMonthPickerContainer />}
      {!dayPicker && <YearsPickerContainer />}
    </div>
  );
}

function DatePickerMonthContainer({ ...props }) {
  const tokens = useTokens("DateInput", props.tokens);
  const { datePicker } = useDatePickerContext();

  const { previousIcon, nextIcon } = usePickerIcons(props);

  return (
    <>
      {datePicker.activeMonths.map((month: { year: number; month: number }) => (
        <div key={`${month.year}-${month.month}`}>
          <div className={tokens.DatePicker.Month.headerContainer}>
            <MonthPickerLabels {...month} />
            <div>
              <NavigationButton
                onClick={datePicker.goToPreviousMonths}
                icon={previousIcon}
                hiddenText="Previous month"
              />
              <NavigationButton onClick={datePicker.goToNextMonths} icon={nextIcon} hiddenText="Next month" />
            </div>
          </div>
          <MonthPicker key={`${month.year}-${month.month}`} {...month} {...datePicker} />
        </div>
      ))}
    </>
  );
}

function DateRangeMonthPickerContainer({ ...props }) {
  const { datePicker } = useDatePickerContext();
  const tokens = useTokens("DateInput", props.tokens);

  const mobile = (window.innerWidth < 768) as boolean;

  const { previousIcon, nextIcon } = usePickerIcons(props);

  return (
    <>
      <NavigationButton
        onClick={datePicker.goToPreviousMonths}
        icon={previousIcon}
        hiddenText="Previous set of months"
      />
      <div className={"flex flex-col md:flex-row w-full " + (!mobile ? "space-x-6" : undefined)}>
        {datePicker.activeMonths.map((month: { year: number; month: number }) => (
          <div key={`${month.year}-${month.month}`} className={mobile ? undefined : "w-1/2"}>
            <div className={tokens.DatePicker.Month.headerContainer}>
              <MonthPickerLabels {...month} />
            </div>
            <MonthPicker key={`${month.year}-${month.month}`} {...month} {...datePicker} />
          </div>
        ))}
      </div>
      <NavigationButton onClick={datePicker.goToNextMonths} icon={nextIcon} hiddenText="Next set of months" />
    </>
  );
}

function YearsPickerContainer({ ...props }) {
  const tokens = useTokens("DateInput", props.tokens);
  const { activeMonth } = useDatePickerContext();

  const [startYear, setStartYear] = React.useState<number>(activeMonth.year - SET_START_YEAR);

  React.useEffect(() => {
    setStartYear(activeMonth.year - SET_START_YEAR);
  }, [activeMonth.year]);

  const years = Array.from(new Array(MAX_PICKING_YEARS), (_, index) => startYear + index);

  const goToPreviousYears = () => {
    setStartYear(startYear - MAX_PICKING_YEARS);
  };

  const goToNextYears = () => {
    setStartYear(startYear + MAX_PICKING_YEARS);
  };

  const { previousIcon, nextIcon } = usePickerIcons(props);

  return (
    <div className="w-full">
      <div className={tokens.DatePicker.Month.headerContainer}>
        <MonthPickerLabels {...activeMonth} />
        <div>
          <NavigationButton onClick={goToPreviousYears} icon={previousIcon} hiddenText="Previous set of years" />
          <NavigationButton onClick={goToNextYears} icon={nextIcon} hiddenText="Next set of years" />
        </div>
      </div>
      <YearsPicker years={years} currentYear={activeMonth.year} />
    </div>
  );
}

function MonthPickerLabels({ month, year, ...props }: MonthPickerLabelsProps) {
  const tokens = useTokens("DateInput", props.tokens);
  const intl = useIntl();
  const { onDayPickerToggle, dayPicker, onActiveMonthToggle } = useDatePickerContext();

  const { monthLabel } = useMonth({
    year,
    month,
    monthLabelFormat: (date: Date) => intl.formatDate(date, { month: "long" }),
  });

  const onChevronDownClick = () => {
    onDayPickerToggle(!dayPicker);
    onActiveMonthToggle({ month, year });
  };

  const monthLabelClassName = cx(
    tokens.DatePicker.Month.monthLabel.margin,
    tokens.DatePicker.Month.monthLabel.fontSize,
    tokens.DatePicker.Month.monthLabel.fontWeight,
    tokens.DatePicker.Month.monthLabel.color,
  );

  const yearLabelClassName = cx(
    tokens.DatePicker.Month.yearLabel.margin,
    tokens.DatePicker.Month.yearLabel.fontSize,
    tokens.DatePicker.Month.yearLabel.fontWeight,
    tokens.DatePicker.Month.yearLabel.color,
  );

  const { expanderIcon } = usePickerIcons(props);

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className={monthLabelClassName}>{monthLabel}</span>
        <span className={yearLabelClassName}>{year}</span>
        <NavigationButton onClick={onChevronDownClick} icon={expanderIcon} hiddenText="Choose month" />
      </div>
    </div>
  );
}

function MonthPicker({ year, month, firstDayOfWeek }: MonthPickerProps) {
  const intl = useIntl();

  const { days, weekdayLabels } = useMonth({
    year,
    month,
    firstDayOfWeek,
    monthLabelFormat: (date: Date) => intl.formatDate(date, { month: "long" }),
    weekdayLabelFormat: (date: Date) => intl.formatDate(date, { weekday: "short" }),
  });

  return (
    <div>
      <DaysPicker weekdayLabels={weekdayLabels} days={days} />
    </div>
  );
}

function DatePickerYear({ currentYear, selectedYear, ...props }: DatePickerYearProps) {
  const tokens = useTokens("DateInput", props.tokens);
  const dayRef = React.useRef(null);
  const { datePicker, minYear, maxYear, onDayPickerToggle } = useDatePickerContext();

  const disabled = (minYear ? selectedYear < minYear : false) || (maxYear ? selectedYear > maxYear : false);

  const yearsContainerClassName = cx("md:px-1 mb-2 w-full");

  const yearButtonClassName = cx(
    tokens.DatePicker.Button.base,
    { [tokens.DatePicker.Button.regular]: !disabled && currentYear === selectedYear },
    { [tokens.DatePicker.Button.yearHovered]: !disabled && currentYear !== selectedYear },
    { [tokens.DatePicker.Button.disabled]: disabled },
  );

  const onClick = () => {
    const yearDifference = Math.abs(currentYear - selectedYear);

    if (currentYear > selectedYear) {
      datePicker.goToPreviousYear(yearDifference);
    } else if (currentYear < selectedYear) {
      datePicker.goToNextYear(yearDifference);
    }

    onDayPickerToggle(true);
  };

  return (
    <div className={yearsContainerClassName}>
      <button className={yearButtonClassName} type="button" ref={dayRef} onClick={onClick} disabled={disabled}>
        {selectedYear}
      </button>
    </div>
  );
}

export function YearsPicker({ years, currentYear, ...props }: YearsPickerProps) {
  const tokens = useTokens("DateInput", props.tokens);

  const daysContainerClassName = cx("grid grid-cols-7 justify-items-center", tokens.DatePicker.Month.daysContainer);

  return (
    <div className={cx("mt-4", daysContainerClassName)}>
      {years.map((selectedYear) => (
        <DatePickerYear key={selectedYear} selectedYear={selectedYear} currentYear={currentYear} />
      ))}
    </div>
  );
}

export function DaysPicker({ weekdayLabels, days, ...props }: DaysPickerProps) {
  const tokens = useTokens("DateInput", props.tokens);
  const daysElements: React.ReactNode[] = [];

  days.forEach((day, index) => {
    if (typeof day === "object") {
      daysElements.push(<DatePickerDay date={day.date} key={day.date.toString()} dayLabel={day.dayLabel} />);
      return;
    } else {
      daysElements.push(<DatePickerEmptyDay key={index} />);
    }
  });

  for (let i = daysElements.length; i < 42; i++) {
    daysElements.push(<DatePickerEmptyDay key={i} />);
  }

  const daysContainerClassName = cx("grid grid-cols-7 justify-items-center", tokens.DatePicker.Month.daysContainer);

  return (
    <>
      <div className={daysContainerClassName}>
        {weekdayLabels.map((dayLabel) => (
          <div key={dayLabel} className={tokens.DatePicker.Month.weekDayLabel}>
            {dayLabel}
          </div>
        ))}
      </div>
      <div className={daysContainerClassName}>{daysElements}</div>
    </>
  );
}

function DatePickerDay({ dayLabel, date, ...props }: DatePickerDayProps) {
  const tokens = useTokens("DateInput", props.tokens);
  const { startDate, datePicker, isDateRange, highlightToday } = useDatePickerContext();

  const { onClick, onKeyDown, onMouseEnter, tabIndex, disabledDate } = useDay({
    date,
    focusedDate: startDate,
    ...datePicker,
    dayRef: null as unknown as React.RefObject<HTMLButtonElement>,
  });

  const dayButtonClassName = cx(
    tokens.DatePicker.Button.base,
    {
      [tokens.DatePicker.Button.selected]:
        datePicker.isDateSelected(date) && !datePicker.isFirstOrLastSelectedDate(date),
    },
    { [tokens.DatePicker.Button.firstOrLast]: datePicker.isFirstOrLastSelectedDate(date) },
    { [tokens.DatePicker.Button.hovered]: datePicker.isDateHovered(date) && isDateRange },
    {
      [tokens.DatePicker.Button.currentDate]: new Date().toDateString() === date.toDateString() && highlightToday,
    },
    {
      [tokens.DatePicker.Button.dateHovered]:
        !disabledDate && startDate?.getTime() !== date.getTime() && !datePicker.isDateSelected(date),
    },
    { [tokens.DatePicker.Button.disabled]: disabledDate },
  );

  return (
    <div className={tokens.DatePicker.Day.container}>
      <button
        className={dayButtonClassName}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        tabIndex={tabIndex}
        type="button"
      >
        {dayLabel}
      </button>
    </div>
  );
}

function DatePickerEmptyDay({ ...props }) {
  const tokens = useTokens("DateInput", props.tokens);

  return <div className={tokens.DatePicker.EmptyDay.base}>&nbsp;</div>;
}

export function NavigationButton({ onClick, icon, hiddenText, ...props }: NavigationButtonProps) {
  const tokens = useTokens("DateInput", props.tokens);

  return (
    <button type="button" className={tokens.DatePicker.Month.button} onClick={onClick}>
      {icon}
      {hiddenText && <span className="sr-only">{hiddenText}</span>}
    </button>
  );
}
