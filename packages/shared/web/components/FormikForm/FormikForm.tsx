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
) => Promise<any>;

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
  Inputs extends Record<string, {}>,
  Toggles extends Record<string, {}>,
  Checkboxes extends Record<string, {}>,
  Radios extends Record<string, {}>,
  Selects extends Record<string, {}>
>({
  inputFields,
  checkboxFields,
  radioFields,
  toggleFields,
  selectFields,
}: {
  inputFields: Inputs;
  toggleFields: Toggles;
  checkboxFields: Checkboxes;
  radioFields: Radios;
  selectFields: Selects;
}) => {
  const emptyInputs = EnumUtils.invertWithNewValues(inputFields, "");

  type EmptyCheckboxes = Record<
    keyof Checkboxes,
    EnumValue<Checkboxes[keyof Checkboxes]>[]
  >;

  const emptyCheckboxes = {} as EmptyCheckboxes;
  checkboxFields &&
    forEach(checkboxFields, (value, key: keyof NonNullable<Checkboxes>) => {
      emptyCheckboxes[key] = [] as EnumValue<
        NonNullable<Checkboxes>[keyof NonNullable<Checkboxes>]
      >[];
    });

  type EmptyRadios = Record<keyof Radios, EnumValue<Radios[keyof Radios]>>;

  const emptyRadios = {} as EmptyRadios;
  forEach(radioFields, (value, key: keyof NonNullable<Radios>) => {
    emptyRadios[key] = "" as EnumValue<
      NonNullable<Radios>[keyof NonNullable<Radios>]
    >;
  });

  type EmptySelects = {
    [key in keyof NonNullable<Selects>]: EnumValue<NonNullable<Selects>[key]>;
  };

  const emptySelects = {} as EmptySelects;
  forEach(selectFields, (value, key: keyof NonNullable<Selects>) => {
    emptySelects[key] = "" as EnumValue<
      NonNullable<Selects>[keyof NonNullable<Selects>]
    >;
  });

  const emptyToggles = EnumUtils.invertWithNewValues(toggleFields, false);

  return {
    ...emptyInputs,
    ...emptyCheckboxes,
    ...emptyRadios,
    ...emptyToggles,
    ...emptySelects,
  };
};
