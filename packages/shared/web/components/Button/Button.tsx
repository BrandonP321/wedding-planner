import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
import { ClassesProp, HTMLButtonProps } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { SpinnerIcon } from "../Spinner/Spinner";

type ButtonVariant = "primary" | "secondary";

export type SharedButtonProps = ButtonContentProps & {
  variant?: ButtonVariant;
};

export type ButtonProps = Omit<HTMLButtonProps, "className"> &
  SharedButtonProps;

export const Button = (props: ButtonProps) => {
  const {
    variant = "secondary",
    type = "button",
    classes,
    disabled,
    loading,
  } = props;

  return (
    <button
      {...props}
      disabled={disabled || loading}
      type={type}
      className={classNames(styles.button, classes?.root, styles[variant])}
    >
      <ButtonContent {...props} loading={loading} />
    </button>
  );
};

export type ButtonContentProps = React.PropsWithChildren<{
  rightIcon?: IconProp;
  leftIcon?: IconProp;
  loading?: boolean;
  loadingText?: string;
  classes?: ClassesProp<"root" | "leftIcon" | "rightIcon" | "rightIconWrapper">;
}>;

export const ButtonContent = ({
  children,
  rightIcon,
  leftIcon,
  loading,
  loadingText,
  classes,
}: ButtonContentProps) => {
  const text = loading ? loadingText : children;

  return (
    <>
      {leftIcon && (
        <>
          <FontAwesomeIcon icon={leftIcon} className={styles.leftIcon} />
          &nbsp;
        </>
      )}
      <span className={styles.text}>
        {loading && <SpinnerIcon classes={{ spinner: styles.spinner }} />}
        {text}
      </span>
      {rightIcon && (
        <>
          &nbsp;
          <span className={classes?.rightIconWrapper}>
            <FontAwesomeIcon
              icon={rightIcon}
              className={classNames(styles.rightIcon, classes?.rightIcon)}
            />
          </span>
        </>
      )}
    </>
  );
};
