import React from "react";
import styles from "./SpaceBetween.module.scss";
import { ClassesProp, Size } from "../../utils";
import classnames from "classnames";

export type SpaceBetweenProps = React.PropsWithChildren<{
  size?: Size;
  vertical?: boolean;
  classes?: ClassesProp<"root">;
}>;

export const SpaceBetween = ({
  children,
  size = "s",
  vertical,
  classes,
}: SpaceBetweenProps) => {
  return (
    <div
      className={classnames(
        styles.spaceBetween,
        classes?.root,
        vertical && styles.vertical,
        styles[size]
      )}
    >
      {children}
    </div>
  );
};
