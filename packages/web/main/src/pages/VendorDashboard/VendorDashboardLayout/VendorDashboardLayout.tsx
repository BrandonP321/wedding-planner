import React from "react";
import styles from "./VendorDashboardLayout.module.scss";
import { Outlet } from "react-router-dom";
import { VendorDashboardSideNav } from "../VendorDashboardSideNav/VendorDashboardSideNav";
import { SpaceBetween } from "@wedding-planner/shared";

export type VendorDashboardLayoutProps = {};

export const VendorDashboardLayout = (props: VendorDashboardLayoutProps) => {
  return (
    <SpaceBetween classes={{ root: styles.layout }} size="n">
      <VendorDashboardSideNav />
      <Outlet />
    </SpaceBetween>
  );
};
