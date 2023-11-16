import React from "react";
import styles from "./StyledForm.module.scss";
import { Form } from "formik";
import { ClassesProp } from "../../utils";
import classNames from "classnames";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";

export type StyledFormProps = React.PropsWithChildren<{
  /** Actions at the bottom of the form (i.e. submit, cancel, etc.) */
  formActions: JSX.Element;
  /** Content rendered beneath the form actions */
  footer?: JSX.Element;
  classes?: ClassesProp<"root" | "form" | "errMsg">;
  errorMsg?: string | null;
}>;

export const StyledForm = ({
  children,
  formActions,
  classes,
  errorMsg,
  footer,
}: StyledFormProps) => {
  return (
    <SpaceBetween justify="center" classes={{ root: classes?.root }}>
      <Form className={classNames(styles.form, classes?.form)}>
        <SpaceBetween size="l" vertical stretchChildren>
          {children}
          {errorMsg && (
            <p className={classNames(styles.errorMsg, classes?.errMsg)}>
              {errorMsg}
            </p>
          )}
          <SpaceBetween justify="end" size="m">
            {formActions}
          </SpaceBetween>
          {footer}
        </SpaceBetween>
      </Form>
    </SpaceBetween>
  );
};
