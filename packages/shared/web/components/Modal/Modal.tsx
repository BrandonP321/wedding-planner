import React from "react";
import styles from "./Modal.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faX } from "@fortawesome/pro-solid-svg-icons";

export type ModalProps = React.PropsWithChildren<{
  show: boolean;
  toggleShow: () => void;
  classes?: ClassesProp<"root" | "overaly" | "content" | "exitIcon">;
  footer?: JSX.Element;
}>;

export const Modal = ({
  show,
  toggleShow,
  classes,
  children,
  footer,
}: ModalProps) => {
  return (
    <div
      className={classNames(
        styles.modal,
        classes?.root,
        !show && styles.hidden
      )}
    >
      <div
        className={classNames(styles.overlay, classes?.overaly)}
        onClick={toggleShow}
      />
      <div className={classNames(styles.modalContent, classes?.content)}>
        <button
          className={classNames(styles.exitBtn, classes?.exitIcon)}
          onClick={toggleShow}
        >
          {/* <FontAwesomeIcon icon={faX} className={classNames(styles.icon)} /> */}
          X
        </button>
        <div className={styles.children}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};
