import { createContext, useContext } from "react";

type TCarouselContext<T> = {
  slides: T[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
};

export const CarouselContext = createContext({} as TCarouselContext<{}>);

export const useCarouselContext = <T extends object>() =>
  useContext(CarouselContext) as TCarouselContext<T>;
