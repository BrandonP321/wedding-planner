import styles from "./VendorSearchFilter.module.scss";
import {
  FormField,
  Line,
  RadioField,
  RadioFormField,
  Select,
  SpaceBetween,
} from "@wedding-planner/shared/web/components";
import { PhotographerFilterForm } from "./FilterForms/PhotographerFilterForm";
import { CaterergrapherFilterForm } from "./FilterForms/CatererFilterForm";
import { Vendor } from "@wedding-planner/shared/common/types";
import { Form, useFormikContext } from "formik";
import {
  FilterField,
  VendorFilterValues,
} from "./components/VendorFilterFormik";
import { VendorCityFilter } from "./components/CityFilterInput";
import { VenueFilterForm } from "./FilterForms/VenueFilterForm";
import { useEffect } from "react";
import { VendorTypeSelect } from "components/VendorTypeSelect/VendorTypeSelect";

const VendorFilterFormMap: Vendor.VendorTypeMap<() => JSX.Element> = {
  [Vendor.VendorType.PHOTOGRAPHER]: PhotographerFilterForm,
  [Vendor.VendorType.CATERER]: CaterergrapherFilterForm,
  [Vendor.VendorType.VENUE]: VenueFilterForm,
};

type VendorSearchFilterContentProps = {};

const searchRadiusFilterName: keyof VendorFilterValues = "distanceFromLocation";

export const VendorSearchFilterContent = (
  props: VendorSearchFilterContentProps
) => {
  const { values, setValues } = useFormikContext<VendorFilterValues>();

  useEffect(() => {
    setValues({
      ...values,
      choiceGroupFilters: {},
      mainChoiceAttributes: [],
      singleChoiceFilters: [],
    });
  }, [values.vendorType]);

  const FilterForm = VendorFilterFormMap[values.vendorType];

  return (
    <Form className={styles.filterForm}>
      <SpaceBetween
        classes={{ root: styles.content }}
        stretchChildren
        size="l"
        wrap={false}
        vertical
        align="n"
      >
        <FormField name={FilterField.VENDOR_TYPE} label="Vendor type">
          <VendorTypeSelect />
        </FormField>

        <VendorCityFilter />

        <RadioFormField name={searchRadiusFilterName} label="Search radius">
          <RadioField label="10 miles" value={10} parse />
          <RadioField label="20 miles" value={20} parse />
          <RadioField label="50 miles" value={50} parse />
        </RadioFormField>

        <Line />

        <FilterForm />
      </SpaceBetween>
    </Form>
  );
};
