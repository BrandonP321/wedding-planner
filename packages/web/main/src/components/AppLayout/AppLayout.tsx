import React from "react";
import styles from "./AppLayout.module.scss";
import { UnifiedAppLayout } from "@wedding-planner/shared/web/components";
import { Actions, useAppDispatch, useAppLayout } from "../../store";

export type AppLayoutProps = React.PropsWithChildren<{}>;

export const AppLayout = (props: AppLayoutProps) => {
  return (
    <UnifiedAppLayout footer={<div />} header={<div />} mobileNav={<div />}>
      <Inner />
    </UnifiedAppLayout>
  );
};

const Inner = () => {
  const {} = useAppLayout();
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(Actions.AppLayout.toggleMobileNav())}>
        Toggle
      </button>
    </div>
  );
};
