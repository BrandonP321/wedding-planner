import React, { useId, useState } from "react";
import styles from "./Form.module.scss";
import { useFormFieldContext } from "./FormField";
import { Field, useFormikContext } from "formik";
import { ClassesProp, HTMLInputProps } from "../../utils";
import classNames from "classnames";
import { useCustomFormContext } from "../FormikForm/CustomFormHooks";

type MapOfStrings = { [key: string]: string };

export type InputFieldProps = {
  autoComplete?: boolean;
  suggestions?: JSX.Element;
  isSuggestionFocused?: boolean;
  type?: "text" | "password" | "number";
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
};

export const InputField = ({
  autoComplete = true,
  suggestions,
  isSuggestionFocused,
  type = "text",
  onChange,
  disabled,
  placeholder,
  value,
  ...rest
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const context = useFormFieldContext();
  const { isEditable = true } = useCustomFormContext();
  const {} = useFormikContext<{ [key: string]: string }>();

  return (
    <div className={styles.inputWrapper}>
      <Field
        {...rest}
        {...context}
        {...(onChange && {
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value),
        })}
        {...(value !== undefined && { value })}
        disabled={disabled || !isEditable}
        className={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => requestAnimationFrame(() => setIsFocused(false))}
        autoComplete={autoComplete ? "on" : "off"}
        type={type}
        placeholder={placeholder}
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
          onChange: () =>
            name && setFieldValue(name, JSON.parse(value as string)),
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
  onChange?: (value: string) => void;
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

  const value = name && values[name];

  return (
    <CheckboxField
      {...props}
      classes={{ root: styles.toggle, checkbox: styles.toggleInput }}
      inputProps={{
        onChangeCapture: (e: React.ChangeEvent<HTMLInputElement>) => {
          const isChecked = e.target.checked;
          requestAnimationFrame(() => {
            name && setFieldValue(name, isChecked);
          });
        },
        checked: !!value,
      }}
    />
  );
};
