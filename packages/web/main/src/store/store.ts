import { configureStore } from "@reduxjs/toolkit";
import {
  ResponsiveSliceHelperInternal,
  appLayoutSlice,
  createStoreHelper,
  notificationsSlice,
  responsiveSlice,
} from "@wedding-planner/shared/web/store";
import { vendorSlice, vendorAccountSlice } from "./slices";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    ...responsiveSlice.reducer,
    ...appLayoutSlice.reducer,
    ...notificationsSlice.reducer,
    ...vendorSlice.reducer,
    ...vendorAccountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

const responsiveSliceHelper = new ResponsiveSliceHelperInternal(store);

export const storeHelpers = createStoreHelper(
  [responsiveSliceHelper.init],
  [responsiveSliceHelper.destroy]
);
