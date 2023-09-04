import React from "react";
import styles from "./FormikForm.module.scss";
import { FormikHelpers, FormikConfig, Formik } from "formik";
import {
  AllOrNone,
  EnumUtils,
  EnumValue,
  InvertedEnum,
  MapOfStrings,
} from "../../../common/utils";
import { forEach } from "lodash";

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

export const getEmptyInitialValues = <
  Inputs extends {},
  Toggles extends {},
  Checkboxes extends { [key: string]: {} },
  Radios extends { [key: string]: {} }
>({
  inputFields,
  checkboxFields,
  radioFields,
  toggleFields,
}: {
  inputFields?: Inputs;
  toggleFields?: Toggles;
  checkboxFields?: Checkboxes;
  radioFields?: Radios;
}) => {
  const emptyInputs = inputFields
    ? EnumUtils.invertWithNewValues(inputFields, "")
    : ({} as InvertedEnum<Inputs, string>);

  type EmptyCheckboxes = {
    [key in keyof Checkboxes]: EnumValue<Checkboxes[key]>[];
  };

  const emptyCheckboxes = {} as EmptyCheckboxes;
  forEach(checkboxFields, (value, key: keyof Checkboxes) => {
    emptyCheckboxes[key] = [] as EnumValue<Checkboxes[keyof Checkboxes]>[];
  });

  type EmptyRadios = {
    [key in keyof Radios]: EnumValue<Radios[key]>;
  };

  const emptyRadios = {} as EmptyRadios;
  forEach(radioFields, (value, key: keyof Radios) => {
    emptyRadios[key] = "" as EnumValue<Radios[keyof Radios]>;
  });

  const emptyToggles = toggleFields
    ? EnumUtils.invertWithNewValues(toggleFields, false)
    : ({} as InvertedEnum<Toggles, boolean>);

  return {
    ...emptyInputs,
    ...emptyCheckboxes,
    ...emptyRadios,
    ...emptyToggles,
  };
};
