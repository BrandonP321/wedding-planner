import React, { useState } from "react";
import styles from "./Carousel.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import { Button } from "../Button";
import { CarouselContext } from "./useCarousel";

export type CarouselProps<T> = React.PropsWithChildren<{
  slides: T[];
  slide: (slide: T) => JSX.Element;
  classes?: ClassesProp<"root" | "slides" | "slide">;
}>;

export const Carousel = <T extends object>({
  slide: Slide,
  slides,
  classes,
  children,
}: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const canDecrement = currentIndex > 0;
  const canIncrement = currentIndex < slides.length - 1;

  const incrementIndex = () => {
    canIncrement && setCurrentIndex((prev) => prev + 1);
  };

  const decrementIndex = () => {
    canDecrement && setCurrentIndex((prev) => prev - 1);
  };

  return (
    <CarouselContext.Provider value={{ currentIndex, slides, setCurrentIndex }}>
      <div>
        <div className={classNames(styles.caorusel, classes?.root)}>
          <SpaceBetween
            classes={{ root: classNames(styles.slides, classes?.slides) }}
            wrap={false}
            size="n"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div className={classNames(styles.slide, classes?.slide)} key={i}>
                <Slide {...s} />
              </div>
            ))}
          </SpaceBetween>

          <CarouselNavBtn
            onClick={decrementIndex}
            classes={{ root: styles.navBtnLeft }}
            disabled={!canDecrement}
          >
            {"<"}
          </CarouselNavBtn>

          <CarouselNavBtn
            onClick={incrementIndex}
            classes={{ root: styles.navBtnRight }}
            disabled={!canIncrement}
          >
            {">"}
          </CarouselNavBtn>
        </div>
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

type CarouselNavBtnProps = React.PropsWithChildren<{
  onClick: () => void;
  classes?: ClassesProp<"root">;
  disabled: boolean;
}>;

const CarouselNavBtn = ({
  onClick,
  children,
  classes,
  disabled,
}: CarouselNavBtnProps) => {
  return (
    <Button
      classes={{ root: classNames(styles.navBtn, classes?.root) }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
