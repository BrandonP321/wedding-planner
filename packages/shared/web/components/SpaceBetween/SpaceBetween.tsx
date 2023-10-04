import React, { useCallback, useMemo } from "react";
import styles from "./SpaceBetween.module.scss";
import {
  ClassesProp,
  ResponsiveProps,
  ResponsiveUtils,
  Size,
} from "../../utils";
import classnames from "classnames";
import { useResponsive } from "../../store";

type SpaceBetweenAlign = "start" | "center" | "end" | "n";
type SpaceBetweenJustify = "start" | "center" | "end" | "space-between" | "n";

export type SpaceBetweenProps = React.PropsWithChildren<{
  classes?: ClassesProp<"root">;
  style?: React.CSSProperties;
}> &
  ResponsiveProps<"size", Size> &
  ResponsiveProps<
    "vertical" | "stretchChildren" | "wrap" | "stretch",
    boolean
  > &
  ResponsiveProps<"justify", SpaceBetweenJustify> &
  ResponsiveProps<"align", SpaceBetweenAlign>;

export const SpaceBetween = ({
  children,
  size = "s",
  vertical,
  stretch,
  responsiveStretch,
  classes,
  align,
  responsiveAlign,
  justify,
  responsiveSize,
  responsiveVertical,
  responsiveStretchChildren,
  stretchChildren = false,
  wrap = true,
  responsiveJustify,
  responsiveWrap,
  style,
}: SpaceBetweenProps) => {
  const responsive = useResponsive();

  const getMostSpecific = useCallback(
    ResponsiveUtils.createMostSpecificGetter(responsive),
    [responsive]
  );

  const sizeToRender = useMemo(
    () => getMostSpecific(responsiveSize, size),
    [responsiveSize, size, getMostSpecific]
  );

  const isVertical = useMemo(
    () => getMostSpecific(responsiveVertical, vertical),
    [responsiveVertical, vertical, getMostSpecific]
  );

  const isStretchChildren = useMemo(
    () => getMostSpecific(responsiveStretchChildren, stretchChildren),
    [responsiveStretchChildren, stretchChildren, getMostSpecific]
  );

  const isWrap = useMemo(
    () => getMostSpecific(responsiveWrap, wrap),
    [responsiveWrap, wrap, getMostSpecific]
  );

  const justifyToRender = useMemo(
    () => getMostSpecific(responsiveJustify, justify),
    [responsiveJustify, justify, getMostSpecific]
  );

  const alignToRender = useMemo(
    () => getMostSpecific(responsiveAlign, align),
    [responsiveAlign, align, getMostSpecific]
  );

  const renderStretch = useMemo(
    () => getMostSpecific(responsiveStretch, stretch),
    [responsiveStretch, stretch, getMostSpecific]
  );

  return (
    <div
      className={classnames(
        styles.spaceBetween,
        classes?.root,
        isVertical && styles.vertical,
        alignToRender && styles[`align-${alignToRender}`],
        justifyToRender && styles[`justify-${justifyToRender}`],
        isStretchChildren && styles.stretchChildren,
        renderStretch && styles.stretch,
        isWrap && styles.wrap,
        styles[sizeToRender]
      )}
      style={style}
    >
      {children}
    </div>
  );
};
