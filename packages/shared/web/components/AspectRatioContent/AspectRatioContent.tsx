import React from "react";
import styles from "./AspectRatioContent.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";

export type AspectRatioContentProps = React.PropsWithChildren<{
  classes?: ClassesProp<"root" | "aspectRatioBox" | "children">;
}>;

export const AspectRatioContent = ({
  classes,
  children,
}: AspectRatioContentProps) => {
  return (
    <div className={classNames(styles.wrapper, classes?.root)}>
      <div
        className={classNames(styles.aspectRatioBox, classes?.aspectRatioBox)}
      >
        <div className={classNames(styles.children, classes?.children)}>
          {children}
        </div>
      </div>
    </div>
  );
};
