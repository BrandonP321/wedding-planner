import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vendor } from "@wedding-planner/shared/common/types";
import { createExportedSlice } from "@wedding-planner/shared/web/store/slices/sliceHelpers";

export interface VendorState {
  vendor: Vendor.Vendor | null;
}

const initialState: VendorState = {
  vendor: null,
};

const slice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendor: (
      state,
      { payload }: PayloadAction<{ vendor: Vendor.Vendor }>
    ) => {
      state.vendor = payload.vendor;
    },
  },
});

export const vendorSlice = createExportedSlice(
  { vendor: slice.reducer },
  slice.actions
);
