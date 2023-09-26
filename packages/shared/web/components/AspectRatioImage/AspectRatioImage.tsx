import React from "react";
import styles from "./AspectRatioImage.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";

export type AspectRatioImageProps = {
  img: string;
  classes?: ClassesProp<"root" | "img">;
};

/**
 * Renders an image with a fixed aspect ratio.  To change aspect
 * ratio, adjust the padding-top of the 'img' class
 */
export const AspectRatioImage = ({ classes, img }: AspectRatioImageProps) => {
  return (
    <div className={classNames(styles.wrapper, classes?.root)}>
      <div
        className={classNames(styles.img, classes?.img)}
        style={{ backgroundImage: `url(${img})` }}
      />
    </div>
  );
};
