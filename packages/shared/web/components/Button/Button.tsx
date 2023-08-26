import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
import { ClassesProp, HTMLButtonProps } from "../../utils";
import { Link, LinkProps } from "react-router-dom";

type ButtonVariant = "primary" | "secondary";

type SharedButtonProps = ButtonContentProps & {
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

export type ButtonLinkProps = Omit<
  LinkProps & React.RefAttributes<HTMLAnchorElement>,
  "className"
> &
  SharedButtonProps;

export const ButtonLink = ({
  variant = "secondary",
  classes,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      {...props}
      className={classNames(styles.button, classes?.root, styles[variant])}
    >
      <ButtonContent {...props} />
    </Link>
  );
};

type ButtonContentProps = React.PropsWithChildren<{}>;

const ButtonContent = ({ children }: ButtonContentProps) => {
  return <>{children}</>;
};
