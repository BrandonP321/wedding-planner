import React from "react";
import styles from "./SpinnerWrapper.module.scss";
import { ClassesProp, Size } from "../../utils";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import { Spinner } from "../Spinner/Spinner";
import classNames from "classnames";

export type SpinnerWrapperProps = React.PropsWithChildren<{
  spinnerSize?: Size;
  isLoading?: boolean;
  align?: "center" | "start";
  classes?: ClassesProp<"root" | "spinner">;
}>;

export const SpinnerWrapper = (props: SpinnerWrapperProps) => {
  const {
    classes,
    spinnerSize = "xxl",
    children,
    isLoading = true,
    align = "center",
  } = props;

  return (
    <>
      <SpaceBetween
        classes={{
          root: classNames(
            styles.spinnerOverlay,
            classes?.root,
            !isLoading && styles.hide
          ),
        }}
        justify="center"
        align={align}
        stretch
      >
        <Spinner size={spinnerSize} classes={{ root: classes?.spinner }} />
      </SpaceBetween>
      {!isLoading && children}
    </>
  );
};
