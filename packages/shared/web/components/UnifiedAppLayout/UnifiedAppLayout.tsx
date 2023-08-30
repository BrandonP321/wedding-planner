import React from "react";
import styles from "./UnifiedAppLayout.module.scss";
import classNames from "classnames";
import { ClassesProp } from "../../utils";
import { Outlet } from "react-router-dom";
import { useAppLayout } from "../../store";

export type UnifiedAppLayoutProps = React.PropsWithChildren<{
  header: JSX.Element;
  footer: JSX.Element;
  mobileNav: JSX.Element;
  classes?: ClassesProp<"root" | "mobileNav">;
}>;

export const UnifiedAppLayout = ({
  footer,
  header,
  classes,
  mobileNav,
  children,
}: UnifiedAppLayoutProps) => {
  const { showMobileNav } = useAppLayout();

  return (
    <div className={classNames(styles.appLayout, classes?.root)}>
      {header}
      <div
        className={classNames(styles.mobileNav, !showMobileNav && styles.hide)}
      >
        {mobileNav}
      </div>

      <main className={styles.main}>{children}</main>

      {footer}
    </div>
  );
};
