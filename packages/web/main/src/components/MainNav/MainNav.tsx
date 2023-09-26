import React from "react";
import styles from "./MainNav.module.scss";
import {
  Actions,
  useAppDispatch,
  useAppLayout,
  useResponsive,
} from "../../store";
import { SpaceBetween } from "@wedding-planner/shared/web/components";
import { Link } from "react-router-dom";
import { RouteHelper } from "utils/RouteHelper";

export type MainNavProps = {};

export const MainNav = (props: MainNavProps) => {
  const {} = useAppLayout();
  const { medium } = useResponsive();
  const dispatch = useAppDispatch();

  return (
    <SpaceBetween classes={{ root: styles.header }} size="m">
      <Link to={RouteHelper.Home()} className={styles.temp}>
        Logo
      </Link>

      {medium && (
        <button onClick={() => dispatch(Actions.AppLayout.toggleMobileNav())}>
          Toggle
        </button>
      )}
    </SpaceBetween>
  );
};
