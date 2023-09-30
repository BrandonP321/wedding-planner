import React from "react";
import styles from "./BasicPage.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";
import { PageContent } from "../PageContent/PageContent";

export type BasicPageProps = React.PropsWithChildren<{
  classes?: ClassesProp<"root">;
}>;

export const BasicPage = ({ classes, children }: BasicPageProps) => {
  return (
    <PageContent
      classes={{ root: classNames(styles.page, classes?.root) }}
      horizontalPadding
      verticalPadding
    >
      {children}
    </PageContent>
  );
};
