import {
  AppLayoutActions,
  NotificationActions,
  ResponsiveActions,
} from "@wedding-planner/shared/web/store";
import { vendorAccountSlice, vendorSlice } from "./slices";

export * from "./store";
export * from "./hooks";
export {
  useResponsive,
  useAppLayout,
  useNotifications,
  useFetch,
} from "@wedding-planner/shared/web/store";

export const Actions = {
  ...ResponsiveActions,
  ...AppLayoutActions,
  ...NotificationActions,
  Vendor: vendorSlice.actions,
  VendorAccount: vendorAccountSlice.actions,
};
