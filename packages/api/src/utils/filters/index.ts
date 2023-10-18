import { VendorModel } from "@wedding-planner/shared/api/models/vendor";
import { VenueFilter } from "./VenueFilter";
import { VendorFilterTypes } from "@wedding-planner/shared/common/types";

const VendorFilterMap = {
  venue: VenueFilter,
};

// TODO: Make async
export const getFilteredVendors = (
  vendors: VendorModel.APIResponse.Populated[],
  filters: VendorFilterTypes.Filters
) => {
  const Filter = VendorFilterMap.venue;

  const filteredVendors = vendors.filter((vendor) => {
    const vendorFilter = new Filter(vendor, filters);

    return vendorFilter.validateVendor();
  });

  return filteredVendors;
};
