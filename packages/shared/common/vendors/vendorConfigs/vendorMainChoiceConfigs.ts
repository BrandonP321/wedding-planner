import { Vendor } from "../../types";

const vendorsWithSingleMainChoice: Vendor.VendorType[] = [
  Vendor.VendorType.PHOTOGRAPHER,
  Vendor.VendorType.CATERER,
];

export const vendorHasSingleMainChoice = (vendorType: Vendor.VendorType) =>
  vendorsWithSingleMainChoice.includes(vendorType);
