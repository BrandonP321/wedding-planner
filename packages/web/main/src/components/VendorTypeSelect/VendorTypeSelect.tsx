import React from "react";
import { Select } from "@wedding-planner/shared/web/components";
import { Vendor } from "@wedding-planner/shared/common/types";

type Props = {};

export function VendorTypeSelect(props: Props) {
  return (
    <Select
      placeholder="Select vendor type"
      options={[
        { label: "Venue", value: Vendor.VendorType.VENUE },
        {
          label: "Photographer",
          value: Vendor.VendorType.PHOTOGRAPHER,
        },
        { label: "Caterer", value: Vendor.VendorType.CATERER },
      ]}
    />
  );
}
