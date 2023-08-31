import React from "react";
import styles from "./BasicPage.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";

export type BasicPageProps = React.PropsWithChildren<{
  classes?: ClassesProp<"root">;
}>;

export const BasicPage = ({ classes, children }: BasicPageProps) => {
  return (
    <div className={classNames(styles.page, classes?.root)}>{children}</div>
  );
};
