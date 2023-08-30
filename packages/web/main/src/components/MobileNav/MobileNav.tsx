import React from "react";
import styles from "./MobileNav.module.scss";
import { SpaceBetween } from "@wedding-planner/shared/web/components";

export type MobileNavProps = {};

export const MobileNav = (props: MobileNavProps) => {
  return (
    <SpaceBetween classes={{ root: styles.mobileNav }}>
      <h2>Mobile Nav</h2>
    </SpaceBetween>
  );
};
