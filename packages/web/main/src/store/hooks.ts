import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./store";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useVendor = () => useAppSelector((state) => state.vendor);

export const useVendorAccount = () =>
  useAppSelector((state) => state.vendorAccount);
