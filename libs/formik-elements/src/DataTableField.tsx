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

import { useField, useFormikContext } from "formik";
import { omit } from "lodash";
import { Schema, ValidationError } from "yup";

export type DataTableFieldProps = {
  children: React.ReactNode;
};

type DataTableFieldHook = {
  /**
   * Used for assigning a name to inputs for adding a new item when inline editing is enabled.
   * Receives a desired field name.
   * Example: name={dataTableFieldHook.setNewRowFieldName("surname")}
   */
  setNewRowFieldName: (newRowFieldName: string) => string;

  /**
   * Used for applying the function on a button you wish to use as an add button for adding
   * items to your data table (handed as an onClick function).
   * Example: onClick={dataTableFieldHook.onNewRowSubmit}
   */
  onNewRowSubmit: () => void;

  /**
   * Used for applying the function on a button you wish to use as a reset button for
   * resetting the form which adds a new item to your data table.
   * Example: onClick={dataTableFieldHook.onNewRowReset}
   */
  onNewRowReset: () => void;

  /**
   * Used for applying the function on a button you wish to use as an edit button for
   * editing the desired row. Receives index of a row.
   * Example: onClick={() => dataTableFieldHook.onRowEdit(index)}
   */
  onRowEdit: (index: number) => void;

  /**
   * Used for applying the function on a field when you wish to disable the save button according
   * to the validation. Handed over as an onFocus event in order to focus on a field when the state
   * of a save button has changed.
   * Example: onFocus={() => dataTableFieldHook.onEditingRow("surname")}
   */
  onEditingRow: (fieldName: string) => void;

  /**
   * Used for assigning a name to fields for editing an item when inline editing is enabled.
   * Receives index of a row and a desired field name.
   * Example: name={dataTableFieldHook.onRowEditField(index, "surname")}
   */
  onRowEditField: (index: number, fieldName: string) => string;

  /**
   * Used for applying the function on a button you wish to use as a cancel button for
   * cancelling the editing of a desired row.
   * Example: onClick={dataTableFieldHook.onRowEditCancel}
   */
  onRowEditCancel: () => void;

  /**
   * Used for applying the function on a button you wish to use as a save button for
   * saving the editing of a desired row. Receives index of a row.
   * Example: onClick={() => dataTableFieldHook.onRowEditSave(index)}
   */
  onRowEditSave: (index: number) => Record<string, unknown>;

  /**
   * Used for applying the function on a button you wish to use as a delete button for
   * deleting a desired row. Receives index of a row.
   * Example: onClick={() => dataTableFieldHook.onRowDelete(index)}
   */
  onRowDelete: (index: number) => void;
};

type UseDataTableField<T extends object> = [
  {
    /**
     * Data wished to be rendered inside the data table.
     * Usually hooks to DataTable's data prop for communication with the useDataTableField hook.
     */
    data: T[];

    /**
     * Defines the index of a row currently being edited.
     * Usually hooks to DataTable's rowEditingIndex prop for communication with the useDataTableField hook.
     */
    rowEditingIndex?: number;

    /**
     * Defines whether the row currently being edited is savable.
     * Usually hooks to DataTable's saveEnabled prop for communication with the useDataTableField hook.
     * If not used, the DataTable disregards this and triggers validation when the save button is clicked
     * if onFocus function on fields is also not defined (see stories and docs for more info on usage).
     */
    saveEnabled?: boolean;
  },

  DataTableFieldHook,
];

type DataTableFieldNewRowProps = {
  children: React.ReactNode;
};

function onValidationForm<T extends object>(validationSchema?: Schema<any>) {
  const formik = useFormikContext();

  return React.useCallback(
    (formFieldName: string, formValue: any) => {
      try {
        if (validationSchema) {
          validationSchema.validateSync(formValue, { abortEarly: false });
        }

        return true;
      } catch (e) {
        const errors = e as ValidationError;

        errors.inner.forEach((inner) => {
          formik.setFieldTouched(`${formFieldName}.${inner.path}`, true, false);
          formik.setFieldError(`${formFieldName}.${inner.path}`, inner.message);
        });

        return false;
      }
    },
    [formik],
  );
}

export function useDataTableField<T extends object>(
  dataTableFieldName: string,
  validationSchema: Schema<any> | undefined = undefined,
): UseDataTableField<T> {
  const formik = useFormikContext();
  const [field, , helpers] = useField<T[]>(dataTableFieldName);
  const [newRowField, , newRowFieldHelpers] = useField("newRow");
  const [editRowField] = useField("editRow");

  const [rowEditingIndex, setRowEditingIndex] = React.useState<number | undefined>();
  const [saveEnabled, setSaveEnabled] = React.useState<boolean | undefined>(true);
  const [editingRow, setEditingRow] = React.useState<string | undefined>(undefined);

  const editRowValue = React.useRef(null);

  const data = field.value || [];

  const validateForm = onValidationForm(validationSchema);

  React.useEffect(() => {
    if (typeof editingRow === "string") {
      document.getElementsByName(editingRow)[0]?.focus();
    }
  }, [saveEnabled]);

  const onEditingRow = React.useCallback((fieldName: string) => {
    setEditingRow(`editRow.${dataTableFieldName}.${fieldName}`);
  }, []);

  React.useEffect(() => {
    editRowValue.current = (editRowField.value || {})[dataTableFieldName] || {};
    if (editingRow && validateForm(`editRow.${dataTableFieldName}`, editRowValue.current)) {
      setSaveEnabled(true);
    } else {
      setSaveEnabled(false);
    }
  }, [editRowField.value, editingRow]);

  const setNewRowFieldName = React.useCallback((newRowFieldName: string) => {
    return `newRow.${dataTableFieldName}.${newRowFieldName}`;
  }, []);

  const onNewRowSubmit = React.useCallback(() => {
    const value = newRowField.value || {};
    const newRowValues = value[dataTableFieldName] || {};

    if (validateForm(`newRow.${dataTableFieldName}`, newRowValues)) {
      const newValues = [...data, newRowValues];

      helpers.setValue(newValues);
      newRowFieldHelpers.setValue({});
      formik.setTouched(omit(formik.touched, `newRow.${dataTableFieldName}`));
    }
  }, [data, dataTableFieldName, newRowField, validateForm]);

  const onNewRowReset = React.useCallback(() => {
    newRowFieldHelpers.setValue({});
    formik.setTouched(omit(formik.touched, `newRow.${dataTableFieldName}`));
  }, [formik, dataTableFieldName]);

  const onRowEdit = React.useCallback(
    (index: number) => {
      setRowEditingIndex(index);
      setEditingRow(undefined);
      const value = data[index];
      formik.setFieldValue(`editRow.${dataTableFieldName}`, value);
    },
    [data],
  );

  const onRowEditCancel = React.useCallback(() => {
    setRowEditingIndex(undefined);
    setEditingRow(undefined);
    formik.setFieldValue(`editRow.${dataTableFieldName}`, null);
    formik.setTouched(omit(formik.touched, `editRow.${dataTableFieldName}`));
  }, []);

  const onRowEditField = React.useCallback((index: number, fieldName: string) => {
    return `editRow.${dataTableFieldName}.${fieldName}`;
  }, []);

  const onRowEditSave = React.useCallback(
    (index: number) => {
      if (validateForm(`editRow.${dataTableFieldName}`, editRowValue.current)) {
        formik.setFieldValue(`${dataTableFieldName}[${index}]`, editRowValue.current);
        formik.setFieldValue(`editRow.${dataTableFieldName}`, null);
        formik.setTouched(omit(formik.touched, `editRow.${dataTableFieldName}`));
        setRowEditingIndex(undefined);
        setEditingRow(undefined);
      }
      return editRowValue.current || {};
    },
    [formik, validateForm],
  );

  const onRowDelete = React.useCallback(
    (index: number) => {
      const value = [...field.value];
      value.splice(index, 1);

      helpers.setValue(value);
      if (value.length === 0) {
        helpers.setTouched(true);
      }
      setRowEditingIndex(undefined);
      setEditingRow(undefined);
    },
    [field.value],
  );

  const state = React.useMemo(() => ({ data, rowEditingIndex, saveEnabled }), [data, rowEditingIndex, saveEnabled]);

  const hook = React.useMemo(
    () => ({
      setNewRowFieldName,
      onNewRowSubmit,
      onNewRowReset,
      onRowEdit,
      onEditingRow,
      onRowEditCancel,
      onRowEditField,
      onRowEditSave,
      onRowDelete,
    }),
    [
      setNewRowFieldName,
      onNewRowSubmit,
      onNewRowReset,
      onRowEdit,
      onEditingRow,
      onRowEditCancel,
      onRowEditField,
      onRowEditSave,
      onRowDelete,
    ],
  );

  return [state, hook];
}

function DataTableField({ children }: DataTableFieldProps) {
  return <>{children}</>;
}

function DataTableFieldNewRow({ children }: DataTableFieldNewRowProps) {
  return <>{children}</>;
}

DataTableField.NewRow = DataTableFieldNewRow;
export default DataTableField;
