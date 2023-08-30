import { configureStore } from "@reduxjs/toolkit";
import { responsiveSlice } from "./slices";
import { TypedUseSelectorHook, useSelector } from "react-redux";

/** Temporary store to annotate types */
const tempStore = configureStore({
  reducer: {
    ...responsiveSlice.reducer,
  },
});

type RootState = ReturnType<typeof tempStore.getState>;
type AppDispatch = typeof tempStore.dispatch;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useResponsive = () => useAppSelector((state) => state.responsive);
