import React, { useId } from "react";
import styles from "./Dropdown.module.scss";
import { useFormFieldContext } from "./FormField";
import { Field, useFormikContext } from "formik";
import { MapOfStrings } from "../../../common/utils";

export type DropdownOption<Value extends string> = {
  label: string;
  value: Value;
};

export type DropdownProps<Value extends string> = {
  options: DropdownOption<Value>[];
};

export const Dropdown = <V extends string>(props: DropdownProps<V>) => {
  const { options } = props;

  const { name, id } = useFormFieldContext();
  const { values } = useFormikContext<MapOfStrings>();

  const uniqueId = useId();
  const dropdownId = `${id}-${uniqueId}`;

  return (
    <Field name={name} as="select" className={styles.dropdown} id={dropdownId}>
      {/* <div className={styles.options}> */}
      {options?.map((o, i) => (
        <option key={i} value={o.value}>
          {o.label}
        </option>
      ))}
      {/* </div> */}
    </Field>
  );
};
