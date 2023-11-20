import React from "react";
import styles from "./UnstyledForm.module.scss";
import { Form } from "formik";
import { ClassesProp } from "../../utils";
import classNames from "classnames";

export type UnstyledFormProps = React.PropsWithChildren<{
  classes?: ClassesProp<"root">;
}>;

export const UnstyledForm = ({ children, classes }: UnstyledFormProps) => {
  return (
    <Form className={classNames(styles.form, classes?.root)}>{children}</Form>
  );
};
