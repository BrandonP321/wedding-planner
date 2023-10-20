import React from "react";
import styles from "./Modal.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import { PageContent } from "../PageContent/PageContent";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faX } from "@fortawesome/pro-solid-svg-icons";

export type ModalProps = React.PropsWithChildren<{
  show: boolean;
  toggleShow: () => void;
  classes?: ClassesProp<"root" | "overaly" | "content" | "exitIcon" | "header">;
  title?: React.ReactNode;
  footer?: JSX.Element;
  fullSize?: boolean;
}>;

export const Modal = ({
  show,
  toggleShow,
  classes,
  children,
  title,
  footer,
  fullSize,
}: ModalProps) => {
  return (
    <div
      className={classNames(
        styles.modal,
        classes?.root,
        fullSize && styles.fullSize,
        !show && styles.hidden
      )}
    >
      <div
        className={classNames(styles.overlay, classes?.overaly)}
        onClick={toggleShow}
      />
      <div className={classNames(styles.modalContent, classes?.content)}>
        <SpaceBetween
          classes={{ root: classNames(styles.header, classes?.header) }}
          wrap={false}
          justify="space-between"
        >
          <h3 className={styles.title}>{title}</h3>

          <button
            className={classNames(styles.exitBtn, classes?.exitIcon)}
            onClick={toggleShow}
          >
            {/* <FontAwesomeIcon icon={faX} className={classNames(styles.icon)} /> */}
            X
          </button>
        </SpaceBetween>
        <div className={styles.children}>
          <PageContent verticalPadding horizontalPadding stretch={fullSize}>
            {children}
          </PageContent>
        </div>

        {footer && (
          <PageContent
            classes={{ root: styles.footer }}
            horizontalPadding
            verticalPadding
            stretch
          >
            {footer}
          </PageContent>
        )}
      </div>
    </div>
  );
};
