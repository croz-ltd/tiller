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

import { range } from "lodash";
import * as Yup from "yup";

import { Button, Card, IconButton, useLocalPagination } from "@tiller-ds/core";
import { DataTable, useDataTable } from "@tiller-ds/data-display";
import { DataTableField, useDataTableField, InputField, NumberInputField } from "@tiller-ds/formik-elements";
import { Icon } from "@tiller-ds/icons";

import { beautifySource, FormikDecorator } from "../utils";
import mdx from "./DataTableField.mdx";

type Item = {
  id: number;
  name: string;
  age: number;
  surname: string;
};

const names = ["Pero", "Ivo", "Ana", "Ivica"];
const surname = ["Peric", "Ivic", "Anic", "Ivicici"];
const allData: Item[] = range(0, 3).map((value) => ({
  id: value + 1,
  name: names[value % names.length],
  surname: surname[value % surname.length],
  age: (12 + value * 13) % 50,
}));
const initialValues = {
  items: allData,
};

const InlineEditValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
});

export default {
  title: "Component Library/Formik-elements/DataTableField",
  component: DataTableField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: beautifySource,
    },
  },

  decorators: [
    (StoryFn) => (
      <FormikDecorator initialValues={initialValues}>
        <StoryFn />
      </FormikDecorator>
    ),
  ],
};

export const WithNewRow = () => {
  // incl-code
  // data table hook initialization
  const [dataTableState, dataTableHook] = useDataTable();
  // data table field hook initialization
  const [dataTableFieldState, dataTableFieldHook] = useDataTableField<Item[]>("customers");
  // pagination hook initialization
  const [paginationState] = useLocalPagination(dataTableFieldState.data);

  return (
    <Card>
      <Card.Body removeSpacing={true}>
        <DataTable.CardHeader {...dataTableState} {...paginationState}>
          <DataTable.CardHeader.Title>Customers</DataTable.CardHeader.Title>
        </DataTable.CardHeader>
        <DataTableField.NewRow>
          <div className="flex justify-between m-4 items-center">
            <div className="flex flex-row space-x-4">
              <div>
                <InputField name={dataTableFieldHook.setNewRowFieldName("name")} label="Name" />
              </div>
              <div>
                <InputField name={dataTableFieldHook.setNewRowFieldName("surname")} label="Surname" />
              </div>
              <div>
                <NumberInputField name={dataTableFieldHook.setNewRowFieldName("age")} label="Age" />
              </div>
            </div>
            <div className="flex flex-row space-x-4 pt-5">
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
        <DataTable
          data={dataTableFieldState.data}
          hook={dataTableHook}
          rowEditingIndex={dataTableFieldState.rowEditingIndex}
        >
          <DataTable.Column header="Name" accessor="name" title="Name" />
          <DataTable.Column header="Name" accessor="surname" title="Surname" />
          <DataTable.Column header="Age" accessor="age" title="Age" />
        </DataTable>
      </Card.Body>
    </Card>
  );
};

export const WithNewRowAndInitialValues = () => {
  // incl-code
  // data table hook initialization
  const [dataTableState, dataTableHook] = useDataTable();
  // data table field hook initialization
  const [dataTableFieldState, dataTableFieldHook] = useDataTableField<Item[]>("items");
  // pagination hook initialization
  const [paginationState] = useLocalPagination(dataTableFieldState.data);

  return (
    <Card>
      <Card.Body removeSpacing={true}>
        <DataTable.CardHeader {...dataTableState} {...paginationState}>
          <DataTable.CardHeader.Title>Items</DataTable.CardHeader.Title>
        </DataTable.CardHeader>
        <DataTableField.NewRow>
          <div className="flex justify-between m-4 items-center">
            <div className="flex flex-row space-x-4">
              <div>
                <InputField name={dataTableFieldHook.setNewRowFieldName("name")} label="Name" />
              </div>
              <div>
                <InputField name={dataTableFieldHook.setNewRowFieldName("surname")} label="Surname" />
              </div>
              <div>
                <NumberInputField name={dataTableFieldHook.setNewRowFieldName("age")} label="Age" />
              </div>
            </div>
            <div className="flex flex-row space-x-4 pt-5">
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
        <DataTable
          data={dataTableFieldState.data}
          hook={dataTableHook}
          rowEditingIndex={dataTableFieldState.rowEditingIndex}
        >
          <DataTable.Column header="Name" accessor="name" title="Name" />
          <DataTable.Column header="Name" accessor="surname" title="Surname" />
          <DataTable.Column header="Age" accessor="age" title="Age" />
        </DataTable>
      </Card.Body>
    </Card>
  );
};

export const WithInlineEdit = () => {
  // incl-code
  // data table hook initialization
  const [dataTableState, dataTableHook] = useDataTable();
  // data table field hook initialization
  const [dataTableFieldState, dataTableFieldHook] = useDataTableField<Item[]>("items", InlineEditValidationSchema);
  // pagination hook initialization
  const [paginationState] = useLocalPagination(dataTableFieldState.data);

  return (
    <Card>
      <Card.Body removeSpacing={true}>
        <DataTable.CardHeader {...dataTableState} {...paginationState}>
          <DataTable.CardHeader.Title>Items</DataTable.CardHeader.Title>
        </DataTable.CardHeader>
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
                    onClick={dataTableFieldHook.onRowEditCancel}
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
          <DataTable.Column header="Name" id="name">
            {(item: Item, index: number, row, { isEditMode }) =>
              isEditMode ? (
                <>
                  <InputField name={dataTableFieldHook.onRowEditField(index, "name")} />
                </>
              ) : (
                item.name || ""
              )
            }
          </DataTable.Column>
          <DataTable.Column header="Surname" id="surname">
            {(item: Item, index: number, row, { isEditMode }) =>
              isEditMode ? (
                <>
                  <InputField name={dataTableFieldHook.onRowEditField(index, "surname")} />
                </>
              ) : (
                item.surname || ""
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
  );
};

export const WithInlineEditAndInstantValidation = () => {
  // incl-code
  // data table hook initialization
  const [dataTableState, dataTableHook] = useDataTable();
  // data table field hook initialization
  const [dataTableFieldState, dataTableFieldHook] = useDataTableField<Item[]>("items", InlineEditValidationSchema);
  // pagination hook initializations
  const [paginationState] = useLocalPagination(dataTableFieldState.data);

  return (
    <Card>
      <Card.Body removeSpacing={true}>
        <DataTable.CardHeader {...dataTableState} {...paginationState}>
          <DataTable.CardHeader.Title>Items</DataTable.CardHeader.Title>
        </DataTable.CardHeader>
        <DataTable
          data={dataTableFieldState.data}
          hook={dataTableHook}
          rowEditingIndex={dataTableFieldState.rowEditingIndex}
          saveEnabled={dataTableFieldState.saveEnabled}
        >
          <DataTable.Column header="Actions" id="actions" canSort={false}>
            {(item: Item, index, row, { isEditMode }, saveEnabled) =>
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
                    disabled={!saveEnabled}
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
          <DataTable.Column header="Name" id="name">
            {(item: Item, index: number, row, { isEditMode }) =>
              isEditMode ? (
                <>
                  <InputField
                    name={dataTableFieldHook.onRowEditField(index, "name")}
                    onFocus={() => dataTableFieldHook.onEditingRow("name")}
                  />
                </>
              ) : (
                item.name || ""
              )
            }
          </DataTable.Column>
          <DataTable.Column header="Surname" id="surname">
            {(item: Item, index: number, row, { isEditMode }) =>
              isEditMode ? (
                <>
                  <InputField
                    name={dataTableFieldHook.onRowEditField(index, "surname")}
                    onFocus={() => dataTableFieldHook.onEditingRow("surname")}
                  />
                </>
              ) : (
                item.surname || ""
              )
            }
          </DataTable.Column>
          <DataTable.Column header="Age" id="age">
            {(item: Item, index: number, row, { isEditMode }) =>
              isEditMode ? (
                <>
                  <NumberInputField
                    name={dataTableFieldHook.onRowEditField(index, "age")}
                    onFocus={() => dataTableFieldHook.onEditingRow("age")}
                  />
                </>
              ) : (
                item.age || ""
              )
            }
          </DataTable.Column>
        </DataTable>
      </Card.Body>
    </Card>
  );
};

export const WithNewRowAndInlineEdit = () => {
  // incl-code
  // data table hook initialization
  const [dataTableState, dataTableHook] = useDataTable();
  // data table field hook initialization
  const [dataTableFieldState, dataTableFieldHook] = useDataTableField<Item[]>("items");
  // pagination hook initialization
  const [paginationState] = useLocalPagination(dataTableFieldState.data);

  return (
    <Card>
      <Card.Body removeSpacing={true}>
        <DataTable.CardHeader {...dataTableState} {...paginationState}>
          <DataTable.CardHeader.Title>Items</DataTable.CardHeader.Title>
        </DataTable.CardHeader>
        <DataTableField.NewRow>
          <div className="flex justify-between m-4 items-center">
            <div className="flex flex-row space-x-4">
              <div>
                <InputField name={dataTableFieldHook.setNewRowFieldName("name")} label="Name" />
              </div>
              <div>
                <InputField name={dataTableFieldHook.setNewRowFieldName("surname")} label="Surname" />
              </div>
              <div>
                <NumberInputField name={dataTableFieldHook.setNewRowFieldName("age")} label="Age" />
              </div>
            </div>
            <div className="flex flex-row space-x-4 pt-5">
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
          <DataTable.Column header="Name" id="name">
            {(item: Item, index: number, row, { isEditMode }) =>
              isEditMode ? (
                <>
                  <InputField name={dataTableFieldHook.onRowEditField(index, "name")} />
                </>
              ) : (
                item.name || ""
              )
            }
          </DataTable.Column>
          <DataTable.Column header="Surname" id="surname">
            {(item: Item, index: number, row, { isEditMode }) =>
              isEditMode ? (
                <>
                  <InputField name={dataTableFieldHook.onRowEditField(index, "surname")} />
                </>
              ) : (
                item.surname || ""
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
  );
};
