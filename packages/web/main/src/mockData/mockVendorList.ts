import { Vendor } from "@wedding-planner/shared/common/types";

const mockVendorA: Vendor.SlimVendor = {
  city: "Seattle, WA",
  name: "Vendor A",
  thumbnail: "https://placehold.co/1920x1080",
};

const mockVendorB: Vendor.SlimVendor = {
  city: "Tacoma, WA",
  name: "Vendor B",
  thumbnail: "https://placehold.co/1920x1080",
};

export const getMockVendorList = (length: number): Vendor.VendorList => {
  const mockVendorList: Vendor.VendorList = [];
  for (let i = 0; i < length / 2; i++) {
    mockVendorList.push(mockVendorA);
    mockVendorList.push(mockVendorB);
  }
  return mockVendorList;
};
