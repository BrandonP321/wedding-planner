import React from "react";
import styles from "./Container.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";

export type ContainerProps = React.PropsWithChildren<{
  classes?: ClassesProp<"root" | "header" | "content" | "footer">;
  header: JSX.Element;
  footer?: JSX.Element;
}>;

export const Container = (props: ContainerProps) => {
  const { children, classes, header, footer } = props;

  return (
    <div
      className={classNames(
        styles.container,
        classes?.root,
        !!footer && styles.hasFooter
      )}
    >
      <div className={classNames(styles.header, classes?.header)}>{header}</div>
      <div className={classNames(styles.content, classes?.content)}>
        {children}
      </div>
      {footer && (
        <div className={classNames(styles.footer, classes?.footer)}>
          {footer}
        </div>
      )}
    </div>
  );
};
