import React from "react";
import styles from "./SpaceBetween.module.scss";
import { ClassesProp, ResponsiveUtils, Size } from "../../utils";
import classnames from "classnames";
import { ResponsiveBreakpoint } from "../../types/repsonsive";
import { useResponsive } from "../../store";

export type SpaceBetweenProps = React.PropsWithChildren<{
  size?: Size;
  responsiveSize?: Partial<Record<ResponsiveBreakpoint, Size>>;
  vertical?: boolean;
  noAlign?: boolean;
  classes?: ClassesProp<"root">;
}>;

export const SpaceBetween = ({
  children,
  size = "s",
  vertical,
  classes,
  responsiveSize,
  noAlign = false,
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
        noAlign && styles.noAlign,
        styles[sizeToRender]
      )}
    >
      {children}
    </div>
  );
};
