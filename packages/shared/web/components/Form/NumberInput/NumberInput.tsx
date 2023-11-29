import React from "react";
import styles from "./NumberInput.module.scss";
import { TypedOmit } from "../../../../common";
import { InputField, InputFieldProps } from "../InputField";

export type NumberInputProps = TypedOmit<
  InputFieldProps,
  "onChange" | "type" | "value"
> & {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
};

export const NumberInput = (props: NumberInputProps) => {
  const { value, onChange, ...rest } = props;

  return (
    <InputField
      {...rest}
      type="number"
      value={value as any}
      onChange={onChange as any}
    />
  );
};
