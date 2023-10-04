import React from "react";
import styles from "./Line.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";

export type LineProps = {
  classes?: ClassesProp<"root">;
  vertical?: boolean;
};

export const Line = ({ classes, vertical }: LineProps) => {
  return (
    <div
      className={classNames(
        styles.line,
        classes?.root,
        vertical ? styles.vertical : styles.horizontal
      )}
    />
  );
};
