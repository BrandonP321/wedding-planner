import React, { useEffect, useId, useState } from "react";
import styles from "./Form.module.scss";
import { useFormFieldContext } from "./FormField";
import { Field, useFormikContext } from "formik";
import { ClassesProp, HTMLInputProps } from "../../utils";
import classNames from "classnames";

type MapOfStrings = { [key: string]: string };

export type InputFieldProps = {
  autoComplete?: boolean;
  suggestions?: JSX.Element;
  isSuggestionFocused?: boolean;
};

export const InputField = ({
  autoComplete = true,
  suggestions,
  isSuggestionFocused,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const context = useFormFieldContext();
  const {} = useFormikContext<{ [key: string]: string }>();

  return (
    <div className={styles.inputWrapper}>
      <Field
        {...context}
        className={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => requestAnimationFrame(() => setIsFocused(false))}
        autoComplete={autoComplete ? "on" : "off"}
      />
      {(isFocused || isSuggestionFocused) && suggestions}
    </div>
  );
};

export type RadioFieldProps = {
  value: string;
  label: string;
};

export const RadioField = (props: RadioFieldProps) => {
  const { value, label } = props;

  const { name, id } = useFormFieldContext();
  const { values } = useFormikContext<MapOfStrings>();

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
  classes?: ClassesProp<"root" | "checkbox">;
  inputProps?: HTMLInputProps;
};

export const CheckboxField = (props: CheckboxFieldProps) => {
  const { value, label, classes, inputProps } = props;

  const { name, id } = useFormFieldContext();
  const { values } = useFormikContext<MapOfStrings>();

  const uniqueId = useId();
  const checkboxId = `${id}-${uniqueId}`;

  return (
    <label
      htmlFor={checkboxId}
      className={classNames(styles.checkbox, classes?.root)}
    >
      <Field
        name={name}
        type="checkbox"
        className={classNames(styles.checkboxInput, classes?.checkbox)}
        value={value}
        id={checkboxId}
        {...inputProps}
      />
      {label}
    </label>
  );
};

export const ToggleField = (props: CheckboxFieldProps) => {
  const { values, setFieldValue } = useFormikContext<MapOfStrings>();
  const { name } = useFormFieldContext();

  const value = values[name];

  return (
    <CheckboxField
      {...props}
      classes={{ root: styles.toggle, checkbox: styles.toggleInput }}
      inputProps={{
        onChangeCapture: (e: React.ChangeEvent<HTMLInputElement>) => {
          const isChecked = e.target.checked;
          requestAnimationFrame(() => {
            setFieldValue(name, isChecked);
          });
        },
        checked: !!value,
      }}
    />
  );
};
