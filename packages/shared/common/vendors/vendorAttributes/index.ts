import { Vendor } from "../../types";
import { photographerMainChoiceAttributeGroups } from "./photographerAttributes";

type VendorAttribute = {
  label: string;
  value: string;
};

export type VendorAttributeGroup = {
  groupName: string;
  attributes: VendorAttribute[];
};

type VendorAttributeGroups = VendorAttributeGroup[];

export const vendorMainChoiceAttributesMap: Vendor.VendorTypeMap<VendorAttributeGroups> =
  {
    [Vendor.VendorType.PHOTOGRAPHER]: photographerMainChoiceAttributeGroups,
    [Vendor.VendorType.CATERER]: [],
    [Vendor.VendorType.VENUE]: [],
  };
