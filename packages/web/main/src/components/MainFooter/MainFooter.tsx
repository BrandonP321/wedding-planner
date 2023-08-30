import React from "react";
import styles from "./MainFooter.module.scss";
import { SpaceBetween } from "@wedding-planner/shared/web/components";

export type MainFooterProps = {};

export const MainFooter = (props: MainFooterProps) => {
  return (
    <SpaceBetween classes={{ root: styles.footer }} vertical>
      <h2>MainFooter</h2>
    </SpaceBetween>
  );
};
