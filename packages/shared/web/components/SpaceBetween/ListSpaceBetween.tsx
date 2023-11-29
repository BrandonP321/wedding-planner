import React from "react";
import styles from "./SpaceBetween.module.scss";
import { SpaceBetween, SpaceBetweenProps } from "./SpaceBetween";
import { ResponsiveBreakpoint } from "../../types/repsonsive";
import classNames from "classnames";
import { useResponsive } from "../../store";
import { ClassesProp, ResponsiveUtils } from "../../utils";

export type ListSpaceBetweenProps = Omit<SpaceBetweenProps, "vertical"> & {
  /** Supports up to 10 items per row */
  itemsPerRow?: number;
  responsiveItemsPerRow?: Partial<Record<ResponsiveBreakpoint, number>>;
};

/**
 * SpaceBetween wrapper for list items that need to fill up all white space
 */
export const ListSpaceBetween = ({
  classes,
  itemsPerRow,
  responsiveItemsPerRow,
  ...props
}: ListSpaceBetweenProps) => {
  const responsive = useResponsive();

  const itemsToRenderPerRow = ResponsiveUtils.getMostSpecificFromMap(
    responsive,
    responsiveItemsPerRow ?? {},
    itemsPerRow
  );

  return (
    <SpaceBetween
      {...props}
      classes={{
        ...classes,
        root: classNames(
          styles.listSpaceBetween,
          classes?.root,
          styles[`items-${itemsToRenderPerRow}`]
        ),
      }}
    />
  );
};

type SpaceBetweenListItemProps = React.PropsWithChildren<{
  classes?: ClassesProp<"root">;
}>;

export const SpaceBetweenListItem = ({
  children,
  classes,
}: SpaceBetweenListItemProps) => (
  <div className={classNames(styles.listItem, classes?.root)}>{children}</div>
);
