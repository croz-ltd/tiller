import { DateInputField, TextareaField } from "@tiller-ds/formik-elements";
import * as React from "react";
import { useField } from "formik";

export default function UnmodifiableDateInputField() {
  const [{ value: dateValue }, , endDateHelpers] = useField<Date | null>("date");
  const dateRef = React.useRef<Date | null>(dateValue);

  console.log(dateRef.current);
  React.useEffect(() => {
    if (dateValue) {
      dateRef.current = dateValue;
    }
  }, [dateValue]);
  return (
    <>
      <DateInputField
        name="date"
        label="DateInputField Test"
        required={true}
        highlightToday={true}
        dynamicMask={true}
        /*
        onBlurCapture={() => {
          if (!dateValue && dateRef.current) {
            endDateHelpers.setValue(new Date(dateRef.current));
          }
        }}
*/
      />
      <TextareaField name="test" />
    </>
  );
}
