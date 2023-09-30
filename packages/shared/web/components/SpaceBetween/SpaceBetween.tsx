import React from "react";
import styles from "./SpaceBetween.module.scss";
import { ClassesProp, ResponsiveUtils, Size } from "../../utils";
import classnames from "classnames";
import { ResponsiveBreakpoint } from "../../types/repsonsive";
import { useResponsive } from "../../store";

type SpaceBetweenAlign = "start" | "center" | "end" | "n";
type SpaceBetweenJustify = "start" | "center" | "end" | "n";

export type SpaceBetweenProps = React.PropsWithChildren<{
  classes?: ClassesProp<"root">;
  style?: React.CSSProperties;
  // Size
  size?: Size;
  responsiveSize?: Partial<Record<ResponsiveBreakpoint, Size>>;
  // Vertical
  vertical?: boolean;
  responsiveVertical?: Partial<Record<ResponsiveBreakpoint, boolean>>;
  // Stretch children
  stretchChildren?: boolean;
  responsiveStretchChildren?: Partial<Record<ResponsiveBreakpoint, boolean>>;
  // Align
  align?: SpaceBetweenAlign;
  // Justify
  justify?: SpaceBetweenAlign;
  // Wrap
  wrap?: boolean;
  responsiveWrap?: Partial<Record<ResponsiveBreakpoint, boolean>>;
}>;

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

  const sizeToRender = ResponsiveUtils.getMostSpecificFromMap(
    responsive,
    responsiveSize ?? {},
    size
  );

  const isVertical = ResponsiveUtils.getMostSpecificFromMap(
    responsive,
    responsiveVertical ?? {},
    vertical
  );

  const isStretchChildren = ResponsiveUtils.getMostSpecificFromMap(
    responsive,
    responsiveStretchChildren ?? {},
    stretchChildren
  );

  const isWrap = ResponsiveUtils.getMostSpecificFromMap(
    responsive,
    responsiveWrap ?? {},
    wrap
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
