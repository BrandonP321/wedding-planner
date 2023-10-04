import React, { useCallback, useMemo } from "react";
import styles from "./PageContent.module.scss";
import { ClassesProp, ResponsiveProps, ResponsiveUtils } from "../../utils";
import classNames from "classnames";
import { useResponsive } from "../../store";

export type PageContentProps = React.PropsWithChildren<{
  classes?: ClassesProp<"root">;
  stretch?: boolean;
}> &
  ResponsiveProps<
    | "topPadding"
    | "rightPadding"
    | "bottomPadding"
    | "leftPadding"
    | "verticalPadding"
    | "horizontalPadding",
    boolean
  >;

export const PageContent = ({
  children,
  classes,
  stretch,
  bottomPadding,
  responsiveBottomPadding,
  leftPadding,
  responsiveLeftPadding,
  rightPadding,
  responsiveRightPadding,
  topPadding,
  responsiveTopPadding,
  horizontalPadding,
  responsiveHorizontalPadding,
  verticalPadding,
  responsiveVerticalPadding,
}: PageContentProps) => {
  const responsive = useResponsive();

  const getMostSpecific = useCallback(
    ResponsiveUtils.createMostSpecificGetter(responsive),
    [responsive]
  );

  const renderTopPadding = useMemo(
    () => getMostSpecific(responsiveTopPadding, topPadding),
    [responsiveTopPadding, topPadding, getMostSpecific]
  );

  const renderRightPadding = useMemo(
    () => getMostSpecific(responsiveRightPadding, rightPadding),
    [responsiveRightPadding, rightPadding, getMostSpecific]
  );

  const renderBottomPadding = useMemo(
    () => getMostSpecific(responsiveBottomPadding, bottomPadding),
    [responsiveBottomPadding, bottomPadding, getMostSpecific]
  );

  const renderLeftPadding = useMemo(
    () => getMostSpecific(responsiveLeftPadding, leftPadding),
    [responsiveLeftPadding, leftPadding, getMostSpecific]
  );

  const renderHorizontalPadding = useMemo(
    () => getMostSpecific(responsiveHorizontalPadding, horizontalPadding),
    [responsiveHorizontalPadding, horizontalPadding, getMostSpecific]
  );

  const renderVerticalPadding = useMemo(
    () => getMostSpecific(responsiveVerticalPadding, verticalPadding),
    [responsiveVerticalPadding, verticalPadding, getMostSpecific]
  );

  return (
    <div
      className={classNames(
        styles.content,
        classes?.root,
        stretch && styles.stretch,
        (renderTopPadding || renderVerticalPadding) && styles.topPadding,
        (renderRightPadding || renderHorizontalPadding) && styles.rightPadding,
        (renderBottomPadding || renderVerticalPadding) && styles.bottomPadding,
        (renderLeftPadding || renderHorizontalPadding) && styles.leftPadding
      )}
    >
      {children}
    </div>
  );
};
