import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { createExportedSlice } from "../sliceHelpers";

export interface AppLayoutState {
  showMobileNav?: boolean;
}

const initialState: AppLayoutState = {
  showMobileNav: false,
};

const slice = createSlice({
  name: "appLayout",
  initialState,
  reducers: {
    toggleMobileNav: (state) => {
      state.showMobileNav = !state.showMobileNav;
    },
  },
});

export const appLayoutSlice = createExportedSlice(
  { appLayout: slice.reducer },
  slice.actions
);
