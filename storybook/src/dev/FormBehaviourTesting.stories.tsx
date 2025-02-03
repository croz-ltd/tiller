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

import { Form, useField } from "formik";
import * as Yup from "yup";

import { Badge, Button } from "@tiller-ds/core";
import { DateInput, DateRangeInput, DateTimeInput } from "@tiller-ds/date";
import {
  AutocompleteField,
  DateInputField,
  DateRangeInputField,
  DateTimeInputField,
  FormContainer,
  InputField,
  MaskedInputField,
  NumberInputField,
  PasswordInputField,
  SelectField,
  TextareaField,
  TimeInputField,
} from "@tiller-ds/formik-elements";
import { Item, items, promiseTimeout } from "../utils";

/*
export default {
  title: "Component Library/Dev/Form Behaviour Testing",
};
*/

type TestFormValues = {
  autocompleteMultiple: string[];
  autocompleteSingle: string;
  select: string;
  input: string;
  password: string;
};

const validationSchema = Yup.object({
  autocompleteMultiple: Yup.array().required("Item selection is required.").max(2, "You must select up to 2 items."),
  autocompleteSingle: Yup.string().required("Item selection is required."),
  select: Yup.array().required("Item selection is required."),
  date: Yup.string().required("Date selection is required.").nullable(),
  dateStart: Yup.string().required("Starting date selection is required.").nullable(),
  dateEnd: Yup.string().required("Ending date selection is required.").nullable(),
  datetime: Yup.string().required("Date and time selection is required.").nullable(),
  time: Yup.string().required("Time selection is required.").nullable(),
  input: Yup.string().required("Comment is required."),
  textarea: Yup.string().required("Text is required."),
  password: Yup.string().required("Password input is required."),
  masked: Yup.string().required("Masked input is required."),
  number: Yup.number().required("Number input is required."),
});

const commonProps = {
  itemToString: (item: Item) => `${item.name} ${item.surname}`,
  getOptionLabel: (item: Item) => `${item.name} ${item.surname}`,
  sort: (items: Item[]) => items.sort((a, b) => a.name.localeCompare(b.name)),
};

const backendProps = {
  ...commonProps,
  options: (query: string) =>
    promiseTimeout(
      Promise.resolve(
        query.length > 0
          ? items.filter(
              (item) =>
                item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.surname.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.name
                  .concat(" " + item.surname)
                  .toLowerCase()
                  .indexOf(query.toLowerCase()) !== -1,
            )
          : items,
      ),
      500,
    ),
  getOptionValue: (item: Item) => item.username,
};

function MetaHelper({ fieldName }: { fieldName: string }) {
  const [, meta] = useField(fieldName);
  return (
    <div className="py-4">
      Touched: {meta.touched.toString()}
      <br />
      Valid:{" "}
      {meta.error?.toString() || (
        <Badge color="success" small={true}>
          Yes
        </Badge>
      )}
    </div>
  );
}

function WrapInFormContainer({ children, includeInitialErrors }: { children: React.ReactNode; includeInitialErrors?: boolean }) {
  const [customInitialErrors, setCustomInitialErrors] = React.useState<any>({
    autocompleteMultiple: "Initial item selection is required.",
    autocompleteSingle: "Initial item selection is required.",
    select: "Initial item selection is required.",
    date: "Initial date selection is required.",
    dateStart: "Initial starting date selection is required.",
    dateEnd: "Initial ending date selection is required.",
    datetime: "Initial date and time selection is required.",
    time: "Initial time selection is required.",
    input: "Initial input is required.",
    textarea: "Initial input is required.",
    password: "Initial input is required.",
    masked: "Initial masked input is required.",
    number: "Initial number input is required.",
  });

  return (
    <FormContainer
      initialValues={{}}
      initialErrors={includeInitialErrors ? customInitialErrors : undefined}
      initialTouched={
        includeInitialErrors
          ? {
              autocompleteMultiple: true,
              autocompleteSingle: true,
              select: true,
              date: true,
              dateStart: true,
              dateEnd: true,
              datetime: true,
              time: true,
              input: true,
              textarea: true,
              password: true,
              masked: true,
              number: true,
            }
          : undefined
      }
      onSubmit={() => {
        console.log("submit");
        setCustomInitialErrors({
          autocompleteMultiple: "Initial item selection is required.",
        });
      }}
      enableReinitialize={true}
      validateAfterSubmit={true}
    >
      {children}
    </FormContainer>
  );
}

export const UsualUsageTest = () => (
  <WrapInFormContainer>
    <>
      {(values) => (
        <Form>
          <AutocompleteField
            label="AutocompleteField Test"
            {...backendProps}
            name="autocompleteMultiple"
            allowMultiple={true}
            required={true}
          />
          <div className="flex space-x-2 mt-2">
            <Button
              type="button"
              color="danger"
              size="sm"
              onClick={() => values.getFieldHelpers("autocompleteMultiple").setValue([], false)}
            >
              Reset Autocomplete Field
            </Button>
            <Button
              type="button"
              color="warning"
              size="sm"
              onClick={() => values.getFieldHelpers("autocompleteMultiple").setValue(items.slice(0, 2), false)}
            >
              Change Autocomplete Field
            </Button>
          </div>
          <MetaHelper fieldName="autocompleteMultiple" />
          <AutocompleteField label="AutocompleteField Test" {...backendProps} name="autocompleteSingle" required={true} />
          <div className="flex space-x-2 mt-2">
            <Button
              type="button"
              color="danger"
              size="sm"
              onClick={() => values.getFieldHelpers("autocompleteSingle").setValue("", false)}
            >
              Reset Autocomplete Field
            </Button>
            <Button
              type="button"
              color="warning"
              size="sm"
              onClick={() => values.getFieldHelpers("autocompleteSingle").setValue(items[1], false)}
            >
              Change Autocomplete Field
            </Button>
          </div>
          <MetaHelper fieldName="autocompleteSingle" />
          <SelectField
            {...commonProps}
            name="select"
            options={items}
            label="SelectField Test"
            required={true}
            allowMultiple={true}
          />
          <MetaHelper fieldName="select" />

          <DateInputField name="date" label="DateInputField Test" required={true} />
          <MetaHelper fieldName="date" />
          <DateRangeInputField start="dateStart" end="dateEnd" label="DateRangeInputField Test" required={true} />
          <MetaHelper fieldName="dateStart" />
          <MetaHelper fieldName="dateEnd" />
          <DateTimeInputField name="datetime" label="DateTimeInputField Test" required={true} />
          <MetaHelper fieldName="datetime" />
          <TimeInputField name="time" label="TimeInputField Test" required={true} />
          <MetaHelper fieldName="time" />

          <InputField name="input" label="InputField Test" required={true} />
          <MetaHelper fieldName="input" />
          <TextareaField name="textarea" label="TextAreaField Test" required={true} />
          <MetaHelper fieldName="textarea" />
          <PasswordInputField {...commonProps} name="password" label="PasswordInputField Test" required={true} />
          <MetaHelper fieldName="password" />
          <MaskedInputField
            name="masked"
            label="MaskedInputField Test"
            required={true}
            mask={["(", /[1-9]/, /\d/, /\d/, ")", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
          />
          <MetaHelper fieldName="masked" />
          <NumberInputField name="number" label="NumberInputField Test" required={true} />
          <MetaHelper fieldName="number" />

          <div className="flex space-x-2">
            <Button type="submit">Submit form</Button>
            <Button type="reset" color="danger" size="md">
              Reset form
            </Button>
          </div>
        </Form>
      )}
    </>
  </WrapInFormContainer>
);

export const InitialErrorsTest = () => {
  return (
    <WrapInFormContainer includeInitialErrors={true}>
      <>
        {(values) => (
          <Form>
            <AutocompleteField
              label="AutocompleteField Test"
              {...backendProps}
              name="autocompleteMultiple"
              allowMultiple={true}
              required={true}
            />
            <div className="flex space-x-2 mt-2">
              <Button
                type="button"
                color="danger"
                size="sm"
                onClick={() => values.getFieldHelpers("autocompleteMultiple").setValue([], false)}
              >
                Reset Autocomplete Field
              </Button>
              <Button
                type="button"
                color="warning"
                size="sm"
                onClick={() => values.getFieldHelpers("autocompleteMultiple").setValue(items.slice(0, 2), false)}
              >
                Change Autocomplete Field
              </Button>
            </div>
            <MetaHelper fieldName="autocompleteMultiple" />
            <AutocompleteField label="AutocompleteField Test" {...backendProps} name="autocompleteSingle" required={true} />
            <div className="flex space-x-2 mt-2">
              <Button
                type="button"
                color="danger"
                size="sm"
                onClick={() => values.getFieldHelpers("autocompleteSingle").setValue("", false)}
              >
                Reset Autocomplete Field
              </Button>
              <Button
                type="button"
                color="warning"
                size="sm"
                onClick={() => values.getFieldHelpers("autocompleteSingle").setValue(items[1], true)}
              >
                Change Autocomplete Field
              </Button>
            </div>
            <MetaHelper fieldName="autocompleteSingle" />
            <SelectField
              {...commonProps}
              name="select"
              options={items}
              label="SelectField Test"
              required={true}
              allowMultiple={true}
            />
            <MetaHelper fieldName="select" />

            <DateInputField name="date" label="DateInputField Test" required={true} />
            <MetaHelper fieldName="date" />
            <DateRangeInputField start="dateStart" end="dateEnd" label="DateRangeInputField Test" required={true} />
            <MetaHelper fieldName="dateStart" />
            <MetaHelper fieldName="dateEnd" />
            <DateTimeInputField name="datetime" label="DateTimeInputField Test" required={true} />
            <MetaHelper fieldName="datetime" />
            <TimeInputField name="time" label="TimeInputField Test" required={true} />
            <MetaHelper fieldName="time" />

            <InputField name="input" label="InputField Test" required={true} />
            <MetaHelper fieldName="input" />
            <TextareaField name="textarea" label="TextAreaField Test" required={true} />
            <MetaHelper fieldName="textarea" />
            <PasswordInputField {...commonProps} name="password" label="PasswordInputField Test" required={true} />
            <MetaHelper fieldName="password" />
            <MaskedInputField
              name="masked"
              label="MaskedInputField Test"
              required={true}
              mask={["(", /[1-9]/, /\d/, /\d/, ")", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
            />
            <MetaHelper fieldName="masked" />
            <NumberInputField name="number" label="NumberInputField Test" required={true} />
            <MetaHelper fieldName="number" />

            <div className="flex space-x-2">
              <Button type="submit">Submit form</Button>
              <Button type="reset" color="danger" size="md">
                Reset form
              </Button>
            </div>
          </Form>
        )}
      </>
    </WrapInFormContainer>
  );
};

export const DateTest = () => {
  const [date1, setDate1] = React.useState<Date | null>(new Date("2020-11-20"));
  const [date2, setDate2] = React.useState<Date | null>(new Date("2020-11-20"));

  return (
    <div className="flex space-x-8">
      <DateInput
        name="date1"
        style={{ width: "300px" }}
        value={date1}
        onChange={(value) => {
          setDate1(value);
          setDate2(value);
        }}
      />
      <DateInput
        name="date2"
        style={{ width: "300px" }}
        value={date2}
        onChange={(value) => {
          setDate2(value);
        }}
      />
    </div>
  );
};

export const DateTimeTest = () => {
  const [dateTime1, setDateTime1] = React.useState<Date | null>(new Date("2020-11-20T11:21:28.63602+05:00"));
  const [dateTime2, setDateTime2] = React.useState<Date | null>(new Date("2020-11-20T21:21:28"));

  return (
    <div className="flex space-x-8">
      <DateTimeInput
        name="dateTime1"
        style={{ width: "300px" }}
        value={dateTime1}
        onChange={(value) => {
          setDateTime1(value);
          setDateTime2(value);
        }}
      />
      <DateTimeInput
        name="dateTime2"
        style={{ width: "300px" }}
        value={dateTime2}
        onChange={(value) => {
          setDateTime2(value);
        }}
      />
    </div>
  );
};

export const DateRangeTest = () => {
  type DateRange = { start: Date | null; end: Date | null };

  const [dateRange1, setDateRange1] = React.useState<DateRange>({
    start: new Date("2020-10-05"),
    end: new Date("2020-10-10"),
  });
  const [dateRange2, setDateRange2] = React.useState<DateRange>({
    start: new Date("2021-11-05"),
    end: new Date("2021-11-10"),
  });

  return (
    <div className="flex space-x-8">
      <DateRangeInput
        name="dateRange1"
        style={{ width: "300px" }}
        start={dateRange1.start as Date}
        end={dateRange1.end as Date}
        onChange={(start, end) => {
          if (start && end) {
            setDateRange1({ start: start, end: end });
            setDateRange2({ start: end, end: null });
          } else if (start) {
            setDateRange1({ start: start, end: null });
          } else {
            setDateRange1({ start: null, end: null });
            setDateRange2({ start: null, end: null });
          }
        }}
        onReset={() => {
          setDateRange1({ start: null, end: null });
          setDateRange2({ start: null, end: null });
        }}
      />
      <DateRangeInput
        name="dateRange2"
        style={{ width: "300px" }}
        start={dateRange2.start as Date}
        end={dateRange2.end as Date}
        onChange={(start, end) => {
          if (start && end) {
            setDateRange2({ start: start, end: end });
          } else if (start) {
            setDateRange2({ start: start, end: null });
          } else {
            setDateRange2({ start: null, end: null });
          }
        }}
        onReset={() => {
          setDateRange1({ start: null, end: null });
          setDateRange2({ start: null, end: null });
        }}
      />
    </div>
  );
};
