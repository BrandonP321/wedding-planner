import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
import { ClassesProp, HTMLButtonProps } from "../../utils";
import { Link, LinkProps } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useFormikContext } from "formik";

type ButtonVariant = "primary" | "secondary";

export type SharedButtonProps = ButtonContentProps & {
  variant?: ButtonVariant;
  classes?: ClassesProp<"root">;
};

export type ButtonProps = Omit<HTMLButtonProps, "className"> &
  SharedButtonProps;

export const Button = ({
  variant = "secondary",
  type = "button",
  classes,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={classNames(styles.button, classes?.root, styles[variant])}
    >
      <ButtonContent {...props} />
    </button>
  );
};

export const SubmitButton = ({
  type,
  variant = "primary",
  children = "Submit",
  disabled,
  ...props
}: ButtonProps) => {
  const { dirty } = useFormikContext();

  return (
    <Button
      {...props}
      type="submit"
      variant={variant}
      disabled={disabled ?? !dirty}
    >
      {children}
    </Button>
  );
};

export type ButtonContentProps = React.PropsWithChildren<{
  rightIcon?: any;
  leftIcon?: any;
  // rightIcon?: IconProp;
  // leftIcon?: IconProp;
}>;

export const ButtonContent = ({
  children,
  rightIcon,
  leftIcon,
}: ButtonContentProps) => {
  return (
    <>
      {leftIcon && (
        <>
          {/* <FontAwesomeIcon icon={leftIcon} className={styles.leftIcon} /> */}
          &nbsp;
        </>
      )}
      {children}
      {rightIcon && (
        <>
          &nbsp;
          {/* <FontAwesomeIcon icon={rightIcon} className={styles.rightIcon} /> */}
        </>
      )}
    </>
  );
};
