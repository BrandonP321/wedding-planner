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
type SpaceBetweenJustify = "start" | "center" | "end" | "n";

export type SpaceBetweenProps = React.PropsWithChildren<{
  classes?: ClassesProp<"root">;
  style?: React.CSSProperties;
  align?: SpaceBetweenAlign;
  justify?: SpaceBetweenJustify;
}> &
  ResponsiveProps<"size", Size> &
  ResponsiveProps<"vertical" | "stretchChildren" | "wrap", boolean>;

export const SpaceBetween = ({
  children,
  size = "s",
  vertical,
  classes,
  align,
  justify,
  responsiveSize,
  responsiveVertical,
  responsiveStretchChildren,
  stretchChildren = false,
  wrap = true,
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

  return (
    <div
      className={classnames(
        styles.spaceBetween,
        classes?.root,
        isVertical && styles.vertical,
        align && styles[`align-${align}`],
        justify && styles[`justify-${justify}`],
        isStretchChildren && styles.stretchChildren,
        isWrap && styles.wrap,
        styles[sizeToRender]
      )}
      style={style}
    >
      {children}
    </div>
  );
};
