import React from "react";
import styles from "./Scrollable.module.scss";
import classNames from "classnames";
import { ClassesProp } from "../../utils";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";

export type ScrollableProps = React.PropsWithChildren<{
  footer: JSX.Element;
  classes?: ClassesProp<"root" | "content" | "footer">;
}>;

export const Scrollable = ({ children, footer, classes }: ScrollableProps) => {
  return (
    <SpaceBetween
      classes={{ root: classNames(classes?.root, styles.scrollable) }}
      stretchChildren
      size="s"
      vertical
    >
      <div className={classNames(styles.content, classes?.content)}>
        {children}
      </div>
      <div className={classNames(styles.footer, classes?.footer)}>{footer}</div>
    </SpaceBetween>
  );
};
