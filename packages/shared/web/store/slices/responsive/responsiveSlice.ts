import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { createExportedSlice } from "../sliceHelpers";
import { ResponsiveBreakpoint } from "../../../types/repsonsive";

export type ResponsiveState = Record<ResponsiveBreakpoint, boolean>;

const initialState: ResponsiveState = {
  max: false,
  large: false,
  medium: false,
  mobile: false,
  tiny: false,
  pico: false,
};

/* data passed into reducers when media query event fires */
type ResponsiveBreakpointUpdate = {
  breakpoint: keyof ResponsiveState;
  matches: boolean;
};

/**
 * Returns object of key/value (breakpoint/status) for each CSS breakpoint, allowing for responsive logic within JS
 */
const slice = createSlice({
  name: "responsive",
  initialState,
  reducers: {
    /* fired whenever a media query breakpoint event fires */
    breakpointHit: (
      state,
      action: PayloadAction<ResponsiveBreakpointUpdate>
    ) => {
      state[action.payload.breakpoint] = action.payload.matches;
    },
  },
});

export const responsiveSlice = createExportedSlice(
  { responsive: slice.reducer },
  slice.actions
);
