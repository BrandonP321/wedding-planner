import React from "react";
import styles from "./UnifiedAppLayout.module.scss";
import classNames from "classnames";
import { ClassesProp } from "../../utils";
import { Outlet } from "react-router-dom";

export type UnifiedAppLayoutProps = {
  Header: React.ComponentType;
  Footer: React.ComponentType;
  MobileNav: JSX.Element;
  classes?: ClassesProp<"root" | "mobileNav">;
  toggleMobileNav: () => void;
};

export const UnifiedAppLayout = ({
  Footer,
  Header,
  classes,
  MobileNav,
  toggleMobileNav,
}: UnifiedAppLayoutProps) => {
  return (
    <div className={classNames(styles.appLayout, classes?.root)}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
