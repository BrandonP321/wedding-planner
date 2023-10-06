import React from "react";
import styles from "./ClickableThumbnail.module.scss";
import {
  AspectRatioImage,
  AspectRatioImageProps,
} from "../AspectRatioImage/AspectRatioImage";
import { ClassesProp } from "../../utils";
import classNames from "classnames";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";

export type ClickableThumbnailProps = Omit<AspectRatioImageProps, "classes"> & {
  onClick: () => void;
  title?: React.ReactNode;
  classes?: ClassesProp<"root">;
};

export const ClickableThumbnail = ({
  onClick,
  classes,
  title,
  ...props
}: ClickableThumbnailProps) => {
  return (
    <button
      className={classNames(styles.thumbnail, classes?.root)}
      onClick={onClick}
    >
      {title && (
        <SpaceBetween classes={{ root: styles.overlay }} align="end">
          <p className={styles.title}>{title}</p>
        </SpaceBetween>
      )}
      <AspectRatioImage {...props} classes={{ img: styles.img }} />
    </button>
  );
};
