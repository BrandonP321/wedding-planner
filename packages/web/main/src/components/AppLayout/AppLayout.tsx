import React from "react";
import styles from "./AppLayout.module.scss";
import { UnifiedAppLayout } from "@wedding-planner/shared/web/components";
import { Outlet } from "react-router-dom";
import { MainNav } from "../MainNav/MainNav";
import { MobileNav } from "../MobileNav/MobileNav";
import { MainFooter } from "../MainFooter/MainFooter";

export type AppLayoutProps = React.PropsWithChildren<{}>;

export const AppLayout = (props: AppLayoutProps) => {
  return (
    <UnifiedAppLayout
      classes={{
        overlay: styles.overlay,
        overlayHidden: styles.hide,
        mobileNav: styles.mobileNav,
        mobileNavHidden: styles.hide,
      }}
      footer={<MainFooter />}
      header={<MainNav />}
      mobileNav={<MobileNav />}
    >
      <Outlet />
    </UnifiedAppLayout>
  );
};
