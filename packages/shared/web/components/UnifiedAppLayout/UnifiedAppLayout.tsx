import React from "react";
import styles from "./UnifiedAppLayout.module.scss";
import classNames from "classnames";
import { ClassesProp } from "../../utils";
import { SharedActions, useAppLayout } from "../../store";
import { useDispatch } from "react-redux";

export type UnifiedAppLayoutProps = React.PropsWithChildren<{
  header: JSX.Element;
  footer: JSX.Element;
  mobileNav: JSX.Element;
  classes?: ClassesProp<
    "root" | "mobileNav" | "mobileNavHidden" | "overlay" | "overlayHidden"
  >;
}>;

export const UnifiedAppLayout = ({
  footer,
  header,
  classes,
  mobileNav,
  children,
}: UnifiedAppLayoutProps) => {
  const { showMobileNav } = useAppLayout();
  const dispatch = useDispatch();

  return (
    <div className={classNames(styles.appLayout, classes?.root)}>
      {header}

      <div
        className={classNames(
          styles.overlay,
          classes?.overlay,
          !showMobileNav && classNames(styles.hide, classes?.overlayHidden)
        )}
        onClick={() => dispatch(SharedActions.AppLayout.toggleMobileNav())}
      />

      <div
        className={classNames(
          styles.mobileNav,
          classes?.mobileNav,
          !showMobileNav && classNames(styles.hide, classes?.mobileNavHidden)
        )}
      >
        {mobileNav}
      </div>

      <div className={styles.content}>
        <main className={styles.main}>{children}</main>
        {footer}
      </div>
    </div>
  );
};
