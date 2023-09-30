import React, { useMemo } from "react";
import styles from "./CarouselPagination.module.scss";
import { useCarouselContext } from "../Carousel/useCarousel";
import { ClassesProp } from "../../utils";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import classNames from "classnames";

export type CarouselPaginationProps = {
  classes?: ClassesProp<"root" | "dot">;
};

export const CarouselPagination = ({ classes }: CarouselPaginationProps) => {
  const { currentIndex, slides, setCurrentIndex } = useCarouselContext();

  return (
    <SpaceBetween
      classes={{ root: classNames(styles.pagination, classes?.root) }}
      justify="center"
      wrap={false}
    >
      {slides?.map((s, i) => {
        const isSelected = i === currentIndex;

        return (
          <button
            className={classNames(
              styles.dot,
              classes?.dot,
              isSelected && styles.active
            )}
            onClick={() => setCurrentIndex(i)}
            key={i}
          />
        );
      })}
    </SpaceBetween>
  );
};
