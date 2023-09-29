import styles from "./VendorSearchFilter.module.scss";
import {
  FormField,
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

const VendorFilterFormMap: Vendor.VendorTypeMap<() => JSX.Element> = {
  [Vendor.VendorType.PHOTOGRAPHER]: PhotographerFilterForm,
  [Vendor.VendorType.CATERER]: CaterergrapherFilterForm,
};

type VendorSearchFilterContentProps = {};

export const VendorSearchFilterContent = (
  props: VendorSearchFilterContentProps
) => {
  const {
    values: { vendorType },
  } = useFormikContext<VendorFilterValues>();

  const FilterForm = VendorFilterFormMap[vendorType];

  return (
    <Form className={styles.filterForm}>
      <SpaceBetween
        classes={{ root: styles.content }}
        stretchChildren
        size="l"
        vertical
        align="n"
      >
        <FormField name={FilterField.VENDOR_TYPE} label="Vendor type">
          <Select
            options={[
              {
                label: "Photographer",
                value: Vendor.VendorType.PHOTOGRAPHER,
              },
              { label: "Caterer", value: Vendor.VendorType.CATERER },
            ]}
          />
        </FormField>

        <VendorCityFilter />

        <FilterForm />
      </SpaceBetween>
    </Form>
  );
};
