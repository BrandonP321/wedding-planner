import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vendor } from "@wedding-planner/shared/common/types";
import { createExportedSlice } from "@wedding-planner/shared/web/store/slices/sliceHelpers";

export interface VendorState {
  vendor: Vendor.Vendor | null;
  loading: boolean;
}

const initialState: VendorState = {
  vendor: null,
  loading: true,
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
    setLoading: (state, { payload }: PayloadAction<{ loading: boolean }>) => {
      state.loading = payload.loading;
    },
  },
});

export const vendorSlice = createExportedSlice(
  { vendor: slice.reducer },
  slice.actions
);
