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

import * as Yup from "yup";

import { withDesign } from "storybook-addon-designs";

import { Button, Card, IconButton, useLocalPagination } from "@tiller-ds/core";
import { DataTable, useDataTable } from "@tiller-ds/data-display";
import { FieldLabel, FormLayout } from "@tiller-ds/form-elements";
import {
  AutocompleteField,
  CheckboxGroupField,
  DataTableField,
  DateInputField,
  DateTimeInputField,
  DragZoneField,
  FieldError,
  InputField,
  MaskedInputField,
  NumberInputField,
  RadioGroupField,
  TextareaField,
  TimeInputField,
  UploadButtonField,
  useDataTableField,
  useScrollToError,
} from "@tiller-ds/formik-elements";
import { Icon } from "@tiller-ds/icons";
import { beautifySource, FormikDecorator, useMockSender } from "../utils";
import { useTokens } from "@tiller-ds/theme";
import { File, FileList, useFileUpload } from "@tiller-ds/upload";

import mdx from "./FormLayout.mdx";

const InlineEditValidationSchema = Yup.object().shape({
  person: Yup.object()
    .nullable(false)
    .shape({
      name: Yup.string().required("required"),
      surname: Yup.string().required("required"),
    }),
  age: Yup.number().required("required"),
});

const ValidationSchema = Yup.object().shape({
  date: Yup.string().required("date validation error").nullable(),
  name: Yup.string().required("name validation error"),
  surname: Yup.string().required("surname validation error"),
  time: Yup.string().required("time validation error").nullable(),
  country: Yup.string().required("country validation error").nullable(),
  datetime: Yup.string().required("date-time validation error").nullable(),
  destination: Yup.string().required("destination validation error"),
  description: Yup.string().required("description validation error"),
  employees: Yup.array().required("employees validation error").nullable(),
  type: Yup.object().required("type validation error"),
});

const ScrollToErrorValidationSchema = Yup.object().shape({
  name: Yup.string().required("name validation error"),
  surname: Yup.string().required("surname validation error"),
  country: Yup.string().required("country validation error").nullable(),
});

const defaultFiles: File[] = [
  { id: "1", name: "File 1", status: "finished" },
  { id: "2", name: "File 2", status: "finished" },
  { id: "3", name: "File 3", status: "finished" },
];

type Item = {
  person?: {
    name: string;
    surname: string;
  };
  age: number;
};

function Body({ children }: React.PropsWithChildren<Record<string, unknown>>) {
  const tokens = useTokens("FormLayout");

  return <div className={`p-8 h-full ${tokens.backgroundColor}`}>{children}</div>;
}

export default {
  title: "Component Library/Form-elements/FormLayout",
  component: FormLayout,

  decorators: [
    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => <Body>{storyFn()}</Body>,
  ],
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "FormLayout"),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=10462%3A11958",
    },
    decorators: [withDesign],
  },
};

export const SimpleType = () => (
  <FormLayout>
    <FormLayout.Section title="Profile" subtitle="Profile info">
      <FormLayout.Section.Content>
        <InputField name="username" label="Username" />
        <TextareaField name="about" label="About" help="Write a few sentences about yourself." />
      </FormLayout.Section.Content>
    </FormLayout.Section>

    <FormLayout.Section title="Personal Information">
      <FormLayout.Section.Content>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <InputField name="firstName" label="First Name" className="sm:col-span-3" />
          <InputField name="lastName" label="Last Name" className="sm:col-span-3" />
          <InputField name="email" label="Email address" className="sm:col-span-3" />
          <br />
          <AutocompleteField
            name="country"
            required={true}
            label="Country / Region"
            className="sm:col-span-3"
            getOptionValue={(country) => country.value}
            itemToString={(country) => country.label}
            filter={(name: string, option) => option.label.toLowerCase().includes(name.toLowerCase())}
            options={[
              { value: "BIH", label: "Bosnia and Herzegovina" },
              { value: "HRV", label: "Croatia" },
              { value: "SRB", label: "Serbia" },
              { value: "SVN", label: "Slovenia" },
              { value: "USA", label: "United States of America (the)" },
            ]}
          />
          <InputField name="streetAddress" label="Street address" className="sm:col-span-6" />
          <AutocompleteField
            name="city"
            label="City"
            options={async (query) =>
              Promise.resolve(
                ["Zagreb", "Rijeka", "Osijek"].filter((item) => item.toLowerCase().indexOf(query.toLowerCase()) !== -1),
              )
            }
            className="sm:col-span-2"
          />
          <InputField name="state" label="State / Province" className="sm:col-span-2" />
          <InputField name="zip" label="ZIP / Postal" className="sm:col-span-2" />
        </div>
      </FormLayout.Section.Content>
    </FormLayout.Section>

    <FormLayout.Section title="Notifications">
      <FormLayout.Section.Content>
        <CheckboxGroupField name="emailNotifications" label="By Email">
          <CheckboxGroupField.Item
            label="Comments"
            value="comments"
            help="Get notified when someones posts a comment on a posting."
          />
          <CheckboxGroupField.Item
            label="Candidates"
            value="candidates"
            help="Get notified when a candidate applies for a job."
          />
          <CheckboxGroupField.Item
            label="Offers"
            value="offers"
            help="Get notified when a candidate accepts or rejects an offer."
          />
        </CheckboxGroupField>

        <RadioGroupField
          name="pushNotifications"
          label="Push Notifications"
          help="These are delivered via SMS to your mobile phone."
        >
          <RadioGroupField.Item label="Everything" value="everything" />
          <RadioGroupField.Item label="Same as email" value="same-as-email" />
          <RadioGroupField.Item label="No push notifications" value="disabled" />
        </RadioGroupField>
      </FormLayout.Section.Content>

      <FormLayout.Section.Actions>
        <Button variant="outlined" type="reset" className="ml-2">
          Reset
        </Button>
        <Button variant="filled" className="ml-2">
          Save
        </Button>
      </FormLayout.Section.Actions>
    </FormLayout.Section>
  </FormLayout>
);

export const CardType = () => (
  <FormLayout type="card">
    <FormLayout.Section title="Profile" subtitle="Profile info">
      <FormLayout.Section.Content>
        <InputField name="username" label="Username" />
        <TextareaField name="about" label="About" help="Write a few sentences about yourself." />
      </FormLayout.Section.Content>
    </FormLayout.Section>

    <FormLayout.Section title="Personal Information">
      <FormLayout.Section.Content>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <InputField name="firstName" label="First Name" className="sm:col-span-3" />
          <InputField name="lastName" label="Last Name" className="sm:col-span-3" />
          <InputField name="email" label="Email address" className="sm:col-span-3" />
          <br />
          <AutocompleteField
            name="country"
            required={true}
            label="Country / Region"
            className="sm:col-span-3"
            getOptionValue={(country) => country.value}
            itemToString={(country) => country.label}
            filter={(name: string, option) => option.label.toLowerCase().includes(name.toLowerCase())}
            options={[
              { value: "BIH", label: "Bosnia and Herzegovina" },
              { value: "HRV", label: "Croatia" },
              { value: "SRB", label: "Serbia" },
              { value: "SVN", label: "Slovenia" },
              { value: "USA", label: "United States of America (the)" },
            ]}
          />
          <InputField name="streetAddress" label="Street address" className="sm:col-span-6" />
          <AutocompleteField
            name="city"
            label="City"
            options={async (query) =>
              Promise.resolve(
                ["Zagreb", "Rijeka", "Osijek"].filter((item) => item.toLowerCase().indexOf(query.toLowerCase()) !== -1),
              )
            }
            className="sm:col-span-2"
          />
          <InputField name="state" label="State / Province" className="sm:col-span-2" />
          <InputField name="zip" label="ZIP / Postal" className="sm:col-span-2" />
          <NumberInputField name="salary" label="Salary" />
          <MaskedInputField
            label={"Birth date"}
            name={"birthDate"}
            mask={[/[0-9]/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
            placeholder={"MM/DD/YYYY"}
          />
        </div>
      </FormLayout.Section.Content>

      <FormLayout.Section.Actions>
        <Button variant="outlined" type="reset" className="ml-2">
          Reset
        </Button>
        <Button variant="filled" className="ml-2">
          Save
        </Button>
      </FormLayout.Section.Actions>
    </FormLayout.Section>
  </FormLayout>
);

export const FullWidthTypeWithDataTableField = () => {
  const [dataTableState, dataTableHook] = useDataTable();
  const [dataTableFieldState, dataTableFieldHook] = useDataTableField<Item[]>("employees", InlineEditValidationSchema);
  const [paginationState] = useLocalPagination(dataTableFieldState.data);

  return (
    <FormLayout type="full-width">
      <FormLayout.Section title="Employees team building" subtitle="Trip organization">
        <FormLayout.Section.Content>
          <InputField name="destination" required={true} label="Destination" />
          <TextareaField name="description" required={true} label="Description" />
          <DateInputField name="date" required={true} label="Date" />
          <Card>
            <Card.Body removeSpacing={true}>
              <FieldError name="employees" className="m-4" />
              <DataTable.CardHeader {...dataTableState} {...paginationState}>
                <DataTable.CardHeader.Title>
                  <FieldLabel label={"Employees"} required={true} />
                </DataTable.CardHeader.Title>
              </DataTable.CardHeader>
              <DataTableField>
                <DataTableField.NewRow>
                  <div className="flex justify-between m-4 space-x-2 items-end">
                    <div className="flex flex-row space-x-4">
                      <div>
                        <InputField name={dataTableFieldHook.setNewRowFieldName("person.name")} label="Name" />
                      </div>
                      <div>
                        <InputField name={dataTableFieldHook.setNewRowFieldName("person.surname")} label="Surname" />
                      </div>
                      <div>
                        <NumberInputField name={dataTableFieldHook.setNewRowFieldName("age")} label="Age" />
                      </div>
                    </div>
                    <div className="flex flex-row space-x-4">
                      <div>
                        <Button type="button" onClick={dataTableFieldHook.onNewRowSubmit}>
                          Add
                        </Button>
                      </div>
                      <div>
                        <Button type="button" variant="outlined" onClick={dataTableFieldHook.onNewRowReset}>
                          Reset
                        </Button>
                      </div>
                    </div>
                  </div>
                </DataTableField.NewRow>
              </DataTableField>
              <DataTable
                data={dataTableFieldState.data}
                hook={dataTableHook}
                rowEditingIndex={dataTableFieldState.rowEditingIndex}
              >
                <DataTable.Column header="Actions" id="actions" canSort={false}>
                  {(item: Item, index, row, { isEditMode }) =>
                    isEditMode ? (
                      <div className="flex space-x-2">
                        <IconButton
                          icon={<Icon type="x" className="text-gray-500" />}
                          label="Cancel"
                          onClick={() => dataTableFieldHook.onRowEditCancel()}
                        />
                        <IconButton
                          icon={<Icon type="check" className="text-gray-500" />}
                          label="Save"
                          onClick={() => dataTableFieldHook.onRowEditSave(index)}
                        />
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <IconButton
                          icon={<Icon type="pencil-simple" variant="fill" className="text-gray-500" />}
                          label="Edit"
                          onClick={() => dataTableFieldHook.onRowEdit(index)}
                        />
                        <IconButton
                          icon={<Icon type="trash" variant="fill" className="text-gray-500" />}
                          label="Delete"
                          onClick={() => dataTableFieldHook.onRowDelete(index)}
                        />
                      </div>
                    )
                  }
                </DataTable.Column>
                <DataTable.Column header="Name" id="person.name">
                  {(item: Item, index: number, row, { isEditMode }) =>
                    isEditMode ? (
                      <>
                        <InputField name={dataTableFieldHook.onRowEditField(index, "person.name")} />
                      </>
                    ) : (
                      item.person?.name || ""
                    )
                  }
                </DataTable.Column>
                <DataTable.Column header="Surname" id="person.surname">
                  {(item: Item, index: number, row, { isEditMode }) =>
                    isEditMode ? (
                      <>
                        <InputField name={dataTableFieldHook.onRowEditField(index, "person.surname")} />
                      </>
                    ) : (
                      item.person?.surname || ""
                    )
                  }
                </DataTable.Column>
                <DataTable.Column header="Age" id="age">
                  {(item: Item, index: number, row, { isEditMode }) =>
                    isEditMode ? (
                      <>
                        <NumberInputField name={dataTableFieldHook.onRowEditField(index, "age")} />
                      </>
                    ) : (
                      item.age || ""
                    )
                  }
                </DataTable.Column>
              </DataTable>
            </Card.Body>
          </Card>
        </FormLayout.Section.Content>
        <FormLayout.Section.Actions>
          <Button variant="outlined" type="reset">
            Reset
          </Button>
          <Button variant="filled" className="ml-2">
            Save
          </Button>
        </FormLayout.Section.Actions>
      </FormLayout.Section>
    </FormLayout>
  );
};

export const SeparateLabels = () => (
  <FormLayout>
    <FormLayout.Section title="Profile" subtitle="Profile info">
      <FormLayout.Section.Content>
        <FormLayout.Field name="username" label="Username">
          <InputField name="username" />
        </FormLayout.Field>

        <FormLayout.Field name="about" label="About">
          <TextareaField name="about" help="Write a few sentences about yourself." />
        </FormLayout.Field>
      </FormLayout.Section.Content>
    </FormLayout.Section>

    <FormLayout.Section title="Personal Information">
      <FormLayout.Section.Content>
        <FormLayout.Field name="firstName" label="First Name">
          <InputField name="firstName" />
        </FormLayout.Field>

        <FormLayout.Field name="lastName" label="Last Name">
          <InputField name="lastName" />
        </FormLayout.Field>

        <FormLayout.Field name="email" label="Email address">
          <InputField name="email" />
        </FormLayout.Field>

        <FormLayout.Field name="country" label="Country / Region" required={true}>
          <AutocompleteField
            name="country"
            getOptionValue={(country) => country.value}
            itemToString={(country) => country.label}
            filter={(name: string, option) => option.label.toLowerCase().includes(name.toLowerCase())}
            options={[
              { value: "BIH", label: "Bosnia and Herzegovina" },
              { value: "HRV", label: "Croatia" },
              { value: "SRB", label: "Serbia" },
              { value: "SVN", label: "Slovenia" },
              { value: "USA", label: "United States of America (the)" },
            ]}
          />
        </FormLayout.Field>

        <FormLayout.Field name="streetAddress" label="Street address">
          <InputField name="streetAddress" />
        </FormLayout.Field>

        <FormLayout.Field name="city" label="City">
          <InputField name="city" />
        </FormLayout.Field>

        <FormLayout.Field name="state" label="State / Province">
          <InputField name="state" />
        </FormLayout.Field>

        <FormLayout.Field name="zip" label="ZIP / Postal">
          <InputField name="zip" />
        </FormLayout.Field>
      </FormLayout.Section.Content>

      <FormLayout.Section.Actions>
        <Button variant="outlined" type="reset" className="ml-2">
          Reset
        </Button>
        <Button variant="filled" className="ml-2">
          Save
        </Button>
      </FormLayout.Section.Actions>
    </FormLayout.Section>
  </FormLayout>
);

export const NoTitleAndSubtitle = () => (
  <FormLayout>
    <FormLayout.Section>
      <FormLayout.Section.Content>
        <InputField name="username" label="Username" />
        <TextareaField name="about" label="About" help="Write a few sentences about yourself." />
      </FormLayout.Section.Content>
    </FormLayout.Section>

    <FormLayout.Section>
      <FormLayout.Section.Content>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <InputField name="firstName" label="First Name" className="sm:col-span-3" />
          <InputField name="lastName" label="Last Name" className="sm:col-span-3" />
          <InputField name="email" label="Email address" className="sm:col-span-3" />
          <br />
          <AutocompleteField
            name="country"
            label="Country / Region"
            required={true}
            getOptionValue={(country) => country.value}
            className="sm:col-span-3"
            itemToString={(country) => country.label}
            filter={(name: string, option) => option.label.toLowerCase().includes(name.toLowerCase())}
            options={[
              { value: "BIH", label: "Bosnia and Herzegovina" },
              { value: "HRV", label: "Croatia" },
              { value: "SRB", label: "Serbia" },
              { value: "SVN", label: "Slovenia" },
              { value: "USA", label: "United States of America (the)" },
            ]}
          />
          <InputField name="streetAddress" label="Street address" className="sm:col-span-6" />
          <InputField name="city" label="City" className="sm:col-span-2" />
          <InputField name="state" label="State / Province" className="sm:col-span-2" />
          <InputField name="zip" label="ZIP / Postal" className="sm:col-span-2" />
        </div>
      </FormLayout.Section.Content>

      <FormLayout.Section.Actions>
        <Button variant="outlined" type="reset" className="ml-2">
          Reset
        </Button>
        <Button variant="filled" className="ml-2">
          Save
        </Button>
      </FormLayout.Section.Actions>
    </FormLayout.Section>
  </FormLayout>
);

export const WithFullValidation = () => (
  <FormLayout type="card">
    <FormLayout.Section title="Profile" subtitle="Profile info">
      <FormLayout.Section.Content>
        <InputField name="name" required={true} label="Name" inlineTrailingAddOn="USD" />
        <InputField name="surname" required={true} label="Surname" />
        <TimeInputField name="time" required={true} label="Time of arrival" allowClear={true} />
        <AutocompleteField
          name="country"
          required={true}
          label="Country / Region"
          className="sm:col-span-3"
          getOptionValue={(country) => country.value}
          itemToString={(country) => country.label}
          filter={(name: string, option) => option.label.toLowerCase().includes(name.toLowerCase())}
          options={[
            { value: "BIH", label: "Bosnia and Herzegovina" },
            { value: "HRV", label: "Croatia" },
            { value: "SRB", label: "Serbia" },
            { value: "SVN", label: "Slovenia" },
            { value: "USA", label: "United States of America (the)" },
          ]}
        />
        <DateInputField name="date" required={true} allowClear={true} label="Birth date" />
        <DateTimeInputField name="datetime" required={true} label="Date time" />
        <RadioGroupField name="type" required={true} label="Employee type">
          <RadioGroupField.Item label="Student" value="student" />
          <RadioGroupField.Item label="Full-time" value="full-time" />
        </RadioGroupField>
      </FormLayout.Section.Content>

      <FormLayout.Section.Actions>
        <Button variant="outlined" type="reset" className="ml-2">
          Reset
        </Button>
        <Button variant="filled" className="ml-2">
          Save
        </Button>
      </FormLayout.Section.Actions>
    </FormLayout.Section>
  </FormLayout>
);

export const WithUploadButtonField = () => {
  // incl-code
  const useFileUploadHook = useFileUpload(defaultFiles);

  return (
    <FormLayout type="card">
      <FormLayout.Section title="Profile" subtitle="Profile info">
        <FormLayout.Section.Content>
          <InputField name="name" required={true} label="Name" inlineTrailingAddOn="USD" />
          <TextareaField name="surname" required={true} label="Surname" />
          <UploadButtonField
            url={useMockSender.destination.url}
            hook={useFileUploadHook}
            name="upload"
            send={useMockSender.send}
            listeners={useMockSender.listeners}
          >
            Upload CV
          </UploadButtonField>
          <FileList hook={useFileUploadHook}>
            {(file, helpers) => (
              <FileList.Header>
                <FileList.Header.Name>{file.name}</FileList.Header.Name>
                <FileList.Header.Action>
                  <span
                    onClick={() => {
                      return helpers.deleteFile(file);
                    }}
                  >
                    Delete
                  </span>
                </FileList.Header.Action>
              </FileList.Header>
            )}
          </FileList>
        </FormLayout.Section.Content>

        <FormLayout.Section.Actions>
          <Button variant="outlined" type="reset" className="ml-2">
            Reset
          </Button>
          <Button variant="filled" className="ml-2">
            Save
          </Button>
        </FormLayout.Section.Actions>
      </FormLayout.Section>
    </FormLayout>
  );
};

export const WithDragZoneField = () => {
  // incl-code
  const useFileUploadHook = useFileUpload(defaultFiles);

  return (
    <FormLayout type="card">
      <FormLayout.Section title="Profile" subtitle="Profile info">
        <FormLayout.Section.Content>
          <InputField name="name" required={true} label="Name" inlineTrailingAddOn="USD" />
          <TextareaField name="surname" required={true} label="Surname" />
          <DragZoneField
            label="Certifications"
            name="dragzone"
            hook={useFileUploadHook}
            title="Drag or drop anywhere to upload files"
            url={useMockSender.destination.url}
            send={useMockSender.send}
          />
          <FileList hook={useFileUploadHook}>
            {(file) => (
              <FileList.Header>
                <FileList.Header.Name>{file.name}</FileList.Header.Name>
              </FileList.Header>
            )}
          </FileList>
        </FormLayout.Section.Content>

        <FormLayout.Section.Actions>
          <Button variant="outlined" type="reset">
            Reset
          </Button>
          <Button variant="filled" className="ml-2">
            Save
          </Button>
        </FormLayout.Section.Actions>
      </FormLayout.Section>
    </FormLayout>
  );
};

export const WithScrollToError = () => {
  // incl-code
  // Hook imported from formik-elements module (also accessible via a boolean prop of FormContainer)
  useScrollToError();

  return (
    <FormLayout>
      <FormLayout.Section title="Profile" subtitle="Profile info">
        <FormLayout.Section.Content>
          <InputField name="name" label="Name" required={true} />
          <InputField name="surname" label="Surname" required={true} />
          <AutocompleteField
            name="country"
            required={true}
            label="Country / Region"
            className="sm:col-span-3"
            getOptionValue={(country) => country.value}
            itemToString={(country) => country.label}
            filter={(name: string, option) => option.label.toLowerCase().includes(name.toLowerCase())}
            options={[
              { value: "BIH", label: "Bosnia and Herzegovina" },
              { value: "HRV", label: "Croatia" },
              { value: "SRB", label: "Serbia" },
              { value: "SVN", label: "Slovenia" },
              { value: "USA", label: "United States of America (the)" },
            ]}
          />
          <TextareaField name="about" label="About" help="Write a few sentences about yourself." />
        </FormLayout.Section.Content>
      </FormLayout.Section>
      <FormLayout.Section title="Personal Information">
        <FormLayout.Section.Content>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <InputField name="firstName" label="First Name" className="sm:col-span-3" />
            <InputField name="lastName" label="Last Name" className="sm:col-span-3" />
            <InputField name="email" label="Email address" className="sm:col-span-3" />
            <InputField name="streetAddress" label="Street address" className="sm:col-span-6" />
            <AutocompleteField
              name="city"
              label="City"
              options={async (query) =>
                Promise.resolve(
                  ["Zagreb", "Rijeka", "Osijek"].filter(
                    (item) => item.toLowerCase().indexOf(query.toLowerCase()) !== -1,
                  ),
                )
              }
              className="sm:col-span-2"
            />
            <InputField name="state" label="State / Province" className="sm:col-span-2" />
            <InputField name="zip" label="ZIP / Postal" className="sm:col-span-2" />
          </div>
        </FormLayout.Section.Content>
      </FormLayout.Section>

      <FormLayout.Section title="Notifications">
        <FormLayout.Section.Content>
          <CheckboxGroupField name="emailNotifications" label="By Email">
            <CheckboxGroupField.Item
              label="Comments"
              value="comments"
              help="Get notified when someones posts a comment on a posting."
            />
            <CheckboxGroupField.Item
              label="Candidates"
              value="candidates"
              help="Get notified when a candidate applies for a job."
            />
            <CheckboxGroupField.Item
              label="Offers"
              value="offers"
              help="Get notified when a candidate accepts or rejects an offer."
            />
          </CheckboxGroupField>

          <RadioGroupField
            name="pushNotifications"
            label="Push Notifications"
            help="These are delivered via SMS to your mobile phone."
          >
            <RadioGroupField.Item label="Everything" value="everything" />
            <RadioGroupField.Item label="Same as email" value="same-as-email" />
            <RadioGroupField.Item label="No push notifications" value="disabled" />
          </RadioGroupField>
        </FormLayout.Section.Content>

        <FormLayout.Section.Actions>
          <Button variant="outlined" type="reset" className="ml-2">
            Reset
          </Button>
          <Button variant="filled" className="ml-2">
            Save
          </Button>
        </FormLayout.Section.Actions>
      </FormLayout.Section>
    </FormLayout>
  );
};

const defaultDecorators = [
  // eslint-disable-next-line react/display-name
  (StoryFn: any) => (
    <FormikDecorator
      validationSchema={ValidationSchema}
      initialValues={{
        upload: defaultFiles.map((file) => file.id),
      }}
    >
      <StoryFn />
    </FormikDecorator>
  ),
];

SimpleType.decorators = defaultDecorators;
CardType.decorators = defaultDecorators;
FullWidthTypeWithDataTableField.decorators = defaultDecorators;
SeparateLabels.decorators = defaultDecorators;
NoTitleAndSubtitle.decorators = defaultDecorators;
WithFullValidation.decorators = defaultDecorators;
WithUploadButtonField.decorators = defaultDecorators;
WithDragZoneField.decorators = defaultDecorators;

WithScrollToError.decorators = [
  // eslint-disable-next-line react/display-name
  (StoryFn: any) => (
    <FormikDecorator validationSchema={ScrollToErrorValidationSchema} initialValues={{}}>
      <StoryFn />
    </FormikDecorator>
  ),
];
