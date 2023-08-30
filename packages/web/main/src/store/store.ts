import { configureStore } from "@reduxjs/toolkit";
import {
  ResponsiveSliceHelperInternal,
  createStoreHelper,
  responsiveSlice,
} from "@wedding-planner/shared/web/store";

export const store = configureStore({
  reducer: {
    ...responsiveSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const responsiveSliceHelper = new ResponsiveSliceHelperInternal(store);

export const storeHelpers = createStoreHelper(
  [responsiveSliceHelper.init],
  [responsiveSliceHelper.destroy]
);
