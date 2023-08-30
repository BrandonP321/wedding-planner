import { configureStore } from "@reduxjs/toolkit";
import { appLayoutSlice, responsiveSlice } from "./slices";
import { TypedUseSelectorHook, useSelector } from "react-redux";

/** Temporary store to annotate types */
const tempStore = configureStore({
  reducer: {
    ...responsiveSlice.reducer,
    ...appLayoutSlice.reducer,
  },
});

type RootState = ReturnType<typeof tempStore.getState>;
type AppDispatch = typeof tempStore.dispatch;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useResponsive = () => useAppSelector((state) => state.responsive);

export const useAppLayout = () => useAppSelector((state) => state.appLayout);
