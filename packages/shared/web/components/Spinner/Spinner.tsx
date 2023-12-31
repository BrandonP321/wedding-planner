import React from "react";
import styles from "./Spinner.module.scss";
import { ClassesProp, Size } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRingsWedding } from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";

export type SpinnerProps = {
  size?: Size;
  classes?: ClassesProp<"root" | "spinner">;
  text?: string;
};

export type SpinnerIconProps = Partial<Pick<SpinnerProps, "size">> & {
  classes?: ClassesProp<"spinner">;
};

export const SpinnerIcon = ({ classes, size }: SpinnerIconProps) => (
  <FontAwesomeIcon
    icon={faRingsWedding}
    className={classNames(
      styles.spinner,
      size && styles[size],
      classes?.spinner
    )}
  />
);

export const Spinner = (props: SpinnerProps) => {
  const { classes, size = "m", text } = props;
  return (
    <SpaceBetween
      classes={{ root: classNames(styles.wrapper, styles[size]) }}
      size="s"
      align="center"
    >
      <SpinnerIcon classes={{ spinner: styles.spinner }} size={size} />
      {text && <p className={classNames(styles.text, styles[size])}>{text}</p>}
    </SpaceBetween>
  );
};
