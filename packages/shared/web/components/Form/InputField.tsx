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

export type RadioFieldProps<T> = {
  value: T;
  label: string;
  /** If true, will JSON.parse the value before setting it */
  parse?: boolean;
};

export const RadioField = <T extends any = string>(
  props: RadioFieldProps<T>
) => {
  const { value, label, parse } = props;

  const { name, id } = useFormFieldContext();
  const { values, setFieldValue } = useFormikContext<MapOfStrings>();

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
        {...(parse && {
          onChange: () => setFieldValue(name, JSON.parse(value as string)),
        })}
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
  onChange?: <T = string>(value: T) => void;
  checked?: boolean;
};

export const CheckboxField = (props: CheckboxFieldProps) => {
  const { value, label, classes, inputProps, onChange, checked } = props;

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
        {...(onChange && { onChange: () => onChange(value) })}
        {...(checked && { checked })}
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
