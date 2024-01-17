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

import { withDesign } from "storybook-addon-designs";

import { Alert } from "@tiller-ds/alert";
import { Button, Card, Pagination, useLocalPagination } from "@tiller-ds/core";
import { DataTable, useDataTable } from "@tiller-ds/data-display";
import { CheckboxGroupField, FieldError, InputField } from "@tiller-ds/formik-elements";
import { Intl } from "@tiller-ds/intl";
import { DropdownMenu } from "@tiller-ds/menu";
import { beautifySource, FormikDecorator } from "../utils";

import mdx from "./Intl.mdx";

const nameWithValue = "testWithValue";
const nameWithError = "testWithError";
const data = [
  { id: 1, name: "Pero" },
  { id: 2, name: "Ana" },
  { id: 3, name: "Marija" },
];

const initialValues = {
  [nameWithValue]: "test",
};

const initialErrors = {
  [nameWithError]: "intl:required",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Intl/Intl",
  component: Intl,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "Intl"),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nhiVbURxzFkse4bGiDFuya/?node-id=8707%3A11083",
    },
    decorators: [withDesign],
  },
  decorators: [
    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => (
      <FormikDecorator initialValues={initialValues} initialErrors={initialErrors} initialTouched={initialTouched}>
        {storyFn()}
      </FormikDecorator>
    ),

    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => <div className="m-4">{storyFn()}</div>,
  ],
};

export const Basic = () => <Intl name="greeting" params={{ name: "Anna" }} />;

export const WithNumber = (args) => (
  <React.Fragment>
    <div>
      <Intl name="example" params={{ messageCount: 0 }} />
    </div>
    <div>
      <Intl name="example" params={{ messageCount: 1 }} />
    </div>
    <div>
      <Intl name="example" params={{ messageCount: 2 }} />
    </div>
    <div>
      <Intl name="example" params={{ messageCount: 5 }} />
    </div>
  </React.Fragment>
);

export const WithComponent = () => (
  <Intl name="click" params={{ clickable: <Button onClick={() => console.log("click!")}>Click me</Button> }} />
);

/*
export const WithChildren = () => (
  <Intl name="battery_life" params={{ batteryLife: 0.4 }}>
    {{ batteryLife: (value) => <span style={{ color: "orange" }}>{value}</span> }}
  </Intl>
);
*/

export const WithSimpleDataTable = (args) => {
  return (
    <DataTable data={data}>
      <DataTable.Column header="ID" accessor="id" />
      <DataTable.Column header={<Intl name="name" />} accessor="name" />
    </DataTable>
  );
};

export const WithDataTableAndSelector = () => {
  // incl-code
  // data table hook initialization
  const [dataTableState, dataTableHook] = useDataTable();
  const [paginationState, paginationHook] = useLocalPagination(data);

  return (
    <Card>
      <Card.Body removeSpacing={true}>
        <DataTable.CardHeader {...dataTableState} {...paginationState}>
          <DataTable.CardHeader.Title>Items</DataTable.CardHeader.Title>
          <DataTable.CardHeader.Actions>
            <Button>Execute</Button>
          </DataTable.CardHeader.Actions>
          <DataTable.CardHeader.Selector>
            {(selectorInfo) => (
              <span>
                <Intl name="selector" params={selectorInfo}>
                  {{
                    selectedCount: () => selectorInfo.selectedCount,
                    totalCount: () => selectorInfo.totalElements,
                  }}
                </Intl>
              </span>
            )}
          </DataTable.CardHeader.Selector>
        </DataTable.CardHeader>
        <DataTable data={data} hook={dataTableHook}>
          <DataTable.Column header="ID" accessor="id" />
          <DataTable.Column header="Name" accessor="name" />
          <DataTable.Selector />
        </DataTable>
      </Card.Body>
      <Card.Footer>
        <Pagination {...paginationState} {...paginationHook} />
      </Card.Footer>
    </Card>
  );
};

export const WithSimpleCheckbox = (args) => (
  <CheckboxGroupField
    name="emailNotifications"
    label={<Intl name="emailNotifications" />}
    help={<Intl name="notificationsHelp" />}
  >
    <CheckboxGroupField.Item label={<Intl name="comment" />} value="comments" help={<Intl name="commentHelp" />} />
    <CheckboxGroupField.Item label={<Intl name="offer" />} value="offers" help={<Intl name="offerHelp" />} />
  </CheckboxGroupField>
);

export const WithFieldError = (args) => <FieldError name={nameWithError} />;

export const InputFieldWithIntlError = (args) => <InputField name={nameWithError} label={<Intl name="label" />} />;

export const WithDropdownMenu = (args) => {
  return (
    <DropdownMenu title={<Intl name="user" />}>
      <DropdownMenu.Item onSelect={() => {}}>
        <Intl name="account" />
      </DropdownMenu.Item>
      <DropdownMenu.Item onSelect={() => {}}>
        <Intl name="logout" />
      </DropdownMenu.Item>
    </DropdownMenu>
  );
};

export const WithAlert = (args) => (
  <Alert title={<Intl name="attention" />}>A new software update is available. See what’s new in version 2.0.4.</Alert>
);
