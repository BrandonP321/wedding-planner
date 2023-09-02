import React from "react";
import styles from "./FormikForm.module.scss";
import { FormikHelpers, FormikConfig, Formik } from "formik";
import { MapOfStrings } from "../../../common/utils";

type FormValuesMap<TFields extends MapOfStrings, value> = {
  [key in TFields[keyof TFields]]: value;
};

export type InputValues<TFields extends MapOfStrings> = FormValuesMap<
  TFields,
  string
>;

export type ToggleValues<TFields extends MapOfStrings> = FormValuesMap<
  TFields,
  boolean
>;

export type CheckboxValues<
  TFields extends MapOfStrings,
  Values extends string
> = FormValuesMap<TFields, Values[]>;

export type RadioValues<
  TFields extends MapOfStrings,
  Values extends string
> = FormValuesMap<TFields, Values>;

export type FormikSubmit<Values extends {}> = (
  values: Values,
  formik: FormikHelpers<Values>
) => Promise<void>;

export type FormikFormProps<Values extends {}> = FormikConfig<Values> & {};

export const FormikForm = <Values extends {}>({
  validateOnChange = false,
  validateOnBlur = false,
  ...props
}: FormikFormProps<Values>) => {
  return (
    <Formik
      {...props}
      {...{
        validateOnBlur,
        validateOnChange,
      }}
    />
  );
};
