import React from "react";
import styles from "./MediaCarousel.module.scss";
import { Carousel, CarouselProps } from "../Carousel";
import { Vendor } from "../../../common/types";
import classNames from "classnames";

export type MediaCarouselProps = Omit<
  CarouselProps<Vendor.MediaAsset>,
  "slide"
> & {};

export const MediaCarousel = ({ classes, ...props }: MediaCarouselProps) => {
  return (
    <Carousel
      {...props}
      classes={{ ...classes, root: classNames(styles.carousel, classes?.root) }}
      slide={(slide) => {
        if (slide.type === "image") {
          return (
            <div
              className={classNames(styles.slide, styles.img, classes?.slide)}
              style={{ backgroundImage: `url(${slide.url})` }}
            />
          );
        } else {
          return (
            <div
              className={classNames(styles.slide, styles.video, classes?.slide)}
            >
              <video src={slide.url} autoPlay loop />
            </div>
          );
        }
      }}
    />
  );
};
