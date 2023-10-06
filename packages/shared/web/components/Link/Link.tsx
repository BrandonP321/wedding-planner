import React from "react";
import styles from "./Link.module.scss";
import btnStyles from "../Button/Button.module.scss";
import { Link, LinkProps } from "react-router-dom";
import {
  ButtonContent,
  ButtonContentProps,
  SharedButtonProps,
} from "../Button/Button";
import classNames from "classnames";
import { ClassesProp } from "../../utils";
import { faArrowUpRight } from "@fortawesome/pro-solid-svg-icons";

export type ExternalLinkProps = Omit<
  LinkProps & React.RefAttributes<HTMLAnchorElement>,
  "className"
> &
  ButtonContentProps & {
    classes?: ClassesProp<"root">;
  };

export const ExternalLink = ({
  classes,
  rightIcon = faArrowUpRight,
  ...props
}: ExternalLinkProps) => {
  return (
    <Link {...props}>
      <ButtonContent {...props} rightIcon={rightIcon} />
    </Link>
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
  rightIcon,
  leftIcon,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      {...props}
      className={classNames(
        btnStyles.button,
        classes?.root,
        btnStyles[variant]
      )}
    >
      <ButtonContent rightIcon={rightIcon} leftIcon={leftIcon} {...props} />
    </Link>
  );
};
