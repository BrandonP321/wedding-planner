import { FormikSubmit, UrlUtils, FormikForm } from "@wedding-planner/shared";
import { SearchVendorListingRequest } from "@wedding-planner/shared/api/requests/vendor/searchVendorListings.request";
import {
  Vendor,
  VendorFilterTypes,
} from "@wedding-planner/shared/common/types";
import { useEffect, useMemo } from "react";
import { APIFetcher } from "utils";

export enum FilterField {
  CITY = "city",
  VENDOR_TYPE = "vendorType",
}

export type VendorFilterValues = Required<VendorFilterTypes.Filters> & {
  city: string;
  vendorType: Vendor.VendorType;
};

export type VendorFilterFormikProps = React.PropsWithChildren<{
  onSubmit: (vendors: SearchVendorListingRequest.ResBody["vendors"]) => void;
}>;

export const VendorFilterFormik = ({
  onSubmit: onFormSubmit,
  children,
}: VendorFilterFormikProps) => {
  const prefilledCity = useMemo(
    () => UrlUtils.getParam(FilterField.CITY) ?? "",
    []
  );

  const initialValues: VendorFilterValues = {
    choiceGroupFilters: {},
    mainChoiceAttributes: [],
    singleChoiceFilters: [],
    distanceFromLocation: 10,
    [FilterField.VENDOR_TYPE]: Vendor.VendorType.VENUE,
    [FilterField.CITY]: prefilledCity,
  };

  const fetchVendors = async (filters: VendorFilterValues) => {
    return await APIFetcher.searchVendorListings({
      ...filters,
      locationPlaceId: "ChIJVTPokywQkFQRmtVEaUZlJRA",
    })
      .then(({ vendors }) => {
        onFormSubmit(vendors);
      })
      .catch((e) => {
        // TODO: Implement error handling
        console.log(e);
      });
  };

  useEffect(() => {
    fetchVendors(initialValues);
  }, []);

  const handleSubmit: FormikSubmit<VendorFilterValues> = async (values, f) => {
    f.resetForm({ values });

    return await fetchVendors(values);
  };

  return (
    <FormikForm initialValues={initialValues} onSubmit={handleSubmit}>
      {children}
    </FormikForm>
  );
};
