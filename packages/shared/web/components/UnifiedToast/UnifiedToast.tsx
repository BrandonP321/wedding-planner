import React from "react";
import styles from "./UnifiedToast.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";

type ToastType = "info" | "danger" | "success";

export type UnifiedToastProps = {
  variant?: ToastType;
  msg: string;
  classes?: ClassesProp<"root" | "hide" | "text">;
  left?: boolean;
  bottom?: boolean;
  hide?: boolean;
};

export const UnifiedToast = ({
  msg,
  variant = "info",
  classes,
  left,
  bottom,
  hide,
}: UnifiedToastProps) => {
  return (
    <div
      className={classNames(
        styles.toast,
        classes?.root,
        styles[variant],
        left && styles.left,
        bottom && styles.bottom,
        hide && classNames(styles.hide, classes?.hide)
      )}
    >
      <p className={classNames(styles.text, classes?.text)}>{msg}</p>
    </div>
  );
};
