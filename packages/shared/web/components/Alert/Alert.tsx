import React, { useState } from "react";
import styles from "./Alert.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faInfoCircle,
  faCircleXmark,
  faCheck,
  faX,
} from "@fortawesome/pro-solid-svg-icons";

export type AlertType = "info" | "error" | "success";

export const alertIconMap: { [key in AlertType]: IconProp } = {
  info: faInfoCircle,
  error: faCircleXmark,
  success: faCheck,
};

export type AlertProps = React.PropsWithChildren<{
  classes?: ClassesProp<"root">;
  title: JSX.Element;
  type?: AlertType;
  visible?: boolean;
}>;

export const Alert = ({
  classes,
  title,
  type = "info",
  visible = true,
  children,
}: AlertProps) => {
  const [show, setShow] = useState(visible);

  return !show ? null : (
    <div className={classNames(styles.alert, classes?.root, styles[type])}>
      <FontAwesomeIcon icon={alertIconMap[type]} className={styles.alertIcon} />
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {children}
      </div>

      <button onClick={() => setShow(false)} className={styles.exitBtn}>
        <FontAwesomeIcon icon={faX} className={styles.exitIcon} />
      </button>
    </div>
  );
};
