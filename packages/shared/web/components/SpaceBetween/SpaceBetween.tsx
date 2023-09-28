import React from "react";
import styles from "./SpaceBetween.module.scss";
import { ClassesProp, ResponsiveUtils, Size } from "../../utils";
import classnames from "classnames";
import { ResponsiveBreakpoint } from "../../types/repsonsive";
import { useResponsive } from "../../store";

type SpaceBetweenAlign = "start" | "center" | "end" | "n";

export type SpaceBetweenProps = React.PropsWithChildren<{
  size?: Size;
  responsiveSize?: Partial<Record<ResponsiveBreakpoint, Size>>;
  vertical?: boolean;
  responsiveVertical?: Partial<Record<ResponsiveBreakpoint, boolean>>;
  classes?: ClassesProp<"root">;
  stretchChildren?: boolean;
  responsiveStretchChildren?: Partial<Record<ResponsiveBreakpoint, boolean>>;
  align?: SpaceBetweenAlign;
}>;

export const SpaceBetween = ({
  children,
  size = "s",
  vertical,
  classes,
  align,
  responsiveSize,
  responsiveVertical,
  responsiveStretchChildren,
  stretchChildren = false,
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

  return (
    <div
      className={classnames(
        styles.spaceBetween,
        classes?.root,
        isVertical && styles.vertical,
        align && styles[`align-${align}`],
        isStretchChildren && styles.stretchChildren,
        styles[sizeToRender]
      )}
    >
      {children}
    </div>
  );
};
