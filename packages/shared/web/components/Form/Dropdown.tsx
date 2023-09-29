import React, { useId, useState } from "react";
import styles from "./Dropdown.module.scss";
import { useFormFieldContext } from "./FormField";
import { Field, useFormikContext } from "formik";
import { MapOfStrings } from "../../../common/utils";
import { Button } from "../Button";
import { DropdownList } from "../DropdownList/DropdownList";

export type DropdownOption<Value extends string> = {
  label: string;
  value: Value;
};

export type DropdownProps<Value extends string> = {
  options: DropdownOption<Value>[];
};

export const Dropdown = <V extends string>(props: DropdownProps<V>) => {
  const { options } = props;

  const [showOptions, setShowOptions] = useState(false);

  const { name } = useFormFieldContext();
  const { values, setFieldValue } = useFormikContext<MapOfStrings>();

  const toggleDropdown = () => setShowOptions(!showOptions);

  const handleOptionClick = (value: string) => {
    setFieldValue(name, value);
    setShowOptions(false);
  };

  const selectedOption =
    options.find((o) => o.value === values[name]) ?? options[0];

  return (
    <div className={styles.wrapper}>
      <Button classes={{ root: styles.dropdown }} onClick={toggleDropdown}>
        {selectedOption?.label}
      </Button>
      {showOptions && (
        <DropdownList
          options={options}
          onOptionClick={(o) => handleOptionClick(o.value)}
        >
          {(option) => option.label}
        </DropdownList>
      )}
    </div>
  );
};
