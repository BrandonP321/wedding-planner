import React from "react";
import styles from "./AttributeEditorSelect.module.scss";
import { useFormikContext } from "formik";
import { FormField, Select } from "../Form";
import { Dropdown, DropdownOption } from "../Dropdown/Dropdown";

export type AttributeEditorSelectProps<T, V, O> = {
  index: number;
  fieldName: T;
  options: O[];
  updateValue: (option: O, prev: O) => O;
  selectedOption: O | undefined;
  placeholder?: string;
};

export const AttributeEditorSelect = <
  T extends string,
  V extends string,
  O extends DropdownOption<V> = DropdownOption<V>
>({
  index,
  fieldName,
  options,
  placeholder,
  selectedOption,
  updateValue,
}: AttributeEditorSelectProps<T, V, O>) => {
  const { values, setFieldValue } = useFormikContext<Record<T, O[]>>();

  const handleOptionClick = (option: O) => {
    const newSocials = [...values[fieldName]];
    newSocials[index] = updateValue(option, newSocials[index]);

    setFieldValue(fieldName, newSocials);
  };

  return (
    <FormField>
      <Dropdown
        options={options}
        placeholder={placeholder}
        selected={selectedOption}
        onOptionClick={(o) => handleOptionClick(o as O)}
        optionsStaticPosition={false}
      />
    </FormField>
  );
};
