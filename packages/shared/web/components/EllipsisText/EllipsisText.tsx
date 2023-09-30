import React from "react";
import styles from "./EllipsisText.module.scss";
import classNames from "classnames";

export type EllipsisTextProps = React.PropsWithChildren<{
  className?: string;
  stretch?: boolean;
}>;

export const EllipsisText = ({
  children,
  className,
  stretch,
}: EllipsisTextProps) => {
  return (
    <span
      className={classNames(styles.text, className, stretch && styles.stretch)}
    >
      {children}
    </span>
  );
};
