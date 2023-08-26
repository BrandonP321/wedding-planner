import React, { useId } from "react";
import styles from "./Form.module.scss";
import { useFormFieldContext } from "./FormField";
import { Field, useFormikContext } from "formik";

export type InputFieldProps = {};

export const InputField = (props: InputFieldProps) => {
  const context = useFormFieldContext();
  const {} = useFormikContext<{ [key: string]: string }>();

  return <Field {...context} className={styles.input} />;
};

export type RadioFieldProps = {
  value: string;
  label: string;
};

export const RadioField = (props: RadioFieldProps) => {
  const { value, label } = props;

  const { name, id } = useFormFieldContext();
  const { values } = useFormikContext<{ [key: string]: string }>();

  const uniqueId = useId();
  const radioId = `${id}-${uniqueId}`;

  return (
    <label htmlFor={radioId} className={styles.radio}>
      <Field
        name={name}
        type="radio"
        className={styles.radioInput}
        value={value}
        id={radioId}
      />
      {label}
    </label>
  );
};

export type CheckboxFieldProps = {
  value: string;
  label: string;
};

export const CheckboxField = (props: CheckboxFieldProps) => {
  const { value, label } = props;

  const { name, id } = useFormFieldContext();
  const { values } = useFormikContext<{ [key: string]: string }>();

  const uniqueId = useId();
  const checkboxId = `${id}-${uniqueId}`;

  return (
    <label htmlFor={checkboxId} className={styles.checkbox}>
      <Field
        name={name}
        type="checkbox"
        className={styles.checkboxInput}
        value={value}
        id={checkboxId}
      />
      {label}
    </label>
  );
};
