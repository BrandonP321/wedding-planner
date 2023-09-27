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
  classes?: ClassesProp<"root">;
  stretchChildren?: boolean;
  align?: SpaceBetweenAlign;
}>;

export const SpaceBetween = ({
  children,
  size = "s",
  vertical,
  classes,
  align,
  responsiveSize,
  stretchChildren = false,
}: SpaceBetweenProps) => {
  const responsive = useResponsive();

  const sizeToRender = ResponsiveUtils.getMostSpecificFromMap(
    responsive,
    responsiveSize ?? {},
    size
  );

  return (
    <div
      className={classnames(
        styles.spaceBetween,
        classes?.root,
        vertical && styles.vertical,
        align && styles[`align-${align}`],
        stretchChildren && styles.stretchChildren,
        styles[sizeToRender]
      )}
    >
      {children}
    </div>
  );
};
