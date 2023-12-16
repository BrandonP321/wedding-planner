import React, { createContext, useContext, useState } from "react";
import styles from "./Form.module.scss";
import classNames from "classnames";
import { Field, useFormikContext } from "formik";
import { ClassesProp } from "../../utils";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";

type TFormFieldContext = {
  name?: string;
  id?: string;
};

const FormFieldContext = createContext({} as TFormFieldContext);

export const useFormFieldContext = () => useContext(FormFieldContext);

type FormFieldProps = React.PropsWithChildren<{
  label?: React.ReactNode;
  name?: string;
  classes?: ClassesProp<"root" | "label" | "error">;
  hintText?: string;
  errorText?: string;
  id?: string;
  disableLabel?: boolean;
}>;

export const FormField = (props: FormFieldProps) => {
  const {
    classes,
    label,
    children,
    hintText,
    name,
    id,
    errorText,
    disableLabel,
  } = props;

  const { errors } = useFormikContext<{ [key: string]: string }>();

  const error = name && errors[name];
  const inputId = id ?? name;

  return (
    <div
      className={classNames(
        styles.formFieldWrapper,
        classes?.root,
        error && styles.error
      )}
    >
      <SpaceBetween size="xxs" stretchChildren vertical>
        <SpaceBetween size="xxs" vertical>
          {label && (
            <label
              className={classNames(styles.fieldLabel, classes?.label)}
              htmlFor={disableLabel ? undefined : inputId}
            >
              {label}
            </label>
          )}

          <FormFieldContext.Provider value={{ name, id: inputId }}>
            {children}
          </FormFieldContext.Provider>
        </SpaceBetween>

        {(error ?? errorText) && (
          <p className={styles.errorMsg}>{errorText ?? error}</p>
        )}
        {hintText && <small className={styles.hintText}>{hintText}</small>}
      </SpaceBetween>
    </div>
  );
};

export const RadioFormField = ({
  children,
  ...props
}: Omit<FormFieldProps, "disableLabel">) => (
  <FormField {...props} disableLabel>
    <SpaceBetween size="xs" vertical>
      {children}
    </SpaceBetween>
  </FormField>
);

export const CheckboxFormField = RadioFormField;
