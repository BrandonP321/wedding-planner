import styles from "./VendorSearchFilter.module.scss";
import {
  Dropdown,
  FormField,
  FormikForm,
  FormikSubmit,
  InputField,
  SpaceBetween,
  SubmitButton,
  getEmptyInitialValues,
} from "@wedding-planner/shared/web/components";
import {
  PhotographerFilterForm,
  photographerInitialValues,
} from "./FilterForms/PhotographerFilterForm";
import {
  CaterergrapherFilterForm,
  catererInitialValues,
} from "./FilterForms/CatererFilterForm";
import { Vendor } from "@wedding-planner/shared/common/types";
import { Form } from "formik";

const VendorFilterFormMap: Vendor.VendorTypeMap<() => JSX.Element> = {
  [Vendor.VendorType.PHOTOGRAPHER]: PhotographerFilterForm,
  [Vendor.VendorType.CATERER]: CaterergrapherFilterForm,
};

enum FilterField {
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

type VendorSearchFilterContentProps = {
  handleSubmit: FormikSubmit<VendorFilterValues>;
};

const VendorSearchFilterContent = ({
  handleSubmit,
}: VendorSearchFilterContentProps) => {
  return (
    <FormikForm
      initialValues={{
        ...initialValues,
        vendorType: Vendor.VendorType.PHOTOGRAPHER,
      }}
      onSubmit={handleSubmit}
    >
      {({ values }) => {
        const FilterForm = VendorFilterFormMap[values.vendorType];

        return (
          <Form>
            <SpaceBetween
              classes={{ root: styles.content }}
              size="l"
              vertical
              noAlign
            >
              <FormField name={FilterField.VENDOR_TYPE} label="Vendor type">
                <Dropdown
                  options={[
                    { label: "Caterer", value: "caterer" },
                    { label: "Photographer", value: "photographer" },
                  ]}
                />
              </FormField>

              <FormField name={FilterField.CITY} label="City">
                <InputField />
              </FormField>

              <FilterForm />

              <SubmitButton>Save</SubmitButton>
            </SpaceBetween>
          </Form>
        );
      }}
    </FormikForm>
  );
};

export type VendorSearchFilterSideBarProps =
  VendorSearchFilterContentProps & {};

export const VendorSearchFilterSideBar = (
  props: VendorSearchFilterSideBarProps
) => {
  return (
    <div className={styles.sidebar}>
      <VendorSearchFilterContent {...props} />
    </div>
  );
};
