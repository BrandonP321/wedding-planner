import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VendorAccountModel } from "@wedding-planner/shared/api/models/vendorAccount";
import { createExportedSlice } from "@wedding-planner/shared/web/store/slices/sliceHelpers";

export interface VendorAccountState {
  account: VendorAccountModel.Response | null;
  loading: boolean;
}

const initialState: VendorAccountState = {
  account: null,
  loading: true,
};

const slice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setAccount: (
      state,
      { payload }: PayloadAction<{ account: VendorAccountModel.Response }>
    ) => {
      state.account = payload.account;
    },
    setLoading: (state, { payload }: PayloadAction<{ loading: boolean }>) => {
      state.loading = payload.loading;
    },
  },
});

export const vendorAccountSlice = createExportedSlice(
  { vendorAccount: slice.reducer },
  slice.actions
);
