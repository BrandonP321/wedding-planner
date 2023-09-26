import React from "react";
import styles from "./MainNav.module.scss";
import {
  Actions,
  useAppDispatch,
  useAppLayout,
  useResponsive,
} from "../../store";
import { SpaceBetween } from "@wedding-planner/shared/web/components";

export type MainNavProps = {};

export const MainNav = (props: MainNavProps) => {
  const {} = useAppLayout();
  const { medium } = useResponsive();
  const dispatch = useAppDispatch();

  return (
    <SpaceBetween classes={{ root: styles.header }} size="m">
      <p className={styles.temp}>Logo</p>

      {medium && (
        <button onClick={() => dispatch(Actions.AppLayout.toggleMobileNav())}>
          Toggle
        </button>
      )}
    </SpaceBetween>
  );
};
