import { Vendor } from "@wedding-planner/shared/common/types";

const mockVendorA: Vendor.SearchResult = {
  city: "Seattle, WA",
  name: "Vendor A",
  thumbnail: "https://placehold.co/1920x1080",
  price: "$4,000",
};

const mockVendorB: Vendor.SearchResult = {
  city: "Tacoma, WA",
  name: "Vendor B",
  thumbnail: "https://placehold.co/1920x1080",
  price: "$12,000",
};

export const getMockVendorList = (length: number): Vendor.VendorList => {
  const mockVendorList: Vendor.VendorList = [];
  for (let i = 0; i < length / 2; i++) {
    mockVendorList.push(mockVendorA);
    mockVendorList.push(mockVendorB);
  }
  return mockVendorList;
};
