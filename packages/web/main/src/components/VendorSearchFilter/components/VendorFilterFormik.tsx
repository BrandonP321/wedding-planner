import {
  getEmptyInitialValues,
  FormikSubmit,
  UrlUtils,
  FormikForm,
} from "@wedding-planner/shared";
import { Vendor } from "@wedding-planner/shared/common/types";
import { useMemo } from "react";
import { catererInitialValues } from "../FilterForms/CatererFilterForm";
import { photographerInitialValues } from "../FilterForms/PhotographerFilterForm";

export enum FilterField {
  CITY = "city",
  VENDOR_TYPE = "vendorType",
}

const initialValues = {
  ...getEmptyInitialValues({
    inputFields: FilterField,
    selectFields: {
      [FilterField.VENDOR_TYPE]: Vendor.VendorType,
    },
    checkboxFields: {},
    radioFields: {},
    toggleFields: {},
  }),
  ...catererInitialValues,
  ...photographerInitialValues,
};

export type VendorFilterValues = typeof initialValues;

export type VendorFilterFormikProps = React.PropsWithChildren<{
  handleSubmit: FormikSubmit<VendorFilterValues>;
}>;

export const VendorFilterFormik = ({
  handleSubmit,
  children,
}: VendorFilterFormikProps) => {
  const prefilledCity = useMemo(
    () => UrlUtils.getParam(FilterField.CITY) ?? "",
    []
  );

  return (
    <FormikForm
      initialValues={{
        ...initialValues,
        [FilterField.VENDOR_TYPE]: Vendor.VendorType.PHOTOGRAPHER,
        [FilterField.CITY]: prefilledCity,
      }}
      onSubmit={handleSubmit}
    >
      {children}
    </FormikForm>
  );
};
