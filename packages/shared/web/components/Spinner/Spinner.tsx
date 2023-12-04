import React from "react";
import styles from "./Spinner.module.scss";
import { ClassesProp, Size } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRingsWedding } from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";

export type SpinnerProps = {
  size?: Size;
  classes?: ClassesProp<"root">;
};

export const Spinner = (props: SpinnerProps) => {
  const { classes, size = "m" } = props;
  return (
    <FontAwesomeIcon
      icon={faRingsWedding}
      className={classNames(styles.spinner, styles[size], classes?.root)}
    />
  );
};
