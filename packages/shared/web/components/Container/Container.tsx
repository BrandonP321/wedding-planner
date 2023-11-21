import React from "react";
import styles from "./Container.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";

export type ContainerProps = React.PropsWithChildren<{
  classes?: ClassesProp<"root" | "header" | "content">;
  header: JSX.Element;
}>;

export const Container = (props: ContainerProps) => {
  const { children, classes, header } = props;

  return (
    <div className={classNames(styles.container, classes?.root)}>
      <div className={classNames(styles.header, classes?.header)}>{header}</div>
      <div className={classNames(styles.content, classes?.content)}>
        {children}
      </div>
    </div>
  );
};
