import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
import { ClassesProp, HTMLButtonProps } from "../../utils";
import { Link, LinkProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type ButtonVariant = "primary" | "secondary";

export type SharedButtonProps = ButtonContentProps & {
  variant?: ButtonVariant;
  classes?: ClassesProp<"root">;
};

export type ButtonProps = Omit<HTMLButtonProps, "className"> &
  SharedButtonProps;

export const Button = ({
  variant = "secondary",
  classes,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(styles.button, classes?.root, styles[variant])}
    >
      <ButtonContent {...props} />
    </button>
  );
};

export type ButtonContentProps = React.PropsWithChildren<{
  rightIcon?: IconProp;
  leftIcon?: IconProp;
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
          <FontAwesomeIcon icon={leftIcon} className={styles.leftIcon} />
          &nbsp;
        </>
      )}
      {children}
      {rightIcon && (
        <>
          &nbsp;
          <FontAwesomeIcon icon={rightIcon} className={styles.rightIcon} />
        </>
      )}
    </>
  );
};
