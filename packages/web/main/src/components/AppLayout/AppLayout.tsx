import React from "react";
import styles from "./AppLayout.module.scss";
import {
  UnifiedAppLayout,
  UnifiedToast,
} from "@wedding-planner/shared/web/components";
import { Outlet } from "react-router-dom";
import { MainNav } from "../MainNav/MainNav";
import { MobileNav } from "../MobileNav/MobileNav";
import { MainFooter } from "../MainFooter/MainFooter";
import { useNotifications } from "../../store";

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
      <AppNotifications />
      <Outlet />
    </UnifiedAppLayout>
  );
};

const AppNotifications = () => {
  const { notifications } = useNotifications();

  return (
    <>
      {notifications.map((n, i) => (
        <UnifiedToast key={i} msg={n.msg} variant={n.type} />
      ))}
    </>
  );
};
