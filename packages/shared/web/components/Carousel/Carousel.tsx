import React, { useRef, useState } from "react";
import styles from "./Carousel.module.scss";
import { ClassesProp } from "../../utils";
import classNames from "classnames";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import { Button } from "../Button";
import { CarouselContext } from "./useCarousel";
import { useGesture } from "@use-gesture/react";
import { throttle } from "lodash";

export type CarouselProps<T> = React.PropsWithChildren<{
  slides: T[];
  slide: (slide: T) => JSX.Element;
  classes?: ClassesProp<"root" | "carousel" | "slides" | "slide">;
}>;

const swipeThreshold = 50;
const slideDuration = 250;

export const Carousel = <T extends object>({
  slide: Slide,
  slides,
  classes,
  children,
}: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const slidesRef = useRef<HTMLDivElement | null>(null);
  const isDragEnabled = useRef(true);

  const canDecrement = currentIndex > 0;
  const canIncrement = currentIndex < slides.length - 1;

  const handleDrag = throttle((deltaX: number) => {
    const slidesEle = slidesRef.current;
    if (!slidesEle || !isDragEnabled.current) return;

    // Clamp transform if at first or last slide
    if (deltaX > 0 && !canDecrement) {
      deltaX = 0;
    } else if (deltaX < 0 && !canIncrement) {
      deltaX = 0;
    }

    slidesEle.style.transform = `translateX(${deltaX}px)`;
  }, 1000 / 60);

  const handleDragEnd = (deltaX: number) => {
    // Temporarily disable dragging to prevent overlap with 'onDrag'
    isDragEnabled.current = false;
    setTimeout(() => {
      isDragEnabled.current = true;
    }, 100);

    if (deltaX >= swipeThreshold) {
      decrementIndex();
    } else if (deltaX <= -swipeThreshold) {
      incrementIndex();
    }

    if (slidesRef.current) {
      slidesRef.current.style.transform = "translateX(0)";
    }

    setIsSliding(true);
    setTimeout(() => {
      setIsSliding(false);
    }, slideDuration);
  };

  const bind = useGesture({
    onDrag: (state) => {
      handleDrag(state.movement[0]);
    },
    onDragEnd: (state) => {
      handleDragEnd(state.movement[0]);
    },
  });

  const incrementIndex = () => {
    canIncrement && setCurrentIndex((prev) => prev + 1);
  };

  const decrementIndex = () => {
    canDecrement && setCurrentIndex((prev) => prev - 1);
  };

  return (
    <CarouselContext.Provider value={{ currentIndex, slides, setCurrentIndex }}>
      <div className={classes?.root}>
        <div
          {...bind()}
          style={{ touchAction: "none" }}
          className={classNames(styles.caorusel, classes?.carousel)}
        >
          <SpaceBetween
            inputRef={slidesRef}
            classes={{
              root: classNames(
                styles.slides,
                classes?.slides,
                isSliding && styles.isSliding
              ),
            }}
            wrap={false}
            size="n"
            style={{ left: `-${currentIndex * 100}%` }}
            // style={{ transform: `translateX(-${currentIndex * 100}%)` }}
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
